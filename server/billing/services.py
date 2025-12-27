from decimal import Decimal
from .models import Invoice
from appointments.models import Appointment
from prescriptions.models import Prescription

class BillingService:
    @staticmethod
    def generate_invoice(data):
        appointment_id = data['appointment_id']
        services = data.get('services', [])
        discount = Decimal(data.get('discount', 0))
        tax_percent = Decimal(data.get('tax_percent', 0))

        appointment = Appointment.objects.select_related('owner__user').get(id=appointment_id)
        
        # Calculate Services
        services_total = sum([Decimal(s['amount']) for s in services])
        
        # Calculate Medicines from Prescription if exists
        medicines_total = Decimal(0)
        medicines_breakdown = []
        
        if hasattr(appointment, 'prescription'):
            for item in appointment.prescription.items.all():
                cost = item.quantity * item.medicine.unit_price
                medicines_total += cost
                medicines_breakdown.append({
                    'medicine': item.medicine.name,
                    'quantity': item.quantity,
                    'unit_price': str(item.medicine.unit_price),
                    'total': str(cost)
                })

        subtotal = services_total + medicines_total
        tax_amount = (subtotal * tax_percent) / 100
        total_amount = subtotal + tax_amount - discount

        # Receiver Snapshot
        receiver_snapshot = {
            'name': appointment.owner.user.get_full_name(),
            'email': appointment.owner.user.email,
            'address': appointment.owner.address
        }

        invoice = Invoice.objects.create(
            appointment=appointment,
            receiver_snapshot=receiver_snapshot,
            services_breakdown=services,
            medicines_breakdown=medicines_breakdown,
            subtotal=subtotal,
            tax_amount=tax_amount,
            discount_amount=discount,
            total_amount=total_amount
        )
        return invoice
