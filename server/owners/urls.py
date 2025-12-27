from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PetOwnerViewSet

router = DefaultRouter()
router.register(r'', PetOwnerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
