(function () {
    angular.module('api')
    .controller('AdministrarTipoDocumentoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoDocumento == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoDocumento = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoDocumento.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoDocumento.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoDocumento.ListaMaestroTipoDocumento = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoDocumento":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoDocumento('" + rowObject.CodigoTipoDocumento + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoDocumento('" + rowObject.CodigoTipoDocumento + "');";
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


          $scope.EliminarTipoDocumento = function (CodigoTipoDocumento) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoDocumento.Datos.CodigoTipoDocumento = CodigoTipoDocumento;
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoDocumento.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoDocumento/RegistrarTipoDocumento",
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

          $scope.EditarTipoDocumento = function (CodigoTipoDocumento) {
              $rootScope.DatosFormulario.AdministrarTipoDocumento.ListaMaestroTipoDocumento = jQuery("#grillaListaMaestroTipoDocumento").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoDocumento.ListaMaestroTipoDocumento).where("$CodigoTipoDocumento=='" + CodigoTipoDocumento + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoDocumento.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoDocumento("Editar", objReg, "Actualizar TipoDocumento");
              }
          }

          AbrirPopup_TipoDocumento = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoDocumento/RegistroTipoDocumento",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoDocumento",
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
                      $compile($("#divPopupRegistroTipoDocumento"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoDocumento").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoDocumento("Nuevo", newItem, "Registrar TipoDocumento");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoDocumento.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoDocumento.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoDocumento.ListaMaestroTipoDocumento = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoDocumento.Filtro.CodigoTipoDocumentoSunat = "";
              $rootScope.DatosFormulario.AdministrarTipoDocumento.Filtro.NombreTipoDocumento = "";
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