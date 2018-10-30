(function () {
    angular.module('api')
    .controller('AdministrarAduanaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarAduana == undefined)
                  $rootScope.DatosFormulario.AdministrarAduana = new Object();
              if ($rootScope.DatosFormulario.AdministrarAduana.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarAduana.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarAduana.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarAduana.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarAduana.ListaMaestroAduana = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroAduana":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarAduana('" + rowObject.CodigoAduana + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarAduana('" + rowObject.CodigoAduana + "');";
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

          $scope.EliminarAduana = function (CodigoAduana) {
              MiConfirm("¿Está seguro de anular el Aduana?.", function () {

                  $rootScope.DatosFormulario.AdministrarAduana.Datos.CodigoAduana = CodigoAduana;
                  $rootScope.DatosFormulario.AdministrarAduana.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarAduana.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Aduana/RegistrarAduana",
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

          $scope.EditarAduana = function (CodigoAduana) {
              $rootScope.DatosFormulario.AdministrarAduana.ListaMaestroAduana = jQuery("#grillaListaMaestroAduana").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarAduana.ListaMaestroAduana).where("$CodigoAduana=='" + CodigoAduana + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarAduana.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Aduana("Editar", objReg, "Actualizar Aduana");
              }
          }

          AbrirPopup_Aduana = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Aduana/RegistroAduana",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroAduana",
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
                      $compile($("#divPopupRegistroAduana"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroAduana").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.BuscarPuerto_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "ConsultaPuerto";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto",
                  nombreDiv: "divPopupBuscarPuerto",
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
                      $compile($("#divPopupBuscarPuerto"))($scope);
                  }
              });
          }

          $scope.BuscarViaTransporte_Click = function () {
              $rootScope.DatosFormulario.OpcionViaTransporte = "ConsultaViaTransporte";
              getPopupResponsive({
                  formURL: "ViaTransporte/BuscarViaTransporte",
                  title: "Buscar ViaTransporte",
                  nombreDiv: "divPopupBuscarViaTransporte",
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
                      $compile($("#divPopupBuscarViaTransporte"))($scope);
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Aduana("Nuevo", newItem, "Registrar Aduana");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarAduana.Filtro)) };
              $scope.gridapigrillaListaMaestroAduana.find(objRequest);
              $rootScope.DatosFormulario.AdministrarAduana.ListaMaestroAduana = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarAduana.Filtro.CodigoAduanaSunat = "";
              $rootScope.DatosFormulario.AdministrarAduana.Filtro.NombreAduana = "";
              $rootScope.DatosFormulario.AdministrarAduana.Datos.NombrePuerto = "";
              $rootScope.DatosFormulario.AdministrarAduana.Filtro.CodigoPuerto = "";
              $rootScope.DatosFormulario.AdministrarAduana.Datos.NombreViaTransporte = "";
              $rootScope.DatosFormulario.AdministrarAduana.Filtro.CodigoViaTransporte = "";
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