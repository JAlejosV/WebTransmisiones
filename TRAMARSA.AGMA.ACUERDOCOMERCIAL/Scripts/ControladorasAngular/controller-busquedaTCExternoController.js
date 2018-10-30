(function () {
    angular.module('api')
    .controller('BusquedaTipoContenedorExternoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedorExterno == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedorExterno = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedorExterno.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedorExterno.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedorExterno.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedorExterno.Datos = new Object();
              $rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno = [];
              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/TipoContenedorExterno/RegistroTipoContenedorExternoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.AdministrarContenedorExterno.Datos.Lineas = data.Lineas;
                          if (data.Lineas.length > 0) {
                              $rootScope.DatosFormulario.AdministrarContenedorExterno.Filtro.CodigoLinea = data.Lineas[0].Codigo;
                              if (data.Lineas.length == 1) {
                                  $rootScope.DatosFormulario.AdministrarContenedorExterno.Datos.Habilitado = 'False';
                              }
                          }
                      }
                  }
              });
          }

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroTipoContenedorExterno":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarContenedorExterno('" + rowObject.CodigoTipoContenedorExterno + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarContenedorExterno('" + rowObject.CodigoTipoContenedorExterno + "','" + rowObject.CodigoLinea + "');";
                                  break;
                              case "VerDetalle":
                                  eventoclick = "$parent.VerDetalleTipoContenedorExterno('" + rowObject.CodigoTipoContenedorExterno + "');";
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
          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }
          $scope.EliminarContenedorExterno = function (codigoTipoContenedorExterno, codigoLinea) {
              MiConfirm("¿Está seguro de eliminar el Tipo Contenedor Externo?.", function () {
                  miBlock(true, "#html");
                  var newDelete = new Object();
                  newDelete.CodigoTipoContenedorExterno = codigoTipoContenedorExterno;
                  newDelete.CodigoLinea = codigoLinea;
                  var objRequest = { "request": newDelete };
                  $.ajax({
                      url: "/TipoContenedorExterno/EliminarTipoContenedorExterno",
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
                                  MiAlertOk("Se ha eliminado correctamente el Tipo Contenedor Externo.", miAlertOkSuccess);
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
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarContenedorExterno.Filtro)) };
              $scope.gridapigrillaListaMaestroTipoContenedorExterno.find(objRequest);
              $rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno = [];
              miBlock(false, "html");
          }
          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopupContenedorExterno("Nuevo", newItem, "Registrar Tipo Contenedor Externo");
          }
          $scope.EditarContenedorExterno = function (codigoTipoContenedorExterno) {
              if ($rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno.length <= 0) {
                  $rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno = jQuery("#grillaListaMaestroTipoContenedorExterno").jqGrid('getRowData');
              }
              var objReg = $from($rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno).where("$CodigoTipoContenedorExterno=='" + codigoTipoContenedorExterno + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarContenedorExterno.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopupContenedorExterno("Editar", objReg, "Actualizar Tipo Contenedor Externo");
              }
          }
          AbrirPopupContenedorExterno = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "TipoContenedorExterno/RegistroTipoContenedorExterno/",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroContenedorExterno",
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
                      $compile($("#divPopupRegistroContenedorExterno"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroContenedorExterno").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }
          $scope.VerDetalleTipoContenedorExterno = function (codigoTipoContenedorExterno) {
              if ($rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno.length <= 0) {
                  $rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno = jQuery("#grillaListaMaestroTipoContenedorExterno").jqGrid('getRowData');
              }
              var objReg = $from($rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno).where("$CodigoTipoContenedorExterno=='" + codigoTipoContenedorExterno + "'").firstOrDefault();
              if (objReg != undefined) {
                  getPopupResponsive({
                      formURL: "/DetalleTipoContenedorExterno/DetalleTipoContenedorExterno",
                      title: "Detalle Tipo Contenedor Externo",
                      nombreDiv: "divPopupDetalleTipoContenedorExterno",
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
                          $compile($("#divPopupDetalleTipoContenedorExterno"))($scope);
                          var scopePopup = angular.element("#divPopupDetalleTipoContenedorExterno").scope();
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
              $rootScope.DatosFormulario.AdministrarContenedorExterno.Filtro.CodigoTipoContenedorExterno = "";
              $rootScope.DatosFormulario.AdministrarContenedorExterno.Filtro.CodigoEquivalencia = "";
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