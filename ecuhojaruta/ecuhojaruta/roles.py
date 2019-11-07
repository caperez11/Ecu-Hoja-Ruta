from rolepermissions.roles import AbstractUserRole

class Administrador(AbstractUserRole):
    available_permissions = {
        'admin_hoja_ruta': True,
        'create_hoja_ruta': True,
        'view_hoja_ruta': True,
    }

class Usuario(AbstractUserRole):
    available_permissions = {
        'create_hoja_ruta': True,
        'view_list_hoja_user': True,
    
    
    }