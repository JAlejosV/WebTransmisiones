(function () {
    angular.module('api')
        .controller('ListarTiposTransmisionDocumentoController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {
                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();
                        if ($rootScope.DatosFormulario.TipoTransmisionDocumento == undefined)
                            $rootScope.DatosFormulario.TipoTransmisionDocumento = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.grillaListaDatosCargaMemoriaList == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.grillaListaDatosCargaMemoriaList = [];

                        $rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento = []
                        
                        $("#divPopupListarTiposTransmisionDocumento").width("400px");
                        $scope.FlagMostrarBotonGuardar = true;

                        CargarDatosIniciales();
                    });

                    function CargarDatosIniciales() {
                        $.ajax({
                            url: "/TransmisionDocumento/ListarTiposTransmisionDocumentoIndex",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data != null) {
                                    $rootScope.DatosFormulario.TipoTransmisionDocumento.TiposTransmisionDocumento = data.TiposTransmisionDocumento;
                                    $rootScope.DatosFormulario.TipoTransmisionDocumento.Codigo = data.TiposTransmisionDocumento[0].Codigo;
                                }
                            }
                        });
                    }

                    function MiAlertOk_success() {
                        $scope.$parent.SalirPopup_Click();
                    }

                    function TransmitirDocumento() {
                        var objRequest = new Object();
                        objRequest.ListaDocumento = $rootScope.DatosFormulario.AdministrarTransmisionDocumento.grillaListaDatosCargaMemoriaList;
                        objRequest.TipoTransmision = $rootScope.DatosFormulario.TipoTransmisionDocumento.Codigo;

                        var objRequest = { "request": objRequest };
                        $.ajax({
                            url: "/TransmisionDocumento/GrabarTransmisionDocumento",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: objRequest,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data.Result != null) {
                                    if (data.Result.Satisfactorio == true) {
                                        MiAlertOk('Se envio Documento a SUNAT', MiAlertOk_success());
                                    }
                                    else {
                                        MiAlert('Hubo problemas al enviar Manifiesto de Documento a SUNAT');
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
                        for (var indice in $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck) {
                            rowObject.push($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[indice]);
                        }

                        $rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento = rowObject;

                        if ($rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento.length > 0) {
                            var lista = $rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento;
                            var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });
                            if (filtroLista.length > 0) {
                                for (var i = 0; i < filtroLista.length; i++) {

                                    var newObjDocumento = {
                                        CodigoDocumento: filtroLista[i].CodigoDocumento
                                    }
                                    $rootScope.DatosFormulario.AdministrarTransmisionDocumento.grillaListaDatosCargaMemoriaList.push(newObjDocumento);
                                }
                                TransmitirDocumento();
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