from django.db import models
from django.conf import settings
from common.models import BaseModel

class PetOwner(BaseModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pet_owner_profile')
    address = models.TextField(blank=True, null=True)
    emergency_contact = models.CharField(max_length=100, blank=True, null=True)
    # Linked pets will be available via reverse relation 'pets'

    def __str__(self):
        return f"{self.user.get_full_name()} (Owner)"
