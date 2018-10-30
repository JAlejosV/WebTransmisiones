(function () {
    angular.module('api')
    .controller('ConsultaMonitorCoparnController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn == undefined)
                  $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn = new Object();
              if ($rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro = new Object();
              if ($rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial == undefined)
                  $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial = new Object();


/*
              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto == undefined)
                  $rootScope.DatosFormulario.AdministrarGrupoPuerto = new Object();
              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarGrupoPuerto.Datos = new Object();

               */   
              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/MonitorCoparn/ConsultarMonitorCoparnIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial.Deposito = data.Deposito;
                          $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial.Estados = data.Estados;
                          
                          /*
                          if (data.Deposito.length > 0) {
                              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.CodigoDeposito = data.Deposito[0].CodigoDeposito;
                          }

                          if (data.Estados.length > 0) {
                              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.CodigoEstado = data.Estados[0].Codigo;
                          }
                          */


                          $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial.FechaInicio=data.FechaDefault;
                          $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.FechaInicio=data.FechaDefault;

                          $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.FechaFin=data.FechaFinDefault;
                          $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial.FechaFin=data.FechaFinDefault;


                          
                      }
                  }
              });
          }
          /*
          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopupGrupoPuertoExterno("Nuevo", newItem, "Registrar Grupo Puerto Externo");
          }
          */
          /*
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
          */

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              /*  
              if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return  false;
              }
              else if ($rootScope.DatosFormulario.AdministrarGrupoPuerto.Filtro.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              }
              else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              */
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro)) };
              $scope.gridapigrillaListaMonitorCoparn.find(objRequest);
              //$rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = [];
              miBlock(false, "html");
          }
          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }
          /*
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
          */
          /*
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
          */
          /*
          AbrirPopupGrupoPuertoExterno = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "es-PE/sistema/maestros/grupo-puerto-externo/nuevo-grupo-puerto/",
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
                  }
              });
          }
          */
          /*
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
          */
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
            
              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.CodigoDeposito = "";
              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.DescripcionDeposito = "";
              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.CodigoEstado = "";
              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.Contenedor = "";

              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.FechaInicio=$rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial.FechaInicio;
              $rootScope.DatosFormulario.FiltrosConsultaMonitorCoparn.Filtro.FechaFin=$rootScope.DatosFormulario.FiltrosConsultaMonitorCoparnCargaInicial.FechaFin;
              
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