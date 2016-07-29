angular.module('inspinia')
.controller('RegistrationCtrl', ['$scope', '$http',  '$uibModal', 'SweetAlert', 'security', function ($scope, $http,  $uibModal, SweetAlert, security) {
    $scope.Usuario = {};
    $scope.SaveUsario = function () {
      debugger;
      security.AddUsuario($scope.Usuario).then(function(result) {
        console.log(result);
      })
    }
    
}]);
