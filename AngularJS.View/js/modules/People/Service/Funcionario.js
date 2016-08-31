angular.module('inspinia')
.service('Funcionario', function ($http) {
  var service = this;
    service.GetFuncionarios = function () {
        return  executeAPI($http, 'GET', URI_Node + 'Funcionarios', null);
    };
    service.GetFuncionariosAtivos = function () {
        return  executeAPI($http, 'GET', URI_Node + 'Funcionarios/Ativos', null);
    };

    service.Salvar = function (item, isUpdate) {
        if(isUpdate)
            return executeAPI($http, 'PUT', URI_Node + 'Funcionarios/Funcionario/' + item._id, item);
        else
            return executeAPI($http, 'POST', URI_Node + 'Funcionarios', item);
    };
});
