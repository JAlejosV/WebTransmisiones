(function () {
    angular.module('api')
    .controller('BuscarLogTransmisionDocumentoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionDocumento == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionDocumento = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionDocumento.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionDocumento.Filtro = new Object();

              $rootScope.FlagMostrarBotonSeleccionar = false;
              $rootScope.FlagMostrarBotonLimpiar = false;
              $rootScope.FlagMostrarBotonBuscar = false;

              $rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionDocumento.Filtro.CodigoDocumento = $rootScope.DatosFormulario.AdministrarTransmisionDocumento.CodigoDocumento;
              $scope.Buscar_Click();
          });

          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarLogTransmisionDocumento");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionDocumento.Filtro)) };
              $scope.gridapigrillaListaLogTransmisionDocumento.find(objRequest);
              miBlock(false, "#divPopupBuscarLogTransmisionDocumento");

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
