(function () {
    angular.module('api')
    .controller('ReporteTarifaEscalonadaController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.ReporteTarifaEscalonada == undefined)
                  $rootScope.DatosFormulario.ReporteTarifaEscalonada = new Object();
              if ($rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos == undefined)
                  $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos = new Object();
              if ($rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro == undefined)
                  $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro = new Object();
              $scope.CargaInicial();
          });

          $scope.CargaInicial = function () {
              $.ajax({
                  url: "/ReporteTarifaEscalonada/ReporteTarifaEscalonadIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.Linea = data.Linea;
                          $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.Moneda = data.Moneda;
                          $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.Sucursal = data.Sucursal;
                          $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoLinea = data.Linea[0].Codigo;
                          $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.FlagVigente = true;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.Habilitado = 'True';
                          }
                      }
                  }
              });
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              if ($rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              } else {
                  if ($rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro };
              $scope.gridapigrillaListaReporteTarifaEscalonada.find(objRequest);
              miBlock(false, "html");
              return false;
          }
          $scope.BuscarTarifa_Click = function () {
              $rootScope.DatosFormulario.OpcionTarifaEscalonadaGenerales = "reporteTarifaEscalonada";
              getPopupResponsive({
                  formURL: "TarifaEscalonada/BuscarTarifaEscalonadaGeneral/",
                  title: "Buscar Tarifas Generales",
                  nombreDiv: "divPopupBuscarTarifaEscalonadaLigada",
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
                      $compile($("#divPopupBuscarTarifaEscalonadaLigada"))($scope);
                  }
              });
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoMoneda = "";
              $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoSucursal = "";
              $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.FlagVigente = true;
              $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoTarifaEscalonada = "";
              $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.NombreTarifa = "";

              if ($rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.Linea.length > 1) {
                  $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoLinea = "";
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
