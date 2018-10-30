(function () {
    angular.module('api')
    .controller('AdministrarModoPagoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarModoPago == undefined)
                  $rootScope.DatosFormulario.AdministrarModoPago = new Object();
              if ($rootScope.DatosFormulario.AdministrarModoPago.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarModoPago.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarModoPago.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarModoPago.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarModoPago.ListaMaestroModoPago = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroModoPago":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarModoPago('" + rowObject.CodigoModoPago + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarModoPago('" + rowObject.CodigoModoPago + "');";
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


          $scope.EliminarModoPago = function (CodigoModoPago) {
              MiConfirm("¿Está seguro de eliminar el ModoPago?.", function () {

                  $rootScope.DatosFormulario.AdministrarModoPago.Datos.CodigoModoPago = CodigoModoPago;
                  $rootScope.DatosFormulario.AdministrarModoPago.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarModoPago.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/ModoPago/RegistrarModoPago",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: objRequest,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          miBlock(false, "#html");
                          if (data.Result != null) {
                              if (data.Result.Satisfactorio == true) {
                                  if (data.CodigoMensaje == 1) {
                                      MiAlertOk(data.Mensaje, miAlertOkSuccess);
                                  }

                                  if (data.CodigoMensaje == 2) {
                                      MiAlert(data.Mensaje);
                                  }

                                  if (data.CodigoMensaje == 3) {
                                      MiError(data.Mensaje);
                                  }
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

          $scope.EditarModoPago = function (CodigoModoPago) {
              $rootScope.DatosFormulario.AdministrarModoPago.ListaMaestroModoPago = jQuery("#grillaListaMaestroModoPago").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarModoPago.ListaMaestroModoPago).where("$CodigoModoPago=='" + CodigoModoPago + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarModoPago.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_ModoPago("Editar", objReg, "Actualizar ModoPago");
              }
          }

          AbrirPopup_ModoPago = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "ModoPago/RegistroModoPago",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroModoPago",
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
                      $compile($("#divPopupRegistroModoPago"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroModoPago").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_ModoPago("Nuevo", newItem, "Registrar ModoPago");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarModoPago.Filtro)) };
              $scope.gridapigrillaListaMaestroModoPago.find(objRequest);
              $rootScope.DatosFormulario.AdministrarModoPago.ListaMaestroModoPago = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarModoPago.Filtro.CodigoModoPagoSunat = "";
              $rootScope.DatosFormulario.AdministrarModoPago.Filtro.NombreModoPago = "";
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