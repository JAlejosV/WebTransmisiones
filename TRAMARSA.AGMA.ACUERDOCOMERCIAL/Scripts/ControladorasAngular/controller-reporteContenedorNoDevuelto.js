(function () {
    angular.module('api')
    .controller('ReporteContenedorNoDevueltoController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.ContenedorNoDevuelto == undefined)
                  $rootScope.DatosFormulario.ContenedorNoDevuelto = new Object();
              if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Datos == undefined)
                  $rootScope.DatosFormulario.ContenedorNoDevuelto.Datos = new Object();
              if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro == undefined)
                  $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro = new Object();
              $scope.CargaInicial();
          });
          $scope.CargaInicial = function () {
              $.ajax({
                  url: "/ReporteContenedorNoDevuelto/ReporteContenedorNoDevueltoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.Linea = data.Linea;
                          $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoLinea = data.Linea[0].Codigo;
                          $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Desde = data.FechaDesdeDefault;
                          $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Hasta = data.FechaHastaDefault;
                          $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.FlagVigente = true;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.Habilitado = 'True';
                          }
                      }
                  }
              });
          }

          $scope.GenerarReporte_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validate = ValidarFiltro();
              if (!validate) {
                  return false;
              }

              if ($("#grillaListaContenedoresNoDevueltos").getGridParam("reccount") <= 0) {
                  return false;
              };

              var objRequest = $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro;
              objRequest.NombreCliente = $rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.NombreCliente;
              objRequest.NombreLinea = $from($rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.Linea).where("$Codigo=='" + objRequest.CodigoLinea + "'").firstOrDefault().Nombre;;
              var url = "/ReporteContenedorNoDevuelto/GenerarReporteContenedorNoDevuelto?requestExportar=" + JSON.stringify(objRequest);
              miBlock(true, "html");
              var ifr = $('<iframe/>', {
                  id: 'MainPopupIframe',
                  src: url,
                  style: 'width:100px !important',
                  load: function () {
                      $("iframe").width(1168.8);
                      miBlock(false, "html");
                      $(".ui-dialog").show();
                  }
              });

              ifr.dialog({
                  modal: true,
                  width: 1200,
                  height: 600,
                  resizable: false,
                  close: function (event, ui) {
                      $(this).dialog('destroy').remove();
                      $(".ui-dialog").hide();
                  }
              });
              $(".ui-dialog").hide()
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validate = ValidarFiltro();
              if (!validate) {
                  return false;
              }

              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro };
              $scope.gridapigrillaListaContenedoresNoDevueltos.find(objRequest);
              $scope.FlagMostrarBotonReporte = true;
              miBlock(false, "html");
              return false;
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.NombreCliente = "";
              $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoCliente = "";
              $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Nro_Bl = "";
              $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Desde = "";
              $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Hasta = "";
              $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoCotenedor = "";
              if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.Linea.length > 1) {
                  $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
          }
          $scope.BuscarNroBL_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "reporteContenedorNoDevueltoNroBL";
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
              $rootScope.FlagCallClientes = "reporteContenedorNoDevueltoCliente";
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
              $rootScope.FlagCallDocumentosOrigen = "reporteContenedorNoDevueltoNroCtn";
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
          function ValidarFiltro() {
              var salida = true;
              if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Desde == undefined) {
                  $(".caja11.msgerror.Desde").html("Fecha Inicio es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Desde.length <= 0) {
                  $(".caja11.msgerror.Desde").html("Fecha Inicio es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.Desde").html("");
              }

              if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Hasta == undefined) {
                  $(".caja11.msgerror.Hasta").html("Fecha Fin es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.Hasta.length <= 0) {
                  $(".caja11.msgerror.Hasta").html("Fecha Fin es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.Hasta").html("");
              }
              return salida;
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