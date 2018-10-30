(function () {
    angular.module('api')
    .controller('BuscarTipoNaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoNave == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoNave = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoNave.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoNave.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionTipoNave;

              if (opcion == "ConsultaNave") {
                  $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoTipoNave = data.CodigoTipoNave;
                  $rootScope.DatosFormulario.AdministrarNave.Datos.NombreTipoNave = data.NombreTipoNave;
              }
              else if (opcion == "ConsultaTipoNave") {
                  $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoTipoNave = data.CodigoTipoNave;
                  $rootScope.DatosFormulario.AdministrarNave.Datos.NombreTipoNave = data.NombreTipoNave;
              }
              else if (opcion == "BuscarNave") {
                  $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoTipoNave = data.CodigoTipoNave;
                  $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreTipoNave = data.NombreTipoNave;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoTipoNave = data.CodigoTipoNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreTipoNave = data.NombreTipoNave;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaTipoNave").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaTipoNave').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaTipoNave.Filtro.NombreTipoNave = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoNave.Filtro.CodigoTipoNaveSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTipoNave.Filtro.NombreTipoNave = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoNave.Filtro.CodigoTipoNaveSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTipoNave");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTipoNave.Filtro)) };
              $scope.gridapigrillaListaTipoNave.find(objRequest);
              miBlock(false, "#divPopupBuscarTipoNave");

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