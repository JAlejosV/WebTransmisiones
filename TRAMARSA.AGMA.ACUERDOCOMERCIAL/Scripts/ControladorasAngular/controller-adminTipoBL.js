(function () {
    angular.module('api')
    .controller('AdministrarTipoBLController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoBL == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoBL = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoBL.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoBL.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoBL.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoBL.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoBL.ListaMaestroTipoBL = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoBL":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoBL('" + rowObject.CodigoTipoBL + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoBL('" + rowObject.CodigoTipoBL + "');";
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


          $scope.EliminarTipoBL = function (CodigoTipoBL) {
              MiConfirm("¿Está seguro de eliminar el Tipo de BL?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoBL.Datos.CodigoTipoBL = CodigoTipoBL;
                  $rootScope.DatosFormulario.AdministrarTipoBL.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoBL.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoBL/RegistrarTipoBL",
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

          $scope.EditarTipoBL = function (CodigoTipoBL) {
              $rootScope.DatosFormulario.AdministrarTipoBL.ListaMaestroTipoBL = jQuery("#grillaListaMaestroTipoBL").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoBL.ListaMaestroTipoBL).where("$CodigoTipoBL=='" + CodigoTipoBL + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoBL.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoBL("Editar", objReg, "Actualizar Tipo de BL");
              }
          }

          AbrirPopup_TipoBL = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoBL/RegistroTipoBL",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoBL",
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
                      $compile($("#divPopupRegistroTipoBL"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoBL").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoBL("Nuevo", newItem, "Registrar Tipo de BL");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoBL.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoBL.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoBL.ListaMaestroTipoBL = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoBL.Filtro.CodigoTipoBLSunat = "";
              $rootScope.DatosFormulario.AdministrarTipoBL.Filtro.NombreTipoBL = "";
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