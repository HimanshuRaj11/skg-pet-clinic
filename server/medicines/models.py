from django.db import models
from common.models import BaseModel
from vendors.models import Vendor

class Medicine(BaseModel):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=255)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True, related_name='medicines')
    batch_number = models.CharField(max_length=50)
    expiry_date = models.DateField()
    stock_quantity = models.PositiveIntegerField(default=0)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.name} ({self.batch_number})"
