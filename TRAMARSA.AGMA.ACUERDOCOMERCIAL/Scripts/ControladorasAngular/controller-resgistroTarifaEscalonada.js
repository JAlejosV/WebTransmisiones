(function () {
    angular.module('api')
    .controller('RegistroTarifaEscalonadaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE = new Object();

              // Obejetos Configuracion Periodo
              if ($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo == undefined)
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = [];

              //Listas
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursalOriginal == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursalOriginal = [];
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaLigadaMemoria == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaLigadaMemoria = [];
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.CopyConfiguracionPeriodo == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.CopyConfiguracionPeriodo = [];

              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria = [];

              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.grillaListaVigenciaMemList == undefined)
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.grillaListaVigenciaMemList = [];


              $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView = new Object();
              var paramCodigoTarifaEscalonada = getUrlVars()["codigoTarifaEscalonada"];
              if (paramCodigoTarifaEscalonada) {
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.TarifaEscalonadaFlagEditar = true;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada = paramCodigoTarifaEscalonada;
              }
              var esEditar = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.TarifaEscalonadaFlagEditar;
              $scope.CargarDatosIniciales();
              if (esEditar) {
                  $scope.FlagMostrarBotonGuardar = false;
                  $scope.FlagMostrarBotonModificar = true;
                  $scope.FlagMostrarBotonHistorial = true;
                  $scope.FlagMostrarBotonDeshabilitar = true;
                  $scope.CargarDatosTarifaEscalonada();
                  $scope.FlagEditing = false;
              } else {
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = [];
                  $scope.FlagMostrarBotonGuardar = true;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada = 0;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.Accion = "I";
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.EstadoRegistro = "Activo";
                  $scope.FlagEditing = true;
              }
              $rootScope.DatosFormulario.ExisteVigencia = false;
              $scope.EditingGrillas();

          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/TarifaEscalonada/GrabarTarifaEscalonadaCargaInicial",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaLineas = data.Linea;
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoLinea = data.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.Habilitado = 'False';
                          }
                      }
                      //$rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursal = data.Sucursal;
                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaUnidadCalculo = data.ListaUnidadCalculo;
                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaTipoFechaCalculo = data.ListaTipoFechaCalculo;
                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaTipoDiaCalculo = data.ListaTipoDiaCalculo;

                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaCategoriaContenedor = data.ListaCategoriaContenedor;
                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaMonedas = data.ListaMonedas;
                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaTipoCobro = data.ListaTipoCobro;
                      //$scope.Grid_DataBind("DetalleSucursal", $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursal);
                      $scope.CargarSucursal();
                  }
              });
          }

          $scope.CargarSucursal = function () {
            var codLinea = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoLinea;
            $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursal = ObtenerSucursalesByLinea(codLinea);
            $scope.Grid_DataBind("DetalleSucursal", $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursal);
          }
          $(document).tooltip({
              items: "[tooltip-Nave]",
              tooltipClass: "tooltip-Nave",
              track: false,
              content: function () {
                  var s = $rootScope.DatosFormulario;
                  var element = $(this);
                  if (element.is("[tooltip-Nave]")) {
                      var IdItem = element.attr("tooltip-Nave");
                      if (IdItem == "grillaListaConfiguracionPeriodo") {

                          var mitabla = "<table border=0 cellpadding=3 cellspacing=0>";
                          var mifilaH = "<thead><tr>"
                          mifilaH = mifilaH + '<th style="width:100px">Periodo</th>';
                          mifilaH = mifilaH + '<th style="width:100px">Unid. Libres</th>';
                          mifilaH = mifilaH + '<th style="width:100px">Precio</th>';
                          mitabla = mitabla + mifilaH + "</tr></thead><tbody>"


                          //var objElemento = jQuery('#grillaListaNaves').getRowData($(this).parent().attr("id"));
                          var objTemp = $(this).attr("objtooltip").replace("root", "rootScope")
                          var indexFin = objTemp.lastIndexOf(".");
                          var objElementoGeneral = eval(objTemp.slice(0, indexFin));
                          var objElemento = objElementoGeneral.ListaDetalleRango;

                          // var lstDetalles = JSON.parse(objElemento.DetalleArribo);
                          for (i = 0; i < objElemento.length; i++) {
                              var mifila = "<tr>"
                              mifila = mifila + "<td>" + objElemento[i].Periodo + "</td>";
                              mifila = mifila + "<td>" + objElemento[i].UnidadLibres + "</td>";
                              mifila = mifila + "<td>" + objElemento[i].Precio + "</td>";
                              mitabla = mitabla + mifila + "</tr>";
                          }
                          $scope.$apply();
                          return mitabla;
                      }
                  }

              },
              show: {
              },
              hide: {
                  effect: "fades",
                  duration: 900000

              },
              open: function (event, ui) {
              }
          });
          $scope.CargarDatosTarifaEscalonada = function () {
              var param = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada;
              if (param != undefined) {
                  $.ajax({
                      url: "/TarifaEscalonada/ConsultarDetalleTarifaEscalonada",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "codigoTarifaEscalonada=" + param,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          if (data != null) {
                              if (data.DetalleTarifaEscalonadaList.length > 0) {
                                  //Sucursal
                                  if (data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaSucursalList.length > 0) {
                                      for (var number = 0; number < data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaSucursalList.length; number++) {
                                          for (var z = 0; z < $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales.length; z++) {
                                              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales[z].Codigo == data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaSucursalList[number].CodigoSucursal) {
                                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales[z].idCheck = true;
                                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales[z].Accion = "U";
                                              } else {
                                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales[z].Accion = "";
                                              }
                                          }
                                      }
                                      $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursalOriginal = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaSucursalList;
                                  }
                                  //Datos generales
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada = data.DetalleTarifaEscalonadaList[0].CodigoTarifaEscalonada;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoUsuarioAutorizador = data.DetalleTarifaEscalonadaList[0].CodigoUsuarioAutorizador;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoLinea = data.DetalleTarifaEscalonadaList[0].CodigoLinea;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifa = data.DetalleTarifaEscalonadaList[0].CodigoTarifa;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoUnidadCalculo = data.DetalleTarifaEscalonadaList[0].CodigoUnidadCalculo;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.EstadoRegistro = data.DetalleTarifaEscalonadaList[0].EstadoRegistro;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoRegimen = data.DetalleTarifaEscalonadaList[0].CodigoRegimen;
                                  //$rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.InicioVigencia = data.DetalleTarifaEscalonadaList[0].InicioVigencia;
                                  //$rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.FinVigencia = data.DetalleTarifaEscalonadaList[0].FinVigencia;
                                  //$rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTipoFechaCalculo = data.DetalleTarifaEscalonadaList[0].CodigoTipoFechaCalculo;
                                  //$rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.DiasDelayCalculo = '' + data.DetalleTarifaEscalonadaList[0].DiasDelayCalculo + '';
                                  //$rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTipoDiaCalculo = data.DetalleTarifaEscalonadaList[0].CodigoTipoDiaCalculo;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.FechaHoraActualizacion = data.DetalleTarifaEscalonadaList[0].FechaHoraActualizacion;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.FechaHoraCreacion = data.DetalleTarifaEscalonadaList[0].FechaHoraCreacion;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.UsuarioActualizacion = data.DetalleTarifaEscalonadaList[0].UsuarioActualizacion;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.UsuarioCreacion = data.DetalleTarifaEscalonadaList[0].UsuarioCreacion;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoConcepto = data.DetalleTarifaEscalonadaList[0].CodigoConcepto;//No está en el UI
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.Autorizado = data.DetalleTarifaEscalonadaList[0].Autorizado;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.DescripcionTarifa = data.DetalleTarifaEscalonadaList[0].DescripcionTarifa;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.Regimen = data.DetalleTarifaEscalonadaList[0].Regimen;
                                  //Copy
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoUsuarioAutorizador = data.DetalleTarifaEscalonadaList[0].CodigoUsuarioAutorizador;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoLinea = data.DetalleTarifaEscalonadaList[0].CodigoLinea;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoTarifa = data.DetalleTarifaEscalonadaList[0].CodigoTarifa;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoUnidadCalculo = data.DetalleTarifaEscalonadaList[0].CodigoUnidadCalculo;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoRegimen = data.DetalleTarifaEscalonadaList[0].CodigoRegimen;
                                  // $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.InicioVigencia = data.DetalleTarifaEscalonadaList[0].InicioVigencia;
                                  // $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.FinVigencia = data.DetalleTarifaEscalonadaList[0].FinVigencia;
                                  // $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoTipoFechaCalculo = data.DetalleTarifaEscalonadaList[0].CodigoTipoFechaCalculo;
                                  // $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.DiasDelayCalculo = '' + data.DetalleTarifaEscalonadaList[0].DiasDelayCalculo + '';
                                  // $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoTipoDiaCalculo = data.DetalleTarifaEscalonadaList[0].CodigoTipoDiaCalculo;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView.CodigoConcepto = data.DetalleTarifaEscalonadaList[0].CodigoConcepto;
                                  //Fin Copy
                                  if (data.DetalleTarifaEscalonadaList[0].EstadoRegistro == "Inactivo") {
                                      $scope.FlagMostrarBotonModificar = false;
                                      $scope.FlagMostrarBotonDeshabilitar = false;
                                  }
                                  //Listas Memoria
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaLigadaList;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaLigadaList;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.CopyConfiguracionPeriodo = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaPeriodoList;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaDistribucionTarifas = data.DetalleTarifaEscalonadaList[0].DistribucionTarifasList;


                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaVigenciaList;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.grillaListaVigenciaMemList = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaVigenciaList;

                                  //Periodos
                                  var listaPeriodos = formatearPeriodos(data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaPeriodoList);
                                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = listaPeriodos;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo = listaPeriodos;

                                  //Grillas
                                  $scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales);
                                  $scope.gridapiListaConfiguracionPeriodo.refresh($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo);
                                  $scope.gridapiListaTarifaEscalonadaLigada.refresh($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada);
                                  $scope.gridapigrillaTarifaEscalonadaVigencia.refresh($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia);
                                  $scope.gridapigrillaDistribucionTarifas.refresh($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaDistribucionTarifas);
                                  $rootScope.$apply();
                              }
                          }
                      }
                  });
              }
          }
          function formatearPeriodos(listaPeriodosSource) {
              //Count
              var countPeriodo = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo.length;
              //Periodos

              var listaConfigPeriodo = [];
              var periodosList = listaPeriodosSource;
              if (periodosList.length > 0) {
                  var primaryGrpPeriodo = [];
                  for (var x = 0; x < periodosList.length; x++) {
                      var noExisteGrroup = true;
                      for (var w = 0; w < primaryGrpPeriodo.length; w++) {
                          if (periodosList[x].CodigoClaseContenedor == primaryGrpPeriodo[w].CodigoClaseContenedor &&
                              periodosList[x].CodigoMoneda == primaryGrpPeriodo[w].CodigoMoneda) {
                              noExisteGrroup = false;
                              break;
                          }
                      }
                      if (noExisteGrroup) {
                          var groupNewObj = new Object();
                          groupNewObj.CodigoClaseContenedor = periodosList[x].CodigoClaseContenedor;
                          groupNewObj.CodigoMoneda = periodosList[x].CodigoMoneda;
                          groupNewObj.ClaseContenedor = periodosList[x].ClaseContenedor;
                          groupNewObj.Moneda = periodosList[x].Moneda;
                          groupNewObj.CodigoTarifaEscalonada = periodosList[x].CodigoTarifaEscalonada;
                          groupNewObj.IdPeriodo = periodosList[x].IdPeriodo;
                          groupNewObj.CodigoTarifaEscalonadaVigencia = periodosList[x].CodigoTarifaEscalonadaVigencia;
                          groupNewObj.SelectTypeContenList = [];
                          var totalContentType = $.grep(periodosList, function (a) { return a.CodigoClaseContenedor == groupNewObj.CodigoClaseContenedor && a.CodigoMoneda == groupNewObj.CodigoMoneda; });
                          for (var s = 0; s < totalContentType.length; s++) {
                              var rangosNewList = [];
                              var objTypeCont = new Object();
                              objTypeCont.idCheck = true;
                              objTypeCont.CodigoTipoContenedor = totalContentType[s].CodigoTipoContenedor;
                              var noExistCont = true;
                              for (var y = 0; y < groupNewObj.SelectTypeContenList.length; y++) {
                                  if (groupNewObj.SelectTypeContenList[y].CodigoTipoContenedor == objTypeCont.CodigoTipoContenedor) {
                                      noExistCont = false;
                                  }
                              }
                              if (noExistCont) {
                                  var searchRangos = $.grep(periodosList, function (e) {
                                      return e.CodigoClaseContenedor == groupNewObj.CodigoClaseContenedor &&
                                       e.CodigoMoneda == groupNewObj.CodigoMoneda &&
                                       e.CodigoTipoContenedor == objTypeCont.CodigoTipoContenedor;
                                  });
                                  if (searchRangos.length > 0) {
                                      for (var c = 0; c < searchRangos.length; c++) {
                                          var newRangObj = new Object();
                                          newRangObj.IdRango = searchRangos[c].IdPeriodo;
                                          newRangObj.Periodo = searchRangos[c].CodigoPeriodo;
                                          newRangObj.UnidadLibres = searchRangos[c].NumeroDias;
                                          newRangObj.Precio = searchRangos[c].Precio;
                                          newRangObj.Accion = "U";
                                          rangosNewList.push(newRangObj);
                                      }
                                  }
                                  objTypeCont.newListRangos = rangosNewList;
                                  groupNewObj.SelectTypeContenList.push(objTypeCont);
                              }
                          }
                          primaryGrpPeriodo.push(groupNewObj);
                      }
                  }
                  if (primaryGrpPeriodo.length > 0) {
                      for (var a = 0; a < primaryGrpPeriodo.length; a++) {
                          var objMemoria = new Object();
                          var inputOne = true;
                          // objMemoria.IdPeriodo = listaConfigPeriodo.length + 1;
                          objMemoria.IdPeriodo = primaryGrpPeriodo[a].IdPeriodo;
                          objMemoria.ClaseContenedor = primaryGrpPeriodo[a].ClaseContenedor;
                          objMemoria.Moneda = primaryGrpPeriodo[a].Moneda;
                          objMemoria.CodigoClaseContenedor = primaryGrpPeriodo[a].CodigoClaseContenedor;
                          objMemoria.CodigoMoneda = primaryGrpPeriodo[a].CodigoMoneda;
                          objMemoria.CodigoTarifaEscalonada = primaryGrpPeriodo[a].CodigoTarifaEscalonada;
                          objMemoria.CodigoTarifaEscalonadaVigencia = primaryGrpPeriodo[a].CodigoTarifaEscalonadaVigencia;
                          objMemoria.ListaTipoContenedor = [];
                          objMemoria.ListaDetalleRango = [];
                          var ccontTyListReady = primaryGrpPeriodo[a].SelectTypeContenList;
                          for (var b = 0; b < ccontTyListReady.length; b++) {
                              if (inputOne) {
                                  objMemoria.TiposContenedores = ccontTyListReady[b].CodigoTipoContenedor;
                                  objMemoria.ListaDetalleRango = ccontTyListReady[b].newListRangos;
                                  var thypTypeCtn = new Object();
                                  thypTypeCtn.CodigoTipoContenedor = ccontTyListReady[b].CodigoTipoContenedor;
                                  thypTypeCtn.idCheck = ccontTyListReady[b].idCheck;
                                  objMemoria.ListaTipoContenedor.push(thypTypeCtn);
                                  listaConfigPeriodo.push(objMemoria);
                              } else {
                                  var esIgual = true;
                                  for (var is = 0; is < listaConfigPeriodo.length; is++) {
                                      esIgual = true;
                                      var listaNewPosibleIns = ccontTyListReady[b].newListRangos;
                                      var listExisDetailRango = listaConfigPeriodo[is].ListaDetalleRango;
                                      var contability = 0;
                                      for (var k = 0; k < listaNewPosibleIns.length; k++) {
                                          for (var cur = 0; cur < listExisDetailRango.length; cur++) {
                                              if (listaConfigPeriodo[is].CodigoClaseContenedor == primaryGrpPeriodo[a].CodigoClaseContenedor &&
                                                  listaConfigPeriodo[is].CodigoMoneda == primaryGrpPeriodo[a].CodigoMoneda &&
                                                  listExisDetailRango[cur].CodigoPeriodo == listaNewPosibleIns[k].CodigoPeriodo &&
                                                  listExisDetailRango[cur].UnidadLibres == listaNewPosibleIns[k].UnidadLibres &&
                                                  listExisDetailRango[cur].Precio == listaNewPosibleIns[k].Precio) {
                                                  contability++;
                                                  break;
                                              }
                                          }
                                      }
                                      if (contability != listaNewPosibleIns.length) {
                                          esIgual = false;
                                      }
                                      if (esIgual) {
                                          //Solo agregamos el tipo contenedor
                                          listaConfigPeriodo[is].TiposContenedores = listaConfigPeriodo[is].TiposContenedores + ', ' + ccontTyListReady[b].CodigoTipoContenedor;
                                          var newCntComplete = new Object();
                                          newCntComplete.CodigoTipoContenedor = ccontTyListReady[b].CodigoTipoContenedor;
                                          newCntComplete.idCheck = ccontTyListReady[b].idCheck;
                                          listaConfigPeriodo[is].ListaTipoContenedor.push(newCntComplete);
                                          break;
                                      }
                                  }
                                  if (!esIgual) {
                                      //Insertamos como nuevo
                                      var xyzNewInsertVaelue = new Object();
                                      //xyzNewInsertVaelue.IdPeriodo = listaConfigPeriodo.length + 1;
                                      xyzNewInsertVaelue.IdPeriodo = countPeriodo + listaConfigPeriodo.length + 1;
                                      xyzNewInsertVaelue.ClaseContenedor = primaryGrpPeriodo[a].ClaseContenedor;
                                      xyzNewInsertVaelue.Moneda = primaryGrpPeriodo[a].Moneda;
                                      xyzNewInsertVaelue.CodigoClaseContenedor = primaryGrpPeriodo[a].CodigoClaseContenedor;
                                      xyzNewInsertVaelue.CodigoMoneda = primaryGrpPeriodo[a].CodigoMoneda;
                                      xyzNewInsertVaelue.CodigoTarifaEscalonada = primaryGrpPeriodo[a].CodigoTarifaEscalonada;
                                      xyzNewInsertVaelue.CodigoTarifaEscalonadaVigencia = primaryGrpPeriodo[a].CodigoTarifaEscalonadaVigencia;
                                      xyzNewInsertVaelue.TiposContenedores = ccontTyListReady[b].CodigoTipoContenedor;
                                      xyzNewInsertVaelue.ListaDetalleRango = ccontTyListReady[b].newListRangos;
                                      xyzNewInsertVaelue.ListaTipoContenedor = [];

                                      var cntNewAplyConten = new Object();
                                      cntNewAplyConten.CodigoTipoContenedor = ccontTyListReady[b].CodigoTipoContenedor;
                                      cntNewAplyConten.idCheck = ccontTyListReady[b].idCheck;
                                      xyzNewInsertVaelue.ListaTipoContenedor.push(cntNewAplyConten);
                                      listaConfigPeriodo.push(xyzNewInsertVaelue);
                                  }
                              }
                              inputOne = false;
                          }
                      }
                  }
              }

              return listaConfigPeriodo;
          }
          $scope.Grid_DataBind = function (grid, data) {
              if (grid == "DetalleSucursal") {
                  $scope.gridapiListaSucursales.insertRange(data);
              }
              if (grid == "ListaTarifaLigada") {
                  $scope.gridapiListaTarifaEscalonadaLigada.refresh(data);
              }
              if (grid == "ListaPeriodo") {
                  $scope.gridapiListaConfiguracionPeriodo.refresh(data);
              }
              if (grid == "grillaTarifaEscalonadaVigencia") {
                  $scope.gridapigrillaTarifaEscalonadaVigencia.refresh(data);
              }
          }
          $scope.CambiarCategoriaContenedor_Change = function (objItem) {
              miBlock(true, "html");
              var param = objItem.CodigoClaseContenedor;
              $.ajax({
                  url: "/TarifaEscalonada/ListarTipoContendorByClaseContenedor",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoClaseContenedor=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {

                      $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.ListaTipoContenedor = data.ListaTipoContenedor;
                      setTimeout(function () {
                          $("select[multiple='multiple']").multipleSelect();
                          miBlock(false, "html");
                      }, 200);
                  }
              });

          }
          $scope.Historial_Click = function () {
              var altura = 800;
              getPopupResponsive({
                  formURL: "TarifaEscalonada/HistorialTarifaEscalonada",
                  title: "Historial",
                  nombreDiv: "divPopupHistorialTarifaEscalonada",
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
                      $compile($("#divPopupHistorialTarifaEscalonada"))($scope);
                  }
              });
          }
          $scope.Salir_Click = function () {
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/bienvenido/";
              }
              $rootScope.DatosFormulario.DatosTarifaEscalonada.FlagTarifaEscalonada = true;
          }
          function obtenerCodigoVigencia() {
              var rowKey = jQuery("#grillaTarifaEscalonadaVigencia").jqGrid('getGridParam', 'selrow');
              if (rowKey == undefined) {
                  return "";
              } else {
                  var rowObject = jQuery('#grillaTarifaEscalonadaVigencia').getRowData(rowKey);
                  return rowObject.CodigoTarifaEscalonadaVigencia;
              }
          }
          function obtenerObjetoAngular(valor) {
              var objTemp = valor.replace("root", "rootScope");
              var indexFin = objTemp.lastIndexOf(".");
              var obj = eval(objTemp.slice(2, indexFin));
              return obj;
          }
          function tarifasLigadasByVigencia(codigoTarifaEscalonadaVigencia) {
              var listaMostrarTarifaLigada = $.grep($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria, function (e) { return e.CodigoTarifaEscalonadaVigencia == codigoTarifaEscalonadaVigencia; });
              if (listaMostrarTarifaLigada.length > 0) {
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada = listaMostrarTarifaLigada;
                  $scope.gridapiListaTarifaEscalonadaLigada.refresh(listaMostrarTarifaLigada);
                  $scope.$apply();
              }else{
                  $scope.gridapiListaTarifaEscalonadaLigada.refresh(listaMostrarTarifaLigada);
                  $scope.$apply();
              }
          }

          function listarPeriodosByVigencia(codigoTarifaEscalonadaVigencia) {
              var listaMemoria = $.grep($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo, function (e) { return e.CodigoTarifaEscalonadaVigencia == codigoTarifaEscalonadaVigencia; });
              var viewGrillaList = $.grep(listaMemoria, function (e) { return e.Accion != "D"; });
              if (viewGrillaList.length > 0) {
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo = viewGrillaList;
                  $scope.gridapiListaConfiguracionPeriodo.refresh(viewGrillaList);
                  $scope.$apply();
              }else{
                  $scope.gridapiListaConfiguracionPeriodo.refresh(viewGrillaList);
                  $scope.$apply();
              }
          }

          function cargarLigadasPeriodosByVigencia(codigoTarifaEscalonadaVigencia) {
              if (codigoTarifaEscalonadaVigencia != undefined) {
                  $.ajax({
                      url: "/TarifaEscalonada/ConsultarLigadasPeriodosTarifaEscalonada",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "codigoTarifaEscalonadaVigencia=" + codigoTarifaEscalonadaVigencia+"&&codigoLinea="+$rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoLinea,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          if (data != null) {
                              if (data.TarifaEscalonadaPeriodoList.length > 0) {
                                  //Copy
                                  $.each(data.TarifaEscalonadaPeriodoList, function (x) {
                                      this.IdPeriodo = $rootScope.DatosFormulario.DatosTarifaEscalonada.CopyConfiguracionPeriodo.length + 1;
                                      $rootScope.DatosFormulario.DatosTarifaEscalonada.CopyConfiguracionPeriodo.push(this);
                                  });
                                  var listaPeriodos = formatearPeriodos(data.TarifaEscalonadaPeriodoList);
                                  var memoPeriodosList = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo;
                                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = memoPeriodosList.concat(listaPeriodos);
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo = listaPeriodos;
                                  $scope.gridapiListaConfiguracionPeriodo.refresh(listaPeriodos);
                              } else {
                                  $scope.gridapiListaConfiguracionPeriodo.refresh([]);
                              }
                              if (data.TarifaEscalonadaLigadaList.length > 0) {
                                  var firstListLigadas = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria = firstListLigadas.concat(data.TarifaEscalonadaLigadaList);;
                                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada = data.TarifaEscalonadaLigadaList;
                                  $scope.gridapiListaTarifaEscalonadaLigada.refresh(data.TarifaEscalonadaLigadaList);
                              } else {
                                  $scope.gridapiListaTarifaEscalonadaLigada.refresh([]);
                              }
                              $scope.$apply();
                          }
                      }
                  });
              }
          }
          function refrescarGrillaVigencia() {
              jQuery("#grillaTarifaEscalonadaVigencia").find("tr").each(function () {
                  var objTd = $(this);
                  objTd.find("td").each(function () {
                      this.style.setProperty('background', 'transparent', 'important');
                  });

              });
          }
          AbrirPopupConfiguracionTarifaLigada = function (tipo, rowObject) {
              $rootScope.DatosFormulario.OpcionTarifaLigada = "TarifaEscalonada";
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
          AbrirPopup_Periodo = function (tipo, objReg) {
              getPopupResponsive({
                  formURL: "ConfiguracionPeriodoTarifaEscalonada/ConfigurarRangos",
                  title: "Configuración Rangos ",
                  nombreDiv: "divPopupConfiguracionRangos",
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
                      $(obj).attr("ModoPagina", tipo);
                      $compile($("#divPopupConfiguracionRangos"))($scope);
                      var scopePopup = angular.element("#divPopupConfiguracionRangos").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.AgregarConfiguracionPeriodo = function () {
              var codigoTarifaEscalonadaVigencia = obtenerCodigoVigencia();
              var objVigencia = obtenerObjetoAngular(codigoTarifaEscalonadaVigencia);
              if ($rootScope.DatosFormulario.ExisteVigencia) {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("");
                  if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoLinea != undefined) {
                      $(".caja11.msgerror.ListaConfiguracionPeriodo").html("");
                      var newItem = new Object();
                      var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo, "IdPeriodo");
                      newItem = {
                          IdPeriodo: nuevoId - 1,
                          CodigoTarifaEscalonadaVigencia: objVigencia.CodigoTarifaEscalonadaVigencia
                      }
                      AbrirPopup_Periodo("Nuevo", newItem);
                  }
                  else {
                      $(".caja11.msgerror.ListaConfiguracionPeriodo").html("Seleccione Línea Naviera.");
                  }
              }
              else {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("Seleccione una Vigencia.");
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
                      $rootScope.DatosFormulario.OpcionTarifa = "TarifaEscalonada";
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarTarifa"))($scope);
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
                      $rootScope.DatosFormulario.OpcionUsuario = "TarifaEscalonada";
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarUsuario"))($scope);
                  }
              });
          }
          $scope.GrillaClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
              $rootScope.DatosFormulario.ExisteVigencia = true;
              var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
              var objVigencia = obtenerObjetoAngular(data.CodigoTarifaEscalonadaVigencia);
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

              var lstLigada = $.grep($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria, function (e) { return e.CodigoTarifaEscalonadaVigencia == objVigencia.CodigoTarifaEscalonadaVigencia; });
              var lstPeriodo = $.grep($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo, function (e) { return e.CodigoTarifaEscalonadaVigencia == objVigencia.CodigoTarifaEscalonadaVigencia; });
              if (lstLigada.length <= 0 && lstPeriodo.length <= 0) {
                  cargarLigadasPeriodosByVigencia(objVigencia.CodigoTarifaEscalonadaVigencia);
              } else {
                  if (lstLigada.length) {
                      tarifasLigadasByVigencia(objVigencia.CodigoTarifaEscalonadaVigencia);
                  }else{
                      tarifasLigadasByVigencia(null);
                  }
                  if (lstPeriodo.length) {
                      listarPeriodosByVigencia(objVigencia.CodigoTarifaEscalonadaVigencia);
                  }else{
                      listarPeriodosByVigencia(null);
                  }
              }
          }
          $scope.AgregarVigencia_Click = function () {
              $rootScope.DatosFormulario.ExisteVigencia = false;
              var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia, "CodigoTarifaEscalonadaVigencia");
              $scope.gridapigrillaTarifaEscalonadaVigencia.insertRange([
                        {
                            CodigoTarifaEscalonadaVigencia: nuevoId>0?-nuevoId:nuevoId,
                            CodigoTarifaEscalonada: $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada,
                            InicioVigencia: null,
                            CodigoTipoFechaCalculo: null,
                            DiasDelayCalculo: null,
                            CodigoTipoDiaCalculo: null,
                            CodigoTipoCobro: null,
                            EstadoRegistro: true,
                            Accion: "I"
                        }
              ]);
          }
          $scope.QuitarVigencia = function (codigoTarifaEscalonadaVigencia) {
              MiConfirm("¿Está seguro de eliminar la vigencia?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia;
                  var listaBaseMemoria = $rootScope.DatosFormulario.DatosTarifaEscalonada.grillaListaVigenciaMemList;
                  var listaGrilla = [];
                  var listaBase = [];
                  for (var x = 0; x < listaGrillaMemoria.length; x++) {
                      if (listaGrillaMemoria[x].CodigoTarifaEscalonadaVigencia != codigoTarifaEscalonadaVigencia) {
                          listaGrilla.push(listaGrillaMemoria[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].CodigoTarifaEscalonadaVigencia == codigoTarifaEscalonadaVigencia) {
                          if (listaBaseMemoria[x].CodigoTarifaEscalonadaVigencia > 0) {
                              listaBaseMemoria[x].Accion = "U";
                              listaBaseMemoria[x].EstadoRegistro = false;
                              listaBase.push(listaBaseMemoria[x]);
                          }
                      } else {
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia = listaGrilla;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.grillaListaVigenciaMemList = listaBase;
                  $scope.Grid_DataBind("grillaTarifaEscalonadaVigencia", listaGrilla);

                  var listaMemoriaLigada = [];
                  var listaMemoriaPeriodo = [];
                  $($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria).each(function (x) {
                      if (this.CodigoTarifaEscalonadaVigencia == codigoTarifaEscalonadaVigencia && this.IdConfiguracionTarifaLigada > 0) {
                          this.Accion = "D";
                          listaMemoriaLigada.push(this);
                      }
                      else if (this.CodigoTarifaEscalonadaVigencia != codigoTarifaEscalonadaVigencia) {
                          listaMemoriaLigada.push(this);
                      }
                  });
                  $($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo).each(function (x) {
                      if (this.CodigoTarifaEscalonadaVigencia == codigoTarifaEscalonadaVigencia && this.IdPeriodo > 0) {
                          this.Accion = "D";
                          listaMemoriaPeriodo.push(this)
                      } else if (this.CodigoTarifaEscalonadaVigencia != codigoTarifaEscalonadaVigencia) {
                          listaMemoriaPeriodo.push(this);
                      }
                  });
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria = listaMemoriaLigada;
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = listaMemoriaPeriodo;
                  refrescarGrillaVigencia();
                  tarifasLigadasByVigencia(null);
                  listarPeriodosByVigencia(null);
                  $rootScope.$apply();
              });
          }
          $scope.AgregarTarifaLigada_Click = function () {
              var codigoTarifaEscalonadaVigencia = obtenerCodigoVigencia();
              var objVigencia = obtenerObjetoAngular(codigoTarifaEscalonadaVigencia);
              if ($rootScope.DatosFormulario.ExisteVigencia) {
                  $(".caja11.msgerror.ListaTarifaEscalonadaLigada").html("");
                  var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria, "IdConfiguracionTarifaLigada");
                  var newItem = {
                      IdConfiguracionTarifaLigada: nuevoId - 1,
                      CodigoTarifaEscalonadaVigencia: objVigencia.CodigoTarifaEscalonadaVigencia,
                      CodigoTarifa: null,
                      CodigoTarifaLigadaLocal: null,
                      DescripcionTarifaLocal: null,
                      CodigoTarifaLocal: $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada,
                      MonedaTarifaLocal: null,
                      MontoTarifaLocal: null,
                      DescripcionConfiguracionTarifaLigada: null,
                      Porcentaje: null,
                      CodigoMoneda: null,
                      Moneda: null,
                      Monto: null,
                      DescripcionMonedaBase: null,
                      CodigoConfiguracionTarifaLigada: null,
                      CodigoMonedaTarifaLigada: null
                  }
                  AbrirPopupConfiguracionTarifaLigada("Nuevo", newItem);
              } else {
                  $(".caja11.msgerror.ListaTarifaEscalonadaLigada").html("Seleccione una vigencia.");
              }
          }
          $scope.EditarConfiguracionLigada = function (idConfiguracionTarifaLigada) {
              var objReg = $from($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada).where("$IdConfiguracionTarifaLigada=='" + idConfiguracionTarifaLigada + "'").firstOrDefault();
              var newItem = {
                  IdConfiguracionTarifaLigada: objReg.IdConfiguracionTarifaLigada,
                  CodigoTarifa: objReg.CodigoTarifa,
                  CodigoTarifaLigadaLocal: objReg.CodigoTarifaLigadaEscalonada,
                  CodigoTarifaEscalonadaVigencia: objReg.CodigoTarifaEscalonadaVigencia,
                  DescripcionTarifaLocal: objReg.DescripcionTarifaEscalonada,
                  CodigoTarifaLocal: objReg.CodigoTarifaEscalonada,
                  MonedaTarifaLocal: objReg.MonedaTarifaEscalonada,
                  MontoTarifaLocal: objReg.MontoTarifaEscalonada,
                  DescripcionConfiguracionTarifaLigada: objReg.DescripcionConfiguracionTarifaLigada,
                  Porcentaje: objReg.Porcentaje,
                  CodigoMoneda: objReg.CodigoMoneda,
                  Moneda: objReg.Moneda,
                  Monto: objReg.Monto,
                  DescripcionMonedaBase: objReg.DescripcionMonedaBase,
                  CodigoConfiguracionTarifaLigada: objReg.CodigoConfiguracionTarifaLigada,
                  CodigoMonedaTarifaLigada: objReg.CodigoMonedaTarifaLigada
              }
              AbrirPopupConfiguracionTarifaLigada("Editar", newItem);
          }
          $scope.QuitarConfiguracionLigada = function (idConfiguracionTarifaLigada) {
              MiConfirm("¿Está seguro de eliminar la Tarifa Ligada?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada;
                  var listaBaseMemoria = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria;
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
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada = listaGrilla;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria = listaBase;
                  $scope.Grid_DataBind("ListaTarifaLigada", listaGrilla);
                  $rootScope.$apply();
              });
          }
          $scope.EditarPeriodo = function (idPeriodo) {
              var objReg = $from($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo).where("$IdPeriodo=='" + idPeriodo + "'").firstOrDefault();
              AbrirPopup_Periodo("Editar", objReg);
          }
          $scope.QuitarPeriodo = function (idPeriodo) {
              MiConfirm("¿Está seguro de eliminar el Periodo?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo;
                  var listaBaseMemoria = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo;
                  var listaGrilla = [];
                  var listaBase = [];
                  for (var x = 0; x < listaGrillaMemoria.length; x++) {
                      if (listaGrillaMemoria[x].IdPeriodo != idPeriodo) {
                          listaGrilla.push(listaGrillaMemoria[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].IdPeriodo == idPeriodo) {
                          if (listaBaseMemoria[x].IdPeriodo > 0) {
                              listaBaseMemoria[x].Accion = "D";
                              listaBase.push(listaBaseMemoria[x]);
                          }
                      } else {
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo = listaGrilla;
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = listaBase;

                  $scope.Grid_DataBind("ListaPeriodo", listaGrilla);
                  $rootScope.$apply();
              });
          }
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaTarifaEscalonadaLigada":
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
                  case "grillaListaConfiguracionPeriodo":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarPeriodo(" + rowObject.IdPeriodo + ");";
                                  break;
                              case "Editar":
                                  eventoclick = "$parent.EditarPeriodo(" + rowObject.IdPeriodo + ");";
                                  break;
                          }
                      }
                      break;
                  case "grillaTarifaEscalonadaVigencia":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarVigencia(" + rowObject.CodigoTarifaEscalonadaVigencia + ");";
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
          $scope.Modificar_Click = function () {
              $scope.FlagMostrarBotonGuardar = true;
              $scope.FlagMostrarBotonModificar = false;
              $scope.FlagMostrarBotonDeshabilitar = false;
              $scope.FlagEditing = true;
              $scope.EditingGrillas();
          }
          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaListaSucursales");
              arrayGrillas.push("grillaListaTarifaEscalonadaLigada");
              arrayGrillas.push("grillaListaConfiguracionPeriodo");
              arrayGrillas.push("grillaTarifaEscalonadaVigencia");

              var arrayFechas = new Array();
              arrayFechas.push("ContentListadogrillaVigencia");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, arrayFechas);
          }
          $scope.Guardar_Click = function () {
              var validacion = validacionesCamposGuardar();
              if (validacion == false) {
                  return false;
              }
              var validateVigencia = validarVigenciaCamposGuardar();
              if (validateVigencia == false) {
                  return false;
              }
              var listaSucursalGrabar = [];
              var listaSucursales = $from($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales).where("$idCheck==true").toArray();
              for (var i = 0; i < listaSucursales.length; i++) {
                  var objSucursalTmp = new Object();
                  objSucursalTmp.CodigoTarifaEscalonada = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada;
                  objSucursalTmp.CodigoSucursal = listaSucursales[i].Codigo;
                  objSucursalTmp.Accion = "I";
                  listaSucursalGrabar.push(objSucursalTmp);
              }
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.TarifaEscalonadaFlagEditar && $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada != 0) {
                  var listaEdit = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursalOriginal;
                  if (listaEdit.length > 0) {
                      for (var a = 0; a < listaEdit.length; a++) {
                          var exist = false;
                          for (var b = 0; b < listaSucursalGrabar.length; b++) {
                              if (listaSucursalGrabar[b].CodigoSucursal == listaEdit[a].CodigoSucursal
                                  && listaSucursalGrabar[b].CodigoTarifaEscalonada == listaEdit[a].CodigoTarifaEscalonada) {
                                  listaSucursalGrabar.splice(b, 1);
                                  exist = true;
                              }
                          }
                          if (!exist) {
                              var objSucursal = new Object();
                              objSucursal.CodigoTarifaEscalonada = listaEdit[a].CodigoTarifaEscalonada;
                              objSucursal.CodigoSucursal = listaEdit[a].CodigoSucursal;
                              objSucursal.Accion = "D";
                              listaSucursalGrabar.push(objSucursal);
                          }
                      }
                  }
              }
              //Periodo
              var listaPeridoGrabar = [];
              if ($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo) {
                  $($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo).each(function (i) {
                      var listaTipoContenedorChecked = $.grep(this.ListaTipoContenedor, function (e) { return e.idCheck == true; });
                      $(listaTipoContenedorChecked).each(function (j) {
                          $($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo[i].ListaDetalleRango).each(function (k) {
                              var objInsert = new Object();
                              objInsert.CodigoTipoContenedor = listaTipoContenedorChecked[j].CodigoTipoContenedor;
                              objInsert.CodigoPeriodo = this.Periodo;
                              objInsert.NumeroDias = this.UnidadLibres;
                              objInsert.CodigoMoneda = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo[i].CodigoMoneda;
                              objInsert.DescripcionMoneda = "";
                              objInsert.Precio = this.Precio;
                              objInsert.CodigoTarifaEscalonada = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo[i].CodigoTarifaEscalonada;
                              objInsert.CodigoTarifaEscalonadaVigencia = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo[i].CodigoTarifaEscalonadaVigencia;
                              if ($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo[i].Accion == undefined) {
                                  objInsert.Accion = this.Accion;
                              } else {
                                  objInsert.Accion = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo[i].Accion;
                              }
                              listaPeridoGrabar.push(objInsert);
                          });
                      });
                  });
              }
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada > 0) {
                  var copyPeriodoList = $rootScope.DatosFormulario.DatosTarifaEscalonada.CopyConfiguracionPeriodo;
                  for (var v = 0; v < listaPeridoGrabar.length; v++) {
                      var isExiste = false;
                      for (var z = 0; z < copyPeriodoList.length; z++) {
                          if (listaPeridoGrabar[v].CodigoTipoContenedor == copyPeriodoList[z].CodigoTipoContenedor
                          && listaPeridoGrabar[v].CodigoPeriodo == copyPeriodoList[z].CodigoPeriodo
                          && listaPeridoGrabar[v].CodigoMoneda == copyPeriodoList[z].CodigoMoneda
                          && listaPeridoGrabar[v].NumeroDias == copyPeriodoList[z].NumeroDias
                          && listaPeridoGrabar[v].Precio == copyPeriodoList[z].Precio) {
                              isExiste = true;
                              break;
                          }
                      }
                      if (!isExiste) {
                          listaPeridoGrabar[v].Accion = "I";
                      }
                  }
                  $(copyPeriodoList).each(function (a) {
                      var itemList = $.grep(listaPeridoGrabar, function (e) {
                          return e.CodigoTipoContenedor == copyPeriodoList[a].CodigoTipoContenedor
                          && e.CodigoPeriodo == copyPeriodoList[a].CodigoPeriodo
                          && e.CodigoMoneda == copyPeriodoList[a].CodigoMoneda
                          && e.NumeroDias == copyPeriodoList[a].NumeroDias
                          && e.Precio == copyPeriodoList[a].Precio;
                      });
                      if (itemList.length <= 0) {
                          copyPeriodoList[a].Accion = "D";
                          listaPeridoGrabar.push(copyPeriodoList[a]);
                      }
                  });
              }
              //Fin periodo
              var listaGrillaLigada = $.grep($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigada, function (e) { return e.Accion != undefined; });
              var listaGrillaMemoriaLigada = $.grep($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaLigadaMemoria, function (e) { return e.Accion != undefined; });
              for (var v = 0; v < listaGrillaLigada.length; v++) {
                  if ($.inArray(listaGrillaLigada[v], listaGrillaMemoriaLigada) > -1) {
                  } else {
                      listaGrillaMemoriaLigada.push(listaGrillaLigada[v]);
                  }
              }

              //Inicio Vigencia
              var listaGrillaVigencia = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia;
              var listaGrillaMemoriaVigencia = $.grep($rootScope.DatosFormulario.DatosTarifaEscalonada.grillaListaVigenciaMemList, function (e) { return e.Accion != undefined; });
              for (var v = 0; v < listaGrillaVigencia.length; v++) {
                  if ($.inArray(listaGrillaVigencia[v], listaGrillaMemoriaVigencia) > -1) {
                  } else {
                      listaGrillaMemoriaVigencia.push(listaGrillaVigencia[v]);
                  }
              }


              //Fin Vigencia

              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.ListaTarifaEscalonadaSucursal = listaSucursalGrabar;
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.ListaTarifaEscalonadaLigada = listaGrillaMemoriaLigada;
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.ListaTarifaEscalonadaPeriodo = suprimirPeriodos(listaPeridoGrabar);
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.ListaTarifaEscalonadaVigencia = listaGrillaMemoriaVigencia;

              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada <= 0) {
                  gardarTarifa();
              } else {
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.Accion = determinarAccion($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro);
                  actualizarTarifa();
              }
          }

          function suprimirPeriodos(lstSavePeriodos) {
              var listaFinal = [];
              var lstOriginData = $rootScope.DatosFormulario.DatosTarifaEscalonada.CopyConfiguracionPeriodo;

              return lstSavePeriodos;
          }
          $scope.Deshabilitar_Click = function () {
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada > 0) {
                  MiConfirm("¿Está seguro de deshabilitar la Tarifa Escalonada?.", function () {
                      $.ajax({
                          url: "/TarifaEscalonada/DeshabilitarTarifaEscalonada",
                          type: "POST",
                          headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                          data: $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro,
                          dataType: "json",
                          cache: true,
                          async: false,
                          success: function (data) {
                              if (data.Result != null) {
                                  if (data.Result.Satisfactorio === true) {
                                      MiAlertOk("Se ha deshabilitado la tarifa sobreestadía.", miAlertOkSuccess);
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
                                          MiConfirm(mensaje + " \n\n¿Está seguro de deshabilitar de todas maneras la Tarifa Sobreestadía?.", function () {
                                              $.ajax({
                                                  url: "/TarifaEscalonada/DeshabilitarTarifaEscalonadaConfirmado",
                                                  type: "POST",
                                                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                                  data: $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro,
                                                  dataType: "json",
                                                  cache: true,
                                                  async: false,
                                                  success: function (data1) {
                                                      if (data1.Result != null) {
                                                          if (data1.Result.Satisfactorio === true) {
                                                              MiAlertOk("Se ha deshabilitado la Tarifa Sobreestadía.", miAlertOkSuccess);
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
          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 50);
              if (idgrilla == "grillaListaSucursales") {
                  $.each($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales, function (x) { this.idCheck = check; });
              }
          }
          function validarDatosVigencia(listdata) {
              if (listdata.length > 0) {
                  if (($.grep(listdata, function (e) { return e.InicioVigencia == undefined || e.InicioVigencia == null; })).length > 0) {
                      return true;
                  }
                  else if (($.grep(listdata, function (e) { return e.CodigoTipoFechaCalculo == undefined || e.CodigoTipoFechaCalculo == null; })).length > 0) {
                      return true;
                  }
                  else if (($.grep(listdata, function (e) { return e.DiasDelayCalculo == undefined || e.DiasDelayCalculo == null; })).length > 0) {
                      return true;
                  }
                  else if (($.grep(listdata, function (e) { return e.CodigoTipoDiaCalculo == undefined || e.CodigoTipoDiaCalculo == null; })).length > 0) {
                      return true;
                  }
                  else if (($.grep(listdata, function (e) { return e.CodigoTipoCobro == undefined || e.CodigoTipoCobro == null; })).length > 0) {
                      return true;
                  }
              } else {
                  return true;
              }
              return false;
          }

          function validarVigenciaCamposGuardar() {
              var salida = true;              
              var listaVigencias = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia;
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

          function validacionesCamposGuardar() {
              var salida = true;
              if (validateForm("#RegistroTarifaEscalonadaFrm") == false) {
                  salida = false;
              }
              if (validateForm("#RegistroTarifaEscalonadaPeriodoFrm") == false) {
                  salida = false;
              }
              var vCodigoTarifa = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifa;
              if (vCodigoTarifa == undefined) {
                  $(".caja11.msgerror.DescripcionTarifa").html("La Descripción Tarifa debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.DescripcionTarifa").html("");
                  salida = (salida && true);;
              }

              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoRegimen == undefined) {
                  $(".caja11.msgerror.CodigoRegimen").html("Régimen debe tener un valor.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoRegimen.length <= 0) {
                  $(".caja11.msgerror.CodigoRegimen").html("Régimen debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoRegimen").html("");
                  salida = (salida && true);;
              }

              var vCodigoUsuarioAutorizador = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoUsuarioAutorizador;
              if (vCodigoUsuarioAutorizador == undefined) {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("Autorizado Por debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoUsuarioAutorizador").html("");
                  salida = (salida && true);;
              }
              var listaSucursales = $from($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaSucursales).where("$idCheck==true").toArray();
              if (listaSucursales.length <= 0) {
                  $(".caja11.msgerror.listaSucursal").html("Debe seleccionar por lo menos una Sucursal.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaSucursal").html("");
                  salida = (salida && true);;
              }
              var listaVigencias = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaTarifaEscalonadaVigencia;
              if (listaVigencias.length <= 0) {
                  $(".caja11.msgerror.ListaVigencia").html("Debe ingresar por lo menos una Vigencia.");
                  salida = false;
              }
              else if (validarDatosVigencia(listaVigencias)) {
                  $(".caja11.msgerror.ListaVigencia").html("Debe ingresar los siguientes datos: Inicio Vigencia, Fecha Cálculo, Delay, Tipo Días y Tipo Cobro.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.ListaVigencia").html("");
                  salida = (salida && true);
              }
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo.length <= 0) {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("Debe registrar por lo menos un periodo.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("");
                  salida = (salida && true);;
              }

              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo.length <= 0) {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("Debe configurar por lo menos un periodo.");
                  salida = false;

              } else if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo.length > 0) {
                  var isfalta = false;
                  for (var a = 0; a < $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo.length; a++) {
                      if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo[a].ListaDetalleRango.length == 0) {
                          isfalta = true;
                          break;
                      }
                      if ($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo[a].ListaTipoContenedor.length == 0) {
                          isfalta = true;
                          break;
                      }
                  }
                  if (isfalta) {
                      $(".caja11.msgerror.ListaConfiguracionPeriodo").html("Debe configurar todos los periodos.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.ListaConfiguracionPeriodo").html("");
                  }
              } else {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("");
                  salida = (salida && true);;
              }
              return salida;
          }         

          function gardarTarifa() {

              miBlock(true, "#html");
              $.ajax({
                  url: "/TarifaEscalonada/GrabarTarifaEscalonada",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("Se ha grabado correctamenta la tarifa sobreestadía.", miAlertOkSuccess);
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
          function actualizarTarifa() {
              miBlock(true, "#html");
              $.ajax({
                  url: "/TarifaEscalonada/ActualizarTarifaEscalonada",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("Se ha actualizado correctamente la tarifa sobreestadía.", miAlertOkSuccess);
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
          function miAlertOkSuccess() {
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/bienvenido/";
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
          function determinarAccion(objGrabar) {
              var actionU = "U";
              var actionN = "N";
              var viewInitialData = $rootScope.DatosFormulario.DatosTarifaEscalonada.OriginalDataView;
              if (viewInitialData != undefined) {
                  if (objGrabar.CodigoUsuarioAutorizador != viewInitialData.CodigoUsuarioAutorizador) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoLinea != viewInitialData.CodigoLinea) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTarifa != viewInitialData.CodigoTarifa) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoUnidadCalculo != viewInitialData.CodigoUnidadCalculo) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoRegimen != viewInitialData.CodigoRegimen) {
                      return actionU;
                  }                      
                  else if (objGrabar.CodigoConcepto != viewInitialData.CodigoConcepto) {
                      return actionU;
                  }
                  else {
                      return actionN;
                  }
              } else {
                  return actionU;
              }
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          $scope.ChangeLineaNaviera = function (codigoLinea) {
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.TarifaEscalonadaFlagEditar) {
                  var listaBaseMemoria = $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo;
                  var listaBase = [];
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].IdPeriodo > 0) {
                          listaBaseMemoria[x].Accion = "D";
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = listaBase;
              } else {
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = [];
              }
              $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo = [];
              $scope.gridapiListaConfiguracionPeriodo.refresh([]);
          }
      }]);
})();