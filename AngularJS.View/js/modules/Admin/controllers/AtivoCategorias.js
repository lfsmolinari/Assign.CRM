angular.module('inspinia')
.controller('AtivoCategoriasCtrl', function ($scope, $http, SweetAlert, ativoCategoria) {
    $scope.Categoria = {};
    $scope.Resultado = {};
    $scope.Resultado.AtivoCategorias = new Array();
    $scope.Categoria.Descricao = "";

    $scope.refreshResults = function(){
        ativoCategoria.GetCategorias().then(function (resultado) {
            $scope.Resultado.AtivoCategorias = resultado.data;
        });
    }

    $scope.Inserir = function () {
      if($scope.Categoria.Descricao !== ""){
        ativoCategoria.AddCategoria($scope.Categoria).then(function (resultado) {
            //console.log(resultado);
            if (resultado.data.Success) {
                $scope.Categoria.Descricao = "";
                $scope.refreshResults();
            }
        });
      }
      else{
        SweetAlert.swal({
            title: "Alerta!",
            text: "Campo Categoria não pode estar vazio!",
            type: "warning",
            showCancelButton: false,
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: false
        });
      }

    }

    $scope.Excluir = function (index) {
        if ($scope.Resultado.AtivoCategorias[index]._id) {
            ativoCategoria.DeleteCategoria($scope.Resultado.AtivoCategorias[index]._id).then(function (resultado) {
                if (resultado.data.Success) {
                    $scope.refreshResults();

                    SweetAlert.swal({
                        title: "Sucesso!",
                        text: "Categoria foi deletada com sucesso!",
                        type: "success"
                    });
                } else {
                    SweetAlert.swal({
                        title: "Erro!",
                        text: "Não foi possível deletar a Categoria!\n" + resultado.data.Mensagem,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        closeOnCancel: false
                    });
                }
            });
        }
        else {
            $scope.Resultado.MateriaisColetados.splice(index, 1);
            SweetAlert.swal({
                title: "Sucesso!",
                text: "Categoria foi deletada com sucesso!",
                type: "success"
            });
        }
    }
    $scope.refreshResults();
});
