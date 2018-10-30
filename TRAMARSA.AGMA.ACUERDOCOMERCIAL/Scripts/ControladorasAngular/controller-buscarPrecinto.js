(function () {
    angular.module('api')
    .controller('BuscarPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaPrecinto == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaPrecinto = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionPrecinto;

              if (opcion == "RegistrarPrecinto") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoPrecinto = data.CodigoPrecinto;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroPrecinto = data.NumeroPrecinto;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaPrecinto").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaPrecinto').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NumeroPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoCondicionPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NombreCondicionPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoEntidadPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NombreEntidadPrecinto = null;
          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NumeroPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoCondicionPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NombreCondicionPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.CodigoEntidadPrecinto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro.NombreEntidadPrecinto = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarPrecinto");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaPrecinto.Filtro)) };
              $scope.gridapigrillaListaPrecinto.find(objRequest);
              miBlock(false, "#divPopupBuscarPrecinto");

          }

          $scope.BuscarCondicionPrecinto_Click = function () {
              $rootScope.DatosFormulario.OpcionCondicionPrecinto = "BuscarCondicionPrecinto";
              getPopupResponsive({
                  formURL: "CondicionPrecinto/BuscarCondicionPrecinto",
                  title: "Buscar Condicion de Precinto",
                  nombreDiv: "divPopupBuscarCondicionPrecinto",
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
                      $compile($("#divPopupBuscarCondicionPrecinto"))($scope);
                  }
              });
          }

          $scope.BuscarEntidadPrecinto_Click = function () {
              $rootScope.DatosFormulario.OpcionEntidadPrecinto = "BuscarEntidadPrecinto";
              getPopupResponsive({
                  formURL: "EntidadPrecinto/BuscarEntidadPrecinto",
                  title: "Buscar Entidad de Precinto",
                  nombreDiv: "divPopupBuscarEntidadPrecinto",
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
                      $compile($("#divPopupBuscarEntidadPrecinto"))($scope);
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