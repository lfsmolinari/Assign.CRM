angular.module('inspinia')
.controller('RegistrationCtrl', ['$scope', '$http',  '$uibModal', 'SweetAlert', 'security','authToken', '$state',
function ($scope, $http,  $uibModal, SweetAlert, security, authToken, $state) {
    $scope.Usuario = {};
    $scope.SaveUsario = function () {
      security.AddUsuario($scope.Usuario).then(function(result) {
        console.log(result);
        if(result.data.Success){
          authToken.setToken(result.data.session.token);
          $state.go('dashboard');
        }
        else {
                SweetAlert.swal({
                    title: "Alerta!",
                    text: result.data.Mensagem,
                    type: "warning",
                    showCancelButton: false,
                    //confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    closeOnCancel: false
                });
            }
      })
    }
    
}]);