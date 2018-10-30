(function () {
    angular.module('api')
    .controller('ConsultaNotificacionIntegracionController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.ConsultaNotificacionIntegracion == undefined)
                  $rootScope.DatosFormulario.ConsultaNotificacionIntegracion = new Object();
              if ($rootScope.DatosFormulario.ConsultaNotificacionIntegracion.Filtro == undefined)
                  $rootScope.DatosFormulario.ConsultaNotificacionIntegracion.Filtro = new Object();
              if ($rootScope.DatosFormulario.ConsultaNotificacionIntegracionCargaInicial == undefined)
                  $rootScope.DatosFormulario.ConsultaNotificacionIntegracionCargaInicial = new Object();

              if ($rootScope.DatosFormulario.AdministrarNotificacionIntegracion == undefined)
                  $rootScope.DatosFormulario.AdministrarNotificacionIntegracion = new Object();

              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/Notificacion/ConsultarBandejaNotificacionIntegracionIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "HLL",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {

                          $rootScope.DatosFormulario.ConsultaNotificacionIntegracionCargaInicial.Estados = data.Estados;

                      }
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopupDepositoDefault("Nuevo", newItem, "Registrar Notificacion Integracion");
          }
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaNotifiacionIntegracion":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarNotificacionIntegracion('" + rowObject.CodigoNotificacion + "');";
                                  break;


                          }
                      }
                      break;
              }

              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              if (tipoboton == "Quitar") {
                  html = HtmlCrearBoton("Eliminar", eventoclick, "");
              }
              if (tipoboton == "VerDetalle") {
                  html = HtmlCrearBoton("VerDetalle", eventoclick, "");
              }
              return html;
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              //$rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro.CodigoLinea="HLL";  

              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.ConsultaNotificacionIntegracion.Filtro)) };
              $scope.gridapigrillaListaNotifiacionIntegracion.find(objRequest);
              //$rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = [];
              miBlock(false, "html");
          }
          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.EditarNotificacionIntegracion = function (Id) {
              // if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno.length <= 0) {
              $rootScope.DatosFormulario.AdministrarNotificacionIntegracion.ListaNotificacionIntegracion = jQuery("#grillaListaNotifiacionIntegracion").jqGrid('getRowData');
              //}
              var objReg = $from($rootScope.DatosFormulario.AdministrarNotificacionIntegracion.ListaNotificacionIntegracion).where("$CodigoNotificacion=='" + Id + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.ConsultaNotificacionIntegracion.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopupDepositoDefault("Editar", objReg, "Actualizar Notificacion Integracion");
              }
          }

          AbrirPopupDepositoDefault = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Notificacion/RegistroNotificacionIntegracion",
                  title: titlepop,
                  nombreDiv: "divPopupNuevoNotificacionIntegracion",
                  nombreGrid: "",
                  width: "980px",
                  height: 800,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $(obj).attr("ModoPagina", tipo);
                      $compile($("#divPopupNuevoNotificacionIntegracion"))($scope);
                      var scopePopup = angular.element("#divPopupNuevoNotificacionIntegracion").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }



          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.ConsultaNotificacionIntegracion.Filtro.Nombre = "";
              $rootScope.DatosFormulario.ConsultaNotificacionIntegracion.Filtro.CodigoEstado = "";
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }

          $scope.ChangeLineaNaviera = function (codigoLinea) {
              if (codigoLinea != undefined) {
                  $.ajax({
                      url: "/TipoContenedor/ListarTipoContenedorByLinea",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "codigoLinea=" + codigoLinea,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          if (data.ListaTipoContenedor.length > 0) {
                              //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = data.ListaTipoContenedor;
                              $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.TipoContenedor = data.ListaTipoContenedor;
                          } else {
                              //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = [];
                              $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.TipoContenedor = [];
                          }
                      }
                  });
              } else {
                  $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.TipoContenedor = [];
              }
          }


          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });

      }]);
})();