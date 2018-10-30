(function () {
    angular.module('api')
    .controller('ConsultaDepositoDefaultController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.FiltrosConsultaDepositoDefault == undefined)
                  $rootScope.DatosFormulario.FiltrosConsultaDepositoDefault = new Object();
              if ($rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro = new Object();
              if ($rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial == undefined)
                  $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial = new Object();

              if ($rootScope.DatosFormulario.AdministrarDepositoDefault == undefined)
                  $rootScope.DatosFormulario.AdministrarDepositoDefault = new Object();                

              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/DepositoDefault/ConsultarDepositoDefaultIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "HLL",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          //$rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.TipoContenedor = data.TipoContenedor;
                          $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.Deposito = data.Deposito;
                          $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.Lineas = data.Lineas;
                          $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.Estados = data.Estados;
                          $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.Sucursal = data.Sucursal;
                      }
                  }
              });
          }

          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopupDepositoDefault("Nuevo", newItem, "Registrar Deposito Default");
          }
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaDepositoDefault":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarDepositoDefault('" + rowObject.Id + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarGrupoPuertoExterno('" + rowObject.Id + "');";
                                  break;
                              case "VerDetalle":
                                  eventoclick = "$parent.VerDetalleGrupoPuertoExterno('" + rowObject.Id + "');";
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
              //$rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro.CodigoLinea="HLL";  
              
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro)) };
              $scope.gridapigrillaListaDepositoDefault.find(objRequest);
              //$rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = [];
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
          $scope.EditarDepositoDefault = function (Id) {
             // if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno.length <= 0) {
                  $rootScope.DatosFormulario.AdministrarDepositoDefault.ListaDepositoDefault = jQuery("#grillaListaDepositoDefault").jqGrid('getRowData');
              //}
              var objReg = $from($rootScope.DatosFormulario.AdministrarDepositoDefault.ListaDepositoDefault).where("$Id=='" + Id + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopupDepositoDefault("Editar", objReg, "Actualizar Deposito Default");
              }
          }
          AbrirPopupDepositoDefault = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "DepositoDefault/RegistrarDepositoDefault",
                  title: titlepop,
                  nombreDiv: "divPopupNuevoDepositoDefault",
                  nombreGrid: "",
                  width: "780px",
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
                      $compile($("#divPopupNuevoDepositoDefault"))($scope);
                      var scopePopup = angular.element("#divPopupNuevoDepositoDefault").scope();
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
                      formURL: "es-PE/sistema/maestros/grupo-puerto-externo/detalle-grupo-puerto-externo/",
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
              //$rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro.CodigoDeposito = "";
              //$rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro.CodigoTipoContenedor = "";
              $rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro=[];
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
           $scope.ChangeLineaNaviera = function (codigoLinea) {
              if (codigoLinea != undefined) {
                  $.ajax({
                      url: "/TipoContenedor/ListarTipoContenedorByLinea",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "codigoLinea=" + codigoLinea,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          if (data.ListaTipoContenedor.length > 0) {
                              //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = data.ListaTipoContenedor;
                              $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.TipoContenedor = data.ListaTipoContenedor;
                          } else {
                              //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = [];
                              $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.TipoContenedor = [];
                          }
                      }
                  });
              } else {
                  $rootScope.DatosFormulario.FiltrosConsultaDepositoDefaultCargaInicial.TipoContenedor = [];
              }
          }


          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });

      }]);
})();