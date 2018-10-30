(function () {
    angular.module('api')
    .controller('RegistroTipoFleteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoFlete == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoFlete = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoTipoFlete = $scope.row.CodigoTipoFlete;
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.NombreTipoFlete = $scope.row.NombreTipoFlete;
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoAduanaTipoFlete = $scope.row.CodigoAduanaTipoFlete;
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoEquivalencia = $scope.row.CodigoEquivalencia;
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoTipoFlete = 0;
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.NombreTipoFlete = "";
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoAduanaTipoFlete = "";
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoEquivalencia = "";
                  $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.Accion = "I";
              }
          });

          function registrarTipoFlete() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos };
              $.ajax({
                  url: "/TipoFlete/RegistrarTipoFlete",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoFlete.Filtro;
                  $scope.gridapigrillaListaMaestroTipoFlete.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoFlete.ListaMaestroTipoFlete = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.NombreTipoFlete == undefined) {
                  $(".caja11.msgerror.NombreTipoFlete").html("Nombre Tipo de Flete es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.NombreTipoFlete.length <= 0) {
                  $(".caja11.msgerror.NombreTipoFlete").html("Nombre Tipo de Flete es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoFlete").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoAduanaTipoFlete == undefined) {
                  $(".caja11.msgerror.CodigoAduanaTipoFlete").html("Codigo de Aduana es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.NombreTipoFlete.length <= 0) {
                  $(".caja11.msgerror.CodigoAduanaTipoFlete").html("Codigo de Aduana es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoAduanaTipoFlete").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoEquivalencia == undefined) {
                  $(".caja11.msgerror.CodigoEquivalencia").html("Codigo de Equivalencia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoFlete.RegistroDatos.CodigoEquivalencia.length <= 0) {
                  $(".caja11.msgerror.CodigoEquivalencia").html("Codigo de Equivalencia es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoEquivalencia").html("");
              }


              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoFlete();
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