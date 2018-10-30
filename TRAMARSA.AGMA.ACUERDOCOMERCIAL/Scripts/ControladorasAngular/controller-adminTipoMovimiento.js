(function () {
    angular.module('api')
    .controller('AdministrarTipoMovimientoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoMovimiento == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoMovimiento.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoMovimiento.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoMovimiento.ListaMaestroTipoMovimiento = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoMovimiento":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoMovimiento('" + rowObject.CodigoTipoMovimiento + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoMovimiento('" + rowObject.CodigoTipoMovimiento + "');";
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


          $scope.EliminarTipoMovimiento = function (CodigoTipoMovimiento) {
              MiConfirm("¿Está seguro de eliminar Tipo de Movimiento.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.Datos.CodigoTipoMovimiento = CodigoTipoMovimiento;
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoMovimiento.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoMovimiento/RegistrarTipoMovimiento",
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

          $scope.EditarTipoMovimiento = function (CodigoTipoMovimiento) {
              $rootScope.DatosFormulario.AdministrarTipoMovimiento.ListaMaestroTipoMovimiento = jQuery("#grillaListaMaestroTipoMovimiento").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoMovimiento.ListaMaestroTipoMovimiento).where("$CodigoTipoMovimiento=='" + CodigoTipoMovimiento + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoMovimiento.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoMovimiento("Editar", objReg, "Actualizar Tipo de Movimiento");
              }
          }

          AbrirPopup_TipoMovimiento = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoMovimiento/RegistroTipoMovimiento",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoMovimiento",
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
                      $compile($("#divPopupRegistroTipoMovimiento"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoMovimiento").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoMovimiento("Nuevo", newItem, "Registrar Tipo de Movimiento");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoMovimiento.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoMovimiento.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoMovimiento.ListaMaestroTipoMovimiento = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoMovimiento.Filtro.CodigoTipoMovimientoSunat = "";
              $rootScope.DatosFormulario.AdministrarTipoMovimiento.Filtro.NombreTipoMovimiento = "";
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