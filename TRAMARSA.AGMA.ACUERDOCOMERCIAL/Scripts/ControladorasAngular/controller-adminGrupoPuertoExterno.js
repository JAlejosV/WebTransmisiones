(function () {
    angular.module('api')
    .controller('AdministrarGrupoPuertoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto == undefined)
                  $rootScope.DatosFormulario.AdministrarGrupoPuerto = new Object();
              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarGrupoPuerto.Datos = new Object();
              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/GrupoPuertoExterno/GrabarGrupoPuertoExternoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.AdministrarGrupoPuerto.Datos.Lineas = data.Lineas;
                          if (data.Lineas.length > 0) {
                              $rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro.CodigoLinea = data.Lineas[0].Codigo;
                              if (data.Lineas.length == 1) {
                                  $rootScope.DatosFormulario.AdministrarGrupoPuerto.Datos.Habilitado = 'False';
                              }
                          }
                      }
                  }
              });
          }
          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopupGrupoPuertoExterno("Nuevo", newItem, "Registrar Grupo Puerto Externo");
          }
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaMaestroGrupoPuertoExterno":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarGrupoPuertoExterno('" + rowObject.CodigoGrupoPuerto + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarGrupoPuertoExterno('" + rowObject.CodigoGrupoPuerto + "');";
                                  break;
                              case "VerDetalle":
                                  eventoclick = "$parent.VerDetalleGrupoPuertoExterno('" + rowObject.CodigoGrupoPuerto + "');";
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
              if (tipoboton == "VerDetalle") {
                  html = HtmlCrearBoton("VerDetalle", eventoclick, "");
              }
              return html;
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }

              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              }
              else if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              }
              else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro)) };
              $scope.gridapigrillaMaestroGrupoPuertoExterno.find(objRequest);
              $rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = [];
              miBlock(false, "html");
          }
          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }
          $scope.EliminarGrupoPuertoExterno = function (codigoGrupoPuerto) {
              MiConfirm("¿Está seguro de eliminar el Grupo Puerto Externo?.", function () {
                  miBlock(true, "#html");
                  var newDelete = new Object();
                  newDelete.CodigoGrupoPuerto = codigoGrupoPuerto;
                  var objRequest = { "request": newDelete };
                  $.ajax({
                      url: "/GrupoPuertoExterno/EliminarGrupoPuertoExterno",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: objRequest,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          miBlock(false, "#html");
                          if (data.Result != null) {
                              if (data.Result.Satisfactorio === true) {
                                  MiAlertOk("Se ha eliminado correctamente el Grupo Puerto Externo.", miAlertOkSuccess);
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
          $scope.EditarGrupoPuertoExterno = function (codigoGrupoPuerto) {
              // if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno.length <= 0) {
              $rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = jQuery("#grillaMaestroGrupoPuertoExterno").jqGrid('getRowData');
              //}
              var objReg = $from($rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno).where("$CodigoGrupoPuerto=='" + codigoGrupoPuerto + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopupGrupoPuertoExterno("Editar", objReg, "Actualizar Grupo Puerto Externo");
              }
          }
          AbrirPopupGrupoPuertoExterno = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "GrupoPuertoExterno/RegistroNuevoGrupoPuerto",
                  title: titlepop,
                  nombreDiv: "divPopupNuevoGrupoPuerto",
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
                      $compile($("#divPopupNuevoGrupoPuerto"))($scope);
                      var scopePopup = angular.element("#divPopupNuevoGrupoPuerto").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.VerDetalleGrupoPuertoExterno = function (codigoGrupoPuerto) {
              // if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno.length <= 0) {
              $rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = jQuery("#grillaMaestroGrupoPuertoExterno").jqGrid('getRowData');
              //}
              var objReg = $from($rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno).where("$CodigoGrupoPuerto=='" + codigoGrupoPuerto + "'").firstOrDefault();
              if (objReg != undefined) {
                  getPopupResponsive({
                      formURL: "DetalleGrupoPuertoExterno/DetalleGrupoPuertoExterno",
                      title: "Detalle Grupo Puerto Externo",
                      nombreDiv: "divPopupDetalleGrupoPuertoExterno",
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
                          $(obj).attr("ModoPagina", "Detalle");
                          $compile($("#divPopupDetalleGrupoPuertoExterno"))($scope);
                          var scopePopup = angular.element("#divPopupDetalleGrupoPuertoExterno").scope();
                          scopePopup.row = JSON.parse(JSON.stringify(objReg));
                          scopePopup.rowOk = objReg;
                      }
                  });
              }
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro.CodigoGrupoPuerto = "";
              $rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro.NombreGrupoPuerto = "";
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