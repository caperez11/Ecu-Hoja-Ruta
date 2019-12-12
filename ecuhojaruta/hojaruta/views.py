from django.views.generic.base import TemplateView
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Diagnostico
from . import models
import json
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core import serializers
from django.urls import reverse_lazy
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from rolepermissions.decorators import has_role_decorator
from rolepermissions.mixins import HasRoleMixin
from django.contrib.auth.models import User

#decorador que obliga a que inicie sesion para poder ver la vista
@method_decorator(login_required, name='dispatch')
#Vista del home o index
class HomePageView(TemplateView):
    template_name = "hojaruta/index.html"
#decorador que obliga a que inicie sesion para poder ver la vista

@method_decorator(login_required, name='dispatch')
#Vista del formulario de registro de la hoja de ruta
class FormHojaRutaView(TemplateView):
    template_name = "hojaruta/hoja_ruta_form.html"   
    

#decorador que obliga a que inicie sesion para poder ver la vista
@method_decorator(login_required, name='dispatch')

#Vista para listar todas las hojas de ruta
class ListHojaRutaView(HasRoleMixin,TemplateView):
    allowed_roles = 'administrador'
    template_name = "hojaruta/hoja_ruta_list.html" 

#Vista para listar todas las hojas de ruta de usuarios
class ListHojaRutaUserView(HasRoleMixin,TemplateView):
    allowed_roles = 'usuario'
    template_name = "hojaruta/hoja_ruta_list_user.html" 


@method_decorator(login_required, name='dispatch')
#@has_role_decorator('administrador')
class ConfigHojaView(HasRoleMixin,TemplateView):
    allowed_roles = 'administrador'
    template_name = "hojaruta/hoja_ruta_list_recursos.html"


@method_decorator(login_required, name='dispatch')
class ConfigEstadoView(TemplateView):
    template_name = "hojaruta/hoja_ruta_edit_estado_recurso.html"



#decorador que obliga a que inicie sesion para poder ver la vista
@method_decorator(login_required, name='dispatch')
#Vista para visualizar solo una hoja de ruta
class HojaRutaView(TemplateView):
    template_name="hojaruta/hoja_ruta_view.html"   


#decorador que obliga a que inicie sesion para poder ver la vista
@method_decorator(login_required, name='dispatch')
#Vista para editar la hoja de ruta
class HojaRutaEditView(TemplateView):
    template_name="hojaruta/hoja_ruta_view_edit.html"  

#decorador que obliga a que inicie sesion para poder ver la vista
@method_decorator(login_required, name='dispatch')
#Vista para editar la hoja de ruta
class HojaRutaDeleteView(TemplateView):
    template_name="hojaruta/hoja_ruta_delete.html"  

#Permite omitir el token de seguridad de django del formulario
@csrf_exempt
#Metodo get para obtener el diagnostico en el formulario de registro
def get_diagnostico(request):
    if request.method == 'GET':
        query = models.Diagnostico.objects.all().exclude(nombre_padre__isnull=True).exclude(nombre_padre='')
        serial_diag = serializers.serialize('json', query, fields=['id','codigo_padre', 'nombre_padre', 'codigo_hijo', 'nombre_hijo'])
        if serial_diag:
            diag_json = json.loads(serial_diag)
        return JsonResponse({'result': 'success', 'data':diag_json})  

@csrf_exempt
#Metodo get para obtener el ciudad en el formulario de registro

def get_diagnostico_detalle(request):
    if request.method == 'GET':
        # req_body_dict = json.loads(request.body)  # dict
        padre = request.GET['padre']
        query = models.Diagnostico.objects.all().filter(codigo_hijo__icontains= padre)
        serial_diag = serializers.serialize('json', query, fields=['id','codigo_padre', 'nombre_padre', 'codigo_hijo', 'nombre_hijo'])
        if serial_diag:
            diag_json = json.loads(serial_diag)
        return JsonResponse({'result': 'success', 'data':diag_json})


