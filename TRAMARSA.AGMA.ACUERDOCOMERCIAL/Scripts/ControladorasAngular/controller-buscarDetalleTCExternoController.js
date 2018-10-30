(function () {
    angular.module('api')
    .controller('BusquedaDetalleTipoContenedorExternoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno == undefined)
                  $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno = new Object();
              if ($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro == undefined)
                  $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro = new Object();
              if ($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Datos == undefined)
                  $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Datos = new Object();
              $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.ListaMaestroDetalleTipoContenedorExterno = [];
              $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro.CodigoTipoContenedorExterno = $scope.row.CodigoTipoContenedorExterno;
              $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro.CodigoLinea = $scope.row.CodigoLinea;
              $scope.Buscar_Click();
          });
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroDetalleTipoContenedorExterno":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarDetalleContenedorExterno('" + rowObject.CodigoTipoContenedorExternoDetalle + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarDetalleContenedorExterno('" + rowObject.CodigoTipoContenedorExternoDetalle + "');";
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
              return html;
          }
          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }
          $scope.EliminarDetalleContenedorExterno = function (codigoTipoContenedorExternoDetalle) {
              MiConfirm("¿Está seguro de eliminar el Detalle Tipo Contenedor Externo?.", function () {
                  miBlock(true, "#html");
                  var newDelete = new Object();
                  newDelete.CodigoTipoContenedorExternoDetalle = codigoTipoContenedorExternoDetalle;
                  newDelete.Accion = "D";
                  var objRequest = { "request": newDelete };
                  $.ajax({
                      url: "/DetalleTipoContenedorExterno/TransaccionDetalleTipoContenedorExterno",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: objRequest,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          miBlock(false, "#html");
                          if (data.Result != null) {
                              if (data.Result.Satisfactorio === true) {
                                  MiAlertOk("Se ha eliminado correctamente el Detalle Tipo Contenedor Externo.", miAlertOkSuccess);
                              }
                              else {
                                  if (data.Result.Mensajes.length > 0) {
                                      MiError(data.Result.Mensajes[0].Mensaje);
                                  }
                                  else {
                                      MiError(data.Result.Mensaje);
                                  }
                              }
                          } else {
                              MiAlert("Ocurrió un problema interno en el sistema.");
                          }
                      }
                  });
              });
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro)) };
              $scope.gridapigrillaListaMaestroDetalleTipoContenedorExterno.find(objRequest);
              $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.ListaMaestroDetalleTipoContenedorExterno = [];
              miBlock(false, "html");
          }
          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              newItem.CodigoTipoContenedorExterno = $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro.CodigoTipoContenedorExterno;
              newItem.CodigoLinea = $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro.CodigoLinea;
              newItem.RequestFiltro = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro)) };
              AbrirPopupDetalleCtnExterno("Nuevo", newItem, "Registrar Detalle Tipo Contenedor Externo");
          }
          $scope.EditarDetalleContenedorExterno = function (codigoTipoContenedorExternoDetalle) {
              if ($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.ListaMaestroDetalleTipoContenedorExterno.length <= 0) {
                  $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.ListaMaestroDetalleTipoContenedorExterno = jQuery("#grillaListaMaestroDetalleTipoContenedorExterno").jqGrid('getRowData');
              }
              var objReg = $from($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.ListaMaestroDetalleTipoContenedorExterno).where("$CodigoTipoContenedorExternoDetalle=='" + codigoTipoContenedorExternoDetalle + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  objReg.CodigoLinea = $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.Filtro.CodigoLinea;
                  AbrirPopupDetalleCtnExterno("Editar", objReg, "Actualizar Detalle Tipo Contenedor Externo");
              }
          }
          AbrirPopupDetalleCtnExterno = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "DetalleTipoContenedorExterno/RegistrasDetalleTipoContenedorExterno",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroDetalleContenedorExterno",
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
                      $compile($("#divPopupRegistroDetalleContenedorExterno"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroDetalleContenedorExterno").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
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