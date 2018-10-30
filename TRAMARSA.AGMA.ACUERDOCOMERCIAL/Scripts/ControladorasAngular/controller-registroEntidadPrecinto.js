(function () {
    angular.module('api')
    .controller('RegistroEntidadPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto == undefined)
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto = new Object();
              if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.CodigoEntidadPrecinto = $scope.row.CodigoEntidadPrecinto;
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.CodigoEntidadPrecintoSunat = $scope.row.CodigoEntidadPrecintoSunat;
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.NombreEntidadPrecinto = $scope.row.NombreEntidadPrecinto;
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.CodigoEntidadPrecinto = 0;
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.CodigoEntidadPrecintoSunat = "";
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.NombreEntidadPrecinto = "";
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.Accion = "I";
              }
          });

          function registrarEntidadPrecinto() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos };
              $.ajax({
                  url: "/EntidadPrecinto/RegistrarEntidadPrecinto",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarEntidadPrecinto.Filtro;
                  $scope.gridapigrillaListaMaestroEntidadPrecinto.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarEntidadPrecinto.ListaMaestroEntidadPrecinto = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.CodigoEntidadPrecintoSunat == undefined) {
                  $(".caja11.msgerror.CodigoEntidadPrecintoSunat").html("Codigo Sunat de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.CodigoEntidadPrecintoSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoEntidadPrecintoSunat").html("Codigo Sunat de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoEntidadPrecintoSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.NombreEntidadPrecinto == undefined) {
                  $(".caja11.msgerror.NombreEntidadPrecinto").html("Nombre de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarEntidadPrecinto.RegistroDatos.NombreEntidadPrecinto.length <= 0) {
                  $(".caja11.msgerror.NombreEntidadPrecinto").html("Nombre de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreEntidadPrecinto").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarEntidadPrecinto();
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