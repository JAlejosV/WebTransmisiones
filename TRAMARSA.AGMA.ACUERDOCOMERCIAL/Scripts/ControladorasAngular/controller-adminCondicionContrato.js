(function () {
    angular.module('api')
    .controller('AdministrarCondicionContratoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionContrato == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionContrato = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionContrato.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionContrato.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarCondicionContrato.ListaMaestroCondicionContrato = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroCondicionContrato":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarCondicionContrato('" + rowObject.CodigoCondicionContrato + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarCondicionContrato('" + rowObject.CodigoCondicionContrato + "');";
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


          $scope.EliminarCondicionContrato = function (CodigoCondicionContrato) {
              MiConfirm("¿Está seguro de eliminar la Condicion de Contrato?.", function () {

                  $rootScope.DatosFormulario.AdministrarCondicionContrato.Datos.CodigoCondicionContrato = CodigoCondicionContrato;
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionContrato.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/CondicionContrato/RegistrarCondicionContrato",
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

          $scope.EditarCondicionContrato = function (CodigoCondicionContrato) {
              $rootScope.DatosFormulario.AdministrarCondicionContrato.ListaMaestroCondicionContrato = jQuery("#grillaListaMaestroCondicionContrato").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarCondicionContrato.ListaMaestroCondicionContrato).where("$CodigoCondicionContrato=='" + CodigoCondicionContrato + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionContrato.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_CondicionContrato("Editar", objReg, "Actualizar Condicion de Contrato");
              }
          }

          AbrirPopup_CondicionContrato = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "CondicionContrato/RegistroCondicionContrato",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroCondicionContrato",
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
                      $compile($("#divPopupRegistroCondicionContrato"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroCondicionContrato").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_CondicionContrato("Nuevo", newItem, "Registrar Condicion de Contrato");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionContrato.Filtro)) };
              $scope.gridapigrillaListaMaestroCondicionContrato.find(objRequest);
              $rootScope.DatosFormulario.AdministrarCondicionContrato.ListaMaestroCondicionContrato = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarCondicionContrato.Filtro.CodigoCondicionContratoSunat = "";
              $rootScope.DatosFormulario.AdministrarCondicionContrato.Filtro.NombreCondicionContrato = "";
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