(function () {
    angular.module('api')
    .controller('RegistroMedioTransporteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarMedioTransporte == undefined)
                  $rootScope.DatosFormulario.AdministrarMedioTransporte = new Object();
              if ($rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.CodigoMedioTransporte = $scope.row.CodigoMedioTransporte;
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.CodigoMedioTransporteSunat = $scope.row.CodigoMedioTransporteSunat;
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.NombreMedioTransporte = $scope.row.NombreMedioTransporte;
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.CodigoMedioTransporte = 0;
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.CodigoMedioTransporteSunat = "";
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.NombreMedioTransporte = "";
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.Accion = "I";
              }
          });

          function registrarMedioTransporte() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos };
              $.ajax({
                  url: "/MedioTransporte/RegistrarMedioTransporte",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarMedioTransporte.Filtro;
                  $scope.gridapigrillaListaMaestroMedioTransporte.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarMedioTransporte.ListaMaestroMedioTransporte = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.CodigoMedioTransporteSunat == undefined) {
                  $(".caja11.msgerror.CodigoMedioTransporteSunat").html("Codigo de Medio de Transporte Sunat es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.CodigoMedioTransporteSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoMedioTransporteSunat").html("Codigo de Medio de Transporte Sunat es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoMedioTransporteSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.NombreMedioTransporte == undefined) {
                  $(".caja11.msgerror.NombreMedioTransporte").html("Nombre de Medio de Transporte es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarMedioTransporte.RegistroDatos.NombreMedioTransporte.length <= 0) {
                  $(".caja11.msgerror.NombreMedioTransporte").html("Nombre de Medio de Transporte es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreMedioTransporte").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarMedioTransporte();
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