(function () {
    angular.module('api')
    .controller('AdministrarCondicionTransporteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarCondicionTransporte.ListaMaestroCondicionTransporte = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroCondicionTransporte":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarCondicionTransporte('" + rowObject.CodigoCondicionTransporte + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarCondicionTransporte('" + rowObject.CodigoCondicionTransporte + "');";
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


          $scope.EliminarCondicionTransporte = function (CodigoCondicionTransporte) {
              MiConfirm("¿Está seguro de eliminar Condicion de Transporte?.", function () {

                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.Datos.CodigoCondicionTransporte = CodigoCondicionTransporte;
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionTransporte.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/CondicionTransporte/RegistrarCondicionTransporte",
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

          $scope.EditarCondicionTransporte = function (CodigoCondicionTransporte) {
              $rootScope.DatosFormulario.AdministrarCondicionTransporte.ListaMaestroCondicionTransporte = jQuery("#grillaListaMaestroCondicionTransporte").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarCondicionTransporte.ListaMaestroCondicionTransporte).where("$CodigoCondicionTransporte=='" + CodigoCondicionTransporte + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_CondicionTransporte("Editar", objReg, "Actualizar Condicion de Transporte");
              }
          }

          AbrirPopup_CondicionTransporte = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "CondicionTransporte/RegistroCondicionTransporte",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroCondicionTransporte",
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
                      $compile($("#divPopupRegistroCondicionTransporte"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroCondicionTransporte").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_CondicionTransporte("Nuevo", newItem, "Registrar Condicion de Transporte");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro)) };
              $scope.gridapigrillaListaMaestroCondicionTransporte.find(objRequest);
              $rootScope.DatosFormulario.AdministrarCondicionTransporte.ListaMaestroCondicionTransporte = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro.CodigoCondicionTransporteSunat = "";
              $rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro.NombreCondicionTransporte = "";
              $rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro.CodigoAduanaCondicionTransporte = "";
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