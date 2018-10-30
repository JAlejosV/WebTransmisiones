(function () {
    angular.module('api')
    .controller('BuscarDocumentoController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined) {
                  $rootScope.DatosFormulario = new Object();
              }
              if ($rootScope.DatosFormulario.RegistroDocumento == undefined) {
                  $rootScope.DatosFormulario.RegistroDocumento = new Object();
              }


              if ($rootScope.DatosFormulario.RegistroDocumento.FlagDocumento) {
                  $rootScope.DatosFormulario.RegistroDocumento.FlagDocumento = false;
              } else {
                  $rootScope.DatosFormulario = new Object();
                  $rootScope.DatosFormulario.BusquedaDocumento = new Object();
                  $rootScope.DatosFormulario.DocumentoIndex = new Object();
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro = new Object();
                  $rootScope.DatosFormulario.BusquedaDocumento.DatosDocumento = new Object();
              }

              $scope.CargaInicialDocumento();
              $(".InputTEXT_04Fecha").prop('disabled', false);
          });

          $scope.CargaInicialDocumento = function () {
              $.ajax({
                  url: "/Documento/DocumentoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.DocumentoIndex.TiposBL = data.TiposBL;
                      $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoTipoBL = $rootScope.DatosFormulario.DocumentoIndex.TiposBL[0].CodigoTipoBL;

                      $rootScope.DatosFormulario.DocumentoIndex.TiposEnvio = data.TiposEnvio;
                      $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoTipoEnvio = $rootScope.DatosFormulario.DocumentoIndex.TiposEnvio[0].CodigoTipoEnvio;

                      $rootScope.DatosFormulario.BusquedaDocumento.Filtro.OriginalFechaInicio = data.FechaDefault;
                      $rootScope.DatosFormulario.BusquedaDocumento.Filtro.OriginalFechaFin = data.FechaFinDefault;

                      $rootScope.DatosFormulario.BusquedaDocumento.Filtro.FechaEmisionDocumentoInicio = data.FechaDefault;
                      $rootScope.DatosFormulario.BusquedaDocumento.Filtro.FechaEmisionDocumentoFin = data.FechaFinDefault;
                  }
              });
          }

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (tipoboton) {
                  case "Editar":
                      eventoclick = "$parent.EditarDocumento('" + rowObject.CodigoDocumento + "');";
                      break;
              }
              var html = "";
              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              return html;
          }

          $scope.EditarDocumento = function (CodigoDocumento) {
              $rootScope.DatosFormulario.RegistroDocumento = new Object();
              $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento = new Object();
              $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento = new Object();
              $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.DocumentoFlagEditar = true;
              $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.UrlOrigen = "/#!/sistema/busqueda/buscar-documento/";
              $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoDocumento = CodigoDocumento;
              $rootScope.Redirect("/#!/sistema/registro-documento/");
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }

              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.BusquedaDocumento.Filtro };
              $scope.gridapigrillaListaDocumento.find(objRequest);
              miBlock(false, "html");

              return false;
          }

          $scope.Nuevo_Click = function () {
              $rootScope.DatosFormulario.RegistroDocumento = new Object();
              $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento = new Object();
              $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento = new Object();
              $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.DocumentoFlagEditar = false;
              $rootScope.DatosFormulario.RegistroDocumento.DatosDocumento.UrlOrigen = "/#!/sistema/busqueda/buscar-documento/";
              $rootScope.Redirect("/#!/sistema/registro-documento/");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoDocumento = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoItinerario = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreNave = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreAduanaNave = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreTipoOperacion = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NumeroViajeItinerario = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoOrigenDocumento = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoOrigen = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoEmbarqueDocumento = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoEmbarque = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoDescargaDocumento = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoDescarga = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoFinalDocumento = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoFinal = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoLineaNaviera = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreLineaNaviera = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoAduana = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreAduana = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoTipoBL = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreTipoBL = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoTipoEnvio = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombreTipoEnvio = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NumeroDocumento = "";
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.FechaEmisionDocumentoInicio = $rootScope.DatosFormulario.BusquedaDocumento.Filtro.OriginalFechaInicio;
              $rootScope.DatosFormulario.BusquedaDocumento.Filtro.FechaEmisionDocumentoFin = $rootScope.DatosFormulario.BusquedaDocumento.Filtro.OriginalFechaFin;

          }

          $scope.BuscarItinerario_Click = function () {
              $rootScope.DatosFormulario.OpcionItinerario = "BuscarItinerario";
              getPopupResponsive({
                  formURL: "Itinerario/BuscarItinerario",
                  title: "Buscar Itinerario",
                  nombreDiv: "divPopupBuscarItinerario",
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
                      $compile($("#divPopupBuscarItinerario"))($scope);
                  }
              });
          }

          $scope.BuscarPuertoOrigen_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoOrigenDocumento";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto Origen",
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

          $scope.BuscarPuertoEmbarque_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoEmbarqueDocumento";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto Embarque",
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

          $scope.BuscarPuertoDescarga_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoDescargaDocumento";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto Descarga",
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

          $scope.BuscarPuertoFinal_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "BuscarPuertoFinalDocumento";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto Final",
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

          $scope.BuscarLineaNaviera_Click = function () {
              $rootScope.DatosFormulario.OpcionLineaNaviera = "BuscarLineaNavieraDocumento";
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

          $scope.BuscarAduana_Click = function () {
              $rootScope.DatosFormulario.OpcionAduana = "BuscarAduanaDocumento";
              getPopupResponsive({
                  formURL: "Aduana/BuscarAduana",
                  title: "Buscar Aduana",
                  nombreDiv: "divPopupBuscarAduana",
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
                      $compile($("#divPopupBuscarAduana"))($scope);
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