from django.db import models
from common.models import BaseModel
from appointments.models import Appointment
from medicines.models import Medicine

class Prescription(BaseModel):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='prescription')
    treatment_notes = models.TextField()

    def __str__(self):
        return f"Prescription for {self.appointment}"

class PrescriptionItem(BaseModel):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE, related_name='items')
    medicine = models.ForeignKey(Medicine, on_delete=models.PROTECT)
    dosage = models.CharField(max_length=100) # e.g., "1-0-1 after food"
    duration = models.CharField(max_length=50) # e.g., "5 days"
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.medicine.name} - {self.dosage}"
