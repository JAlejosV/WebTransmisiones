(function () {
    angular.module('api')
    .controller('BuscarAduanaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaAduana == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaAduana = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionAduana;

              if (opcion == "ConsultaAduana") {
                  $rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoAduana = data.CodigoAduana;
                  $rootScope.DatosFormulario.AdministrarItinerario.Datos.NombreAduana = data.NombreAduana;
              }
              else if (opcion == "ConsultaItinerario") {
                  $rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoAduana = data.CodigoAduana;
                  $rootScope.DatosFormulario.AdministrarItinerario.Datos.NombreAduana = data.NombreAduana;
              }
              else if (opcion == "BuscarItinerarioAduana") {
                  $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.CodigoAduana = data.CodigoAduana;
                  $rootScope.DatosFormulario.FiltrosBusquedaItinerario.Filtro.NombreAduana = data.NombreAduana;
              }
              else if (opcion == "BuscarAduanaDocumento") {
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoAduana = data.CodigoAduana;
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreAduana = data.NombreAduana;
              }
              else if (opcion == "BuscarAduanaRegistrarDocumento") {
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoAduana = data.CodigoAduana;
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombreAduana = data.NombreAduana;
              }
              else if (opcion == "ConsultaTransmisionNave") {
                  $rootScope.DatosFormulario.AdministrarTransmisionNave.Filtro.CodigoAduana = data.CodigoAduana;
                  $rootScope.DatosFormulario.AdministrarTransmisionNave.Datos.NombreAduana = data.NombreAduana;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoAduana = data.CodigoAduana;
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAduana = data.NombreAduana;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaAduana").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaAduana').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoAduanaSunat = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombreAduana = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombrePuerto = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoPuerto = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombreViaTransporte = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoViaTransporte = "";

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoAduanaSunat = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombreAduana = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombrePuerto = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoPuerto = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombreViaTransporte = "";
              $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoViaTransporte = "";
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarAduana");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro)) };
              $scope.gridapigrillaListaAduana.find(objRequest);
              miBlock(false, "#divPopupBuscarAduana");

          }

          $scope.BuscarPuerto_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoAduana";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto",
                  nombreDiv: "divPopupBuscarPuerto",
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
                      $compile($("#divPopupBuscarPuerto"))($scope);
                  }
              });
          }

          $scope.BuscarViaTransporte_Click = function () {
              $rootScope.DatosFormulario.OpcionViaTransporte = "BuscarViaTransporteAduana";
              getPopupResponsive({
                  formURL: "ViaTransporte/BuscarViaTransporte",
                  title: "Buscar Via de Transporte",
                  nombreDiv: "divPopupBuscarViaTransporte",
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
                      $compile($("#divPopupBuscarViaTransporte"))($scope);
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