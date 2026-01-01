from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import  LoginTokenSerializer, RegisterUserSerializer , CurrentUserSerializer
from .permissions import IsAdmin
from rest_framework_simplejwt.views import TokenObtainPairView


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data)
    
class LoginView(TokenObtainPairView):
    serializer_class = LoginTokenSerializer

class RegisterUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "User created successfully"},
            status=201
        )
