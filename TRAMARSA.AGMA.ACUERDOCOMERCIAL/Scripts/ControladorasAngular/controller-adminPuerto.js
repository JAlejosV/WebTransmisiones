(function () {
    angular.module('api')
    .controller('AdministrarPuertoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPuerto == undefined)
                  $rootScope.DatosFormulario.AdministrarPuerto = new Object();
              if ($rootScope.DatosFormulario.AdministrarPuerto.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarPuerto.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarPuerto.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarPuerto.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarPuerto.ListaMaestroPuerto = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroPuerto":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarPuerto('" + rowObject.CodigoPuerto + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarPuerto('" + rowObject.CodigoPuerto + "');";
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

          $scope.EliminarPuerto = function (CodigoPuerto) {
              MiConfirm("¿Está seguro de anular el Puerto?.", function () {

                  $rootScope.DatosFormulario.AdministrarPuerto.Datos.CodigoPuerto = CodigoPuerto;
                  $rootScope.DatosFormulario.AdministrarPuerto.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPuerto.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Puerto/RegistrarPuerto",
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

          $scope.EditarPuerto = function (CodigoPuerto) {
              $rootScope.DatosFormulario.AdministrarPuerto.ListaMaestroPuerto = jQuery("#grillaListaMaestroPuerto").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarPuerto.ListaMaestroPuerto).where("$CodigoPuerto=='" + CodigoPuerto + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPuerto.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Puerto("Editar", objReg, "Actualizar Puerto");
              }
          }

          AbrirPopup_Puerto = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Puerto/RegistroPuerto",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroPuerto",
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
                      $compile($("#divPopupRegistroPuerto"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroPuerto").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.BuscarPais_Click = function () {
              $rootScope.DatosFormulario.OpcionPais= "ConsultaPuerto";
              getPopupResponsive({
                  formURL: "Pais/BuscarPais",
                  title: "Buscar Pais",
                  nombreDiv: "divPopupBuscarPais",
                  nombreGrid: "",
                  width: "1200px",
                  height: 800,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarPais"))($scope);
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Puerto("Nuevo", newItem, "Registrar Puerto");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPuerto.Filtro)) };
              $scope.gridapigrillaListaMaestroPuerto.find(objRequest);
              $rootScope.DatosFormulario.AdministrarPuerto.ListaMaestroPuerto = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarPuerto.Filtro.CodigoPuertoSunat = "";
              $rootScope.DatosFormulario.AdministrarPuerto.Filtro.NombrePuerto = "";
              $rootScope.DatosFormulario.AdministrarPuerto.Datos.NombrePais = "";
              $rootScope.DatosFormulario.AdministrarPuerto.Filtro.CodigoPais = "";
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