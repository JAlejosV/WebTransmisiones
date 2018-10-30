(function () {
    angular.module('api')
    .controller('AdministrarTipoEnvioController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoEnvio == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoEnvio = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoEnvio.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoEnvio.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoEnvio.ListaMaestroTipoEnvio = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoEnvio":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoEnvio('" + rowObject.CodigoTipoEnvio + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoEnvio('" + rowObject.CodigoTipoEnvio + "');";
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


          $scope.EliminarTipoEnvio = function (CodigoTipoEnvio) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoEnvio.Datos.CodigoTipoEnvio = CodigoTipoEnvio;
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoEnvio.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoEnvio/RegistrarTipoEnvio",
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

          $scope.EditarTipoEnvio = function (CodigoTipoEnvio) {
              $rootScope.DatosFormulario.AdministrarTipoEnvio.ListaMaestroTipoEnvio = jQuery("#grillaListaMaestroTipoEnvio").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoEnvio.ListaMaestroTipoEnvio).where("$CodigoTipoEnvio=='" + CodigoTipoEnvio + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoEnvio.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoEnvio("Editar", objReg, "Actualizar Tipo de Envio");
              }
          }

          AbrirPopup_TipoEnvio = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoEnvio/RegistroTipoEnvio",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoEnvio",
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
                      $compile($("#divPopupRegistroTipoEnvio"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoEnvio").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoEnvio("Nuevo", newItem, "Registrar Tipo de Envio");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoEnvio.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoEnvio.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoEnvio.ListaMaestroTipoEnvio = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoEnvio.Filtro.CodigoTipoEnvioSunat = "";
              $rootScope.DatosFormulario.AdministrarTipoEnvio.Filtro.NombreTipoEnvio = "";
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