from rest_framework import viewsets, permissions
from .models import Prescription
from .serializers import PrescriptionSerializer

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.select_related('appointment').prefetch_related('items__medicine').all()
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'PET_OWNER':
            return Prescription.objects.filter(appointment__owner__user=user)
        return super().get_queryset()
