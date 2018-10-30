(function () {
    angular.module('api')
    .controller('BuscarClaseIMOController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaClaseIMO == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaClaseIMO = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaClaseIMO.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaClaseIMO.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionClaseIMO;

              if (opcion == "ConsultaNumeroIMO") {
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro.CodigoClaseIMO = data.CodigoClaseIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.Datos.NombreClaseIMO = data.NombreClaseIMO;
              }
              if (opcion == "RegistrarClaseIMO") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoClaseIMO = data.CodigoClaseIMO;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreClaseIMO = data.NombreClaseIMO;
              }
              if (opcion == "BuscarClaseIMO") {
                  $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.CodigoClaseIMO = data.CodigoClaseIMO;
                  $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.NombreClaseIMO = data.NombreClaseIMO;
              }
              if (opcion == "RegistroNumeroIMO") {
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.CodigoClaseIMO = data.CodigoClaseIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreClaseIMO = data.NombreClaseIMO;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaClaseIMO").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaClaseIMO').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaClaseIMO.Filtro.NombreClaseIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaClaseIMO.Filtro.CodigoClaseIMOSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaClaseIMO.Filtro.NombreClaseIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaClaseIMO.Filtro.CodigoClaseIMOSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarClaseIMO");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaClaseIMO.Filtro)) };
              $scope.gridapigrillaListaClaseIMO.find(objRequest);
              miBlock(false, "#divPopupBuscarClaseIMO");

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