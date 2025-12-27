from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentCreateSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related('doctor', 'pet', 'owner').all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['doctor', 'pet', 'owner', 'status', 'appointment_date']
    ordering_fields = ['appointment_date', 'created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return AppointmentCreateSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        if user.role == 'PET_OWNER':
            return qs.filter(owner__user=user)
        elif user.role == 'DOCTOR':
            return qs.filter(doctor__user=user)
        return qs
