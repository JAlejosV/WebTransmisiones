(function () {
    angular.module('api')
    .controller('AdministrarViaTransporteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarViaTransporte == undefined)
                  $rootScope.DatosFormulario.AdministrarViaTransporte = new Object();
              if ($rootScope.DatosFormulario.AdministrarViaTransporte.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarViaTransporte.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarViaTransporte.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarViaTransporte.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarViaTransporte.ListaMaestroViaTransporte = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroViaTransporte":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarViaTransporte('" + rowObject.CodigoViaTransporte + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarViaTransporte('" + rowObject.CodigoViaTransporte + "');";
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


          $scope.EliminarViaTransporte = function (CodigoViaTransporte) {
              MiConfirm("¿Está seguro de eliminar el ViaTransporte?.", function () {

                  $rootScope.DatosFormulario.AdministrarViaTransporte.Datos.CodigoViaTransporte = CodigoViaTransporte;
                  $rootScope.DatosFormulario.AdministrarViaTransporte.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarViaTransporte.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/ViaTransporte/RegistrarViaTransporte",
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

          $scope.EditarViaTransporte = function (CodigoViaTransporte) {
              $rootScope.DatosFormulario.AdministrarViaTransporte.ListaMaestroViaTransporte = jQuery("#grillaListaMaestroViaTransporte").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarViaTransporte.ListaMaestroViaTransporte).where("$CodigoViaTransporte=='" + CodigoViaTransporte + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarViaTransporte.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_ViaTransporte("Editar", objReg, "Actualizar ViaTransporte");
              }
          }

          AbrirPopup_ViaTransporte = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "ViaTransporte/RegistroViaTransporte",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroViaTransporte",
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
                      $compile($("#divPopupRegistroViaTransporte"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroViaTransporte").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_ViaTransporte("Nuevo", newItem, "Registrar ViaTransporte");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarViaTransporte.Filtro)) };
              $scope.gridapigrillaListaMaestroViaTransporte.find(objRequest);
              $rootScope.DatosFormulario.AdministrarViaTransporte.ListaMaestroViaTransporte = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarViaTransporte.Filtro.CodigoViaTransporteSunat = "";
              $rootScope.DatosFormulario.AdministrarViaTransporte.Filtro.NombreViaTransporte = "";
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