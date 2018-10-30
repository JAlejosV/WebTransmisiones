(function () {
    angular.module('api')
    .controller('BuscarCondicionPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionCondicionPrecinto;

              if (opcion == "ConsultaPrecinto") {
                  $rootScope.DatosFormulario.AdministrarPrecinto.Filtro.CodigoCondicionPrecinto = data.CodigoCondicionPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.Datos.NombreCondicionPrecinto = data.NombreCondicionPrecinto;
              }
              if (opcion == "BuscarCondicionPrecinto") {
                  $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoCondicionPrecinto = data.CodigoCondicionPrecinto;
                  $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NombreCondicionPrecinto = data.NombreCondicionPrecinto;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoCondicionPrecinto = data.CodigoCondicionPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreCondicionPrecinto = data.NombreCondicionPrecinto;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaCondicionPrecinto").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaCondicionPrecinto').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto.Filtro.NombreCondicionPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto.Filtro.CodigoCondicionPrecintoSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto.Filtro.NombreCondicionPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto.Filtro.CodigoCondicionPrecintoSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarCondicionPrecinto");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaCondicionPrecinto.Filtro)) };
              $scope.gridapigrillaListaCondicionPrecinto.find(objRequest);
              miBlock(false, "#divPopupBuscarCondicionPrecinto");

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