(function () {
    angular.module('api')
    .controller('AdministrarLineaNavieraController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarLineaNaviera == undefined)
                  $rootScope.DatosFormulario.AdministrarLineaNaviera = new Object();
              if ($rootScope.DatosFormulario.AdministrarLineaNaviera.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarLineaNaviera.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarLineaNaviera.ListaMaestroLineaNaviera = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroLineaNaviera":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarLineaNaviera('" + rowObject.CodigoLineaNaviera + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarLineaNaviera('" + rowObject.CodigoLineaNaviera + "');";
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


          $scope.EliminarLineaNaviera = function (CodigoLineaNaviera) {
              MiConfirm("¿Está seguro de eliminar el LineaNaviera?.", function () {

                  $rootScope.DatosFormulario.AdministrarLineaNaviera.Datos.CodigoLineaNaviera = CodigoLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarLineaNaviera.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/LineaNaviera/RegistrarLineaNaviera",
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

          $scope.EditarLineaNaviera = function (CodigoLineaNaviera) {
              $rootScope.DatosFormulario.AdministrarLineaNaviera.ListaMaestroLineaNaviera = jQuery("#grillaListaMaestroLineaNaviera").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarLineaNaviera.ListaMaestroLineaNaviera).where("$CodigoLineaNaviera=='" + CodigoLineaNaviera + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarLineaNaviera.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_LineaNaviera("Editar", objReg, "Actualizar LineaNaviera");
              }
          }

          AbrirPopup_LineaNaviera = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "LineaNaviera/RegistroLineaNaviera",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroLineaNaviera",
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
                      $compile($("#divPopupRegistroLineaNaviera"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroLineaNaviera").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_LineaNaviera("Nuevo", newItem, "Registrar LineaNaviera");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarLineaNaviera.Filtro)) };
              $scope.gridapigrillaListaMaestroLineaNaviera.find(objRequest);
              $rootScope.DatosFormulario.AdministrarLineaNaviera.ListaMaestroLineaNaviera = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarLineaNaviera.Filtro.NombreLineaNaviera = "";
              $rootScope.DatosFormulario.AdministrarLineaNaviera.Filtro.RucLineaNaviera = "";
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