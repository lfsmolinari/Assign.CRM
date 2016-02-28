angular.module('inspinia')
.controller('EventoController', function ($scope, $http, SweetAlert, evento) {
    $scope.Evento = {};
    $scope.searchForm = "";
    $scope.Resultado = {};
    $scope.Resultado.Eventos = new Array();

    $scope.refreshResults = function(){
        evento.GetEventosAtivos().then(function (resultado) {
          console.log(resultado.data);
            $scope.Eventos = resultado.data;
            var itensPedidos = Enumerable.From(resultado.data).Select(function(evento){
              console.log(evento);
              return Enumerable.From(evento.Pedido.ItensPedidos).Select(function(item){
                  return { idEvento: evento._id, codigoPedido:evento.Pedido.CodigoPedido, EndEntrega: evento.Pedido.EndEntrega , itemPedido: item}
              }).ToArray();
            }).ToArray();
            var itens = [];
            for (var i = 0; i < itensPedidos.length; i++) {
              for (var j = 0; j < itensPedidos[i].length; j++) {
                itens.push(itensPedidos[i][j]);
              }
            }
            $scope.Resultado.Eventos = Enumerable.From(itens).OrderBy(function(i){ return i.itemPedido.DataEntrega}).ToArray();
            console.log(itens)
        });
    }
    $scope.refreshResults();
    $scope.Inserir = function () {
         evento.AddEvento($scope.Evento).then(function (resultado) {
            //console.log(resultado);
            if (resultado.data.Success) {
                $scope.refreshResults();
            }
        });
    }
});
