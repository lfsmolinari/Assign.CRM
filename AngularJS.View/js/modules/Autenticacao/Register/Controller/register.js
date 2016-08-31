angular.module('inspinia')
.controller('RegistrationCtrl', ['$scope', '$http',  '$uibModalInstance', 'SweetAlert', 'security','authToken', '$state','model',
function ($scope, $http,  $uibModalInstance, SweetAlert, security, authToken, $state, model) {
    debugger;
    $scope.Usuario = {};
    $scope.Usuario.Funcionario = model.Funcionario;
    $scope.SaveUsario = function () {
      security.AddUsuario($scope.Usuario).then(function(result) {
        console.log(result);
        if(result.data.Success){
          //authToken.setToken(result.data.session.token);
          //$state.go('dashboard');
           $uibModalInstance.dismiss('success')
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
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
}]);
