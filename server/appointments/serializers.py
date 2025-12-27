from rest_framework import serializers
from .models import Appointment
from .services import AppointmentService
from doctors.serializers import DoctorSerializer
from pets.serializers import PetSerializer
from owners.serializers import PetOwnerSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    pet = PetSerializer(read_only=True)
    owner = PetOwnerSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('doctor', 'pet', 'owner', 'appointment_date', 'visit_reason')

    def create(self, validated_data):
        try:
            return AppointmentService.create_appointment(validated_data)
        except Exception as e:
            raise serializers.ValidationError(str(e))
