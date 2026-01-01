from rest_framework import serializers
from .models import PetProfile


class PetProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetProfile
        fields = "__all__"
        read_only_fields = ("id", "created_at", "is_active")
