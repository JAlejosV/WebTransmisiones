(function () {
    angular.module('api')
    .controller('RegistroTemperaturaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTemperatura == undefined)
                  $rootScope.DatosFormulario.AdministrarTemperatura = new Object();
              if ($rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.CodigoTemperatura = $scope.row.CodigoTemperatura;
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.CodigoTemperaturaSunat = $scope.row.CodigoTemperaturaSunat;
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.NombreTemperatura = $scope.row.NombreTemperatura;
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.CodigoTemperatura = 0;
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.CodigoTemperaturaSunat = "";
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.NombreTemperatura = "";
                  $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarTemperatura() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos };
              $.ajax({
                  url: "/Temperatura/RegistrarTemperatura",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTemperatura.Filtro;
                  $scope.gridapigrillaListaMaestroTemperatura.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTemperatura.ListaMaestroTemperatura = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.CodigoTemperaturaSunat == undefined) {
                  $(".caja11.msgerror.CodigoTemperaturaSunat").html("Codigo Sunat de Temperatura es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.CodigoTemperaturaSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTemperaturaSunat").html("Codigo Sunat de Temperatura es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTemperaturaSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.NombreTemperatura == undefined) {
                  $(".caja11.msgerror.NombreTemperatura").html("Nombre de Temperatura es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTemperatura.RegistroDatos.NombreTemperatura.length <= 0) {
                  $(".caja11.msgerror.NombreTemperatura").html("Nombre de Temperatura es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTemperatura").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTemperatura();
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