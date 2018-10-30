(function () {
    angular.module('api')
    .controller('AdministrarCondicionPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarCondicionPrecinto.ListaMaestroCondicionPrecinto = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroCondicionPrecinto":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarCondicionPrecinto('" + rowObject.CodigoCondicionPrecinto + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarCondicionPrecinto('" + rowObject.CodigoCondicionPrecinto + "');";
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


          $scope.EliminarCondicionPrecinto = function (CodigoCondicionPrecinto) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Datos.CodigoCondicionPrecinto = CodigoCondicionPrecinto;
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/CondicionPrecinto/RegistrarCondicionPrecinto",
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

          $scope.EditarCondicionPrecinto = function (CodigoCondicionPrecinto) {
              $rootScope.DatosFormulario.AdministrarCondicionPrecinto.ListaMaestroCondicionPrecinto = jQuery("#grillaListaMaestroCondicionPrecinto").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarCondicionPrecinto.ListaMaestroCondicionPrecinto).where("$CodigoCondicionPrecinto=='" + CodigoCondicionPrecinto + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionPrecinto.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_CondicionPrecinto("Editar", objReg, "Actualizar CondicionPrecinto");
              }
          }

          AbrirPopup_CondicionPrecinto = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "CondicionPrecinto/RegistroCondicionPrecinto",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroCondicionPrecinto",
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
                      $compile($("#divPopupRegistroCondicionPrecinto"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroCondicionPrecinto").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_CondicionPrecinto("Nuevo", newItem, "Registrar CondicionPrecinto");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarCondicionPrecinto.Filtro)) };
              $scope.gridapigrillaListaMaestroCondicionPrecinto.find(objRequest);
              $rootScope.DatosFormulario.AdministrarCondicionPrecinto.ListaMaestroCondicionPrecinto = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Filtro.CodigoCondicionPrecintoSunat = "";
              $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Filtro.NombreCondicionPrecinto = "";
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