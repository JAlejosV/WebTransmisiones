(function () {
    angular.module('api')
    .controller('AdministrarMonedaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarMoneda == undefined)
                  $rootScope.DatosFormulario.AdministrarMoneda = new Object();
              if ($rootScope.DatosFormulario.AdministrarMoneda.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarMoneda.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarMoneda.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarMoneda.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarMoneda.ListaMaestroMoneda = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroMoneda":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarMoneda('" + rowObject.CodigoMoneda + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarMoneda('" + rowObject.CodigoMoneda + "');";
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


          $scope.EliminarMoneda = function (CodigoMoneda) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarMoneda.Datos.CodigoMoneda = CodigoMoneda;
                  $rootScope.DatosFormulario.AdministrarMoneda.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarMoneda.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Moneda/RegistrarMoneda",
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

          $scope.EditarMoneda = function (CodigoMoneda) {
              $rootScope.DatosFormulario.AdministrarMoneda.ListaMaestroMoneda = jQuery("#grillaListaMaestroMoneda").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarMoneda.ListaMaestroMoneda).where("$CodigoMoneda=='" + CodigoMoneda + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarMoneda.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Moneda("Editar", objReg, "Actualizar Moneda");
              }
          }

          AbrirPopup_Moneda = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Moneda/RegistroMoneda",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroMoneda",
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
                      $compile($("#divPopupRegistroMoneda"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroMoneda").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Moneda("Nuevo", newItem, "Registrar Moneda");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarMoneda.Filtro)) };
              $scope.gridapigrillaListaMaestroMoneda.find(objRequest);
              $rootScope.DatosFormulario.AdministrarMoneda.ListaMaestroMoneda = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarMoneda.Filtro.CodigoMonedaSunat = "";
              $rootScope.DatosFormulario.AdministrarMoneda.Filtro.NombreMoneda = "";
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