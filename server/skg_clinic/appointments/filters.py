import django_filters
from .models import Appointment


class AppointmentFilter(django_filters.FilterSet):
    appointment_date = django_filters.DateFilter()
    appointment_date__gte = django_filters.DateFilter(
        field_name="appointment_date", lookup_expr="gte"
    )
    appointment_date__lte = django_filters.DateFilter(
        field_name="appointment_date", lookup_expr="lte"
    )

    status = django_filters.CharFilter()
    pet = django_filters.NumberFilter(field_name="pet__id")

    class Meta:
        model = Appointment
        fields = [
            "appointment_date",
            "status",
            "pet",
        ]
