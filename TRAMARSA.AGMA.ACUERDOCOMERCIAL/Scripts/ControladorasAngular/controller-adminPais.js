(function () {
    angular.module('api')
    .controller('AdministrarPaisController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPais == undefined)
                  $rootScope.DatosFormulario.AdministrarPais = new Object();
              if ($rootScope.DatosFormulario.AdministrarPais.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarPais.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarPais.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarPais.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarPais.ListaMaestroPais = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroPais":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarPais('" + rowObject.CodigoPais + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarPais('" + rowObject.CodigoPais + "');";
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


          $scope.EliminarPais = function (CodigoPais) {
              MiConfirm("¿Está seguro de eliminar el Pais?.", function () {

                  $rootScope.DatosFormulario.AdministrarPais.Datos.CodigoPais = CodigoPais;
                  $rootScope.DatosFormulario.AdministrarPais.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPais.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Pais/RegistrarPais",
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

          $scope.EditarPais = function (CodigoPais) {
              $rootScope.DatosFormulario.AdministrarPais.ListaMaestroPais = jQuery("#grillaListaMaestroPais").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarPais.ListaMaestroPais).where("$CodigoPais=='" + CodigoPais + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPais.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Pais("Editar", objReg, "Actualizar Pais");
              }
          }

          AbrirPopup_Pais = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Pais/RegistroPais",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroPais",
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
                      $compile($("#divPopupRegistroPais"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroPais").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Pais("Nuevo", newItem, "Registrar Pais");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPais.Filtro)) };
              $scope.gridapigrillaListaMaestroPais.find(objRequest);
              $rootScope.DatosFormulario.AdministrarPais.ListaMaestroPais = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarPais.Filtro.CodigoPaisSunat = "";
              $rootScope.DatosFormulario.AdministrarPais.Filtro.NombrePais = "";
              $rootScope.DatosFormulario.AdministrarPais.Filtro.CodigoAlfaPais = "";
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