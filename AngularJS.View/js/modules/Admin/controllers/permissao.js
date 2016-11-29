angular.module('inspinia')
.controller('PermissaoCtrl', ['$scope', '$http',  '$uibModalInstance', 'SweetAlert','usuario', 'security','authToken', '$state','model',
function ($scope, $http,  $uibModalInstance, SweetAlert, usuario, security, authToken, $state, model) {
    $scope.Usuario = {};
    $scope.Usuario = model.user;
    usuario.GetAllPermissions().then(function(result){
      var permissoes =  result.data
      angular.forEach(permissoes, function(item){
        if($scope.Usuario.Roles.indexOf(item._id) > -1){
          item.Active = true;
        }
      })
      $scope.Resultado = {Permissoes :permissoes};
    });
    $scope.SaveUsario = function () {
      $scope.Usuario.Roles = Enumerable.From($scope.Resultado.Permissoes).Where(function(r){ return r.Active}).Select(function(p){return p._id}).ToArray();
      usuario.SaveUsuarioPermissions($scope.Usuario).then(function(result) {
        console.log(result);
        if(result.data.Success){
           $uibModalInstance.close('success')
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
