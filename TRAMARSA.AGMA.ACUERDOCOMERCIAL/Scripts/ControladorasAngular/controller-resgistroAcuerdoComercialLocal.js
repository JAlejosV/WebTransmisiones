(function () {
    angular.module('api')
    .controller('RegistroAcuerdoComercialLocalController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.DatosAC == undefined)
                  $rootScope.DatosFormulario.DatosAC = new Object();
              if ($rootScope.DatosFormulario.RegistroAC == undefined)
                  $rootScope.DatosFormulario.RegistroAC = new Object();
              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro == undefined)
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro = new Object();
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaRAMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaRAMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList = [];

              //Inicio: Detalle tarifas ligadas
              if ($rootScope.DatosFormulario.DatosTarifaLocal == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = [];
              if ($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = [];
              //Fin: Detalle tarifas ligadas


              if ($rootScope.DatosFormulario.RegistroAC.grillaListaMatchCodeMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaMatchCodeMemoriaList = [];

              if ($rootScope.DatosFormulario.RegistroAC.grillaListaPartidaArancelariaMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroAC.grillaListaPartidaArancelariaMemoriaList = [];

              // Requiere Secciones ----------------------------
              $scope.FlagMostrarValidateRateAgreement = false;
              $scope.FlagMostrarValidateMatchCodeCliente = false;
              $scope.FlagMostrarValidateContenedorBL = false;
              $scope.FlagMostrarValidateClienteBLMaster = false;
              $scope.FlagMostrarValidateClienteBLHouse = false;

              $scope.SeccionTituloRate = "";
              $scope.SeccionTituloMatchCodeCliente = "";
              $scope.SeccionTituloContenedorBL = "";
              $scope.SeccionTituloClienteBLMaster = "";
              $scope.SeccionTituloClienteBLHouse = "";

              //----------------------------------------------

              var paramCodigoAcuerdoComercialLocal = getUrlVars()["codigoAcuerdoLocal"];
              if (paramCodigoAcuerdoComercialLocal) {
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagEditar = true;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal = paramCodigoAcuerdoComercialLocal;
              }
              var esEditar = $rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagEditar;
              var esSeguimiento = $rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagSeguimiento;
              $scope.CargarDatosIniciales();
              if (esEditar) {
                  $scope.FlagMostrarBotonGuardar = false;
                  $scope.FlagMostrarBotonModificar = true;
                  $scope.FlagMostrarBotonHistorial = true;
                  $scope.FlagMostrarBotonDeshabilitar = true;
                  $rootScope.DatosFormulario.RegistroAC.OriginalDataView = new Object();
                  $scope.CargaInicialAcuerdoComercial();
                  $scope.FlagEditing = false;
                  $scope.FlagEditarLinea = false;
              } else {
                  $scope.FlagMostrarBotonGuardar = true;
                  $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal = 0;
                  $rootScope.DatosFormulario.RegistroAC.Accion = "I";
                  $scope.FlagEditing = true;
                  $scope.FlagEditarLinea = true;
              }
              if (esSeguimiento) {
                  $scope.FlagMostrarBotonModificar = false;
                  $scope.FlagMostrarBotonDeshabilitar = false;
              }
              $scope.EditingGrillas();
              $scope.MinimizarBloques(true);
              ObservadorAtributos();
              $("#seccion-7").hide();
              $("#seccion-9").hide();
              $("#seccion-10").hide();
              $("#seccion-11").hide();
          });

          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/AcuerdoComercialLocal/GrabarAcuerdoComercialLocalCargaInicial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.DatosAC.Lineas = data.Linea;
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.RegistroAC.CodigoLinea = data.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.RegistroAC.Habilitado = 'False';
                          }
                      }
                      $rootScope.DatosFormulario.DatosAC.Tipos = data.Tipo;
                      $rootScope.DatosFormulario.DatosAC.TipoCarga = data.TipoCarga;
                      if (data.Tipo.length > 0) {
                          $rootScope.DatosFormulario.RegistroAC.CodigoTipo = data.Tipo[0].Codigo;
                      }
                      //$rootScope.DatosFormulario.DatosAC.ListaSucursal = data.Sucursal;
                      //$scope.Grid_DataBind("DetalleSucursal", $rootScope.DatosFormulario.DatosAC.ListaSucursal);
                      $rootScope.DatosFormulario.DatosAC.ListaPuertos = data.TipoPuerto;
                      //$rootScope.DatosFormulario.DatosAC.ListaTiposDescuento = data.TipoDescuento;
                      var ListaTipoDescuento = [];
                      ListaTipoDescuento = $.grep(data.TipoDescuento, function (e) { return e.Codigo != "F"; });
                      $rootScope.DatosFormulario.DatosAC.ListaTiposDescuento = ListaTipoDescuento;




                      $rootScope.DatosFormulario.DatosAC.ListaMonedas = data.MonedaAcuerdo;
                      for (var i = 0; i < data.Codicion.length; i++) {
                          if ("HBLFCL" == data.Codicion[i].Codigo) {
                              $rootScope.DatosFormulario.DatosAC.CodigoCondicionFCL = data.Codicion[i].Codigo;
                              $rootScope.DatosFormulario.DatosAC.CondicionFCL = data.Codicion[i].Descripcion;
                          }
                          if ("HBLLCL" == data.Codicion[i].Codigo) {
                              $rootScope.DatosFormulario.DatosAC.CodigoCondicionLCL = data.Codicion[i].Codigo;
                              $rootScope.DatosFormulario.DatosAC.CondicionLCL = data.Codicion[i].Descripcion;
                          }
                      }

                      $rootScope.DatosFormulario.DatosAC.CodigoTipoCondicion = $rootScope.DatosFormulario.DatosAC.CodigoCondicionFCL;
                      $rootScope.DatosFormulario.RegistroAC.InicioVigencia = "";
                      $rootScope.DatosFormulario.RegistroAC.FinVigencia = "";


                      $rootScope.DatosFormulario.DatosAC.ListaRol = data.ListaRol;
                      // ConfiguracionSecciones("ConcesionLocal",$rootScope.DatosFormulario.RegistroAC.CodigoLinea);
                      var objConfiguracion = ConfiguracionSecciones("ConcesionLocal", $rootScope.DatosFormulario.RegistroAC.CodigoLinea);
                      $scope.RequeridoPorSeccionVisible(objConfiguracion, $rootScope.DatosFormulario.RegistroAC.CodigoLinea);

                      $scope.CargarSucursal();

                  }
              });
          }

          $scope.CargarSucursal = function () {
              var codLinea = $rootScope.DatosFormulario.RegistroAC.CodigoLinea;
              $rootScope.DatosFormulario.DatosAC.ListaSucursal = ObtenerSucursalesByLinea(codLinea);
              $scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.DatosAC.ListaSucursal);
              $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario = [];
              $scope.Grid_DataBind("DetalleTerminalPortuario", $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario);
          }

          $scope.CargaInicialAcuerdoComercial = function () {
              var param = $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal;
              $.ajax({
                  url: "/AcuerdoComercialLocal/ConsultarDetalleAcuerdoComercial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoAcuerdoComercial=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.DetalleAcuerdoComercialLocalList.length > 0) {
                              //Sucursal
                              $rootScope.DatosFormulario.DatosAC.ListaSucursal = data.DetalleAcuerdoComercialLocalList[0].ListMatchSucursal; //JM
                              if (data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursal.length > 0) {
                                  for (var number = 0; number < data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursal.length; number++) {
                                      /*  for (var z = 0; z < $rootScope.DatosFormulario.DatosAC.ListaSucursales.length; z++) {
                                            if ($rootScope.DatosFormulario.DatosAC.ListaSucursales[z].Codigo == data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursal[number].CodigoSucursal) {
                                                $rootScope.DatosFormulario.DatosAC.ListaSucursales[z].idCheck = true;
                                                $rootScope.DatosFormulario.DatosAC.ListaSucursales[z].Accion = "U";
                                                $scope.CheckItem_Sucursal($rootScope.DatosFormulario.DatosAC.ListaSucursales[z]);
                                            } else {
                                                $rootScope.DatosFormulario.DatosAC.ListaSucursales[z].Accion = "";
                                            }
                                        }
                                        */

                                      for (var z = 0; z < $rootScope.DatosFormulario.DatosAC.ListaSucursal.length; z++) {
                                          if ($rootScope.DatosFormulario.DatosAC.ListaSucursal[z].Codigo == data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursal[number].CodigoSucursal) {
                                              $rootScope.DatosFormulario.DatosAC.ListaSucursal[z].idCheck = true;
                                              $rootScope.DatosFormulario.DatosAC.ListaSucursal[z].Accion = "U";
                                              $scope.CheckItem_Sucursal($rootScope.DatosFormulario.DatosAC.ListaSucursal[z]);
                                          } else {
                                              $rootScope.DatosFormulario.DatosAC.ListaSucursal[z].Accion = "";
                                          }
                                      }
                                  }
                                  $rootScope.DatosFormulario.RegistroAC.ListaSucursalEdit = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursal;
                              }
                              //Terminal portuario
                              $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario = data.DetalleAcuerdoComercialLocalList[0].ListMatchTerminalPorturario; //JM
                              if (data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursalTerminal.length > 0) {
                                  for (var m = 0; m < data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursalTerminal.length; m++) {
                                      for (var y = 0; y < $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario.length; y++) {
                                          if ($rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario[y].CodigoSucursal == data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursalTerminal[m].CodigoSucursal
                                              && $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario[y].CodigoAlmacen == data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursalTerminal[m].CodigoTerminalPortuario) {
                                              $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario[y].idCheck = true;
                                              $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario[y].Accion = "U";
                                          } else {
                                              $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario[y].Accion = "";
                                          }
                                      }
                                  }
                                  $rootScope.DatosFormulario.RegistroAC.ListaTerminalPortuarioEdit = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursalTerminal;
                              }
                              //Datos generales
                              $rootScope.DatosFormulario.RegistroAC.CodigoLinea = data.DetalleAcuerdoComercialLocalList[0].CodigoLinea;
                              $rootScope.DatosFormulario.DatosAC.CodigoUsuarioAutorizador = data.DetalleAcuerdoComercialLocalList[0].CodigoUsuarioAutorizador;
                              $rootScope.DatosFormulario.DatosAC.Autorizado = data.DetalleAcuerdoComercialLocalList[0].Autorizado;
                              $rootScope.DatosFormulario.RegistroAC.FechaAutorizacion = data.DetalleAcuerdoComercialLocalList[0].FechaAutorizacion;
                              $rootScope.DatosFormulario.RegistroAC.CodigoTipoCriterio = data.DetalleAcuerdoComercialLocalList[0].CodigoTipoCriterio;

                              if ($rootScope.DatosFormulario.RegistroAC.CodigoTipoCriterio == "001") {
                                  $("#seccion-5").hide();
                                  $("#seccion-6").hide();
                                  // $("#seccion-7").hide();
                                  $("#seccion-8").hide();
                                  // $("#seccion-9").hide();
                                  // $("#seccion-10").hide();
                                  // $("#seccion-11").hide();
                                  $("#seccion-12").hide();
                                  $("#seccion-13").hide();

                                  $("#seccion-14").hide();
                                  $("#seccion-15").hide();

                              } else {
                                  $("#seccion-5").show();
                                  $("#seccion-6").show();
                                  //$("#seccion-7").show();
                                  $("#seccion-8").show();
                                  //$("#seccion-9").show();
                                  //$("#seccion-10").show();
                                  //$("#seccion-11").show();
                                  $("#seccion-12").show();
                                  $("#seccion-13").show();

                                  $("#seccion-14").show();
                                  $("#seccion-15").show();
                              }

                              $rootScope.DatosFormulario.RegistroAC.InicioVigencia = data.DetalleAcuerdoComercialLocalList[0].InicioVigencia;
                              $rootScope.DatosFormulario.RegistroAC.FinVigencia = data.DetalleAcuerdoComercialLocalList[0].FinVigencia;
                              $rootScope.DatosFormulario.RegistroAC.Accion = data.DetalleAcuerdoComercialLocalList[0].Accion;
                              $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal = data.DetalleAcuerdoComercialLocalList[0].CodigoAcuerdoComercialLocal;
                              $rootScope.DatosFormulario.DatosAC.CodigoTipoCondicion = data.DetalleAcuerdoComercialLocalList[0].CodigoTipoCondicion;
                              if (!data.DetalleAcuerdoComercialLocalList[0].EstadoRegistro) {
                                  $scope.FlagMostrarBotonModificar = false;
                                  $scope.FlagMostrarBotonDeshabilitar = false;
                              }
                              //Inicio: Copy original
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.CodigoAcuerdoComercialLocal = data.DetalleAcuerdoComercialLocalList[0].CodigoAcuerdoComercialLocal;
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.CodigoLinea = data.DetalleAcuerdoComercialLocalList[0].CodigoLinea;
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.CodigoUsuarioAutorizador = data.DetalleAcuerdoComercialLocalList[0].CodigoUsuarioAutorizador;
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.FechaAutorizacion = data.DetalleAcuerdoComercialLocalList[0].FechaAutorizacion;
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.CodigoTipoCriterio = data.DetalleAcuerdoComercialLocalList[0].CodigoTipoCriterio;
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.InicioVigencia = data.DetalleAcuerdoComercialLocalList[0].InicioVigencia;
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.FinVigencia = data.DetalleAcuerdoComercialLocalList[0].FinVigencia;
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.CodigoTipoCondicion = data.DetalleAcuerdoComercialLocalList[0].CodigoTipoCondicion;
                              var codigoTipoCarga = "";
                              if (data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTipoCarga.length > 1) {
                                  codigoTipoCarga = "MH";
                              }
                              else if (data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTipoCarga.length == 1) {
                                  codigoTipoCarga = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTipoCarga[0].TipoBL;
                              }
                              $rootScope.DatosFormulario.RegistroAC.OriginalDataView.CodigoTipoCarga = codigoTipoCarga;
                              //Fin: Copy original
                              $rootScope.DatosFormulario.RegistroAC.CodigoTipoCarga = codigoTipoCarga;
                              //Listas
                              $rootScope.DatosFormulario.RegistroAC.ListaRate = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalRA;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaRAMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalRA;
                              $rootScope.DatosFormulario.RegistroAC.ListaPuertos = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalPuerto;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalPuerto;
                              $rootScope.DatosFormulario.RegistroAC.ListaClientesMaster = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalClienteBLMaster;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalClienteBLMaster;
                              $rootScope.DatosFormulario.RegistroAC.ListaAgenteBLMaster = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalAgenteBLMaster;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalAgenteBLMaster;
                              $rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalClienteBLHouse;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalClienteBLHouse;
                              $rootScope.DatosFormulario.RegistroAC.ListaAgenteBLHome = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalAgenteBLHouse;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalAgenteBLHouse;
                              $rootScope.DatosFormulario.RegistroAC.ListaServicioNave = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalServicioNave;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalServicioNave;
                              $rootScope.DatosFormulario.RegistroAC.ListaServiciosBL = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalServicioBL;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalServicioBL;
                              $rootScope.DatosFormulario.RegistroAC.ListaTipoContenedor = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTipoContenedor;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTipoContenedor;
                              $rootScope.DatosFormulario.RegistroAC.ListaDatosCarga = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalCarga;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalCarga;
                              $rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTarifa;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTarifa;
                              $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTarifaLigada;
                              $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTarifaLigada;

                              $rootScope.DatosFormulario.RegistroAC.ListaMatchCode = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalMatchCode;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaMatchCodeMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalMatchCode;
                              $rootScope.DatosFormulario.RegistroAC.ListaPartidaArancelaria = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalPartidaArancelaria;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaPartidaArancelariaMemoriaList = data.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalPartidaArancelaria;

                              //Grillas ListaSucursal

                              //$scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.DatosAC.ListaSucursales);
                              $scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.DatosAC.ListaSucursal);
                              $scope.gridapiListaTerminalPortuario.refresh($rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario);
                              $scope.gridapiListaRate.refresh($rootScope.DatosFormulario.RegistroAC.ListaRate);
                              $scope.gridapiListaPuertos.refresh($rootScope.DatosFormulario.RegistroAC.ListaPuertos);
                              $scope.gridapiListaClienteBLMaster.refresh($rootScope.DatosFormulario.RegistroAC.ListaClientesMaster);
                              $scope.gridapiListaAgenteBLMaster.refresh($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLMaster);
                              $scope.gridapiListaClienteBLHome.refresh($rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome);
                              $scope.gridapiListaAgenteBLHome.refresh($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLHome);
                              $scope.gridapiListaServicioNave.refresh($rootScope.DatosFormulario.RegistroAC.ListaServicioNave);
                              $scope.gridapiListaServiciosBL.refresh($rootScope.DatosFormulario.RegistroAC.ListaServiciosBL);
                              $scope.gridapiListaTipoContenedor.refresh($rootScope.DatosFormulario.RegistroAC.ListaTipoContenedor);
                              $scope.gridapiListaDatosCarga.refresh($rootScope.DatosFormulario.RegistroAC.ListaDatosCarga);
                              $scope.gridapiListaConfiguracionTarifas.refresh($rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas);

                              $scope.gridapigrillaACListaMatchCode.refresh($rootScope.DatosFormulario.RegistroAC.ListaMatchCode);
                              $scope.gridapigrillaACListaPartidaArancelaria.refresh($rootScope.DatosFormulario.RegistroAC.ListaPartidaArancelaria);

                              $rootScope.$apply();
                              $("#grillaListaRate input").each(function (index, item) {
                                  if ($(item).val().length > 0) {
                                      $(item).attr("disabled", true);
                                  } else {
                                      $(item).attr("disabled", false);
                                  }
                              });
                          }
                      }
                  }
              });
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

          $scope.CheckItem_Sucursal = function (row) {
              row.idCheck;
              if (row.idCheck) {
                  $rootScope.DatosFormulario.CodigoSucursalActual = row.Codigo;
                  $scope.AgregarTerminalPortuarioTarifaLocal(row.Codigo);
              }
              else {
                  $scope.QuitarTerminalPortuarioTarifaLocal(row.Codigo);
              }
          }

          $scope.CheckItem_TerminalPortuario = function (row) {
              row.idCheck;
          }

          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 50);
              if (idgrilla == "grillaListaSucursales") {
                  $.each($rootScope.DatosFormulario.DatosAC.ListaSucursal, function (x) { this.idCheck = check; });
                  if (check) {
                      $scope.AgregarTerminalPortuarioTarifaLocalTodos();
                  }
                  else {
                      $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario = [];
                      $scope.gridapiListaTerminalPortuario.clear();
                  }
              }
              if (idgrilla == "grillaListaTerminalPortuario") {
                  $.each($rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario, function (x) { this.idCheck = check; });
              }
          }

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaRate":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarRate('" + rowObject.IdRate + "','" + rowObject.NroRA + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaPuertos":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaPuertos('" + rowObject.IdAcuerdoPuerto + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaClienteBLMaster":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaClientesBLMaster('" + rowObject.IdClienteBLMaster + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaConfiguracionTarifas":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarConfiguracionTarifas('" + rowObject.IdConfiguracionTarifa + "');";
                                  break;
                              case "Editar":
                                  eventoclick = "$parent.EditarConfiguracionTarifas('" + rowObject.IdConfiguracionTarifa + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaAgenteBLMaster":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaAgenteBLMaster('" + rowObject.IdAgenteBLMaster + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaClienteBLHome":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaClienteBLHome('" + rowObject.IdClienteBLHome + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaAgenteBLHome":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaAgenteBLHome('" + rowObject.IdAgenteBLHome + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaServicioNave":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaServiciosNave('" + rowObject.IdServicioNave + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaServiciosBL":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaServiciosBL('" + rowObject.IdServicioBL + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaDatosCarga":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarCarga('" + rowObject.IdCarga + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaListaTipoContenedor":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarTipoContenedor('" + rowObject.IdTipoContenedor + "');";
                                  break;
                          }
                      }
                      break;

                  case "grillaACListaMatchCode":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.ConfigurarMatchCode('" + rowObject.IdMatchCode + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.QuitarMatchCode('" + rowObject.IdMatchCode + "');";
                                  break;
                          }
                      }
                      break;

                  case "grillaACListaPartidaArancelaria":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.ConfigurarPartidaArancelaria(('" + rowObject.IdPA + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.QuitarPartidaArancelaria('" + rowObject.IdPA + "');";
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

          $scope.AgregarTerminalPortuarioTarifaLocalTodos = function () {

              var codLinea = $rootScope.DatosFormulario.RegistroAC.CodigoLinea;
              var codSucursal = "";
              var lstTerminal = ObtenerTerminalesByLinea(codLinea, codSucursal);

              var LstTemp = $.extend(true, [], $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario);

              $.each(lstTerminal, function (x) {

                  var CodigoAlmacen = this.CodigoAlmacen;
                  var existe = $.grep(LstTemp, function (e) { return e.CodigoAlmacen == CodigoAlmacen; });
                  if (existe.length == 0) {
                      $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario.push(this);
                      $scope.gridapiListaTerminalPortuario.insertRange(this);
                  }


              });
          }
          $scope.AgregarTerminalPortuarioTarifaLocal = function (codigoSucursal) {

              var codLinea = $rootScope.DatosFormulario.RegistroAC.CodigoLinea;
              var codSucursal = codigoSucursal;
              var lstTerminal = ObtenerTerminalesByLinea(codLinea, codSucursal);
              $.each(lstTerminal, function (x) {
                  $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario.push(this);
                  $scope.gridapiListaTerminalPortuario.insertRange(this);
              });
          }

          /*
          $scope.AgregarTerminalPortuarioTarifaLocal = function (codigoSucursal) {
              $.ajax({
                  url: "/Maestros/ListarTerminalPortuarioBySucursal",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoSucursal=" + codigoSucursal,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $.each(data.TerminalPorturario, function (x) {
                          $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario.push(this);
                          $scope.gridapiListaTerminalPortuario.insertRange(this);
                      });
                  }
              });
          }
          */
          $scope.QuitarTerminalPortuarioTarifaLocal = function (codigoSucursal) {
              var terminalLista = $.grep($rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario, function (e) { return e.CodigoSucursal != codigoSucursal; });
              $rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario = terminalLista;
              $scope.gridapiListaTerminalPortuario.clear();
              $scope.gridapiListaTerminalPortuario.insertRange(terminalLista);
          }

          $scope.Grid_DataBind = function (grid, data) {
              if (grid == "DetalleSucursal") {
                  $scope.gridapiListaSucursales.insertRange(data);
              }
              if (grid == "DetalleTerminalPortuario") {
                  $scope.gridapiListaTerminalPortuario.refresh(data);
              }
          }

          $scope.BuscarAutorizado_Click = function () {
              $rootScope.DatosFormulario.OpcionUsuario = "AcuerdoComercial";
              getPopupResponsive({
                  formURL: "/SeguridadAgma/BuscarUsuario",
                  title: "Buscar Usuario",
                  nombreDiv: "divPopupBuscarUsuario",
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
                      $compile($("#divPopupBuscarUsuario"))($scope);
                  }
              });
          }

          $rootScope.QuitarRate = function (idRate) {
              MiConfirm("¿Está seguro de eliminar el RA?.", function () {
                  var listaGrillaMemoriaRA = $rootScope.DatosFormulario.RegistroAC.ListaRate;
                  var listaBaseMemoriaRA = $rootScope.DatosFormulario.RegistroAC.grillaListaRAMemoriaList;
                  var listaGrillaRA = [];
                  var listaBaseRA = [];
                  for (var x = 0; x < listaGrillaMemoriaRA.length; x++) {
                      if (listaGrillaMemoriaRA[x].IdRate != idRate) {
                          listaGrillaRA.push(listaGrillaMemoriaRA[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaRA.length; x++) {
                      if (listaBaseMemoriaRA[x].IdRate == idRate) {
                          if (listaBaseMemoriaRA[x].IdRate > 0) {
                              listaBaseMemoriaRA[x].Accion = "D";
                              listaBaseRA.push(listaBaseMemoriaRA[x]);
                          }
                      } else {
                          listaBaseRA.push(listaBaseMemoriaRA[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaRate = listaGrillaRA;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaRAMemoriaList = listaBaseRA;
                  $scope.gridapiListaRate.refresh(listaGrillaRA);
                  $rootScope.$apply();
                  if ($rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal > 0) {
                      $rootScope.HabilitarCampoRate();
                  }
              });
          }

          $rootScope.QuitarListaPuertos = function (idPuerto) {
              MiConfirm("¿Está seguro de eliminar el Puerto?.", function () {
                  var listaGrillaMemoriaPuerto = $rootScope.DatosFormulario.RegistroAC.ListaPuertos;
                  var listaBaseMemoriaPuerto = $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList;
                  var listaGrillaPuerto = [];
                  var listaBasePuerto = [];
                  for (var x = 0; x < listaGrillaMemoriaPuerto.length; x++) {
                      if (listaGrillaMemoriaPuerto[x].IdAcuerdoPuerto != idPuerto) {
                          listaGrillaPuerto.push(listaGrillaMemoriaPuerto[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaPuerto.length; x++) {
                      if (listaBaseMemoriaPuerto[x].IdAcuerdoPuerto == idPuerto) {
                          if (listaBaseMemoriaPuerto[x].IdAcuerdoPuerto > 0) {
                              listaBaseMemoriaPuerto[x].Accion = "D";
                              listaBasePuerto.push(listaBaseMemoriaPuerto[x]);
                          }
                      } else {
                          listaBasePuerto.push(listaBaseMemoriaPuerto[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaPuertos = listaGrillaPuerto;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList = listaBasePuerto;
                  $scope.gridapiListaPuertos.refresh(listaGrillaPuerto);
                  $rootScope.$apply();
              });
          }

          $rootScope.QuitarListaClientesBLMaster = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.ListaClientesMaster;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList;
                  var listaGrillaCliente = [];
                  var listaBaseCliente = [];
                  for (var x = 0; x < listaGrillaMemoriaCliente.length; x++) {
                      if (listaGrillaMemoriaCliente[x].IdClienteBLMaster != idCliente) {
                          listaGrillaCliente.push(listaGrillaMemoriaCliente[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaCliente.length; x++) {
                      if (listaBaseMemoriaCliente[x].IdClienteBLMaster == idCliente) {
                          if (listaBaseMemoriaCliente[x].IdClienteBLMaster > 0) {
                              listaBaseMemoriaCliente[x].Accion = "D";
                              listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                          }
                      } else {
                          listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaClientesMaster = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList = listaBaseCliente;
                  $scope.gridapiListaClienteBLMaster.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }

          $scope.AgregarRate = function () {
              var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaRate, "IdRate");
              $scope.gridapiListaRate.insertRange([
                      {
                          IdRate: nuevoId,
                          CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                          CodigoRA: "",
                          Accion: "I"
                      }]);

              if ($rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal > 0) {
                  $rootScope.$apply();
                  $rootScope.HabilitarCampoRate();
              }
          }

          $rootScope.HabilitarCampoRate = function () {
              var lstcontrolsInput = $("#grillaListaRate").find('input[type="text"]');
              $.each(lstcontrolsInput, function (x, y) {
                  if ($(lstcontrolsInput[x]).val().length <= 0) {
                      $("#grillaListaRate").find(lstcontrolsInput[x]).removeAttr('disabled');
                  }
                  else {
                      $("#grillaListaRate").find(lstcontrolsInput[x]).attr('disabled', 'disabled');
                  }
              });


              /*
                $("#grillaListaRate input").each(function (index, item) {
                    if ($(item).val().length > 0) {
                        $(item).attr("disabled", true);
                    }
                    else {
                        $(item).attr("disabled", false);
                    }
                });*/


          }

          AbrirPopup_ConfiguracionTarifa = function (tipo, rowObject) {
              getPopupResponsive({
                  formURL: "/AcuerdoComercialLocal/RegistrarConfiguracionTarifa",
                  title: "Configuración de Tarifa",
                  nombreDiv: "divConfiguracionTarifaAC",
                  nombreGrid: "",
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $(obj).attr("ModoPagina", tipo);
                      $compile($("#divConfiguracionTarifaAC"))($scope);
                      var scopePopup = angular.element("#divConfiguracionTarifaAC").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(rowObject));
                      scopePopup.rowOk = rowObject;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.EditarConfiguracionTarifas = function (idConfiguracionTarifa) {
              var objReg = $from($rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas).where("$IdConfiguracionTarifa=='" + idConfiguracionTarifa + "'").firstOrDefault();
              AbrirPopup_ConfiguracionTarifa("Editar", objReg);
          }

          $scope.AgregarPuerto = function () {
              $rootScope.FlagCallPuertos = "registroACLocal";
              var altura = 800;
              getPopupResponsive({
                  formURL: "/Puerto/BuscarPuertos",
                  title: "Buscar Puertos",
                  nombreDiv: "divPopupBuscarPuerto",
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
                      $compile($("#divPopupBuscarPuerto"))($scope);
                  }
              });
          }

          $scope.AgregarCliente = function () {
              $rootScope.FlagCallClientes = "registroACLocal";
              $rootScope.FlagTipoCliente = "Master";
              getPopupResponsive({
                  formURL: "/Cliente/BuscarCliente",
                  title: "Buscar Interlocutores",
                  nombreDiv: "divPopupBuscarCliente",
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
                      $compile($("#divPopupBuscarCliente"))($scope);
                  }
              });
          }

          $scope.BuscarTarifaLigada_Click = function () {
              $rootScope.DatosFormulario.OpcionTarifaGenerales = "AcuerdoComercial";
              getPopupResponsive({
                  formURL: "/TarifaGenerales/BuscarTarifaGenerales",
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

          $scope.BuscarTarifa_Click = function () {
              getPopupResponsive({
                  formURL: "es-PE/sistema/busqueda/buscar-tarifa/",
                  title: "Buscar Tarifa",
                  nombreDiv: "divPopupBuscarTarifa",
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
                      $compile($("#divPopupBuscarTarifa"))($scope);
                  }
              });
          }

          $scope.Historial_Click = function () {
              getPopupResponsive({
                  formURL: "/AcuerdoComercialLocal/HistorialAcuerdoComercialLocal",
                  title: "Historial",
                  nombreDiv: "divPopupHistorialACLocal",
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
                      $compile($("#divPopupHistorialACLocal"))($scope);
                  }
              });
          }
          function MiAlertOk_success() {
              if ($rootScope.DatosFormulario.DatosAC.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.DatosAC.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/busqueda/buscar-aclocal/";
              }
          }

          $scope.Salir_Click = function () {
              if ($rootScope.DatosFormulario.DatosAC.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.DatosAC.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/busqueda/buscar-aclocal/";
              }
              $rootScope.DatosFormulario.DatosAC.FlagACLocal = true;
          }
          function actualizarMemoriaTarifa(objeItem) {
              for (var i = 0; i < $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList.length; i++) {
                  if ($rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList[i].CodigoTarifaLocal == objeItem.CodigoTarifaLocal) {
                      if ($rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList[i].Accion != "D") {
                          $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList[i].ValorDescuento = objeItem.ValorDescuento;
                          $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList[i].CodigoMonedaAcuerdo = objeItem.CodigoMonedaAcuerdo;
                          $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList[i].Moneda = objeItem.Moneda;
                          $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList[i].CodigoTipoDescuento = objeItem.CodigoTipoDescuento;
                          $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList[i].Accion = objeItem.Accion;
                      }
                  }
              }
          }
          $scope.CambiarValorDescuento_Change = function (objItem) {
              if (objItem.ValorDescuento != "") {
                  if (objItem.CodigoTipoDescuento == "P") {
                      if (objItem.ValorDescuento) {
                          objItem.MontoAcuerdo = parseFloat(objItem.ValorDescuento).toFixed(2);//parseFloat(parseFloat(objItem.MontoBase) - parseFloat(objItem.ValorDescuento)).toFixed(2);
                      } else {
                          objItem.MontoAcuerdo = "";
                      }


                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }
                  if (objItem.CodigoTipoDescuento == "D") {
                      if (objItem.ValorDescuento) {
                          objItem.MontoAcuerdo = parseFloat(parseFloat(objItem.MontoBase) - ((parseFloat(objItem.ValorDescuento) / 100) * parseFloat(objItem.MontoBase))).toFixed(2);
                      } else {
                          objItem.MontoAcuerdo = "";
                      }

                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }
                  if (objItem.CodigoTipoDescuento == "E") {
                      if (objItem.ValorDescuento) {
                          objItem.MontoAcuerdo = 0;// parseFloat(objItem.ValorDescuento).toFixed(2);//parseFloat(parseFloat(objItem.MontoBase) - parseFloat(objItem.ValorDescuento)).toFixed(2);
                      } else {
                          objItem.MontoAcuerdo = "";
                      }


                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }
                  if (objItem.CodigoTipoDescuento == "B") {
                      if (objItem.ValorDescuento) {
                          objItem.MontoAcuerdo = parseFloat(objItem.ValorDescuento).toFixed(2);//parseFloat(parseFloat(objItem.MontoBase) - parseFloat(objItem.ValorDescuento)).toFixed(2);
                      } else {
                          objItem.MontoAcuerdo = "";
                      }


                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }

                  actualizarMemoriaTarifa(objItem);
              }
          }

          $scope.CambiarTipoDescuento_Change = function (objItem) {
              if (objItem.CodigoTipoDescuento == "P") {
                  if (objItem.ValorDescuento != "") {
                      //objItem.MontoAcuerdo = parseFloat(parseFloat(objItem.MontoBase) - parseFloat(objItem.ValorDescuento)).toFixed(2);
                      objItem.MontoAcuerdo = parseFloat(objItem.ValorDescuento).toFixed(2);
                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }
                  $rootScope.HabilitarCamposTarifas(false, objItem.IdConfiguracionTarifa);
              } else if (objItem.CodigoTipoDescuento == "D") {
                  if (objItem.ValorDescuento != "") {
                      //objItem.MontoAcuerdo = parseFloat(parseFloat(objItem.MontoBase) - ((parseFloat(objItem.ValorDescuento) / 100) * parseFloat(objItem.MontoBase))).toFixed(2);
                      objItem.MontoAcuerdo = parseFloat(parseFloat(objItem.MontoBase) * (100 - parseFloat(objItem.ValorDescuento)) / 100).toFixed(2);
                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }
                  $rootScope.HabilitarCamposTarifas(false, objItem.IdConfiguracionTarifa);
              } else if (objItem.CodigoTipoDescuento == "E") {
                  objItem.MontoAcuerdo = 0;
                  objItem.ValorDescuento = 0;
                  if (objItem.IdConfiguracionTarifa > 0) {
                      objItem.Accion = "U";
                  } else {
                      objItem.Accion = "I";
                  }
                  $rootScope.HabilitarCamposTarifas(true, objItem.IdConfiguracionTarifa);
              } else if (objItem.CodigoTipoDescuento == "B") {
                  if (objItem.ValorDescuento != "") {
                      //objItem.MontoAcuerdo = parseFloat(parseFloat(objItem.MontoBase) - parseFloat(objItem.ValorDescuento)).toFixed(2);
                      objItem.MontoAcuerdo = parseFloat(objItem.ValorDescuento).toFixed(2);
                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }
                  $rootScope.HabilitarCamposTarifas(false, objItem.IdConfiguracionTarifa);
              }
              else {
                  if (objItem.ValorDescuento != "") {
                      objItem.MontoAcuerdo = 0;
                      objItem.ValorDescuento = 0;
                      if (objItem.IdConfiguracionTarifa > 0) {
                          objItem.Accion = "U";
                      } else {
                          objItem.Accion = "I";
                      }
                  }
              }
              actualizarMemoriaTarifa(objItem);
          }

          $rootScope.HabilitarCamposTarifas = function (flagHabilitar, id) {
              var lstcontrolsInput = $("#grillaListaConfiguracionTarifas").find('input[type="text"]');
              $.each(lstcontrolsInput, function (x, y) {

                  var objTemp = $(this).attr("ng-model").replace("root", "rootScope")
                  var indexFin = objTemp.lastIndexOf(".");
                  var objElementoGeneral = eval(objTemp.slice(0, indexFin));

                  if (objElementoGeneral.IdConfiguracionTarifa == id) {
                      if (flagHabilitar) {
                          $("#grillaListaConfiguracionTarifas").find(lstcontrolsInput[x]).attr('disabled', 'disabled');
                      } else {
                          $("#grillaListaConfiguracionTarifas").find(lstcontrolsInput[x]).removeAttr('disabled');
                      }
                  }
              });

          }
          $scope.CambiarMonedaAcuerdo_Change = function (objItem) {
              if (objItem.IdConfiguracionTarifa > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaTarifa(objItem);
          }

          function actualizarMemoriaPuerto(objeItem) {
              for (var i = 0; i < $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList.length; i++) {
                  if ($rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList[i].CodigoPuerto == objeItem.CodigoPuerto) {
                      if (objeItem.IdAcuerdoPuerto == $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList[i].IdAcuerdoPuerto) {
                          if ($rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList[i].Accion != "D") {
                              $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList[i].CodigoTipoPuerto = objeItem.CodigoTipoPuerto;
                              $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList[i].Accion = objeItem.Accion;
                          }
                      }
                  }
              }
          }

          $scope.TipoPuerto_Change = function (objItem) {

              if (objItem.IdAcuerdoPuerto > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaPuerto(objItem);

          }

          $scope.AgregarAgenteBLMaster = function () {
              $rootScope.FlagCallClientes = "registroACLocalAgenteBLMaster";
              getPopupResponsive({
                  formURL: "/Cliente/BuscarCliente",
                  title: "Buscar Cliente",
                  nombreDiv: "divPopupBuscarCliente",
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
                      $compile($("#divPopupBuscarCliente"))($scope);
                  }
              });
          }

          $rootScope.QuitarListaAgenteBLMaster = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.ListaAgenteBLMaster;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList;
                  var listaGrillaCliente = [];
                  var listaBaseCliente = [];
                  for (var x = 0; x < listaGrillaMemoriaCliente.length; x++) {
                      if (listaGrillaMemoriaCliente[x].IdAgenteBLMaster != idCliente) {
                          listaGrillaCliente.push(listaGrillaMemoriaCliente[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaCliente.length; x++) {
                      if (listaBaseMemoriaCliente[x].IdAgenteBLMaster == idCliente) {
                          if (listaBaseMemoriaCliente[x].IdAgenteBLMaster > 0) {
                              listaBaseMemoriaCliente[x].Accion = "D";
                              listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                          }
                      } else {
                          listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaAgenteBLMaster = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList = listaBaseCliente;
                  $scope.gridapiListaAgenteBLMaster.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }

          $rootScope.QuitarListaClienteBLHome = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList;
                  var listaGrillaCliente = [];
                  var listaBaseCliente = [];
                  for (var x = 0; x < listaGrillaMemoriaCliente.length; x++) {
                      if (listaGrillaMemoriaCliente[x].IdClienteBLHome != idCliente) {
                          listaGrillaCliente.push(listaGrillaMemoriaCliente[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaCliente.length; x++) {
                      if (listaBaseMemoriaCliente[x].IdClienteBLHome == idCliente) {
                          if (listaBaseMemoriaCliente[x].IdClienteBLHome > 0) {
                              listaBaseMemoriaCliente[x].Accion = "D";
                              listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                          }
                      } else {
                          listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList = listaBaseCliente;
                  $scope.gridapiListaClienteBLHome.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }

          $rootScope.QuitarListaAgenteBLHome = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.ListaAgenteBLHome;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList;
                  var listaGrillaCliente = [];
                  var listaBaseCliente = [];
                  for (var x = 0; x < listaGrillaMemoriaCliente.length; x++) {
                      if (listaGrillaMemoriaCliente[x].IdAgenteBLHome != idCliente) {
                          listaGrillaCliente.push(listaGrillaMemoriaCliente[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaCliente.length; x++) {
                      if (listaBaseMemoriaCliente[x].IdAgenteBLHome == idCliente) {
                          if (listaBaseMemoriaCliente[x].IdAgenteBLHome > 0) {
                              listaBaseMemoriaCliente[x].Accion = "D";
                              listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                          }
                      } else {
                          listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaAgenteBLHome = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList = listaBaseCliente;
                  $scope.gridapiListaAgenteBLHome.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }

          $rootScope.QuitarListaServiciosNave = function (idServicio) {
              MiConfirm("¿Está seguro de eliminar el Servicio?.", function () {
                  var listaGrillaMemoriaServicioNave = $rootScope.DatosFormulario.RegistroAC.ListaServicioNave;
                  var listaBaseMemoriaServicioNave = $rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList;
                  var listaGrillaServicio = [];
                  var listaBaseServicio = [];
                  for (var x = 0; x < listaGrillaMemoriaServicioNave.length; x++) {
                      if (listaGrillaMemoriaServicioNave[x].IdServicioNave != idServicio) {
                          listaGrillaServicio.push(listaGrillaMemoriaServicioNave[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaServicioNave.length; x++) {
                      if (listaBaseMemoriaServicioNave[x].IdServicioNave == idServicio) {
                          if (listaBaseMemoriaServicioNave[x].IdServicioNave > 0) {
                              listaBaseMemoriaServicioNave[x].Accion = "D";
                              listaBaseServicio.push(listaBaseMemoriaServicioNave[x]);
                          }
                      } else {
                          listaBaseServicio.push(listaBaseMemoriaServicioNave[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaServicioNave = listaGrillaServicio;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList = listaBaseServicio;
                  $scope.gridapiListaServicioNave.refresh(listaGrillaServicio);
                  $rootScope.$apply();
              });
          }

          $rootScope.QuitarListaServiciosBL = function (idServicio) {
              MiConfirm("¿Está seguro de eliminar el Servicio?.", function () {
                  var listaGrillaMemoriaServicioBl = $rootScope.DatosFormulario.RegistroAC.ListaServiciosBL;
                  var listaBaseMemoriaServicioBl = $rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList;
                  var listaGrillaServicio = [];
                  var listaBaseServicio = [];
                  for (var x = 0; x < listaGrillaMemoriaServicioBl.length; x++) {
                      if (listaGrillaMemoriaServicioBl[x].IdServicioBL != idServicio) {
                          listaGrillaServicio.push(listaGrillaMemoriaServicioBl[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaServicioBl.length; x++) {
                      if (listaBaseMemoriaServicioBl[x].IdServicioBL == idServicio) {
                          if (listaBaseMemoriaServicioBl[x].IdServicioBL > 0) {
                              listaBaseMemoriaServicioBl[x].Accion = "D";
                              listaBaseServicio.push(listaBaseMemoriaServicioBl[x]);
                          }
                      } else {
                          listaBaseServicio.push(listaBaseMemoriaServicioBl[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaServiciosBL = listaGrillaServicio;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList = listaBaseServicio;
                  $scope.gridapiListaServiciosBL.refresh(listaGrillaServicio);
                  $rootScope.$apply();
              });
          }
          $scope.AgregarClienteBLHome = function () {
              $rootScope.FlagCallClientes = "registroACLocalClienteBLHome";
              $rootScope.FlagTipoCliente = "House";
              getPopupResponsive({
                  formURL: "/Cliente/BuscarCliente",
                  title: "Buscar Cliente",
                  nombreDiv: "divPopupBuscarCliente",
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
                      $compile($("#divPopupBuscarCliente"))($scope);
                  }
              });
          }
          $scope.AgregarAgenteBLHome = function () {
              $rootScope.FlagCallClientes = "registroACLocalAgenteBLHome";
              getPopupResponsive({
                  formURL: "/Cliente/BuscarCliente",
                  title: "Buscar Cliente",
                  nombreDiv: "divPopupBuscarCliente",
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
                      $compile($("#divPopupBuscarCliente"))($scope);
                  }
              });
          }
          $scope.AgregarServicioNave = function () {
              $rootScope.FlagCallServiciosBL = "serviciosALaNave";
              getPopupResponsive({
                  formURL: "/ServicioBl/BuscarServicioBL",
                  title: "Búsqueda de Servicios BL",
                  nombreDiv: "divPopupBuscarServiciosBL",
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
                      $compile($("#divPopupBuscarServiciosBL"))($scope);
                  }
              });
          }
          $scope.AgregarServiciosBL = function () {
              $rootScope.FlagCallServiciosBL = "serviciosAlBL";
              getPopupResponsive({
                  formURL: "/ServicioBl/BuscarServicioBL",
                  title: "Búsqueda de Servicios BL",
                  nombreDiv: "divPopupBuscarServiciosBL",
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
                      $compile($("#divPopupBuscarServiciosBL"))($scope);
                  }
              });
          }
          $scope.AgregarTipoContenedor = function () {
              if ($rootScope.DatosFormulario.RegistroAC.CodigoLinea != undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("");
                  $(".caja11.msgerror.ListaTipoContenedorAc").html("");
                  getPopupResponsive({
                      formURL: "/TipoContenedor/BuscarTipoContenedorVista",
                      title: "Búsqueda de Tipo de Contenedor",
                      nombreDiv: "divPopupBuscarTipoContenedor",
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
                          $compile($("#divPopupBuscarTipoContenedor"))($scope);
                      }
                  });
              } else {
                  $(".caja11.msgerror.ListaTipoContenedorAc").html("Línea es requerido.");
                  if ($rootScope.DatosFormulario.RegistroAC.CodigoLinea == undefined) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  }
                  else if ($rootScope.DatosFormulario.RegistroAC.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
          }
          $scope.AgregarDatosCarga = function () {
              $rootScope.FlagCallDocumentosOrigen = "registroACLocal";
              getPopupResponsive({
                  formURL: "/DocumentoOrigen/BuscarDocumentoOrigen",
                  title: "Búsqueda de Documento Origen",
                  nombreDiv: "divPopupBuscarDocumentoOrigen",
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
                      $compile($("#divPopupBuscarDocumentoOrigen"))($scope);
                  }
              });
          }

          $scope.AgregarMatchcode_Click = function () {
              $rootScope.CodigoAcuerdoComercial = $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal;
              $rootScope.FlagCallClientes = "registroAcLocalClienteMatchcode";
              getPopupResponsive({
                  formURL: "/Cliente/BuscarClienteMatchCode",
                  title: "Buscar Interlocutores",
                  nombreDiv: "divPopupBuscarClienteMatchCode",
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
                      $compile($("#divPopupBuscarClienteMatchCode"))($scope);
                  }
              });
          }

          $scope.AgregarPartidaArancelaria = function () {
              $rootScope.CodigoAcuerdoComercial = $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal;
              $rootScope.FlagCallPartidaArancelaria = "registroAcLocalPartidaArancelaria";
              getPopupResponsive({
                  formURL: "/PartidaArancelaria/BuscarPartidaArancelaria",
                  title: "Buscar Partida Arancelaria",
                  nombreDiv: "divPopupBuscarPartidaArancelaria",
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
                      $compile($("#divPopupBuscarPartidaArancelaria"))($scope);
                  }
              });
          }


          $rootScope.QuitarMatchCode = function (idMatchCode) {
              MiConfirm("¿Está seguro de eliminar el MatchCode?.", function () {
                  var listaGrillaMemoriaMatchCode = $rootScope.DatosFormulario.RegistroAC.ListaMatchCode;
                  var listaBaseMemoriaMatchCode = $rootScope.DatosFormulario.RegistroAC.grillaListaMatchCodeMemoriaList;
                  var listaGrillaMatchCode = [];
                  var listaBaseMatchCode = [];
                  for (var x = 0; x < listaGrillaMemoriaMatchCode.length; x++) {
                      if (listaGrillaMemoriaMatchCode[x].IdMatchCode != idMatchCode) {
                          listaGrillaMatchCode.push(listaGrillaMemoriaMatchCode[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaMatchCode.length; x++) {
                      if (listaBaseMemoriaMatchCode[x].IdMatchCode == idMatchCode) {
                          if (listaBaseMemoriaMatchCode[x].IdMatchCode > 0) {
                              listaBaseMemoriaMatchCode[x].Accion = "D";
                              listaBaseMatchCode.push(listaBaseMemoriaMatchCode[x]);
                          }
                      } else {
                          listaBaseMatchCode.push(listaBaseMemoriaMatchCode[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaMatchCode = listaGrillaMatchCode;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaMatchCodeMemoriaList = listaBaseMatchCode;
                  $scope.gridapigrillaACListaMatchCode.refresh(listaGrillaMatchCode);
                  $rootScope.$apply();
              });
          }

          $rootScope.QuitarPartidaArancelaria = function (IdPA) {
              MiConfirm("¿Está seguro de eliminar el Partida Arancelaria?.", function () {
                  var listaGrillaMemoriaPartidaArancelaria = $rootScope.DatosFormulario.RegistroAC.ListaPartidaArancelaria;
                  var listaBaseMemoriaPartidaArancelaria = $rootScope.DatosFormulario.RegistroAC.grillaListaPartidaArancelariaMemoriaList;
                  var listaGrillaPartidaArancelaria = [];
                  var listaBasePartidaArancelaria = [];
                  for (var x = 0; x < listaGrillaMemoriaPartidaArancelaria.length; x++) {
                      if (listaGrillaMemoriaPartidaArancelaria[x].IdPA != IdPA) {
                          listaGrillaPartidaArancelaria.push(listaGrillaMemoriaPartidaArancelaria[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaPartidaArancelaria.length; x++) {
                      if (listaBaseMemoriaPartidaArancelaria[x].IdPA == IdPA) {
                          if (listaBaseMemoriaPartidaArancelaria[x].IdPA > 0) {
                              listaBaseMemoriaPartidaArancelaria[x].Accion = "D";
                              listaBasePartidaArancelaria.push(listaBaseMemoriaPartidaArancelaria[x]);
                          }
                      } else {
                          listaBasePartidaArancelaria.push(listaBaseMemoriaPartidaArancelaria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaPartidaArancelaria = listaGrillaPartidaArancelaria;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaPartidaArancelariaMemoriaList = listaBasePartidaArancelaria;
                  $scope.gridapigrillaACListaPartidaArancelaria.refresh(listaGrillaPartidaArancelaria);
                  $rootScope.$apply();

              });
          }


          $rootScope.QuitarCarga = function (idCarga) {
              MiConfirm("¿Está seguro de eliminar los Datos de la Carga?.", function () {
                  var listaGrillaMemoriaCarga = $rootScope.DatosFormulario.RegistroAC.ListaDatosCarga;
                  var listaBaseMemoriaCarga = $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList;
                  var listaGrillaCarga = [];
                  var listaBaseCarga = [];
                  for (var x = 0; x < listaGrillaMemoriaCarga.length; x++) {
                      if (listaGrillaMemoriaCarga[x].IdCarga != idCarga) {
                          listaGrillaCarga.push(listaGrillaMemoriaCarga[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaCarga.length; x++) {
                      if (listaBaseMemoriaCarga[x].IdCarga == idCarga) {
                          if (listaBaseMemoriaCarga[x].IdCarga > 0) {
                              listaBaseMemoriaCarga[x].Accion = "D";
                              listaBaseCarga.push(listaBaseMemoriaCarga[x]);
                          }
                      } else {
                          listaBaseCarga.push(listaBaseMemoriaCarga[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaDatosCarga = listaGrillaCarga;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList = listaBaseCarga;
                  $scope.gridapiListaDatosCarga.refresh(listaGrillaCarga);
                  $rootScope.$apply();
              });
          }

          $scope.Guardar_Click = function () {
              //Sucursal
              var listaSucursalGrabar = [];
              var listaSucursales = $from($rootScope.DatosFormulario.DatosAC.ListaSucursal).where("$idCheck==true").toArray();
              for (var x = 0; x < listaSucursales.length; x++) {
                  var objSucursalTmp = new Object();
                  objSucursalTmp.CodigoAcuerdoComercialLocal = $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal;
                  objSucursalTmp.CodigoSucursal = listaSucursales[x].Codigo;
                  objSucursalTmp.Accion = "I";
                  listaSucursalGrabar.push(objSucursalTmp);
              }
              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagEditar && $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal != 0) {
                  var listaEdit = $rootScope.DatosFormulario.RegistroAC.ListaSucursalEdit;
                  if (listaEdit.length > 0) {
                      for (var a = 0; a < listaEdit.length; a++) {
                          var exist = false;
                          for (var b = 0; b < listaSucursalGrabar.length; b++) {
                              if (listaSucursalGrabar[b].CodigoSucursal == listaEdit[a].CodigoSucursal
                                  && listaSucursalGrabar[b].CodigoAcuerdoComercialLocal == listaEdit[a].CodigoAcuerdoComercialLocal) {
                                  listaSucursalGrabar.splice(b, 1);
                                  exist = true;
                              }
                          }
                          if (!exist) {
                              var objSucursal = new Object();
                              objSucursal.CodigoAcuerdoComercialLocal = listaEdit[a].CodigoAcuerdoComercialLocal;
                              objSucursal.CodigoSucursal = listaEdit[a].CodigoSucursal;
                              objSucursal.Accion = "D";
                              listaSucursalGrabar.push(objSucursal);
                          }
                      }
                  }
              }

              //Terminal
              var listaTerminalGrabar = [];
              var listaTerminal = $from($rootScope.DatosFormulario.DatosAC.ListaTerminalPortuario).where("$idCheck==true").toArray();
              for (var x = 0; x < listaTerminal.length; x++) {
                  var objTerminalTmp = new Object();
                  objTerminalTmp.CodigoAcuerdoComercialLocal = $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal;
                  objTerminalTmp.CodigoSucursal = listaTerminal[x].CodigoSucursal;
                  objTerminalTmp.CodigoTerminalPortuario = listaTerminal[x].CodigoAlmacen;
                  objTerminalTmp.Accion = "I";
                  listaTerminalGrabar.push(objTerminalTmp);
              }
              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagEditar && $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal != 0) {
                  var listaTerminalEdit = $rootScope.DatosFormulario.RegistroAC.ListaTerminalPortuarioEdit;
                  if (listaTerminalEdit) {
                      if (listaTerminalEdit.length > 0) {
                          for (var c = 0; c < listaTerminalEdit.length; c++) {
                              var band = false;
                              for (var d = 0; d < listaTerminalGrabar.length; d++) {
                                  if (listaTerminalGrabar[d].CodigoSucursal == listaTerminalEdit[c].CodigoSucursal
                                      && listaTerminalGrabar[d].CodigoTerminalPortuario == listaTerminalEdit[c].CodigoTerminalPortuario) {
                                      listaTerminalGrabar.splice(d, 1);
                                      band = true;
                                  }
                              }
                              if (!band) {
                                  var obtTerminal = new Object();
                                  obtTerminal.CodigoAcuerdoComercialLocal = listaTerminalEdit[c].CodigoAcuerdoComercialLocal;
                                  obtTerminal.CodigoSucursal = listaTerminalEdit[c].CodigoSucursal;
                                  obtTerminal.CodigoTerminalPortuario = listaTerminalEdit[c].CodigoTerminalPortuario;
                                  obtTerminal.Accion = "D";
                                  listaTerminalGrabar.push(obtTerminal);
                              }
                          }
                      }
                  }
              }
              var listaRate = [];
              var listaPuertos = [];
              var listaClientesMaster = [];
              var listaAgenteBlMaster = [];
              var listaClienteBlHome = [];
              var listaAgenteBlHome = [];
              var listaServicioNave = [];
              var listaServiciosBl = [];
              var listaTipoContenedor = [];
              var listaDatosCarga = [];
              var listaConfiguracionTarifas = [];
              var listaConfiguracionTarifasLigadas = [];


              if ($rootScope.DatosFormulario.RegistroAC.Accion == "I") {
                  listaRate = $.grep($rootScope.DatosFormulario.RegistroAC.ListaRate, function (e) { return e.Accion != undefined; });
                  listaPuertos = $.grep($rootScope.DatosFormulario.RegistroAC.ListaPuertos, function (e) { return e.Accion != undefined; });
                  listaClientesMaster = $.grep($rootScope.DatosFormulario.RegistroAC.ListaClientesMaster, function (e) { return e.Accion != undefined; });
                  listaAgenteBlMaster = $.grep($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLMaster, function (e) { return e.Accion != undefined; });
                  listaClienteBlHome = $.grep($rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome, function (e) { return e.Accion != undefined; });
                  listaAgenteBlHome = $.grep($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLHome, function (e) { return e.Accion != undefined; });
                  listaServicioNave = $.grep($rootScope.DatosFormulario.RegistroAC.ListaServicioNave, function (e) { return e.Accion != undefined; });
                  listaServiciosBl = $.grep($rootScope.DatosFormulario.RegistroAC.ListaServiciosBL, function (e) { return e.Accion != undefined; });
                  listaTipoContenedor = $.grep($rootScope.DatosFormulario.RegistroAC.ListaTipoContenedor, function (e) { return e.Accion != undefined; });
                  listaDatosCarga = $.grep($rootScope.DatosFormulario.RegistroAC.ListaDatosCarga, function (e) { return e.Accion != undefined; });
                  listaConfiguracionTarifas = $.grep($rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas, function (e) { return e.Accion != undefined; });
              } else {
                  var listaRAGrilla = $rootScope.DatosFormulario.RegistroAC.ListaRate;
                  var listaRAGrillaMemoria = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaRAMemoriaList, function (e) { return e.Accion != undefined; });
                  for (var v = 0; v < listaRAGrilla.length; v++) {
                      if ($.inArray(listaRAGrilla[v], listaRAGrillaMemoria) > -1) {
                      } else {
                          listaRAGrillaMemoria.push(listaRAGrilla[v]);
                      }
                  }
                  listaRate = listaRAGrillaMemoria;//$.grep($rootScope.DatosFormulario.RegistroAC.grillaListaRAMemoriaList, function (e) { return e.Accion != undefined; });
                  listaPuertos = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList, function (e) { return e.Accion != undefined; });
                  //Inicio: Cliente BL Master
                  listaClientesMaster = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList, function (e) { return e.Accion != undefined; });
                  //Fin: Cliente BL Master
                  listaAgenteBlMaster = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList, function (e) { return e.Accion != undefined; });
                  listaClienteBlHome = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList, function (e) { return e.Accion != undefined; });
                  listaAgenteBlHome = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList, function (e) { return e.Accion != undefined; });
                  listaServicioNave = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaServicioNaveMemoriaList, function (e) { return e.Accion != undefined; });
                  listaServiciosBl = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaServiciosBLMemoriaList, function (e) { return e.Accion != undefined; });
                  listaTipoContenedor = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList, function (e) { return e.Accion != undefined; });
                  listaDatosCarga = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList, function (e) { return e.Accion != undefined; });
                  listaConfiguracionTarifas = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList, function (e) { return e.Accion != undefined; });
              }
              listaConfiguracionTarifasLigadas = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList, function (e) { return e.Accion != undefined; });

              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal = $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.Estado = "C";
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoLinea = $rootScope.DatosFormulario.RegistroAC.CodigoLinea;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoUsuarioAutorizador = $rootScope.DatosFormulario.DatosAC.CodigoUsuarioAutorizador;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.FechaAutorizacion = $rootScope.DatosFormulario.RegistroAC.FechaAutorizacion;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoTipoCriterio = $rootScope.DatosFormulario.RegistroAC.CodigoTipoCriterio;

              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.InicioVigencia = $rootScope.DatosFormulario.RegistroAC.InicioVigencia;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.FinVigencia = $rootScope.DatosFormulario.RegistroAC.FinVigencia;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.UsuarioCreacion = $scope.Menus.NombreUsuario;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.UsuarioActualizacion = $scope.Menus.NombreUsuario;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.EstadoRegistro = true;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoTipoCondicion = $rootScope.DatosFormulario.DatosAC.CodigoTipoCondicion;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoTipoCarga = $rootScope.DatosFormulario.RegistroAC.CodigoTipoCarga;
              if ($rootScope.DatosFormulario.RegistroAC.Accion == "I") {
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.Accion = $rootScope.DatosFormulario.RegistroAC.Accion;
              } else {
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.Accion = determinarAccion($rootScope.DatosFormulario.RegistroAC.DatasRegistro);
              }
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalSucursal = listaSucursalGrabar;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalSucursalTerminal = listaTerminalGrabar;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalRA = listaRate;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto = listaPuertos;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalClienteBLMaster = listaClientesMaster;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalAgenteBLMaster = listaAgenteBlMaster;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalClienteBLHouse = listaClienteBlHome;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalAgenteBLHouse = listaAgenteBlHome;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalServicioNave = listaServicioNave;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalServicioBL = listaServiciosBl;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTipoContenedor = listaTipoContenedor;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalCarga = listaDatosCarga;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTarifa = listaConfiguracionTarifas;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTarifaLigada = listaConfiguracionTarifasLigadas;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTipoCarga = listaConfiguracionTarifasLigadas;
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTipoCarga = formatearListaTipoCarga();


              // MATCHCODE  
              var listaMatchcodeGrilla = $.grep($rootScope.DatosFormulario.RegistroAC.ListaMatchCode, function (e) { return e.Accion != undefined; });
              var listaMatchcodeMemoria = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaMatchCodeMemoriaList, function (e) { return e.Accion != undefined; });
              for (var v = 0; v < listaMatchcodeGrilla.length; v++) {
                  if ($.inArray(listaMatchcodeGrilla[v], listaMatchcodeMemoria) > -1) {
                  } else {
                      listaMatchcodeMemoria.push(listaMatchcodeGrilla[v]);
                  }
              }
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalMatchCode = listaMatchcodeMemoria;
              // PartidaArancelaria  
              var listaPartidaArancelariaGrilla = $.grep($rootScope.DatosFormulario.RegistroAC.ListaPartidaArancelaria, function (e) { return e.Accion != undefined; });
              var listaPartidaArancelariaMemoria = $.grep($rootScope.DatosFormulario.RegistroAC.grillaListaPartidaArancelariaMemoriaList, function (e) { return e.Accion != undefined; });
              for (var v = 0; v < listaPartidaArancelariaGrilla.length; v++) {
                  if ($.inArray(listaPartidaArancelariaGrilla[v], listaPartidaArancelariaMemoria) > -1) {
                  } else {
                      listaPartidaArancelariaMemoria.push(listaPartidaArancelariaGrilla[v]);
                  }
              }
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPartidaArancelaria = listaPartidaArancelariaMemoria;


              var validacion = validacionesCamposGuardar();
              if (validacion == false) {
                  return false;
              }

              var validacionxSeccion = validarSeccionRequerido();
              if (validacionxSeccion.length > 0) {
                  MiAlert(validacionxSeccion);
                  return false;

              }


              guardarAcuerdoComercial();
          }

          function determinarAccion(objGrabar) {
              var actionU = "U";
              var actionN = "N";
              var viewInitialData = $rootScope.DatosFormulario.RegistroAC.OriginalDataView;
              if (viewInitialData != undefined) {
                  if (objGrabar.CodigoLinea != viewInitialData.CodigoLinea) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoUsuarioAutorizador != viewInitialData.CodigoUsuarioAutorizador) {
                      return actionU;
                  }
                  else if (objGrabar.FechaAutorizacion != viewInitialData.FechaAutorizacion) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTipoCriterio != viewInitialData.CodigoTipoCriterio) {
                      return actionU;
                  }
                  else if (objGrabar.InicioVigencia != viewInitialData.InicioVigencia) {
                      return actionU;
                  }
                  else if (objGrabar.FinVigencia != viewInitialData.FinVigencia) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTipoCondicion != viewInitialData.CodigoTipoCondicion) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTipoCarga != viewInitialData.CodigoTipoCarga) {
                      return actionU;
                  }
                  else {
                      return actionN;
                  }
              } else {
                  return actionU;
              }
          }

          function guardarAcuerdoComercial() {
              miBlock(true, "#html");
              $.ajax({
                  url: "/AcuerdoComercialLocal/GrabarAcuerdoComercial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.RegistroAC.DatasRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.Accion == 'I') {
                                  MiAlertOk("Se ha grabado correctamente la Concesión Local. N°" + data.CodigoAcuerdoComercialLocal, MiAlertOk_success);
                              } else {
                                  MiAlertOk("Se ha actualizado correctamente la Concesión Local. N°" + data.CodigoAcuerdoComercialLocal, MiAlertOk_success);
                              }
                          }
                          else {
                              if (data.Result.Mensajes.length > 0) {
                                  MiError(data.Result.Mensajes[0].Mensaje);
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
          function validacionesCamposGuardar() {
              var salida = true;
              limpiarControlesValidados();
              miBlock(true, "#html");
              if (validateForm("#frmAC_DatosGenerales") == false) {
                  miBlock(false, "#html");
                  salida = false;
              }
              if (validateForm("#frmAC_Rate") == false) {
                  miBlock(false, "#html");
                  salida = false;
              }
              if ($rootScope.DatosFormulario.RegistroAC.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              }
              else if ($rootScope.DatosFormulario.RegistroAC.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              } else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              var vCodigoUsuarioAutorizador = $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoUsuarioAutorizador;
              if (vCodigoUsuarioAutorizador == undefined) {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("Autorizado Por debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("");
              }

              var listaSucursales = $from($rootScope.DatosFormulario.DatosAC.ListaSucursal).where("$idCheck==true").toArray();;
              if (listaSucursales.length <= 0) {
                  $(".caja11.msgerror.listaSucursal").html("Debe seleccionar por lo menos una Sucursal.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaSucursal").html("");
              }
              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoTipoCriterio == "001") {
                  if ($rootScope.DatosFormulario.RegistroAC.ListaRate.length <= 0) {
                      $(".caja11.msgerror.listaRate").html("Debe agregar por lo menos un Rate Agreement.");
                      salida = false;
                  }
              }

              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.FechaAutorizacion) {

              } else {
                  $(".caja11.msgerror.FechaAutorizacion").html("Fecha Autorización es requerido.");
                  salida = false;
              }

              if ($rootScope.DatosFormulario.RegistroAC.ListaDatosCarga.length == 0) {
                  if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.InicioVigencia) {

                  } else {
                      $(".caja11.msgerror.FechaInicio").html("Fecha Inicio Vigencia es requerido.");
                      salida = false;
                  }

                  if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.FinVigencia) {

                  } else {
                      $(".caja11.msgerror.FechaFin").html("Fecha Fin Vigencia es requerido.");
                      salida = false;
                  }
              } else {
                  $(".caja11.msgerror.FechaInicio").html("");
                  $(".caja11.msgerror.FechaFin").html("");
              }
              /*
              if ($rootScope.DatosFormulario.RegistroAC.ListaRate.length > 0) {
                  $.each($rootScope.DatosFormulario.RegistroAC.ListaRate, function (x) {
                      if (this.CodigoRA.length != 10) {
                          $(".caja11.msgerror.listaRate").html("El RA debe tener como mínimo 10 caracteres.");
                          salida = false;
                      }
                  });

              }
              */
              if ($rootScope.DatosFormulario.RegistroAC.ListaRate.length > 1) {
                  $.each($rootScope.DatosFormulario.RegistroAC.ListaRate, function (x) {
                      if ($from($rootScope.DatosFormulario.RegistroAC.ListaRate).where("$CodigoRA=='" + this.CodigoRA + "'").toArray().length > 1) {
                          $(".caja11.msgerror.listaRate").html("No puede existir Rate Agreement repetidos.");
                          salida = false;
                      }

                  });
              }

              // if ($rootScope.DatosFormulario.RegistroAC.ListaClientesMaster.length > 0 ) {
              /*
              var flagclientes = true;
              for (var i = 0; i < $rootScope.DatosFormulario.RegistroAC.ListaClientesMaster.length; i++) {
                  if ($rootScope.DatosFormulario.RegistroAC.ListaClientesMaster[i].CodigoDocumentoCliente == "") {
                       $(".caja11.msgerror.ListaClientesMaster").html("Debe elegir clientes con ruc.");
                        salida = false;
                        flagclientes = false;
                        return false;
                  }
              }
              if(flagclientes)
              {
                $(".caja11.msgerror.ListaClientesMaster").html("");
              }
              */
              //} 

              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto.length >= 0) {
                  var isInco = false;
                  for (var a = 0; a < $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto.length; a++) {
                      if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto[a].CodigoTipoPuerto == undefined) {
                          isInco = true;
                      } else if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto[a].CodigoTipoPuerto == null) {
                          isInco = true;
                      }
                  }
                  if (isInco) {
                      $(".caja11.msgerror.listaPuertos").html("Debe seleccionar el Tipo de Puerto.");
                      salida = false;
                  }
                  else {
                      $(".caja11.msgerror.listaPuertos").html("");
                  }
              }

              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto.length > 1) {
                  $.each($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto, function (x) {
                      if ($from($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto).where("$CodigoPuerto=='" + this.CodigoPuerto + "'&$CodigoTipoPuerto=='" + this.CodigoTipoPuerto + "'").toArray().length > 1) {
                          $(".caja11.msgerror.listaPuertos").html("No puede existir puertos con el mismo codigo y tipo.");
                          salida = false;
                      }

                  });
              }

              var newListTarifa = $.grep($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTarifa, function (e) { return e.Accion != "D"; });;
              if (newListTarifa.length > 0) {
                  var isInco = false;
                  for (var a = 0; a < newListTarifa.length; a++) {
                      if (newListTarifa[a].CodigoTipoDescuento == undefined) {
                          isInco = true;
                      } else if (newListTarifa[a].CodigoTipoDescuento == null) {
                          isInco = true;
                      }
                      if (newListTarifa[a].ValorDescuento == undefined) {
                          isInco = true;
                      } else if (newListTarifa[a].ValorDescuento == null) {
                          isInco = true;
                      }
                      else if (newListTarifa[a].ValorDescuento == "" && newListTarifa[a].CodigoTipoDescuento != "E") {
                          isInco = true;
                      }

                      if (newListTarifa[a].CodigoMonedaAcuerdo == undefined) {
                          isInco = true;
                      } else if (newListTarifa[a].CodigoMonedaAcuerdo == null) {
                          isInco = true;
                      }
                  }
                  if (isInco) {
                      $(".caja11.msgerror.ListaConfiguracionTarifas").html("Debe seleccionar o ingresar los siguientes datos: Tipo Dscto, Valor Dscto y Moneda Acuerdo.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.ListaConfiguracionTarifas").html("");
                  }
              }
              else {
                  if ($rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas.length <= 0) {
                      $(".caja11.msgerror.ListaConfiguracionTarifas").html("Debe agregar una tarifa.");
                      salida = false;
                  }
              }


              // MAtchCode ------

              //var LsMatchCode =  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalMatchCode ;
              var listaMatchcodeGrilla = $.grep($rootScope.DatosFormulario.RegistroAC.ListaMatchCode, function (e) { return e.Accion == undefined; });
              var listaMatchcodeMemoria = $.grep($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalMatchCode, function (e) { return e.Accion != "D"; });
              for (var v = 0; v < listaMatchcodeGrilla.length; v++) {
                  if ($.inArray(listaMatchcodeGrilla[v], listaMatchcodeMemoria) > -1) {
                  } else {
                      listaMatchcodeMemoria.push(listaMatchcodeGrilla[v]);
                  }
              }
              if (validarRolMatchCode(listaMatchcodeMemoria)) {
                  salida = false;
              }

              return salida;
          }
          function limpiarControlesValidados() {
              $(".caja11.msgerror.FechaInicio").html("");
              $(".caja11.msgerror.FechaFin").html("");
              $(".caja11.msgerror.FechaAutorizacion").html("");
              $(".caja11.listaRate").html("");
              $(".caja11.listaSucursal").html("");
              $(".caja11.CodigoUsuarioAutorizador").html("");
              $(".caja11.msgerror.listaRate").html("");
          }
          function formatearListaTipoCarga() {
              var listaTipoCarga = [];
              var obj1, obj2, obj3, obj4, codigoAcLocal;
              obj1 = new Object();
              obj2 = new Object();
              obj3 = new Object();
              obj4 = new Object();

              codigoAcLocal = $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal;
              obj1.CodigoAcuerdoComercialLocal = codigoAcLocal;
              obj1.TipoBL = "H";
              obj1.Accion = "D";

              obj2.CodigoAcuerdoComercialLocal = codigoAcLocal;
              obj2.TipoBL = "M";
              obj2.Accion = "D";

              listaTipoCarga.push(obj1);
              listaTipoCarga.push(obj2);

              if ($rootScope.DatosFormulario.RegistroAC.CodigoTipoCarga) {

                  if ($rootScope.DatosFormulario.RegistroAC.CodigoTipoCarga == "MH") {
                      obj3.CodigoAcuerdoComercialLocal = codigoAcLocal;
                      obj3.TipoBL = "H";
                      obj3.Accion = "I";

                      obj4.CodigoAcuerdoComercialLocal = codigoAcLocal;
                      obj4.TipoBL = "M";
                      obj4.Accion = "I";

                      listaTipoCarga.push(obj3);
                      listaTipoCarga.push(obj4);

                  } if ($rootScope.DatosFormulario.RegistroAC.CodigoTipoCarga == "H") {
                      obj3.CodigoAcuerdoComercialLocal = codigoAcLocal;
                      obj3.TipoBL = "H";
                      obj3.Accion = "I";
                      listaTipoCarga.push(obj3);
                  }
                  if ($rootScope.DatosFormulario.RegistroAC.CodigoTipoCarga == "M") {
                      obj4.CodigoAcuerdoComercialLocal = codigoAcLocal;
                      obj4.TipoBL = "M";
                      obj4.Accion = "I";
                      listaTipoCarga.push(obj4);
                  }
              }
              return listaTipoCarga;
          }
          $scope.Deshabilitar_Click = function () {
              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal > 0) {
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal = $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.Estado = "D";
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoLinea = $rootScope.DatosFormulario.RegistroAC.CodigoLinea;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoUsuarioAutorizador = $rootScope.DatosFormulario.DatosAC.CodigoUsuarioAutorizador;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.FechaAutorizacion = $rootScope.DatosFormulario.RegistroAC.FechaAutorizacion;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoTipoCriterio = $rootScope.DatosFormulario.RegistroAC.CodigoTipoCriterio;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.InicioVigencia = $rootScope.DatosFormulario.RegistroAC.InicioVigencia;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.FinVigencia = $rootScope.DatosFormulario.RegistroAC.FinVigencia;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.EstadoRegistro = false;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.Accion = $rootScope.DatosFormulario.RegistroAC.Accion;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoTipoCondicion = $rootScope.DatosFormulario.DatosAC.CodigoTipoCondicion;
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalSucursal = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalSucursalTerminal = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalRA = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalPuerto = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalClienteBLMaster = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalAgenteBLMaster = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalClienteBLHouse = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalAgenteBLHouse = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalServicioNave = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalServicioBL = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTipoContenedor = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalCarga = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTarifa = [];
                  $rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalTarifaLigada = [];
                  MiConfirm("¿Está seguro de deshabilitar la Concesión Local?.", function () {
                      $.ajax({
                          url: "/AcuerdoComercialLocal/DeshabilitarAcuerdoComercialLocal",
                          type: "POST",
                          headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                          data: $rootScope.DatosFormulario.RegistroAC.DatasRegistro,
                          dataType: "json",
                          cache: true,
                          async: false,
                          success: function (data) {
                              if (data.Result != null) {
                                  if (data.Result.Satisfactorio === true) {
                                      MiAlertOk("Se ha deshabilitado la Concesión Local.", MiAlertOk_success);
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
          $rootScope.QuitarTipoContenedor = function (idTipoContenedor) {
              MiConfirm("¿Está seguro de eliminar el Tipo Contenedor?.", function () {
                  var listaGrillaMemoriaTipoContenedor = $rootScope.DatosFormulario.RegistroAC.ListaTipoContenedor;
                  var listaBaseMemoriaTipoContenedor = $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList;
                  var listaGrillaTipoContenedor = [];
                  var listaBaseTipoContenedor = [];
                  for (var x = 0; x < listaGrillaMemoriaTipoContenedor.length; x++) {
                      if (listaGrillaMemoriaTipoContenedor[x].IdTipoContenedor != idTipoContenedor) {
                          listaGrillaTipoContenedor.push(listaGrillaMemoriaTipoContenedor[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaTipoContenedor.length; x++) {
                      if (listaBaseMemoriaTipoContenedor[x].IdTipoContenedor == idTipoContenedor) {
                          if (listaBaseMemoriaTipoContenedor[x].IdTipoContenedor > 0) {
                              listaBaseMemoriaTipoContenedor[x].Accion = "D";
                              listaBaseTipoContenedor.push(listaBaseMemoriaTipoContenedor[x]);
                          }
                      } else {
                          listaBaseTipoContenedor.push(listaBaseMemoriaTipoContenedor[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.ListaTipoContenedor = listaGrillaTipoContenedor;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList = listaBaseTipoContenedor;
                  $scope.gridapiListaTipoContenedor.refresh(listaGrillaTipoContenedor);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarConfiguracionTarifas = function (idConfiguracionTarifa) {
              MiConfirm("¿Está seguro de eliminar la Configuración Tarifa?.", function () {
                  var listaGrillaMemoriaConfigTarifa = $rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas;
                  var listaBaseMemoriaConfigTarifa = $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList;
                  var listaGrillaConfigTarifa = [];
                  var listaBaseConfigTarifa = [];
                  for (var x = 0; x < listaGrillaMemoriaConfigTarifa.length; x++) {
                      if (listaGrillaMemoriaConfigTarifa[x].IdConfiguracionTarifa != idConfiguracionTarifa) {
                          listaGrillaConfigTarifa.push(listaGrillaMemoriaConfigTarifa[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoriaConfigTarifa.length; x++) {
                      if (listaBaseMemoriaConfigTarifa[x].IdConfiguracionTarifa == idConfiguracionTarifa) {
                          if (listaBaseMemoriaConfigTarifa[x].IdConfiguracionTarifa > 0) {
                              listaBaseMemoriaConfigTarifa[x].Accion = "D";
                              listaBaseConfigTarifa.push(listaBaseMemoriaConfigTarifa[x]);
                          }
                      } else {
                          listaBaseConfigTarifa.push(listaBaseMemoriaConfigTarifa[x]);
                      }
                  }
                  $scope.QuitarTarifasLigadas(idConfiguracionTarifa);
                  $rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas = listaGrillaConfigTarifa;
                  $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList = listaBaseConfigTarifa;
                  $scope.gridapiListaConfiguracionTarifas.refresh(listaGrillaConfigTarifa);
                  $rootScope.$apply();
              });
          }
          $scope.QuitarTarifasLigadas = function (idConfiguracionTarifa) {
              if ($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList.length > 0) {
                  var listaMemoriaLigada = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList, function (e) { return e.IdConfiguracionTarifa != idConfiguracionTarifa; });
                  var listaLigadas = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList, function (e) { return e.IdConfiguracionTarifa == idConfiguracionTarifa; });
                  if (listaLigadas.length > 0) {
                      for (var i = 0; i < listaLigadas.length; i++) {
                          if (listaLigadas[i].IdConfiguracionTarifaLigada > 0) {
                              listaLigadas[i].Accion = "D";
                              listaMemoriaLigada.push(listaLigadas[i]);
                          }
                      }
                  }
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = listaMemoriaLigada;
              }
          }
          $scope.Modificar_Click = function () {
              $scope.FlagMostrarBotonGuardar = true;
              $scope.FlagMostrarBotonModificar = false;
              $scope.FlagMostrarBotonDeshabilitar = false;
              $scope.FlagEditing = true;
              $scope.EditingGrillas();
              $scope.DeshabilitarExoneradosTarifa();
          }
          $scope.DeshabilitarExoneradosTarifa = function () {
              var lstcontrolsInput = $("#grillaListaConfiguracionTarifas").find('input[type="text"]');
              $.each(lstcontrolsInput, function (x, y) {

                  var objTemp = $(this).attr("ng-model").replace("root", "rootScope")
                  var indexFin = objTemp.lastIndexOf(".");
                  var objElementoGeneral = eval(objTemp.slice(0, indexFin));

                  if (objElementoGeneral.CodigoTipoDescuento == "E") {
                      $("#grillaListaConfiguracionTarifas").find(lstcontrolsInput[x]).attr('disabled', 'disabled');
                  } else {
                      $("#grillaListaConfiguracionTarifas").find(lstcontrolsInput[x]).removeAttr('disabled');
                  }
              });
          }
          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaListaSucursales");
              arrayGrillas.push("grillaListaTerminalPortuario");
              arrayGrillas.push("grillaListaRate");
              arrayGrillas.push("grillaListaPuertos");
              arrayGrillas.push("grillaListaClienteBLMaster");
              arrayGrillas.push("grillaListaAgenteBLMaster");
              arrayGrillas.push("grillaListaClienteBLHome");
              arrayGrillas.push("grillaListaAgenteBLHome");
              arrayGrillas.push("grillaListaServicioNave");
              arrayGrillas.push("grillaListaServiciosBL");
              arrayGrillas.push("grillaListaTipoContenedor");
              arrayGrillas.push("grillaListaDatosCarga");
              arrayGrillas.push("grillaListaConfiguracionTarifas");

              arrayGrillas.push("grillaACListaMatchCode");
              arrayGrillas.push("grillaACListaPartidaArancelaria");


              var arrayContentFechas = new Array();
              arrayContentFechas.push("VigenciaFrm");
              arrayContentFechas.push("frmAC_DatosGenerales");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, arrayContentFechas);
              if ($scope.FlagEditing) {
                  $("#grillaListaRate_pager_left").show();

              } else {
                  $("#grillaListaRate_pager_left").hide();
              }
              $rootScope.HabilitarCampoRate();

              var arrayGrillaPuerto = new Array();
              arrayGrillaPuerto.push("grillaListaPuertos");
              DeshabilitarSelectGrilla(arrayGrillaPuerto);
          }
          $scope.MinimizarBloques = function (minimizar) {
              if (minimizar) {
                  $("#seccion-5").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-5").find(".block_content").attr('style', 'display: none');

                  $("#seccion-6").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-6").find(".block_content").attr('style', 'display: none');

                  $("#seccion-7").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-7").find(".block_content").attr('style', 'display: none');

                  $("#seccion-8").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-8").find(".block_content").attr('style', 'display: none');

                  $("#seccion-9").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-9").find(".block_content").attr('style', 'display: none');

                  $("#seccion-10").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-10").find(".block_content").attr('style', 'display: none');

                  $("#seccion-11").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-11").find(".block_content").attr('style', 'display: none');

                  $("#seccion-12").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-12").find(".block_content").attr('style', 'display: none');

                  $("#seccion-13").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-13").find(".block_content").attr('style', 'display: none');

                  // nuevo
                  $("#seccion-14").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-14").find(".block_content").attr('style', 'display: none');

                  $("#seccion-15").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-15").find(".block_content").attr('style', 'display: none');
              }
          }
          $scope.MaximizarBloques = function (maximizar) {
              if (maximizar) {
                  $("#seccion-5").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-5").find(".block_content").attr('style', 'display: block');

                  $("#seccion-6").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-6").find(".block_content").attr('style', 'display: block');

                  $("#seccion-8").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-8").find(".block_content").attr('style', 'display: block');

                  $("#seccion-12").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-12").find(".block_content").attr('style', 'display: block');

                  $("#seccion-13").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-13").find(".block_content").attr('style', 'display: block');

                  $("#seccion-14").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-14").find(".block_content").attr('style', 'display: block');

                  $("#seccion-15").find(".block_cab").removeClass("block_cab_active");
                  $("#seccion-15").find(".block_content").attr('style', 'display: block');


              }
          }

          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          function ObservadorAtributos() {
              //$scope.$watch("$root.DatosFormulario.RegistroAC.CodigoTipoCriterio", function (newValue, oldValue) {
              //    if (newValue == "001") {
              //        $("#seccion-5").hide();
              //        $("#seccion-6").hide();
              //        // $("#seccion-7").hide();
              //        $("#seccion-8").hide();
              //        // $("#seccion-9").hide();
              //        // $("#seccion-10").hide();
              //        // $("#seccion-11").hide();
              //        $("#seccion-12").hide();
              //        $("#seccion-13").hide();
              //        $rootScope.EliminarDatosSecciones();
              //    } else {
              //        $("#seccion-5").show();
              //        $("#seccion-6").show();
              //        //$("#seccion-7").show();
              //        $("#seccion-8").show();
              //        //$("#seccion-9").show();
              //        //$("#seccion-10").show();
              //        //$("#seccion-11").show();
              //        $("#seccion-12").show();
              //        $("#seccion-13").show();
              //        if (oldValue == '001') {
              //            $rootScope.EliminarDatosSecciones();
              //        }
              //    }
              //});
              $scope.$watch("$root.DatosFormulario.DatosAC.CodigoTipoCondicion", function (newValue, oldValue) {
                  if (newValue == "HBLFCL") {
                      // 1 a 1
                      // $("#seccion-9").hide();
                      // $("#seccion-7").show();
                  }
                  if (newValue == "HBLLCL") {
                      // 1 a mas
                      // $("#seccion-9").show();
                      // $("#seccion-7").hide();
                  }
              });
          }
          $scope.ChangeLineaNaviera = function (codigoLinea) {
              if ($rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagEditar) {
                  var listaBaseMemoria = $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList;
                  var listaBase = [];
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].IdTipoContenedor > 0) {
                          listaBaseMemoria[x].Accion = "D";
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList = listaBase;
              } else {
                  $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList = [];
              }
              $rootScope.DatosFormulario.RegistroAC.ListaTipoContenedor = [];
              $scope.gridapiListaTipoContenedor.refresh([]);

              //ConfiguracionSecciones("ConcesionLocal",codigoLinea);
              var objConfiguracion = ConfiguracionSecciones("ConcesionLocal", codigoLinea);
              $scope.RequeridoPorSeccionVisible(objConfiguracion, codigoLinea);


              $scope.CargarSucursal();
              $rootScope.TipoConcesion($rootScope.DatosFormulario.RegistroAC.CodigoTipoCriterio);
          }

          $rootScope.TipoConcesion = function (newValue) {
              if (newValue == "001") {
                  $rootScope.EliminarDatosSecciones();
                  $rootScope.HideShowSection(true);
              } else {
                  $rootScope.HideShowSection(false);
                  $scope.MaximizarBloques(true);
                  $scope.gridapiListaPuertos.refresh([]);
                  $scope.gridapiListaClienteBLMaster.refresh([]);
                  $scope.gridapiListaClienteBLHome.refresh([]);
                  $scope.gridapiListaTipoContenedor.refresh([]);
                  $scope.gridapiListaDatosCarga.refresh([]);
                  //$rootScope.$apply();

                  //Validar
                  $scope.gridapigrillaACListaMatchCode.refresh([]);
                  $scope.gridapigrillaACListaPartidaArancelaria.refresh([]);
                  $scope.MinimizarBloques(true);
                  // ConfiguracionSecciones("ConcesionLocal",$rootScope.DatosFormulario.RegistroAC.CodigoLinea);

                  var objConfiguracion = ConfiguracionSecciones("ConcesionLocal", $rootScope.DatosFormulario.RegistroAC.CodigoLinea);
                  $scope.RequeridoPorSeccionVisible(objConfiguracion, $rootScope.DatosFormulario.RegistroAC.CodigoLinea);


              }

          }
          $rootScope.HideShowSection = function (isHidden) {
              if (isHidden) {
                  $("#seccion-5").hide();
                  $("#seccion-6").hide();
                  $("#seccion-8").hide();
                  $("#seccion-12").hide();
                  $("#seccion-13").hide();

                  $("#seccion-14").hide();
                  $("#seccion-15").hide();

              } else {
                  $("#seccion-5").show();
                  $("#seccion-6").show();
                  $("#seccion-8").show();
                  $("#seccion-12").show();
                  $("#seccion-13").show();

                  $("#seccion-14").show();
                  $("#seccion-15").show();
              }
          }
          $rootScope.EliminarDatosSecciones = function () {
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList.length > 0) {
                  $rootScope.QuitarListaPuertosAll();
              }
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList.length > 0) {
                  $rootScope.QuitarListaClientesBLMasterAll();
              }
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList.length > 0) {
                  $rootScope.QuitarListaClienteBLHomeAll();
              }
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList.length > 0) {
                  $rootScope.QuitarTipoContenedorAll();
              }
              if ($rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList.length > 0) {
                  $rootScope.QuitarCargaAll();
              }

              $scope.gridapiListaPuertos.refresh([]);
              $scope.gridapiListaClienteBLMaster.refresh([]);
              $scope.gridapiListaClienteBLHome.refresh([]);
              $scope.gridapiListaTipoContenedor.refresh([]);
              $scope.gridapiListaDatosCarga.refresh([]);
          }
          $rootScope.QuitarListaPuertosAll = function () {
              var listaBaseMemoriaPuerto = $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList;
              var listaGrillaPuerto = [];
              var listaBasePuerto = [];
              for (var x = 0; x < listaBaseMemoriaPuerto.length; x++) {
                  if (listaBaseMemoriaPuerto[x].IdAcuerdoPuerto > 0) {
                      listaBaseMemoriaPuerto[x].Accion = "D";
                      listaBasePuerto.push(listaBaseMemoriaPuerto[x]);
                  }
              }
              $rootScope.DatosFormulario.RegistroAC.ListaPuertos = listaGrillaPuerto;
              $rootScope.DatosFormulario.RegistroAC.grillaListaPuertoMemoriaList = listaBasePuerto;
          }
          $rootScope.QuitarListaClientesBLMasterAll = function () {
              var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList;
              var listaGrillaCliente = [];
              var listaBaseCliente = [];
              for (var x = 0; x < listaBaseMemoriaCliente.length; x++) {
                  if (listaBaseMemoriaCliente[x].IdClienteBLMaster > 0) {
                      listaBaseMemoriaCliente[x].Accion = "D";
                      listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                  }

              }
              $rootScope.DatosFormulario.RegistroAC.ListaClientesMaster = listaGrillaCliente;
              $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList = listaBaseCliente;
          }
          $rootScope.QuitarListaClienteBLHomeAll = function () {
              var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList;
              var listaGrillaCliente = [];
              var listaBaseCliente = [];

              for (var x = 0; x < listaBaseMemoriaCliente.length; x++) {
                  if (listaBaseMemoriaCliente[x].IdClienteBLHome > 0) {
                      listaBaseMemoriaCliente[x].Accion = "D";
                      listaBaseCliente.push(listaBaseMemoriaCliente[x]);
                  }
              }
              $rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome = listaGrillaCliente;
              $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList = listaBaseCliente;
          }
          $rootScope.QuitarTipoContenedorAll = function () {
              var listaBaseMemoriaTipoContenedor = $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList;
              var listaGrillaTipoContenedor = [];
              var listaBaseTipoContenedor = [];

              for (var x = 0; x < listaBaseMemoriaTipoContenedor.length; x++) {
                  if (listaBaseMemoriaTipoContenedor[x].IdTipoContenedor > 0) {
                      listaBaseMemoriaTipoContenedor[x].Accion = "D";
                      listaBaseTipoContenedor.push(listaBaseMemoriaTipoContenedor[x]);
                  }

              }
              $rootScope.DatosFormulario.RegistroAC.ListaTipoContenedor = listaGrillaTipoContenedor;
              $rootScope.DatosFormulario.RegistroAC.grillaListaTipoContenedorMemoriaList = listaBaseTipoContenedor;
          }
          $rootScope.QuitarCargaAll = function () {
              var listaBaseMemoriaCarga = $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList;
              var listaGrillaCarga = [];
              var listaBaseCarga = [];
              for (var x = 0; x < listaBaseMemoriaCarga.length; x++) {
                  if (listaBaseMemoriaCarga[x].IdCarga > 0) {
                      listaBaseMemoriaCarga[x].Accion = "D";
                      listaBaseCarga.push(listaBaseMemoriaCarga[x]);
                  }
              }
              $rootScope.DatosFormulario.RegistroAC.ListaDatosCarga = listaGrillaCarga;
              $rootScope.DatosFormulario.RegistroAC.grillaListaDatosCargaMemoriaList = listaBaseCarga;
          }

          function validarRolMatchCode(ListaMatchCode) {
              var Existe = false;
              var ListaBuscarDuplicados = $.extend(true, [], ListaMatchCode);
              $(".caja11.ListaClienteMatchcode").html("");
              if (ListaMatchCode.length > 0) {
                  for (var a = 0; a < ListaMatchCode.length; a++) {
                      if (ListaMatchCode[a].Rol != "" && ListaMatchCode[a].Rol != undefined) {

                          var lsDuplicados = $.grep(ListaBuscarDuplicados, function (e) {
                              return e.CodigoMatchCode == ListaMatchCode[a].CodigoMatchCode &&
                            e.Rol == ListaMatchCode[a].Rol;
                          });

                          if (lsDuplicados.length > 1) {
                              $(".caja11.ListaClienteMatchcode").html("La combinación Código MatchCode y Rol ya existe.");
                              Existe = true;
                          }
                      } else {
                          $(".caja11.ListaClienteMatchcode").html("Debe seleccionar Rol.");
                          Existe = true;
                      }
                  }
              }
              return Existe;
          }

          $scope.CambiarRol_Change = function (objItem) {
              if (objItem.IdMatchCode > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
          }


          $scope.RequeridoPorSeccionVisible = function (obj, codigoLinea) {
              $scope.FlagMostrarValidateRateAgreement = false;
              $scope.FlagMostrarValidateMatchCodeCliente = false;
              $scope.FlagMostrarValidateContenedorBL = false;
              $scope.FlagMostrarValidateClienteBLMaster = false;
              $scope.FlagMostrarValidateClienteBLHouse = false;

              $scope.SeccionTituloRate = "";
              $scope.SeccionTituloMatchCodeCliente = "";
              $scope.SeccionTituloContenedorBL = "";
              $scope.SeccionTituloClienteBLMaster = "";
              $scope.SeccionTituloClienteBLHouse = "";

              if (obj != undefined) {

                  var lstConfiguracionLinea = $.grep(obj.ConfiguracionLinea, function (e) { return e.CodigoLinea == codigoLinea; });
                  if (lstConfiguracionLinea.length > 0) {

                      var lstConfiguracion = $.grep(obj.ConfiguracionLineaPantallaSeccion, function (e) { return e.CodigoPantalla == "ConcesionLocal" && e.CodigoConfiguracion == lstConfiguracionLinea[0].CodigoConfiguracion; });

                      $.each(lstConfiguracion, function (x) {

                          if (this.CodigoSeccion == "RateAgreement") {
                              if (this.SeccionVisible == true) {
                                  $scope.FlagMostrarValidateRateAgreement = true;
                                  $scope.SeccionTituloRate = this.SeccionTitulo;
                              }
                          }

                          if (this.CodigoSeccion == "MatchCode") {
                              if (this.SeccionVisible == true) {
                                  $scope.FlagMostrarValidateMatchCodeCliente = true;
                                  $scope.SeccionTituloMatchCodeCliente = this.SeccionTitulo;
                              }
                          }

                          if (this.CodigoSeccion == "BL") {
                              if (this.SeccionVisible == true) {
                                  $scope.FlagMostrarValidateContenedorBL = true;
                                  $scope.SeccionTituloContenedorBL = this.SeccionTitulo;
                              }
                          }

                          // Nuevo..................................
                          if (this.CodigoSeccion == "ClienteBlMaster") {
                              if (this.SeccionVisible == true) {
                                  $scope.FlagMostrarValidateClienteBLMaster = true;
                                  $scope.SeccionTituloClienteBLMaster = this.SeccionTitulo;
                              }
                          }

                          if (this.CodigoSeccion == "ClienteBlHouse") {
                              if (this.SeccionVisible == true) {
                                  $scope.FlagMostrarValidateClienteBLHouse = true;
                                  $scope.SeccionTituloClienteBLHouse = this.SeccionTitulo;
                              }
                          }
                          //------------------------------------------


                      });
                  }
              }
          }

          function validarSeccionRequerido() {
              var mensaje = "Debe Ingresar : ";
              var flagMostraMensajeValidacion = false;

              if ($scope.FlagMostrarValidateRateAgreement) {
                  var listaLocalRA = $.grep($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalRA, function (e) { return e.Accion != "D"; });
                  if (listaLocalRA.length == 0) {
                      flagMostraMensajeValidacion = false;
                      mensaje = mensaje + " " + $scope.SeccionTituloRate + " ó";
                  } else {
                      flagMostraMensajeValidacion = true;
                  }
              }

              if ($scope.FlagMostrarValidateMatchCodeCliente) {
                  if (!flagMostraMensajeValidacion) {
                      var listaLocalMatchCode = $.grep($rootScope.DatosFormulario.RegistroAC.ListaMatchCode, function (e) { return e.Accion != "D"; });
                      if (listaLocalMatchCode.length == 0) {
                          flagMostraMensajeValidacion = false;
                          mensaje = mensaje + " " + $scope.SeccionTituloMatchCodeCliente + " ó";
                      } else {
                          flagMostraMensajeValidacion = true;
                      }
                  }
              }

              if ($scope.FlagMostrarValidateContenedorBL) {
                  if (!flagMostraMensajeValidacion) {
                      //var listaLocalCarga = $.grep($rootScope.DatosFormulario.RegistroAC.DatasRegistro.ListaAcuerdoComercialLocalCarga, function (e) { return e.Accion != "D"; });
                      var listaLocalCarga = $.grep($rootScope.DatosFormulario.RegistroAC.ListaDatosCarga, function (e) { return e.Accion != "D"; });
                      if (listaLocalCarga.length == 0) {
                          flagMostraMensajeValidacion = false;
                          mensaje = mensaje + " " + $scope.SeccionTituloContenedorBL + " ó";
                      } else {
                          flagMostraMensajeValidacion = true;
                      }
                  }
              }

              if ($scope.FlagMostrarValidateClienteBLMaster) {
                  if (!flagMostraMensajeValidacion) {
                      var listaClientesMaster = $.grep($rootScope.DatosFormulario.RegistroAC.ListaClientesMaster, function (e) { return e.Accion != "D"; });
                      if (listaClientesMaster.length == 0) {
                          flagMostraMensajeValidacion = false;
                          mensaje = mensaje + " " + $scope.SeccionTituloClienteBLMaster + " ó";
                      } else {
                          flagMostraMensajeValidacion = true;
                      }
                  }
              }

              if ($scope.FlagMostrarValidateClienteBLHouse) {
                  if (!flagMostraMensajeValidacion) {
                      var listaClienteBlHome = $.grep($rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome, function (e) { return e.Accion != "D"; });
                      if (listaClienteBlHome.length == 0) {
                          flagMostraMensajeValidacion = false;
                          mensaje = mensaje + " " + $scope.SeccionTituloClienteBLHouse + " ó";
                      } else {
                          flagMostraMensajeValidacion = true;
                      }
                  }
              }

              if (flagMostraMensajeValidacion) {
                  mensaje = "";
              } else {
                  mensaje = mensaje.substring(0, mensaje.length - 1);
              }

              return mensaje;
          }

      }]);
})();