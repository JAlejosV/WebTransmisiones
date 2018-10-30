(function () {
    angular.module('api')
    .controller('AdministrarRequerimientoServicioController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio == undefined)
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio = new Object();
              if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarRequerimientoServicio.ListaMaestroRequerimientoServicio = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroRequerimientoServicio":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarRequerimientoServicio('" + rowObject.CodigoRequerimientoServicio + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarRequerimientoServicio('" + rowObject.CodigoRequerimientoServicio + "');";
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


          $scope.EliminarRequerimientoServicio = function (CodigoRequerimientoServicio) {
              MiConfirm("¿Está seguro de eliminar el Requerimiento Servicio?.", function () {

                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Datos.CodigoRequerimientoServicio = CodigoRequerimientoServicio;
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/RequerimientoServicio/RegistrarRequerimientoServicio",
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

          $scope.EditarRequerimientoServicio = function (CodigoRequerimientoServicio) {
              $rootScope.DatosFormulario.AdministrarRequerimientoServicio.ListaMaestroRequerimientoServicio = jQuery("#grillaListaMaestroRequerimientoServicio").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarRequerimientoServicio.ListaMaestroRequerimientoServicio).where("$CodigoRequerimientoServicio=='" + CodigoRequerimientoServicio + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarRequerimientoServicio.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_RequerimientoServicio("Editar", objReg, "Actualizar Requerimiento Servicio");
              }
          }

          AbrirPopup_RequerimientoServicio = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "RequerimientoServicio/RegistroRequerimientoServicio",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroRequerimientoServicio",
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
                      $compile($("#divPopupRegistroRequerimientoServicio"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroRequerimientoServicio").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_RequerimientoServicio("Nuevo", newItem, "Registrar Requerimiento Servicio");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarRequerimientoServicio.Filtro)) };
              $scope.gridapigrillaListaMaestroRequerimientoServicio.find(objRequest);
              $rootScope.DatosFormulario.AdministrarRequerimientoServicio.ListaMaestroRequerimientoServicio = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Filtro.CodigoRequerimientoServicioSunat = "";
              $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Filtro.NombreRequerimientoServicio = "";
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