from django.db import models
from django.conf import settings
from common.models import BaseModel
from django.utils.translation import gettext_lazy as _

class Doctor(BaseModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    # JSON schema for availability: { "monday": ["09:00-12:00", "14:00-17:00"], ... }
    availability_schedule = models.JSONField(default=dict, blank=True)
    
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Dr. {self.user.get_full_name()} - {self.specialization}"
