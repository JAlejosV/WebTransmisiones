(function () {
    angular.module('api')
    .controller('BuscarMonedaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaMoneda == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaMoneda = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaMoneda.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaMoneda.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionMoneda;

              if (opcion == "RegistrarMoneda") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoMoneda = data.CodigoMoneda;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreMoneda = data.NombreMoneda;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaMoneda").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaMoneda').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaMoneda.Filtro.NombreMoneda = null;
              $rootScope.DatosFormulario.FiltrosBusquedaMoneda.Filtro.CodigoMonedaSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaMoneda.Filtro.NombreMoneda = null;
              $rootScope.DatosFormulario.FiltrosBusquedaMoneda.Filtro.CodigoMonedaSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarMoneda");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaMoneda.Filtro)) };
              $scope.gridapigrillaListaMoneda.find(objRequest);
              miBlock(false, "#divPopupBuscarMoneda");

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