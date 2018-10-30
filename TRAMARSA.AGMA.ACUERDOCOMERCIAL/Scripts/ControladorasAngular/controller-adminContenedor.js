(function () {
    angular.module('api')
    .controller('AdministrarContenedorController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedor == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedor = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedor.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedor.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedor.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedor.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarContenedor.ListaMaestroContenedor = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroContenedor":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarContenedor('" + rowObject.CodigoContenedor + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarContenedor('" + rowObject.CodigoContenedor + "');";
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

          $scope.EliminarContenedor = function (CodigoContenedor) {
              MiConfirm("¿Está seguro de anular el Contenedor?.", function () {

                  $rootScope.DatosFormulario.AdministrarContenedor.Datos.CodigoContenedor = CodigoContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarContenedor.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Contenedor/RegistrarContenedor",
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

          $scope.EditarContenedor = function (CodigoContenedor) {
              $rootScope.DatosFormulario.AdministrarContenedor.ListaMaestroContenedor = jQuery("#grillaListaMaestroContenedor").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarContenedor.ListaMaestroContenedor).where("$CodigoContenedor=='" + CodigoContenedor + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarContenedor.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Contenedor("Editar", objReg, "Actualizar Contenedor");
              }
          }

          AbrirPopup_Contenedor = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Contenedor/RegistroContenedor",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroContenedor",
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
                      $compile($("#divPopupRegistroContenedor"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroContenedor").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.BuscarTipoContenedor_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoContenedor= "ConsultaContenedor";
              getPopupResponsive({
                  formURL: "TipoContenedor/BuscarTipoContenedor",
                  title: "Buscar Tipo de Contenedor",
                  nombreDiv: "divPopupBuscarTipoContenedor",
                  nombreGrid: "",
                  width: "1200px",
                  height: 800,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarTipoContenedor"))($scope);
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Contenedor("Nuevo", newItem, "Registrar Contenedor");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarContenedor.Filtro)) };
              $scope.gridapigrillaListaMaestroContenedor.find(objRequest);
              $rootScope.DatosFormulario.AdministrarContenedor.ListaMaestroContenedor = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarContenedor.Filtro.NumeroContenedor = "";
              $rootScope.DatosFormulario.AdministrarContenedor.Filtro.TaraContenedor = "";
              $rootScope.DatosFormulario.AdministrarContenedor.Filtro.CodTipoContenedor = "";
              $rootScope.DatosFormulario.AdministrarContenedor.Filtro.TamanioTipoContenedor = "";
              $rootScope.DatosFormulario.AdministrarContenedor.Datos.NombreTipoContenedor = "";
              $rootScope.DatosFormulario.AdministrarContenedor.Filtro.CodigoTipoContenedor = "";
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