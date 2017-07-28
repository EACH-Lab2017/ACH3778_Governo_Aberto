//var login = angular.module('myapp', ['ngResource', 'LoginService']);
var login = angular.module("myapp",["ngRoute"]);
//var login = angular.module('login', ['LoginService', 'ngResource']);

login.controller('entrarControl', ['$scope', function($scope)
{
  $scope.submit = function()
  {
    alert(10);
    //Login2.login($scope.user);
  }
}]);
//
// login.controller('LoginController', ['$scope', '$resource', 'Login', function($scope, $resource, Login)
// {
//   $scope.submit = function()
//   {
//     alert(10);
//     Login2.login($scope.user);
//   }
// }]);



//
// login.constant('CONFIG',
// {
//   notAuthenticated: 'auth-not-authenticated',
//   url: 'http://localhost:3000'
// });
//
// login.controller('LoginController', ['$scope', '$resource', 'CONFIG', function($scope, $resource, CONFIG)
// {
//   var LOCAL_TOKEN_KEY = '1234-0987-3456-6666';
//   var isAuthenticated = false;
//   var authToken;
//   var resource = $resource(CONFIG.url + '/users/login/:id');
//
//   $scope.submit = function()
//   {
//     alert("4");
//
//     resource.save($scope.user, function(data)
//     {
//       if (result.success)
//       {
//         storeUserCredentials(result.data.token);
//         resolve(result.data.msg);
//       }
//       else
//       {
//         reject(result.data.msg);
//       }
//     });
//   };
// }]);




//
// login.controller('LoginController', ['$scope', '$http', 'CONFIG', function($scope, $http, CONFIG)
// {
//   var LOCAL_TOKEN_KEY = '1234-0987-3456-6666';
//   var isAuthenticated = false;
//   var authToken;
// //ßAPI_ENDPOINT.url
//   // $http.get(CONFIG.url).
//   // then(function(response)
//   // {
//   //   $scope.greeting = response.data;
//   // });
//
//   $scope.submit = function()
//   {
//     $http.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
//     alert($scope.user.password);
//
//     var teste = $http({
//             method: 'POST',
//             url: CONFIG.url + '/users/login',
//             data: {
//                     username: $scope.user.username,
//                     password: $scope.user.password
//                 },
//             headers: {'Content-Type': 'application/json; charset=utf-8'}
//         });
//     //
//     // $http({
//     //         method: 'POST',
//     //         url: CONFIG.url + '/users/login',
//     //         data: {
//     //                 username: $scope.user.username,
//     //                 password: $scope.user.password
//     //             },
//     //         headers: {'Accept': 'application/json', 'Content-Type': 'application/json; ; charset=UTF-8'}
//     //     }).then(function(result)
//     // {
//     //   alert(result);
//     //   if (result.data.success)
//     //   {
//     //     storeUserCredentials(result.data.token);
//     //     resolve(result.data.msg);
//     //   }
//     //   else
//     //   {
//     //     reject(result.data.msg);
//     //   }
//     // });
//     //
//     //
//     // $http.post(CONFIG.url + '/users/login', {
//     //         username: $scope.user.username,
//     //         password: $scope.user.password
//     //     }).then(function(result)
//     // {
//     //   alert(result);
//     //   if (result.data.success)
//     //   {
//     //     storeUserCredentials(result.data.token);
//     //     resolve(result.data.msg);
//     //   }
//     //   else
//     //   {
//     //     reject(result.data.msg);
//     //   }
//     // });
//
//     // $http.get(CONFIG.url).
//     // then(function(response)
//     // {
//     //   $scope.greeting = response.data;
//     // });
//   };
// }]);
//
// var login = function(user)
// {
//   return $scope(function(resolve, reject)
//   {
//     $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result)
//     {
//       if (result.data.success)
//       {
//         storeUserCredentials(result.data.token);
//         resolve(result.data.msg);
//       }
//       else
//       {
//         reject(result.data.msg);
//       }
//     });
//   });
// };


/*
.service('AuthService', function($scope, $http, API_ENDPOINT)
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

  function destroyUserCredentials()
  {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  // var register = function(user) {
  //   return $q(function(resolve, reject) {
  //     $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
  //       if (result.data.success) {
  //         resolve(result.data.msg);
  //       } else {
  //         reject(result.data.msg);
  //       }
  //     });
  //   });
  // };

  var login = function(user)
  {
    return $scope(function(resolve, reject)
    {
      $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result)
      {
        if (result.data.success)
        {
          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        }
        else
        {
          reject(result.data.msg);
        }
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return
  {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
})

.factory('AuthInterceptor', function ($rootScope, $scope, AUTH_EVENTS)
{
  return
  {
    responseError: function (response)
    {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
*/
