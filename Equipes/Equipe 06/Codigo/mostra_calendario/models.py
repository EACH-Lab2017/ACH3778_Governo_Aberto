from django.db import models

class Evento(models.Model):
    nome = models.CharField(max_length=50)
    data = models.DateField()
    link = models.URLField(max_length=500)
    porcentagem_acerto = models.DecimalField(max_digits=2, decimal_places=0)

    def __str__(self):
        return self.nome + ' ' + str(self.data)

class Usuario(models.Model):
    nome = models.CharField(max_length=50)
    rating = models.DecimalField(max_digits=2, decimal_places=0)

    def __str__(self):
        return 'Usuario: {}'.format(self.nome)

