(function () {
    angular.module('api')
        .controller('ListarTiposTransmisionNaveController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {
                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();
                        if ($rootScope.DatosFormulario.TipoTransmisionNave == undefined)
                            $rootScope.DatosFormulario.TipoTransmisionNave = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList = [];

                        $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave = []
                        //if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos == undefined)
                        //    $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos = new Object();
                        $("#divPopupListarTiposTransmisionNave").width("400px");
                        $scope.FlagMostrarBotonGuardar = true;

                        CargarDatosIniciales();
                    });

                    function CargarDatosIniciales() {
                        $.ajax({
                            url: "/TransmisionNave/ListarTiposTransmisionNaveIndex",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data != null) {
                                    $rootScope.DatosFormulario.TipoTransmisionNave.TiposTransmisionNave = data.TiposTransmisionNave;
                                    $rootScope.DatosFormulario.TipoTransmisionNave.Codigo = data.TiposTransmisionNave[0].Codigo;
                                }
                            }
                        });
                    }

                    function MiAlertOk_success() {
                        $scope.$parent.SalirPopup_Click();
                    }

                    function TransmitirNave() {
                        var objRequest = new Object();
                        objRequest.ListaItinerario = $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList;
                        objRequest.TipoTransmision = $rootScope.DatosFormulario.TipoTransmisionNave.Codigo;

                        var objRequest = { "request": objRequest };
                        $.ajax({
                            url: "/TransmisionNave/GrabarTransmisionNave",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: objRequest,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data.Result != null) {
                                    if (data.Result.Satisfactorio == true) {
                                        MiAlertOk('Se envio Manifiesto de Nave a SUNAT', MiAlertOk_success());
                                    }
                                    else {
                                        MiAlert('Hubo problemas al enviar Manifiesto de Nave a SUNAT');
                                    }
                                } else {
                                    MiAlert("Ocurrio un problema interno en el sistema.");
                                }
                            }
                        });
                    }

                    $scope.Salir_Click = function () {
                        $scope.$parent.SalirPopup_Click();
                    }

                    $scope.Enter = function () {
                        $rootScope.EsEnter = true;
                        return false;
                    }

                    $("input").focusout(function () {
                        $rootScope.EsEnter = false;
                    });

                    $scope.Guardar_Click = function () {
                        var rowObject = new Array();
                        for (var indice in $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck) {
                            rowObject.push($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[indice]);
                        }

                        $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave = rowObject;

                        if ($rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave.length > 0) {
                            var lista = $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave;
                            var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });
                            if (filtroLista.length > 0) {
                                for (var i = 0; i < filtroLista.length; i++) {

                                    var newObjItinerario = {
                                        CodigoItinerario: filtroLista[i].CodigoItinerario
                                    }
                                    $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList.push(newObjItinerario);
                                }
                                TransmitirNave();
                                $(".caja11.msgerror.listaSeleccionada").html("");
                                $scope.Buscar_Click();
                            } else {
                                $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                                return false;
                            }


                        } else {
                            $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                            return false;
                        }
                    }

                }]);
})();