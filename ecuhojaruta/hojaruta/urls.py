from django.urls import path
from .views import (
    HomePageView, 
    FormHojaRutaView, 
    ListHojaRutaView,
    HojaRutaView,
    ListHojaRutaUserView,
    HojaRutaEditView,
    HojaRutaDeleteView,
    get_diagnostico,
    crear_hojaruta,
    get_hoja_usuario,
    get_hojaruta,
    get_ciudad,
    get_recurso,
    ConfigHojaView,
    ConfigEstadoView,
    editar_estado,
    get_recurso_estado,
    edit_hojaruta,
    delete_hoja_ruta,
    
    
)

urlpatterns = [
    path('', HomePageView.as_view(), name="home"),
    path('registrohoja/', FormHojaRutaView.as_view(), name="registrohoja"),
    path('listhoja/', ListHojaRutaView.as_view(), name="listhoja"),
    path('listhoja_usuario/', ListHojaRutaUserView.as_view(), name="listhoja_usuario"),
    path('hojarutaview/', HojaRutaView.as_view(), name="hojarutaview"),
    path('hojaruta_delete/', HojaRutaDeleteView.as_view(), name="hojaruta_delete"),
    path('hojarutaedit/', HojaRutaEditView.as_view(), name="hojarutaedit"),
    path('configview/', ConfigHojaView.as_view(), name="configview"),
    path('estadoview/', ConfigEstadoView.as_view(), name="estadoview"),


    path('get_diagnostico/', get_diagnostico, name='get_diagnostico'),
    path('crear_hojaruta', crear_hojaruta, name='crear_hojaruta'),
    path('get_hojaruta/', get_hojaruta, name='get_hojaruta'),
    path('get_hoja_usuario/', get_hoja_usuario, name='get_hoja_usuario'),
    path('get_ciudad/', get_ciudad, name='get_ciudad'),
    path('get_recurso/', get_recurso, name='get_recurso'),
    path('edit_estado', editar_estado, name='edit_estado'),
    path('delete_hoja_ruta', delete_hoja_ruta, name='delete_hoja_ruta'),
    path('edit_hojaruta', edit_hojaruta, name='edit_hojaruta'),
    path('get_recurso_estado/', get_recurso_estado, name='get_recurso_estado'),

]
