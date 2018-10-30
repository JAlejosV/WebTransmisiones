(function () {
    angular.module('api')
    .controller('AdministrarEntidadPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto == undefined)
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto = new Object();
              if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarEntidadPrecinto.ListaMaestroEntidadPrecinto = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroEntidadPrecinto":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarEntidadPrecinto('" + rowObject.CodigoEntidadPrecinto + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarEntidadPrecinto('" + rowObject.CodigoEntidadPrecinto + "');";
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


          $scope.EliminarEntidadPrecinto = function (CodigoEntidadPrecinto) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Datos.CodigoEntidadPrecinto = CodigoEntidadPrecinto;
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/EntidadPrecinto/RegistrarEntidadPrecinto",
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

          $scope.EditarEntidadPrecinto = function (CodigoEntidadPrecinto) {
              $rootScope.DatosFormulario.AdministrarEntidadPrecinto.ListaMaestroEntidadPrecinto = jQuery("#grillaListaMaestroEntidadPrecinto").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarEntidadPrecinto.ListaMaestroEntidadPrecinto).where("$CodigoEntidadPrecinto=='" + CodigoEntidadPrecinto + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarEntidadPrecinto.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_EntidadPrecinto("Editar", objReg, "Actualizar Entidad Precinto");
              }
          }

          AbrirPopup_EntidadPrecinto = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "EntidadPrecinto/RegistroEntidadPrecinto",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroEntidadPrecinto",
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
                      $compile($("#divPopupRegistroEntidadPrecinto"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroEntidadPrecinto").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_EntidadPrecinto("Nuevo", newItem, "Registrar Entidad Precinto");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarEntidadPrecinto.Filtro)) };
              $scope.gridapigrillaListaMaestroEntidadPrecinto.find(objRequest);
              $rootScope.DatosFormulario.AdministrarEntidadPrecinto.ListaMaestroEntidadPrecinto = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Filtro.CodigoEntidadPrecintoSunat = "";
              $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Filtro.NombreEntidadPrecinto = "";
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