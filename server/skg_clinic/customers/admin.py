from django.contrib import admin
from customers.models import PetProfile as customer_models
# Register your models here.
@admin.register(customer_models)
class CustomerModelsAdmin(admin.ModelAdmin):
    list_display = ("owner_name", "owner_phone", "owner_address", "pet_name","species")
    search_fields = ("owner_name", "owner_phone")