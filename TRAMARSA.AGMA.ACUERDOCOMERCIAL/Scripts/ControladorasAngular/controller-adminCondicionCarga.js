(function () {
    angular.module('api')
    .controller('AdministrarCondicionCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionCarga == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionCarga = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionCarga.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionCarga.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarCondicionCarga.ListaMaestroCondicionCarga = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroCondicionCarga":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarCondicionCarga('" + rowObject.CodigoCondicionCarga + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarCondicionCarga('" + rowObject.CodigoCondicionCarga + "');";
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


          $scope.EliminarCondicionCarga = function (CodigoCondicionCarga) {
              MiConfirm("¿Está seguro de eliminar Condicion de Carga?.", function () {

                  $rootScope.DatosFormulario.AdministrarCondicionCarga.Datos.CodigoCondicionCarga = CodigoCondicionCarga;
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionCarga.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/CondicionCarga/RegistrarCondicionCarga",
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

          $scope.EditarCondicionCarga = function (CodigoCondicionCarga) {
              $rootScope.DatosFormulario.AdministrarCondicionCarga.ListaMaestroCondicionCarga = jQuery("#grillaListaMaestroCondicionCarga").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarCondicionCarga.ListaMaestroCondicionCarga).where("$CodigoCondicionCarga=='" + CodigoCondicionCarga + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionCarga.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_CondicionCarga("Editar", objReg, "Actualizar Condicion de Carga");
              }
          }

          AbrirPopup_CondicionCarga = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "CondicionCarga/RegistroCondicionCarga",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroCondicionCarga",
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
                      $compile($("#divPopupRegistroCondicionCarga"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroCondicionCarga").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_CondicionCarga("Nuevo", newItem, "Registrar Condicion de Carga");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionCarga.Filtro)) };
              $scope.gridapigrillaListaMaestroCondicionCarga.find(objRequest);
              $rootScope.DatosFormulario.AdministrarCondicionCarga.ListaMaestroCondicionCarga = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarCondicionCarga.Filtro.CodigoCondicionCargaSunat = "";
              $rootScope.DatosFormulario.AdministrarCondicionCarga.Filtro.NombreCondicionCarga = "";
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