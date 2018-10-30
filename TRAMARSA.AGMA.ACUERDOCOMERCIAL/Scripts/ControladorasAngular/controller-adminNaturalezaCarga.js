(function () {
    angular.module('api')
    .controller('AdministrarNaturalezaCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga == undefined)
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga = new Object();
              if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarNaturalezaCarga.ListaMaestroNaturalezaCarga = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroNaturalezaCarga":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarNaturalezaCarga('" + rowObject.CodigoNaturalezaCarga + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarNaturalezaCarga('" + rowObject.CodigoNaturalezaCarga + "');";
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


          $scope.EliminarNaturalezaCarga = function (CodigoNaturalezaCarga) {
              MiConfirm("¿Está seguro de eliminar Naturaleza de Carga?.", function () {

                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Datos.CodigoNaturalezaCarga = CodigoNaturalezaCarga;
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/NaturalezaCarga/RegistrarNaturalezaCarga",
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

          $scope.EditarNaturalezaCarga = function (CodigoNaturalezaCarga) {
              $rootScope.DatosFormulario.AdministrarNaturalezaCarga.ListaMaestroNaturalezaCarga = jQuery("#grillaListaMaestroNaturalezaCarga").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarNaturalezaCarga.ListaMaestroNaturalezaCarga).where("$CodigoNaturalezaCarga=='" + CodigoNaturalezaCarga + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarNaturalezaCarga.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_NaturalezaCarga("Editar", objReg, "Actualizar Naturaleza de Carga");
              }
          }

          AbrirPopup_NaturalezaCarga = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "NaturalezaCarga/RegistroNaturalezaCarga",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroNaturalezaCarga",
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
                      $compile($("#divPopupRegistroNaturalezaCarga"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroNaturalezaCarga").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_NaturalezaCarga("Nuevo", newItem, "Registrar Naturaleza de Carga");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarNaturalezaCarga.Filtro)) };
              $scope.gridapigrillaListaMaestroNaturalezaCarga.find(objRequest);
              $rootScope.DatosFormulario.AdministrarNaturalezaCarga.ListaMaestroNaturalezaCarga = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Filtro.CodigoNaturalezaCargaSunat = "";
              $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Filtro.NombreNaturalezaCarga = "";
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