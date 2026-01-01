from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet, MedicalRecordViewSet, PrescriptionViewSet

router = DefaultRouter()
router.register(r"", AppointmentViewSet, basename="appointments")
router.register(r"medical-records", MedicalRecordViewSet, basename="medical-records")
router.register(
    r"prescriptions",
    PrescriptionViewSet,
    basename="prescriptions",
)

urlpatterns = router.urls
