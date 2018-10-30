(function () {
    angular.module('api')
    .controller('AdministrarItinerarioController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarItinerario == undefined)
                  $rootScope.DatosFormulario.AdministrarItinerario = new Object();
              if ($rootScope.DatosFormulario.AdministrarItinerario.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarItinerario.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarItinerario.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarItinerario.Datos = new Object();
              if ($rootScope.DatosFormulario.ItinerarioIndex == undefined)
                  $rootScope.DatosFormulario.ItinerarioIndex = new Object();

              $rootScope.DatosFormulario.AdministrarItinerario.ListaMaestroItinerario = [];

              $scope.CargaInicialItinerario();
              $(".InputTEXT_04Fecha").prop('disabled', false);
          });

          $scope.CargaInicialItinerario = function () {
              $.ajax({
                  url: "/Itinerario/ItinerarioIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {

                      $rootScope.DatosFormulario.ItinerarioIndex.TiposOperacion = data.TiposOperacion;
                      $rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoTipoOperacion = $rootScope.DatosFormulario.ItinerarioIndex.TiposOperacion[0].CodigoTipoOperacion;

                      $rootScope.DatosFormulario.AdministrarItinerario.Filtro.OriginalFechaInicio = data.FechaDefault;
                      $rootScope.DatosFormulario.AdministrarItinerario.Filtro.OriginalFechaFin = data.FechaFinDefault;

                      $rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioInicio = data.FechaDefault;
                      $rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioFin = data.FechaFinDefault;
                  }
              });
          }

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroItinerario":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarItinerario('" + rowObject.CodigoItinerario + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarItinerario('" + rowObject.CodigoItinerario + "');";
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

          $scope.EliminarItinerario = function (CodigoItinerario) {
              MiConfirm("¿Está seguro de anular itinerario?.", function () {

                  $rootScope.DatosFormulario.AdministrarItinerario.Datos.CodigoItinerario = CodigoItinerario;
                  $rootScope.DatosFormulario.AdministrarItinerario.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarItinerario.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/Itinerario/RegistrarItinerario",
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

          $scope.EditarItinerario = function (CodigoItinerario) {
              $rootScope.DatosFormulario.AdministrarItinerario.ListaMaestroItinerario = jQuery("#grillaListaMaestroItinerario").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarItinerario.ListaMaestroItinerario).where("$CodigoItinerario=='" + CodigoItinerario + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarItinerario.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_Itinerario("Editar", objReg, "Actualizar Itinerario");
              }
          }

          AbrirPopup_Itinerario = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "Itinerario/RegistroItinerario",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroItinerario",
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
                      $compile($("#divPopupRegistroItinerario"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroItinerario").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }

          $scope.BuscarNave_Click = function () {
              $rootScope.DatosFormulario.OpcionNave= "ConsultaItinerario";
              getPopupResponsive({
                  formURL: "Nave/BuscarNave",
                  title: "Buscar Nave",
                  nombreDiv: "divPopupBuscarNave",
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
                      $compile($("#divPopupBuscarNave"))($scope);
                  }
              });
          }

          $scope.BuscarAduana_Click = function () {
              $rootScope.DatosFormulario.OpcionAduana = "ConsultaItinerario";
              getPopupResponsive({
                  formURL: "Aduana/BuscarAduana",
                  title: "Buscar Aduana",
                  nombreDiv: "divPopupBuscarAduana",
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
                      $compile($("#divPopupBuscarAduana"))($scope);
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_Itinerario("Nuevo", newItem, "Registrar Itinerario");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }

              if (!validar()) {
                  return false;
              }

              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarItinerario.Filtro)) };
              $scope.gridapigrillaListaMaestroItinerario.find(objRequest);
              $rootScope.DatosFormulario.AdministrarItinerario.ListaMaestroItinerario = [];
              miBlock(false, "html");
          }

          function validar() {
              miBlock(true, "#html");
              var salida = true;

              if ($rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioInicio == undefined) {
                  $(".caja11.msgerror.FechaArriboItinerarioInicio").html("Fecha Arribo Inicial es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioInicio.length <= 0) {
                      $(".caja11.msgerror.FechaArriboItinerarioInicio").html("Fecha Arribo Inicial es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.FechaArriboItinerarioInicio").html("");
                  }
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioFin == undefined) {
                  $(".caja11.msgerror.FechaArriboItinerarioFin").html("Fecha Arribo Final es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioFin.length <= 0) {
                      $(".caja11.msgerror.FechaArriboItinerarioFin").html("Fecha Arribo Final es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.FechaArriboItinerarioFin").html("");
                  }
              }
              return salida;
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }


          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.NumeroViajeItinerario = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.NumeroManifiestoItinerario = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.AnioManifiestoItinerario = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioInicio = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioFin = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Datos.NombreNave = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoNave = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Datos.NombreAduana = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoAduana = "";
              //$rootScope.DatosFormulario.AdministrarItinerario.Datos.NombreTipoOperacion = "";
              //$rootScope.DatosFormulario.AdministrarItinerario.Filtro.CodigoTipoOperacion = "";
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioInicio = $rootScope.DatosFormulario.AdministrarItinerario.Filtro.OriginalFechaInicio;
              $rootScope.DatosFormulario.AdministrarItinerario.Filtro.FechaArriboItinerarioFin = $rootScope.DatosFormulario.AdministrarItinerario.Filtro.OriginalFechaFin;
              $(".caja11.msgerror.FechaArriboItinerarioInicio").html("");
              $(".caja11.msgerror.FechaArriboItinerarioFin").html("");
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