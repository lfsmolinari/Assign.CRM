angular.module('inspinia')
.controller('LoginCtrl', ['$scope', '$http',  '$uibModal', 'SweetAlert', 'security','authToken', '$state',
function ($scope, $http,  $uibModal, SweetAlert, security, authToken, $state) {
    $scope.Usuario = {};
    $scope.Submit = function () {
      security.Login($scope.Usuario).then(function(result) {
        console.log(result);
        if(result.data.Success){
          authToken.setSession(result.data.session);
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
    authToken.logout();
    
}]);
