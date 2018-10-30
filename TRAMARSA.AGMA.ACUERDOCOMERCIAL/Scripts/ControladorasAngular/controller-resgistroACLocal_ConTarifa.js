(function () {
    angular.module('api')
    .controller('RegistroACLocal_ConTarifaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {

          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLigadaAC == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLigadaAC = new Object();
              if ($rootScope.DatosFormulario.DatosTarifaLigadaAC.grillaListaTarifaLigadaMemoria == undefined)
                  $rootScope.DatosFormulario.DatosTarifaLigadaAC.grillaListaTarifaLigadaMemoria = [];

              $rootScope.FlagMostrarBotonGrabar = false;
              $scope.CargarDatosIniciales();
              $scope.EditingGrillas();
          });
          $scope.CargarDatosIniciales = function () {
              $rootScope.DatosFormulario.DatosTarifaLigadaAC.DescripcionTarifa = $scope.row.DescripcionTarifa;
              $rootScope.DatosFormulario.DatosTarifaLigadaAC.IdConfiguracionTarifa = $scope.row.IdConfiguracionTarifa;
              $rootScope.DatosFormulario.DatosTarifaLigadaAC.CodigoAcuerdoComercialLocal = $scope.row.CodigoAcuerdoComercialLocal;
              $rootScope.DatosFormulario.DatosTarifaLigadaAC.CodigoTarifaLocal = $scope.row.CodigoTarifaLocal;
              var listaMemoria = $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList;
              $rootScope.DatosFormulario.DatosTarifaLigadaAC.IdCount = listaMemoria.length + 1;
              var listLigada = $.grep(listaMemoria, function (e) { return e.IdConfiguracionTarifa == $scope.row.IdConfiguracionTarifa; });
              $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria = listLigada;
              $scope.gridapigrillaEdicionTarifaLigada.refresh(listLigada);
          }

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaEdicionTarifaLigada":
                      {
                          switch (tipoboton) {
                              case "Quitar":
                                  eventoclick = "$parent.QuitarConfiguracionLigadaAC(" + rowObject.IdConfiguracionTarifaLigada + ");";
                                  break;
                              case "Editar":
                                  eventoclick = "$parent.EditarConfiguracionLigadaAC(" + rowObject.IdConfiguracionTarifaLigada + ");";
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
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.AgregarTarifaLigada_Click = function () {
              var nuevoId = parseInt($rootScope.DatosFormulario.DatosTarifaLigadaAC.IdCount);
              var newItem = {
                  IdConfiguracionTarifaLigada: -nuevoId,
                  CodigoTarifaLigadaLocal: null,
                  DescripcionTarifaLocal: null,
                  CodigoTarifaLocal: null,
                  DescripcionMonedaBase: null,
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
          }
          AbrirPopup_ConfiguracionTarifaLigada = function (tipo, rowObject) {
              $rootScope.DatosFormulario.OpcionTarifaLigada = "AcuerdoComercialLocal";
              getPopupResponsive({
                  formURL: "es-PE/sistema/registro-de-tarifa-local/configuracion-tarifa-ligada/",
                  title: "Configuración de Tarifa Ligada",
                  nombreDiv: "divPopupAgregarTarifaLida",
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
                      $compile($("#divPopupAgregarTarifaLida"))($scope);
                      var scopePopup = angular.element("#divPopupAgregarTarifaLida").scope();
                      if (rowObject) {
                          scopePopup.row = JSON.parse(JSON.stringify(rowObject));
                          scopePopup.rowOk = rowObject;
                      }
                  }
              });
          }
          $scope.EditarConfiguracionLigadaAC = function (idConfiguracionTarifaLigada) {
              var objReg = $from($rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemoria).where("$IdConfiguracionTarifaLigada=='" + idConfiguracionTarifaLigada + "'").firstOrDefault();
              AbrirPopup_ConfiguracionTarifaLigada("Editar", objReg);
          }
          $scope.QuitarConfiguracionLigadaAC = function (idConfiguracionTarifaLigada) {
              MiConfirm("¿Está seguro de eliminar la Tarifa Ligada?", function () {
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
                  $scope.gridapigrillaEdicionTarifaLigada.refresh(listaGrilla);
                  $rootScope.$apply();
              });
          }
          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaEdicionTarifaLigada");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, "");
          }
      }]);
})();