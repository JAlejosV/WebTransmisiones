(function () {
    angular.module('api')
    .controller('AdministrarMedioTransporteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarMedioTransporte == undefined)
                  $rootScope.DatosFormulario.AdministrarMedioTransporte = new Object();
              if ($rootScope.DatosFormulario.AdministrarMedioTransporte.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarMedioTransporte.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarMedioTransporte.ListaMaestroMedioTransporte = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroMedioTransporte":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarMedioTransporte('" + rowObject.CodigoMedioTransporte + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarMedioTransporte('" + rowObject.CodigoMedioTransporte + "');";
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


          $scope.EliminarMedioTransporte = function (CodigoMedioTransporte) {
              MiConfirm("¿Está seguro de eliminar el MedioTransporte?.", function () {

                  $rootScope.DatosFormulario.AdministrarMedioTransporte.Datos.CodigoMedioTransporte = CodigoMedioTransporte;
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarMedioTransporte.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/MedioTransporte/RegistrarMedioTransporte",
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

          $scope.EditarMedioTransporte = function (CodigoMedioTransporte) {
              $rootScope.DatosFormulario.AdministrarMedioTransporte.ListaMaestroMedioTransporte = jQuery("#grillaListaMaestroMedioTransporte").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarMedioTransporte.ListaMaestroMedioTransporte).where("$CodigoMedioTransporte=='" + CodigoMedioTransporte + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarMedioTransporte.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_MedioTransporte("Editar", objReg, "Actualizar Medio Transporte");
              }
          }

          AbrirPopup_MedioTransporte = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "MedioTransporte/RegistroMedioTransporte",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroMedioTransporte",
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
                      $compile($("#divPopupRegistroMedioTransporte"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroMedioTransporte").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_MedioTransporte("Nuevo", newItem, "Registrar MedioTransporte");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarMedioTransporte.Filtro)) };
              $scope.gridapigrillaListaMaestroMedioTransporte.find(objRequest);
              $rootScope.DatosFormulario.AdministrarMedioTransporte.ListaMaestroMedioTransporte = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarMedioTransporte.Filtro.CodigoMedioTransporteSunat = "";
              $rootScope.DatosFormulario.AdministrarMedioTransporte.Filtro.NombreMedioTransporte = "";
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