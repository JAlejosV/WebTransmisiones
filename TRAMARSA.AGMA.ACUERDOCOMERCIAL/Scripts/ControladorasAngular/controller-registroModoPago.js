(function () {
    angular.module('api')
    .controller('RegistroModoPagoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarModoPago == undefined)
                  $rootScope.DatosFormulario.AdministrarModoPago = new Object();
              if ($rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoModoPago = $scope.row.CodigoModoPago;
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoModoPagoSunat = $scope.row.CodigoModoPagoSunat;
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.NombreModoPago = $scope.row.NombreModoPago;
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoEquivalencia = $scope.row.CodigoEquivalencia;
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoModoPago = 0;
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoModoPagoSunat = "";
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.NombreModoPago = "";
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoEquivalencia = "";
                  $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.Accion = "I";
              }
          });

          function registrarModoPago() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos };
              $.ajax({
                  url: "/ModoPago/RegistrarModoPago",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarModoPago.Filtro;
                  $scope.gridapigrillaListaMaestroModoPago.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarModoPago.ListaMaestroModoPago = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoModoPagoSunat == undefined) {
                  $(".caja11.msgerror.CodigoModoPagoSunat").html("Codigo del Modo de Pago Sunat es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.CodigoModoPagoSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoModoPagoSunat").html("Codigo del Modo de Pago Sunat es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoModoPagoSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.NombreModoPago == undefined) {
                  $(".caja11.msgerror.NombreModoPago").html("Nombre del Modo de Pago es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarModoPago.RegistroDatos.NombreModoPago.length <= 0) {
                  $(".caja11.msgerror.NombreModoPago").html("Nombre del Modo de Pago es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreModoPago").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarModoPago();
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