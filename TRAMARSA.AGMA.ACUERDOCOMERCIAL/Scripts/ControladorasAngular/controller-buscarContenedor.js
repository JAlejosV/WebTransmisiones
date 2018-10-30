(function () {
    angular.module('api')
    .controller('BuscarContenedorController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaContenedor == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaContenedor = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaContenedor.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaContenedor.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionContenedor;

              if (opcion == "RegistrarContenedor") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoContenedor = data.CodigoContenedor;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor = data.NumeroContenedor;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoContenedor = data.NombreTipoContenedor;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TamanioTipoContenedor = data.TamanioTipoContenedor;
              }
              
              return true;
          } 

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaContenedor").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaContenedor').getRowData(rowKey);
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
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TamanioTipoContenedor = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TamanioTipoContenedor = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarContenedor");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaContenedor.Filtro)) };
              $scope.gridapigrillaListaContenedor.find(objRequest);
              miBlock(false, "#divPopupBuscarContenedor");

          }

          $scope.BuscarTipoContenedor_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoContenedor = "BuscarTipoContenedor";
              getPopupResponsive({
                  formURL: "TipoContenedor/BuscarTipoContenedor",
                  title: "Buscar Tipo Contenedor",
                  nombreDiv: "divPopupBuscarTipoContenedor",
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
                      $compile($("#divPopupBuscarTipoContenedor"))($scope);
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