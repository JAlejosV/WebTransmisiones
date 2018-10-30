(function () {
    angular.module('api')
        .controller('BuscarItinerarioController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {

                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();

                        if ($rootScope.DatosFormulario.FiltrosBusquedaItinerario == undefined)
                            $rootScope.DatosFormulario.FiltrosBusquedaItinerario = new Object();

                        if ($rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro == undefined)
                            $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro = new Object();

                        if ($rootScope.DatosFormulario.ItinerarioIndex == undefined)
                            $rootScope.DatosFormulario.ItinerarioIndex = new Object();

                        $scope.CargaInicialItinerario();
                        $(".InputTEXT_04Fecha").prop('disabled', false);
                    });

                    $scope.CargaInicialItinerario = function () {
                        $.ajax({
                            url: "/Itinerario/ItinerarioIndex",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {

                                $rootScope.DatosFormulario.ItinerarioIndex.TiposOperacion = data.TiposOperacion;
                                $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.CodigoTipoOperacion = $rootScope.DatosFormulario.ItinerarioIndex.TiposOperacion[0].CodigoTipoOperacion;

                                $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.OriginalFechaInicio = data.FechaDefault;
                                $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.OriginalFechaFin = data.FechaFinDefault;

                                $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.FechaArriboItinerarioInicio = data.FechaDefault;
                                $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.FechaArriboItinerarioFin = data.FechaFinDefault;
                            }
                        });
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
                        var opcion = $rootScope.DatosFormulario.OpcionItinerario;

                        if (opcion == "ConsultaItinerario") {
                            $rootScope.DatosFormulario.AdministrarAduana.Filtro.CodigoItinerario = data.CodigoItinerario;
                            $rootScope.DatosFormulario.AdministrarAduana.Datos.NombreItinerario = data.NombreItinerario;
                        }
                        //else if (opcion == "XXX") {
                        //    $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoItinerario = data.CodigoItinerario;
                        //    $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombreItinerario = data.NombreItinerario;
                        //}
                        else if (opcion == "RegistroItinerario") {
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoItinerarioIntermedio = data.CodigoItinerario;
                            $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreItinerarioIntermedio = data.NombreItinerario;
                        }
                        else if (opcion == "BuscarItinerario") {
                            $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoItinerario = data.CodigoItinerario;
                            $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreNave = data.NombreNave;
                            $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NumeroViajeItinerario = data.NumeroViajeItinerario;
                            $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreAduanaNave = data.NombreAduana;
                            $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreTipoOperacion = data.NombreTipoOperacion;
                        }
                        else if (opcion == "RegistroDocumento") {
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoItinerario = data.CodigoItinerario;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreNave = data.NombreNave;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NumeroViajeItinerario = data.NumeroViajeItinerario;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreAduanaNave = data.NombreAduana;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreTipoOperacion = data.NombreTipoOperacion;
                        }
                        else if (opcion == "BuscarItinerarioTransmisionDocumento") {
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.CodigoItinerario = data.CodigoItinerario;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NombreNave = data.NombreNave;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NumeroViajeItinerario = data.NumeroViajeItinerario;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NombreAduanaNave = data.NombreAduana;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NombreTipoOperacion = data.NombreTipoOperacion;
                        }
                        else {
                            $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoItinerario = data.CodigoItinerario;
                            $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreItinerario = data.NombreItinerario;
                        }
                        return true;
                    }

                    $scope.Seleccionar_Click = function () {
                        var rowKey = jQuery("#grillaListaItinerario").jqGrid('getGridParam', 'selrow');
                        if (rowKey != undefined) {
                            if (rowKey.length > 0) {
                                var rowObject = jQuery('#grillaListaItinerario').getRowData(rowKey);
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
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.CodigoNave = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NombreNave = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.CodigoAduana = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NombreAduana = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NumeroViajeItinerario = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NumeroManifiestoItinerario = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.AnioManifiestoItinerario = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.FechaArriboItinerarioInicio = $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.OriginalFechaInicio;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.FechaArriboItinerarioFin = $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.OriginalFechaFin;
                        $(".caja11.msgerror.FechaArriboItinerarioInicio").html("");
                        $(".caja11.msgerror.FechaArriboItinerarioFin").html("");

                    }
                    $scope.Salir_Click = function () {
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.CodigoNave = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NombreNave = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.CodigoAduana = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NombreAduana = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NumeroViajeItinerario = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NumeroManifiestoItinerario = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.AnioManifiestoItinerario = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.FechaArriboItinerarioInicio = $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.OriginalFechaInicio;
                        $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.FechaArriboItinerarioFin = $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.OriginalFechaFin;
                        $(".caja11.msgerror.FechaArriboItinerarioInicio").html("");
                        $(".caja11.msgerror.FechaArriboItinerarioFin").html("");
                        $scope.$parent.SalirPopup_Click();
                    }

                    $scope.Buscar_Click = function () {
                        if ($rootScope.EsEnter) {
                            return false;
                        }
                        miBlock(true, "#divPopupBuscarItinerario");
                        var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro)) };
                        $scope.gridapigrillaListaItinerario.find(objRequest);
                        miBlock(false, "#divPopupBuscarItinerario");

                    }

                    $scope.BuscarNave_Click = function () {
                        $rootScope.DatosFormulario.OpcionNave = "BuscarItinerarioNave";
                        getPopupResponsive({
                            formURL: "Nave/BuscarNave",
                            title: "Buscar Nave",
                            nombreDiv: "divPopupBuscarNave",
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
                                $compile($("#divPopupBuscarNave"))($scope);
                            }
                        });
                    }

                    $scope.BuscarTipoOperacion_Click = function () {
                        $rootScope.DatosFormulario.OpcionTipoOperacion = "BuscarItinerarioTipoOperacion";
                        getPopupResponsive({
                            formURL: "TipoOperacion/BuscarTipoOperacion",
                            title: "Buscar TipoOperacion",
                            nombreDiv: "divPopupBuscarTipoOperacion",
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
                                $compile($("#divPopupBuscarTipoOperacion"))($scope);
                            }
                        });
                    }

                    $scope.BuscarAduana_Click = function () {
                        $rootScope.DatosFormulario.OpcionAduana = "BuscarItinerarioAduana";
                        getPopupResponsive({
                            formURL: "Aduana/BuscarAduana",
                            title: "Buscar Aduana",
                            nombreDiv: "divPopupBuscarAduana",
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
                                $compile($("#divPopupBuscarAduana"))($scope);
                            }
                        });
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