(function () {
    angular.module('api')
    .controller('BusquedaDetalleGrupoPuertoExternoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno == undefined)
                  $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno = new Object();
              if ($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro == undefined)
                  $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro = new Object();
              if ($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Datos == undefined)
                  $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Datos = new Object();
              $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.ListaMaestroDetalleGrupoPuertoExterno = [];
              $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro.CodigoGrupoPuerto = $scope.row.CodigoGrupoPuerto;
              $scope.Buscar_Click();
          });
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroDetalleGrupoPuertoExterno":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarDetalleGrupoPuertoExterno('" + rowObject.CodigoGrupoPuertoDetalle + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarDetalleGrupoPuertoExterno('" + rowObject.CodigoGrupoPuertoDetalle + "');";
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
          $scope.EliminarDetalleGrupoPuertoExterno = function (codigoGrupoPuertoDetalle) {
              MiConfirm("¿Está seguro de eliminar el Puerto?.", function () {
                  miBlock(true, "#html");
                  var newDelete = new Object();
                  newDelete.CodigoGrupoPuertoDetalle = codigoGrupoPuertoDetalle;
                  newDelete.Accion = "D";
                  var objRequest = { "request": newDelete };
                  $.ajax({
                      url: "/DetalleGrupoPuertoExterno/TransaccionDetalleGrupoPuertoExterno",
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
                                  MiAlertOk("Se ha eliminado correctamente el Detalle Grupo Puerto Externo.", miAlertOkSuccess);
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
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro)) };
              $scope.gridapigrillaListaMaestroDetalleGrupoPuertoExterno.find(objRequest);
              $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.ListaMaestroDetalleGrupoPuertoExterno = [];
              miBlock(false, "html");
          }
          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              newItem.CodigoGrupoPuerto = $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro.CodigoGrupoPuerto;
              newItem.RequestFiltro = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro)) };
              AbrirPopupRegistroDetalleGrupoPuertoExterno("Nuevo", newItem, "Registrar Detalle Grupo Puerto Externo");
          }

          $scope.EditarDetalleGrupoPuertoExterno = function (codigoGrupoPuertoDetalle) {
              if ($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.ListaMaestroDetalleGrupoPuertoExterno.length <= 0) {
                  $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.ListaMaestroDetalleGrupoPuertoExterno = jQuery("#grillaListaMaestroDetalleGrupoPuertoExterno").jqGrid('getRowData');
              }
              var objReg = $from($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.ListaMaestroDetalleGrupoPuertoExterno).where("$CodigoGrupoPuertoDetalle=='" + codigoGrupoPuertoDetalle + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopupRegistroDetalleGrupoPuertoExterno("Editar", objReg, "Actualizar Detalle Grupo Puerto Externo");
              }
          }
          AbrirPopupRegistroDetalleGrupoPuertoExterno = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "DetalleGrupoPuertoExterno/RegistroDetalleGrupoPuertoExterno",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroDetalleGrupoPuertoExterno",
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
                      $compile($("#divPopupRegistroDetalleGrupoPuertoExterno"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroDetalleGrupoPuertoExterno").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.Filtro.CodigoGrupoPuertoDetalle = "";
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