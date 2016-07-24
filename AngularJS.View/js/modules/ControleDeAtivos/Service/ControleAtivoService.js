angular.module('inspinia')
.service('controleAtivo', function ($http) {
  var service = this

    service.GetCategorias = function () {
        return executeAPI($http, 'GET', URI_Node + 'Admin/CategoriaAtivos')
    };

    service.GetAtivos = function () {
        return executeAPI($http, 'GET', URI_Node + 'ControleAtivos')
    };

    service.AddAtivo = function (model) {
        return executeAPI($http, 'POST', URI_Node + 'ControleAtivos', model)
    };

    service.FianlizaEvento = function (id, model) {
        return executeAPI($http, 'PUT', URI_Node + 'ControleAtivos/' + id, model)
    };
})
