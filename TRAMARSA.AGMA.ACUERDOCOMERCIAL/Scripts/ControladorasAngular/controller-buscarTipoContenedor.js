(function () {
    angular.module('api')
    .controller('BuscarTipoContenedorController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionTipoContenedor;

              if (opcion == "ConsultaContenedor") {
                  $rootScope.DatosFormulario.AdministrarContenedor.Filtro.CodigoTipoContenedor = data.CodigoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.Datos.NombreTipoContenedor = data.NombreTipoContenedor;
              }
              if (opcion == "BuscarTipoContenedor") {
                  $rootScope.DatosFormulario.FiltrosBusquedaContenedor.Filtro.CodigoTipoContenedor = data.CodigoTipoContenedor
                  $rootScope.DatosFormulario.FiltrosBusquedaContenedor.Filtro.NombreTipoContenedor = data.NombreTipoContenedor
              }
              else {
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.CodigoTipoContenedor = data.CodigoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NombreTipoContenedor = data.NombreTipoContenedor;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaTipoContenedor").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaTipoContenedor').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.NombreTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.CodigoIsoTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.CodigoIsoGrupoTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.CodTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.TamanioTipoContenedor = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.NombreTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.CodigoIsoTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.CodigoIsoGrupoTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.CodTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro.TamanioTipoContenedor = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTipoContenedor");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTipoContenedor.Filtro)) };
              $scope.gridapigrillaListaTipoContenedor.find(objRequest);
              miBlock(false, "#divPopupBuscarTipoContenedor");

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