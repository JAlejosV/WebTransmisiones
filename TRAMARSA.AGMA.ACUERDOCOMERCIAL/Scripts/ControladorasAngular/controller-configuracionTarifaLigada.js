(function () {
    angular.module('api')
        .controller('ConfiguracionTarifaLigadaController',
        ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile', '$attrs',
            function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile, $attrs) {

                $timeout(function () {
                    if ($rootScope.DatosFormulario == undefined)
                        $rootScope.DatosFormulario = new Object();
                    if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada == undefined)
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada = new Object();
                    if ($rootScope.DatosFormulario.DatosConfiguracionTarifaLigada == undefined)
                        $rootScope.DatosFormulario.DatosConfiguracionTarifaLigada = new Object();
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfiguracionList = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaMontoFijo = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Deshabilitada = "False";
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo = null;
                    $('.InputTEXT_Numeric').keyup(function () {
                        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
                            this.value = this.value.replace(/[^0-9\.]/g, '');
                        }
                    });
                    $('#PorcentajeTarifaBase').keypress(function (event) {
                        if (event.which != 8 && isNaN(String.fromCharCode(event.which)) && event.which != 44 && event.which != 46) {
                            event.preventDefault();
                        }
                    });
                    $('#PorcentajeTarifaLigada').keypress(function (event) {
                        if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
                            event.preventDefault();
                        }
                    });
                    $scope.FlagMostrarBotonGuardar = $scope.FlagEditing;
                    observadorAtributos();
                    $scope.CargarDatosIniciales();
                });

                $scope.CargarDatosIniciales = function () {
                    $.ajax({
                        url: "/ConfiguracionTarifaLigada/ConfiguracionTarifaLigadaIndex",
                        type: "POST",
                        headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                        data: "",
                        dataType: "json",
                        cache: true,
                        async: false,
                        success: function (data) {
                            if (data != null) {
                                $rootScope.DatosFormulario.DatosConfiguracionTarifaLigada.Moneda = data.Moneda;
                                $rootScope.DatosFormulario.DatosConfiguracionTarifaLigada.ConfiguracionList = data.Configuracion;
                                for (var i = 0; i < data.Configuracion.length; i++) {
                                    if ("MF" == data.Configuracion[i].Codigo) {
                                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionMontoFijo = data.Configuracion[i].Descripcion;
                                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo = data.Configuracion[i].Codigo;
                                    }
                                    else if ("PTL" == data.Configuracion[i].Codigo) {
                                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionPorTarifaLigada = data.Configuracion[i].Descripcion;
                                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaLigada = data.Configuracion[i].Codigo;

                                    }
                                    else if ("PTB" == data.Configuracion[i].Codigo) {
                                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionPorTarifaBase = data.Configuracion[i].Descripcion;
                                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaBase = data.Configuracion[i].Codigo;
                                    }
                                }
                            } else {
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionMontoFijo = "Monto Fijo";
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo = "MF";
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionPorTarifaLigada = "Porcentaje de Tarifa Ligada";
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaLigada = "PTL";
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionPorTarifaBase = "Porcentaje de Tarifa Base";
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaBase = "PTB";
                            }
                            $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLocalVigencia = $scope.row.CodigoTarifaLocalVigencia;
                            $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaEscalonadaVigencia = $scope.row.CodigoTarifaEscalonadaVigencia;
                            $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.IdConfiguracionTarifaLigada = $scope.row.IdConfiguracionTarifaLigada;
                            $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo;
                            $("#MontoFijo").prop("checked", true);


                            if ($scope.$parent.ModoPagina == "Editar") {
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck = $scope.row.CodigoConfiguracionTarifaLigada;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada = $scope.row.CodigoMonedaTarifaLigada;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa = $scope.row.CodigoTarifa;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal = $scope.row.CodigoTarifaLigadaLocal;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLocalVigencia = $scope.row.CodigoTarifaLocalVigencia;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaEscalonadaVigencia = $scope.row.CodigoTarifaEscalonadaVigencia;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa = $scope.row.DescripcionTarifaLocal;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda = $scope.row.DescripcionMonedaBase;
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto = $scope.row.MontoTarifaLocal;
                                if ($scope.row.CodigoConfiguracionTarifaLigada == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo) {
                                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaMontoFijo = $scope.row.CodigoMoneda;
                                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo = $scope.row.Monto;
                                }
                                else if ($scope.row.CodigoConfiguracionTarifaLigada == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaLigada) {
                                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada = $scope.row.CodigoMoneda;
                                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada = '' + $scope.row.Porcentaje + '';
                                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada = $scope.row.Monto;
                                } else if ($scope.row.CodigoConfiguracionTarifaLigada == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaBase) {
                                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase = '' + $scope.row.Porcentaje + '';
                                }
                            } else {
                                $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo = "0";
                            }
                        }
                    });
                }

                $scope.BuscarTarifaLigada_Click = function () {
                    var opc = $rootScope.DatosFormulario.OpcionTarifaLigada;
                    if (opc == "TarifaEscalonada") {
                        $rootScope.DatosFormulario.OpcionTarifaGenerales = "TarifaEscalonada";
                        getPopupResponsive({
                            formURL: "TarifaGenerales/BuscarTarifaGenerales",
                            title: "Buscar Tarifas Generales",
                            nombreDiv: "divPopupBuscarTarifaLigada",
                            nombreGrid: "",
                            width: "1200px",
                            height: 800,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $compile($("#divPopupBuscarTarifaLigada"))($scope);
                            }
                        });
                    } else if (opc == "AcuerdoComercialEscalonado") {
                        $rootScope.DatosFormulario.OpcionTarifaGenerales = "AcuerdoComercialEscalonado";
                        getPopupResponsive({
                            formURL: "TarifaGenerales/BuscarTarifaGenerales",
                            title: "Buscar Tarifas Generales",
                            nombreDiv: "divPopupBuscarTarifaLigada",
                            nombreGrid: "",
                            width: "1200px",
                            height: 800,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $compile($("#divPopupBuscarTarifaLigada"))($scope);
                            }
                        });

                    } else {
                        $rootScope.DatosFormulario.OpcionTarifaGenerales = "TarifaLigada";
                        getPopupResponsive({
                            formURL: "TarifaGenerales/BuscarTarifaGenerales",
                            title: "Buscar Tarifas Generales",
                            nombreDiv: "divPopupBuscarTarifaLigada",
                            nombreGrid: "",
                            width: "1200px",
                            height: 800,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $compile($("#divPopupBuscarTarifaLigada"))($scope);
                            }
                        });
                    }

                }

                $scope.Salir_Click = function () {
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfiguracionList = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaMontoFijo = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLocalVigencia = null;
                    $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaEscalonadaVigencia = null;
                    $scope.$parent.SalirPopup_Click();
                }

                $scope.Guardar_Click = function () {
                    if (validacionesCamposGuardar()) {
                        return false;
                    }
                    if (!validarExisteTarifa()) {
                        return false;
                    }
                    var vPorcentaje = null;
                    var vCodigoMoneda = null;
                    var vMonedaDescripcion = null;
                    var vMonto = null;
                    var vDescripcionConfiguracionTarifaLigada = null;
                    var objPagoTmp = new Object();
                    if ($rootScope.DatosFormulario.OpcionTarifaLigada == "TarifaLocal") {
                        objPagoTmp.CodigoTarifaLocal = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal;
                    }
                    else if ($rootScope.DatosFormulario.OpcionTarifaLigada == "AcuerdoComercialLocal") {
                        objPagoTmp.IdConfiguracionTarifa = $rootScope.DatosFormulario.DatosTarifaLigadaAC.IdConfiguracionTarifa;
                        objPagoTmp.CodigoAcuerdoComercialLocal = $rootScope.DatosFormulario.DatosTarifaLigadaAC.CodigoAcuerdoComercialLocal;
                        objPagoTmp.CodigoTarifaLocal = $rootScope.DatosFormulario.DatosTarifaLigadaAC.CodigoTarifaLocal;
                    }
                    else if ($rootScope.DatosFormulario.OpcionTarifaLigada == "AcuerdoComercialEscalonado") {
                        objPagoTmp.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.CodigoAcuerdoComercialEscalonado;
                        objPagoTmp.CodigoTarifaLocal = $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.CodigoTarifaEscalonado;
                    }
                    if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo) {
                        vDescripcionConfiguracionTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionMontoFijo;
                        vCodigoMoneda = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaMontoFijo;
                        vMonto = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo;
                    }
                    else if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaLigada) {
                        vDescripcionConfiguracionTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionPorTarifaLigada;
                        vCodigoMoneda = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada;
                        vPorcentaje = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada;
                        vMonto = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada;

                    } else if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaBase) {
                        vDescripcionConfiguracionTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionPorTarifaBase;
                        vPorcentaje = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase;
                    }
                    if (vCodigoMoneda != null) {
                        for (var j = 0; j < $rootScope.DatosFormulario.DatosConfiguracionTarifaLigada.Moneda.length; j++) {
                            if ($rootScope.DatosFormulario.DatosConfiguracionTarifaLigada.Moneda[j].Codigo == vCodigoMoneda) {
                                vMonedaDescripcion = $rootScope.DatosFormulario.DatosConfiguracionTarifaLigada.Moneda[j].Nombre;
                            }
                        }
                    }
                    objPagoTmp.IdConfiguracionTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.IdConfiguracionTarifaLigada;
                    objPagoTmp.CodigoTarifa = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa;
                    objPagoTmp.CodigoTarifaLigadaLocal = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal;
                    objPagoTmp.CodigoTarifaLocalVigencia = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLocalVigencia;
                    objPagoTmp.CodigoTarifaEscalonadaVigencia = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaEscalonadaVigencia;
                    objPagoTmp.DescripcionTarifaLocal = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa;
                    objPagoTmp.DescripcionMonedaBase = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda;
                    objPagoTmp.MontoTarifaLocal = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto;
                    objPagoTmp.DescripcionConfiguracionTarifaLigada = vDescripcionConfiguracionTarifaLigada;
                    objPagoTmp.Porcentaje = vPorcentaje;
                    objPagoTmp.CodigoMoneda = vCodigoMoneda;
                    objPagoTmp.Moneda = vMonedaDescripcion;
                    objPagoTmp.Monto = vMonto != null ? parseFloat(Math.round(vMonto * 100) / 100).toFixed(2) : null;
                    objPagoTmp.CodigoConfiguracionTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck;
                    objPagoTmp.CodigoMonedaTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada;

                    var listaGrillaLigada = [];
                    var listaBaseLigada = [];
                    var listaGrilla = [];
                    var listaBase = [];
                    //Inicio Tarifa Escalonada
                    if ($rootScope.DatosFormulario.OpcionTarifaLigada == "TarifaEscalonada") {
                        listaGrillaLigada = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada;
                        listaBaseLigada = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria;
                        var newObjTarifa = {
                            IdConfiguracionTarifaLigada: objPagoTmp.IdConfiguracionTarifaLigada,
                            CodigoTarifa: objPagoTmp.CodigoTarifa,
                            CodigoTarifaEscalonadaVigencia: objPagoTmp.CodigoTarifaEscalonadaVigencia,
                            CodigoTarifaLigadaEscalonada: objPagoTmp.CodigoTarifaLigadaLocal,
                            DescripcionTarifaEscalonada: objPagoTmp.DescripcionTarifaLocal,
                            CodigoTarifaEscalonada: objPagoTmp.CodigoTarifaLocal,
                            MonedaTarifaEscalonada: objPagoTmp.MonedaTarifaLocal,
                            MontoTarifaEscalonada: objPagoTmp.MontoTarifaLocal,
                            DescripcionConfiguracionTarifaLigada: objPagoTmp.DescripcionConfiguracionTarifaLigada,
                            Porcentaje: objPagoTmp.Porcentaje,
                            CodigoMoneda: objPagoTmp.CodigoMoneda,
                            Moneda: objPagoTmp.Moneda,
                            Monto: objPagoTmp.Monto,
                            DescripcionMonedaBase: objPagoTmp.DescripcionMonedaBase,
                            CodigoConfiguracionTarifaLigada: objPagoTmp.CodigoConfiguracionTarifaLigada,
                            CodigoMonedaTarifaLigada: objPagoTmp.CodigoMonedaTarifaLigada
                        }
                        if ($scope.$parent.ModoPagina === "Nuevo") {
                            newObjTarifa.Accion = "I";
                            listaBaseLigada.push(newObjTarifa);
                            if ($.inArray(newObjTarifa, listaGrillaLigada) > -1) {
                            } else {
                                listaGrillaLigada.push(newObjTarifa);
                            }
                        }
                        else if ($scope.$parent.ModoPagina === "Editar") {
                            listaGrilla = [];
                            listaBase = [];
                            for (var x = 0; x < listaGrillaLigada.length; x++) {
                                if (listaGrillaLigada[x].IdConfiguracionTarifaLigada === newObjTarifa.IdConfiguracionTarifaLigada) {
                                    if (listaGrillaLigada[x].IdConfiguracionTarifaLigada < 0) {
                                        newObjTarifa.Accion = "I";
                                    } else {
                                        newObjTarifa.Accion = "U";
                                    }
                                    listaGrilla.push(newObjTarifa);
                                } else {
                                    listaGrilla.push(listaGrillaLigada[x]);
                                }
                            }
                            if (listaBaseLigada.length > 0) {
                                for (var x = 0; x < listaBaseLigada.length; x++) {
                                    if (listaBaseLigada[x].IdConfiguracionTarifaLigada === newObjTarifa.IdConfiguracionTarifaLigada) {
                                        if (listaBaseLigada[x].IdConfiguracionTarifaLigada < 0) {
                                            newObjTarifa.Accion = "I";
                                        } else {
                                            newObjTarifa.Accion = "U";
                                        }
                                        listaBase.push(newObjTarifa);
                                    } else {
                                        listaBase.push(listaBaseLigada[x]);
                                    }
                                }
                            } else {
                                newObjTarifa.Accion = "I";
                                listaBase.push(newObjTarifa);
                            }
                            listaGrillaLigada = listaGrilla;
                            listaBaseLigada = listaBase;
                        }
                        $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada = listaGrillaLigada;
                        $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria = listaBaseLigada;
                    }

                    //Fin Tarifa Escalonada

                    //Inicio Acuerdo Escalonado
                    else if ($rootScope.DatosFormulario.OpcionTarifaLigada == "AcuerdoComercialEscalonado") {
                        listaGrillaLigada = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada;
                        listaBaseLigada = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria;
                        var newObjTarifaAce = {
                            IdConfiguracionTarifaLigada: objPagoTmp.IdConfiguracionTarifaLigada,
                            CodigoTarifa: objPagoTmp.CodigoTarifa,
                            CodigoTarifaLigadaEscalonado: objPagoTmp.CodigoTarifaLigadaLocal,
                            DescripcionTarifaEscalonada: objPagoTmp.DescripcionTarifaLocal,
                            CodigoTarifaEscalonado: objPagoTmp.CodigoTarifaLocal,
                            MonedaTarifaEscalonada: objPagoTmp.MonedaTarifaLocal,
                            MontoTarifaEscalonada: objPagoTmp.MontoTarifaLocal,
                            DescripcionConfiguracionTarifaLigada: objPagoTmp.DescripcionConfiguracionTarifaLigada,
                            Porcentaje: objPagoTmp.Porcentaje,
                            CodigoMoneda: objPagoTmp.CodigoMoneda,
                            Moneda: objPagoTmp.Moneda,
                            Monto: objPagoTmp.Monto,
                            DescripcionMonedaBase: objPagoTmp.DescripcionMonedaBase,
                            CodigoConfiguracionTarifaLigada: objPagoTmp.CodigoConfiguracionTarifaLigada,
                            CodigoMonedaTarifaLigada: objPagoTmp.CodigoMonedaTarifaLigada,
                            CodigoAcuerdoComercialEscalonado: objPagoTmp.CodigoAcuerdoComercialEscalonado
                        }
                        if ($scope.$parent.ModoPagina === "Nuevo") {
                            newObjTarifaAce.Accion = "I";
                            listaBaseLigada.push(newObjTarifaAce);
                            if ($.inArray(newObjTarifaAce, listaGrillaLigada) > -1) {
                            } else {
                                listaGrillaLigada.push(newObjTarifaAce);
                            }
                        }
                        else if ($scope.$parent.ModoPagina === "Editar") {
                            listaGrilla = [];
                            listaBase = [];
                            for (var x = 0; x < listaGrillaLigada.length; x++) {
                                if (listaGrillaLigada[x].IdConfiguracionTarifaLigada === newObjTarifaAce.IdConfiguracionTarifaLigada) {
                                    if (listaGrillaLigada[x].IdConfiguracionTarifaLigada < 0) {
                                        newObjTarifaAce.Accion = "I";
                                    } else {
                                        newObjTarifaAce.Accion = "U";
                                    }
                                    listaGrilla.push(newObjTarifaAce);
                                } else {
                                    listaGrilla.push(listaGrillaLigada[x]);
                                }
                            }
                            if (listaBaseLigada.length > 0) {
                                for (var x = 0; x < listaBaseLigada.length; x++) {
                                    if (listaBaseLigada[x].IdConfiguracionTarifaLigada === newObjTarifaAce.IdConfiguracionTarifaLigada) {
                                        if (listaBaseLigada[x].IdConfiguracionTarifaLigada < 0) {
                                            newObjTarifaAce.Accion = "I";
                                        } else {
                                            newObjTarifaAce.Accion = "U";
                                        }
                                        listaBase.push(newObjTarifaAce);
                                    } else {
                                        listaBase.push(listaBaseLigada[x]);
                                    }
                                }
                            } else {
                                newObjTarifaAce.Accion = "I";
                                listaBase.push(newObjTarifaAce);
                            }
                            listaGrillaLigada = listaGrilla;
                            listaBaseLigada = listaBase;
                        }
                        $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada = listaGrillaLigada;
                        $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria = listaBaseLigada;
                    }
                    //Fin Acuerdo Escalonado
                    else {
                        listaGrillaLigada = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria;
                        listaBaseLigada = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList;
                        if ($scope.$parent.ModoPagina === "Nuevo") {
                            objPagoTmp.Accion = "I";
                            listaBaseLigada.push(objPagoTmp);
                            if ($.inArray(objPagoTmp, listaGrillaLigada) > -1) {
                            } else {
                                listaGrillaLigada.push(objPagoTmp);
                            }
                            if ($rootScope.DatosFormulario.OpcionTarifaLigada == "AcuerdoComercialLocal") {
                                $rootScope.DatosFormulario.DatosTarifaLigadaAC.IdCount = parseInt($rootScope.DatosFormulario.DatosTarifaLigadaAC.IdCount) + 1;
                            }
                        }
                        else if ($scope.$parent.ModoPagina === "Editar") {
                            listaGrilla = [];
                            listaBase = [];
                            for (var x = 0; x < listaGrillaLigada.length; x++) {
                                if (listaGrillaLigada[x].IdConfiguracionTarifaLigada === objPagoTmp.IdConfiguracionTarifaLigada) {
                                    if (listaGrillaLigada[x].IdConfiguracionTarifaLigada <= 0) {
                                        objPagoTmp.Accion = "I";
                                    } else {
                                        objPagoTmp.Accion = "U";
                                    }
                                    listaGrilla.push(objPagoTmp);
                                } else {
                                    listaGrilla.push(listaGrillaLigada[x]);
                                }
                            }
                            if (listaBaseLigada.length > 0) {
                                for (var x = 0; x < listaBaseLigada.length; x++) {
                                    if (listaBaseLigada[x].IdConfiguracionTarifaLigada === objPagoTmp.IdConfiguracionTarifaLigada) {
                                        if (listaBaseLigada[x].IdConfiguracionTarifaLigada <= 0) {
                                            objPagoTmp.Accion = "I";
                                        } else {
                                            objPagoTmp.Accion = "U";
                                        }
                                        listaBase.push(objPagoTmp);
                                    } else {
                                        listaBase.push(listaBaseLigada[x]);
                                    }
                                }
                            } else {
                                objPagoTmp.Accion = "I";
                                listaBase.push(objPagoTmp);
                            }
                            listaGrillaLigada = listaGrilla;
                            listaBaseLigada = listaBase;
                        }
                        $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = listaGrillaLigada;
                        $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = listaBaseLigada;
                    }
                    $scope.Grid_DataBind(listaGrillaLigada);
                    $scope.$parent.SalirPopup_Click();
                }

                function validacionesCamposGuardar() {
                    var hayerror = false;
                    if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa == undefined) {
                        $(".caja11.msgerror.DescripcionTarifa").html("La Descripción Tarifa debe tener un valor.");
                        hayerror = true;
                    } else {
                        $(".caja11.msgerror.DescripcionTarifa").html("");
                    }
                    var vCodigoConfiguracionTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck;
                    if (vCodigoConfiguracionTarifaLigada == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo) {
                        if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaMontoFijo == undefined) {
                            $(".caja11.msgerror.CodigoMonedaMontoFijo").html("Campo requerido.");
                            hayerror = true;
                        } else {
                            $(".caja11.msgerror.CodigoMonedaMontoFijo").html("");
                        }
                        if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo == undefined) {
                            $(".caja11.msgerror.MontoFijo").html("Campo requerido.");
                            hayerror = true;
                        } else {
                            $(".caja11.msgerror.MontoFijo").html("");
                        }
                    }
                    else if (vCodigoConfiguracionTarifaLigada == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaLigada) {
                        var porLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada;
                        if (porLigada == undefined) {
                            $(".caja11.msgerror.PorcentajeTarifaLigada").html("Campo requerido.");
                            hayerror = true;
                        } else {
                            var valp = porLigada;
                            if (valp > 100) {
                                $(".caja11.msgerror.PorcentajeTarifaLigada").html("El porcentaje no debe superar el 100%.");
                                hayerror = true;
                            } else {
                                if (valp <= 0) {
                                    $(".caja11.msgerror.PorcentajeTarifaLigada").html("El porcentaje debe ser mayor que 0%.");
                                    hayerror = true;
                                } else {
                                    $(".caja11.msgerror.PorcentajeTarifaLigada").html("");
                                }
                            }
                        }
                        if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada == undefined) {
                            $(".caja11.msgerror.CodigoMonedaPorcentajeTarifaLigada").html("Campo requerido.");
                            hayerror = true;
                        } else {
                            $(".caja11.msgerror.CodigoMonedaPorcentajeTarifaLigada").html("");
                        }
                        if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada == undefined) {
                            hayerror = true;
                        }
                    } else if (vCodigoConfiguracionTarifaLigada == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaBase) {
                        var porBase = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase;
                        if (porBase == undefined) {
                            $(".caja11.msgerror.PorcentajeTarifaBase").html("Campo requerido.");
                            hayerror = true;
                        } else {
                            var valb = porBase;
                            if (valb > 100) {
                                $(".caja11.msgerror.PorcentajeTarifaBase").html("El porcentaje no debe superar el 100%.");
                                hayerror = true;
                            } else {
                                if (valb <= 0) {
                                    $(".caja11.msgerror.PorcentajeTarifaBase").html("El porcentaje debe ser mayor que 0%.");
                                    hayerror = true;
                                } else {
                                    $(".caja11.msgerror.PorcentajeTarifaBase").html("");
                                }
                            }
                        }
                    }
                    return hayerror;
                }

                function validarExisteTarifa() {
                    var salida = true;
                    var listaGrillaMemoria = [];
                    var opc = $rootScope.DatosFormulario.OpcionTarifaLigada;
                    if (opc == "TarifaEscalonada") {
                        listaGrillaMemoria = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria;
                    }
                    else if (opc == "AcuerdoComercialEscalonado") {
                        listaGrillaMemoria = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria;
                    }
                    else {
                        listaGrillaMemoria = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria;
                    }
                    var vCodTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal;
                    var vIdConfiguracionTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.IdConfiguracionTarifaLigada;
                    if ($scope.$parent.ModoPagina == "Editar") {
                        if (listaGrillaMemoria.length > 0) {
                            for (var s = 0; s < listaGrillaMemoria.length; s++) {
                                if (opc == "TarifaEscalonada") {
                                    if (listaGrillaMemoria[s].CodigoTarifaLigadaEscalonada == vCodTarifaLigada && listaGrillaMemoria[s].IdConfiguracionTarifaLigada != vIdConfiguracionTarifaLigada
                                        && listaGrillaMemoria[a].CodigoTarifaEscalonadaVigencia == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaEscalonadaVigencia) {
                                        MiAlert("El concepto ligado ya existe.");
                                        miBlock(false, "#divPopupAgregarTarifaLida");
                                        salida = false;
                                    }
                                }
                                else if (opc == "AcuerdoComercialEscalonado") {
                                    if (listaGrillaMemoria[s].CodigoTarifaLigadaEscalonado == vCodTarifaLigada && listaGrillaMemoria[s].IdConfiguracionTarifaLigada != vIdConfiguracionTarifaLigada) {
                                        MiAlert("El concepto ligado ya existe.");
                                        miBlock(false, "#divPopupAgregarTarifaLida");
                                        salida = false;
                                    }
                                }
                                else {
                                    if (listaGrillaMemoria[s].CodigoTarifaLigadaLocal == vCodTarifaLigada && listaGrillaMemoria[s].IdConfiguracionTarifaLigada != vIdConfiguracionTarifaLigada) {
                                        MiAlert("El concepto ligado ya existe.");
                                        miBlock(false, "#divPopupAgregarTarifaLida");
                                        salida = false;
                                    }
                                }
                            }
                        }
                    }
                    if ($scope.$parent.ModoPagina == "Nuevo") {
                        if (listaGrillaMemoria.length > 0) {
                            for (var a = 0; a < listaGrillaMemoria.length; a++) {
                                if (opc == "TarifaEscalonada") {
                                    if (listaGrillaMemoria[a].Accion != "D") {
                                        if (listaGrillaMemoria[a].CodigoTarifaLigadaEscalonada == vCodTarifaLigada &&
                                            listaGrillaMemoria[a].CodigoTarifaEscalonadaVigencia == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaEscalonadaVigencia) {
                                            MiAlert("El concepto ligado ya existe.");
                                            miBlock(false, "#divPopupAgregarTarifaLida");
                                            salida = false;
                                        }
                                    }
                                }
                                else if (opc == "AcuerdoComercialEscalonado") {
                                    if (listaGrillaMemoria[a].Accion != "D") {
                                        if (listaGrillaMemoria[a].CodigoTarifaLigadaEscalonado == vCodTarifaLigada) {
                                            MiAlert("El concepto ligado ya existe.");
                                            miBlock(false, "#divPopupAgregarTarifaLida");
                                            salida = false;
                                        }
                                    }
                                }
                                else {
                                    if (listaGrillaMemoria[a].CodigoTarifaLigadaLocal == vCodTarifaLigada) {
                                        MiAlert("El concepto ligado ya existe.");
                                        miBlock(false, "#divPopupAgregarTarifaLida");
                                        salida = false;
                                    }
                                }
                            }
                        }
                    }
                    return salida;
                }

                $scope.Grid_DataBind = function (data) {
                    var opcionTarifaLigada = $rootScope.DatosFormulario.OpcionTarifaLigada;
                    if (opcionTarifaLigada == "TarifaLocal") {
                        $scope.gridapigrillaListaTarifaLigada.refresh(data);
                    }
                    else if (opcionTarifaLigada == "AcuerdoComercialLocal") {
                        $scope.gridapigrillaEdicionTarifaLigada.refresh(data);
                    }
                    else if (opcionTarifaLigada == "TarifaEscalonada") {
                        $scope.gridapiListaTarifaEscalonadaLigada.refresh(data);
                    }
                    else if (opcionTarifaLigada == "AcuerdoComercialEscalonado") {
                        $scope.gridapigrillaAceListaConfigTarifaLigada.refresh(data);
                    }
                }

                $scope.Cofiguration = function () {
                    var defaults = "0";
                    if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMontoFijo) {
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada = null;
                        $(".caja11.msgerror.PorcentajeTarifaBase").html("");
                        $(".caja11.msgerror.MontoTarifaLigada").html("");
                        $(".caja11.msgerror.CodigoMonedaPorcentajeTarifaLigada").html("");
                        $(".caja11.msgerror.PorcentajeTarifaLigada").html("");
                        $(".caja11.msgerror.TipoCambio").html("");
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo = defaults;
                    }
                    else if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaLigada) {
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaMontoFijo = null;
                        $(".caja11.msgerror.PorcentajeTarifaBase").html("");
                        $(".caja11.msgerror.MontoFijo").html("");
                        $(".caja11.msgerror.CodigoMonedaMontoFijo").html("");
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada = defaults;

                    } else if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaBase) {
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoFijo = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaMontoFijo = null;
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada = null;
                        $(".caja11.msgerror.MontoTarifaLigada").html("");
                        $(".caja11.msgerror.CodigoMonedaPorcentajeTarifaLigada").html("");
                        $(".caja11.msgerror.PorcentajeTarifaLigada").html("");
                        $(".caja11.msgerror.MontoFijo").html("");
                        $(".caja11.msgerror.CodigoMonedaMontoFijo").html("");
                        $(".caja11.msgerror.TipoCambio").html("");
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaBase = defaults;
                    }
                }

                function CalcularMontoTarifaLigada(porcentaje, montoTarifa, codMonedaConfig, codMonedaTarifa) {

                    if (porcentaje != undefined && montoTarifa != undefined && codMonedaConfig != undefined && codMonedaTarifa != undefined) {
                        var monto = 0;
                        var codMonedaDolares;
                        var tipoCambioVenta = 0.0;
                        var tipoCambioDolares = [];
                        if ($rootScope.DatosFormulario.DatosGenerales != undefined) {
                            if ($rootScope.DatosFormulario.DatosGenerales.ListaTipoCambio != undefined) {
                                tipoCambioDolares = $rootScope.DatosFormulario.DatosGenerales.ListaTipoCambio;
                            }
                        }

                        if (tipoCambioDolares != null) {
                            if (tipoCambioDolares.length > 0) {
                                tipoCambioVenta = tipoCambioDolares[0].TipoCambioVenta;
                                codMonedaDolares = tipoCambioDolares[0].CodigoMoneda;
                            } else {
                                codMonedaDolares = "105";
                            }
                        } else {
                            codMonedaDolares = "105";
                        }

                        if (codMonedaTarifa == codMonedaConfig) {
                            monto = (porcentaje / 100) * montoTarifa;
                            $(".caja11.msgerror.TipoCambio").html("");
                        } else {
                            if (tipoCambioVenta <= 0) {
                                monto = 0;
                                $(".caja11.msgerror.TipoCambio").html("No existe tipo de cambio para el día de hoy, los cálculos probablemente sean erróneos.");

                            } else {
                                if (codMonedaTarifa == codMonedaDolares && codMonedaConfig != codMonedaDolares) {
                                    monto = (porcentaje / 100) * tipoCambioVenta * montoTarifa;
                                } else {
                                    monto = (porcentaje / 100) * (montoTarifa / tipoCambioVenta);
                                }
                                $(".caja11.msgerror.TipoCambio").html("");
                            }
                        }
                        $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.MontoTarifaLigada = parseFloat(Math.round(monto * 100) / 100).toFixed(2);
                    }
                }

                function observadorAtributos() {
                    $scope.$watch("$root.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada", function (newValue, oldValue) {
                        var codMonedaConfig = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada;
                        var codMonedaTarifa = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada;
                        var montoTarifa = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto;
                        if (codMonedaConfig != undefined && codMonedaTarifa != undefined && montoTarifa != undefined) {
                            CalcularMontoTarifaLigada(newValue, montoTarifa, codMonedaConfig, codMonedaTarifa);
                        }
                    });
                    $scope.$watch("$root.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada", function (newValue, oldValue) {
                        var porcentaje = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada;
                        var codMonedaTarifa = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada;
                        var montoTarifa = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto;
                        if (porcentaje != undefined && codMonedaTarifa != undefined && montoTarifa != undefined) {
                            CalcularMontoTarifaLigada(porcentaje, montoTarifa, newValue, codMonedaTarifa);
                        }
                    });
                    $scope.$watch("$root.DatosFormulario.DataConfiguracionTarifaLigada.Monto", function (newValue, oldValue) {
                        if ($rootScope.DatosFormulario.DataConfiguracionTarifaLigada.ConfigCheck == $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoPorTarifaLigada) {
                            var porcentaje = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.PorcentajeTarifaLigada;
                            var codMonConfig = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaPorcentajeTarifaLigada;
                            if (porcentaje != undefined && codMonConfig != undefined) {
                                var codMonTarifaLigada = $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada;
                                CalcularMontoTarifaLigada(porcentaje, newValue, codMonConfig, codMonTarifaLigada);
                            }
                        }
                    });
                }
            }]);
})();

