angular.module('inspinia')
.service('security', function ($http) {
  var service = this

    service.Login = function (model) {
        return executeAPI($http, 'POST', URI_Node + 'Autenticacao/Login', model)
    };

    service.AddUsuario = function (model) {
        return executeAPI($http, 'POST', URI_Node + 'Autenticacao', model)
    };
})
