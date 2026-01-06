from rest_framework.routers import DefaultRouter
from .views import InventoryItemViewSet, StockBatchViewSet

router = DefaultRouter()
router.register(r"items", InventoryItemViewSet)
router.register(r"batches", StockBatchViewSet)

urlpatterns = router.urls
