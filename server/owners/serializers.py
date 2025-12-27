from rest_framework import serializers
from .models import PetOwner
from accounts.serializers import UserSerializer

class PetOwnerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PetOwner
        fields = ('id', 'user', 'address', 'emergency_contact', 'created_at')
        read_only_fields = ('id', 'created_at')

class PetOwnerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetOwner
        fields = ('user', 'address', 'emergency_contact')
