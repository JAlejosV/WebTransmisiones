(function () {
    angular.module('api')
        .controller('BuscarPersonaxRolController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {

                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();

                        if ($rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol == undefined)
                            $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol = new Object();

                        if ($rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro == undefined)
                            $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro = new Object();

                        $rootScope.FlagMostrarBotonSeleccionar = true;
                        $scope.Limpiar_Click();
                        CargaInicialRol();
                    });

                    function CargaInicialRol() {
                        var opcion = $rootScope.DatosFormulario.OpcionAgenteMaritimoItinerario;
                        var opcion2 = $rootScope.DatosFormulario.OpcionOperadorEmbarqueItinerario;
                        var opcion3 = $rootScope.DatosFormulario.OpcionOperadorDescargaItinerario;
                        var opcion4 = $rootScope.DatosFormulario.OpcionAlmacenCarga;
                        var opcion5 = $rootScope.DatosFormulario.OpcionDepositoCarga;
                        var opcion6 = $rootScope.DatosFormulario.OpcionClienteRol;

                        if (opcion == "RegistroItinerarioAM") {
                            $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.CodigoRol = 5; //(5=Rol Agente Maritimo)
                        }
                        if (opcion2 == "RegistroItinerarioOE" || opcion3 == "RegistroItinerarioOD") {
                            $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.CodigoRol = 14; //(14=Rol Operador Portuario)
                        }
                        if (opcion4 == "RegistroCargaAlmacen" || opcion5 == "RegistroCargaDeposito") {
                            $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.CodigoRol = 12; //(12=Rol TERMINAL DE ALMACENAMIENTO)
                        }
                        if (opcion6 == "RegistrarClienteRol") {
                            $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.CodigoRol = $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol;
                        }

                    }

                    $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
                        var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
                        var estado = ProcesarSeleccionado(data);
                        if (estado) {
                            $rootScope.$apply();
                            $scope.$parent.SalirPopup_Click();
                        }
                    }

                    function ProcesarSeleccionado(data) {
                        var opcion = $rootScope.DatosFormulario.OpcionAgenteMaritimoItinerario;
                        var opcion2 = $rootScope.DatosFormulario.OpcionOperadorEmbarqueItinerario;
                        var opcion3 = $rootScope.DatosFormulario.OpcionOperadorDescargaItinerario;
                        var opcion4 = $rootScope.DatosFormulario.OpcionAlmacenCarga;
                        var opcion5 = $rootScope.DatosFormulario.OpcionDepositoCarga;
                        var opcion6 = $rootScope.DatosFormulario.OpcionClienteRol;

                        if (opcion == "RegistroItinerarioAM") {
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoAgenteMaritimoItinerario = data.CodigoPersona;
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAgenteMaritimoItinerario = data.RazonSocialPersona;
                        }

                        if (opcion2 == "RegistroItinerarioOE") {
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoOperadorEmbarqueItinerario = data.CodigoPersona;
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorEmbarqueItinerario = data.RazonSocialPersona;
                        }

                        if (opcion3 == "RegistroItinerarioOD") {
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoOperadorDescargaItinerario = data.CodigoPersona;
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorDescargaItinerario = data.RazonSocialPersona;
                        }

                        if (opcion4 == "RegistroCargaAlmacen") {
                            $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoAlmacenDocumentoDetalleCarga = data.CodigoPersona;
                            $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreAlmacen = data.RazonSocialPersona;
                        }

                        if (opcion5 == "RegistroCargaDeposito") {
                            $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoDepositoDocumentoDetalleCarga = data.CodigoPersona;
                            $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreDeposito = data.RazonSocialPersona;
                        }

                        if (opcion6 == "RegistrarClienteRol") {
                            $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoPersona = data.CodigoPersona;
                            $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona = data.RazonSocialPersona;
                        }

                        return true;
                    }

                    $scope.Seleccionar_Click = function () {
                        var rowKey = jQuery("#grillaListaPersonaxRol").jqGrid('getGridParam', 'selrow');
                        if (rowKey != undefined) {
                            if (rowKey.length > 0) {
                                var rowObject = jQuery('#grillaListaPersonaxRol').getRowData(rowKey);
                                var estado = ProcesarSeleccionado(rowObject);
                                if (estado) {
                                    $scope.$parent.SalirPopup_Click();
                                }
                                $(".caja11.msgerror.Objeto").html("");
                            } else {
                                $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                            }
                        } else {
                            $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                        }
                    }

                    $scope.Limpiar_Click = function () {
                        $(".caja11.msgerror.Objeto").html("");
                        $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.RazonSocialPersona = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.NumeroDocumentoPersona = null;

                    }
                    $scope.Salir_Click = function () {
                        $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.RazonSocialPersona = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.NumeroDocumentoPersona = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro.CodigoRol = null;
                        $scope.$parent.SalirPopup_Click();
                    }

                    $scope.Buscar_Click = function () {
                        if ($rootScope.EsEnter) {
                            return false;
                        }
                        miBlock(true, "#divPopupBuscarPersonaxRol");
                        var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaPersonaxRol.Filtro)) };
                        $scope.gridapigrillaListaPersonaxRol.find(objRequest);
                        miBlock(false, "#divPopupBuscarPersonaxRol");

                    }

                    $scope.Enter = function () {
                        $rootScope.EsEnter = true;
                        return false;
                    }
                    $("input").focusout(function () {
                        $rootScope.EsEnter = false;
                    });

                }]);
})();