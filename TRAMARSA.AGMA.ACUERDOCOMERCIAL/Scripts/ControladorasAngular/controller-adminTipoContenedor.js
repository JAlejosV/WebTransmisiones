(function () {
    angular.module('api')
    .controller('AdministrarTipoContenedorController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoContenedor == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoContenedor = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarTipoContenedor.ListaMaestroTipoContenedor = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoContenedor":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTipoContenedor('" + rowObject.CodigoTipoContenedor + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarTipoContenedor('" + rowObject.CodigoTipoContenedor + "');";
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


          $scope.EliminarTipoContenedor = function (CodigoTipoContenedor) {
              MiConfirm("¿Está seguro de eliminar el Tipo de Contenedor?.", function () {

                  $rootScope.DatosFormulario.AdministrarTipoContenedor.Datos.CodigoTipoContenedor = CodigoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoContenedor.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/TipoContenedor/RegistrarTipoContenedor",
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

          $scope.EditarTipoContenedor = function (CodigoTipoContenedor) {
              $rootScope.DatosFormulario.AdministrarTipoContenedor.ListaMaestroTipoContenedor = jQuery("#grillaListaMaestroTipoContenedor").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarTipoContenedor.ListaMaestroTipoContenedor).where("$CodigoTipoContenedor=='" + CodigoTipoContenedor + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_TipoContenedor("Editar", objReg, "Actualizar Tipo de Contenedor");
              }
          }

          AbrirPopup_TipoContenedor = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoContenedor/RegistroTipoContenedor",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroTipoContenedor",
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
                      $compile($("#divPopupRegistroTipoContenedor"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroTipoContenedor").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_TipoContenedor("Nuevo", newItem, "Registrar Tipo de Contenedor");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoContenedor.find(objRequest);
              $rootScope.DatosFormulario.AdministrarTipoContenedor.ListaMaestroTipoContenedor = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro.CodigoIsoTipoContenedor = "";
              $rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro.CodigoIsoGrupoTipoContenedor = "";
              $rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro.NombreTipoContenedor = "";
              $rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro.CodTipoContenedor = "";
              $rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro.TamanioTipoContenedor = "";
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