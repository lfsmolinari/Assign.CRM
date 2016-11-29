angular.module('inspinia')
.controller('UsuarioCtrl', function ($scope, $http, $uibModal, SweetAlert, usuario, Funcionario) {
    $scope.Usuario = {};
    $scope.Resultado = {};
    $scope.Resultado.Usuarios = new Array();
    $scope.Usuario.Descricao = "";

    $scope.refreshResults = function(){
        Funcionario.GetFuncionariosAtivos().then(function (resultado) {
            console.log(resultado.data);
            $scope.Resultado.Funcionarios = resultado.data;
        });
    }
    $scope.refreshResults();
    $scope.criarUsuario = function(index){
        var funcionario = $scope.Resultado.Funcionarios[index];
        var modalInstance = $uibModal.open({
            templateUrl: 'views/register.html'+ noCache('?'),
            controller: 'RegistrationCtrl',
            resolve: {
              model: function () {
                return {Funcionario : funcionario }
              }
            }
        });
        modalInstance.result.then(function (result) {
            $scope.refreshResults();
        });
    }
    $scope.gerenciarPermissoes = function(index){
        var funcionario = $scope.Resultado.Funcionarios[index];
        var modalInstance = $uibModal.open({
            templateUrl: 'views/permissoes.html'+ noCache('?'),
            controller: 'PermissaoCtrl',
            resolve: {
              model: function () {
                return {user : funcionario.User }
              }
            }
        });
    }
    $scope.Excluir = function (index) {
        var user = $scope.Resultado.Funcionarios[index].User;
        if (user && user._id) {
            usuario.DeleteUsuario(user._id).then(function (resultado) {
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
