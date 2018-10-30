(function () {
    angular.module('api')
    .controller('BuscarRequerimientoServicioController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionRequerimientoServicio;
              if (opcion == "BuscarRequerimientoServicioRegistrarDocumento") {
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoRequerimientoServicio = data.CodigoRequerimientoServicio;
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreRequerimientoServicio = data.NombreRequerimientoServicio;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaRequerimientoServicio").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaRequerimientoServicio').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio.Filtro.NombreRequerimientoServicio = null;
              $rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio.Filtro.CodigoRequerimientoServicioSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio.Filtro.NombreRequerimientoServicio = null;
              $rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio.Filtro.CodigoRequerimientoServicioSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarRequerimientoServicio");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaRequerimientoServicio.Filtro)) };
              $scope.gridapigrillaListaRequerimientoServicio.find(objRequest);
              miBlock(false, "#divPopupBuscarRequerimientoServicio");

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