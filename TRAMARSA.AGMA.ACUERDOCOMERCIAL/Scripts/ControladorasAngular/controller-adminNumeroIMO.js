(function () {
    angular.module('api')
    .controller('AdministrarNumeroIMOController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarNumeroIMO == undefined)
                  $rootScope.DatosFormulario.AdministrarNumeroIMO = new Object();
              if ($rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarNumeroIMO.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarNumeroIMO.ListaMaestroNumeroIMO = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroNumeroIMO":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarNumeroIMO('" + rowObject.CodigoNumeroIMO + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarNumeroIMO('" + rowObject.CodigoNumeroIMO + "');";
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

          $scope.EliminarNumeroIMO = function (CodigoNumeroIMO) {
              MiConfirm("¿Está seguro de anular Numero IMO?.", function () {

                  $rootScope.DatosFormulario.AdministrarNumeroIMO.Datos.CodigoNumeroIMO = CodigoNumeroIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarNumeroIMO.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/NumeroIMO/RegistrarNumeroIMO",
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

          $scope.EditarNumeroIMO = function (CodigoNumeroIMO) {
              $rootScope.DatosFormulario.AdministrarNumeroIMO.ListaMaestroNumeroIMO = jQuery("#grillaListaMaestroNumeroIMO").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarNumeroIMO.ListaMaestroNumeroIMO).where("$CodigoNumeroIMO=='" + CodigoNumeroIMO + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_NumeroIMO("Editar", objReg, "Actualizar Numero IMO");
              }
          }

          AbrirPopup_NumeroIMO = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "NumeroIMO/RegistroNumeroIMO",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroNumeroIMO",
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
                      $compile($("#divPopupRegistroNumeroIMO"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroNumeroIMO").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.BuscarClaseIMO_Click = function () {
              $rootScope.DatosFormulario.OpcionClaseIMO= "ConsultaNumeroIMO";
              getPopupResponsive({
                  formURL: "ClaseIMO/BuscarClaseIMO",
                  title: "Buscar ClaseIMO",
                  nombreDiv: "divPopupBuscarClaseIMO",
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
                      $compile($("#divPopupBuscarClaseIMO"))($scope);
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_NumeroIMO("Nuevo", newItem, "Registrar Numero IMO");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro)) };
              $scope.gridapigrillaListaMaestroNumeroIMO.find(objRequest);
              $rootScope.DatosFormulario.AdministrarNumeroIMO.ListaMaestroNumeroIMO = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro.NumberIMO = "";
              $rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro.NombreNumeroIMO = "";
              $rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro.PaginaNumeroIMO = "";
              $rootScope.DatosFormulario.AdministrarNumeroIMO.Datos.NombreClaseIMO = "";
              $rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro.CodigoClaseIMO = "";
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