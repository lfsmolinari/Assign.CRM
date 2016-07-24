angular.module('inspinia')
.controller('ControleAtivoCtrl', ['$scope', '$http',  '$uibModal', 'SweetAlert','controleAtivo' ,'centroDeCusto',
  function ($scope, $http,  $uibModal, SweetAlert, controleAtivo, centroDeCusto) {
    $scope.model = {};
    controleAtivo.GetCategorias().then(function(resp){
        $scope.Categorias = resp.data;
    });
    centroDeCusto.GetCentroDeCustos().then(function(resp){
      $scope.CentroDeCustos = resp.data;
    });
  }]);
