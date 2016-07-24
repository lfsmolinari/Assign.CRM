angular.module('inspinia')
.service('ativoCategoria', function ($http) {
  var service = this

    service.GetCategorias = function () {
        return executeAPI($http, 'GET', URI_Node + 'Admin/CategoriaAtivos')
    };

    service.AddCategoria = function (model) {
        return executeAPI($http, 'POST', URI_Node + 'Admin/CategoriaAtivos', model)
    };

    service.DeleteCategoria = function (id) {
        return executeAPI($http, 'DELETE', URI_Node + 'Admin/CategoriaAtivos/' + id, null)
    };
})
