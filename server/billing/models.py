from django.db import models
from common.models import BaseModel
from appointments.models import Appointment

class Invoice(BaseModel):
    PAYMENT_STATUS_CHOICES = (
        ('UNPAID', 'Unpaid'),
        ('PAID', 'Paid'),
        ('PARTIAL', 'Partial'),
        ('REFUNDED', 'Refunded'),
    )

    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='invoice')
    invoice_number = models.CharField(max_length=50, unique=True, blank=True)
    
    # Store snapshots to ensure immutability
    receiver_snapshot = models.JSONField() 
    services_breakdown = models.JSONField(default=list) # List of {description, amount}
    medicines_breakdown = models.JSONField(default=list) # List of {medicine_name, quantity, unit_price, total}

    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='UNPAID')
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.invoice_number:
            import uuid
            self.invoice_number = f"INV-{str(uuid.uuid4())[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.invoice_number} - {self.total_amount}"
