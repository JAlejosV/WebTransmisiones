(function () {
    angular.module('api')
    .controller('AdministrarTemperaturaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTemperatura == undefined)
                  $rootScope.DatosFormulario.AdministrarTemperatura = new Object();
              if ($rootScope.DatosFormulario.AdministrarTemperatura.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTemperatura.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTemperatura.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTemperatura.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTemperatura.ListaMaestroTemperatura = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTemperatura":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTemperatura('" + rowObject.CodigoTemperatura + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTemperatura('" + rowObject.CodigoTemperatura + "');";
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


          $scope.EliminarTemperatura = function (CodigoTemperatura) {
              MiConfirm("¿Está seguro de eliminar temperatura?.", function () {

                  $rootScope.DatosFormulario.AdministrarTemperatura.Datos.CodigoTemperatura = CodigoTemperatura;
                  $rootScope.DatosFormulario.AdministrarTemperatura.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTemperatura.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Temperatura/RegistrarTemperatura",
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

          $scope.EditarTemperatura = function (CodigoTemperatura) {
              $rootScope.DatosFormulario.AdministrarTemperatura.ListaMaestroTemperatura = jQuery("#grillaListaMaestroTemperatura").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTemperatura.ListaMaestroTemperatura).where("$CodigoTemperatura=='" + CodigoTemperatura + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTemperatura.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Temperatura("Editar", objReg, "Actualizar Temperatura");
              }
          }

          AbrirPopup_Temperatura = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Temperatura/RegistroTemperatura",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTemperatura",
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
                      $compile($("#divPopupRegistroTemperatura"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTemperatura").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Temperatura("Nuevo", newItem, "Registrar Temperatura");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTemperatura.Filtro)) };
              $scope.gridapigrillaListaMaestroTemperatura.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTemperatura.ListaMaestroTemperatura = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTemperatura.Filtro.CodigoTemperaturaSunat = "";
              $rootScope.DatosFormulario.AdministrarTemperatura.Filtro.NombreTemperatura = "";
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