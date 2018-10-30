(function () {
    angular.module('api')
    .controller('AdministrarPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPrecinto == undefined)
                  $rootScope.DatosFormulario.AdministrarPrecinto = new Object();
              if ($rootScope.DatosFormulario.AdministrarPrecinto.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarPrecinto.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarPrecinto.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarPrecinto.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarPrecinto.ListaMaestroPrecinto = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroPrecinto":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarPrecinto('" + rowObject.CodigoPrecinto + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarPrecinto('" + rowObject.CodigoPrecinto + "');";
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

          $scope.EliminarPrecinto = function (CodigoPrecinto) {
              MiConfirm("¿Está seguro de anular el Precinto?.", function () {

                  $rootScope.DatosFormulario.AdministrarPrecinto.Datos.CodigoPrecinto = CodigoPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPrecinto.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Precinto/RegistrarPrecinto",
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

          $scope.EditarPrecinto = function (CodigoPrecinto) {
              $rootScope.DatosFormulario.AdministrarPrecinto.ListaMaestroPrecinto = jQuery("#grillaListaMaestroPrecinto").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarPrecinto.ListaMaestroPrecinto).where("$CodigoPrecinto=='" + CodigoPrecinto + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPrecinto.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Precinto("Editar", objReg, "Actualizar Precinto");
              }
          }

          AbrirPopup_Precinto = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Precinto/RegistroPrecinto",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroPrecinto",
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
                      $compile($("#divPopupRegistroPrecinto"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroPrecinto").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.BuscarCondicionPrecinto_Click = function () {
              $rootScope.DatosFormulario.OpcionCondicionPrecinto= "ConsultaPrecinto";
              getPopupResponsive({
                  formURL: "CondicionPrecinto/BuscarCondicionPrecinto",
                  title: "Buscar CondicionPrecinto",
                  nombreDiv: "divPopupBuscarCondicionPrecinto",
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
                      $compile($("#divPopupBuscarCondicionPrecinto"))($scope);
                  }
              });
          }

          $scope.BuscarEntidadPrecinto_Click = function () {
              $rootScope.DatosFormulario.OpcionEntidadPrecinto = "ConsultaPrecinto";
              getPopupResponsive({
                  formURL: "EntidadPrecinto/BuscarEntidadPrecinto",
                  title: "Buscar EntidadPrecinto",
                  nombreDiv: "divPopupBuscarEntidadPrecinto",
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
                      $compile($("#divPopupBuscarEntidadPrecinto"))($scope);
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Precinto("Nuevo", newItem, "Registrar Precinto");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPrecinto.Filtro)) };
              $scope.gridapigrillaListaMaestroPrecinto.find(objRequest);
              $rootScope.DatosFormulario.AdministrarPrecinto.ListaMaestroPrecinto = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarPrecinto.Filtro.NumeroPrecinto = "";
              $rootScope.DatosFormulario.AdministrarPrecinto.Datos.NombreCondicionPrecinto = "";
              $rootScope.DatosFormulario.AdministrarPrecinto.Filtro.CodigoCondicionPrecinto = "";
              $rootScope.DatosFormulario.AdministrarPrecinto.Datos.NombreEntidadPrecinto = "";
              $rootScope.DatosFormulario.AdministrarPrecinto.Filtro.CodigoEntidadPrecinto = "";
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