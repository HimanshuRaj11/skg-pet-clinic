from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginView , RegisterUserView , ProfileView

urlpatterns = [
    path("login/", LoginView.as_view(), name="auth_login"),
    path("refresh/", TokenRefreshView.as_view(), name="auth_refresh"),
    path("register/", RegisterUserView.as_view(), name="register"),
    path("profile/", ProfileView.as_view(), name="profile"),
]

