angular.module('inspinia')
.service('security', function ($http) {
  var service = this

    service.GetEventosEntrega = function () {
        return executeAPI($http, 'GET', URI_Node + 'Eventos/Entrega')
    };

    service.GetEventosRetirada = function () {
        return executeAPI($http, 'GET', URI_Node + 'Eventos/Retirada')
    };

    service.AddUsuario = function (model) {
        return executeAPI($http, 'POST', URI_Node + 'Autenticacao', model)
    };

    service.FianlizaEvento = function (id, model) {
        return executeAPI($http, 'PUT', URI_Node + 'Eventos/Evento/' + id, model)
    };
})
