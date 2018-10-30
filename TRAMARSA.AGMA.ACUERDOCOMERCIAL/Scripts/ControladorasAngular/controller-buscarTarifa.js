(function () {
    angular.module('api')
    .controller('BuscarTarifaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              $scope.CargarDatosIniciales();
          });
          $scope.CargarDatosIniciales = function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.DatosBusqueda == undefined)
                  $rootScope.DatosFormulario.DatosBusqueda = new Object();

              if ($rootScope.DatosFormulario.DatosGenerales == undefined)
                  $rootScope.DatosFormulario.DatosGenerales = new Object();
              $rootScope.FlagMostrarBotonSeleccionar = true;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas = new Object();
              $.ajax({
                  url: "/BuscarTarifa/ConsultarTarifaIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.DatosBusqueda.Linea = data.Linea;
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.CodigoLinea = data.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.Habilitado = 'False';
                          }
                      }
                      $rootScope.DatosFormulario.DatosBusqueda.Regimen = data.Regimen;
                      $scope.$apply();
                      $scope.Buscar_Click();
                  }
              });
          }
          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
              var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
              var estado = ProcesarSeleccionado(data);
              if (estado) {
                  $rootScope.$apply();
                  $scope.$parent.SalirPopup_Click();
              }
          }
          function ProcesarSeleccionado(data) {
              var opc = $rootScope.DatosFormulario.OpcionTarifa;
              if (opc == "TarifaLocal") {
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifa = data.CodigoTarifa;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.DescripcionTarifa = data.NombreTarifa;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoConcepto = data.CodigoConcepto;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.UnidadCalculo = data.DescripcionUnidadCalculo;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Regimen = data.DescripcionRegimen;
                  $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoRegimen = data.CodigoRegimen;
                  $rootScope.DatosFormulario.DatosGenerales.DataBuscarConcepto = new Object();
                  $rootScope.DatosFormulario.DatosGenerales.DataBuscarConcepto.CodigoConcepto = data.CodigoConcepto;
                  $rootScope.DatosFormulario.DatosGenerales.DataBuscarConcepto.CodigoTarifa = data.CodigoTarifa;
                  $scope.BuscarDistribucionTarifa_Click();
              }
              else if (opc == "TarifaEscalonada") {
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifa = data.CodigoTarifa;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.DescripcionTarifa = data.NombreTarifa;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoConcepto = data.CodigoConcepto;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.Regimen = data.DescripcionRegimen;
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoRegimen = data.CodigoRegimen;
                  $rootScope.DatosFormulario.DatosGenerales.DataBuscarConcepto = new Object();
                  $rootScope.DatosFormulario.DatosGenerales.DataBuscarConcepto.CodigoConcepto = data.CodigoConcepto;
                  $rootScope.DatosFormulario.DatosGenerales.DataBuscarConcepto.CodigoTarifa = data.CodigoTarifa;
                  $scope.BuscarDistribucionTarifa_Click();
              }
              return true;
          }
          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaTarifas").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaTarifas').getRowData(rowKey);
                      var estado = ProcesarSeleccionado(rowObject);
                      $(".caja11.msgerror.Objeto").html("");
                      if (estado) {
                          $scope.$parent.SalirPopup_Click();
                      }
                  } else {
                      $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                  }
              } else {
                  $(".caja11.msgerror.Objeto").html("Seleccione un registro.");

              }
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTarifa");
              if (validateForm("#BusquedaTarifaFrm") == false) {
                  miBlock(false, "#divPopupBuscarTarifa");
                  return false;
              }
              if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.CodigoLinea != undefined) {
                  if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.CodigoLinea.length > 0) {
                      var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas)) };
                      $scope.gridapigrillaListaTarifas.find(objRequest);
                      miBlock(false, "#divPopupBuscarTarifa");
                  }
              }
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.BuscarDistribucionTarifa_Click = function () {
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DatosGenerales.DataBuscarConcepto)) };
              $.ajax({
                  url: "/Maestros/BusquedaDistribucionTarifa",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          var opc = $rootScope.DatosFormulario.OpcionTarifa;
                          if (opc == "TarifaLocal") {
                              $rootScope.DatosFormulario.DatosTarifaLocal.ListaDistribucionTarifas = data.DistribucionTarifasList;
                              $scope.gridapigrillaDistribucionTarifas.refresh(data.DistribucionTarifasList);
                          }
                          else if (opc == "TarifaEscalonada") {
                              $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaDistribucionTarifas = data.DistribucionTarifasList;
                              $scope.gridapigrillaDistribucionTarifas.refresh(data.DistribucionTarifasList);
                          }
                      }
                  }
              });
              miBlock(false, "html");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.CodigoRegimen = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.CodigoConcepto = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.CodigoTarifa = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarTarifas.DescripcionTarifa = null;
              $(".caja11.msgerror.Objeto").html("");
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