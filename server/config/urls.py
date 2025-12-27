from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Pet Clinic API",
        default_version='v1',
        description="API Documentation for Pet Clinic Management System",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@petclinic.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Swagger
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/doc/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui-doc'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # API Endpoints
    path('api/accounts/', include('accounts.urls')),
    path('api/doctors/', include('doctors.urls')),
    path('api/owners/', include('owners.urls')),
    path('api/pets/', include('pets.urls')),
    path('api/appointments/', include('appointments.urls')),
    path('api/prescriptions/', include('prescriptions.urls')),
    path('api/medicines/', include('medicines.urls')),
    # path('api/vaccines/', include('vaccines.urls')),
    path('api/vendors/', include('vendors.urls')),
    path('api/billing/', include('billing.urls')),
]
