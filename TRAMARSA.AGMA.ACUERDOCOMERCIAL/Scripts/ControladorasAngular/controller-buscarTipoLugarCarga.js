(function () {
    angular.module('api')
    .controller('BuscarTipoLugarCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionTipoLugarCarga;
              var opcion2 = $rootScope.DatosFormulario.OpcionTipoLugarCargaPuertoIntermedio;

              if (opcion == "RegistroItinerario") {
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoLugarCarga = data.CodigoTipoLugarCarga;
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCarga = data.NombreTipoLugarCarga;
              }
              if (opcion2 == "RegistroItinerarioPuertoIntermedio") {
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoLugarCargaPuertoIntermedio = data.CodigoTipoLugarCarga;
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCargaPuertoIntermedio = data.NombreTipoLugarCarga;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaTipoLugarCarga").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaTipoLugarCarga').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga.Filtro.NombreTipoLugarCarga = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga.Filtro.CodigoTipoLugarCargaSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga.Filtro.NombreTipoLugarCarga = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga.Filtro.CodigoTipoLugarCargaSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTipoLugarCarga");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTipoLugarCarga.Filtro)) };
              $scope.gridapigrillaListaTipoLugarCarga.find(objRequest);
              miBlock(false, "#divPopupBuscarTipoLugarCarga");

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