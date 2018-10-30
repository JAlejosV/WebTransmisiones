(function () {
    angular.module('api')
    .controller('BuscarViaTransporteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaViaTransporte == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaViaTransporte = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaViaTransporte.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaViaTransporte.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionViaTransporte;
              
              if (opcion == "ConsultaViaTransporte") {
                  $rootScope.DatosFormulario.AdministrarAduana.Filtro.CodigoViaTransporte = data.CodigoViaTransporte;
                  $rootScope.DatosFormulario.AdministrarAduana.Datos.NombreViaTransporte = data.NombreViaTransporte;
              }
              else if (opcion == "BuscarViaTransporteAduana") {
                  $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoViaTransporte = data.CodigoViaTransporte;
                  $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombreViaTransporte = data.NombreViaTransporte;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoViaTransporte = data.CodigoViaTransporte;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreViaTransporte = data.NombreViaTransporte;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaViaTransporte").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaViaTransporte').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaViaTransporte.Filtro.NombreViaTransporte = null;
              $rootScope.DatosFormulario.FiltrosBusquedaViaTransporte.Filtro.CodigoViaTransporteSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaViaTransporte.Filtro.NombreViaTransporte = null;
              $rootScope.DatosFormulario.FiltrosBusquedaViaTransporte.Filtro.CodigoViaTransporteSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarViaTransporte");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaViaTransporte.Filtro)) };
              $scope.gridapigrillaListaViaTransporte.find(objRequest);
              miBlock(false, "#divPopupBuscarViaTransporte");

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