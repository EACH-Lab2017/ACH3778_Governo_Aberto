# Calendário Livre 

Calendário livre - calendário das audiências públicas em formato aberto

## Primeiros Passos

Essas instruções irão de guiar em como baixar nosso código rodando localmente em seu computador para própositos de desenvolvimento. Futuras notas serão providenciadas com as instruções de como lança-lo oficialmente.

### Pre requisitos

Softwares que são necessários a instalação:

```
Python
Django Framework
Pip - Package installer Python 
```

### Instalação


Passo a passo com alguns exemplos de como configurar o ambiente de desenvolvimento. 
OBS: Esse tutorial esta assumindo a utilização de uma máquina rodando Ubuntu LTS 16.0 

Primeiro passo é clonar o repositório e entrar no diretório
```
git clone https://github.com/cobap/calendario-livre.git; cd calendario-livre
```

Agora é necessário habilitar o ambiente virtual 
```
source bin/activate
```

Feito isso, estamos quase lá. Precisamos verificar se existe alguma dependencia não instalada no nosso sistema, para isso, rode:
```
pip install -r requirements.txt
```

Ótimo, agora vamos aos testes! Rode:
```
python manage.py runserver
```

Isso deverá rodaro servidor do Django localmente, feito isso, provavelmente ele lhe dará um link como "127.0.0.1:8000". Agora basta abrir o seu navegador e testar nossa aplicação! 

Ficou alguma dúvida? Teve algum problema? Não deixe de nos contatar!! Os responsáveis por esse projeto estão listados aqui embaixo...

## Como esta estruturado nosso código? 

Nossa aplicação esta em um formato aceitável pelo Heroku PaaS! Para mantermos o padrão, deixamos alguns arquivos de configuração de fora do .gitignore para que a experiência e sair do ambiente de dev. e colocar na nuvem seja a mais tranquila possível! 

Aqui vai uma lista do significado geral de cada pasta, dentro dos arquivos, caso ele seja de real importância para o projeto, haverá comentários detalhados sobre sua funcionalidade.

Ambiente Virtual:
/bin - pasta responsável para criação do ambiente virtual. Nenhum arquivo listado aqui dentro é essêncial
/lib & lib64 - arquivos de support para /bin
/share - p/ compartilhamento de amb. virtual
pyvenv.cfg - configuração do amb. virtual

Heroku:
Procfile - mostra ao Heroku como deve ser o deploy de nosso aplicativo

Django:
calendario_livre/ - pasta do aplicativo principal. Para mais detalhes consulte documentação do DJANGO
mostra_calendario/ - pasta do modulos mostra_calendario que é responsável por armazenar as views, urls e API da aplicação
manage.py - arquivo de controle do Django
requirements.txt - arquivo de dependencias
runtime.txt - arquivo para ajudar na execuçã do programa
db.sqlite3 - BD nativo do Django

Bower:
bower.json -dependencias do Bower - package manager front-end


## Desenvolvido com:

* [Python](https://www.python.org/) - Language Python
* [AngularJS](https://angularjs.org/) - JavaScript SuperHeroic Framework
* [Django](https://www.djangoproject.com/) - Django Web Framework

## Desenvolvedores:

* **Antonio Coelho**

* **Gisely Alves**

* **Rafael Pavarine** 

* **Keven Anderson** 

* **Felipe Appel** 


## Licença

Este projeto esta sobre a licença GNU v3.0 - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes

