from rest_framework.viewsets import ModelViewSet
from users.permissions import IsStaff
from .models import InventoryItem, StockBatch
from .serializers import InventoryItemSerializer, StockBatchSerializer


class InventoryItemViewSet(ModelViewSet):
    queryset = InventoryItem.objects.filter(is_active=True)
    serializer_class = InventoryItemSerializer
    permission_classes = [IsStaff]


class StockBatchViewSet(ModelViewSet):
    queryset = StockBatch.objects.all()
    serializer_class = StockBatchSerializer
    permission_classes = [IsStaff]

