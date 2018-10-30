(function () {
    angular.module('api')
    .controller('ReporteACEscalonadoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.ReporteACEscalonado == undefined)
                  $rootScope.DatosFormulario.ReporteACEscalonado = new Object();
              if ($rootScope.DatosFormulario.ReporteACEscalonado.Datos == undefined)
                  $rootScope.DatosFormulario.ReporteACEscalonado.Datos = new Object();
              if ($rootScope.DatosFormulario.ReporteACEscalonado.Filtro == undefined)
                  $rootScope.DatosFormulario.ReporteACEscalonado.Filtro = new Object();

              $scope.CargarDatosIniciales();

          });

          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/ReporteACEscalonado/ReporteACEscalonadoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.ReporteACEscalonado.Datos.Linea = data.Linea;
                          $rootScope.DatosFormulario.ReporteACEscalonado.Datos.TipoBL = data.TipoBL;
                          // $rootScope.DatosFormulario.ReporteACEscalonado.Datos.Moneda = data.Moneda;
                          $rootScope.DatosFormulario.ReporteACEscalonado.Datos.Sucursal = data.Sucursal;
                          $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoLinea = data.Linea[0].Codigo;
                          $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.FinVigencia = data.FechaVigenciaHastaDefault;

                          $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.FlagVigente = true;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.ReporteACEscalonado.Datos.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.ReporteACEscalonado.Datos.Habilitado = 'True';
                          }
                      }
                  }
              });
          }


          $scope.BuscarNroBL_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "reporteACEscalonadoNroBL";
              getPopupResponsive({
                  formURL: "/DocumentoOrigen/BuscarDocumentoOrigen",
                  title: "Buscar Documento Origen",
                  nombreDiv: "divPopupBuscarDocumentoOrigen",
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
                      $compile($("#divPopupBuscarDocumentoOrigen"))($scope);
                  }
              });
          }
          $scope.BuscarCliente_Click = function () {
              $rootScope.FlagCallClientes = "reporteACEscalonadoCliente";
              $rootScope.FlagTipoCliente = "busqueda";
              getPopupResponsive({
                  formURL: "/Cliente/BuscarCliente",
                  title: "Buscar Cliente",
                  nombreDiv: "divPopupBuscarCliente",
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
                      $compile($("#divPopupBuscarCliente"))($scope);
                  }
              });
          }

          $scope.BuscarNroCtn_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "reporteACEscalonadoNroCtn";
              getPopupResponsive({
                  formURL: "DocumentoOrigen/BuscarDocumentoOrigen",
                  title: "Buscar Documento Origen",
                  nombreDiv: "divPopupBuscarDocumentoOrigen",
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
                      $compile($("#divPopupBuscarDocumentoOrigen"))($scope);
                  }
              });
          }


          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }


              if ($rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              } else {
                  if ($rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              /* if ($rootScope.DatosFormulario.ReporteACLocal.Filtro.CodigoSucursal == undefined) {
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
               */
              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.ReporteACEscalonado.Filtro };
              $scope.gridapigrillaListaReporteACEscalonado.find(objRequest);
              miBlock(false, "html");
              //  return false;

          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {

              //MiAlert("Hola Mundo");
              $rootScope.DatosFormulario.ReporteACEscalonado.Datos.NombreCliente = "";
              $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoCliente = "";
              $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.NumeroBL = "";
              $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.Hasta = "";
              $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoCotenedor = "";
              $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.NumeroRA = "";
              $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoAcuerdoComercialEscalonado = "";

              if ($rootScope.DatosFormulario.ReporteACEscalonado.Datos.Linea.length > 1) {
                  $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              if ($rootScope.DatosFormulario.ReporteACEscalonado.Datos.Sucursal.length > 1) {
                  $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoSucursal = "";
                  $(".caja11.msgerror.CodigoSucursal").html("");
              }

              if ($rootScope.DatosFormulario.ReporteACEscalonado.Datos.TipoBL.length > 1) {
                  $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.TipoBL = "";
                  $(".caja11.msgerror.CodigoSucursal").html("");
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