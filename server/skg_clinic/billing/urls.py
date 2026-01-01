from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    InvoiceViewSet,
    InvoiceItemViewSet,
    BillableSuggestionsView,
)

router = DefaultRouter()
router.register(r"invoices", InvoiceViewSet, basename="invoices")
router.register(r"invoice-items", InvoiceItemViewSet, basename="invoice-items")

urlpatterns = router.urls + [
    path(
        "appointments/<int:appointment_id>/billable-suggestions/",
        BillableSuggestionsView.as_view(),
        name="billable-suggestions",
    ),
]
