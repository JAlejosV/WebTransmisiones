(function () {
    angular.module('api')
    .controller('BuscarLineaNavieraController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionLineaNaviera;

              if (opcion == "ConsultaNave") {
                  $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoLineaNaviera = data.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarNave.Datos.NombreLineaNaviera = data.NombreLineaNaviera;
              }
              else if (opcion == "ConsultaLineaNaviera") {
                  $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoLineaNaviera = data.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarNave.Datos.NombreLineaNaviera = data.NombreLineaNaviera;
              }
              else if (opcion == "BuscarLineaNaviera") {
                  $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoLineaNaviera = data.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreLineaNaviera = data.NombreLineaNaviera;
              }
              else if (opcion == "BuscarLineaNavieraDocumento") {
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoLineaNaviera = data.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreLineaNaviera = data.NombreLineaNaviera;
              }
              else if (opcion == "BuscarLineaNavieraRegistrarDocumento") {
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoLineaNaviera = data.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreLineaNaviera = data.NombreLineaNaviera;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoLineaNaviera = data.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreLineaNaviera = data.NombreLineaNaviera;
              }
              return true;
          } 

          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaLineaNaviera").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaLineaNaviera').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera.Filtro.NombreLineaNaviera = null;
              $rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera.Filtro.RucLineaNaviera = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera.Filtro.NombreLineaNaviera = null;
              $rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera.Filtro.RucLineaNaviera = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarLineaNaviera");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaLineaNaviera.Filtro)) };
              $scope.gridapigrillaListaLineaNaviera.find(objRequest);
              miBlock(false, "#divPopupBuscarLineaNaviera");

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