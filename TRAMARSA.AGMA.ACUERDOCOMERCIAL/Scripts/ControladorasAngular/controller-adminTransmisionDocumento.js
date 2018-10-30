(function () {
    angular.module('api')
        .controller('AdministrarTransmisionDocumentoController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {

                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Datos == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Datos = new Object();
                        if ($rootScope.DatosFormulario.TransmisionDocumentoIndex == undefined)
                            $rootScope.DatosFormulario.TransmisionDocumentoIndex = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.CheckCab != undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.CheckCab = false
                        if ($rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult == undefined)
                            $rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult = new Object();

                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaTransmisionDocumento = [];

                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheckCompleta != undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheckCompleta = []

                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.grillaListaDatosCargaMemoriaList == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.grillaListaDatosCargaMemoriaList = [];

                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheckCompleta = [];

                        $rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento = []
                        $scope.gridapigrillaListaTransmisionDocumento.refresh([]);
                        $scope.$apply();

                        $scope.CargaInicialTransmisionDocumento();
                        $(".InputTEXT_04Fecha").prop('disabled', false);
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.Todos = true;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoEnvioAduanas = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoTransmision = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck = new Object();
                    });

                    $scope.CargaInicialTransmisionDocumento = function () {
                        $.ajax({
                            url: "/TransmisionDocumento/TransmisionDocumentoIndex",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {

                                $rootScope.DatosFormulario.TransmisionDocumentoIndex.TiposEnvio = data.TiposEnvio;
                                $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.CodigoTipoEnvio = $rootScope.DatosFormulario.TransmisionDocumentoIndex.TiposEnvio[0].CodigoTipoEnvio;

                                $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.OriginalFechaInicio = data.FechaDefault;
                                $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.OriginalFechaFin = data.FechaFinDefault;

                                $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaInicio = data.FechaDefault;
                                $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaFin = data.FechaFinDefault;
                            }
                        });
                    }

                    $scope.BuscarItinerario_Click = function () {
                        $rootScope.DatosFormulario.OpcionItinerario = "BuscarItinerarioTransmisionDocumento";
                        getPopupResponsive({
                            formURL: "Itinerario/BuscarItinerario",
                            title: "Buscar Itinerario",
                            nombreDiv: "divPopupBuscarItinerario",
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
                                $compile($("#divPopupBuscarItinerario"))($scope);
                            }
                        });
                    }

                    function MiAlertOk_success() {
                        //$scope.Buscar_Click();
                    }

                    $scope.Buscar_Click = function () {

                        if ($rootScope.EsEnter) {
                            return false;
                        }

                        if (!validar()) {
                            return false;
                        }

                        miBlock(true, "html");
                        $scope.ObtenerListacompleta();
                        var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro)) };
                        $scope.gridapigrillaListaTransmisionDocumento.find(objRequest);
                        miBlock(false, "html");

                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck = new Object();
                    }

                    function validar() {
                        miBlock(true, "#html");
                        var salida = true;

                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaInicio == undefined) {
                            $(".caja11.msgerror.FechaInicio").html("Fecha Inicial es requerida.");
                            salida = false;
                        } else {
                            if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaInicio.length <= 0) {
                                $(".caja11.msgerror.FechaInicio").html("Fecha Inicial es requerida.");
                                salida = false;
                            } else {
                                $(".caja11.msgerror.FechaInicio").html("");
                            }
                        }

                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaFin == undefined) {
                            $(".caja11.msgerror.FechaFin").html("Fecha Final es requerida.");
                            salida = false;
                        } else {
                            if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaFin.length <= 0) {
                                $(".caja11.msgerror.FechaFin").html("Fecha Final es requerida.");
                                salida = false;
                            } else {
                                $(".caja11.msgerror.FechaFin").html("");
                            }
                        }
                        return salida;
                    }

                    $scope.Salir_Click = function () {
                        $rootScope.Redirect("/#!/sistema/bienvenido/");
                    }

                    $scope.Limpiar_Click = function () {
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.CodigoItinerario = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NombreNave = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NumeroViajeItinerario = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NombreAduanaNave = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NombreTipoOperacion = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NumeroDocumento = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.NumeroManifiestoItinerario = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.AnioManifiestoItinerario = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.Todos = true;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoEnvioAduanas = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoTransmision = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Datos.NombreDocumento = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.CodigoDocumento = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Datos.NombreAduana = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.CodigoAduana = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaInicio = $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.OriginalFechaInicio;
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.FechaFin = $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.OriginalFechaFin;
                        $(".caja11.msgerror.FechaInicio").html("");
                        $(".caja11.msgerror.FechaFin").html("");
                    }

                    $scope.EventoChange_chkTodos = function () {
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.Todos) {
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoEnvioAduanas = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoTransmision = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoEnvioAduanas = null;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoTransmision = null;
                        }
                    }

                    $scope.EventoChange_EstadoTransmision = function () {
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoTransmision) {
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.Todos = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoEnvioAduanas = true;
                        }
                    }

                    $scope.EventoChange_EnvioAduanas = function () {
                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoEnvioAduanas) {
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.Todos = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro.EstadoTransmision = false;
                        }
                    }

                    $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
                        var eventoclick = "";
                        switch (idgrilla) {
                            case "grillaListaTransmisionDocumento":
                                {
                                    switch (tipoboton) {
                                        case "Editar":
                                            eventoclick = "$parent.VerLogTransmisionDocumento('" + rowObject.CodigoDocumento + "');";
                                            break;
                                    }
                                }
                                break;
                        }

                        if (tipoboton == "Editar") {
                            html = HtmlCrearBoton("Modificar", eventoclick, "");
                        }

                        return html;
                    }

                    $scope.VerLogTransmisionDocumento = function (CodigoDocumento) {

                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.CodigoDocumento = CodigoDocumento;

                        getPopupResponsive({
                            formURL: "/TransmisionDocumento/BuscarLogTransmisionDocumento",
                            title: "Log Transmision Documento",
                            nombreDiv: "divPopupLogTransmisionDocumento",
                            nombreGrid: "",
                            width: "980px",
                            height: 800,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $(obj).attr("ModoPagina", "Detalle");
                                $compile($("#divPopupLogTransmisionDocumento"))($scope);
                                var scopePopup = angular.element("#divPopupLogTransmisionDocumento").scope();
                                //scopePopup.row = JSON.parse(JSON.stringify(objReg));
                                //scopePopup.rowOk = objReg;
                            }
                        });
                        //}
                    }

                    $scope.Enter = function () {
                        $rootScope.EsEnter = true;
                        $rootScope.EsEnter = true;
                        return false;
                    }

                    $("input").focusout(function () {
                        $rootScope.EsEnter = false;
                    });

                    $scope.onSelectRow = function (t, idgrilla, rowid, iRow, iCol, e) {
                        var row = $("#grillaListaTransmisionDocumento").jqGrid('getRowData', rowid);

                        if (iRow) {
                            row.idCheck = "True";
                            if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[row.CodigoDocumento]) {
                                delete $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[row.CodigoDocumento];
                            }
                            $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[row.CodigoDocumento] = row;
                        }
                        else {
                            row.idCheck = "False";
                            if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[row.CodigoDocumento]) {
                                delete $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[row.CodigoDocumento];
                            }
                        }
                    }

                    $scope.onSelectAll = function (t, idgrilla, rowIds, status) {

                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.CheckCab = status;

                        if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheckCompleta.length > 0) {
                            var ListaCompleta = $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheckCompleta;
                            $.each(ListaCompleta, function (x) {
                                if (status) {
                                    this.idCheck = "True";
                                    if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[this.CodigoDocumento]) {
                                        delete $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[this.CodigoDocumento];
                                    }
                                    $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[this.CodigoDocumento] = this;
                                } else {

                                    this.idCheck = "False";
                                    if ($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[this.CodigoDocumento]) {
                                        delete $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[this.CodigoDocumento];
                                    }
                                }
                            });
                        }
                    }

                    $scope.ObtenerListacompleta = function () {
                        var ListaAll = [];
                        var objRequest = { "filtro": $rootScope.DatosFormulario.AdministrarTransmisionDocumento.Filtro };
                        $.ajax({
                            url: "/TransmisionDocumento/ObtenerTransmisionDocumentoTodos",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: objRequest,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                //if (data.ListaTransmisionDocumento.length > 0) {
                                ListaAll = data.ListaTransmisionDocumento;
                                //}
                            }
                        });
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheckCompleta = ListaAll;
                    }

                    $scope.Transmitir_Click = function () {
                        $rootScope.DatosFormulario.AdministrarTransmisionDocumento.grillaListaDatosCargaMemoriaList = [];
                        var rowObject = new Array();
                        for (var indice in $rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck) {
                            rowObject.push($rootScope.DatosFormulario.AdministrarTransmisionDocumento.ListaCheck[indice]);
                        }

                        $rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento = rowObject;
                        if ($rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento.length > 0) {

                            var lista = $rootScope.DatosFormulario.grillaListaTransmisionDocumentoResult.ListaTransmisionDocumento;
                            var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });//VALIDAR CHECK A ENVIAR

                            if (filtroLista.length > 0) {
                                var newItem = new Object();
                                AbrirPopup_TipoTransmision("", newItem, "Tipo Transmision");
                                $(".caja11.msgerror.listaSeleccionada").html("");
                            } else {
                                $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                                return false;
                            }
                        } else {
                            $(".caja11.msgerror.listaSeleccionada").html("Seleccione por lo menos un registro.");
                            return false;
                        }
                    }

                    AbrirPopup_TipoTransmision = function (tipo, objReg, titlepop) {
                        getPopupResponsive({
                            formURL: "TransmisionDocumento/BuscarTiposTransmisionDocumento",
                            title: titlepop,
                            nombreDiv: "divPopupListarTiposTransmisionDocumento",
                            nombreGrid: "",
                            width: "400px",
                            height: 400,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $(obj).attr("ModoPagina", tipo);
                                $compile($("#divPopupListarTiposTransmisionDocumento"))($scope);
                                var scopePopup = angular.element("#divPopupListarTiposTransmisionDocumento").scope();
                                scopePopup.row = JSON.parse(JSON.stringify(objReg));
                                scopePopup.rowOk = objReg;
                                scopePopup.ModoPagina = tipo;
                            }
                        });
                    }
                }]);
})();