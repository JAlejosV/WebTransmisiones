(function () {
    angular.module('api')
    .controller('BuscarTipoMovimientoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionTipoMovimiento;

              if (opcion == "RegistrarTipoMovimiento") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTipoMovimiento = data.CodigoTipoMovimiento;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoMovimiento = data.NombreTipoMovimiento;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaTipoMovimiento").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaTipoMovimiento').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento.Filtro.NombreTipoMovimiento = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento.Filtro.CodigoTipoMovimientoSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento.Filtro.NombreTipoMovimiento = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento.Filtro.CodigoTipoMovimientoSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTipoMovimiento");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTipoMovimiento.Filtro)) };
              $scope.gridapigrillaListaTipoMovimiento.find(objRequest);
              miBlock(false, "#divPopupBuscarTipoMovimiento");

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