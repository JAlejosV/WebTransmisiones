(function () {
    angular.module('api')
    .controller('RegistroViaTransporteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarViaTransporte == undefined)
                  $rootScope.DatosFormulario.AdministrarViaTransporte = new Object();
              if ($rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.CodigoViaTransporte = $scope.row.CodigoViaTransporte;
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.CodigoViaTransporteSunat = $scope.row.CodigoViaTransporteSunat;
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.NombreViaTransporte = $scope.row.NombreViaTransporte;
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.CodigoViaTransporte = 0;
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.CodigoViaTransporteSunat = "";
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.NombreViaTransporte = "";
                  $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.Accion = "I";
              }
          });

          function registrarViaTransporte() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos };
              $.ajax({
                  url: "/ViaTransporte/RegistrarViaTransporte",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarViaTransporte.Filtro;
                  $scope.gridapigrillaListaMaestroViaTransporte.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarViaTransporte.ListaMaestroViaTransporte = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.CodigoViaTransporteSunat == undefined) {
                  $(".caja11.msgerror.CodigoViaTransporteSunat").html("Codigo Via Transporte Sunat es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.CodigoViaTransporteSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoViaTransporteSunat").html("Codigo Via Transporte Sunat es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoViaTransporteSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.NombreViaTransporte == undefined) {
                  $(".caja11.msgerror.NombreViaTransporte").html("Nombre de Via de Transporte es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarViaTransporte.RegistroDatos.NombreViaTransporte.length <= 0) {
                  $(".caja11.msgerror.NombreViaTransporte").html("Nombre de Via de Transporte es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreViaTransporte").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarViaTransporte();
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