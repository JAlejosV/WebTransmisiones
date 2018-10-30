(function () {
    angular.module('api')
    .controller('AdministrarTipoFleteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoFlete == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoFlete = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoFlete.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoFlete.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoFlete.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoFlete.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoFlete.ListaMaestroTipoFlete = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoFlete":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoFlete('" + rowObject.CodigoTipoFlete + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoFlete('" + rowObject.CodigoTipoFlete + "');";
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


          $scope.EliminarTipoFlete = function (CodigoTipoFlete) {
              MiConfirm("¿Está seguro de eliminar el TipoFlete?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoFlete.Datos.CodigoTipoFlete = CodigoTipoFlete;
                  $rootScope.DatosFormulario.AdministrarTipoFlete.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoFlete.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoFlete/RegistrarTipoFlete",
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

          $scope.EditarTipoFlete = function (CodigoTipoFlete) {
              $rootScope.DatosFormulario.AdministrarTipoFlete.ListaMaestroTipoFlete = jQuery("#grillaListaMaestroTipoFlete").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoFlete.ListaMaestroTipoFlete).where("$CodigoTipoFlete=='" + CodigoTipoFlete + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoFlete.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoFlete("Editar", objReg, "Actualizar TipoFlete");
              }
          }

          AbrirPopup_TipoFlete = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoFlete/RegistroTipoFlete",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoFlete",
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
                      $compile($("#divPopupRegistroTipoFlete"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoFlete").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoFlete("Nuevo", newItem, "Registrar TipoFlete");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoFlete.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoFlete.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoFlete.ListaMaestroTipoFlete = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoFlete.Filtro.NombreTipoFlete = "";
              $rootScope.DatosFormulario.AdministrarTipoFlete.Filtro.CodigoAduanaTipoFlete = "";
              $rootScope.DatosFormulario.AdministrarTipoFlete.Filtro.CodigoEquivalencia = "";
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