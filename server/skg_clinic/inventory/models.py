from django.db import models

class InventoryItem(models.Model):

    class Category(models.TextChoices):
        MEDICINE = "MEDICINE", "Medicine"
        CONSUMABLE = "CONSUMABLE", "Consumable"

    name = models.CharField(max_length=150, unique=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    unit = models.CharField(max_length=50)  # e.g. tablet, ml, bottle

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class StockBatch(models.Model):
    item = models.ForeignKey(
        InventoryItem,
        on_delete=models.CASCADE,
        related_name="batches",
    )
    batch_number = models.CharField(max_length=100)
    expiry_date = models.DateField()
    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("item", "batch_number")

class StockLedger(models.Model):
    item = models.ForeignKey(InventoryItem, on_delete=models.CASCADE)
    change = models.IntegerField()  # + or -
    reason = models.CharField(max_length=255)
    reference = models.CharField(max_length=255, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)