from .api import EventoApi, UsuarioApi
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'eventos', EventoApi)
router.register(r'usuarios', UsuarioApi)

#responsavel por criar todo o mapping por nos
urlpatterns = router.urls


""" 

Nao usa ROUTER - teria que criar urls manualmente

from django.conf.urls import url
from django.views.generic import TemplateView

from .api import EventoApi, UsuarioApi

urlpatterns = [
    url(r'^eventos/get$', EventoApi.as_view()),
    url(r'^usuarios$', UsuarioApi.as_view()),
    url(r'^eventos$', TemplateView.as_view(template_name='mostra_calendario/home.html')),
]
"""