(function () {
    angular.module('api')
    .controller('AdministrarClaseIMOController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarClaseIMO == undefined)
                  $rootScope.DatosFormulario.AdministrarClaseIMO = new Object();
              if ($rootScope.DatosFormulario.AdministrarClaseIMO.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarClaseIMO.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarClaseIMO.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarClaseIMO.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarClaseIMO.ListaMaestroClaseIMO = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroClaseIMO":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarClaseIMO('" + rowObject.CodigoClaseIMO + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarClaseIMO('" + rowObject.CodigoClaseIMO + "');";
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


          $scope.EliminarClaseIMO = function (CodigoClaseIMO) {
              MiConfirm("¿Está seguro de eliminar Clase IMO?.", function () {

                  $rootScope.DatosFormulario.AdministrarClaseIMO.Datos.CodigoClaseIMO = CodigoClaseIMO;
                  $rootScope.DatosFormulario.AdministrarClaseIMO.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarClaseIMO.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/ClaseIMO/RegistrarClaseIMO",
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

          $scope.EditarClaseIMO = function (CodigoClaseIMO) {
              $rootScope.DatosFormulario.AdministrarClaseIMO.ListaMaestroClaseIMO = jQuery("#grillaListaMaestroClaseIMO").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarClaseIMO.ListaMaestroClaseIMO).where("$CodigoClaseIMO=='" + CodigoClaseIMO + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarClaseIMO.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_ClaseIMO("Editar", objReg, "Actualizar Clase IMO");
              }
          }

          AbrirPopup_ClaseIMO = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "ClaseIMO/RegistroClaseIMO",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroClaseIMO",
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
                      $compile($("#divPopupRegistroClaseIMO"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroClaseIMO").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_ClaseIMO("Nuevo", newItem, "Registrar Clase IMO");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarClaseIMO.Filtro)) };
              $scope.gridapigrillaListaMaestroClaseIMO.find(objRequest);
              $rootScope.DatosFormulario.AdministrarClaseIMO.ListaMaestroClaseIMO = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarClaseIMO.Filtro.CodigoClaseIMOSunat = "";
              $rootScope.DatosFormulario.AdministrarClaseIMO.Filtro.NombreClaseIMO = "";
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