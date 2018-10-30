(function () {
    angular.module('api')
    .controller('ReporteTarifaLocalController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.ReporteTarifaLocal == undefined)
                  $rootScope.DatosFormulario.ReporteTarifaLocal = new Object();
              if ($rootScope.DatosFormulario.ReporteTarifaLocal.Datos == undefined)
                  $rootScope.DatosFormulario.ReporteTarifaLocal.Datos = new Object();
              if ($rootScope.DatosFormulario.ReporteTarifaLocal.Filtro == undefined)
                  $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro = new Object();
              $scope.CargaInicial();
          });
          $scope.CargaInicial = function () {
              $.ajax({
                  url: "/ReporteTarifaLocal/ReporteTarifaLocalIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.ReporteTarifaLocal.Datos.Linea = data.Linea;
                          $rootScope.DatosFormulario.ReporteTarifaLocal.Datos.Moneda = data.Moneda;
                         
                          //$rootScope.DatosFormulario.ReporteTarifaLocal.Datos.Sucursal = data.Sucursal;
                          $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoLinea = data.Linea[0].Codigo;
                          $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.FlagVigente = true;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.ReporteTarifaLocal.Datos.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.ReporteTarifaLocal.Datos.Habilitado = 'True';
                          }

                          $scope.CargarSucursal();
                      }
                  }
              });
          }
          $scope.CargarSucursal = function () {
            var codLinea = $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoLinea;
            $rootScope.DatosFormulario.ReporteTarifaLocal.Datos.Sucursal = ObtenerSucursalesByLinea(codLinea);
            $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoSucursal = null;
         }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              if ($rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              } else {
                  if ($rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro };
              $scope.gridapigrillaListaReporteTarifaLocal.find(objRequest);
              miBlock(false, "html");
              return false;
          }
          $scope.BuscarTarifa_Click = function () {
              $rootScope.DatosFormulario.OpcionTarifaGenerales = "reporteTarifaLocal";
              getPopupResponsive({
                  formURL: "TarifaGenerales/BuscarTarifaGenerales",
                  title: "Buscar Tarifas Generales",
                  nombreDiv: "divPopupBuscarTarifaLigada",
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
                      $compile($("#divPopupBuscarTarifaLigada"))($scope);
                  }
              });
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoMoneda = "";
              $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoSucursal = "";
              $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.FlagVigente = true;
              $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoTarifaLocal = "";
              $rootScope.DatosFormulario.ReporteTarifaLocal.Datos.NombreTarifa = "";

              if ($rootScope.DatosFormulario.ReporteTarifaLocal.Datos.Linea.length > 1) {
                  $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
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
