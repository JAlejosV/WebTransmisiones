(function () {
    angular.module('api')
    .controller('RegistroTarifaLocalController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLocal == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLocal.DataCombos == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos = new Object();
              //Temporales Memoria
              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = [];

              if ($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaVigenciaMemList == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaVigenciaMemList = [];

              if ($rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursalEdit == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursalEdit = [];
              if ($rootScope.DatosFormulario.DatosTarifaLocal.ListaTerminalPortuarioEdit == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLocal.ListaTerminalPortuarioEdit = [];
              //var user = $scope.Menus.NombreUsuario;
              //Fin temporal

              var paramCodigoTarifaLocal = getUrlVars()["codigoTarifaLocal"];
              if (paramCodigoTarifaLocal) {
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.TarifaLocalFlagEditar = true;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal = paramCodigoTarifaLocal;
              }
              $("#grillaListaSucursales_pager_left").attr("style", "display:none");
              $("#grillaListaTerminalPortuario_pager_left").attr("style", "display:none");
              $("#gview_grillaListaSucursales").find(".ui-jqgrid-bdiv .msgnuay").attr("style", "display:none");
              $("#gview_grillaListaTerminalPortuario").find(".ui-jqgrid-bdiv .msgnuay").attr("style", "display:none");
              $("span:contains('Undefined template')").remove();

              $scope.CargarDatosIniciales();
              $("#RangoFecha").prop("checked", true);

              var esEditar = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.TarifaLocalFlagEditar;

              if (esEditar) {
                  $scope.FlagMostrarBotonModificar = true;
                  $scope.FlagMostrarBotonHistorial = true;
                  $scope.FlagMostrarBotonDeshabilitar = true;
                  $scope.FlagMostrarBotonGuardar = false;
                  $scope.CargaInicialTarifaLocal();
                  $scope.FlagEditing = false;
                  ;
              } else {
                  $scope.FlagMostrarBotonGuardar = true;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal = 0;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.EstadoRegistro = "Activo";
                  $scope.FlagEditing = true;
              }
              $rootScope.DatosFormulario.ExisteVigencia = false;
              ObservadorAtributos();
              $scope.EditingGrillas();
          });

          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/TarifaPlana/GrabarTarifaLocalCargaInicial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaLineas = data.Linea;
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoLinea = $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaLineas[0].Codigo
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Habilitado = 'False';
                          }
                      }
                      $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaMoneda = data.Moneda;
                      $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal = new Object();
                      //$rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal = data.Sucursal;
                      $scope.CargarSucursal();
                     
                  }
              });
          }

          $scope.CargaInicialTarifaLocal = function () {
              var param = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal;
              $.ajax({
                  url: "/TarifaPlana/ConsultarDetalleTarifaLocal",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoTarifaLocal=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.DetalleTarifaLocalList.length > 0) {
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoConcepto = data.DetalleTarifaLocalList[0].CodigoConcepto;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoLinea = data.DetalleTarifaLocalList[0].CodigoLinea;
                              //$rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoMoneda = data.DetalleTarifaLocalList[0].CodigoMoneda;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoRegimen = data.DetalleTarifaLocalList[0].CodigoRegimen;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifa = data.DetalleTarifaLocalList[0].CodigoTarifa;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal = data.DetalleTarifaLocalList[0].CodigoTarifaLocal;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoUsuarioAutorizador = data.DetalleTarifaLocalList[0].CodigoUsuarioAutorizador;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.EstadoRegistro = data.DetalleTarifaLocalList[0].EstadoRegistro;
                              //$rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Monto = data.DetalleTarifaLocalList[0].Monto;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.UsuarioCreacion = data.DetalleTarifaLocalList[0].UsuarioCreacion;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.UnidadCalculo = data.DetalleTarifaLocalList[0].UnidadCalculo;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Regimen = data.DetalleTarifaLocalList[0].Regimen;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.DescripcionTarifa = data.DetalleTarifaLocalList[0].DescripcionTarifa;
                              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Autorizado = data.DetalleTarifaLocalList[0].Autorizado;

                              //Copy
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.CodigoConcepto = data.DetalleTarifaLocalList[0].CodigoConcepto;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.CodigoLinea = data.DetalleTarifaLocalList[0].CodigoLinea;
                              //$rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.CodigoMoneda = data.DetalleTarifaLocalList[0].CodigoMoneda;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.CodigoRegimen = data.DetalleTarifaLocalList[0].CodigoRegimen;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.CodigoTarifa = data.DetalleTarifaLocalList[0].CodigoTarifa;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.CodigoTarifaLocal = data.DetalleTarifaLocalList[0].CodigoTarifaLocal;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.CodigoUsuarioAutorizador = data.DetalleTarifaLocalList[0].CodigoUsuarioAutorizador;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.EstadoRegistro = data.DetalleTarifaLocalList[0].EstadoRegistro;
                              //$rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.Monto = data.DetalleTarifaLocalList[0].Monto;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.UsuarioCreacion = data.DetalleTarifaLocalList[0].UsuarioCreacion;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.UnidadCalculo = data.DetalleTarifaLocalList[0].UnidadCalculo;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.Regimen = data.DetalleTarifaLocalList[0].Regimen;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.DescripcionTarifa = data.DetalleTarifaLocalList[0].DescripcionTarifa;
                              $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView.Autorizado = data.DetalleTarifaLocalList[0].Autorizado;
                              //fin Copy

                              if (data.DetalleTarifaLocalList[0].EstadoRegistro != "Activo") {
                                  $scope.FlagMostrarBotonModificar = false;
                                  $scope.FlagMostrarBotonDeshabilitar = false;
                              }
                              //Distribucion: Solucion temporal
                              $rootScope.DatosFormulario.DatosTarifaLocal.ListaDistribucionTarifas = data.DetalleTarifaLocalList[0].DistribucionTarifaList;

                              //Tarifa Ligada
                              if (data.DetalleTarifaLocalList[0].TarifaLocalLigadaList.length > 0) {
                                  for (var ed = 0; ed < data.DetalleTarifaLocalList[0].TarifaLocalLigadaList.length; ed++) {
                                      data.DetalleTarifaLocalList[0].TarifaLocalLigadaList[ed].IdConfiguracionTarifaLigada = ed + 1;
                                  }
                                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = data.DetalleTarifaLocalList[0].TarifaLocalLigadaList;
                                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = data.DetalleTarifaLocalList[0].TarifaLocalLigadaList;
                              }


                              //Sucursal
                              if (data.DetalleTarifaLocalList[0].TarifaLocalSucursalList.length > 0) {
                                  for (var number = 0; number < data.DetalleTarifaLocalList[0].TarifaLocalSucursalList.length; number++) {
                                      for (var z = 0; z < $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal.length; z++) {
                                          if ($rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal[z].Codigo == data.DetalleTarifaLocalList[0].TarifaLocalSucursalList[number].Codigo) {
                                              $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal[z].idCheck = true;
                                              $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal[z].Accion = "U";
                                              $scope.CheckItem_Sucursal($rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal[z]);
                                          } else {
                                              $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal[z].Accion = "";
                                          }
                                      }
                                  }
                                  $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursalEdit = data.DetalleTarifaLocalList[0].TarifaLocalSucursalList;
                              }
                              //Terminal portuario
                              if (data.DetalleTarifaLocalList[0].TarifaLocalSucursalTerminalList.length > 0) {
                                  for (var m = 0; m < data.DetalleTarifaLocalList[0].TarifaLocalSucursalTerminalList.length; m++) {
                                      for (var y = 0; y < $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario.length; y++) {
                                          if ($rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario[y].CodigoSucursal == data.DetalleTarifaLocalList[0].TarifaLocalSucursalTerminalList[m].CodigoSucursal
                                              && $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario[y].CodigoAlmacen == data.DetalleTarifaLocalList[0].TarifaLocalSucursalTerminalList[m].CodigoAlmacen) {
                                              $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario[y].idCheck = true;
                                              $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario[y].Accion = "U";
                                          } else {
                                              $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario[y].Accion = "";
                                          }
                                      }
                                  }
                                  $rootScope.DatosFormulario.DatosTarifaLocal.ListaTerminalPortuarioEdit = data.DetalleTarifaLocalList[0].TarifaLocalSucursalTerminalList;
                              }

                              //Vigencia
                              for (var v = 0; v < data.DetalleTarifaLocalList[0].TarifaLocalVigenciaList.length; v++) {
                                  data.DetalleTarifaLocalList[0].TarifaLocalVigenciaList[v].InicioVigencia = data.DetalleTarifaLocalList[0].TarifaLocalVigenciaList[v].InicioVigenciaValor;
                              }

                              $rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia = data.DetalleTarifaLocalList[0].TarifaLocalVigenciaList;
                              $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaVigenciaMemList = data.DetalleTarifaLocalList[0].TarifaLocalVigenciaList;

                              //Setear a grillas
                              $scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal);
                              $scope.gridapiListaTerminalPortuario.refresh($rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario);
                              $scope.gridapigrillaListaTarifaLigada.refresh($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria);
                              $scope.gridapigrillaDistribucionTarifas.refresh($rootScope.DatosFormulario.DatosTarifaLocal.ListaDistribucionTarifas);
                              $scope.gridapigrillaVigenciaTarifaLocal.refresh($rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia);
                              $rootScope.$apply();
                          }
                      }
                  }
              });
          }
          
          $scope.CargarSucursal = function () {
             var codLinea = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoLinea;
             $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal = ObtenerSucursalesByLinea(codLinea);
             $scope.Grid_DataBind("DetalleSucursal", $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal);
             $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario = [];
             $scope.Grid_DataBind("DetalleTerminalPortuario", $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario);
          }

          $scope.Grid_DataBind = function (grid, data) {
              if (grid == "DetalleSucursal") {
                  $scope.gridapiListaSucursales.refresh(data);
              }
              if (grid == "DetalleTerminalPortuario") {
                  $scope.gridapiListaTerminalPortuario.refresh(data);
              }
              if (grid == "ListaTarifaLigada") {
                  $scope.gridapigrillaListaTarifaLigada.refresh(data);
              }              
              if (grid == "ListaDistribucion") {
                  $scope.gridapigrillaDistribucionTarifas.refresh(data);
              }
              if (grid == "grillaVigenciaTarifaLocal") {
                  $scope.gridapigrillaVigenciaTarifaLocal.refresh(data);
              }

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
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 100);
              if (idgrilla == "grillaListaSucursales") {
                  $.each($rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal, function (x) { this.idCheck = check; });
                  if (check) {
                      $scope.AgregarTerminalPortuarioTarifaLocalTodos();
                  }
                  else {
                      $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario = [];
                      $scope.gridapiListaTerminalPortuario.clear();
                  }
              }
              if (idgrilla == "grillaListaTerminalPortuario") {
                  $.each($rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario, function (x) { this.idCheck = check; });
              }
          }

          $scope.BuscarTarifa_Click = function () {
              var altura = 800;
              getPopupResponsive({
                  formURL: "BuscarTarifa/BuscarTarifa",
                  title: "Buscar Tarifa",
                  nombreDiv: "divPopupBuscarTarifa",
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
                      $rootScope.DatosFormulario.OpcionTarifa = "TarifaLocal";
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarTarifa"))($scope);
                  }
              });
          }

          AbrirPopup_ConfiguracionTarifaLigada = function (tipo, rowObject) {
              $rootScope.DatosFormulario.OpcionTarifaLigada = "TarifaLocal";
              var altura = 800;
              getPopupResponsive({
                  formURL: "ConfiguracionTarifaLigada/ConfigurarTarifaLigada",
                  title: "Configuración de Tarifa Ligada",
                  nombreDiv: "divPopupAgregarTarifaLida",
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
                      $(obj).attr("ModoPagina", tipo);
                      $compile($("#divPopupAgregarTarifaLida"))($scope);
                      var scopePopup = angular.element("#divPopupAgregarTarifaLida").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(rowObject));
                      scopePopup.rowOk = rowObject;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }
          $scope.AgregarVigencia_Click = function () {
              $rootScope.DatosFormulario.ExisteVigencia = false;
              var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia, "CodigoTarifaLocalVigencia");
              $scope.gridapigrillaVigenciaTarifaLocal.insertRange([
                        {
                            CodigoTarifaLocalVigencia: nuevoId>0?-nuevoId:nuevoId,
                            CodigoTarifaLocal: null,
                            InicioVigencia: null,
                            CodigoMoneda: null,
                            Monto: null,
                            EstadoRegistro: true,
                            Accion: "I"
                        }
              ]);
          }
          $scope.QuitarVigencia = function (codigoTarifaLocalVigencia) {
              MiConfirm("¿Está seguro de eliminar la vigencia?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia;
                  var listaBaseMemoria = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaVigenciaMemList;
                  var listaGrilla = [];
                  var listaBase = [];
                  for (var x = 0; x < listaGrillaMemoria.length; x++) {
                      if (listaGrillaMemoria[x].CodigoTarifaLocalVigencia != codigoTarifaLocalVigencia) {
                          listaGrilla.push(listaGrillaMemoria[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].CodigoTarifaLocalVigencia == codigoTarifaLocalVigencia) {
                          if (listaBaseMemoria[x].CodigoTarifaLocalVigencia > 0) {
                              listaBaseMemoria[x].Accion = "U";
                              listaBaseMemoria[x].EstadoRegistro = false;
                              listaBase.push(listaBaseMemoria[x]);
                          }
                      } else {
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia = listaGrilla;
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaVigenciaMemList = listaBase;
                  $scope.Grid_DataBind("grillaVigenciaTarifaLocal", listaGrilla);

                  var listaMemoriaLigada = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList, function (e) { return e.CodigoTarifaLocalVigencia != codigoTarifaLocalVigencia; });
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = listaMemoriaLigada;
                  refrescarGrillaVigencia();
                  tarifasLigadasByVigencia(null);
                  $rootScope.$apply();
              });
          }
          function tarifasLigadasByVigencia(codigoTarifaLocalVigencia) {
              var listaMostrarTarifaLigada = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList, function (e) { return e.CodigoTarifaLocalVigencia == codigoTarifaLocalVigencia; });
              $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = listaMostrarTarifaLigada;
              $scope.gridapigrillaListaTarifaLigada.refresh(listaMostrarTarifaLigada);
              $scope.$apply();
          }

          function recuperarTarifasLigadasByVigencia(codigoTarifaLocalVigencia) {
              if (codigoTarifaLocalVigencia != undefined) {
                  $.ajax({
                      url: "/TarifaPlana/ConsultaTarifaLigadaXVigencia",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "codigoTarifaLocalVigencia=" + codigoTarifaLocalVigencia+"&&codigoLinea="+$rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoLinea,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          if (data != null) {
                              if (data.ListaTarifaLocalLigada.length > 0) {
                                  var firstListLigadas = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList;
                                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = firstListLigadas.concat(data.ListaTarifaLocalLigada);;
                                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = data.ListaTarifaLocalLigada;
                                  $scope.gridapigrillaListaTarifaLigada.refresh(data.ListaTarifaLocalLigada);
                              } else {
                                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = [];
                                  $scope.gridapigrillaListaTarifaLigada.refresh([]);
                              }
                              $scope.$apply();
                          }
                      }
                  });
              }
          }
          $scope.GrillaClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
              $rootScope.DatosFormulario.ExisteVigencia = true;
              var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
              var objVigencia = obtenerObjetoAngular(data.CodigoTarifaLocalVigencia);
              $(jQuery("#" + obj.id).find("[id='" + rowid + "']")[0]).find("td").each(function () {
                  this.style.setProperty('background', '#58AADC', 'important');
              });
              jQuery("#" + obj.id).find("tr").each(function () {
                  var objTd = $(this);
                  if (objTd.attr("id") != rowid) {
                      objTd.find("td").each(function () {
                          this.style.setProperty('background', 'transparent', 'important');
                      });
                  }
              });
              var lstLigada = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList, function (e) { return e.CodigoTarifaLocalVigencia == objVigencia.CodigoTarifaLocalVigencia; });
              if (lstLigada.length <= 0) {
                  if (objVigencia.CodigoTarifaLocalVigencia > 0) {
                      recuperarTarifasLigadasByVigencia(objVigencia.CodigoTarifaLocalVigencia);
                  }
                  else
                  {
                    $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = [];
                    $scope.gridapigrillaListaTarifaLigada.refresh([]);
                  }
              } else {
                  tarifasLigadasByVigencia(objVigencia.CodigoTarifaLocalVigencia);
              }
          }

          $scope.AgregarTarifaLigada_Click = function () {
              var codigoTarifaLocalVigencia = obtenerCodigoVigencia();
              var objVigencia = obtenerObjetoAngular(codigoTarifaLocalVigencia);

              if ($rootScope.DatosFormulario.ExisteVigencia) {
                  $(".caja11.msgerror.ListaVigencia").html("");
                  var newItem = new Object();
                  var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria, "IdConfiguracionTarifaLigada");
                  newItem = {
                      IdConfiguracionTarifaLigada: nuevoId,
                      CodigoTarifaLocalVigencia: objVigencia.CodigoTarifaLocalVigencia,
                      CodigoTarifa: null,
                      CodigoTarifaLigadaLocal: null,
                      DescripcionTarifaLocal: null,
                      CodigoTarifaLocal: $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal,
                      MonedaTarifaLocal: null,
                      MontoTarifaLocal: null,
                      DescripcionConfiguracionTarifaLigada: null,
                      Porcentaje: null,
                      CodigoMoneda: null,
                      Moneda: null,
                      Monto: null,
                      CodigoConfiguracionTarifaLigada: null,
                      CodigoMonedaTarifaLigada: null
                  }
                  AbrirPopup_ConfiguracionTarifaLigada("Nuevo", newItem);
              } else {
                  $(".caja11.msgerror.ListaVigencia").html("Debe seleccionar por lo menos una vigencia.");
              }

          }

          
          function refrescarGrillaVigencia() {
              jQuery("#grillaVigenciaTarifaLocal").find("tr").each(function () {
                  var objTd = $(this);
                  objTd.find("td").each(function () {
                      this.style.setProperty('background', 'transparent', 'important');
                  });

              });
          }

          function obtenerObjetoAngular(valor) {
              var objTemp = valor.replace("root", "rootScope");
              var indexFin = objTemp.lastIndexOf(".");
              var obj = eval(objTemp.slice(2, indexFin));
              return obj;
          }
          function obtenerCodigoVigencia() {
              var rowKey = jQuery("#grillaVigenciaTarifaLocal").jqGrid('getGridParam', 'selrow');
              if (rowKey == undefined) {
                  return "";
              } else {
                  var rowObject = jQuery('#grillaVigenciaTarifaLocal').getRowData(rowKey);
                  return rowObject.CodigoTarifaLocalVigencia;
              }
          }

          $scope.Modificar_Click = function () {
              $scope.FlagMostrarBotonGuardar = true;
          }

          $scope.Historial_Click = function () {
              var altura = 800;
              getPopupResponsive({
                  formURL: "TarifaPlana/HistorialTarifaLocal",
                  title: "Historial",
                  nombreDiv: "divPopupHistorialTarifaLocal",
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
                      $compile($("#divPopupHistorialTarifaLocal"))($scope);
                  }
              });
          }

          $scope.BuscarAutorizado_Click = function () {
              var altura = 800;
              getPopupResponsive({
                  formURL: "SeguridadAgma/BuscarUsuario",
                  title: "Buscar Usuario",
                  nombreDiv: "divPopupBuscarUsuario",
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
                      $rootScope.DatosFormulario.OpcionUsuario = "TarifaLocal";
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarUsuario"))($scope);
                  }
              });
          }
          $scope.AgregarTerminalPortuarioTarifaLocalTodos = function () {
 
             var codLinea = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoLinea;
             var codSucursal = "";
             var lstTerminal = ObtenerTerminalesByLinea(codLinea,codSucursal);
             $.each(lstTerminal, function (x) {
                          $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario.push(this);
                         $scope.gridapiListaTerminalPortuario.insertRange(this);
             });
          }
          $scope.AgregarTerminalPortuarioTarifaLocal = function (codigoSucursal) {

             var codLinea = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoLinea;
             var codSucursal = codigoSucursal;
             var lstTerminal = ObtenerTerminalesByLinea(codLinea,codSucursal);
             $.each(lstTerminal, function (x) {
                          $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario.push(this);
                          $scope.gridapiListaTerminalPortuario.insertRange(this);
             });
          }

          $scope.QuitarTerminalPortuarioTarifaLocal = function (codigoSucursal) {
              var terminalLista = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario, function (e) { return e.CodigoSucursal != codigoSucursal; });
              $rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario = terminalLista;
              $scope.gridapiListaTerminalPortuario.clear();
              $scope.gridapiListaTerminalPortuario.insertRange(terminalLista);
          }

         

          $scope.Guardar_Click = function () {
              //Sucursal
              var listaSucursalGrabar = [];
              var listaSucursales = $from($rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal).where("$idCheck==true").toArray();
              for (var i = 0; i < listaSucursales.length; i++) {
                  var objSucursalTmp = new Object();
                  objSucursalTmp.CodigoTarifaLocal = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal;
                  objSucursalTmp.Codigo = listaSucursales[i].Codigo;
                  objSucursalTmp.Accion = "I";
                  listaSucursalGrabar.push(objSucursalTmp);
              }
              if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal > 0) {
                  var listaEdit = $rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursalEdit;
                  if (listaEdit.length > 0) {
                      for (var a = 0; a < listaEdit.length; a++) {
                          var exist = false;
                          for (var b = 0; b < listaSucursalGrabar.length; b++) {
                              if (listaSucursalGrabar[b].Codigo == listaEdit[a].Codigo
                                  && listaSucursalGrabar[b].CodigoTarifaLocal == listaEdit[a].CodigoTarifaLocal) {
                                  listaSucursalGrabar.splice(b, 1);
                                  exist = true;
                              }
                          }
                          if (!exist) {
                              var objSucursal = new Object();
                              objSucursal.CodigoTarifaLocal = listaEdit[a].CodigoTarifaLocal;
                              objSucursal.Codigo = listaEdit[a].Codigo;
                              objSucursal.Accion = "D";
                              listaSucursalGrabar.push(objSucursal);
                          }
                      }
                  }
              }
              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalSucursal = listaSucursalGrabar;

              //Terminal
              var listaTerminalGrabar = [];
              var listaTerminal = $from($rootScope.DatosFormulario.DatosTarifaLocal.DataCombos.ListaTerminalPortuario).where("$idCheck==true").toArray();
              for (var w = 0; w < listaTerminal.length; w++) {
                  var objTerminalTmp = new Object();
                  objTerminalTmp.CodigoTarifaLocal = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal;
                  objTerminalTmp.CodigoSucursal = listaTerminal[w].CodigoSucursal;
                  objTerminalTmp.CodigoAlmacen = listaTerminal[w].CodigoAlmacen;
                  objTerminalTmp.Accion = "I";
                  listaTerminalGrabar.push(objTerminalTmp);
              }

              if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal > 0) {
                  var listaTerminalEdit = $rootScope.DatosFormulario.DatosTarifaLocal.ListaTerminalPortuarioEdit;
                  if (listaTerminalEdit.length > 0) {
                      for (var c = 0; c < listaTerminalEdit.length; c++) {
                          var band = false;
                          for (var d = 0; d < listaTerminalGrabar.length; d++) {
                              if (listaTerminalGrabar[d].CodigoSucursal == listaTerminalEdit[c].CodigoSucursal
                                  && listaTerminalGrabar[d].CodigoAlmacen == listaTerminalEdit[c].CodigoAlmacen) {
                                  listaTerminalGrabar.splice(d, 1);
                                  band = true;
                              }
                          }
                          if (!band) {
                              var obtTerminal = new Object();
                              obtTerminal.CodigoTarifaLocal = listaTerminalEdit[c].CodigoTarifaLocal;
                              obtTerminal.CodigoSucursal = listaTerminalEdit[c].CodigoSucursal;
                              obtTerminal.CodigoAlmacen = listaTerminalEdit[c].CodigoAlmacen;
                              obtTerminal.Accion = "D";
                              listaTerminalGrabar.push(obtTerminal);
                          }
                      }
                  }
              }
              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalSucursalTerminal = listaTerminalGrabar;

              //VigenciaNueva
              var listaVigenciaGrabar = formatearListaVigencia();
              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalVigencia = listaVigenciaGrabar;

              //Validacion
              var validacion = validacionesCamposGuardar();
              if (validacion == false) {
                  return false;
              }
              var validarVigencias = validarVigenciasCamposGuardar();
              if (validarVigencias == false) {
                  return false;
              }
              //Grabar - Actualizar
              if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal <= 0) {
                  gardarTarifa();
              } else {
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Accion = determinarAccion($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro);
                  actualizarTarifa();
              }
          }

          function formatearListaVigencia() {
              var listaGrabar = [];
              var listaGrilla = $rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia;
              var listaGrillaMemoria = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaVigenciaMemList, function (e) { return e.Accion != undefined; });
              for (var v = 0; v < listaGrilla.length; v++) {
                  if ($.inArray(listaGrilla[v], listaGrillaMemoria) > -1) {
                  } else {
                      listaGrillaMemoria.push(listaGrilla[v]);
                  }
              }


              $.each(listaGrillaMemoria, function (x) {
                  this.ListaTarifaLocalLigada = [];       
                  var codVigencia = this.CodigoTarifaLocalVigencia;
                  var listaTarifaLigada = $.grep($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList, function (e) {
                      return e.CodigoTarifaLocalVigencia == codVigencia;});                  
                  
                  var listaTarifaLigadaObj  = $.grep(listaTarifaLigada, function (e) {
                   return e.Accion != undefined; 
                  });

                  this.ListaTarifaLocalLigada = listaTarifaLigadaObj;
                  listaGrabar.push(this);
              });
              return listaGrabar;
              /*
               //Tarifa Ligada
                $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalLigada = [];
                var listaTarifa = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList;
                for (var e = 0; e < listaTarifa.length; e++) {
                    if (listaTarifa[e].Accion != undefined) {
                        $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalLigada.push(listaTarifa[e]);
                    }
                }
              */

          }
          $scope.EditarConfiguracionLigada = function (idConfiguracionTarifaLigada) {
              var objReg = $from($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria).where("$IdConfiguracionTarifaLigada=='" + idConfiguracionTarifaLigada + "'").firstOrDefault();
              AbrirPopup_ConfiguracionTarifaLigada("Editar", objReg);
          }

          $scope.QuitarConfiguracionLigada = function (idConfiguracionTarifaLigada) {
              MiConfirm("¿Está seguro de eliminar la Tarifa Ligada?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria;
                  var listaBaseMemoria = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList;
                  var listaGrilla = [];
                  var listaBase = [];
                  for (var x = 0; x < listaGrillaMemoria.length; x++) {
                      if (listaGrillaMemoria[x].IdConfiguracionTarifaLigada != idConfiguracionTarifaLigada) {
                          listaGrilla.push(listaGrillaMemoria[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].IdConfiguracionTarifaLigada == idConfiguracionTarifaLigada) {
                          if (listaBaseMemoria[x].IdConfiguracionTarifaLigada > 0) {
                              listaBaseMemoria[x].Accion = "D";
                              listaBase.push(listaBaseMemoria[x]);
                          }
                      } else {
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = listaGrilla;
                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList = listaBase;
                  $scope.Grid_DataBind("ListaTarifaLigada", listaGrilla);
                  $rootScope.$apply();
              });
          }

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaTarifaLigada":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarConfiguracionLigada(" + rowObject.IdConfiguracionTarifaLigada + ");";
                                  break;
                              case "Editar":
                                  eventoclick = "$parent.EditarConfiguracionLigada(" + rowObject.IdConfiguracionTarifaLigada + ");";
                                  break;
                          }
                      }
                      break;
                  case "grillaVigenciaTarifaLocal":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarVigencia(" + rowObject.CodigoTarifaLocalVigencia + ");";
                                  break;
                          }
                      }

                      break;
              }
              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              if (tipoboton == "Quitar") {
                  html = HtmlCrearBoton("Eliminar", eventoclick, "ng-disabled='FlagEditing==false'");
              }
              return html;
          }

          $scope.Salir_Click = function () {
              if (!$rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.TarifaLocalFlagEditar) {
                  //  $rootScope.DatosFormulario = null;
              }
              $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.FlagTarifaLocal = true;
              window.location.href = "/#!/sistema/busqueda/buscar-tarifa-local/";
          }
          function MiAlertOk_success() {
              $rootScope.Redirect("/#!/sistema/busqueda/buscar-tarifa-local/");
          }

          function ObservadorAtributos() {
              /*
              $scope.$watch("$root.DatosFormulario.DatosTarifaLocal.DatasRegistro.FechaVigencia", function (newValue, oldValue) {
                  if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTipoVigencia == $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoNaveArribo) {
                      $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.FechaVigencia = "";
                  }
              });
              */
              $scope.$watch("$root.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifa", function (newValue, oldValue) {
                  if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal > 0) {
                      if (newValue != oldValue) {
                          //Cambio CodigoTarifa para setear valor accion actualizar
                          $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Accion = "U";
                      }
                  }
              });
              /*
              $scope.$watch("$root.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoMoneda", function (newValue, oldValue) {
                  if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal > 0) {
                      if (newValue != oldValue) {
                          //Cambio CodigoMoneda para setear valor accion actualizar
                          $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Accion = "U";
                      }
                  }
              });
              */
              /*
              $scope.$watch("$root.DatosFormulario.DatosTarifaLocal.DatasRegistro.Monto", function (newValue, oldValue) {
                  if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal > 0) {
                      if (newValue != oldValue) {
                          //Cambio Monto para setear valor accion actualizar
                          $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Accion = "U";
                      }
                  }
              });
              */
              $scope.$watch("$root.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoUsuarioAutorizador", function (newValue, oldValue) {
                  if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal > 0) {
                      if (newValue != oldValue) {
                          //Cambio CodigoUsuarioAutorizador para setear valor accion actualizar
                          $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Accion = "U";
                      }
                  }
              });

          }

          function gardarTarifa() {
              miBlock(true, "#html");
              $.ajax({
                  url: "/TarifaPLana/GrabarTarifaLocal",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("Se ha grabado correctamente la Tarifa Local.", MiAlertOk_success);
                              //$rootScope.Redirect("/#!/sistema/busqueda/buscar-tarifa-local/");
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

          function determinarAccion(objGrabar) {
              var actionU = "U";
              var actionN = "N";
              var viewInitialData = $rootScope.DatosFormulario.DatosTarifaLocal.OriginalDataView;
              if (viewInitialData != undefined) {
                  if (objGrabar.CodigoConcepto != viewInitialData.CodigoConcepto) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoLinea != viewInitialData.CodigoLinea) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoRegimen != viewInitialData.CodigoRegimen) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTarifa != viewInitialData.CodigoTarifa) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTarifaLocal != viewInitialData.CodigoTarifaLocal) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoUsuarioAutorizador != viewInitialData.CodigoUsuarioAutorizador) {
                      return actionU;
                  }
                  else if (objGrabar.UnidadCalculo != viewInitialData.UnidadCalculo) {
                      return actionU;
                  }
                  else if (objGrabar.DescripcionTarifa != viewInitialData.DescripcionTarifa) {
                      return actionU;
                  }
                  else if (objGrabar.Autorizado != viewInitialData.Autorizado) {
                      return actionU;
                  }
                  else {
                      return actionN;
                  }
              } else {
                  return actionU;
              }
          }

          function actualizarTarifa() {
              miBlock(true, "#html");
              $.ajax({
                  url: "/TarifaPLana/ActualizarTarifaLocal",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("Se ha actualizado correctamente la Tarifa Local.", MiAlertOk_success);
                              //$rootScope.Redirect("/#!/sistema/busqueda/buscar-tarifa-local/");
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
          }

          function validacionesCamposGuardar() {

              var salida = true;
              if (validateForm("#RegistroTarifaFrm") == false) {
                  salida = false;
              }

              var vCodigoTarifa = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifa;
              if (vCodigoTarifa == undefined) {
                  $(".caja11.msgerror.DescripcionTarifa").html("La Descripción Tarifa debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.DescripcionTarifa").html("");
                  salida = (salida && true);
              }

              if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoRegimen == undefined) {
                  $(".caja11.msgerror.CodigoRegimen").html("Régimen debe tener un valor.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoRegimen.length <= 0) {
                  $(".caja11.msgerror.CodigoRegimen").html("Régimen debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoRegimen").html("");
                  salida = (salida && true);;
              }
              var vCodigoUsuarioAutorizador = $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoUsuarioAutorizador;
              if (vCodigoUsuarioAutorizador == undefined) {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("Autorizado Por debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("");
                  salida = (salida && true);
              }
              var listaSucursales = $from($rootScope.DatosFormulario.DatosTarifaLocal.ListaSucursal).where("$idCheck==true").toArray();
              if (listaSucursales.length <= 0) {
                  $(".caja11.msgerror.listaSucursal").html("Debe seleccionar por lo menos una Sucursal.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaSucursal").html("");
                  salida = (salida && true);
              }
              var listaVigencias = $rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia;
              if (listaVigencias.length <= 0) {
                  $(".caja11.msgerror.ListaVigencia").html("Debe ingresar por lo menos una Vigencia.");
                  salida = false;
              }
              else if (validarDatosVigencia(listaVigencias)) {
                  $(".caja11.msgerror.ListaVigencia").html("Debe ingresar los siguientes datos: Inicio Vigencia, Moneda y Monto.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.ListaVigencia").html("");
                  salida = (salida && true);
              }
              return salida;
          }

          function validarDatosVigencia(listdata) {
              if (listdata.length > 0) {
                  if (($.grep(listdata, function (e) { return e.InicioVigencia == undefined || e.InicioVigencia == null; })).length > 0) {
                      return true;
                  }
                  else if (($.grep(listdata, function (e) { return e.CodigoMoneda == undefined || e.CodigoMoneda == null; })).length > 0) {
                      return true;
                  }
                  else if (($.grep(listdata, function (e) { return e.Monto == undefined || e.Monto == null; })).length > 0) {
                      return true;
                  }
              } else {
                  return true;
              }
              return false;
          }
           function validarVigenciasCamposGuardar() {
              var salida = true;              
              var listaVigencias = $rootScope.DatosFormulario.DatosTarifaLocal.ListaTarifaLocalVigencia;
              var duplicados=false;
              $.each(listaVigencias, function (x) {
                var lstItems=$.grep(listaVigencias, function (e) { return e.InicioVigencia == listaVigencias[x].InicioVigencia; });
                if(lstItems.length>1){
                  duplicados=true;
                }
              });
              if(duplicados)
              {
                $(".caja11.msgerror.ListaVigencia").html("La fecha de Inicio Vigencia no puede repetirse.");
                  salida = false;
              }
              else
              {
                $(".caja11.msgerror.ListaVigencia").html("");
              }          
              return salida;
          }

          $scope.Deshabilitar_Click = function () {
              if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal > 0) {
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalSucursal = [];
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalSucursalTerminal = [];
                  //$rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.ListaTarifaLocalVigencia = [];
                  MiConfirm("¿Está seguro de deshabilitar la Tarifa Local?.", function () {
                      $.ajax({
                          url: "/TarifaPLana/DeshabilitarTarifaLocal",
                          type: "POST",
                          headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                          data: $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro,
                          dataType: "json",
                          cache: true,
                          async: false,
                          success: function (data) {
                              if (data.Result != null) {
                                  if (data.Result.Satisfactorio === true) {
                                      MiAlertOk("Se ha deshabilitado la tarifa local", MiAlertOk_success);
                                  }
                                  else {
                                      if (data.Result.Mensajes.length > 0) {
                                          var mensaje = "";
                                          for (var q = 0; q < data.Result.Mensajes.length; q++) {
                                              if (q == 0) {
                                                  mensaje = data.Result.Mensajes[q].Mensaje + ".";
                                              } else {
                                                  mensaje = mensaje + " \n" + data.Result.Mensajes[q].Mensaje + ".";
                                              }
                                          }
                                          MiConfirm(mensaje + "\n¿Está seguro de deshabilitar de todas maneras la Tarifa Local?.", function () {
                                              $.ajax({
                                                  url: "/TarifaPLana/DeshabilitarTarifaLocalConfirmado",
                                                  type: "POST",
                                                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                                  data: $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro,
                                                  dataType: "json",
                                                  cache: true,
                                                  async: false,
                                                  success: function (data1) {
                                                      if (data1.Result != null) {
                                                          if (data1.Result.Satisfactorio === true) {
                                                              MiAlertOk("Se ha deshabilitado la tarifa local.", MiAlertOk_success);
                                                          }
                                                          else {
                                                              if (data1.Result.Mensajes.length > 0) {
                                                                  MiError(data1.Result.Mensajes[0].Mensaje);
                                                              } else {
                                                                  MiError(data1.Result.Mensaje);
                                                              }
                                                          }
                                                      } else {
                                                          MiAlert("Ocurrió un problema interno en el sistema.");
                                                      }
                                                  }
                                              });
                                          });
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

          $scope.Modificar_Click = function () {
              $scope.FlagMostrarBotonGuardar = true;
              $scope.FlagMostrarBotonModificar = false;
              $scope.FlagMostrarBotonDeshabilitar = false;
              $scope.FlagEditing = true;
              $scope.EditingGrillas();
          }

          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaVigenciaTarifaLocal");
              arrayGrillas.push("grillaListaTarifaLigada");
              arrayGrillas.push("grillaListaSucursales");
              arrayGrillas.push("grillaListaTerminalPortuario");
              arrayGrillas.push("grillaListaConfiguracionPeriodo");
              
              var arrayContentFechas = new Array();
              arrayContentFechas.push("ContentListadogrillaVigencia");              
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, arrayContentFechas);
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