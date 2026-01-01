from django.db import models

# Create your models here.
from django.db import models


class PetProfile(models.Model):
    class Species(models.TextChoices):
        DOG = "DOG", "Dog"
        CAT = "CAT", "Cat"

    class Gender(models.TextChoices):
        MALE = "MALE", "Male"
        FEMALE = "FEMALE", "Female"
        UNKNOWN = "UNKNOWN", "Unknown"

    # 🐶 Pet details (PATIENT)
    pet_name = models.CharField(max_length=100)
    species = models.CharField(
        max_length=10,
        choices=Species.choices,
    )
    breed = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
        default=Gender.UNKNOWN,
    )
    date_of_birth = models.DateField(blank=True, null=True)

    # 👤 Owner details (CONTACT)
    owner_name = models.CharField(max_length=150)
    owner_phone = models.CharField(max_length=15)
    owner_email = models.EmailField(blank=True, null=True)
    owner_address = models.TextField(blank=True, null=True)

    # 🩺 Medical notes (light, extensible)
    medical_notes = models.TextField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pet_name} ({self.species}) - {self.owner_phone}"
