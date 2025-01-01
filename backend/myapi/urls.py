#urls endpoints to backend
from django.urls import path
from .views import VehicleList, RegisterOwner
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('vehicles/', VehicleList.as_view(), name='vehicle-list'),
    path('register/', RegisterOwner.as_view(), name='register-owner'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]