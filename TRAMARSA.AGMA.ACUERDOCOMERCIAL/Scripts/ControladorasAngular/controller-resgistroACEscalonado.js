(function () {
    angular.module('api')
    .controller('RegistroAcuerdoComercialEscalonadoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroACEscalonado == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado = new Object();
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE = new Object();
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE = new Object();

              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList = [];

              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria = [];

              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoSourceOriginal == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoSourceOriginal = [];

              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaTerminalPortuarioEdit == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaTerminalPortuarioEdit = [];

              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaMatchCodeMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaMatchCodeMemoriaList = [];

              if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPartidaArancelariaMemoriaList == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPartidaArancelariaMemoriaList = [];


              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ConfiguracionSecciones == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ConfiguracionSecciones = new Object();

              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave == undefined)
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave = [];



              // Requiere Secciones
              $scope.FlagMostrarValidateRateAgreement = false;
              $scope.FlagMostrarValidateMatchCodeCliente = false;
              $scope.FlagMostrarValidateContenedorBL = false;
              $scope.SeccionTituloRate = "";
              $scope.SeccionTituloMatchCodeCliente = "";
              $scope.SeccionTituloContenedorBL = "";
              //----------------------------------------------

              var paramCodigo = getUrlVars()["codigoAcuerdoEscalonado"];
              if (paramCodigo) {
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar = true;
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado = paramCodigo;
              }

              var esEditar = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar;
              var esSeguimiento = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagSeguimiento;
              $scope.CargarDatosIniciales();
              if (esEditar) {
                  $scope.FlagMostrarBotonGuardar = false;
                  $scope.FlagMostrarBotonModificar = true;
                  $scope.FlagMostrarBotonHistorial = true;
                  $scope.FlagMostrarBotonDeshabilitar = true;
                  $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView = new Object();
                  $scope.CargaInicialAcuerdoComercial();
                  $scope.FlagEditing = false;
                  $scope.FlagEditarLinea = false;
              } else {
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CuName = null;
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Estado = "C";
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.EstadoRegistro = true;
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado = 0;
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Accion = "I";
                  $scope.FlagMostrarBotonGuardar = true;
                  $scope.FlagEditing = true;
                  $scope.FlagEditarLinea = true;
              }
              if (esSeguimiento) {
                  $scope.FlagMostrarBotonModificar = false;
                  $scope.FlagMostrarBotonDeshabilitar = false;
              }

              $scope.EditingGrillas();
              $scope.MinimizarBloques();
              $("#seccion-7").hide();
              $("#seccion-9").hide();
              $("#seccion-10").hide();
              $("#seccion-11").hide();
              //$("#seccion-12").hide();
              $("#seccion-8").hide();
              $("#seccion-6").hide();
          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/AcuerdoComercialEscalonado/GrabarAcuerdoComercialEscalonadoCargaInicial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.Lineas = data.Linea;
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea = data.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.Habilitado = 'False';
                          }
                      }
                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.Tipos = data.Tipo;
                      if (data.Tipo.length > 0) {
                          $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoTipoCriterio = data.Tipo[0].Codigo;
                      }

                      //$rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal = data.Sucursal;
                      //$scope.Grid_DataBind("DetalleSucursal", $rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal);
                      $scope.CargarSucursal();
                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaPuertos = data.TipoPuerto;

                      var ListaTipoDescuento = [];
                      ListaTipoDescuento = $.grep(data.TipoDescuento, function (e) { return e.Codigo != "B"; });
                      //Nuevo JAMES
                      //$rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaTiposDescuento = data.TipoDescuento;
                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaTiposDescuento = ListaTipoDescuento;

                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaTipoCobro = data.ListaTipoCobro;
                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaMonedas = data.MonedaAcuerdo;
                      for (var i = 0; i < data.Codicion.length; i++) {
                          if ("HBLFCL" == data.Codicion[i].Codigo) {
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CodigoCondicionFCL = data.Codicion[i].Codigo;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CondicionFCL = data.Codicion[i].Descripcion;
                          }
                          if ("HBLLCL" == data.Codicion[i].Codigo) {
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CodigoCondicionLCL = data.Codicion[i].Codigo;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CondicionLCL = data.Codicion[i].Descripcion;
                          }
                      }
                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoTipoCondicion = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CodigoCondicionFCL;
                      if (!$rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar) {
                          $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa = data.BaseAce.ListaAcuerdoComercialEscalonadoTarifa;
                          $scope.gridapigrillaAceListaTarifa.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa);
                          $rootScope.$apply();
                      }
                      if (data.BaseAce.TarifaEscalonadaLigadaList.length > 0) {
                          var listLigada = data.BaseAce.TarifaEscalonadaLigadaList;
                          $(listLigada).each(function (j) {
                              var objItem = new Object();
                              objItem.IdConfiguracionTarifaLigada = -Math.abs(this.IdConfiguracionTarifaLigada);
                              objItem.CodigoTarifa = this.CodigoTarifa;
                              objItem.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado;
                              objItem.CodigoTarifaEscalonado = data.BaseAce.ListaAcuerdoComercialEscalonadoTarifa[0].CodigoTarifaEscalonado; //FALTA DETERMINAR CodigoTarifaEscalonado=142
                              objItem.CodigoTarifaLigadaEscalonado = this.CodigoTarifaLigadaEscalonada;
                              objItem.DescripcionTarifaEscalonada = this.DescripcionTarifaEscalonada;
                              objItem.DescripcionConfiguracionTarifaLigada = this.DescripcionConfiguracionTarifaLigada;
                              objItem.Porcentaje = this.Porcentaje;
                              objItem.Moneda = this.Moneda;
                              objItem.Monto = this.Monto;
                              objItem.CodigoMoneda = this.CodigoMoneda;
                              objItem.CodigoConfiguracionTarifaLigada = this.CodigoConfiguracionTarifaLigada;
                              objItem.MonedaTarifaEscalonada = this.MonedaTarifaEscalonada;
                              objItem.MontoTarifaEscalonada = this.MontoTarifaEscalonada;
                              objItem.CodigoMonedaTarifaLigada = this.CodigoMonedaTarifaLigada;
                              objItem.DescripcionMonedaBase = this.DescripcionMonedaBase;
                              objItem.Accion = "I";
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria.push(objItem);
                          });
                      }
                      // Rol
                      $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaRol = data.ListaRol;

                      //ConfiguracionSecciones("ConcesionEscalonada",$rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea);
                      var objConfiguracion = ConfiguracionSecciones("ConcesionEscalonada", $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea);
                      $scope.RequeridoPorSeccionVisible(objConfiguracion, $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea);

                  }
              });
          }


          $scope.CargarSucursal = function () {
              var codLinea = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea;
              $rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal = ObtenerSucursalesByLinea(codLinea);
              $scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal);
              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario = [];
              $scope.Grid_DataBind("DetalleTerminalPortuario", $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario);
          }

          $scope.CargaInicialAcuerdoComercial = function () {
              var param = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado;
              $.ajax({
                  url: "/AcuerdoComercialEscalonado/ConsultarDetalleAcuerdoComercial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoAcuerdoComercialEscalonado=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.DetalleAcuerdoComercialEscalonadoList.length > 0) {
                              //codSucursal
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal = data.DetalleAcuerdoComercialEscalonadoList[0].ListMatchSucursal; //JM
                              if (data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursal.length > 0) {
                                  for (var number = 0; number < data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursal.length; number++) {
                                      for (var z = 0; z < $rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal.length; z++) {
                                          if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal[z].Codigo == data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursal[number].CodigoSucursal) {
                                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal[z].idCheck = true;
                                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal[z].Accion = "U";
                                              $scope.CheckItem_Sucursal($rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal[z]);
                                          } else {
                                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal[z].Accion = "";
                                          }
                                      }
                                  }
                                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaSucursalEdit = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursal;
                              }
                              //Terminal portuario
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario = data.DetalleAcuerdoComercialEscalonadoList[0].ListMatchTerminalPorturario; //JM
                              if (data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursalTerminal.length > 0) {
                                  for (var m = 0; m < data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursalTerminal.length; m++) {
                                      for (var y = 0; y < $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario.length; y++) {
                                          if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario[y].CodigoSucursal == data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursalTerminal[m].CodigoSucursal
                                              && $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario[y].CodigoAlmacen == data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursalTerminal[m].CodigoTerminalPortuario) {
                                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario[y].idCheck = true;
                                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario[y].Accion = "U";
                                          } else {
                                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario[y].Accion = "";
                                          }
                                      }
                                  }
                                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaTerminalPortuarioEdit = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursalTerminal;
                              }
                              //Datos generales
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoLinea;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoUsuarioAutorizador = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoUsuarioAutorizador;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.FechaAutorizacion = data.DetalleAcuerdoComercialEscalonadoList[0].FechaAutorizacion;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoTipoCriterio = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoTipoCriterio;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.InicioVigencia = data.DetalleAcuerdoComercialEscalonadoList[0].InicioVigencia;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.FinVigencia = data.DetalleAcuerdoComercialEscalonadoList[0].FinVigencia;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Accion = data.DetalleAcuerdoComercialEscalonadoList[0].Accion;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.FechaHoraCreacion = data.DetalleAcuerdoComercialEscalonadoList[0].FechaHoraCreacion;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.FechaHoraActualizacion = data.DetalleAcuerdoComercialEscalonadoList[0].FechaHoraActualizacion;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.UsuarioActualizacion = data.DetalleAcuerdoComercialEscalonadoList[0].UsuarioActualizacion;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.UsuarioCreacion = data.DetalleAcuerdoComercialEscalonadoList[0].UsuarioCreacion;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CuName = null;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Estado = data.DetalleAcuerdoComercialEscalonadoList[0].Estado;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.EstadoRegistro = data.DetalleAcuerdoComercialEscalonadoList[0].EstadoRegistro;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialLocal = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoAcuerdoComercialEscalonado;

                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.Autorizado = data.DetalleAcuerdoComercialEscalonadoList[0].Autorizado;
                              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoTipoCondicion = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoTipoCondicion != null ? data.DetalleAcuerdoComercialEscalonadoList[0].CodigoTipoCondicion : $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CodigoCondicionFCL;

                              //Original cabecera
                              $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView.CodigoLinea = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoLinea;
                              $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView.CodigoUsuarioAutorizador = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoUsuarioAutorizador;
                              $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView.FechaAutorizacion = data.DetalleAcuerdoComercialEscalonadoList[0].FechaAutorizacion;
                              $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView.InicioVigencia = data.DetalleAcuerdoComercialEscalonadoList[0].InicioVigencia;
                              $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView.FinVigencia = data.DetalleAcuerdoComercialEscalonadoList[0].FinVigencia;
                              $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView.CodigoTipoCondicion = data.DetalleAcuerdoComercialEscalonadoList[0].CodigoTipoCondicion;
                              //fin original
                              if (!data.DetalleAcuerdoComercialEscalonadoList[0].EstadoRegistro) {
                                  $scope.FlagMostrarBotonModificar = false;
                                  $scope.FlagMostrarBotonDeshabilitar = false;
                              }

                              //Periodos
                              var listaConfigPeriodo = AgrupamientoPeriodosAcuardoComercialEscalonado(data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifaPeriodo, "U");

                              //Listas
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaRate = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoRA;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoRA;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPuerto;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPuerto;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaClientesMaster = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoClienteBLMaster;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoClienteBLMaster;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLMaster = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoAgenteBLMaster;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoAgenteBLMaster;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoClienteBLHouse;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoClienteBLHouse;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoAgenteBLHouse;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoAgenteBLHouse;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoServicioNave;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoServicioNave;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaServiciosBL = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoServicioBL;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoServicioBL;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoCarga;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoCarga;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifa;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifa;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifaLigada;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria = listaConfigPeriodo;
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoSourceOriginal = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifaPeriodo;

                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaMatchCode = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoMatchCode;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaMatchCodeMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoMatchCode;

                              //PartidaArancelaria
                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaPartidaArancelaria = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPartidaArancelaria;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPartidaArancelariaMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPartidaArancelaria;


                              //Grillas
                              $scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal);
                              $scope.gridapiListaTerminalPortuario.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario);
                              $scope.gridapigrillaAceListaRate.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaRate);
                              $scope.gridapigrillaAceListaPuertos.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos);
                              $scope.gridapigrillaAceListaClienteBLMaster.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaClientesMaster);
                              $scope.gridapigrillaAceListaAgenteBLMaster.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLMaster);
                              $scope.gridapigrillaAceListaClienteBLHome.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome);
                              $scope.gridapigrillaAceListaAgenteBLHome.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome);
                              $scope.gridapigrillaAceListaServicioNave.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave);
                              $scope.gridapigrillaAceListaServiciosBL.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaServiciosBL);
                              $scope.gridapigrillaAceListaDatosCarga.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga);
                              $scope.gridapigrillaAceListaTarifa.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa);
                              $scope.gridapigrillaAceListaMatchCode.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaMatchCode);
                              $scope.gridapigrillaAceListaPartidaArancelaria.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaPartidaArancelaria);

                              $rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPuerto;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList = data.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPuerto;
                              $scope.gridapigrillaAceListaPuertos.refresh($rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos);


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
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaAceListaRate":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarRate('" + rowObject.IdRate + "','" + rowObject.NroRA + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaPuertos":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaPuertos('" + rowObject.IdAcuerdoPuerto + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaClienteBLMaster":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaClientesBLMaster('" + rowObject.IdClienteBLMaster + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaAgenteBLMaster":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaAgenteBLMaster('" + rowObject.IdAgenteBLMaster + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaClienteBLHome":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaClienteBLHome('" + rowObject.IdClienteBLHome + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaAgenteBLHome":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaAgenteBLHome('" + rowObject.IdAgenteBLHome + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaServicioNave":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaServiciosNave('" + rowObject.IdServicioNave + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaServiciosBL":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarListaServiciosBL('" + rowObject.IdServicioBL + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaDatosCarga":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarCarga('" + rowObject.IdCarga + "');";
                                  break;
                          }
                      }
                      break;
                  case "grillaAceListaTarifa":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.ConfigurarTarifa('" + rowObject.IdTarifa + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.QuitarTarifa('" + rowObject.IdTarifa + "');";
                                  break;
                          }
                      }
                      break;

                  case "grillaAceListaMatchCode":
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

                  case "grillaAceListaPartidaArancelaria":
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
          $scope.CheckItem_Sucursal = function (row) {
              row.idCheck;
              if (row.idCheck) {
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CodigoSucursalActual = row.Codigo;
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
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 100);
              if (idgrilla == "grillaListaSucursales") {
                  $.each($rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal, function (x) { this.idCheck = check; });
                  if (check) {
                      $scope.AgregarTerminalPortuarioTarifaLocalTodos();
                  }
                  else {
                      $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario = [];
                      $scope.gridapiListaTerminalPortuario.clear();
                  }
              }
              if (idgrilla == "grillaListaTerminalPortuario") {
                  $.each($rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario, function (x) { this.idCheck = check; });
              }
          }

          $scope.AgregarTerminalPortuarioTarifaLocal = function (codigoSucursal) {

              var codLinea = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea;
              var codSucursal = codigoSucursal;
              var lstTerminal = ObtenerTerminalesByLinea(codLinea, codSucursal);
              $.each(lstTerminal, function (x) {
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario.push(this);
                  $scope.gridapiListaTerminalPortuario.insertRange(this);
              });
          }

          $scope.QuitarTerminalPortuarioTarifaLocal = function (codigoSucursal) {
              var terminalLista = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario, function (e) { return e.CodigoSucursal != codigoSucursal; });
              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario = terminalLista;
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

          $scope.AgregarRate = function () {
              var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaRate, "IdRate");
              $scope.gridapigrillaAceListaRate.insertRange([
                      {
                          IdRate: nuevoId,
                          CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                          CodigoRA: "",
                          Accion: "I"
                      }]);

              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado > 0) {
                  $rootScope.$apply();
                  $rootScope.HabilitarCampoRate();
              }
          }

          $scope.AgregarMatchcode_Click = function () {
              $rootScope.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado;
              $rootScope.FlagCallClientes = "registroACEscalonadoClienteMatchcode";
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

              $rootScope.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado;
              $rootScope.FlagCallPartidaArancelaria = "registroACEscalonadoPartidaArancelaria";
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

          $scope.AgregarPuerto = function () {
              $rootScope.FlagCallPuertos = "registroACEscalonado";
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
              $rootScope.FlagCallClientes = "registroACEscalonadoClienteBLMaster";
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
          $scope.AgregarAgenteBLMaster = function () {
              $rootScope.FlagCallClientes = "registroACEscalonadoAgenteBLMaster";
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
          $scope.AgregarClienteBLHome = function () {
              $rootScope.FlagCallClientes = "registroACEscalonadoClienteBLHome";
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
              $rootScope.FlagCallClientes = "registroACEscalonadoAgenteBLHome";
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
              $rootScope.FlagCallServiciosBL = "serviciosEscalonadoALaNave";
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
              $rootScope.FlagCallServiciosBL = "serviciosEscalonadoAlBL";
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
          $scope.AgregarDatosCarga = function () {
              $rootScope.FlagCallDocumentosOrigen = "registroACEscalonado";
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

          $rootScope.QuitarRate = function (idRate) {
              MiConfirm("¿Está seguro de eliminar el RA?.", function () {
                  var listaGrillaMemoriaRA = $rootScope.DatosFormulario.RegistroACEscalonado.ListaRate;
                  var listaBaseMemoriaRA = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaRate = listaGrillaRA;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList = listaBaseRA;
                  $scope.gridapigrillaAceListaRate.refresh(listaGrillaRA);
                  $rootScope.$apply();
                  if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado > 0) {
                      $rootScope.HabilitarCampoRate();
                  }
              });
          }

          $rootScope.QuitarMatchCode = function (idMatchCode) {
              MiConfirm("¿Está seguro de eliminar el MatchCode?.", function () {
                  var listaGrillaMemoriaMatchCode = $rootScope.DatosFormulario.RegistroACEscalonado.ListaMatchCode;
                  var listaBaseMemoriaMatchCode = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaMatchCodeMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaMatchCode = listaGrillaMatchCode;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaMatchCodeMemoriaList = listaBaseMatchCode;
                  $scope.gridapigrillaAceListaMatchCode.refresh(listaGrillaMatchCode);
                  $rootScope.$apply();
              });
          }

          $rootScope.QuitarPartidaArancelaria = function (IdPA) {
              MiConfirm("¿Está seguro de eliminar el Partida Arancelaria?.", function () {
                  var listaGrillaMemoriaPartidaArancelaria = $rootScope.DatosFormulario.RegistroACEscalonado.ListaPartidaArancelaria;
                  var listaBaseMemoriaPartidaArancelaria = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPartidaArancelariaMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaPartidaArancelaria = listaGrillaPartidaArancelaria;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPartidaArancelariaMemoriaList = listaBasePartidaArancelaria;
                  $scope.gridapigrillaAceListaPartidaArancelaria.refresh(listaGrillaPartidaArancelaria);
                  $rootScope.$apply();

              });
          }

          $rootScope.QuitarListaPuertos = function (idPuerto) {
              MiConfirm("¿Está seguro de eliminar el Puerto?.", function () {
                  var listaGrillaMemoriaPuerto = $rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos;
                  var listaBaseMemoriaPuerto = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos = listaGrillaPuerto;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList = listaBasePuerto;
                  $scope.gridapigrillaAceListaPuertos.refresh(listaGrillaPuerto);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarListaClientesBLMaster = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.ListaClientesMaster;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaClientesMaster = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList = listaBaseCliente;
                  $scope.gridapigrillaAceListaClienteBLMaster.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarListaAgenteBLMaster = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLMaster;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLMaster = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList = listaBaseCliente;
                  $scope.gridapigrillaAceListaAgenteBLMaster.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarListaClienteBLHome = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList = listaBaseCliente;
                  $scope.gridapigrillaAceListaClienteBLHome.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarListaAgenteBLHome = function (idCliente) {
              MiConfirm("¿Está seguro de eliminar el Cliente?.", function () {
                  var listaGrillaMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome;
                  var listaBaseMemoriaCliente = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome = listaGrillaCliente;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList = listaBaseCliente;
                  $scope.gridapigrillaAceListaAgenteBLHome.refresh(listaGrillaCliente);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarListaServiciosNave = function (idServicio) {
              MiConfirm("¿Está seguro de eliminar el Servicio?.", function () {
                  var listaGrillaMemoriaServicioNave = $rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave;
                  var listaBaseMemoriaServicioNave = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave = listaGrillaServicio;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList = listaBaseServicio;
                  $scope.gridapigrillaAceListaServicioNave.refresh(listaGrillaServicio);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarListaServiciosBL = function (idServicio) {
              MiConfirm("¿Está seguro de eliminar el Servicio?.", function () {
                  var listaGrillaMemoriaServicioBl = $rootScope.DatosFormulario.RegistroACEscalonado.ListaServiciosBL;
                  var listaBaseMemoriaServicioBl = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaServiciosBL = listaGrillaServicio;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList = listaBaseServicio;
                  $scope.gridapigrillaAceListaServiciosBL.refresh(listaGrillaServicio);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarCarga = function (idCarga) {
              MiConfirm("¿Está seguro de eliminar los Datos de la Carga?.", function () {
                  var listaGrillaMemoriaCarga = $rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga;
                  var listaBaseMemoriaCarga = $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList;
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
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga = listaGrillaCarga;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList = listaBaseCarga;
                  $scope.gridapigrillaAceListaDatosCarga.refresh(listaGrillaCarga);
                  $rootScope.$apply();
              });
          }
          $rootScope.QuitarTarifa = function (idTarifa) {
              MiConfirm("¿Está seguro de eliminar la Tarifa?.", function () {
                  var listaGrillaMemoriaCarga = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa;
                  var listaBaseMemoriaCarga = $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList;
                  var listaGrillaCarga = [];
                  var listaBaseCarga = [];
                  for (var x = 0; x < listaGrillaMemoriaCarga.length; x++) {
                      if (listaGrillaMemoriaCarga[x].IdTarifa != idTarifa) {
                          listaGrillaCarga.push(listaGrillaMemoriaCarga[x]);
                      }
                  }

                  var periodoListMemoria = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria;
                  var ligadaListMemoria = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria;
                  var listTempPeriodo = [];
                  var listTempLigada = [];
                  for (var a = 0; a < listaBaseMemoriaCarga.length; a++) {
                      if (listaBaseMemoriaCarga[a].IdTarifa == idTarifa) {
                          if (listaBaseMemoriaCarga[a].IdTarifa > 0) {
                              listaBaseMemoriaCarga[a].Accion = "D";
                              listaBaseCarga.push(listaBaseMemoriaCarga[a]);
                              for (var c = 0; c < periodoListMemoria.length; c++) {
                                  if (periodoListMemoria[c].CodigoTarifaEscalonado == listaBaseMemoriaCarga[a].CodigoTarifaEscalonado) {
                                      periodoListMemoria[c].Accion = "D";
                                      listTempPeriodo.push(periodoListMemoria[c]);
                                  }
                              }
                              for (var b = 0; b < ligadaListMemoria.length; b++) {
                                  if (ligadaListMemoria[b].CodigoTarifaEscalonado == listaBaseMemoriaCarga[a].CodigoTarifaEscalonado) {
                                      ligadaListMemoria[b].Accion = "D";
                                      listTempLigada.push(ligadaListMemoria[b]);
                                  }
                              }
                          }
                      } else {
                          listaBaseCarga.push(listaBaseMemoriaCarga[a]);
                          for (var d = 0; d < periodoListMemoria.length; d++) {
                              if (periodoListMemoria[d].CodigoTarifaEscalonado == listaBaseMemoriaCarga[a].CodigoTarifaEscalonado) {
                                  listTempPeriodo.push(periodoListMemoria[d]);
                              }
                          }
                          for (var e = 0; e < ligadaListMemoria.length; e++) {
                              if (ligadaListMemoria[e].CodigoTarifaEscalonado == listaBaseMemoriaCarga[a].CodigoTarifaEscalonado) {
                                  listTempLigada.push(ligadaListMemoria[e]);
                              }
                          }
                      }
                  }

                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria = listTempPeriodo;
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria = listTempLigada;
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa = listaGrillaCarga;
                  $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList = listaBaseCarga;
                  $scope.gridapigrillaAceListaTarifa.refresh(listaGrillaCarga);
                  $rootScope.$apply();
              });
          }
          $scope.ConfigurarTarifa = function (idTarifa) {
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea != undefined) {
                  $(".caja11.msgerror.ListaTarifa").html("");
                  $(".caja11.msgerror.CodigoLinea").html("");
                  var objReg = $from($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa).where("$IdTarifa=='" + idTarifa + "'").firstOrDefault();
                  var altura = 800;
                  getPopupResponsive({
                      formURL: "/AcuerdoComercialEscalonado/RegistrarConfiguracionTarifaAcEscalonado",
                      title: "Detalle de tarifa Escalonada",
                      nombreDiv: "divPopupConfiguracionTarifaACE",
                      nombreGrid: "",
                      width: "980px",
                      height: altura,
                      params: {},
                      HideSelection: true,
                      multiSelect: false,
                      select: function (row) {
                          return true;
                      },
                      beforeShow: function (obj) {
                          $rootScope.hashPopup = $(obj).attr("mapurl");
                          $(obj).attr("ModoPagina", "Editar");
                          $compile($("#divPopupConfiguracionTarifaACE"))($scope);
                          var scopePopup = angular.element("#divPopupConfiguracionTarifaACE").scope();
                          scopePopup.row = JSON.parse(JSON.stringify(objReg));
                          scopePopup.rowOk = objReg;
                      }
                  });
              } else {
                  $(".caja11.msgerror.ListaTarifa").html("Línea es requerido.");
                  if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea == undefined) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  }
                  else if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
          }
          $scope.Guardar_Click = function () {
              //Sucursal
              var listaSucursalGrabar = [];
              var listaSucursales = $from($rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal).where("$idCheck==true").toArray();
              for (var x = 0; x < listaSucursales.length; x++) {
                  var objSucursalTmp = new Object();
                  objSucursalTmp.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado;
                  objSucursalTmp.CodigoSucursal = listaSucursales[x].Codigo;
                  objSucursalTmp.Accion = "I";
                  listaSucursalGrabar.push(objSucursalTmp);
              }
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar && $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado != 0) {
                  var listaEdit = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaSucursalEdit;
                  if (listaEdit.length > 0) {
                      for (var a = 0; a < listaEdit.length; a++) {
                          var exist = false;
                          for (var b = 0; b < listaSucursalGrabar.length; b++) {
                              if (listaSucursalGrabar[b].CodigoSucursal == listaEdit[a].CodigoSucursal
                                  && listaSucursalGrabar[b].CodigoAcuerdoComercialEscalonado == listaEdit[a].CodigoAcuerdoComercialEscalonado) {
                                  listaSucursalGrabar.splice(b, 1);
                                  exist = true;
                              }
                          }
                          if (!exist) {
                              var objSucursal = new Object();
                              objSucursal.CodigoAcuerdoComercialEscalonado = listaEdit[a].CodigoAcuerdoComercialEscalonado;
                              objSucursal.CodigoSucursal = listaEdit[a].CodigoSucursal;
                              objSucursal.Accion = "D";
                              listaSucursalGrabar.push(objSucursal);
                          }
                      }
                  }
              }

              //Terminal
              var listaTerminalGrabar = [];
              var listaTerminal = $from($rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario).where("$idCheck==true").toArray();
              for (var x = 0; x < listaTerminal.length; x++) {
                  var objTerminalTmp = new Object();
                  objTerminalTmp.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado;
                  objTerminalTmp.CodigoSucursal = listaTerminal[x].CodigoSucursal;
                  objTerminalTmp.CodigoTerminalPortuario = listaTerminal[x].CodigoAlmacen;
                  objTerminalTmp.Accion = "I";
                  listaTerminalGrabar.push(objTerminalTmp);
              }
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar && $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado != 0) {
                  var listaTerminalEdit = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.ListaTerminalPortuarioEdit;
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
                                  obtTerminal.CodigoAcuerdoComercialEscalonado = listaTerminalEdit[c].CodigoAcuerdoComercialEscalonado;
                                  obtTerminal.CodigoSucursal = listaTerminalEdit[c].CodigoSucursal;
                                  obtTerminal.CodigoTerminalPortuario = listaTerminalEdit[c].CodigoTerminalPortuario;
                                  obtTerminal.Accion = "D";
                                  listaTerminalGrabar.push(obtTerminal);
                              }
                          }
                      }
                  }
              }


              // Agregar

              var listaRate = [];
              var listaPuertos = [];
              var listaClientesMaster = [];
              var listaAgenteBlMaster = [];
              var listaClienteBlHome = [];
              var listaAgenteBlHome = [];
              var listaServicioNave = [];
              var listaServiciosBl = [];
              var listaDatosCarga = [];
              var listaTarifa = [];
              var listaConfiguracionPeriodo = [];
              var listaConfiguracionTarifasLigadas = [];
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Accion == "I") {
                  listaRate = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaRate, function (e) { return e.Accion != undefined; });
                  listaPuertos = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaPuertos, function (e) { return e.Accion != undefined; });
                  listaClientesMaster = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaClientesMaster, function (e) { return e.Accion != undefined; });
                  listaAgenteBlMaster = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLMaster, function (e) { return e.Accion != undefined; });
                  listaClienteBlHome = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome, function (e) { return e.Accion != undefined; });
                  listaAgenteBlHome = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome, function (e) { return e.Accion != undefined; });
                  listaServicioNave = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaServicioNave, function (e) { return e.Accion != undefined; });
                  listaServiciosBl = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaServiciosBL, function (e) { return e.Accion != undefined; });
                  listaDatosCarga = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga, function (e) { return e.Accion != undefined; });
                  listaTarifa = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa, function (e) { return e.Accion != undefined; });
              } else {
                  var listaRAGrilla = $rootScope.DatosFormulario.RegistroACEscalonado.ListaRate;
                  var listaRAGrillaMemoria = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList, function (e) { return e.Accion != undefined; });
                  for (var v = 0; v < listaRAGrilla.length; v++) {
                      if ($.inArray(listaRAGrilla[v], listaRAGrillaMemoria) > -1) {
                      } else {
                          listaRAGrillaMemoria.push(listaRAGrilla[v]);
                      }
                  }


                  listaRate = listaRAGrillaMemoria;//$.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList, function (e) { return e.Accion != undefined; });
                  listaPuertos = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList, function (e) { return e.Accion != undefined; });
                  listaClientesMaster = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList, function (e) { return e.Accion != undefined; });
                  listaAgenteBlMaster = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList, function (e) { return e.Accion != undefined; });
                  listaClienteBlHome = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList, function (e) { return e.Accion != undefined; });
                  listaAgenteBlHome = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList, function (e) { return e.Accion != undefined; });
                  listaServicioNave = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServicioNaveMemoriaList, function (e) { return e.Accion != undefined; });
                  listaServiciosBl = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaServiciosBLMemoriaList, function (e) { return e.Accion != undefined; });
                  listaDatosCarga = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaDatosCargaMemoriaList, function (e) { return e.Accion != undefined; });
                  listaTarifa = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList, function (e) { return e.Accion != undefined; });
              }

              //Periodo
              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria) {
                  $($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria).each(function (i) {
                      var listaTipoContenedorChecked = $.grep(this.ListaTipoContenedor, function (e) { return e.idCheck == true; });
                      $(listaTipoContenedorChecked).each(function (j) {
                          $($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria[i].ListaDetalleRango).each(function (k) {
                              var objInsert = new Object();
                              objInsert.CodigoTipoContenedor = listaTipoContenedorChecked[j].CodigoTipoContenedor;
                              objInsert.CodigoPeriodo = this.Periodo;
                              objInsert.NumeroDias = this.UnidadLibres;
                              objInsert.CodigoMoneda = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria[i].CodigoMoneda;
                              objInsert.Moneda = "";
                              objInsert.Precio = this.Precio;
                              objInsert.CodigoTarifaEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria[i].CodigoTarifaEscalonado;
                              objInsert.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria[i].CodigoAcuerdoComercialEscalonado;
                              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria[i].Accion == undefined) {
                                  objInsert.Accion = this.Accion;
                              } else {
                                  objInsert.Accion = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria[i].Accion;
                              }
                              listaConfiguracionPeriodo.push(objInsert);
                          });
                      });
                  });
              }
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado >= 0) {
                  var copyPeriodoList = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoSourceOriginal;
                  for (var v = 0; v < listaConfiguracionPeriodo.length; v++) {
                      var isExiste = false;
                      for (var z = 0; z < copyPeriodoList.length; z++) {
                          if (listaConfiguracionPeriodo[v].CodigoTarifaEscalonado == copyPeriodoList[z].CodigoTarifaEscalonado
                          && listaConfiguracionPeriodo[v].CodigoTipoContenedor == copyPeriodoList[z].CodigoTipoContenedor
                          && listaConfiguracionPeriodo[v].CodigoPeriodo == copyPeriodoList[z].CodigoPeriodo
                          && listaConfiguracionPeriodo[v].CodigoMoneda == copyPeriodoList[z].CodigoMoneda
                          && listaConfiguracionPeriodo[v].NumeroDias == copyPeriodoList[z].NumeroDias
                          && listaConfiguracionPeriodo[v].Precio == copyPeriodoList[z].Precio) {
                              isExiste = true;
                              break;
                          }
                      }
                      if (!isExiste) {
                          listaConfiguracionPeriodo[v].Accion = "I";
                      }
                  }
                  $(copyPeriodoList).each(function (a) {
                      var itemList = $.grep(listaConfiguracionPeriodo, function (e) {
                          return e.CodigoTarifaEscalonado == copyPeriodoList[a].CodigoTarifaEscalonado
                          && e.CodigoTipoContenedor == copyPeriodoList[a].CodigoTipoContenedor
                          && e.CodigoPeriodo == copyPeriodoList[a].CodigoPeriodo
                          && e.CodigoMoneda == copyPeriodoList[a].CodigoMoneda
                          && e.NumeroDias == copyPeriodoList[a].NumeroDias
                          && e.Precio == copyPeriodoList[a].Precio;
                      });
                      if (itemList.length <= 0) {
                          copyPeriodoList[a].Accion = "D";
                          listaConfiguracionPeriodo.push(copyPeriodoList[a]);
                      }
                  });
              }
              //Tarifa
              listaConfiguracionTarifasLigadas = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria, function (e) { return e.Accion != undefined; });


              //Seteo datos registro
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoSucursal = listaSucursalGrabar;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoSucursalTerminal = listaTerminalGrabar;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoRA = listaRate;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto = listaPuertos;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoClienteBLMaster = listaClientesMaster;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoAgenteBLMaster = listaAgenteBlMaster;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoClienteBLHouse = listaClienteBlHome;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoAgenteBLHouse = listaAgenteBlHome;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoServicioNave = listaServicioNave;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoServicioBL = listaServiciosBl;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoCarga = listaDatosCarga;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoTarifa = listaTarifa;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoTarifaPeriodo = listaConfiguracionPeriodo;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoTarifaLigada = listaConfiguracionTarifasLigadas;

              // MATCHCODE  
              var listaMatchcodeGrilla = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaMatchCode, function (e) { return e.Accion != undefined; });
              var listaMatchcodeMemoria = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaMatchCodeMemoriaList, function (e) { return e.Accion != undefined; });
              for (var v = 0; v < listaMatchcodeGrilla.length; v++) {
                  if ($.inArray(listaMatchcodeGrilla[v], listaMatchcodeMemoria) > -1) {
                  } else {
                      listaMatchcodeMemoria.push(listaMatchcodeGrilla[v]);
                  }
              }
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoMatchCode = listaMatchcodeMemoria;

              // PartidaArancelaria  
              var listaPartidaArancelariaGrilla = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaPartidaArancelaria, function (e) { return e.Accion != undefined; });
              var listaPartidaArancelariaMemoria = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPartidaArancelariaMemoriaList, function (e) { return e.Accion != undefined; });
              for (var v = 0; v < listaPartidaArancelariaGrilla.length; v++) {
                  if ($.inArray(listaPartidaArancelariaGrilla[v], listaPartidaArancelariaMemoria) > -1) {
                  } else {
                      listaPartidaArancelariaMemoria.push(listaPartidaArancelariaGrilla[v]);
                  }
              }
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPartidaArancelaria = listaPartidaArancelariaMemoria;


              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Accion != "I") {
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Accion = determinarAccion($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE);
              }


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






          $scope.Deshabilitar_Click = function () {
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado > 0) {
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.EstadoRegistro = false;
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Estado = "D";
                  $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Accion = "U";
                  MiConfirm("¿Está seguro de deshabilitar la Concesión Sobreestadía?.", function () {
                      $.ajax({
                          url: "/AcuerdoComercialEscalonado/DeshabilitarAcuerdoComercialEscalonado",
                          type: "POST",
                          headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                          data: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE,
                          dataType: "json",
                          cache: true,
                          async: false,
                          success: function (data) {
                              if (data.Result != null) {
                                  if (data.Result.Satisfactorio === true) {
                                      MiAlertOk("Se ha deshabilitado la Concesión Sobreestadía.", MiAlertOk_success);
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
          $scope.BuscarAutorizado_Click = function () {
              $rootScope.DatosFormulario.OpcionUsuario = "AcuerdoComercialEscalonado";
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
          $scope.BuscarTarifa_Click = function () {
              $rootScope.DatosFormulario.OpcionTarifaEscalonadaGenerales = "AcuerdoComercialEscalonado";
              getPopupResponsive({
                  formURL: "/TarifaEscalonada/BuscarTarifaEscalonadaGeneral",
                  title: "Buscar Tarifas Generales",
                  nombreDiv: "divPopupBuscarTarifaEscalonadaLigada",
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
                      $compile($("#divPopupBuscarTarifaEscalonadaLigada"))($scope);
                  }
              });
          }
          function actualizarMemoriaPuerto(objeItem) {
              for (var i = 0; i < $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList.length; i++) {
                  if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList[i].CodigoPuerto == objeItem.CodigoPuerto) {
                      if (objeItem.IdAcuerdoPuerto == $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList[i].IdAcuerdoPuerto) {
                          if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList[i].Accion != "D") {
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList[i].CodigoTipoPuerto = objeItem.CodigoTipoPuerto;
                              $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaPuertoMemoriaList[i].Accion = objeItem.Accion;
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
          function actualizarMemoriaTarifa(objeItem) {
              for (var i = 0; i < $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList.length; i++) {
                  if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList[i].CodigoTarifaEscalonado == objeItem.CodigoTarifaEscalonado) {
                      if ($rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList[i].Accion != "D") {
                          $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList[i].CodigoTipoDescuento = objeItem.CodigoTipoDescuento;
                          $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList[i].CodigoMonedaAcuerdo = objeItem.CodigoMonedaAcuerdo;
                          $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList[i].MontoAcuerdo = objeItem.MontoAcuerdo;
                          $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList[i].Accion = objeItem.Accion;
                      }
                  }
              }
          }

          $scope.CambiarRol_Change = function (objItem) {
              if (objItem.IdMatchCode > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
          }
          $scope.CambiarTipoDescuento_Change = function (objItem) {
              if (objItem.IdTarifa > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaTarifa(objItem);
              if (objItem.CodigoTipoDescuento == "E") {
                  objItem.MontoAcuerdo = 0;
                  $rootScope.HabilitarCamposTarifas(true, objItem.IdTarifa);
              }
              if (objItem.CodigoTipoDescuento == "D") {
                  $rootScope.HabilitarCamposTarifas(false, objItem.IdTarifa);
              }
              if (objItem.CodigoTipoDescuento == "P") {
                  $rootScope.HabilitarCamposTarifas(false, objItem.IdTarifa);
              }
          }
          $scope.CambiarMonedaAcuerdo_Change = function (objItem) {
              if (objItem.IdTarifa > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaTarifa(objItem);
          }
          $scope.CambiarTipoCobro_Change = function (objItem) {
              if (objItem.IdTarifa > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaTarifa(objItem);
          }
          $scope.CheckItem_Tarifas = function (objItem) {
              if (objItem.IdTarifa > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaTarifa(objItem);
          }

          $scope.CheckUnificar_Clieck = function (objItem) {
              if (objItem.IdTarifa > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaTarifa(objItem);
          }
          $rootScope.HabilitarCamposTarifas = function (flagHabilitar, id) {
              var lstcontrolsInput = $("#grillaAceListaTarifa").find('input[type="text"]');
              $.each(lstcontrolsInput, function (x, y) {

                  var objTemp = $(this).attr("ng-model").replace("root", "rootScope")
                  var indexFin = objTemp.lastIndexOf(".");
                  var objElementoGeneral = eval(objTemp.slice(0, indexFin));

                  if (objElementoGeneral.IdTarifa == id) {
                      if (flagHabilitar) {
                          $("#grillaAceListaTarifa").find(lstcontrolsInput[x]).attr('disabled', 'disabled');
                      } else {
                          $("#grillaAceListaTarifa").find(lstcontrolsInput[x]).removeAttr('disabled');
                      }
                  }
              });

          }
          $scope.CambiarValorDescuento_Change = function (objItem) {
              if (objItem.IdTarifa > 0) {
                  objItem.Accion = "U";
              } else {
                  objItem.Accion = "I";
              }
              actualizarMemoriaTarifa(objItem);
          }
          $scope.Salir_Click = function () {
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/busqueda/buscar-acescalonado/";
              }
              $rootScope.DatosFormulario.RegistroACEscalonado.FlagACEscalonado = true;
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
              var lstcontrolsInput = $("#grillaAceListaTarifa").find('input[type="text"]');
              $.each(lstcontrolsInput, function (x, y) {

                  var objTemp = $(this).attr("ng-model").replace("root", "rootScope")
                  var indexFin = objTemp.lastIndexOf(".");
                  var objElementoGeneral = eval(objTemp.slice(0, indexFin));

                  if (objElementoGeneral.CodigoTipoDescuento == "E") {
                      $("#grillaAceListaTarifa").find(lstcontrolsInput[x]).attr('disabled', 'disabled');
                  } else {
                      $("#grillaAceListaTarifa").find(lstcontrolsInput[x]).removeAttr('disabled');
                  }
              });
          }
          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaListaSucursales");
              arrayGrillas.push("grillaListaTerminalPortuario");
              arrayGrillas.push("grillaAceListaRate");
              arrayGrillas.push("grillaAceListaPuertos");
              arrayGrillas.push("grillaAceListaClienteBLMaster");
              arrayGrillas.push("grillaAceListaAgenteBLMaster");
              arrayGrillas.push("grillaAceListaClienteBLHome");
              arrayGrillas.push("grillaAceListaAgenteBLHome");
              arrayGrillas.push("grillaAceListaServicioNave");
              arrayGrillas.push("grillaAceListaServiciosBL");
              arrayGrillas.push("grillaAceListaDatosCarga");
              arrayGrillas.push("grillaAceListaTarifa");
              arrayGrillas.push("grillaAceListaMatchCode");
              arrayGrillas.push("grillaAceListaPartidaArancelaria");

              var arrayContentFechas = new Array();
              arrayContentFechas.push("VigenciaFrm");
              arrayContentFechas.push("frmACE_DatosGenerales");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, arrayContentFechas);
              if ($scope.FlagEditing) {
                  $("#grillaAceListaRate_pager_left").show();
              } else {
                  $("#grillaAceListaRate_pager_left").hide();
              }
              $rootScope.HabilitarCampoRate();

              var arrayGrillaPuerto = new Array();
              arrayGrillaPuerto.push("grillaAceListaPuertos");
              DeshabilitarSelectGrilla(arrayGrillaPuerto);
          }
          $rootScope.HabilitarCampoRate = function () {
              var lstcontrolsInput = $("#grillaAceListaRate").find('input[type="text"]');
              $.each(lstcontrolsInput, function (x, y) {
                  if ($(lstcontrolsInput[x]).val().length <= 0) {
                      $("#grillaAceListaRate").find(lstcontrolsInput[x]).removeAttr('disabled');
                  }
                  else {
                      $("#grillaAceListaRate").find(lstcontrolsInput[x]).attr('disabled', 'disabled');
                  }
              });
          }
          $scope.AgregarTerminalPortuarioTarifaLocalTodos = function () {

              var codLinea = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea;
              var codSucursal = "";
              var lstTerminal = ObtenerTerminalesByLinea(codLinea, codSucursal);

              var LstTemp = $.extend(true, [], $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario);

              $.each(lstTerminal, function (x) {
                  var CodigoAlmacen = this.CodigoAlmacen;
                  var existe = $.grep(LstTemp, function (e) { return e.CodigoAlmacen == CodigoAlmacen; });
                  if (existe.length == 0) {
                      $rootScope.DatosFormulario.RegistroACEscalonado.ListaTerminalPortuario.push(this);
                      $scope.gridapiListaTerminalPortuario.insertRange(this);
                  }

              });
          }
          $scope.Historial_Click = function () {
              getPopupResponsive({
                  formURL: "es-PE/sistema/historial/acuerdo-comercial-escalonado/",
                  title: "Historial",
                  nombreDiv: "divPopupHistorialACEscalonado",
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
                      $compile($("#divPopupHistorialACEscalonado"))($scope);
                  }
              });
          }
          $scope.MinimizarBloques = function () {
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

              //nurvo
              $("#seccion-13").find(".block_cab").removeClass("block_cab_active");
              $("#seccion-13").find(".block_content").attr('style', 'display: none');

              $("#seccion-14").find(".block_cab").removeClass("block_cab_active");
              $("#seccion-14").find(".block_content").attr('style', 'display: none');
          }
          function determinarAccion(objGrabar) {
              var actionU = "U";
              var actionN = "N";
              var viewInitialData = $rootScope.DatosFormulario.RegistroACEscalonado.AceRecoverOriginalDataView;
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
                  else if (objGrabar.InicioVigencia != viewInitialData.InicioVigencia) {
                      return actionU;
                  }
                  else if (objGrabar.FinVigencia != viewInitialData.FinVigencia) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTipoCondicion != viewInitialData.CodigoTipoCondicion) {
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
                  url: "/AcuerdoComercialEscalonado/GrabarAcuerdoComercial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.Accion == 'I') {
                                  MiAlertOk("Se ha grabado correctamente la Concesión Sobreestadía. N°" + data.CodigoAcuerdoComercialEscalonado, MiAlertOk_success);
                              } else {
                                  MiAlertOk("Se ha actualizado correctamente la Concesión Sobreestadía. N°" + data.CodigoAcuerdoComercialEscalonado, MiAlertOk_success);
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
          function MiAlertOk_success() {
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/busqueda/buscar-acescalonado/";
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
          function limpiarControlesValidados() {
              $(".caja11.msgerror.FechaInicio").html("");
              $(".caja11.msgerror.FechaFin").html("");
              $(".caja11.msgerror.FechaAutorizacion").html("");
              $(".caja11.listaRate").html("");
              $(".caja11.listaSucursal").html("");
              $(".caja11.msgerror.CodigoUsuarioAutorizador").html("");
              $(".caja11.msgerror.listaRate").html("");
          }
          function validacionesCamposGuardar() {
              limpiarControlesValidados();
              miBlock(true, "#html");
              var salida = true;
              if (validateForm("#frmACE_DatosGenerales") == false) {
                  miBlock(false, "#html");
                  salida = false;
              }

              if (validateForm("#frmACE_Rate") == false) {
                  miBlock(false, "#html");
                  salida = false;
              }

              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              var vCodigoUsuarioAutorizador = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoUsuarioAutorizador;
              if (vCodigoUsuarioAutorizador == undefined) {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("Autorizado Por debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("");
              }

              var listaSucursales = $from($rootScope.DatosFormulario.RegistroACEscalonado.ListaSucursal).where("$idCheck==true").toArray();;
              if (listaSucursales.length <= 0) {
                  $(".caja11.msgerror.listaSucursal").html("Debe seleccionar por lo menos una Sucursal.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaSucursal").html("");
              }

              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.FechaAutorizacion) {

              } else {
                  $(".caja11.msgerror.FechaAutorizacion").html("Fecha Autorización es requerido.");
                  salida = false;
              }

              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga.length == 0) {

                  if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.InicioVigencia) {

                  } else {
                      $(".caja11.msgerror.FechaInicio").html("Fecha Inicio Vigencia es requerido.");
                      salida = false;
                  }

                  if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.FinVigencia) {

                  } else {
                      $(".caja11.msgerror.FechaFin").html("Fecha Fin Vigencia es requerido.");
                      salida = false;
                  }
              } else {
                  $(".caja11.msgerror.FechaInicio").html("");
                  $(".caja11.msgerror.FechaFin").html("");
              }

              if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaRate.length > 1) {
                  $.each($rootScope.DatosFormulario.RegistroACEscalonado.ListaRate, function (x) {
                      if ($from($rootScope.DatosFormulario.RegistroACEscalonado.ListaRate).where("$CodigoRA=='" + this.CodigoRA + "'").toArray().length > 1) {
                          $(".caja11.msgerror.listaRate").html("No puede existir Rate Agreement repetidos.");
                          salida = false;
                      }

                  });
              }
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto.length > 0) {
                  var isInco = false;
                  for (var a = 0; a < $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto.length; a++) {
                      if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto[a].CodigoTipoPuerto == undefined) {
                          isInco = true;
                      } else if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto[a].CodigoTipoPuerto == null) {
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

              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto.length > 1) {
                  $.each($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto, function (x) {
                      if ($from($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoPuerto).where("$CodigoPuerto=='" + this.CodigoPuerto + "'&$CodigoTipoPuerto=='" + this.CodigoTipoPuerto + "'").toArray().length > 1) {
                          $(".caja11.msgerror.listaPuertos").html("No puede existir puertos con el mismo codigo y tipo.");
                          salida = false;
                      }

                  });
              }

              var objVal = validarTarifas($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa);
              if (objVal.salida) {
                  $(".caja11.msgerror.ListaTarifa").html("");
              } else {
                  $(".caja11.msgerror.ListaTarifa").html(objVal.mensaje);
                  salida = false;
              }

              // MAtchCode ------
              //var LsMatchCode =$rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoMatchCode;

              var listaMatchcodeGrilla = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaMatchCode, function (e) { return e.Accion == undefined; });
              var listaMatchcodeMemoria = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoMatchCode, function (e) { return e.Accion != "D"; });
              for (var v = 0; v < listaMatchcodeGrilla.length; v++) {
                  if ($.inArray(listaMatchcodeGrilla[v], listaMatchcodeMemoria) > -1) {
                  } else {
                      listaMatchcodeMemoria.push(listaMatchcodeGrilla[v]);
                  }
              }
              if (validarRolMatchCode(listaMatchcodeMemoria)) {
                  miBlock(false, "#html");
                  salida = false;
              }

              return salida;
          }
          function validarTarifas(listdata) {
              var msj = new Object();
              msj.salida = true;
              msj.mensaje = "";
              if (listdata.length > 0) {
                  var isTarifa = false;
                  var isConfigurar = false;

                  if (($.grep(listdata, function (e) { return e.CodigoTipoDescuento == undefined || e.CodigoTipoDescuento == null; })).length > 0) {
                      isTarifa = true;
                  }
                  else if (($.grep(listdata, function (e) { return e.MontoAcuerdo == undefined || e.MontoAcuerdo == null; })).length > 0) {
                      isTarifa = true;
                  }
                  else if (($.grep(listdata, function (e) { return e.CodigoMonedaAcuerdo == undefined || e.CodigoMonedaAcuerdo == null; })).length > 0) {
                      isTarifa = true;
                  }
                  else if (($.grep(listdata, function (e) { return e.CodigoTipoCobro == undefined || e.CodigoTipoCobro == null; })).length > 0) {
                      isTarifa = true;
                  }

                  //Nueva Validacion JALEJOS 18/08/2016  -----------------------------------
                  /*for (var a = 0; a < listdata.length; a++) {
                      if (($.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria, function (e) { return e.CodigoTarifaEscalonado == listdata[a].CodigoTarifaEscalonado; })).length <= 0) {
                          isConfigurar = true;
                          break;
                      }

                  }
                  */
                  for (var a = 0; a < listdata.length; a++) {

                      var ListaPeriodoMemoriaTemp = new Object();
                      ListaPeriodoMemoriaTemp = [];
                      ListaPeriodoMemoriaTemp = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria, function (e) { return e.CodigoTarifaEscalonado == listdata[a].CodigoTarifaEscalonado; });
                      if (ListaPeriodoMemoriaTemp.length <= 0) {
                          isConfigurar = true;
                          break;
                      }
                      else {
                          var ValidarPeriodo = false;
                          $.each(ListaPeriodoMemoriaTemp, function (x) {
                              var ListaDetalleRangoTemp = new Object();
                              ListaDetalleRangoTemp = [];
                              ListaDetalleRangoTemp = this.ListaDetalleRango;

                              $.each(ListaDetalleRangoTemp, function (z) {
                                  if (this.Periodo != 0) {
                                      ValidarPeriodo = true;
                                      return false;
                                  }
                              });
                          });

                          if (ValidarPeriodo) {
                              if (listdata[a].FlagNuevoCalculo == true) {
                                  msj.mensaje = "La tarifa cuenta con más de un periodo, no se puede autocompletar.";
                                  msj.salida = false;
                              }
                          } else {
                              if (listdata[a].FlagNuevoCalculo == false) {
                                  msj.mensaje = "La tarifa solo posee días libres debe autocompletar o aumentar periodos.";
                                  msj.salida = false;
                              }
                          }


                      }

                  }
                  //----------------------------------------------



                  if (isTarifa) {
                      if (isConfigurar) {
                          msj.mensaje = "Debe seleccionar o ingresar los siguientes datos: Tipo Dscto, Moneda,Valor Tarifa y Tipo Cobro, asimismo debe configurar todas las tarifas.";
                      } else {
                          msj.mensaje = "Debe seleccionar o ingresar los siguientes datos: Tipo Dscto, Moneda, Valor Tarifa y Tipo Cobro.";
                      }
                      msj.salida = false;
                  } else {
                      if (isConfigurar) {
                          msj.mensaje = "Debe configurar todas las tarifas.";
                          msj.salida = false;
                      }
                  }



              }
              else {
                  if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa.length <= 0) {
                      msj.mensaje = "Debe agregar una tarifa.";
                      msj.salida = false;
                  }
              }
              return msj;
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          $scope.ChangeLineaNaviera = function (codigoLinea) {
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar) {
                  var listaBaseMemoria = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria;
                  var listaBase = [];
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].IdPeriodo > 0) {
                          listaBaseMemoria[x].Accion = "D";
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria = listaBase;
              } else {
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria = [];
              }
              // ConfiguracionSecciones("ConcesionEscalonada",codigoLinea); JM
              var objConfiguracion = ConfiguracionSecciones("ConcesionEscalonada", codigoLinea);
              $scope.RequeridoPorSeccionVisible(objConfiguracion, codigoLinea);


              $scope.CargarSucursal();
          }
          function validarRolMatchCode(ListaMatchCode) {
              var Existe = false;
              var ListaBuscarDuplicados = $.extend(true, [], ListaMatchCode);
              $(".caja11.ListaClienteMatchcode").html("");
              if (ListaMatchCode.length > 0) {
                  for (var a = 0; a < ListaMatchCode.length; a++) {
                      if (ListaMatchCode[a].Rol != "" && ListaMatchCode[a].Rol != undefined) {
                          var lsDuplicados = $.grep(ListaBuscarDuplicados, function (e) { return e.CodigoMatchCode == ListaMatchCode[a].CodigoMatchCode && e.Rol == ListaMatchCode[a].Rol; });
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
              //if (($.grep(listdata, function (e) { return e.CodigoTipoCobro == undefined || e.CodigoTipoCobro == null; })).length > 0) {
          }



          $scope.RequeridoPorSeccionVisible = function (obj, codigoLinea) {
              $scope.FlagMostrarValidateRateAgreement = false;
              $scope.FlagMostrarValidateMatchCodeCliente = false;
              $scope.FlagMostrarValidateContenedorBL = false;
              $scope.SeccionTituloRate = "";
              $scope.SeccionTituloMatchCodeCliente = "";
              $scope.SeccionTituloContenedorBL = "";

              if (obj != undefined) {

                  var lstConfiguracionLinea = $.grep(obj.ConfiguracionLinea, function (e) { return e.CodigoLinea == codigoLinea; });
                  if (lstConfiguracionLinea.length > 0) {

                      var lstConfiguracion = $.grep(obj.ConfiguracionLineaPantallaSeccion, function (e) { return e.CodigoPantalla == "ConcesionEscalonada" && e.CodigoConfiguracion == lstConfiguracionLinea[0].CodigoConfiguracion; });

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

                      });
                  }
              }
          }


          function validarSeccionRequerido() {
              var mensaje = "Debe Ingresar : ";
              var flagMostraMensajeValidacion = false;

              if ($scope.FlagMostrarValidateRateAgreement) {
                  var listaAceRA = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoRA, function (e) { return e.Accion != "D"; });
                  if (listaAceRA.length == 0) {
                      flagMostraMensajeValidacion = false;
                      mensaje = mensaje + " " + $scope.SeccionTituloRate + " ó";
                  } else {
                      flagMostraMensajeValidacion = true;
                  }
              }

              if ($scope.FlagMostrarValidateMatchCodeCliente) {
                  if (!flagMostraMensajeValidacion) {
                      var listaAceMatchCode = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoMatchCode, function (e) { return e.Accion != "D"; });
                      if (listaAceMatchCode.length == 0) {
                          flagMostraMensajeValidacion = false;
                          mensaje = mensaje + " " + $scope.SeccionTituloMatchCodeCliente + " ó";
                      } else {
                          flagMostraMensajeValidacion = true;
                      }
                  }
              }


              if ($scope.FlagMostrarValidateContenedorBL) {
                  if (!flagMostraMensajeValidacion) {
                      //var listaAceCarga = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.ListaAcuerdoComercialEscalonadoCarga, function (e) { return e.Accion != "D"; });
                      var listaAceCarga = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaDatosCarga, function (e) { return e.Accion != "D"; });
                      if (listaAceCarga.length == 0) {
                          flagMostraMensajeValidacion = false;
                          mensaje = mensaje + " " + $scope.SeccionTituloContenedorBL + " ó";
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