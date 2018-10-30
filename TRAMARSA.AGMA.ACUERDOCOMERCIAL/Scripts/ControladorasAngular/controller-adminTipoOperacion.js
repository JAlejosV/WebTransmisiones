(function () {
    angular.module('api')
    .controller('AdministrarTipoOperacionController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoOperacion == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoOperacion = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoOperacion.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoOperacion.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoOperacion.ListaMaestroTipoOperacion = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoOperacion":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoOperacion('" + rowObject.CodigoTipoOperacion + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoOperacion('" + rowObject.CodigoTipoOperacion + "');";
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


          $scope.EliminarTipoOperacion = function (CodigoTipoOperacion) {
              MiConfirm("¿Está seguro de eliminar el TipoOperacion?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoOperacion.Datos.CodigoTipoOperacion = CodigoTipoOperacion;
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoOperacion.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoOperacion/RegistrarTipoOperacion",
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

          $scope.EditarTipoOperacion = function (CodigoTipoOperacion) {
              $rootScope.DatosFormulario.AdministrarTipoOperacion.ListaMaestroTipoOperacion = jQuery("#grillaListaMaestroTipoOperacion").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoOperacion.ListaMaestroTipoOperacion).where("$CodigoTipoOperacion=='" + CodigoTipoOperacion + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoOperacion.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoOperacion("Editar", objReg, "Actualizar TipoOperacion");
              }
          }

          AbrirPopup_TipoOperacion = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoOperacion/RegistroTipoOperacion",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoOperacion",
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
                      $compile($("#divPopupRegistroTipoOperacion"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoOperacion").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoOperacion("Nuevo", newItem, "Registrar Tipo de Operacion");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoOperacion.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoOperacion.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoOperacion.ListaMaestroTipoOperacion = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoOperacion.Filtro.CodigoTipoOperacionSunat = "";
              $rootScope.DatosFormulario.AdministrarTipoOperacion.Filtro.NombreTipoOperacion = "";
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