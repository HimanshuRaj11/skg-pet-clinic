from rest_framework import serializers
from .models import Prescription, PrescriptionItem
from medicines.serializers import MedicineSerializer

class PrescriptionItemSerializer(serializers.ModelSerializer):
    medicine = MedicineSerializer(read_only=True)
    medicine_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = PrescriptionItem
        fields = ('id', 'medicine', 'medicine_id', 'dosage', 'duration', 'quantity')

class PrescriptionSerializer(serializers.ModelSerializer):
    items = PrescriptionItemSerializer(many=True)

    class Meta:
        model = Prescription
        fields = ('id', 'appointment', 'treatment_notes', 'items')
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        prescription = Prescription.objects.create(**validated_data)
        for item_data in items_data:
            PrescriptionItem.objects.create(prescription=prescription, **item_data)
        return prescription
