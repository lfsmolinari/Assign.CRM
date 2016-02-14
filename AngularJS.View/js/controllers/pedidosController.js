function metodosPedido($http, ENDPOINT_URI) {
    var service = this;//,
    //pathAdd = 'Pessoas',
    //pathUpd = 'Pessoas/Pessoa/';

    service.Salvar = function (item, isUpdate) {
        //if(isUpdate)
        //    return executeAPI($http, 'PUT', URI_Node + pathUpd + item.IdPessoa, item);
        //else
        //    return executeAPI($http, 'POST', URI_Node + pathAdd, item);
    };
}
function PedidoController($scope, $http, $stateParams, $q, $window, Pedido, SweetAlert, formaPagamento, materialColetado) {
    $scope.Cliente = {
        Enderecos: new Array(),
        Contatos: new Array(),
        TipoPessoa: 1
    };
    $scope.Produto = {};
    $scope.Endereco = {};
    $scope.Contato = {};
    $scope.salvarNovoEnd = false;
    $scope.isEdit = false;
    $scope.selectedEnd = {};
    $scope.format = 'dd-MM-yyyy';
    $scope.showPF = ($scope.Cliente.TipoPessoa === 1);
    $scope.isNovoCliente = false;
    $scope.FormasPagamentos = [];
    $scope.MateriaisColetados = [];
    formaPagamento.GetFormaPagamentos().then(function(resultado){
        $scope.FormasPagamentos = resultado.data;
    })
    materialColetado.GetMateriaisColetados().then(function(resultado){
        $scope.MateriaisColetados = resultado.data;
    })
    console.log($scope);
    $scope.FindCEP = function () {
        var endereco = procuraCEP($('#txtCep').val());

        if (endereco !== null) {
            $scope.Endereco.Endereco.Logradouro = endereco.Logradouro;
            $scope.Endereco.Endereco.Bairro = endereco.Bairro;
            $scope.Endereco.Endereco.Cidade = endereco.Cidade;
            $scope.Endereco.Endereco.UF = endereco.UF;
        }

    };

    $scope.EditarEnd = function () {
        $scope.isEdit = true;
        $scope.salvarNovoEnd = true;
    }

    $scope.AddNovoEndereco = function () {
        $scope.salvarNovoEnd = true;
        $scope.isEdit = true;
        $scope.Endereco = { Endereco: {}, PessoasEndereco: {} };
    }

    $scope.SalvarNovoEndereco = function () {
        if ($scope.Endereco.Endereco.CEP !== undefined && $scope.Endereco.Endereco.Numero !== undefined) {
            var isPrincipal = $scope.Endereco.PessoasEndereco.IsPrincipal === undefined ? false : $scope.Endereco.PessoasEndereco.IsPrincipal;
            if (isPrincipal) {
                var index = FindByProperty($scope.Cliente.Enderecos, "PessoasEndereco.IsPrincipal", true, $scope.Endereco);
                if (index > -1)
                    $scope.Cliente.Enderecos[index].PessoasEndereco.IsPrincipal = false;
            }
            //novoEndereco($scope.Endereco.Endereco, $scope.Cliente.Enderecos, isPrincipal);
            $scope.Endereco.Endereco.CEP = $scope.Endereco.Endereco.CEP.replace('-', '');
            $scope.Cliente.Enderecos.push($scope.Endereco);
            $scope.selectedEnd = $scope.Endereco;//$scope.Cliente.Enderecos[$scope.Cliente.Enderecos.length - 1];
            $scope.salvarNovoEnd = false;
            $scope.isEdit = false;
        }
        else {
            SweetAlert.swal({
                title: "Atenção!",
                text: "É necessário que preencha os campos de número e CEP, Obrigado!",
                type: "warning",
                showCancelButton: false,
                //confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok",
                closeOnConfirm: true,
                closeOnCancel: false
            },
           function (isConfirm) {
               $scope.Endereco.IsPrincipal = true;
           });
        }
    }

    $scope.CancelarNovoEndereco = function () {
        $scope.salvarNovoEnd = false;
        $scope.isEdit = false;
        $scope.Endereco = $scope.selectedEnd;
    }

    $scope.ChangeEndereco = function () {
        $scope.Endereco = $scope.selectedEnd;
        var endereco = procuraCEP($scope.Endereco.Endereco.CEP);
        if (endereco !== null) {
            $scope.Endereco.Endereco.Logradouro = endereco.Logradouro;
            $scope.Endereco.Endereco.Bairro = endereco.Bairro;
            $scope.Endereco.Endereco.Cidade = endereco.Cidade;
            $scope.Endereco.Endereco.UF = endereco.UF;
        }
        $scope.isEdit = false;
    }

    $scope.ChangePrincipalEnd = function () {
        var isPrincipal = $scope.Endereco.PessoasEndereco.IsPrincipal === undefined ? false : $scope.Endereco.PessoasEndereco.IsPrincipal;
        if ($scope.Cliente.Enderecos.length > 0) {
            var index = FindByProperty($scope.Cliente.Enderecos, "PessoasEndereco.IsPrincipal", true, $scope.Endereco);
            if (index > -1) {
                if (isPrincipal) {
                    if (arrayObjectIndexOf($scope.Cliente.Enderecos, $scope.Endereco) > -1)
                        $scope.Cliente.Enderecos[index].PessoasEndereco.IsPrincipal = false;
                }
            }
            else {
                SweetAlert.swal({
                    title: "Não foi possível alterar!",
                    text: "É necessário que pelo menos um endereço seja principal!",
                    type: "warning",
                    showCancelButton: false,
                    //confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    $scope.Endereco.IsPrincipal = true;
                });
            }
        }
    }

    $scope.ChangePersonType = function () {
        $scope.showPF = ($scope.Cliente.TipoPessoa === 1);
    }

    $scope.NovoCliente = function () {
        $scope.isNovoCliente = true;
    }

    $scope.ConsultarCpfCnpj = function () {
        var cpf = 0;
        var cnpj = 0;

        if ($scope.Cliente.TipoPessoa === 1 ) {
            cpf = $("#Cpf").val();
        }
        else if ($scope.Cliente.TipoPessoa === 2){
            cnpj = $("#Cnpj").val();
        }
        if (cpf !== '' && cnpj !== '' && !isNaN(cpf) && !isNaN(cnpj)) {
            executeAPI($http, 'GET', URI_Node + 'Pessoas/Pessoa/' + cpf + '/' + cnpj, null).then(function (resultado) {
                if (resultado.data !== null) {
                    $scope.Cliente = resultado.data;
                    var endereco = {};
                    var contato = {};

                    //console.log(pessoa.data.ContatoPessoal);
                    angular.forEach($scope.Cliente.Contatos, function (value, key) {
                        if (value.ContatoPessoal.TipoContato === 1) {
                            contato.Email = value.ContatoPessoal.Descricao;
                        }
                        if (value.ContatoPessoal.TipoContato === 2) {
                            contato.Telefone = value.ContatoPessoal.Descricao;
                        }
                        if (value.ContatoPessoal.TipoContato === 3) {
                            contato.Celular = value.ContatoPessoal.Descricao;
                        }
                    });
                    var index = FindByProperty($scope.Cliente.Enderecos, "PessoasEndereco.IsPrincipal", true, null);
                    if(index < 0)
                        index = 0;
                    $scope.selectedEnd = $scope.Cliente.Enderecos[index];
                    $scope.Endereco = $scope.Cliente.Enderecos[index];

                    var endereco = procuraCEP($scope.Endereco.Endereco.CEP);
                    if (endereco !== null) {
                        $scope.Endereco.Endereco.Logradouro = endereco.Logradouro;
                        $scope.Endereco.Endereco.Bairro = endereco.Bairro;
                        $scope.Endereco.Endereco.Cidade = endereco.Cidade;
                        $scope.Endereco.Endereco.UF = endereco.UF;
                    }

                    $scope.Contato = contato;
                }
                else{
                    SweetAlert.swal({
                        title: "Cliente não econtrado!",
                        text: "Deseja incluir um novo?",
                        type: "warning",
                        confirmButtonText: "Sim",
                        cancelButtonText:"Não",
                        showCancelButton:true
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            $scope.isNovoCliente = true;
                            var cpf= null, cnpj = null, tipoPessoa = $scope.Cliente.TipoPessoa;

                            if (tipoPessoa === 1)
                                cpf = $scope.Cliente.CPF;
                            else
                                cnpj = $scope.Cliente.CNPJ;
                            $scope.Cliente = {
                                Enderecos: new Array(),
                                Contatos: new Array(),
                                TipoPessoa: tipoPessoa,
                                CPF: cpf,
                                CNPJ: cnpj
                            };
                            
                            $scope.Endereco = {};
                            $scope.Contato = {};
                        }
                        else {
                            $scope.Cliente = {
                                Enderecos: new Array(),
                                Contatos: new Array(),
                                TipoPessoa: 1
                            };
                            
                            $scope.Endereco = {};
                            $scope.Contato = {};
                        }
                    });
                }
            });
        }
        else{
            $scope.Cliente = {
                        Enderecos: new Array(),
                        Contatos: new Array(),
                        TipoPessoa: 1
                    };
            $scope.Endereco = {};
            $scope.Contato = {};
        }
    }

    $scope.Salvar = function () {
        if($scope.isNovoCliente){
            if ($scope.Cliente.Contatos === undefined) {
                $scope.Cliente.Contatos = [];
            }
            ProcessaContatos($scope.Contato, $scope.Cliente.Contatos);
            $scope.Cliente.IsCliente = true;
            $scope.Cliente.StatusPessoa = 1;
            $scope.Cliente.DataCadastro = new Date();
            console.log($scope.Cliente);
            angular.forEach($scope.Cliente.Enderecos, function (value, key) {
                value.Endereco.CEP = value.Endereco.CEP.replace('-', '');
            });
            executeAPI($http, 'POST', URI_Node + 'Pessoas', $scope.Cliente).then(function (result) {
                    console.log(result);
                    //$scope.salved = result;
                    if (result.data.Success)
                       {}
                    else
                        {}
                });
        }

    }
}


angular.module('inspinia')
.controller('PedidoController', PedidoController)
.service('Pedido', metodosPedido);
