(function () {
    angular.module('api')
    .controller('BuscarUnidadMercanciaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionUnidadMercancia;

              if (opcion == "RegistrarUnidadMercancia") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoUnidadMercancia = data.CodigoUnidadMercancia;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreUnidadMercancia = data.NombreUnidadMercancia;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaUnidadMercancia").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaUnidadMercancia').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia.Filtro.NombreUnidadMercancia = null;
              $rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia.Filtro.CodigoUnidadMercanciaSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia.Filtro.NombreUnidadMercancia = null;
              $rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia.Filtro.CodigoUnidadMercanciaSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarUnidadMercancia");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaUnidadMercancia.Filtro)) };
              $scope.gridapigrillaListaUnidadMercancia.find(objRequest);
              miBlock(false, "#divPopupBuscarUnidadMercancia");

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