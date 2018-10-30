(function () {
    angular.module('api')
        .controller('RegistroDocumentoController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {
                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();
                        if ($rootScope.DatosFormulario.RegistroDocumento == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento = new Object();
                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosDocumento == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento = new Object();
                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento = new Object();
                        if ($rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosCargaMemoria == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosCargaMemoria = [];
                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga = [];
                        if ($rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosClienteMemoria == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosClienteMemoria = [];
                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente = [];
                        if ($rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosFleteMemoria == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosFleteMemoria = [];
                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete = [];
                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.ConfiguracionSecciones == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.ConfiguracionSecciones = new Object();

                        var paramCodigo = getUrlVars()["codigoDocumento"];
                        if (paramCodigo) {
                            $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.DocumentoFlagEditar = true;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento = paramCodigo;
                        }

                        var esEditar = $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.DocumentoFlagEditar;
                        var esSeguimiento = $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.DocumentoFlagSeguimiento;
                        $scope.CargarDatosIniciales();
                        if (esEditar) {
                            $scope.FlagMostrarBotonGuardar = false;
                            $scope.FlagMostrarBotonModificar = true;
                            $scope.FlagMostrarBotonDeshabilitar = true;
                            $rootScope.DatosFormulario.RegistroDocumento.DocumentoRecoverOriginalDataView = new Object();
                            $scope.CargaInicialDocumento();
                            $scope.FlagEditing = false;
                        } else {
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.EstadoRegistro = true;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento = 0;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.Accion = "I";
                            $scope.FlagMostrarBotonGuardar = true;
                            $scope.FlagEditing = true;
                        }
                        if (esSeguimiento) {
                            $scope.FlagMostrarBotonModificar = false;
                            $scope.FlagMostrarBotonDeshabilitar = false;
                        }

                        $scope.EditingGrillas();

                        //if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete.length == 0) {
                        //    $scope.MinimizarBloques();
                        //}

                    });

                    $scope.CargarDatosIniciales = function () {
                        $.ajax({
                            url: "/Documento/GrabarDocumentoCargaInicial",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {

                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.TiposBL = data.TiposBL;
                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoTipoBL = data.TiposBL[0].CodigoTipoBL;

                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.TiposEnvio = data.TiposEnvio;
                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoTipoEnvio = data.TiposEnvio[0].CodigoTipoEnvio;

                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CondicionesContrato = data.CondicionesContrato;
                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoCondicionContrato = data.CondicionesContrato[0].CodigoCondicionContrato;

                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.OriginalFechaInicio = data.FechaEmisionDocumento;
                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.OriginalFechaFin = data.FechaEmbarqueDocumento;

                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.FechaEmisionDocumento = data.FechaEmisionDocumento;
                                $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.FechaEmbarqueDocumento = data.FechaEmbarqueDocumento;
                            }
                        });
                    }

                    $scope.CargaInicialDocumento = function () {
                        var param = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento;
                        $.ajax({
                            url: "/Documento/ConsultarDetalleDocumento",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "codigoDocumento=" + param,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data != null) {
                                    if (data.ListaDetalleDocumento.length > 0) {

                                        //Datos generales 
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento = data.ListaDetalleDocumento[0].CodigoDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoItinerario = data.ListaDetalleDocumento[0].CodigoItinerario;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreNave = data.ListaDetalleDocumento[0].NombreNave;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NumeroViajeItinerario = data.ListaDetalleDocumento[0].NumeroViajeItinerario;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreAduanaNave = data.ListaDetalleDocumento[0].NombreAduanaNave;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreTipoOperacion = data.ListaDetalleDocumento[0].NombreTipoOperacion;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoOrigenDocumento = data.ListaDetalleDocumento[0].CodigoPuertoOrigenDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoOrigen = data.ListaDetalleDocumento[0].NombrePuertoOrigen;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoEmbarqueDocumento = data.ListaDetalleDocumento[0].CodigoPuertoEmbarqueDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoEmbarque = data.ListaDetalleDocumento[0].NombrePuertoEmbarque;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoDescargaDocumento = data.ListaDetalleDocumento[0].CodigoPuertoDescargaDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoDescarga = data.ListaDetalleDocumento[0].NombrePuertoDescarga;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoFinalDocumento = data.ListaDetalleDocumento[0].CodigoPuertoFinalDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoFinal = data.ListaDetalleDocumento[0].NombrePuertoFinal;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoLineaNaviera = data.ListaDetalleDocumento[0].CodigoLineaNaviera;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreLineaNaviera = data.ListaDetalleDocumento[0].NombreLineaNaviera;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoAduana = data.ListaDetalleDocumento[0].CodigoAduana;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreAduana = data.ListaDetalleDocumento[0].NombreAduana;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoTipoBL = data.ListaDetalleDocumento[0].CodigoTipoBL;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreTipoBL = data.ListaDetalleDocumento[0].NombreTipoBL;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoTipoEnvio = data.ListaDetalleDocumento[0].CodigoTipoEnvio;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreTipoEnvio = data.ListaDetalleDocumento[0].NombreTipoEnvio;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoCondicionContrato = data.ListaDetalleDocumento[0].CodigoCondicionContrato;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreCondicionContrato = data.ListaDetalleDocumento[0].NombreCondicionContrato;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoRequerimientoServicio = data.ListaDetalleDocumento[0].CodigoRequerimientoServicio;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreRequerimientoServicio = data.ListaDetalleDocumento[0].NombreRequerimientoServicio;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NumeroDocumento = data.ListaDetalleDocumento[0].NumeroDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.FechaEmisionDocumento = data.ListaDetalleDocumento[0].FechaEmisionDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.FechaEmbarqueDocumento = data.ListaDetalleDocumento[0].FechaEmbarqueDocumento;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.Accion = data.ListaDetalleDocumento[0].Accion;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.FechaHoraCreacion = data.ListaDetalleDocumento[0].FechaHoraCreacion;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.FechaHoraActualizacion = data.ListaDetalleDocumento[0].FechaHoraActualizacion;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.UsuarioActualizacion = data.ListaDetalleDocumento[0].UsuarioActualizacion;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.UsuarioCreacion = data.ListaDetalleDocumento[0].UsuarioCreacion;
                                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.EstadoRegistro = data.ListaDetalleDocumento[0].EstadoRegistro;

                                        if (!data.ListaDetalleDocumento[0].EstadoRegistro) {
                                            $scope.FlagMostrarBotonModificar = false;
                                            $scope.FlagMostrarBotonDeshabilitar = false;
                                        }

                                        //Listas
                                        $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga = data.ListaDetalleDocumento[0].ListaDocumentoDetalleCarga;
                                        $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente = data.ListaDetalleDocumento[0].ListaDocumentoDetalleCliente;
                                        $rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete = data.ListaDetalleDocumento[0].ListaDocumentoDetalleFlete;

                                        //Grillas
                                        $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosCargaMemoria = data.ListaDetalleDocumento[0].ListaDocumentoDetalleCarga;
                                        $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosClienteMemoria = data.ListaDetalleDocumento[0].ListaDocumentoDetalleCliente;
                                        $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosFleteMemoria = data.ListaDetalleDocumento[0].ListaDocumentoDetalleFlete;
                                        $scope.gridapigrillaListaDatosCarga.refresh($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga);
                                        $scope.gridapigrillaListaDatosCliente.refresh($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente);
                                        $scope.gridapigrillaListaDatosFlete.refresh($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete);

                                        $rootScope.$apply();

                                        //$rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPuerto;

                                        //$rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPuerto;
                                        //$scope.gridapigrillaAceListaPuertos.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos);
                                    }
                                }
                            }
                        });
                    }

                    $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
                        var eventoclick = "";
                        switch (idgrilla) {

                            case "grillaListaDatosCarga":
                                {
                                    switch (tipoboton) {
                                        case "Editar":
                                            eventoclick = "$parent.EditarDetalleCarga('" + rowObject.IdCarga + "');";
                                            break;
                                        case "Quitar":
                                            eventoclick = "$parent.EliminarDetalleCarga('" + rowObject.IdCarga + "');";
                                            break;
                                    }
                                }
                                break;
                            case "grillaListaDatosCliente":
                                {
                                    switch (tipoboton) {
                                        case "Editar":
                                            eventoclick = "$parent.EditarDetalleCliente('" + rowObject.IdCliente + "');";
                                            break;
                                        case "Quitar":
                                            eventoclick = "$parent.EliminarDetalleCliente('" + rowObject.IdCliente + "');";
                                            break;
                                    }
                                }
                                break;
                            case "grillaListaDatosFlete":
                                {
                                    switch (tipoboton) {
                                        case "Editar":
                                            eventoclick = "$parent.EditarDetalleFlete('" + rowObject.IdFlete + "');";
                                            break;
                                        case "Quitar":
                                            eventoclick = "$parent.EliminarDetalleFlete('" + rowObject.IdFlete + "');";
                                            break;
                                    }
                                }
                                break;
                        }

                        if (tipoboton == "Editar") {
                            html = HtmlCrearBoton("Modificar", eventoclick, "");
                        }
                        if (tipoboton == "Quitar") {
                            html = HtmlCrearBoton("Eliminar", eventoclick, "");
                        }
                        return html;
                    }

                    $rootScope.EliminarDetalleCarga = function (IdCarga) {
                        MiConfirm("¿Está seguro de eliminar Carga?", function () {

                            var listaGrillaMemoriaCarga = $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga;
                            var listaBaseMemoriaCarga = $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosCargaMemoria;
                            var listaGrillaCarga = [];
                            var listaBaseCarga = [];
                            for (var x = 0; x < listaGrillaMemoriaCarga.length; x++) {
                                if (listaGrillaMemoriaCarga[x].IdCarga != IdCarga) {
                                    listaGrillaCarga.push(listaGrillaMemoriaCarga[x]);
                                }
                            }
                            for (var x = 0; x < listaBaseMemoriaCarga.length; x++) {
                                if (listaBaseMemoriaCarga[x].IdCarga == IdCarga) {
                                    if (listaBaseMemoriaCarga[x].IdCarga > 0 && listaBaseMemoriaCarga[x].CodigoDocumentoDetalleCarga > 0) {
                                        listaBaseMemoriaCarga[x].Accion = "D";
                                        listaBaseCarga.push(listaBaseMemoriaCarga[x]);
                                    }
                                } else {
                                    listaBaseCarga.push(listaBaseMemoriaCarga[x]);
                                }
                            }
                            $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga = listaGrillaCarga;
                            $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosCargaMemoria = listaBaseCarga;
                            $scope.gridapigrillaListaDatosCarga.refresh(listaGrillaCarga);
                            $rootScope.$apply();
                        });
                    }

                    $rootScope.EliminarDetalleCliente = function (IdCliente) {
                        MiConfirm("¿Está seguro de eliminar Cliente?", function () {

                            var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente;
                            var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosClienteMemoria;
                            var listaGrillaCliente = [];
                            var listaBaseCliente = [];
                            for (var x = 0; x < listaGrillaMemoriaCliente.length; x++) {
                                if (listaGrillaMemoriaCliente[x].IdCliente != IdCliente) {
                                    listaGrillaCliente.push(listaGrillaMemoriaCliente[x]);
                                }
                            }
                            for (var x = 0; x < listaBaseMemoriaCliente.length; x++) {
                                if (listaBaseMemoriaCliente[x].IdCliente == IdCliente) {
                                    if (listaBaseMemoriaCliente[x].IdCliente > 0 && listaBaseMemoriaCliente[x].CodigoDocumentoDetalleCliente > 0) {
                                        listaBaseMemoriaCliente[x].Accion = "D";
                                        listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                                    }
                                } else {
                                    listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                                }
                            }
                            $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente = listaGrillaCliente;
                            $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosClienteMemoria = listaBaseCliente;
                            $scope.gridapigrillaListaDatosCliente.refresh(listaGrillaCliente);
                            $rootScope.$apply();
                        });
                    }

                    $rootScope.EliminarDetalleFlete = function (IdFlete) {
                        MiConfirm("¿Está seguro de eliminar Flete?", function () {

                            var listaGrillaMemoriaFlete = $rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete;
                            var listaBaseMemoriaFlete = $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosFleteMemoria;
                            var listaGrillaFlete = [];
                            var listaBaseFlete = [];
                            for (var x = 0; x < listaGrillaMemoriaFlete.length; x++) {
                                if (listaGrillaMemoriaFlete[x].IdFlete != IdFlete) {
                                    listaGrillaFlete.push(listaGrillaMemoriaFlete[x]);
                                }
                            }
                            for (var x = 0; x < listaBaseMemoriaFlete.length; x++) {
                                if (listaBaseMemoriaFlete[x].IdFlete == IdFlete) {
                                    if (listaBaseMemoriaFlete[x].IdFlete > 0 && listaBaseMemoriaFlete[x].CodigoDocumentoDetalleFlete > 0) {
                                        listaBaseMemoriaFlete[x].Accion = "D";
                                        listaBaseFlete.push(listaBaseMemoriaFlete[x]);
                                    }
                                } else {
                                    listaBaseFlete.push(listaBaseMemoriaFlete[x]);
                                }
                            }
                            $rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete = listaGrillaFlete;
                            $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosFleteMemoria = listaBaseFlete;
                            $scope.gridapigrillaListaDatosFlete.refresh(listaGrillaFlete);
                            $rootScope.$apply();
                        });
                    }

                    $rootScope.EditarDetalleCarga = function (IdCarga) {

                        var objReg = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga, function (f) {
                            return f.IdCarga == IdCarga;
                        });

                        if (objReg.length > 0) {
                            var EdtitItem = {
                                CodigoDocumentoDetalleCarga: objReg[0].CodigoDocumentoDetalleCarga,
                                CodigoDocumento: objReg[0].CodigoDocumento,
                                CodigoContenedor: objReg[0].CodigoContenedor,
                                NumeroContenedor: objReg[0].NumeroContenedor,
                                NombreTipoContenedor: objReg[0].NombreTipoContenedor,
                                TamanioTipoContenedor: objReg[0].TamanioTipoContenedor,
                                CodigoCondicionTransporte: objReg[0].CodigoCondicionTransporte,
                                NombreCondicionTransporte: objReg[0].NombreCondicionTransporte,
                                CodigoTipoMovimiento: objReg[0].CodigoTipoMovimiento,
                                NombreTipoMovimiento: objReg[0].NombreTipoMovimiento,
                                CodigoUnidadMercancia: objReg[0].CodigoUnidadMercancia,
                                NombreUnidadMercancia: objReg[0].NombreUnidadMercancia,
                                CodigoNaturalezaCarga: objReg[0].CodigoNaturalezaCarga,
                                NombreNaturalezaCarga: objReg[0].NombreNaturalezaCarga,
                                CodigoCondicionCarga: objReg[0].CodigoCondicionCarga,
                                NombreCondicionCarga: objReg[0].NombreCondicionCarga,
                                CodigoTemperatura: objReg[0].CodigoTemperatura,
                                NombreTemperatura: objReg[0].NombreTemperatura,
                                CodigoClaseIMO: objReg[0].CodigoClaseIMO,
                                NombreClaseIMO: objReg[0].NombreClaseIMO,
                                CodigoNumeroIMO: objReg[0].CodigoNumeroIMO,
                                NombreNumeroIMO: objReg[0].NombreNumeroIMO,
                                CodigoAlmacenDocumentoDetalleCarga: objReg[0].CodigoAlmacenDocumentoDetalleCarga,
                                NombreAlmacen: objReg[0].NombreAlmacen,
                                CodigoDepositoDocumentoDetalleCarga: objReg[0].CodigoDepositoDocumentoDetalleCarga,
                                NombreDeposito: objReg[0].NombreDeposito,
                                CodigoPrecinto: objReg[0].CodigoPrecinto,
                                NumeroPrecinto: objReg[0].NumeroPrecinto,
                                ItemDocumentoDetalleCarga: objReg[0].ItemDocumentoDetalleCarga,
                                CantidadBultoDocumentoDetalleCarga: objReg[0].CantidadBultoDocumentoDetalleCarga,
                                PesoBrutoDocumentoDetalleCarga: objReg[0].PesoBrutoDocumentoDetalleCarga,
                                VolumenBrutoDocumentoDetalleCarga: objReg[0].VolumenBrutoDocumentoDetalleCarga,
                                TemperaturaMinimaDocumentoDetalleCarga: objReg[0].TemperaturaMinimaDocumentoDetalleCarga,
                                TemperaturaMaximaDocumentoDetalleCarga: objReg[0].TemperaturaMaximaDocumentoDetalleCarga,
                                PropietarioDocumentoDetalleCarga: objReg[0].PropietarioDocumentoDetalleCarga,
                                ObservacionDocumentoDetalleCarga: objReg[0].ObservacionDocumentoDetalleCarga,
                                DescripcionDocumentoDetalleCarga: objReg[0].DescripcionDocumentoDetalleCarga,
                                MarcasNumerosDocumentoDetalleCarga: objReg[0].MarcasNumerosDocumentoDetalleCarga,
                                FaltoDocumentoDetalleCarga: objReg[0].FaltoDocumentoDetalleCarga,
                                IdCarga: objReg[0].IdCarga
                            }

                            $rootScope.DatosFormulario.OpcionCarga = "EditarCarga";
                            $rootScope.DatosFormulario.CodigoDocumento = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento;
                            getPopupResponsive({
                                formURL: "DocumentoDetalleCarga/RegistrarCarga",
                                title: "Actualizar Carga ",
                                nombreDiv: "divPopupRegistrarCarga",
                                nombreGrid: "",
                                width: "10px",
                                height: 50,
                                params: {},
                                HideSelection: true,
                                multiSelect: false,
                                select: function (row) {
                                    return true;
                                },
                                beforeShow: function (obj) {
                                    $rootScope.hashPopup = $(obj).attr("mapurl");
                                    $compile($("#divPopupRegistrarCarga"))($scope);
                                    var scopePopup = angular.element("#divPopupRegistrarCarga").scope();
                                    scopePopup.row = JSON.parse(JSON.stringify(EdtitItem));
                                    scopePopup.rowOk = EdtitItem;
                                }
                            });
                        }
                    }

                    $rootScope.EditarDetalleCliente = function (IdCliente) {

                        var objReg = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente, function (f) {
                            return f.IdCliente == IdCliente;
                        });

                        if (objReg.length > 0) {
                            var EdtitItem = {
                                CodigoDocumentoDetalleCliente: objReg[0].CodigoDocumentoDetalleCliente,
                                CodigoDocumento: objReg[0].CodigoDocumento,
                                CodigoRol: objReg[0].CodigoRol,
                                NombreRol: objReg[0].NombreRol,
                                CodigoPersona: objReg[0].CodigoPersona,
                                RazonSocialPersona: objReg[0].RazonSocialPersona,
                                IdCliente: objReg[0].IdCliente
                            }

                            $rootScope.DatosFormulario.OpcionCliente = "EditarCliente";
                            $rootScope.DatosFormulario.CodigoDocumento = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento;
                            getPopupResponsive({
                                formURL: "DocumentoDetalleCliente/RegistrarCliente",
                                title: "Actualizar Cliente",
                                nombreDiv: "divPopupRegistrarCliente",
                                nombreGrid: "",
                                width: "10px",
                                height: 50,
                                params: {},
                                HideSelection: true,
                                multiSelect: false,
                                select: function (row) {
                                    return true;
                                },
                                beforeShow: function (obj) {
                                    $rootScope.hashPopup = $(obj).attr("mapurl");
                                    $compile($("#divPopupRegistrarCliente"))($scope);
                                    var scopePopup = angular.element("#divPopupRegistrarCliente").scope();
                                    scopePopup.row = JSON.parse(JSON.stringify(EdtitItem));
                                    scopePopup.rowOk = EdtitItem;
                                }
                            });
                        }
                    }

                    $rootScope.EditarDetalleFlete = function (IdFlete) {

                        // var objReg = $from($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete).where("IdFlete==" + IdFlete).firstOrDefault();

                        var objReg = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete, function (f) {
                            return f.IdFlete == IdFlete;
                        });

                        if (objReg.length > 0) {
                            var EdtitItem = {
                                CodigoDocumentoDetalleFlete: objReg[0].CodigoDocumentoDetalleFlete,
                                CodigoDocumento: objReg[0].CodigoDocumento,
                                CodigoModoPago: objReg[0].CodigoModoPago,
                                CodigoMoneda: objReg[0].CodigoMoneda,
                                CodigoTipoFlete: objReg[0].CodigoTipoFlete,
                                MontoDocumentoDetalleFlete: objReg[0].MontoDocumentoDetalleFlete,
                                NombreMoneda: objReg[0].NombreMoneda,
                                NombreModoPago: objReg[0].NombreModoPago,
                                NombreTipoFlete: objReg[0].NombreTipoFlete,
                                IdFlete: objReg[0].IdFlete
                            }

                            $rootScope.DatosFormulario.OpcionFlete = "EditarFlete";
                            $rootScope.DatosFormulario.CodigoDocumento = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento;
                            getPopupResponsive({
                                formURL: "DocumentoDetalleFlete/RegistrarFlete",
                                title: "Actualizar Flete ",
                                nombreDiv: "divPopupRegistrarFlete",
                                nombreGrid: "",
                                width: "10px",
                                height: 50,
                                params: {},
                                HideSelection: true,
                                multiSelect: false,
                                select: function (row) {
                                    return true;
                                },
                                beforeShow: function (obj) {
                                    $rootScope.hashPopup = $(obj).attr("mapurl");
                                    $compile($("#divPopupRegistrarFlete"))($scope);
                                    var scopePopup = angular.element("#divPopupRegistrarFlete").scope();
                                    scopePopup.row = JSON.parse(JSON.stringify(EdtitItem));
                                    scopePopup.rowOk = EdtitItem;
                                }
                            });
                        }
                    }

                    $scope.Guardar_Click = function () {

                        var listaCargas = [];
                        var listaClientes = [];
                        var listaFletes = [];

                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.Accion == "I") {
                            listaCargas = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga, function (e) { return e.Accion != undefined; });
                            listaClientes = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente, function (e) { return e.Accion != undefined; });
                            listaFletes = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete, function (e) { return e.Accion != undefined; });
                        } else {
                            listaCargas = $.grep($rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosCargaMemoria, function (e) { return e.Accion != undefined; });
                            listaClientes = $.grep($rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosClienteMemoria, function (e) { return e.Accion != undefined; });
                            listaFletes = $.grep($rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosFleteMemoria, function (e) { return e.Accion != undefined; });
                        }
                        //Seteo datos registro
                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.ListaDocumentoDetalleCarga = listaCargas;
                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.ListaDocumentoDetalleCliente = listaClientes;
                        $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.ListaDocumentoDetalleFlete = listaFletes;

                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.Accion != "I") {
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.Accion = determinarAccion($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento);
                        }

                        var validacion = validacionesCamposGuardar();
                        if (validacion == false) {
                            return false;
                        }

                        guardarDocumento();
                    }

                    $scope.BuscarItinerario_Click = function () {
                        $rootScope.DatosFormulario.OpcionItinerario = "RegistroDocumento";
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

                    $scope.BuscarPuertoOrigen_Click = function () {
                        $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoOrigenRegistrarDocumento";
                        getPopupResponsive({
                            formURL: "Puerto/BuscarPuerto",
                            title: "Buscar Puerto Origen",
                            nombreDiv: "divPopupBuscarPuerto",
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
                                $compile($("#divPopupBuscarPuerto"))($scope);
                            }
                        });
                    }

                    $scope.BuscarPuertoEmbarque_Click = function () {
                        $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoEmbarqueRegistrarDocumento";
                        getPopupResponsive({
                            formURL: "Puerto/BuscarPuerto",
                            title: "Buscar Puerto Embarque",
                            nombreDiv: "divPopupBuscarPuerto",
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
                                $compile($("#divPopupBuscarPuerto"))($scope);
                            }
                        });
                    }

                    $scope.BuscarPuertoDescarga_Click = function () {
                        $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoDescargaRegistrarDocumento";
                        getPopupResponsive({
                            formURL: "Puerto/BuscarPuerto",
                            title: "Buscar Puerto Descarga",
                            nombreDiv: "divPopupBuscarPuerto",
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
                                $compile($("#divPopupBuscarPuerto"))($scope);
                            }
                        });
                    }

                    $scope.BuscarPuertoFinal_Click = function () {
                        $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoFinalRegistrarDocumento";
                        getPopupResponsive({
                            formURL: "Puerto/BuscarPuerto",
                            title: "Buscar Puerto Final",
                            nombreDiv: "divPopupBuscarPuerto",
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
                                $compile($("#divPopupBuscarPuerto"))($scope);
                            }
                        });
                    }

                    $scope.BuscarLineaNaviera_Click = function () {
                        $rootScope.DatosFormulario.OpcionLineaNaviera = "BuscarLineaNavieraRegistrarDocumento";
                        getPopupResponsive({
                            formURL: "LineaNaviera/BuscarLineaNaviera",
                            title: "Buscar Linea Naviera",
                            nombreDiv: "divPopupBuscarLineaNaviera",
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
                                $compile($("#divPopupBuscarLineaNaviera"))($scope);
                            }
                        });
                    }

                    $scope.BuscarAduana_Click = function () {
                        $rootScope.DatosFormulario.OpcionAduana = "BuscarAduanaRegistrarDocumento";
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

                    $scope.BuscarRequerimientoServicio_Click = function () {
                        $rootScope.DatosFormulario.OpcionRequerimientoServicio = "BuscarRequerimientoServicioRegistrarDocumento";
                        getPopupResponsive({
                            formURL: "RequerimientoServicio/BuscarRequerimientoServicio",
                            title: "Buscar Requerimiento Servicio",
                            nombreDiv: "divPopupBuscarRequerimientoServicio",
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
                                $compile($("#divPopupBuscarRequerimientoServicio"))($scope);
                            }
                        });
                    }

                    $scope.AgregarDatosCarga = function () {
                        $rootScope.DatosFormulario.OpcionCarga = "RegistrarCarga";
                        $rootScope.DatosFormulario.CodigoDocumento = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento;
                        getPopupResponsive({
                            formURL: "DocumentoDetalleCarga/RegistrarCarga",
                            title: "Registrar Carga ",
                            nombreDiv: "divPopupRegistrarCarga",
                            nombreGrid: "",
                            width: "10px",
                            height: 50,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $compile($("#divPopupRegistrarCarga"))($scope);
                            }
                        });
                    }

                    $scope.AgregarDatosCliente = function () {
                        $rootScope.DatosFormulario.OpcionCliente = "RegistrarCliente";
                        $rootScope.DatosFormulario.CodigoDocumento = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento;
                        getPopupResponsive({
                            formURL: "DocumentoDetalleCliente/RegistrarCliente",
                            title: "Registrar Cliente ",
                            nombreDiv: "divPopupRegistrarCliente",
                            nombreGrid: "",
                            width: "10px",
                            height: 50,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $compile($("#divPopupRegistrarCliente"))($scope);
                            }
                        });
                    }

                    $scope.AgregarDatosFlete = function () {
                        $rootScope.DatosFormulario.OpcionFlete = "RegistrarFlete";
                        $rootScope.DatosFormulario.CodigoDocumento = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento;
                        getPopupResponsive({
                            formURL: "DocumentoDetalleFlete/RegistrarFlete",
                            title: "Registrar Flete ",
                            nombreDiv: "divPopupRegistrarFlete",
                            nombreGrid: "",
                            width: "10px",
                            height: 50,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $compile($("#divPopupRegistrarFlete"))($scope);
                            }
                        });
                    }

                    $scope.Deshabilitar_Click = function () {
                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento > 0) {
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.EstadoRegistro = false;
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.Accion = "U";
                            MiConfirm("¿Está seguro de deshabilitar el Documento?.", function () {
                                $.ajax({
                                    url: "/Documento/DeshabilitarDocumento",
                                    type: "POST",
                                    headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                    data: $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento,
                                    dataType: "json",
                                    cache: true,
                                    async: false,
                                    success: function (data) {
                                        if (data.Result != null) {
                                            if (data.Result.Satisfactorio === true) {
                                                MiAlertOk("Se ha deshabilitado el  Documento", MiAlertOk_success);
                                            }
                                            else {
                                                if (data.Result.Mensajes.length > 0) {
                                                    MiError(data.Result.Mensajes[0].Mensaje);
                                                } else {
                                                    MiError(data.Result.Mensaje);
                                                }
                                            }
                                        } else {
                                            MiAlert("Ocurrió un problema interno en el sistema.");
                                        }
                                    }
                                });
                            });
                        }
                    }

                    $scope.Salir_Click = function () {
                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.UrlOrigen != undefined) {
                            window.location.href = $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.UrlOrigen;
                        } else {
                            window.location.href = "/#!/sistema/busqueda/buscar-documento/";
                        }
                        $rootScope.DatosFormulario.RegistroDocumento.FlagDocumento = true;
                    }
                    $scope.Modificar_Click = function () {
                        $scope.FlagMostrarBotonGuardar = true;
                        $scope.FlagMostrarBotonModificar = false;
                        $scope.FlagMostrarBotonDeshabilitar = false;
                        $scope.FlagEditing = true;
                        $scope.EditingGrillas();
                    }

                    $scope.EditingGrillas = function () {
                        var arrayGrillas = new Array();
                        arrayGrillas.push("grillaListaDatosCarga");
                        arrayGrillas.push("grillaListaDatosCliente");
                        arrayGrillas.push("grillaListaDatosFlete");
                        ReadOnlyForm(arrayGrillas, $scope.FlagEditing, []);
                    }

                    function determinarAccion(objGrabar) {
                        var actionU = "U";
                        var actionN = "N";
                        var viewInitialData = $rootScope.DatosFormulario.RegistroDocumento.DocumentoRecoverOriginalDataView;
                        if (viewInitialData != undefined) {
                            if (objGrabar.CodigoLinea != viewInitialData.CodigoLinea) {
                                return actionU;
                            }
                            else if (objGrabar.CodigoDocumento != viewInitialData.CodigoDocumento) {
                                return actionU;
                            }
                            else if (objGrabar.CodigoTipoDocumento != viewInitialData.CodigoTipoDocumento) {
                                return actionU;
                            }
                            else if (objGrabar.CodigoPais != viewInitialData.CodigoPais) {
                                return actionU;
                            }
                            else {
                                return actionN;
                            }
                        } else {
                            return actionU;
                        }
                    }

                    function guardarDocumento() {
                        miBlock(true, "#html");
                        $.ajax({
                            url: "/Documento/GrabarDocumento",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                miBlock(false, "#html");
                                if (data.Result != null) {
                                    if (data.Result.Satisfactorio === true) {
                                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.Accion == 'I') {
                                            MiAlertOk("Se ha grabado correctamente el Documento", MiAlertOk_success);
                                        } else {
                                            MiAlertOk("Se ha actualizado correctamente el Documento", MiAlertOk_success);
                                        }
                                    }
                                    else {
                                        if (data.Result.Mensajes.length > 0) {
                                            MiAlert(data.Result.Mensaje);
                                        }
                                        else {
                                            MiError(data.Result.Mensaje);
                                        }
                                    }
                                } else {
                                    MiAlert("Ocurrió un problema interno en el sistema.");
                                }
                            }
                        });
                    }
                    function MiAlertOk_success() {
                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.UrlOrigen != undefined) {
                            window.location.href = $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.UrlOrigen;
                        } else {
                            window.location.href = "/#!/sistema/busqueda/buscar-documento/";
                        }
                    }

                    function getUrlVars() {
                        var vars = [], hash;
                        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                        for (var i = 0; i < hashes.length; i++) {
                            hash = hashes[i].split('=');
                            vars.push(hash[0]);
                            vars[hash[0]] = hash[1];
                        }
                        return vars;
                    }

                    function validacionesCamposGuardar() {
                        //limpiarControlesValidados();
                        miBlock(true, "#html");
                        var salida = true;

                        if (validateForm("#frmDocumento_DatosGenerales") == false) {
                            miBlock(false, "#html");
                            salida = false;
                        }

                        var vNombreNave = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreNave;
                        if (vNombreNave == undefined) {
                            $(".caja11.msgerror.NombreNave").html("Itinerario debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombreNave.length <= 0) {
                            $(".caja11.msgerror.NombreNave").html("Itinerario debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.NombreNave").html("");
                        }

                        var vNombrePuertoOrigen = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoOrigen;
                        if (vNombrePuertoOrigen == undefined) {
                            $(".caja11.msgerror.NombrePuertoOrigen").html("Puerto de Origen debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombrePuertoOrigen.length <= 0) {
                            $(".caja11.msgerror.NombrePuertoOrigen").html("Puerto de Origen debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.NombrePuertoOrigen").html("");
                        }

                        var vNombrePuertoEmbarque = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoEmbarque;
                        if (vNombrePuertoEmbarque == undefined) {
                            $(".caja11.msgerror.NombrePuertoEmbarque").html("Puerto de Embarque debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombrePuertoEmbarque.length <= 0) {
                            $(".caja11.msgerror.NombrePuertoEmbarque").html("Puerto de Embarque debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.NombrePuertoEmbarque").html("");
                        }

                        var vNombrePuertoDescarga = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoDescarga;
                        if (vNombrePuertoDescarga == undefined) {
                            $(".caja11.msgerror.NombrePuertoDescarga").html("Puerto de Descarga debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombrePuertoDescarga.length <= 0) {
                            $(".caja11.msgerror.NombrePuertoDescarga").html("Puerto de Descarga debe tener un valor.");
                            salida = false; c
                        }
                        else {
                            $(".caja11.msgerror.NombrePuertoDescarga").html("");
                        }

                        var vNombrePuertoFinal = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoFinal;
                        if (vNombrePuertoFinal == undefined) {
                            $(".caja11.msgerror.NombrePuertoFinal").html("Puerto Final debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombrePuertoFinal.length <= 0) {
                            $(".caja11.msgerror.NombrePuertoFinal").html("Puerto Final debe tener un valor.");
                            salida = false; c
                        }
                        else {
                            $(".caja11.msgerror.NombrePuertoFinal").html("");
                        }

                        var vNombreLineaNaviera = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreLineaNaviera;
                        if (vNombreLineaNaviera == undefined) {
                            $(".caja11.msgerror.NombreLineaNaviera").html("Linea Naviera debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombreLineaNaviera.length <= 0) {
                            $(".caja11.msgerror.NombreLineaNaviera").html("Linea Naviera debe tener un valor.");
                            salida = false; c
                        }
                        else {
                            $(".caja11.msgerror.NombreLineaNaviera").html("");
                        }

                        var vNombreAduana = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreAduana;
                        if (vNombreAduana == undefined) {
                            $(".caja11.msgerror.NombreAduana").html("Aduana debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombreAduana.length <= 0) {
                            $(".caja11.msgerror.NombreAduana").html("Aduana debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.NombreAduana").html("");
                        }

                        var vCodigoTipoBL = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoTipoBL;
                        if (vCodigoTipoBL == undefined) {
                            $(".caja11.msgerror.CodigoTipoBL").html("Tipo de BL debe tener un valor.");
                            salida = false;
                        }
                        else if (vCodigoTipoBL.length <= 0) {
                            $(".caja11.msgerror.CodigoTipoBL").html("Tipo de BL debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.CodigoTipoBL").html("");
                        }

                        var vCodigoTipoEnvio = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoTipoEnvio;
                        if (vCodigoTipoEnvio == undefined) {
                            $(".caja11.msgerror.CodigoTipoEnvio").html("Tipo de Envio debe tener un valor.");
                            salida = false;
                        }
                        else if (vCodigoTipoEnvio.length <= 0) {
                            $(".caja11.msgerror.CodigoTipoEnvio").html("Tipo de Envio debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.CodigoTipoEnvio").html("");
                        }

                        var vCodigoCondicionContrato = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoCondicionContrato;
                        if (vCodigoCondicionContrato == undefined) {
                            $(".caja11.msgerror.CodigoCondicionContrato").html("Condicion de Contrato debe tener un valor.");
                            salida = false;
                        }
                        else if (vCodigoCondicionContrato.length <= 0) {
                            $(".caja11.msgerror.CodigoCondicionContrato").html("Condicion de Contrato debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.CodigoCondicionContrato").html("");
                        }

                        var vNombreRequerimientoServicio = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreRequerimientoServicio;
                        if (vNombreRequerimientoServicio == undefined) {
                            $(".caja11.msgerror.NombreRequerimientoServicio").html("Requerimiento Servicio debe tener un valor.");
                            salida = false;
                        }
                        else if (vNombreRequerimientoServicio.length <= 0) {
                            $(".caja11.msgerror.NombreRequerimientoServicio").html("Requerimiento Servicio debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.NombreRequerimientoServicio").html("");
                        }

                        var vNumeroDocumento = $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NumeroDocumento;
                        if (vNumeroDocumento == undefined) {
                            $(".caja11.msgerror.NumeroDocumento").html("Numero de Documento debe tener un valor.");
                            salida = false;
                        }
                        else if (vNumeroDocumento.length <= 0) {
                            $(".caja11.msgerror.NumeroDocumento").html("Numero de Documento debe tener un valor.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.NumeroDocumento").html("");
                        }

                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga.length == 0) {
                            $(".caja11.msgerror.listaCargas").html("Debe registrar por lo menos un contenedor");
                            salida = false;
                        }

                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga.length > 1) {
                            $.each($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga, function (x) {
                                if ($from($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga).where("$CodigoContenedor==" + this.CodigoContenedor).toArray().length > 1) {
                                    $(".caja11.msgerror.listaCargas").html("No pueden existir contenedores duplicados");
                                    salida = false;
                                }

                            });
                        }

                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente.length == 0) {
                            $(".caja11.msgerror.listaClientes").html("Debe registrar por lo menos un Cliente");
                            salida = false;
                        }

                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente.length > 1) {
                            $.each($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente, function (x) {
                                if ($from($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente).where("$CodigoRol==" + this.CodigoRol).toArray().length > 1) {
                                    $(".caja11.msgerror.listaClientes").html("No pueden existir roles duplicados");
                                    salida = false;
                                }

                            });
                        }

                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete.length == 0) {
                            $(".caja11.msgerror.listaFletes").html("Debe registrar por lo menos un flete");
                            salida = false;
                        }

                        if ($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete.length > 1) {
                            $.each($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete, function (x) {
                                if ($from($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete).where("$CodigoTipoFlete==" + this.CodigoTipoFlete + "&$CodigoModoPago==" + this.CodigoModoPago).toArray().length > 1) {
                                    $(".caja11.msgerror.listaFletes").html("No pueden existir fletes duplicados");
                                    salida = false;
                                }

                            });
                        }

                        return salida;
                    }

                    $scope.MinimizarBloques = function () {
                        //Cargas
                        $("#seccion-12").find(".block_cab").removeClass("block_cab_active");
                        $("#seccion-12").find(".block_content").attr('style', 'display: none');
                        //Clientes
                        $("#seccion-14").find(".block_cab").removeClass("block_cab_active");
                        $("#seccion-14").find(".block_content").attr('style', 'display: none');
                        //Fletes
                        $("#seccion-13").find(".block_cab").removeClass("block_cab_active");
                        $("#seccion-13").find(".block_content").attr('style', 'display: none');
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