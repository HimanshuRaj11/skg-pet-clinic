from rest_framework import serializers
from .models import Doctor
from accounts.serializers import UserSerializer

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Doctor
        fields = ('id', 'user', 'specialization', 'license_number', 'consultation_fee', 'availability_schedule', 'is_available')
        read_only_fields = ('id',)

class DoctorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('user', 'specialization', 'license_number', 'consultation_fee', 'availability_schedule')
