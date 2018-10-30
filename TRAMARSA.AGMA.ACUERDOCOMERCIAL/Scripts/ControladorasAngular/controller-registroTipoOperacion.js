(function () {
    angular.module('api')
    .controller('RegistroTipoOperacionController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoOperacion == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoOperacion = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.CodigoTipoOperacion = $scope.row.CodigoTipoOperacion;
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.CodigoTipoOperacionSunat = $scope.row.CodigoTipoOperacionSunat;
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.NombreTipoOperacion = $scope.row.NombreTipoOperacion;
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.CodigoTipoOperacion = 0;
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.CodigoTipoOperacionSunat = "";
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.NombreTipoOperacion = "";
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.Accion = "I";
              }
          });

          function registrarTipoOperacion() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos };
              $.ajax({
                  url: "/TipoOperacion/RegistrarTipoOperacion",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoOperacion.Filtro;
                  $scope.gridapigrillaListaMaestroTipoOperacion.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoOperacion.ListaMaestroTipoOperacion = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.CodigoTipoOperacionSunat == undefined) {
                  $(".caja11.msgerror.CodigoTipoOperacionSunat").html("Codigo de Tipo de Operacion Sunat es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.CodigoTipoOperacionSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoOperacionSunat").html("Codigo de Tipo de Operacion Sunat es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoOperacionSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.NombreTipoOperacion == undefined) {
                  $(".caja11.msgerror.NombreTipoOperacion").html("Nombre de Tipo de Operacion es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoOperacion.RegistroDatos.NombreTipoOperacion.length <= 0) {
                  $(".caja11.msgerror.NombreTipoOperacion").html("Nombre de Tipo de Operacion es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoOperacion").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoOperacion();
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