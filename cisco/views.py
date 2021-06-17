import json
import os

import zeep
from ciscoaxl import axl
from django.core import serializers
from django.core.handlers import exception
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import generic
from django.views.decorators.csrf import csrf_exempt

# from py_dotenv import read_dotenv

cucm = '10.10.20.1'
username = 'admin'
password = 'admin123'
version = 11

ucm = axl(username=username, password=password, cucm=cucm, cucm_version=version)


# Vista basada en clase
class Home(generic.TemplateView):
    template_name = 'braket/layout.html'

    @method_decorator(csrf_exempt)  # Decorador para omitir token
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs): # Recupera lista de numeros
        data = {}
        try:
            action = request.POST['action']
            if action == 'getdata':
                data = json.loads(
                    json.dumps(zeep.helpers.serialize_object(ucm.get_phones())))  # Se optiene lista y se serializa
            else:
                data['error'] = 'Ha ocurrido un error'
        except exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)  # serializando objetos que no son diccionario
