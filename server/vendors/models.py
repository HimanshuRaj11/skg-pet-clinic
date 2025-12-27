from django.db import models
from common.models import BaseModel

class Vendor(BaseModel):
    name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    payment_terms = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
