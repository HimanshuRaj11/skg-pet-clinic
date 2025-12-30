from rest_framework.viewsets import ModelViewSet
from .models import Appointment ,MedicalRecord
from .serializers import AppointmentSerializer , MedicalRecordSerializer
from users.permissions import IsStaff
from .filters import AppointmentFilter


class AppointmentViewSet(ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsStaff]

    filterset_class = AppointmentFilter
    ordering_fields = ["appointment_date", "created_at"]
    ordering = ["-appointment_date"]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class MedicalRecordViewSet(ModelViewSet):
    queryset = MedicalRecord.objects.all()
    serializer_class = MedicalRecordSerializer
    permission_classes = [IsStaff]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)