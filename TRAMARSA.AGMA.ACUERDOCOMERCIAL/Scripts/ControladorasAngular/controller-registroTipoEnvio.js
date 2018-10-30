(function () {
    angular.module('api')
    .controller('RegistroTipoEnvioController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoEnvio == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoEnvio = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.CodigoTipoEnvio = $scope.row.CodigoTipoEnvio;
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.CodigoTipoEnvioSunat = $scope.row.CodigoTipoEnvioSunat;
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.NombreTipoEnvio = $scope.row.NombreTipoEnvio;
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.CodigoTipoEnvio = 0;
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.CodigoTipoEnvioSunat = "";
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.NombreTipoEnvio = "";
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.Accion = "I";
              }
          });

          function registrarTipoEnvio() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos };
              $.ajax({
                  url: "/TipoEnvio/RegistrarTipoEnvio",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio == true) {

                              if (data.CodigoMensaje == 1) {
                                  MiAlertOk(data.Mensaje, MiAlertOk_success);
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
          }

          function MiAlertOk_success() {
              if ($scope.$parent.ModoPagina == "Editar") {
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoEnvio.Filtro;
                  $scope.gridapigrillaListaMaestroTipoEnvio.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoEnvio.ListaMaestroTipoEnvio = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.CodigoTipoEnvioSunat == undefined) {
                  $(".caja11.msgerror.CodigoTipoEnvioSunat").html("Codigo Sunat del Tipo de Envio es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.CodigoTipoEnvioSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoEnvioSunat").html("Codigo Sunat del Tipo de Envio es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoEnvioSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.NombreTipoEnvio == undefined) {
                  $(".caja11.msgerror.NombreTipoEnvio").html("Nombre del Tipo  de Envio es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoEnvio.RegistroDatos.NombreTipoEnvio.length <= 0) {
                  $(".caja11.msgerror.NombreTipoEnvio").html("Nombre del Tipo de Envio es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoEnvio").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoEnvio();
              }
          }

          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
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