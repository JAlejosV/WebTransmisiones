(function () {
    angular.module('api')
    .controller('AdministrarRolController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarRol == undefined)
                  $rootScope.DatosFormulario.AdministrarRol = new Object();
              if ($rootScope.DatosFormulario.AdministrarRol.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarRol.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarRol.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarRol.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarRol.ListaMaestroRol = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroRol":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarRol('" + rowObject.CodigoRol + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarRol('" + rowObject.CodigoRol + "');";
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


          $scope.EliminarRol = function (CodigoRol) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarRol.Datos.CodigoRol = CodigoRol;
                  $rootScope.DatosFormulario.AdministrarRol.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarRol.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Rol/RegistrarRol",
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

          $scope.EditarRol = function (CodigoRol) {
              $rootScope.DatosFormulario.AdministrarRol.ListaMaestroRol = jQuery("#grillaListaMaestroRol").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarRol.ListaMaestroRol).where("$CodigoRol=='" + CodigoRol + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarRol.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Rol("Editar", objReg, "Actualizar Rol");
              }
          }

          AbrirPopup_Rol = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Rol/RegistroRol",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroRol",
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
                      $compile($("#divPopupRegistroRol"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroRol").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Rol("Nuevo", newItem, "Registrar Rol");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarRol.Filtro)) };
              $scope.gridapigrillaListaMaestroRol.find(objRequest);
              $rootScope.DatosFormulario.AdministrarRol.ListaMaestroRol = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarRol.Filtro.CodigoRolSunat = "";
              $rootScope.DatosFormulario.AdministrarRol.Filtro.NombreRol = "";
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