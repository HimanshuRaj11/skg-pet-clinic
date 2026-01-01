from rest_framework.viewsets import ModelViewSet
from .models import PetProfile
from .serializers import PetProfileSerializer
from users.permissions import IsStaff


class PetProfileViewSet(ModelViewSet):
    serializer_class = PetProfileSerializer
    permission_classes = [IsStaff]

    def get_queryset(self):
        return PetProfile.objects.filter(is_active=True)

    def perform_destroy(self, instance):
        # Soft delete
        instance.is_active = False
        instance.save()
