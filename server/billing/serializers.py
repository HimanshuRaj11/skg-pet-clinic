from rest_framework import serializers
from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'
        read_only_fields = ('invoice_number', 'subtotal', 'tax_amount', 'total_amount', 'created_at')

class GenerateInvoiceSerializer(serializers.Serializer):
    appointment_id = serializers.UUIDField()
    services = serializers.ListField(child=serializers.DictField()) # [{'description': 'Consultation', 'amount': 500}]
    discount = serializers.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax_percent = serializers.DecimalField(max_digits=5, decimal_places=2, default=0)
