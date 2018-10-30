(function () {
    angular.module('api')
    .controller('BuscarNaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaNave == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaNave = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionNave;

              if (opcion == "ConsultaItinerario") {
                  $rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoNave = data.CodigoNave;
                  $rootScope.DatosFormulario.AdministrarItinerario.Datos.NombreNave = data.NombreNave;
              }
              else if (opcion == "BuscarItinerarioNave") {
                  $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.CodigoNave = data.CodigoNave;
                  $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NombreNave = data.NombreNave;
              }
              else if (opcion == "ConsultaTransmisionNave") {
                  $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.CodigoNave = data.CodigoNave;
                  $rootScope.DatosFormulario.AdministrarTransmisionNave.Datos.NombreNave = data.NombreNave;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoNave = data.CodigoNave;
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreNave = data.NombreNave;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaNave").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaNave').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoPais = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombrePais = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoTipoNave = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreTipoNave = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoLineaNaviera = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreLineaNaviera = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreNave = "";

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoPais = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombrePais = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoTipoNave = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreTipoNave = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoLineaNaviera = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreLineaNaviera = "";
              $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombreNave = "";
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarNave");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro)) };
              $scope.gridapigrillaListaNave.find(objRequest);
              miBlock(false, "#divPopupBuscarNave");

          }

          $scope.BuscarPais_Click = function () {
              $rootScope.DatosFormulario.OpcionPais = "BuscarNave";
              getPopupResponsive({
                  formURL: "Pais/BuscarPais",
                  title: "Buscar Pais",
                  nombreDiv: "divPopupBuscarPais",
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
                      $compile($("#divPopupBuscarPais"))($scope);
                  }
              });
          }

          $scope.BuscarTipoNave_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoNave = "BuscarNave";
              getPopupResponsive({
                  formURL: "TipoNave/BuscarTipoNave",
                  title: "Buscar Tipo de Nave",
                  nombreDiv: "divPopupBuscarTipoNave",
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
                      $compile($("#divPopupBuscarTipoNave"))($scope);
                  }
              });
          }

          $scope.BuscarLineaNaviera_Click = function () {
              $rootScope.DatosFormulario.OpcionLineaNaviera = "BuscarLineaNaviera";
              getPopupResponsive({
                  formURL: "LineaNaviera/BuscarLineaNaviera",
                  title: "Buscar Linea Naviera",
                  nombreDiv: "divPopupBuscarLineaNaviera",
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
                      $compile($("#divPopupBuscarLineaNaviera"))($scope);
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