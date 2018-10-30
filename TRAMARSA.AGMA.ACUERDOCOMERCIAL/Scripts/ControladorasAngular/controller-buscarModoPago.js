(function () {
    angular.module('api')
    .controller('BuscarModoPagoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaModoPago == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaModoPago = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaModoPago.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaModoPago.Filtro = new Object();

              $rootScope.FlagMostrarBotonSeleccionar = true;
              $scope.Limpiar_Click();
          });

          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
                  var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
                  var estado = ProcesarSeleccionado(data);
                  if (estado) {
                      $rootScope.$apply();
                      $scope.$parent.SalirPopup_Click();
                  }
          }

          function ProcesarSeleccionado(data) {
              var opcion = $rootScope.DatosFormulario.OpcionModoPago;

              if (opcion == "RegistrarModoPago") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoModoPago = data.CodigoModoPago;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreModoPago = data.NombreModoPago;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaModoPago").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaModoPago').getRowData(rowKey);
                          var estado = ProcesarSeleccionado(rowObject);
                          if (estado) {
                              $scope.$parent.SalirPopup_Click();
                          }
                          $(".caja11.msgerror.Objeto").html("");
                      } else {
                          $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                      }
                  } else {
                      $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                  }
          }
          
          $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.FiltrosBusquedaModoPago.Filtro.NombreModoPago = null;
              $rootScope.DatosFormulario.FiltrosBusquedaModoPago.Filtro.CodigoModoPagoSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaModoPago.Filtro.NombreModoPago = null;
              $rootScope.DatosFormulario.FiltrosBusquedaModoPago.Filtro.CodigoModoPagoSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarModoPago");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaModoPago.Filtro)) };
              $scope.gridapigrillaListaModoPago.find(objRequest);
              miBlock(false, "#divPopupBuscarModoPago");

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