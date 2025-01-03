# This file serialize the input to python readable inputs

from rest_framework import serializers
from .models import Vehicle

class VehicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['__all__']