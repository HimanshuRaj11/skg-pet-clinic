from django.db import models
from common.models import BaseModel
from owners.models import PetOwner

class Pet(BaseModel):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('U', 'Unknown'),
    )

    owner = models.ForeignKey(PetOwner, on_delete=models.CASCADE, related_name='pets')
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50) # e.g., Dog, Cat
    breed = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='U')
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # in kg
    medical_notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.species})"
