(function () {
    angular.module('api')
    .controller('AdministrarTipoLugarCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoLugarCarga.ListaMaestroTipoLugarCarga = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoLugarCarga":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoLugarCarga('" + rowObject.CodigoTipoLugarCarga + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoLugarCarga('" + rowObject.CodigoTipoLugarCarga + "');";
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


          $scope.EliminarTipoLugarCarga = function (CodigoTipoLugarCarga) {
              MiConfirm("¿Está seguro de eliminar el tipo de documento?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Datos.CodigoTipoLugarCarga = CodigoTipoLugarCarga;
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoLugarCarga/RegistrarTipoLugarCarga",
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

          $scope.EditarTipoLugarCarga = function (CodigoTipoLugarCarga) {
              $rootScope.DatosFormulario.AdministrarTipoLugarCarga.ListaMaestroTipoLugarCarga = jQuery("#grillaListaMaestroTipoLugarCarga").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoLugarCarga.ListaMaestroTipoLugarCarga).where("$CodigoTipoLugarCarga=='" + CodigoTipoLugarCarga + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoLugarCarga.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoLugarCarga("Editar", objReg, "Actualizar TipoLugarCarga");
              }
          }

          AbrirPopup_TipoLugarCarga = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoLugarCarga/RegistroTipoLugarCarga",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoLugarCarga",
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
                      $compile($("#divPopupRegistroTipoLugarCarga"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoLugarCarga").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoLugarCarga("Nuevo", newItem, "Registrar TipoLugarCarga");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoLugarCarga.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoLugarCarga.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoLugarCarga.ListaMaestroTipoLugarCarga = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Filtro.CodigoTipoLugarCargaSunat = "";
              $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Filtro.NombreTipoLugarCarga = "";
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