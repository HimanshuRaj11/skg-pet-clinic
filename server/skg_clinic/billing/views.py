from django.db import transaction
from django.http import HttpResponse

from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

from users.permissions import IsStaff
from appointments.models import Appointment
from inventory.models import StockLedger

from .models import Invoice, InvoiceItem
from .serializers import InvoiceSerializer, InvoiceItemSerializer
from .utils import recalculate_invoice, ensure_invoice_editable
from .pdf import generate_invoice_pdf


class InvoiceViewSet(ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsStaff]

    # Create invoice
    def perform_create(self, serializer):
        appointment = serializer.validated_data["appointment"]
        if hasattr(appointment, "invoice"):
            raise ValidationError("Invoice already exists for this appointment.")
        serializer.save()

    # Update invoice (blocked after PAID)
    def perform_update(self, serializer):
        invoice = serializer.instance
        ensure_invoice_editable(invoice)
        serializer.save()

    # MARK PAID (STOCK + LEDGER + LOCK)
    @action(detail=True, methods=["post"])
    def mark_paid(self, request, pk=None):
        invoice = self.get_object()

        if invoice.status == "PAID":
            raise ValidationError("Invoice is already paid.")

        with transaction.atomic():
            for item in invoice.items.select_related("inventory_item"):

                # Skip non-stock items (consultation etc.)
                if not item.inventory_item:
                    continue

                remaining_qty = item.quantity
                batches = (
                    item.inventory_item.batches
                    .select_for_update()
                    .order_by("expiry_date")
                )

                for batch in batches:
                    if remaining_qty <= 0:
                        break

                    deduct = min(batch.quantity, remaining_qty)
                    batch.quantity -= deduct
                    batch.save()

                    StockLedger.objects.create(
                        item=item.inventory_item,
                        change=-deduct,
                        reason="Invoice Sale",
                        reference=f"Invoice #{invoice.id}",
                    )

                    remaining_qty -= deduct

                if remaining_qty > 0:
                    raise ValidationError(
                        f"Insufficient stock for {item.inventory_item.name}"
                    )

            invoice.status = "PAID"
            invoice.save()

        return Response({"message": "Invoice marked as PAID"})

    # PDF download
    @action(detail=True, methods=["get"])
    def pdf(self, request, pk=None):
        invoice = self.get_object()

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = (
            f'attachment; filename="invoice_{invoice.id}.pdf"'
        )

        generate_invoice_pdf(invoice, response)
        return response

class InvoiceItemViewSet(ModelViewSet):
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer
    permission_classes = [IsStaff]

    def perform_create(self, serializer):
        invoice = serializer.validated_data["invoice"]
        ensure_invoice_editable(invoice)
        item = serializer.save()
        recalculate_invoice(item.invoice)

    def perform_update(self, serializer):
        invoice = serializer.instance.invoice
        ensure_invoice_editable(invoice)
        item = serializer.save()
        recalculate_invoice(item.invoice)

    def perform_destroy(self, instance):
        invoice = instance.invoice
        ensure_invoice_editable(invoice)
        instance.delete()
        recalculate_invoice(invoice)

DEFAULT_CONSULTATION_FEE = 500.0


class BillableSuggestionsView(APIView):
    permission_classes = [IsStaff]

    def get(self, request, appointment_id):
        try:
            appointment = Appointment.objects.select_related("pet").get(
                id=appointment_id
            )
        except Appointment.DoesNotExist:
            raise NotFound("Appointment not found")

        medical_record = getattr(appointment, "medical_record", None)

        prescriptions = []
        if medical_record:
            prescriptions = [
                {
                    "medicine_name": p.medicine_name,
                    "suggested_quantity": 1,
                    "dosage": p.dosage,
                    "frequency": p.frequency,
                    "duration": p.duration,
                    "instructions": p.instructions,
                }
                for p in medical_record.prescriptions.all()
            ]

        return Response({
            "appointment_id": appointment.id,
            "appointment_status": appointment.status,
            "pet": {
                "id": appointment.pet.id,
                "name": appointment.pet.pet_name,
                "species": appointment.pet.species,
            },
            "suggested_items": {
                "consultation": {
                    "description": "Consultation Fee",
                    "suggested_price": DEFAULT_CONSULTATION_FEE,
                },
                "prescriptions": prescriptions,
            },
        })
