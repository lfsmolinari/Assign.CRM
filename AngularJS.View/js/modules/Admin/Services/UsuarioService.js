angular.module('inspinia')
.service('usuario', function ($http) {
  var service = this

    service.GetUsuarios = function () {
        return executeAPI($http, 'GET', URI_Node + 'Autenticacao')
    };

    service.DeleteUsuario = function (id) {
        return executeAPI($http, 'DELETE', URI_Node + 'Admin/MateriaisColetados/' + id, null)
    };
})
