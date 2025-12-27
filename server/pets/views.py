from rest_framework import viewsets, permissions
from .models import Pet
from .serializers import PetSerializer, PetCreateSerializer

class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.select_related('owner').all()
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return PetCreateSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        user = self.request.user
        if user.role == 'PET_OWNER':
            return Pet.objects.filter(owner__user=user)
        return super().get_queryset()