@csrf_exempt
def get_ciudad(request):
    if request.method == 'GET':
        query = models.Ciudad.objects.all()
        serial_diag = serializers.serialize('json', query, fields=['nombre'])
        if serial_diag:
            diag_json = json.loads(serial_diag)
        return JsonResponse({'result': 'success', 'data':diag_json}) 

@csrf_exempt
#Metodo get para obtener el recurso en el formulario de registro
def get_recurso(request):
    if request.method == 'GET':
        query = models.Recurso.objects.all()
        serial_diag = serializers.serialize('json', query, fields=['id', 'nombre', 'estado'])
        if serial_diag:
            diag_json = json.loads(serial_diag)
        return JsonResponse({'result': 'success', 'data':diag_json}) 

#Permite omitir el token de seguridad de django del formulario        
@csrf_exempt
#Metodo Post para crear la hoja de ruta en la base de datos
def crear_hojaruta(request):

    if request.method == 'POST':
        req_body_dict = json.loads(request.body)  # dict
        datospaciente = req_body_dict.get('nombres')
        cedulapaciente = req_body_dict.get('cedula')
        diagpaciente  = req_body_dict.get('diagnostico')
        ciee = req_body_dict.get('cie')
        fechatencion = req_body_dict.get('featencion')
        destinoatencion = req_body_dict.get('destino')
        hsalbase  = req_body_dict.get('hsalidab')
        hatencion = req_body_dict.get('hratencion')
        hcasalud = req_body_dict.get('hcasalud')
        hllbase  = req_body_dict.get('hllbase')
        kibase= req_body_dict.get('kilbase')
        kcasalud = req_body_dict.get('kicsalud')
        kretornob = req_body_dict.get('kretorno')
        motivotraslado = req_body_dict.get('mtraslado')
        obse = req_body_dict.get('obs')
        ci = req_body_dict.get('cid')
        re = req_body_dict.get('re')
        _userid = request.user.id
        id_usuario = User.objects.get(id=_userid)
        models.HojaRuta.objects.create(datos_paciente=datospaciente, cedula_paciente=cedulapaciente,
                                       diagnostico_paciente=diagpaciente, cie=ciee,fecha_atencion=fechatencion,
                                       destino_atencion=destinoatencion, h_salida_base=hsalbase, h_atencion=hatencion,
                                       h_casa_salud=hcasalud, h_llegada_base=hllbase, kilometraje_base=kibase,
                                       kilometraje_casa_salud=kcasalud, kilometraje_retorno_base=kretornob,
                                       motivo_traslado=motivotraslado, observaciones=obse,
                                       ciudad=ci, recurso=re,
                                       usuario=id_usuario),

                                       
        return JsonResponse({'result': 'successfully created', }, status=201)

#Permite omitir el token de seguridad de django del formulario        
@csrf_exempt
def edit_hojaruta(request):
    if request.method == 'POST':
        req_body_dict = json.loads(request.body)  # dict
        datospaciente = req_body_dict.get('nombres')
        cedulapaciente = req_body_dict.get('cedula')
        diagpaciente  = req_body_dict.get('diagnostico')
        ciee = req_body_dict.get('cie')
        fechatencion = req_body_dict.get('featencion')
        destinoatencion = req_body_dict.get('destino')
        hsalbase  = req_body_dict.get('hsalidab')
        hatencion = req_body_dict.get('hratencion')
        hcasalud = req_body_dict.get('hcasalud')
        hllbase  = req_body_dict.get('hllbase')
        kibase= req_body_dict.get('kilbase')
        kcasalud = req_body_dict.get('kicsalud')
        kretornob = req_body_dict.get('kretorno')
        motivotraslado = req_body_dict.get('mtraslado')
        obse = req_body_dict.get('obs')
        ci = req_body_dict.get('cid')
        re = req_body_dict.get('re')
        id = req_body_dict.get('id')
        _userid = request.user.id
        id_usuario = User.objects.get(id=_userid)
        models.HojaRuta.objects.filter(pk=id).update(datos_paciente=datospaciente, cedula_paciente=cedulapaciente,
                                       diagnostico_paciente=diagpaciente, cie=ciee,fecha_atencion=fechatencion,
                                       destino_atencion=destinoatencion, h_salida_base=hsalbase, h_atencion=hatencion,
                                       h_casa_salud=hcasalud, h_llegada_base=hllbase, kilometraje_base=kibase,
                                       kilometraje_casa_salud=kcasalud, kilometraje_retorno_base=kretornob,
                                       motivo_traslado=motivotraslado, observaciones=obse,
                                       ciudad=ci, recurso=re, usuario =id_usuario),

                                       
        return JsonResponse({'result': 'successfully created', }, status=201)

