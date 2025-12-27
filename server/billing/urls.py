from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvoiceViewSet, GenerateInvoiceView

router = DefaultRouter()
router.register(r'invoices', InvoiceViewSet)

urlpatterns = [
    path('generate/', GenerateInvoiceView.as_view(), name='generate-invoice'),
    path('', include(router.urls)),
]
