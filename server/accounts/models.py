from django.contrib.auth.models import AbstractUser
from django.db import models
from common.models import BaseModel
from django.utils.translation import gettext_lazy as _

class User(AbstractUser, BaseModel):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', _('Admin')
        DOCTOR = 'DOCTOR', _('Doctor')
        RECEPTIONIST = 'RECEPTIONIST', _('Receptionist')
        PET_OWNER = 'PET_OWNER', _('Pet Owner')
        VENDOR = 'VENDOR', _('Vendor')

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.PET_OWNER,
    )
    email = models.EmailField(_('email address'), unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.email} - {self.role}"
