(function () {
    angular.module('api')
    .controller('BuscarTipoOperacionController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionTipoOperacion;

              if (opcion == "ConsultaTipoOperacion") {
                  $rootScope.DatosFormulario.AdministrarAduana.Filtro.CodigoTipoOperacion = data.CodigoTipoOperacion;
                  $rootScope.DatosFormulario.AdministrarAduana.Datos.NombreTipoOperacion = data.NombreTipoOperacion;
              }
              else if (opcion == "ConsultaItinerario") {
                  $rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoTipoOperacion = data.CodigoTipoOperacion;
                  $rootScope.DatosFormulario.AdministrarItinerario.Datos.NombreTipoOperacion = data.NombreTipoOperacion;
              }
              else if (opcion == "RegistroItinerario") {
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion = data.CodigoTipoOperacion;
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoOperacion = data.NombreTipoOperacion;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoTipoOperacion = data.CodigoTipoOperacion;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreTipoOperacion = data.NombreTipoOperacion;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaTipoOperacion").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaTipoOperacion').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion.Filtro.NombreTipoOperacion = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion.Filtro.CodigoTipoOperacionSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion.Filtro.NombreTipoOperacion = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion.Filtro.CodigoTipoOperacionSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTipoOperacion");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTipoOperacion.Filtro)) };
              $scope.gridapigrillaListaTipoOperacion.find(objRequest);
              miBlock(false, "#divPopupBuscarTipoOperacion");

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