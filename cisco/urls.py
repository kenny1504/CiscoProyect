from django.urls import path
# Vistas por defect para login y logout
from django.contrib.auth import views as auth_views

from cisco.views import Home

urlpatterns = [

    path('', Home.as_view(), name='home')
]
