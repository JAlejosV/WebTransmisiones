(function () {
    angular.module('api')
    .controller('AdministrarUnidadMercanciaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia == undefined)
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia = new Object();
              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarUnidadMercancia.ListaMaestroUnidadMercancia = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroUnidadMercancia":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarUnidadMercancia('" + rowObject.CodigoUnidadMercancia + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarUnidadMercancia('" + rowObject.CodigoUnidadMercancia + "');";
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


          $scope.EliminarUnidadMercancia = function (CodigoUnidadMercancia) {
              MiConfirm("¿Está seguro de eliminar Unidad de Mercancia?.", function () {

                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.Datos.CodigoUnidadMercancia = CodigoUnidadMercancia;
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarUnidadMercancia.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/UnidadMercancia/RegistrarUnidadMercancia",
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

          $scope.EditarUnidadMercancia = function (CodigoUnidadMercancia) {
              $rootScope.DatosFormulario.AdministrarUnidadMercancia.ListaMaestroUnidadMercancia = jQuery("#grillaListaMaestroUnidadMercancia").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarUnidadMercancia.ListaMaestroUnidadMercancia).where("$CodigoUnidadMercancia=='" + CodigoUnidadMercancia + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_UnidadMercancia("Editar", objReg, "Actualizar Unidad de Mercancia");
              }
          }

          AbrirPopup_UnidadMercancia = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "UnidadMercancia/RegistroUnidadMercancia",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroUnidadMercancia",
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
                      $compile($("#divPopupRegistroUnidadMercancia"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroUnidadMercancia").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_UnidadMercancia("Nuevo", newItem, "Registrar Unidad de Mercancia");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro)) };
              $scope.gridapigrillaListaMaestroUnidadMercancia.find(objRequest);
              $rootScope.DatosFormulario.AdministrarUnidadMercancia.ListaMaestroUnidadMercancia = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro.CodigoUnidadMercanciaSunat = "";
              $rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro.NombreUnidadMercancia = "";
              $rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro.CodigoAduanaUnidadMercancia = "";
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