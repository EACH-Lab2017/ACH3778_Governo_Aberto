#suporta todos os metodos REST
from rest_framework.viewsets import ModelViewSet

#listas de objetos -> nao consegue lidar com post ou delete
#from rest_framework.generics import ListAPIView

from .serializers import EventoSerializer, UsuarioSerializer
from .models import Evento, Usuario

class EventoApi(ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

class UsuarioApi(ModelViewSet ):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer