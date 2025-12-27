from rest_framework import serializers
from .models import Pet
from owners.serializers import PetOwnerSerializer

class PetSerializer(serializers.ModelSerializer):
    owner = PetOwnerSerializer(read_only=True)
    age = serializers.SerializerMethodField()
    
    class Meta:
        model = Pet
        fields = ('id', 'owner', 'name', 'species', 'breed', 'date_of_birth', 'gender', 'weight', 'medical_notes', 'age')

    def get_age(self, obj):
        import datetime
        if obj.date_of_birth:
            today = datetime.date.today()
            return today.year - obj.date_of_birth.year - ((today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day))
        return None

class PetCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ('owner', 'name', 'species', 'breed', 'date_of_birth', 'gender', 'weight', 'medical_notes')