#Permite omitir el token de seguridad de django del formulario
@csrf_exempt
def editar_estado(request):
    if request.method == 'POST':
        req_body_dict = json.loads(request.body)  # dict
        estado = req_body_dict.get('estado')
        id = req_body_dict.get('id')
        models.Recurso.objects.filter(pk=id).update(estado=estado),
        return JsonResponse({'result': 'successfully created', }, status=201)


@csrf_exempt
def delete_hoja_ruta(request):
    if request.method == 'POST':
        req_body_dict = json.loads(request.body)  # dict
        id_hoja = req_body_dict.get('id')
        
        query = models.HojaRuta.objects.filter(pk=id_hoja).delete()
        print(query)
        return JsonResponse({'result': 'successfully created', }, status=201)



#Permite omitir el token de seguridad de django del formulario
@csrf_exempt
#Metodo para obtener las hojas de rutas guardadas en la base de datos
@has_role_decorator('usuario')
def get_hoja_usuario(request):
    if request.method == 'GET':
        _userid = request.user.id
        id_usuario = User.objects.get(id=_userid)
        query = models.HojaRuta.objects.all().filter(usuario=id_usuario).order_by('-fecha_atencion')
        serial_hoja = serializers.serialize('json', query, fields=['id', 'datos_paciente', 'cedula_paciente',
        'diagnostico_paciente', 'cie', 'fecha_atencion', 'destino_atencion', 'h_salida_base', 'h_atencion',
        'h_casa_salud', 'h_llegada_base', 'kilometraje_base', 'kilometraje_casa_salud','kilometraje_retorno_base',
        'motivo_traslado', 'observaciones','ciudad', 'recurso', 'usuario' ])
        if serial_hoja:
            hoja_json = json.loads(serial_hoja)
        return JsonResponse({'result': 'success', 'data':hoja_json})


# Permite omitir el token de seguridad de django del formulario
@csrf_exempt
#Metodo para obtener las hojas de rutas guardadas en la base de datos
@has_role_decorator('administrador')
def get_hojaruta(request):
    if request.method == 'GET':
        query = models.HojaRuta.objects.all().order_by('-fecha_atencion')
        serial_hoja = serializers.serialize('json', query, fields=['id', 'datos_paciente', 'cedula_paciente',
        'diagnostico_paciente', 'cie', 'fecha_atencion', 'destino_atencion', 'h_salida_base', 'h_atencion',
        'h_casa_salud', 'h_llegada_base', 'kilometraje_base', 'kilometraje_casa_salud','kilometraje_retorno_base',
        'motivo_traslado', 'observaciones','ciudad', 'recurso', 'usuario' ])
        if serial_hoja:
            hoja_json = json.loads(serial_hoja)
        return JsonResponse({'result': 'success', 'data':hoja_json})


@csrf_exempt
#Metodo get para obtener el recurso con estado True en el formulario de registro
def get_recurso_estado(request):
    if request.method == 'GET':
        query = models.Recurso.objects.all().filter(estado=True)
        serial_diag = serializers.serialize('json', query, fields=['id', 'nombre', 'estado'])
        if serial_diag:
            diag_json = json.loads(serial_diag)
        return JsonResponse({'result': 'success', 'data':diag_json})







