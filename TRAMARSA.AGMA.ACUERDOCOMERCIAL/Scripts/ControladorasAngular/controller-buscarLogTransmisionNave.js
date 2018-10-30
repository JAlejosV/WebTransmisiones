(function () {
    angular.module('api')
    .controller('BuscarLogTransmisionNaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionNave == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionNave = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionNave.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionNave.Filtro = new Object();

              $rootScope.FlagMostrarBotonSeleccionar = false;
              $rootScope.FlagMostrarBotonLimpiar = false;
              $rootScope.FlagMostrarBotonBuscar = false;

              //$rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro.CodigoTipoContenedorExterno = $scope.row.CodigoTipoContenedorExterno;
              //$rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionNave.Filtro.CodigoItinerario = $scope.row.CodigoItinerario;
              $rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionNave.Filtro.CodigoItinerario = $rootScope.DatosFormulario.AdministrarTransmisionNave.CodigoItinerario;
              $scope.Buscar_Click();
          });

          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarLogTransmisionNave");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaLogTransmisionNave.Filtro)) };
              //var objRequest = { "filtro": JSON.parse(JSON.stringify(parseInt($rootScope.DatosFormulario.AdministrarTransmisionNave.CodigoItinerario))) };
              $scope.gridapigrillaListaLogTransmisionNave.find(objRequest);
              miBlock(false, "#divPopupBuscarLogTransmisionNave");

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
