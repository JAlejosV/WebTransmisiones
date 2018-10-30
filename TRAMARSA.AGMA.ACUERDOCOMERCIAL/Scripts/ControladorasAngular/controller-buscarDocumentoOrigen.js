(function () {
    angular.module('api')
        .controller('BuscarDocumentoOrigenController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile', '$q',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile, $q) {
                    $timeout(function () {

                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();
                        if ($rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex == undefined)
                            $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex = new Object();
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen == undefined)
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen = new Object();
                        if ($rootScope.DatosFormulario.grillaListaDocumentoOrigenResult == undefined)
                            $rootScope.DatosFormulario.grillaListaDocumentoOrigenResult = new Object();
                        if ($rootScope.DatosFormulario.CheckCab != undefined)
                            $rootScope.DatosFormulario.CheckCab = false

                        if ($rootScope.DatosFormulario.ListaCheckCompleta != undefined)
                            $rootScope.DatosFormulario.ListaCheckCompleta = []

                        $rootScope.DatosFormulario.ListaCheckCompleta = []
                        $("#NroBkn").hide();
                        $("#NroBL").show();

                        $scope.CargaInicialBusquedaAcLocal();
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoBL = "B";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoCtn = "C";
                        $(".caja11.msgerror.NumViaje").html("");
                        $(".caja11.msgerror.CodNave").html("");
                        $rootScope.FlagMostrarBotonSeleccionar = true;

                        var flag = $rootScope.FlagCallDocumentosOrigen;
                        if (flag == "busquedaACLocalNroBL" || flag == "busquedaACLocalNroCtn"
                            || flag == "seguimientoACLocalNroBL" || flag == "seguimientoACLocalNroCtn"
                            || flag == "seguimientoACEscalonadoNroBL" || flag == "seguimientoACEscalonadoNroCtn"
                            || flag == "busquedaACEscalonadoNroBL" || flag == "reporteACEscalonadoNroBL"
                            || flag == "busquedaACEscalonadoNroCtn" || flag == "reporteACEscalonadoNroCtn"
                            || flag == "reporteContenedorNoDevueltoNroBL"
                            || flag == "reporteContenedorNoDevueltoNroCtn") {
                            $("#grillaListaDocumentoOrigen").hideCol("idCheck");





                            //pruebadocument
                            $rootScope.DatosFormulario.HideColumnCheck = "1";
                            $("#grillaListaDocumentoOrigen").jqGrid('hideCol', 'grillaListaDocumentoOrigen_cb');
                            $scope.gridapigrillaListaDocumentoOrigen.find([]);
                            if (flag == "busquedaACLocalNroBL" || flag == "seguimientoACLocalNroBL"
                                || flag == "seguimientoACEscalonadoNroBL" || flag == "busquedaACEscalonadoNroBL"
                                || flag == "reporteACEscalonadoNroBL"
                                || flag == "reporteContenedorNoDevueltoNroBL") {
                                $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL = $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoBL;
                                $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento = "BL";
                                $scope.$apply();
                            } else if (flag == "busquedaACLocalNroCtn" || flag == "seguimientoACLocalNroCtn"
                                || flag == "seguimientoACEscalonadoNroCtn"
                                || flag == "busquedaACEscalonadoNroCtn"
                                || flag == "reporteACEscalonadoNroCtn"
                                || flag == "reporteContenedorNoDevueltoNroCtn") {
                                $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL = $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoCtn;
                                $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento = "BL";
                            }
                            $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.Habilitado = 'False';
                        } else {
                            $rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen = []
                            $scope.gridapigrillaListaDocumentoOrigen.refresh([]);
                            $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.Habilitado = 'True';
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento = "BL";
                            $scope.$apply();
                        }

                        if (flag == "seguimientoACLocalNroBL" || flag == "seguimientoACLocalNroCtn" || flag == "seguimientoACEscalonadoNroBL"
                            || flag == "seguimientoACEscalonadoNroCtn") {
                            $(".InputTEXT_04Fecha").prop('disabled', false);
                        }
                        observadorAtributos();
                    });
                    $scope.Enter = function () {
                        $rootScope.EsEnter = true;
                        return false;
                    }
                    $("input").focusout(function () {
                        $rootScope.EsEnter = false;
                    });

                    $scope.CargaInicialBusquedaAcLocal = function () {
                        $.ajax({
                            url: "/DocumentoOrigen/BusquedaDocumnetoOrigenIndex",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data.Linea.length > 0) {
                                    $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.Linea = data.Linea;
                                    $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodLinea = $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.Linea[0].Codigo;
                                    if (data.Linea.length == 1) {
                                        $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.HabilitadoLinea = 'False';
                                    } else {
                                        $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.HabilitadoLinea = 'True';
                                    }
                                    $rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.TipoDocumento = data.TipoDocumento;

                                    if (data.TipoDocumentoOrigen != undefined) {
                                        if (data.TipoDocumentoOrigen.length >= 2) {
                                            for (var a = 0; a < data.TipoDocumentoOrigen.length; a++) {
                                                if (data.TipoDocumentoOrigen[a].Codigo == "B") {
                                                    $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoBL = data.TipoDocumentoOrigen[a].Codigo;
                                                    $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.DescripcionPorBL = data.TipoDocumentoOrigen[a].Descripcion;
                                                }
                                                if (data.TipoDocumentoOrigen[a].Codigo == "C") {
                                                    $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoCtn = data.TipoDocumentoOrigen[a].Codigo;
                                                    $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.DescripcionPorCtn = data.TipoDocumentoOrigen[a].Descripcion;
                                                }
                                            }
                                        }
                                    }
                                }
                                $scope.Limpiar_Click();
                            }
                        });
                    }
                    $scope.Buscar_Click = function () {
                        if ($rootScope.EsEnter) {
                            return false;
                        }
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodLinea == undefined) {
                            $(".caja11.msgerror.CodLinea").html("Línea es requerido.");
                            return false;

                        } else {
                            if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodLinea.length <= 0) {
                                $(".caja11.msgerror.CodLinea").html("Línea es requerido.");
                                return false;
                            } else {
                                $(".caja11.msgerror.CodLinea").html("");
                            }
                        }
                        var salida = true;
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL == $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoBL) {
                            salida = ValidarCamposBL();
                        }
                        else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL == $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoCtn) {
                            salida = ValidarCamposCtn();
                        }
                        if (!salida) {
                            return false;
                        }

                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL == $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoBL) {
                            if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento == "BL") {
                                $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn = "";
                            } else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento == "BK") {
                                $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBL = "";
                            } else {
                                $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn = "";
                            }
                        }
                        else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL == $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoCtn) {
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBL = "";
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn = "";
                        }

                        miBlock(true, "#divPopupBuscarDoñcumentoOrigen");
                        $scope.ObetnerListacompleta(); //JM
                        var objRequest = { "filtro": $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen };
                        $scope.gridapigrillaListaDocumentoOrigen.find(objRequest);
                        miBlock(false, "#divPopupBuscarDocumentoOrigen");
                        $rootScope.DatosFormulario.ListaCheck = new Object();
                        return false;

                    }
                    $scope.BuscarNave_Click = function () {
                        if ($rootScope.EsEnter) {
                            return false;
                        }
                        if ($rootScope.DatosFormulario.DatosTarifaLocal == undefined) {
                            $rootScope.DatosFormulario.DatosTarifaLocal = new Object();
                        }
                        $rootScope.DatosFormulario.DatosTarifaLocal.OpcionNave = "documentoorigen";
                        var altura = 800;
                        getPopupResponsive({
                            formURL: "Nave/BuscarNave",
                            title: "Buscar Nave",
                            nombreDiv: "divPopupBuscarNave",
                            nombreGrid: "",
                            width: "1200px",
                            height: altura,
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
                    $scope.Salir_Click = function () {
                        $scope.$parent.SalirPopup_Click();
                    }
                    $scope.Limpiar_Click = function () {
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodNave = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.DescripcionNave = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.PuertoOrigen = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.DestinoFinal = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NumViaje = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.PuertoEmbarque = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.PuertoDesembarque = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBL = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodContenedor = "";
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento = "";
                        if ($rootScope.DatosFormulario.BusquedaDocumentoOrigenIndex.Linea.length > 1) {
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodLinea = "";
                            $(".caja11.msgerror.CodLinea").html("");
                        }
                        $(".caja11.msgerror.listaSeleccionada").html("");
                        $(".caja11.msgerror.NumViaje").html("");
                        $(".caja11.msgerror.CodNave").html("");
                        $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL = $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoBL;
                    }
                    $scope.Cofiguration = function () {
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL == $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoBL) {
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodContenedor = "";
                        }
                        else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoBL == $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodigoCtn) {
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBL = "";
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn = "";
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento = "";
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento = "BL";
                        }
                    }
                    $scope.OcultarCampos = function () {
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento == "BL") {
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn = "";
                            $("#NroBkn").hide();
                            $("#NroBL").show();
                        }
                        else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento == "BK") {
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBL = "";
                            $("#NroBL").hide();
                            $("#NroBkn").show();
                        } else {
                            $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn = "";
                            $("#NroBkn").hide();
                            $("#NroBL").show();
                        }
                    }


                    var filtroLista = null;
                    $rootScope.DatosFormulario.ListaCheck = new Object();
                    var flag = $rootScope.FlagCallDocumentosOrigen;


                    if (flag == "busquedaACLocalNroBL" || flag == "busquedaACLocalNroCtn"
                        || flag == "seguimientoACLocalNroBL" || flag == "seguimientoACLocalNroCtn"
                        || flag == "seguimientoACEscalonadoNroBL" || flag == "seguimientoACEscalonadoNroCtn"
                        || flag == "busquedaACEscalonadoNroBL" || flag == "reporteACEscalonadoNroBL"
                        || flag == "busquedaACEscalonadoNroCtn" || flag == "reporteACEscalonadoNroCtn"
                        || flag == "reporteContenedorNoDevueltoNroBL" || flag == "reporteContenedorNoDevueltoNroCtn") {
                        $rootScope.DatosFormulario.HideColumnCheck = "1";
                    }
                    else {
                        $rootScope.DatosFormulario.HideColumnCheck = "0";
                    }





                    $scope.onSelectRow = function (t, idgrilla, rowid, iRow, iCol, e) {
                        var row = $("#grillaListaDocumentoOrigen").jqGrid('getRowData', rowid);

                        if (iRow) {


                            row.idCheck = "True";
                            if ($rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor]) {
                                delete $rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor];
                            }
                            $rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor] = row;


                        }
                        else {
                            row.idCheck = "False";
                            if ($rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor]) {
                                delete $rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor];
                            }

                        }
                    }

                    $scope.onSelectAll = function (t, idgrilla, rowIds, status) {

                        $rootScope.DatosFormulario.CheckCab = status;
                        /*for (var i = 0; i < rowIds.length; i++) {
                            var row = $("#grillaListaDocumentoOrigen").jqGrid('getRowData', rowIds[i]);
                            if (status) {
                                row.idCheck = "True";
                                if ($rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor]) {
                                    delete $rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor];
                                }
                                $rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor] = row;
                            }
                            else {
                                row.idCheck = "False";
                                if ($rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor]) {
                                    delete $rootScope.DatosFormulario.ListaCheck[row.CodigoContenedor];
                                }
                            }
                        }*/
                        if ($rootScope.DatosFormulario.ListaCheckCompleta.length > 0) {
                            var ListaCompleta = $rootScope.DatosFormulario.ListaCheckCompleta;
                            $.each(ListaCompleta, function (x) {
                                if (status) {
                                    this.idCheck = "True";
                                    if ($rootScope.DatosFormulario.ListaCheck[this.CodigoContenedor]) {
                                        delete $rootScope.DatosFormulario.ListaCheck[this.CodigoContenedor];
                                    }
                                    $rootScope.DatosFormulario.ListaCheck[this.CodigoContenedor] = this;
                                } else {

                                    this.idCheck = "False";
                                    if ($rootScope.DatosFormulario.ListaCheck[this.CodigoContenedor]) {
                                        delete $rootScope.DatosFormulario.ListaCheck[this.CodigoContenedor];
                                    }
                                }
                            });
                        }
                        //$rootScope.DatosFormulario.ListaCheckCompleta=[];

                    }

                    $scope.ObetnerListacompleta = function () {
                        var ListaAll = [];
                        var objRequest = { "filtro": $rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen };
                        $.ajax({
                            url: "/DocumentoOrigen/ObtenerDocumentoOrigenTodos",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: objRequest,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data.DocumentoOrigenList.length > 0) {
                                    ListaAll = data.DocumentoOrigenList;
                                }
                            }
                        });
                        $rootScope.DatosFormulario.ListaCheckCompleta = ListaAll;
                    }





                    $scope.Seleccionar_Click = function () {

                        var flag = $rootScope.FlagCallDocumentosOrigen;


                        if (flag == "busquedaACLocalNroBL" || flag == "busquedaACLocalNroCtn"
                            || flag == "seguimientoACLocalNroBL" || flag == "seguimientoACLocalNroCtn"
                            || flag == "seguimientoACEscalonadoNroBL" || flag == "seguimientoACEscalonadoNroCtn"
                            || flag == "busquedaACEscalonadoNroBL"
                            || flag == "reporteACEscalonadoNroBL"
                            || flag == "busquedaACEscalonadoNroCtn"
                            || flag == "reporteACEscalonadoNroCtn"
                            || flag == "reporteContenedorNoDevueltoNroBL"
                            || flag == "reporteContenedorNoDevueltoNroCtn"
                            || flag == "registroACLocal"
                            || flag == "registroACEscalonado") {

                            if (flag == "registroACLocal" || flag == "registroACEscalonado") {
                                var rowObject = new Array();
                                for (var indice in $rootScope.DatosFormulario.ListaCheck) {
                                    rowObject.push($rootScope.DatosFormulario.ListaCheck[indice]);
                                }

                                if (procesarSeleccionado(rowObject)) {
                                    $(".caja11.msgerror.listaSeleccionada").html("");
                                    $scope.$parent.SalirPopup_Click();
                                }

                            }
                            else {
                                var rowKey = jQuery("#grillaListaDocumentoOrigen").jqGrid('getGridParam', 'selrow');
                                if (rowKey != undefined) {
                                    if (rowKey.length > 0) {
                                        var rowObject = jQuery('#grillaListaDocumentoOrigen').getRowData(rowKey);

                                        if (procesarSeleccionado(rowObject)) {
                                            $scope.$parent.SalirPopup_Click();
                                        }
                                        $(".caja11.msgerror.listaSeleccionada").html("");
                                    } else {
                                        $(".caja11.msgerror.listaSeleccionada").html("Seleccione un registro.");
                                    }
                                } else {
                                    $(".caja11.msgerror.listaSeleccionada").html("Seleccione un registro.");
                                }
                            }
                            //var rowKey = jQuery("#grillaListaDocumentoOrigen").jqGrid('getGridParam', 'selrow');

                        } else {
                            if (procesarSeleccionado()) {
                                $scope.$parent.SalirPopup_Click();
                            }
                        }
                    }

                    function procesarSeleccionado(data) {

                        var flag = $rootScope.FlagCallDocumentosOrigen;
                        if (flag == "busquedaACLocalNroBL") {
                            $rootScope.DatosFormulario.FiltrosBusquedaACLocal.NumeroBL = data.NroBL;
                            return true;
                        } else if (flag == "busquedaACLocalNroCtn") {
                            $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoContenedor = data.CodigoContenedor;
                            return true;
                        }
                        else if (flag == "seguimientoACLocalNroBL") {
                            $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.NumeroBL = data.NroBL;
                            $(".InputTEXT_04Fecha").prop('disabled', false);
                            return true;
                        } else if (flag == "seguimientoACLocalNroCtn") {
                            $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoContenedor = data.CodigoContenedor;
                            $(".InputTEXT_04Fecha").prop('disabled', false);
                            return true;
                        } else if (flag == "seguimientoACEscalonadoNroBL") {
                            $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.NumeroBL = data.NroBL;
                            $(".InputTEXT_04Fecha").prop('disabled', false);
                            return true;
                        }
                        else if (flag == "seguimientoACEscalonadoNroCtn") {
                            $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoContenedor = data.CodigoContenedor;
                            $(".InputTEXT_04Fecha").prop('disabled', false);
                            return true;
                        }
                        else if (flag == "busquedaACEscalonadoNroBL") {
                            $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.NumeroBL = data.NroBL;
                            return true;
                        }
                        else if (flag == "busquedaACEscalonadoNroCtn") {
                            $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoContenedor = data.CodigoContenedor;
                            return true;
                        }
                        else if (flag == "reporteContenedorNoDevueltoNroBL") {
                            $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Nro_Bl = data.NroBL;
                            return true;
                        }
                        else if (flag == "reporteContenedorNoDevueltoNroCtn") {
                            $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoCotenedor = data.CodigoContenedor;
                            return true;
                        }

                        else if (flag == "reporteACEscalonadoNroCtn") {
                            $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoContenedor = data.CodigoContenedor;
                            return true;
                        }
                        else if (flag == "reporteACEscalonadoNroBL") {
                            $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.NumeroBL = data.NroBL;
                            return true;
                        }
                        else if (flag == "reporteACEscalonadoNroCtn") {
                            $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoContenedor = data.CodigoContenedor;
                            return true;
                        }


                        //else if (flag == "registroACEscalonado") {
                        //    var listaDocumentoOrigen = $('#grillaListaDocumentoOrigen').jqGrid('getRowData');
                        //    if (listaDocumentoOrigen.length > 0) {
                        //        var filtroSeleccionados = listaDocumentoOrigen.filter(function (x) { return x.idCheck == "True"; });
                        //        if (filtroSeleccionados.length > 0) {
                        //            var newId;
                        //            for (var i = 0; i < filtroSeleccionados.length; i++) {
                        //                if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado != 0) {
                        //                    newId = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList.length;
                        //                } else {
                        //                    newId = $rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga.length;
                        //                }
                        //                var newObjEscalonadoDocOrigen = {
                        //                    IdCarga: -newId,
                        //                    CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                        //                    CodigoNave: filtroSeleccionados[i].CodNave,
                        //                    NumeroViaje: filtroSeleccionados[i].NumViaje,
                        //                    PuertoOrigen: filtroSeleccionados[i].PuertoOrigen,
                        //                    PuertoEmbarque: filtroSeleccionados[i].PuertoEmbarque,
                        //                    PuertoDestino: filtroSeleccionados[i].PuertoDesembarque,
                        //                    DestinoFinal: filtroSeleccionados[i].DestinoFinal,
                        //                    CodigoLinea: filtroSeleccionados[i].CodLinea,
                        //                    NumeroBL: filtroSeleccionados[i].NroBL,
                        //                    CodigoContenedor: filtroSeleccionados[i].CodigoContenedor,
                        //                    TipoBL: filtroSeleccionados[i].TipoBL,
                        //                    TipoDocumento: filtroSeleccionados[i].TipoDocumento,
                        //                    NroBkn: filtroSeleccionados[i].NroBkn,
                        //                    Accion: "I"
                        //                }
                        //                $scope.gridapigrillaAceListaDatosCarga.insertRange([newObjEscalonadoDocOrigen]);
                        //                if ($.inArray(newObjEscalonadoDocOrigen, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList) > -1) {
                        //                } else {
                        //                    $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList.push(newObjEscalonadoDocOrigen);
                        //                }
                        //            }
                        //            $(".caja11.msgerror.listaSeleccionada").html("");
                        //        } else {
                        //            $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                        //            return false;
                        //        }
                        //    } else {
                        //        $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                        //        return false;
                        //    }
                        //}

                        else if (flag == "registroACEscalonado") {
                            // $rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen = data;
                            if ($rootScope.DatosFormulario.CheckCab) {
                                miBlock(true, "#divPopupBuscarDocumentoOrigen");
                                var nuevoId;
                                var InserLstEsclonado = [];
                                $.each(data, function (x) {
                                    if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado != 0) {
                                        newId = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList.length;
                                    } else {
                                        newId = x;
                                    }
                                    var newObjEscalonadoDocOrigen = {
                                        IdCarga: -newId,
                                        CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                                        CodigoNave: this.CodNave,
                                        NumeroViaje: this.NumViaje,
                                        PuertoOrigen: this.PuertoOrigen,
                                        PuertoEmbarque: this.PuertoEmbarque,
                                        PuertoDestino: this.PuertoDesembarque,
                                        DestinoFinal: this.DestinoFinal,
                                        CodigoLinea: this.CodLinea,
                                        NumeroBL: this.NroBL,
                                        CodigoContenedor: this.CodigoContenedor,
                                        TipoBL: this.TipoBL,
                                        TipoDocumento: this.TipoDocumento,
                                        NroBkn: this.NroBkn,
                                        Accion: "I"
                                    }
                                    InserLstEsclonado.push(newObjEscalonadoDocOrigen);
                                    if ($.inArray(newObjEscalonadoDocOrigen, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList) > -1) {
                                    } else {
                                        $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList.push(newObjEscalonadoDocOrigen);
                                    }
                                });
                                $scope.gridapigrillaAceListaDatosCarga.insertRange(InserLstEsclonado);
                                miBlock(false, "#divPopupBuscarDocumentoOrigen");


                            } else {

                                $rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen = data;
                                if ($rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen.length > 0) {

                                    var lista = $rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen;
                                    var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });//VALIDAR CHECK A ENVIAR

                                    if (filtroLista.length > 0) {
                                        var newId;
                                        for (var i = 0; i < filtroLista.length; i++) {
                                            if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado != 0) {
                                                newId = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList.length;
                                            } else {
                                                newId = $rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga.length;
                                            }
                                            var newObjEscalonadoDocOrigen = {
                                                IdCarga: -newId,
                                                CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                                                CodigoNave: filtroLista[i].CodNave,
                                                NumeroViaje: filtroLista[i].NumViaje,
                                                PuertoOrigen: filtroLista[i].PuertoOrigen,
                                                PuertoEmbarque: filtroLista[i].PuertoEmbarque,
                                                PuertoDestino: filtroLista[i].PuertoDesembarque,
                                                DestinoFinal: filtroLista[i].DestinoFinal,
                                                CodigoLinea: filtroLista[i].CodLinea,
                                                NumeroBL: filtroLista[i].NroBL,
                                                CodigoContenedor: filtroLista[i].CodigoContenedor,
                                                TipoBL: filtroLista[i].TipoBL,
                                                TipoDocumento: filtroLista[i].TipoDocumento,
                                                NroBkn: filtroLista[i].NroBkn,
                                                Accion: "I"
                                            }
                                            $scope.gridapigrillaAceListaDatosCarga.insertRange([newObjEscalonadoDocOrigen]);
                                            if ($.inArray(newObjEscalonadoDocOrigen, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList) > -1) {
                                            } else {
                                                $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList.push(newObjEscalonadoDocOrigen);
                                            }
                                            //$scope.$parent.SalirPopup_Click();
                                        }
                                        $(".caja11.msgerror.listaSeleccionada").html("");
                                    } else {
                                        $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                                        return false;
                                    }
                                } else {
                                    $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                                    return false;
                                }

                            } // fin CheckAll

                        }
                        else {
                            //$rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen = data;
                            if ($rootScope.DatosFormulario.CheckCab) {
                                miBlock(true, "#divPopupBuscarDocumentoOrigen");
                                var nuevoId;
                                var InserLst = [];
                                $.each(data, function (x) {
                                    if ($rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal != 0) {
                                        nuevoId = $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList.length;
                                    } else {
                                        nuevoId = x;
                                    }
                                    var newObjAcLocalDocOrigen = {
                                        IdCarga: -nuevoId,
                                        CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                                        CodigoNave: this.CodNave,
                                        NumeroViaje: this.NumViaje,
                                        PuertoOrigen: this.PuertoOrigen,
                                        PuertoEmbarque: this.PuertoEmbarque,
                                        PuertoDestino: this.PuertoDesembarque,
                                        DestinoFinal: this.DestinoFinal,
                                        CodigoLinea: this.CodLinea,
                                        NumeroBL: this.NroBL,
                                        CodigoContenedor: this.CodigoContenedor,
                                        TipoBL: this.TipoBL,
                                        TipoDocumento: this.TipoDocumento,
                                        NroBkn: this.NroBkn,
                                        Accion: "I"
                                    }
                                    //InserLst.push([newObjAcLocalDocOrigen]);
                                    InserLst.push(newObjAcLocalDocOrigen);
                                    if ($.inArray(newObjAcLocalDocOrigen, $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList) > -1) {
                                    } else {
                                        // $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList.push(newObjAcLocalDocOrigen);
                                    }
                                });
                                $scope.gridapiListaDatosCarga.insertRange(InserLst);
                                miBlock(false, "#divPopupBuscarDocumentoOrigen");

                            } else {
                                $rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen = data;

                                if ($rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen.length > 0) {
                                    var lista = $rootScope.DatosFormulario.grillaListaDocumentoOrigenResult.ListaDocumentoOrigen;
                                    var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });
                                    if (filtroLista.length > 0) {
                                        var nuevoId;
                                        for (var i = 0; i < filtroLista.length; i++) {
                                            if ($rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal != 0) {
                                                nuevoId = $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList.length;
                                            } else {
                                                nuevoId = $rootScope.DatosFormulario.RegistroAC.ListaDatosCarga.length;
                                            }
                                            var newObjAcLocalDocOrigen = {
                                                IdCarga: -nuevoId,
                                                CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                                                CodigoNave: filtroLista[i].CodNave,
                                                NumeroViaje: filtroLista[i].NumViaje,
                                                PuertoOrigen: filtroLista[i].PuertoOrigen,
                                                PuertoEmbarque: filtroLista[i].PuertoEmbarque,
                                                PuertoDestino: filtroLista[i].PuertoDesembarque,
                                                DestinoFinal: filtroLista[i].DestinoFinal,
                                                CodigoLinea: filtroLista[i].CodLinea,
                                                NumeroBL: filtroLista[i].NroBL,
                                                CodigoContenedor: filtroLista[i].CodigoContenedor,
                                                TipoBL: filtroLista[i].TipoBL,
                                                TipoDocumento: filtroLista[i].TipoDocumento,
                                                NroBkn: filtroLista[i].NroBkn,
                                                Accion: "I"
                                            }
                                            $scope.gridapiListaDatosCarga.insertRange([newObjAcLocalDocOrigen]);
                                            if ($.inArray(newObjAcLocalDocOrigen, $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList) > -1) {
                                            } else {
                                                $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList.push(newObjAcLocalDocOrigen);
                                            }

                                        }
                                        $(".caja11.msgerror.listaSeleccionada").html("");
                                    } else {
                                        $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                                        return false;
                                    }
                                } else {
                                    $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                                    return false;
                                }

                            } //Else JM
                        }
                        return true;
                    }


                    function observadorAtributos() {
                        $scope.$watch("$root.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento", function (newValue, oldValue) {
                            if (newValue != undefined) {
                                if (newValue.length > 0) {
                                    $(".caja11.msgerror.TipoDocumento").html("");
                                }
                            }
                        });
                    }
                    function ValidarCamposBL() {
                        var salida = false;
                        var salida2 = false;
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodNave == undefined) {
                            salida = true;
                        }
                        else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodNave.length <= 0) {
                            salida = true;
                        }
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento == "BK") {
                            if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn == undefined) {
                                salida2 = true;
                            }
                            else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBkn.length <= 0) {
                                salida2 = true;
                            }
                        } else {
                            if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBL == undefined) {
                                salida2 = true;
                            }
                            else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.NroBL.length <= 0) {
                                salida2 = true;
                            }
                        }

                        if (salida && salida2) {
                            $(".caja11.msgerror.listaSeleccionada").html("Ingrese uno de los campos: Nave o Nro. Documento.");
                            return false;
                        } else {
                            $(".caja11.msgerror.listaSeleccionada").html("");
                            if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento == undefined) {
                                $(".caja11.msgerror.TipoDocumento").html("Tipo Doc. es requerido.");
                                return false;
                            } else {
                                if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.TipoDocumento.length <= 0) {
                                    $(".caja11.msgerror.TipoDocumento").html("Tipo Doc. es requerido.");
                                    return false;
                                } else {
                                    $(".caja11.msgerror.TipoDocumento").html("");
                                    return true;
                                }
                            }
                        }
                    }
                    function ValidarCamposCtn() {
                        var salida = false;
                        var salida2 = false;
                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodNave == undefined) {
                            salida = true;
                        }
                        else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodNave.length <= 0) {
                            salida = true;
                        }

                        if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodContenedor == undefined) {
                            salida2 = true;
                        }
                        else if ($rootScope.DatosFormulario.FiltrosBusquedaDocumentoOrigen.CodContenedor.length <= 0) {
                            salida2 = true;
                        }
                        if (salida || salida2) {
                            $(".caja11.msgerror.listaSeleccionada").html("Ingrese los campos: Nave y Nro. Cnt.");
                            return false;
                        } else {
                            $(".caja11.msgerror.listaSeleccionada").html("");
                            return true;
                        }
                    }
                }]);
})();