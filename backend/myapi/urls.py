#urls endpoints to backend
from django.urls import path
from .views import VehicleList

urlpatterns = [
    path('vehicles/', VehicleList.as_view(), name='vehicle-list'),
]