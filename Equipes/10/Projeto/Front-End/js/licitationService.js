var loginService = angular.module('LicitationService', ['ngResource']);

loginService.constant('CONFIG',
{
  notAuthenticated: 'auth-not-authenticated',
  url: 'http://localhost:3000'
});


loginService.service('Licitation', function($http, $resource, $location, CONFIG)
{
  var LOCAL_TOKEN_KEY = '1234-0987-3456-6666';
  var isAuthenticated = false;
  var authToken;



  function loadUserCredentials()
  {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token)
  {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token)
  {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  this.login = function (user)
  {
    var resourceLogin = $resource(CONFIG.url + '/users/login/:id');
    resourceLogin.save(user, function(data)
    {
      if (data.success)
      {
        storeUserCredentials(data.token);
        alert(data.status);
        $location.path('/');
      }
      else
      {
        alert("login inválido.");
      }
    },
    function(err)
    {
      alert("login inválido.");
    });
  }


  this.register = function (user)
  {
    var resourceRegister = $resource(CONFIG.url + '/users/register');

    resourceRegister.save(user, function(data)
    {
        alert(data.status);
        $location.path('/entrar');
    },
    function(err)
    {
      //var data = angular.fromJson(err.err);
      alert("erro");
    });
  }

  this.findUser = function ($scope)
  {
    var resourceUser = $resource(CONFIG.url + '/users?token='+authToken);

    resourceUser.get(function(data)
    {
      $scope.username = data.username;
      $scope.documentNumber = data.documentNumber;
      $scope.email = data.email;
      $scope.tags = data.tags;
    },
    function(err)
    {
      //var data = angular.fromJson(err.err);
      $location.path('/entrar');
    });
  }

  this.addTag = function (tag, $scope)
  {
    var resourceTag = $resource(CONFIG.url + '/users/tags?token='+authToken);

    resourceTag.save({tag: tag}, function(data)
    {
      $scope.tags = data.tags;
    },
    function(err)
    {
      alert("erro ao inserir um novo tag.");
    });
  }


  this.getLicitations = function ($scope)
  {
    var resourceLicitation = $resource(CONFIG.url + '/licitations');

    resourceLicitation.get(function(data)
    {
      $scope.listaLicitacao = data.licitations;

    },
    function(err)
    {
      //var data = angular.fromJson(err.err);
      //$location.path('/entrar');
      alert("erro");
    });
  }

  this.getUserLicitations = function ($scope)
  {
    var resourceUserLicitation = $resource(CONFIG.url + '/licitations/user?token='+authToken);

    resourceUserLicitation.save({}, function(data)
    {
      $scope.listaLicitacao = data.licitations;

    },
    function(err)
    {
      //var data = angular.fromJson(err.err);
      $location.path('/entrar');

    });
  }
});
