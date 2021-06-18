from collections import OrderedDict
from ciscoaxl import axl
from django.core.handlers import exception
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from zeep.helpers import serialize_object

cucm = '10.10.20.1'
username = 'admin'
password = 'admin123'
version = 11

ucm = axl(username=username, password=password, cucm=cucm, cucm_version=version)


# funcion para formatear consulta
def element_list_to_ordered_dict(elements):
    return [OrderedDict((element.tag, element.text) for element in row) for row in elements]


# Vista basada en clase
class Home(generic.TemplateView):
    template_name = 'braket/layout.html'

    @method_decorator(csrf_exempt)  # Decorador para omitir token
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):  # Recupera lista de numeros
        data = {}
        try:
            action = request.POST['action']
            if action == 'getdata':
                usuarios = ucm.sql_query("select * from enduser")  # Envia consulta al CUCM
                data = element_list_to_ordered_dict(serialize_object(usuarios)["return"]["row"])
            else:
                data['error'] = 'Ha ocurrido un error'
        except exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)  # serializando objetos que no son diccionario
