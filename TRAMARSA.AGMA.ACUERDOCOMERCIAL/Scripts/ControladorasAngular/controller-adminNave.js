(function () {
    angular.module('api')
    .controller('AdministrarNaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarNave == undefined)
                  $rootScope.DatosFormulario.AdministrarNave = new Object();
              if ($rootScope.DatosFormulario.AdministrarNave.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarNave.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarNave.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarNave.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarNave.ListaMaestroNave = [];
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroNave":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarNave('" + rowObject.CodigoNave + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarNave('" + rowObject.CodigoNave + "');";
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


          $scope.EliminarNave = function (CodigoNave) {
              MiConfirm("¿Está seguro de eliminar el Nave?.", function () {

                  $rootScope.DatosFormulario.AdministrarNave.Datos.CodigoNave = CodigoNave;
                  $rootScope.DatosFormulario.AdministrarNave.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarNave.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Nave/RegistrarNave",
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

          $scope.EditarNave = function (CodigoNave) {
              $rootScope.DatosFormulario.AdministrarNave.ListaMaestroNave = jQuery("#grillaListaMaestroNave").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarNave.ListaMaestroNave).where("$CodigoNave=='" + CodigoNave + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarNave.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Nave("Editar", objReg, "Actualizar Nave");
              }
          }

          AbrirPopup_Nave = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Nave/RegistroNave",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroNave",
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
                      $compile($("#divPopupRegistroNave"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroNave").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.BuscarPais_Click = function () {
              $rootScope.DatosFormulario.OpcionPais = "ConsultaPais";
              getPopupResponsive({
                  formURL: "Pais/BuscarPais",
                  title: "Buscar Pais",
                  nombreDiv: "divPopupBuscarPais",
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
                      $compile($("#divPopupBuscarPais"))($scope);
                  }
              });
          }

          $scope.BuscarTipoNave_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoNave = "ConsultaTipoNave";
              getPopupResponsive({
                  formURL: "TipoNave/BuscarTipoNave",
                  title: "Buscar TipoNave",
                  nombreDiv: "divPopupBuscarTipoNave",
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
                      $compile($("#divPopupBuscarTipoNave"))($scope);
                  }
              });
          }

          $scope.BuscarLineaNaviera_Click = function () {
              $rootScope.DatosFormulario.OpcionLineaNaviera = "ConsultaLineaNaviera";
              getPopupResponsive({
                  formURL: "LineaNaviera/BuscarLineaNaviera",
                  title: "Buscar LineaNaviera",
                  nombreDiv: "divPopupBuscarLineaNaviera",
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
                      $compile($("#divPopupBuscarLineaNaviera"))($scope);
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Nave("Nuevo", newItem, "Registrar Nave");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarNave.Filtro)) };
              $scope.gridapigrillaListaMaestroNave.find(objRequest);
              $rootScope.DatosFormulario.AdministrarNave.ListaMaestroNave = [];
              miBlock(false, "html");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoPais = "";
              $rootScope.DatosFormulario.AdministrarNave.Datos.NombrePais = "";
              $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoTipoNave = "";
              $rootScope.DatosFormulario.AdministrarNave.Datos.NombreTipoNave = "";
              $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoLineaNaviera = "";
              $rootScope.DatosFormulario.AdministrarNave.Datos.NombreLineaNaviera = "";
              $rootScope.DatosFormulario.AdministrarNave.Filtro.NombreNave = "";
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