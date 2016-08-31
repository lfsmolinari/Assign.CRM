angular.module('inspinia')
.service('usuario', function ($http) {
  var service = this
    service.GetAllPermissions = function(){
        return executeAPI($http, 'GET', URI_Node + 'Admin/Permissoes')
    }
    service.GetUsuarios = function () {
        return executeAPI($http, 'GET', URI_Node + 'Autenticacao')
    };

    service.SaveUsuarioPermissions = function (user) {
        return executeAPI($http, 'PUT', URI_Node + 'Autenticacao/Permissoes/' + user._id, user)
    };

    service.DeleteUsuario = function (id) {
        return executeAPI($http, 'DELETE', URI_Node + 'Autenticacao/' + id, null)
    };
})
