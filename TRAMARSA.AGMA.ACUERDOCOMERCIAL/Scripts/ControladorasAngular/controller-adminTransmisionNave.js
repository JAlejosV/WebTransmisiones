(function () {
    angular.module('api')
        .controller('AdministrarTransmisionNaveController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {

                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionNave = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Datos == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Datos = new Object();
                        if ($rootScope.DatosFormulario.TransmisionNaveIndex == undefined)
                            $rootScope.DatosFormulario.TransmisionNaveIndex = new Object();
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.CheckCab != undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.CheckCab = false
                        if ($rootScope.DatosFormulario.grillaListaTransmisionNaveResult == undefined)
                            $rootScope.DatosFormulario.grillaListaTransmisionNaveResult = new Object();

                        $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaTransmisionNave = [];

                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheckCompleta != undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheckCompleta = []

                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList == undefined)
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList = [];

                        $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheckCompleta = [];

                        $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave = []
                        $scope.gridapigrillaListaTransmisionNave.refresh([]);
                        $scope.$apply();

                        $scope.CargaInicialTransmisionNave();
                        $(".InputTEXT_04Fecha").prop('disabled', false);
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.Todos = true;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoEnvioAduanas = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoTransmision = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck = new Object();
                    });

                    $scope.CargaInicialTransmisionNave = function () {
                        $.ajax({
                            url: "/TransmisionNave/TransmisionNaveIndex",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {

                                $rootScope.DatosFormulario.TransmisionNaveIndex.TiposOperacion = data.TiposOperacion;
                                $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.CodigoTipoOperacion = $rootScope.DatosFormulario.TransmisionNaveIndex.TiposOperacion[0].CodigoTipoOperacion;

                                $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.OriginalFechaInicio = data.FechaDefault;
                                $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.OriginalFechaFin = data.FechaFinDefault;

                                $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaInicio = data.FechaDefault;
                                $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaFin = data.FechaFinDefault;
                            }
                        });
                    }

                    $scope.BuscarNave_Click = function () {
                        $rootScope.DatosFormulario.OpcionNave = "ConsultaTransmisionNave";
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

                    $scope.BuscarAduana_Click = function () {
                        $rootScope.DatosFormulario.OpcionAduana = "ConsultaTransmisionNave";
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

                    //function TransmitirNave() {
                    //    var objRequest = new Object();
                    //    objRequest.ListaItinerario = $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList;
                    //    objRequest.TipoTransmision = 'T';

                    //    var objRequest = { "request": objRequest };
                    //    $.ajax({
                    //        url: "/TransmisionNave/GrabarTransmisionNave",
                    //        type: "POST",
                    //        headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                    //        data: objRequest,
                    //        dataType: "json",
                    //        cache: true,
                    //        async: false,
                    //        success: function (data) {
                    //            if (data.Result != null) {
                    //                if (data.Result.Satisfactorio == true) {
                    //                    MiAlertOk('Se envio Manifiesto de Nave a SUNAT', MiAlertOk_success());
                    //                }
                    //                else {
                    //                    MiAlert('Hubo problemas al enviar Manifiesto de Nave a SUNAT');
                    //                }
                    //            } else {
                    //                MiAlert("Ocurrio un problema interno en el sistema.");
                    //            }
                    //        }
                    //    });
                    //}

                    function MiAlertOk_success() {
                        //$scope.Buscar_Click();
                    }

                    $scope.Buscar_Click = function () {

                        //if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.Todos = true) {
                        //    $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoEnvioAduanas = null;
                        //    $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoTransmision = null;
                        //}

                        if ($rootScope.EsEnter) {
                            return false;
                        }

                        if (!validar()) {
                            return false;
                        }

                        miBlock(true, "html");
                        $scope.ObtenerListacompleta();
                        var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro)) };
                        $scope.gridapigrillaListaTransmisionNave.find(objRequest);
                        //$rootScope.DatosFormulario.AdministrarTransmisionNave.ListaTransmisionNave = [];
                        miBlock(false, "html");

                        $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck = new Object();
                    }

                    function validar() {
                        miBlock(true, "#html");
                        var salida = true;

                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaInicio == undefined) {
                            $(".caja11.msgerror.FechaInicio").html("Fecha Inicial es requerida.");
                            salida = false;
                        } else {
                            if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaInicio.length <= 0) {
                                $(".caja11.msgerror.FechaInicio").html("Fecha Inicial es requerida.");
                                salida = false;
                            } else {
                                $(".caja11.msgerror.FechaInicio").html("");
                            }
                        }

                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaFin == undefined) {
                            $(".caja11.msgerror.FechaFin").html("Fecha Final es requerida.");
                            salida = false;
                        } else {
                            if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaFin.length <= 0) {
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
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.NumeroViajeItinerario = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.NumeroManifiestoItinerario = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.AnioManifiestoItinerario = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.Todos = true;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoEnvioAduanas = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoTransmision = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Datos.NombreNave = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.CodigoNave = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Datos.NombreAduana = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.CodigoAduana = null;
                        //$rootScope.DatosFormulario.AdministrarTransmisionNave.Datos.NombreTipoOperacion = null;
                        //$rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.CodigoTipoOperacion = null;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaInicio = $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.OriginalFechaInicio;
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.FechaFin = $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.OriginalFechaFin;
                        $(".caja11.msgerror.FechaInicio").html("");
                        $(".caja11.msgerror.FechaFin").html("");
                    }

                    $scope.EventoChange_chkTodos = function () {
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.Todos) {
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoEnvioAduanas = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoTransmision = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoEnvioAduanas = null;
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoTransmision = null;
                        }
                    }

                    $scope.EventoChange_EstadoTransmision = function () {
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoTransmision) {
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.Todos = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoEnvioAduanas = true;
                        }
                    }

                    $scope.EventoChange_EnvioAduanas = function () {
                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoEnvioAduanas) {
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.Todos = false;
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.EstadoTransmision = false;
                        }
                    }

                    $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
                        var eventoclick = "";
                        switch (idgrilla) {
                            case "grillaListaTransmisionNave":
                                {
                                    switch (tipoboton) {
                                        case "Editar":
                                            eventoclick = "$parent.VerLogTransmisionNave('" + rowObject.CodigoItinerario + "');";
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

                    $scope.VerLogTransmisionNave = function (CodigoItinerario) {
                        //if ($rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.length <= 0) {
                        //    $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaMaestroContenedorExterno = jQuery("#grillaListaMaestroTipoContenedorExterno").jqGrid('getRowData');
                        //}
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.CodigoItinerario = CodigoItinerario;
                        //var objReg = $from($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaTransmisionNave).where("$CodigoItinerario=='" + CodigoItinerario + "'").firstOrDefault();
                        //if (objReg != undefined) {
                        getPopupResponsive({
                            formURL: "/TransmisionNave/BuscarLogTransmisionNave",
                            title: "Log Transmision Nave",
                            nombreDiv: "divPopupLogTransmisionNave",
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
                                $compile($("#divPopupLogTransmisionNave"))($scope);
                                var scopePopup = angular.element("#divPopupLogTransmisionNave").scope();
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
                        var row = $("#grillaListaTransmisionNave").jqGrid('getRowData', rowid);

                        if (iRow) {
                            row.idCheck = "True";
                            if ($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[row.CodigoItinerario]) {
                                delete $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[row.CodigoItinerario];
                            }
                            $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[row.CodigoItinerario] = row;
                        }
                        else {
                            row.idCheck = "False";
                            if ($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[row.CodigoItinerario]) {
                                delete $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[row.CodigoItinerario];
                            }
                        }
                    }

                    $scope.onSelectAll = function (t, idgrilla, rowIds, status) {

                        $rootScope.DatosFormulario.AdministrarTransmisionNave.CheckCab = status;

                        if ($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheckCompleta.length > 0) {
                            var ListaCompleta = $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheckCompleta;
                            $.each(ListaCompleta, function (x) {
                                if (status) {
                                    this.idCheck = "True";
                                    if ($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[this.CodigoItinerario]) {
                                        delete $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[this.CodigoItinerario];
                                    }
                                    $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[this.CodigoItinerario] = this;
                                } else {

                                    this.idCheck = "False";
                                    if ($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[this.CodigoItinerario]) {
                                        delete $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[this.CodigoItinerario];
                                    }
                                }
                            });
                        }
                    }

                    $scope.ObtenerListacompleta = function () {
                        var ListaAll = [];
                        var objRequest = { "filtro": $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro };
                        $.ajax({
                            url: "/TransmisionNave/ObtenerTransmisionNaveTodos",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: objRequest,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                //if (data.ListaTransmisionNave.length > 0) {
                                ListaAll = data.ListaTransmisionNave;
                                //}
                            }
                        });
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheckCompleta = ListaAll;
                    }

                    $scope.Transmitir_Click = function () {
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList = [];
                        var rowObject = new Array();
                        for (var indice in $rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck) {
                            rowObject.push($rootScope.DatosFormulario.AdministrarTransmisionNave.ListaCheck[indice]);
                        }

                        $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave = rowObject;
                        if ($rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave.length > 0) {

                            var lista = $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave;
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
                            formURL: "TransmisionNave/BuscarTiposTransmisionNave",
                            title: titlepop,
                            nombreDiv: "divPopupListarTiposTransmisionNave",
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
                                $compile($("#divPopupListarTiposTransmisionNave"))($scope);
                                var scopePopup = angular.element("#divPopupListarTiposTransmisionNave").scope();
                                scopePopup.row = JSON.parse(JSON.stringify(objReg));
                                scopePopup.rowOk = objReg;
                                scopePopup.ModoPagina = tipo;
                            }
                        });
                    }

                    function procesarSeleccionado(data) {
                        $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList = [];
                        $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave = data;
                        if ($rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave.length > 0) {

                            var lista = $rootScope.DatosFormulario.grillaListaTransmisionNaveResult.ListaTransmisionNave;
                            var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });//VALIDAR CHECK A ENVIAR

                            if (filtroLista.length > 0) {
                                //var newId;
                                for (var i = 0; i < filtroLista.length; i++) {
                                    //if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado != 0) {
                                    //    newId = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList.length;
                                    //} else {
                                    //    newId = $rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga.length;
                                    //}
                                    var newObjItinerario = {
                                        CodigoItinerario: filtroLista[i].CodigoItinerario
                                        //TipoTransmision: 'T'
                                    }
                                    $rootScope.DatosFormulario.AdministrarTransmisionNave.grillaListaDatosCargaMemoriaList.push(newObjItinerario);
                                    //$scope.$parent.SalirPopup_Click();
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