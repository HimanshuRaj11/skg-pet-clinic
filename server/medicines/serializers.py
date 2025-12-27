from rest_framework import serializers
from .models import Medicine
from vendors.serializers import VendorSerializer

class MedicineSerializer(serializers.ModelSerializer):
    vendor = VendorSerializer(read_only=True)
    vendor_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Medicine
        fields = '__all__'
