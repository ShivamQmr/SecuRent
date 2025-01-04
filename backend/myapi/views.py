from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import Vehicle
from .serializer import VehicalSerializer

@method_decorator(csrf_exempt, name='dispatch')  # Apply csrf_exempt to the entire class
class RegisterOwner(APIView):  # Inheriting from APIView
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            # Create a new user with the provided email and password
            user = User.objects.create_user(
                username=request.data['email'], 
                password=request.data['password']
            )
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class VehicleList(APIView):
    def get(self, request):
        list = Vehicle.objects.all()
        serializer = VehicalSerializer(list, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = VehicalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
