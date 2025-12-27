from django.core.exceptions import ValidationError
from .models import Appointment
from django.utils import timezone

class AppointmentService:
    @staticmethod
    def create_appointment(data):
        # Validate availability
        doctor = data['doctor']
        date = data['appointment_date']
        
        # Check double booking (simple check: exact time match or overlap logic)
        # Assuming slots are fixed or just checking existence in a window
        if Appointment.objects.filter(doctor=doctor, appointment_date=date, status='SCHEDULED').exists():
            raise ValidationError("Doctor is already booked for this slot.")

        # Check Pet Ownership
        pet = data['pet']
        owner = data['owner']
        if pet.owner != owner:
            raise ValidationError("Pet does not belong to the specified owner.")

        # Create Snapshot
        owner_snapshot = {
            'name': owner.user.get_full_name(),
            'phone': owner.user.phone,
            'email': owner.user.email,
            'address': owner.address
        }

        appointment = Appointment.objects.create(
            owner=owner,
            pet=pet,
            doctor=doctor,
            appointment_date=date,
            visit_reason=data.get('visit_reason'),
            owner_snapshot=owner_snapshot
        )
        return appointment
