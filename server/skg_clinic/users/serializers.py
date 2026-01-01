from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User

class LoginTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # embed role in JWT payload
        token["role"] = user.role
        token["email"] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # also return role in response body (frontend-friendly)
        data["role"] = self.user.role
        data["email"] = self.user.email

        return data
    
class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("email", "name", "password", "role")

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        return user
    
class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "name", "role")