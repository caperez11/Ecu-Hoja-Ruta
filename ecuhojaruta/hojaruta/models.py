from django.db import models
import datetime
from datetime import date
from django.contrib.auth.models import User


# Create your models Diagnostico
class Diagnostico(models.Model):
    id = models.IntegerField(primary_key=True)
    codigo_padre = models.TextField(blank=True)
    nombre_padre = models.TextField(blank=True)
    codigo_hijo = models.TextField(blank=True)
    nombre_hijo = models.TextField(blank=True)

    def __str__(self):
        return '{}'.format(self.codigo_hijo)

# Create your models Diagnostico
class Ciudad(models.Model):
    nombre = models.CharField(max_length=100, )

    def __str__(self):
        return '{}'.format(self.nombre)


class Recurso(models.Model):
    nombre = models.CharField(max_length=100, )
    estado = models.BooleanField(default=True)

    def __str__(self):
        return '{}'.format(self.nombre)


# Create your models HojaRuta
class HojaRuta(models.Model):
    datos_paciente = models.CharField(max_length=100)
    cedula_paciente = models.CharField(max_length=10)
    diagnostico_paciente = models.CharField(max_length=1000)
    cie = models.CharField(max_length=1000)
    fecha_atencion = models.DateField(default=datetime.date.today)
    destino_atencion = models.TextField()
    h_salida_base = models.TimeField(default='20:00')
    h_atencion = models.TimeField(default='20:00')
    h_casa_salud = models.TimeField(default='20:00')
    h_llegada_base = models.TimeField(default='20:00')
    kilometraje_base = models.CharField(max_length=100)
    kilometraje_casa_salud = models.CharField(max_length=100)
    kilometraje_retorno_base = models.CharField(max_length=100)
    motivo_traslado = models.TextField()
    observaciones = models.TextField()
    ciudad = models.CharField(max_length=100)
    recurso = models.CharField(max_length=100)
    usuario = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.datos_paciente)
