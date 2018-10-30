    (function () {
    angular.module('api')
    .controller('BuscarEntidadPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionEntidadPrecinto;

              if (opcion == "ConsultaPrecinto") {
                  $rootScope.DatosFormulario.AdministrarPrecinto.Filtro.CodigoEntidadPrecinto = data.CodigoEntidadPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.Datos.NombreEntidadPrecinto = data.NombreEntidadPrecinto;
              }
              if (opcion == "BuscarEntidadPrecinto") {
                  $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoEntidadPrecinto = data.CodigoEntidadPrecinto;
                  $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NombreEntidadPrecinto = data.NombreEntidadPrecinto;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoEntidadPrecinto = data.CodigoEntidadPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreEntidadPrecinto = data.NombreEntidadPrecinto;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaEntidadPrecinto").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaEntidadPrecinto').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto.Filtro.NombreEntidadPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto.Filtro.CodigoEntidadPrecintoSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto.Filtro.NombreEntidadPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto.Filtro.CodigoEntidadPrecintoSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarEntidadPrecinto");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaEntidadPrecinto.Filtro)) };
              $scope.gridapigrillaListaEntidadPrecinto.find(objRequest);
              miBlock(false, "#divPopupBuscarEntidadPrecinto");

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