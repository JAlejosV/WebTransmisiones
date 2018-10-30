(function () {
    angular.module('api')
    .controller('ConfiguracionTarifaACEController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.ConfiguracionTarifaACE == undefined)
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE = new Object();
              if ($rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro == undefined)
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro = new Object();
              if ($rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosConfiguracion == undefined)
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosConfiguracion = new Object();

              if ($rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory == undefined)
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory = [];
              if ($rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria == undefined)
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria = [];

              $scope.gridapigrillaAceListaConfigTarifaLigada.clear();
              $scope.gridapigrillaAceListaConfiguracionPeriodo.clear();
              $scope.gridapigrillaAceListaConfigTarifaLigada.refresh(null);
              $scope.gridapigrillaAceListaConfiguracionPeriodo.refresh(null);
              $scope.FlagMostrarBotonGuardar = $scope.FlagEditing;
              $scope.CargarDatosIniciales();
              $scope.EditingGrillas();
          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/AcuerdoComercialEscalonado/ConfiguracionTarifaIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosConfiguracion.ListaTipoFechaCalculo = data.ListaTipoFechaCalculo;
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosConfiguracion.ListaTipoDiaCalculo = data.ListaTipoDiaCalculo;

                      //Form
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro = $scope.row;
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.DiasDelayCalculo = '' + $scope.row.DiasDelayCalculo + '';

                      var listPeriodo = [];
                      var listLigada = [];
                      var listaMemoriaPeriodo = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria;
                      var listaMemoriaLigada = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria;
                      listLigada = $.grep(listaMemoriaLigada, function (e) { return e.CodigoTarifaEscalonado == $scope.row.CodigoTarifaEscalonado && e.Accion != "D"; });
                      listPeriodo = $.grep(listaMemoriaPeriodo, function (e) { return e.CodigoTarifaEscalonado == $scope.row.CodigoTarifaEscalonado && e.Accion != "D"; });
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory = listPeriodo;
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria = listLigada;
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada = listLigada;
                      if ($scope.row.CodigoTipoFechaCalculo == undefined && $scope.row.CodigoTipoDiaCalculo == undefined) {
                          CargarTarifaLigadaAcuerdoComercial($scope.row.CodigoTarifaEscalonado);
                      } else {
                          $scope.gridapigrillaAceListaConfigTarifaLigada.refresh(listLigada);
                      }
                      $scope.gridapigrillaAceListaConfiguracionPeriodo.refresh(listPeriodo);
                      $rootScope.$apply();
                  }
              });
          }
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaAceListaConfigTarifaLigada":
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
                  case "grillaAceListaConfiguracionPeriodo":
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
              }
              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              if (tipoboton == "Quitar") {
                  html = HtmlCrearBoton("Eliminar", eventoclick, "");
              }
              return html;
          }

          $scope.AgregarConfiguracionPeriodo_Click = function () {
              if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea != undefined) {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("");
                  var newItem = new Object();
                  var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfiguracionPeriodo, "IdPeriodo");
                  newItem = {
                      IdPeriodo: nuevoId
                  }
                  AbrirPopupPeriodo("Nuevo", newItem);
              }
              else {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("Seleccione Línea Naviera.");
              }
          }
          $scope.EditarPeriodo = function (idPeriodo) {
              var objReg = $from($rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory).where("$IdPeriodo=='" + idPeriodo + "'").firstOrDefault();
              AbrirPopupPeriodo("Editar", objReg);
          }
          $scope.QuitarPeriodo = function (idPeriodo) {
              MiConfirm("¿Está seguro de eliminar el Periodo?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfiguracionPeriodo;
                  var listaBaseMemoria = $rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory;
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
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfiguracionPeriodo = listaGrilla;
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory = listaBase;
                  $scope.Grid_DataBind("ListaPeriodo", listaGrilla);
                  $rootScope.$apply();
              });
          }
          AbrirPopupPeriodo = function (tipo, objReg) {
              getPopupResponsive({
                  formURL: "/ConfiguracionPeriodoACEscalonado/ConfiguracionPeridoACE",
                  title: "Configuración Rangos",
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

          $scope.AgregarTarifaLigada_Click = function () {
              var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada, "IdConfiguracionTarifaLigada");
              var newItem = {
                  IdConfiguracionTarifaLigada: nuevoId,
                  CodigoTarifa: null,
                  CodigoTarifaLigadaLocal: null,
                  DescripcionTarifaLocal: null,
                  CodigoTarifaLocal: $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.CodigoTarifaEscalonado,
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
              AbrirPopup_ConfiguracionTarifaLigada("Nuevo", newItem);
          }
          $scope.EditarConfiguracionLigada = function (idConfiguracionTarifaLigada) {
              var objReg = $from($rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada).where("$IdConfiguracionTarifaLigada=='" + idConfiguracionTarifaLigada + "'").firstOrDefault();
              var newItem = {
                  IdConfiguracionTarifaLigada: objReg.IdConfiguracionTarifaLigada,
                  CodigoTarifa: objReg.CodigoTarifa,
                  CodigoTarifaLigadaLocal: objReg.CodigoTarifaLigadaEscalonado,
                  CodigoTarifaLocal: objReg.CodigoTarifaEscalonado,
                  DescripcionTarifaLocal: objReg.DescripcionTarifaEscalonada,
                  MonedaTarifaLocal: objReg.MonedaTarifaEscalonada,
                  MontoTarifaLocal: objReg.MontoTarifaEscalonada,
                  DescripcionConfiguracionTarifaLigada: objReg.DescripcionConfiguracionTarifaLigada,
                  Porcentaje: '' + objReg.Porcentaje + '',
                  CodigoMoneda: objReg.CodigoMoneda,
                  Moneda: objReg.Moneda,
                  Monto: objReg.Monto,
                  CodigoConfiguracionTarifaLigada: objReg.CodigoConfiguracionTarifaLigada,
                  CodigoMonedaTarifaLigada: objReg.CodigoMonedaTarifaLigada,
                  DescripcionMonedaBase: objReg.DescripcionMonedaBase
              }
              AbrirPopup_ConfiguracionTarifaLigada("Editar", newItem);
          }
          $scope.QuitarConfiguracionLigada = function (idConfiguracionTarifaLigada) {
              MiConfirm("¿Está seguro de eliminar la Tarifa Ligada?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada;
                  var listaBaseMemoria = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria;
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
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada = listaGrilla;
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria = listaBase;
                  $scope.Grid_DataBind("ListaTarifaLigada", listaGrilla);
                  $rootScope.$apply();
              });
          }
          AbrirPopup_ConfiguracionTarifaLigada = function (tipo, rowObject) {
              $rootScope.DatosFormulario.OpcionTarifaLigada = "AcuerdoComercialEscalonado";
              var altura = 800;
              getPopupResponsive({
                  formURL: "/ConfiguracionTarifaLigada/ConfigurarTarifaLigada",
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

          $(document).tooltip({
              items: "[tooltip-Nave]",
              tooltipClass: "tooltip-Nave",
              track: false,

              content: function () {
                  var s = $rootScope.DatosFormulario;
                  var element = $(this);
                  if (element.is("[tooltip-Nave]")) {
                      var IdItem = element.attr("tooltip-Nave");
                      if (IdItem == "grillaAceListaConfiguracionPeriodo") {

                          var mitabla = "<table border=0 cellpadding=3 cellspacing=0>";
                          var mifilaH = "<thead><tr>"
                          mifilaH = mifilaH + '<th style="width:100px">Periodo</th>';
                          mifilaH = mifilaH + '<th style="width:100px">Unid. Libres</th>';
                          mifilaH = mifilaH + '<th style="width:100px">Precio</th>';
                          mitabla = mitabla + mifilaH + "</tr></thead><tbody>";

                          var objTemp = $(this).attr("objtooltip").replace("root", "rootScope");
                          var indexFin = objTemp.lastIndexOf(".");
                          var objElementoGeneral = eval(objTemp.slice(0, indexFin));
                          var objElemento = objElementoGeneral.ListaDetalleRango;

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

          $scope.Guardar_Click = function () {
              var validacion = validacionesCamposGuardar();
              if (validacion == false) {
                  return false;
              }
              //Tarifa
              var newObjTarifa = $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro;
              var listaGrillaTarifa = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa;
              var listaMemoriaTarifa = $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList;
              for (var number = 0; number < listaGrillaTarifa.length; number++) {
                  if (listaGrillaTarifa[number].IdTarifa === newObjTarifa.IdTarifa) {
                      if (listaGrillaTarifa[number].IdTarifa > 0) {
                          listaGrillaTarifa[number].Accion = "U";
                      }
                      listaGrillaTarifa[number] = newObjTarifa;
                  }
              }
              for (var x = 0; x < listaMemoriaTarifa.length; x++) {
                  if (listaMemoriaTarifa[x].IdTarifa === newObjTarifa.IdTarifa) {
                      if (listaMemoriaTarifa[x].IdTarifa > 0) {
                          listaMemoriaTarifa[x].Accion = "U";
                      }
                      listaMemoriaTarifa[x] = newObjTarifa;
                  }
              }
              //Periodo
              var listaPeriodoMemoria = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria, function (e) { return e.CodigoTarifaEscalonado != $scope.row.CodigoTarifaEscalonado || e.Accion == "D"; });
              var listPeriodo = $rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory;
              for (var b = 0; b < listPeriodo.length; b++) {
                  listPeriodo[b].CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.CodigoAcuerdoComercialEscalonado;
                  listPeriodo[b].CodigoTarifaEscalonado = $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.CodigoTarifaEscalonado;
                  listaPeriodoMemoria.push(listPeriodo[b]);
              }
              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaPeriodoMemoria = listaPeriodoMemoria;

              //Tarifas ligadas
              var listaLigadaMemoria = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria, function (e) { return e.CodigoTarifaEscalonado != $scope.row.CodigoTarifaEscalonado || e.Accion == "D"; });
              var listLigada = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria;
              for (var a = 0; a < listLigada.length; a++) {
                  listaLigadaMemoria.push(listLigada[a]);
              }
              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria = listaLigadaMemoria;
              $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa = listaGrillaTarifa;
              $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList = listaMemoriaTarifa;
              $scope.gridapigrillaAceListaTarifa.refresh(listaGrillaTarifa);
              $scope.gridapigrillaAceListaConfigTarifaLigada.refresh([]);
              $scope.gridapigrillaAceListaConfiguracionPeriodo.refresh([]);
              $scope.$parent.SalirPopup_Click();
          }
          $scope.Grid_DataBind = function (grid, data) {
              if (grid == "ListaTarifaLigada") {
                  $scope.gridapigrillaAceListaConfigTarifaLigada.refresh(data);
              }
              if (grid == "ListaPeriodo") {
                  $scope.gridapigrillaAceListaConfiguracionPeriodo.refresh(data);
              }
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaAceListaConfiguracionPeriodo");
              arrayGrillas.push("grillaAceListaConfigTarifaLigada");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, []);
          }
          function validacionesCamposGuardar() {
              var salida = true;
              if (validateForm("#ConfiguracuionLogicaFrm") == false) {
                  salida = false;
              }
              if ($rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfiguracionPeriodo.length <= 0) {
                  $(".caja11.msgerror.ListaConfiguracionPeriodo").html("Debe configurar por lo menos un periodo.");
                  salida = false;

              }
              return salida;
          }
          function CargarTarifaLigadaAcuerdoComercial(codigoTarifaEscalonado) {
              $.ajax({
                  url: "/TarifaEscalonada/ConsultarDetalleTarifaEscalonada",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoTarifaEscalonada=" + codigoTarifaEscalonado,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.DetalleTarifaEscalonadaList.length > 0) {
                              if (data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaLigadaList.length > 0) {
                                  var listLigada = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaLigadaList;
                                  var listaTarifaLigada = [];
                                  $(listLigada).each(function (j) {
                                      var objItem = new Object();
                                      objItem.IdConfiguracionTarifaLigada = -this.IdConfiguracionTarifaLigada;
                                      objItem.CodigoTarifa = this.CodigoTarifa;
                                      objItem.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.CodigoAcuerdoComercialEscalonado;
                                      objItem.CodigoTarifaEscalonado = $rootScope.DatosFormulario.ConfiguracionTarifaACE.DatosRegistro.CodigoTarifaEscalonado;//
                                      objItem.CodigoTarifaLigadaEscalonado = this.CodigoTarifaLigadaEscalonada;//
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
                                      listaTarifaLigada.push(objItem);
                                  });
                                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria = listaTarifaLigada;
                                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada = listaTarifaLigada;
                                  $scope.gridapigrillaAceListaConfigTarifaLigada.refresh(listaTarifaLigada);
                                  $rootScope.$apply();
                              }
                          }
                          else {
                              $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria = [];
                              $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada = [];
                              $scope.gridapigrillaAceListaConfigTarifaLigada.refresh([]);
                              $rootScope.$apply();
                          }
                      } else {
                          $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigadaMemoria = [];
                          $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfigTarifaLigada = [];
                          $scope.gridapigrillaAceListaConfigTarifaLigada.refresh([]);
                          $rootScope.$apply();
                      }
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
