from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class DiganosticoSerializable(serializers.ModelSerializer):
    class Meta:
        model = Diagnostico
        fields = '__all__'


class DiganosticoSerializable(serializers.ModelSerializer):
    class Meta:
        model = HojaRuta
        fields = '__all__'



class CiudadSerializable(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = '__all__'


class RecursoSerializable(serializers.ModelSerializer):
    class Meta:
        model = Recurso
        fields = '__all__'