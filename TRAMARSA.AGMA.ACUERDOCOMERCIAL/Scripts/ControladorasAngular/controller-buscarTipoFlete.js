(function () {
    angular.module('api')
    .controller('BuscarTipoFleteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoFlete == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionTipoFlete;

              if (opcion == "RegistrarTipoFlete") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoTipoFlete = data.CodigoTipoFlete;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreTipoFlete = data.NombreTipoFlete;
              }
              
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaTipoFlete").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaTipoFlete').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro.NombreTipoFlete = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro.CodigoAduanaTipoFlete = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro.CodigoEquivalencia = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro.NombreTipoFlete = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro.CodigoAduanaTipoFlete = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro.CodigoEquivalencia = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTipoFlete");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTipoFlete.Filtro)) };
              $scope.gridapigrillaListaTipoFlete.find(objRequest);
              miBlock(false, "#divPopupBuscarTipoFlete");

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