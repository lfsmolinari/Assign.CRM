angular.module('inspinia')
.controller('UsuarioCtrl', function ($scope, $http, SweetAlert, usuario) {
    $scope.Usuario = {};
    $scope.Resultado = {};
    $scope.Resultado.Usuarios = new Array();
    $scope.Usuario.Descricao = "";

    $scope.refreshResults = function(){
        usuario.GetUsuarios().then(function (resultado) {
            $scope.Resultado.Usuarios = resultado.data;
        });
    }
    $scope.refreshResults();

    $scope.Excluir = function (index) {
        if ($scope.Resultado.Usuarios[index]._id) {
            usuario.DeleteUsuario($scope.Resultado.Usuarios[index]._id).then(function (resultado) {
                if (resultado.data.Success) {
                    $scope.refreshResults();

                    SweetAlert.swal({
                        title: "Sucesso!",
                        text: "Usuario foi deletado com sucesso!",
                        type: "success"
                    });
                } else {
                    SweetAlert.swal({
                        title: "Erro!",
                        text: "Não foi possível deletar o Usuario!\n" + resultado.data.Mensagem,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        closeOnCancel: false
                    });
                }
            });
        }
    }
})
