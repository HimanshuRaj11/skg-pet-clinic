from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
from users.permissions import IsStaff
from .models import Invoice, InvoiceItem
from .serializers import InvoiceSerializer, InvoiceItemSerializer
from .utils import recalculate_invoice, ensure_invoice_editable
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from users.permissions import IsStaff
from appointments.models import Appointment
from .pdf import generate_invoice_pdf
from django.http import HttpResponse


class InvoiceViewSet(ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsStaff]

    def perform_create(self, serializer):
        appointment = serializer.validated_data["appointment"]
        if hasattr(appointment, "invoice"):
            raise ValidationError("Invoice already exists for this appointment.")
        serializer.save()

    def perform_update(self, serializer):
        invoice = serializer.instance

        #  prevent edits after payment
        ensure_invoice_editable(invoice)

        #  prevent status rollback
        new_status = serializer.validated_data.get("status")
        if invoice.status == "PAID" and new_status != "PAID":
            raise ValidationError("Paid invoice status cannot be changed.")

        serializer.save()
    
   

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


class InvoiceViewSet(ModelViewSet):
    @action(detail=True, methods=["post"])
    def mark_paid(self, request, pk=None):
        invoice = self.get_object()
        if invoice.status == "PAID":
            raise ValidationError("Invoice is already paid.")
        invoice.status = "PAID"
        invoice.save()
        return Response({"message": "Invoice marked as PAID"})
    
     # pdf download endpoint GET /api/billing/invoices/{id}/pdf/
    @action(detail=True, methods=["get"])
    def pdf(self, request, pk=None):
        invoice = self.get_object()

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="invoice_{invoice.id}.pdf"'

        generate_invoice_pdf(invoice, response)
        return response



DEFAULT_CONSULTATION_FEE = 500.0  # Example fixed fee for consultation

class BillableSuggestionsView(APIView):

    permission_classes = [IsStaff]

    def get(self, request, appointment_id):
        try:
            appointment = Appointment.objects.select_related(
                "pet"
            ).get(id=appointment_id)
        except Appointment.DoesNotExist:
            raise NotFound("Appointment not found")

        # Medical record may or may not exist
        medical_record = getattr(appointment, "medical_record", None)

        prescriptions = []
        if medical_record:
            prescriptions = [
                {
                    "medicine_name": p.medicine_name,
                    "suggested_quantity": 1,  # or derive from duration/frequency if you want later
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
            }
        })
