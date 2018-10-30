(function () {
    angular.module('api')
    .controller('ReporteACLocalController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.ReporteACLocal == undefined)
                  $rootScope.DatosFormulario.ReporteACLocal = new Object();
              if ($rootScope.DatosFormulario.ReporteACLocal.Datos == undefined)
                  $rootScope.DatosFormulario.ReporteACLocal.Datos = new Object();
              if ($rootScope.DatosFormulario.ReporteACLocal.Filtro == undefined)
                  $rootScope.DatosFormulario.ReporteACLocal.Filtro = new Object();
              $scope.CargaInicial();
          });

          $scope.CargaInicial = function () {
              $.ajax({
                  url: "/ReporteACLocal/ReporteACLocalIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.ReporteACLocal.Datos.Linea = data.Linea;
                          $rootScope.DatosFormulario.ReporteACLocal.Datos.Moneda = data.Moneda;
                          $rootScope.DatosFormulario.ReporteACLocal.Datos.Sucursal = data.Sucursal;
                          $rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoLinea = data.Linea[0].Codigo;
                          $rootScope.DatosFormulario.ReporteACLocal.Filtro.FlagVigente = true;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.ReporteACLocal.Datos.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.ReporteACLocal.Datos.Habilitado = 'True';
                          }
                      }
                  }
              });
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              if ($rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              } else {
                  if ($rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              if ($rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoSucursal == undefined) {
                  $(".caja11.msgerror.CodigoSucursal").html("Sucursal es requerido.");
                  return false;
              } else {
                  if ($rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoSucursal.length <= 0) {
                      $(".caja11.msgerror.CodigoSucursal").html("Sucursal es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoSucursal").html("");
                  }
              }
              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.ReporteACLocal.Filtro };
              $scope.gridapigrillaListaReporteACLocal.find(objRequest);
              miBlock(false, "html");
              return false;
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoMoneda = "";
              $rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoSucursal = "";
              $rootScope.DatosFormulario.ReporteACLocal.Filtro.FlagVigente = true;

              if ($rootScope.DatosFormulario.ReporteACLocal.Datos.Linea.length > 1) {
                  $rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoLinea = "";
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