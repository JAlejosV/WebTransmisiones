(function () {
    angular.module('api')
    .controller('BuscarNumeroIMOController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionNumeroIMO;

              if (opcion == "RegistrarNumeroIMO") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNumeroIMO = data.CodigoNumeroIMO;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNumeroIMO = data.NombreNumeroIMO;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaNumeroIMO").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaNumeroIMO').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.CodigoNumeroIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.NumberIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.NombreNumeroIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.PaginaNumeroIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.NombreClaseIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.CodigoClaseIMO = null;
          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.CodigoNumeroIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.NumberIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.NombreNumeroIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.PaginaNumeroIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.NombreClaseIMO = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro.CodigoClaseIMO = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarNumeroIMO");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaNumeroIMO.Filtro)) };
              $scope.gridapigrillaListaNumeroIMO.find(objRequest);
              miBlock(false, "#divPopupBuscarNumeroIMO");

          }

          $scope.BuscarClaseIMO_Click = function () {
              $rootScope.DatosFormulario.OpcionClaseIMO = "BuscarClaseIMO";
              getPopupResponsive({
                  formURL: "ClaseIMO/BuscarClaseIMO",
                  title: "Buscar Clase IMO",
                  nombreDiv: "divPopupBuscarClaseIMO",
                  nombreGrid: "",
                  width: "1200px",
                  height: 800,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarClaseIMO"))($scope);
                  }
              });
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