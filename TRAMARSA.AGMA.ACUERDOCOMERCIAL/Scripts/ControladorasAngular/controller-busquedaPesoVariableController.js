(function () {
    angular.module('api')
    .controller('BusquedaPesoVariableController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPesoVariable == undefined)
                  $rootScope.DatosFormulario.AdministrarPesoVariable = new Object();
              if ($rootScope.DatosFormulario.AdministrarPesoVariable.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarPesoVariable.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarPesoVariable.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarPesoVariable.Datos = new Object();
              $rootScope.DatosFormulario.AdministrarPesoVariable.ListaMaestroPesoVariable = [];
              $scope.CargarDatosIniciales();
          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/PesoVariable/RegistroPesoVariableIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.AdministrarPesoVariable.Datos.Lineas = data.Lineas;
                      if (data.Lineas.length > 0) {
                          $rootScope.DatosFormulario.AdministrarPesoVariable.Filtro.CodigoLinea = data.Lineas[0].Codigo;
                          if (data.Lineas.length == 1) {
                              $rootScope.DatosFormulario.AdministrarPesoVariable.Datos.Habilitado = 'False';
                          }
                      }
                  }
              });
          }

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroPesoVariable":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarPesoVariable('" + rowObject.CodigoVariable + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarPesoVariable('" + rowObject.CodigoVariable + "');";
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
          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }
          $scope.EliminarPesoVariable = function (codigoVariable) {
              MiConfirm("¿Está seguro de eliminar el Peso Variable?.", function () {
                  miBlock(true, "#html");
                  var newDelete = new Object();
                  newDelete.CodigoVariable = codigoVariable;
                  var objRequest = { "request": newDelete };
                  $.ajax({
                      url: "/PesoVariable/EliminarPesoVariable",
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
                                  MiAlertOk("Se ha eliminado correctamente el Peso Variable.", miAlertOkSuccess);
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
              if ($rootScope.DatosFormulario.AdministrarPesoVariable.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPesoVariable.Filtro.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              }
              else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPesoVariable.Filtro)) };
              $scope.gridapigrillaListaMaestroPesoVariable.find(objRequest);
              $rootScope.DatosFormulario.AdministrarPesoVariable.ListaMaestroPesoVariable = [];
              miBlock(false, "html");
          }
          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopupPesoVariable("Nuevo", newItem, "Registrar Peso Variable");
          }
          $scope.EditarPesoVariable = function (codigoVariable) {
              //if ($rootScope.DatosFormulario.AdministrarPesoVariable.ListaMaestroPesoVariable.length <= 0) {
                  $rootScope.DatosFormulario.AdministrarPesoVariable.ListaMaestroPesoVariable = jQuery("#grillaListaMaestroPesoVariable").jqGrid('getRowData');
             // }
              var objReg = $from($rootScope.DatosFormulario.AdministrarPesoVariable.ListaMaestroPesoVariable).where("$CodigoVariable=='" + codigoVariable + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPesoVariable.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopupPesoVariable("Editar", objReg, "Actualizar Peso Variable");
              }
          }
          AbrirPopupPesoVariable = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "PesoVariable/RegistroPesoVariable",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroPesoVariable",
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
                      $compile($("#divPopupRegistroPesoVariable"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroPesoVariable").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarPesoVariable.Filtro.CodigoVariable = "";
              $rootScope.DatosFormulario.AdministrarPesoVariable.Filtro.Descripcion = "";
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