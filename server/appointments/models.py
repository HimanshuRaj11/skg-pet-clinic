from django.db import models
from common.models import BaseModel
from owners.models import PetOwner
from pets.models import Pet
from doctors.models import Doctor

class Appointment(BaseModel):
    STATUS_CHOICES = (
        ('SCHEDULED', 'Scheduled'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
        ('NO_SHOW', 'No Show'),
    )

    owner = models.ForeignKey(PetOwner, on_delete=models.PROTECT, related_name='appointments')
    pet = models.ForeignKey(Pet, on_delete=models.PROTECT, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT, related_name='appointments')
    
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SCHEDULED')
    visit_reason = models.TextField()
    clinical_notes = models.TextField(blank=True, null=True)
    
    # Snapshot of owner details at time of booking
    owner_snapshot = models.JSONField(blank=True, null=True)

    class Meta:
        ordering = ['-appointment_date']

    def __str__(self):
        return f"{self.doctor} - {self.pet.name} on {self.appointment_date}"
