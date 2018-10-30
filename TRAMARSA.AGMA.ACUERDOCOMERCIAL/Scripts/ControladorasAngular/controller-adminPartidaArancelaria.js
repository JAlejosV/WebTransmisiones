(function () {
    angular.module('api')
    .controller('AdministrarPartidaArancelariaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria == undefined)
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria = new Object();
              if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Datos = new Object();

              $rootScope.DatosFormulario.AdministrarPartidaArancelaria.ListaMaestroPartidaArancelaria = [];
              //DatosFormulario.AdministrarPartidaArancelaria.Filtro.CodigoPartidaArancelaria
              //DatosFormulario.AdministrarPartidaArancelaria.Filtro.Nombre
          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroPartidaArancelaria":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarPartidaArancelaria('" + rowObject.IdPartidaArancelaria + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarPartidaArancelaria('" + rowObject.IdPartidaArancelaria + "');";
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


          $scope.EliminarPartidaArancelaria = function (IdPartidaArancelaria) {
              MiConfirm("¿Está seguro de eliminar el Partida Arancelaria?.", function () {

                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Datos.IdPartidaArancelaria = IdPartidaArancelaria;
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Datos.Accion = "D";
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Datos };
                  miBlock(true, "#html");
                  $.ajax({
                      url: "/PartidaArancelaria/ActualizarPartidaArancelaria",
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
                                  MiAlertOk("Se ha eliminado correctamente la Partida Arancelaria.", miAlertOkSuccess);
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

          $scope.EditarPartidaArancelaria = function (IdPartidaArancelaria) {
              $rootScope.DatosFormulario.AdministrarPartidaArancelaria.ListaMaestroPartidaArancelaria = jQuery("#grillaListaMaestroPartidaArancelaria").jqGrid('getRowData');
              var objReg = $from($rootScope.DatosFormulario.AdministrarPartidaArancelaria.ListaMaestroPartidaArancelaria).where("$IdPartidaArancelaria=='" + IdPartidaArancelaria + "'").firstOrDefault();
              if (objReg != undefined) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPartidaArancelaria.Filtro)) };
                  objReg.RequestFiltro = objRequest;
                  AbrirPopup_PartidaArancelaria("Editar", objReg, "Actualizar Partida Arancelaria");
              }
          }

          AbrirPopup_PartidaArancelaria = function (tipo, objReg, titlepop) {
              getPopupResponsive({
                  formURL: "PartidaArancelaria/RegistroPartidaArancelaria",
                  title: titlepop,
                  nombreDiv: "divPopupRegistroPartidaArancelaria",
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
                      $compile($("#divPopupRegistroPartidaArancelaria"))($scope);
                      var scopePopup = angular.element("#divPopupRegistroPartidaArancelaria").scope();
                      scopePopup.row = JSON.parse(JSON.stringify(objReg));
                      scopePopup.rowOk = objReg;
                      scopePopup.ModoPagina = tipo;
                  }
              });
          }



          $scope.Nuevo_Click = function () {
              var newItem = new Object();
              AbrirPopup_PartidaArancelaria("Nuevo", newItem, "Registrar Partida Arancelaria");
          }

          function miAlertOkSuccess() {
              $scope.Buscar_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarPartidaArancelaria.Filtro)) };
              $scope.gridapigrillaListaMaestroPartidaArancelaria.find(objRequest);
              $rootScope.DatosFormulario.AdministrarPartidaArancelaria.ListaMaestroPartidaArancelaria = [];
              miBlock(false, "html");
          }


          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }

          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Filtro.CodigoPartidaArancelaria = "";
              $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Filtro.Nombre = "";
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