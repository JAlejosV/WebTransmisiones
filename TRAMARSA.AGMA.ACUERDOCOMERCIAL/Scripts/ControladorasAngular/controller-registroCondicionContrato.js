(function () {
    angular.module('api')
    .controller('RegistroCondicionContratoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionContrato == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionContrato = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.CodigoCondicionContrato = $scope.row.CodigoCondicionContrato;
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.CodigoCondicionContratoSunat = $scope.row.CodigoCondicionContratoSunat;
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.NombreCondicionContrato = $scope.row.NombreCondicionContrato;
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.CodigoCondicionContrato = 0;
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.CodigoCondicionContratoSunat = "";
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.NombreCondicionContrato = "";
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.Accion = "I";
              }
          });

          function registrarCondicionContrato() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos };
              $.ajax({
                  url: "/CondicionContrato/RegistrarCondicionContrato",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarCondicionContrato.Filtro;
                  $scope.gridapigrillaListaMaestroCondicionContrato.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarCondicionContrato.ListaMaestroCondicionContrato = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.CodigoCondicionContratoSunat == undefined) {
                  $(".caja11.msgerror.CodigoCondicionContratoSunat").html("Codigo Sunat de la Condicion deContrato es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.CodigoCondicionContratoSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoCondicionContratoSunat").html("Codigo Sunat de la Condicion de Contrato es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoCondicionContratoSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.NombreCondicionContrato == undefined) {
                  $(".caja11.msgerror.NombreCondicionContrato").html("Nombre de la Condicion de Contrato es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionContrato.RegistroDatos.NombreCondicionContrato.length <= 0) {
                  $(".caja11.msgerror.NombreCondicionContrato").html("Nombre de la Condicion de Contrato es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreCondicionContrato").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarCondicionContrato();
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