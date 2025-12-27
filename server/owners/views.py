from rest_framework import viewsets, permissions
from .models import PetOwner
from .serializers import PetOwnerSerializer, PetOwnerCreateSerializer

class PetOwnerViewSet(viewsets.ModelViewSet):
    queryset = PetOwner.objects.select_related('user').all()
    serializer_class = PetOwnerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return PetOwnerCreateSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        user = self.request.user
        if user.role == 'PET_OWNER':
            return PetOwner.objects.filter(user=user)
        # Admin/Staff seeing all owners
        return super().get_queryset()
