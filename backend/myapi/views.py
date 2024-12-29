#This file creates views
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Vehicle
from .serializer import VehicalSerializer
from django.http import request, HttpResponseRedirect
from .forms import LoginForm
from django.contrib.auth.models import User
from http import request

class RegisterOwner(User):
    def post(request):
        user = User.objects.create_user(request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        return HttpResponseRedirect()


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