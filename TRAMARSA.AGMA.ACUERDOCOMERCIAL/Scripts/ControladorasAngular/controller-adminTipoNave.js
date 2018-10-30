(function () {
    angular.module('api')
    .controller('AdministrarTipoNaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoNave == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoNave = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoNave.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoNave.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoNave.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoNave.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoNave.ListaMaestroTipoNave = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoNave":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoNave('" + rowObject.CodigoTipoNave + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoNave('" + rowObject.CodigoTipoNave + "');";
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


          $scope.EliminarTipoNave = function (CodigoTipoNave) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoNave.Datos.CodigoTipoNave = CodigoTipoNave;
                  $rootScope.DatosFormulario.AdministrarTipoNave.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoNave.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoNave/RegistrarTipoNave",
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

          $scope.EditarTipoNave = function (CodigoTipoNave) {
              $rootScope.DatosFormulario.AdministrarTipoNave.ListaMaestroTipoNave = jQuery("#grillaListaMaestroTipoNave").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoNave.ListaMaestroTipoNave).where("$CodigoTipoNave=='" + CodigoTipoNave + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoNave.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoNave("Editar", objReg, "Actualizar TipoNave");
              }
          }

          AbrirPopup_TipoNave = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoNave/RegistroTipoNave",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoNave",
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
                      $compile($("#divPopupRegistroTipoNave"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoNave").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoNave("Nuevo", newItem, "Registrar TipoNave");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoNave.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoNave.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoNave.ListaMaestroTipoNave = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoNave.Filtro.CodigoTipoNaveSunat = "";
              $rootScope.DatosFormulario.AdministrarTipoNave.Filtro.NombreTipoNave = "";
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