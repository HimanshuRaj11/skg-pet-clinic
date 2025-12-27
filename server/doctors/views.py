from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Doctor
from .serializers import DoctorSerializer, DoctorCreateSerializer

class IsDoctorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if view.action in ['list', 'retrieve']:
            return True
        return hasattr(request.user, 'doctor_profile')

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.select_related('user').all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated] # Adjust based on granular requirements
    filter_backends = [filters.SearchFilter]
    search_fields = ['specialization', 'user__first_name', 'user__last_name']

    def get_serializer_class(self):
        if self.action == 'create':
            return DoctorCreateSerializer
        return super().get_serializer_class()

    @action(detail=False, methods=['get'])
    def available(self, request):
        doctors = self.queryset.filter(is_available=True)
        serializer = self.get_serializer(doctors, many=True)
        return Response(serializer.data)
