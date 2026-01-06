from rest_framework import serializers
from .models import InventoryItem, StockBatch


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = "__all__"


class StockBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockBatch
        fields = "__all__"
