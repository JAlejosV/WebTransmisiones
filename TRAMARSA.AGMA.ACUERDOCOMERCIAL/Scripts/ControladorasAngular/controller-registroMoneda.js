(function () {
    angular.module('api')
    .controller('RegistroMonedaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarMoneda == undefined)
                  $rootScope.DatosFormulario.AdministrarMoneda = new Object();
              if ($rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.CodigoMoneda = $scope.row.CodigoMoneda;
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.CodigoMonedaSunat = $scope.row.CodigoMonedaSunat;
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.NombreMoneda = $scope.row.NombreMoneda;
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.CodigoMoneda = 0;
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.CodigoMonedaSunat = "";
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.NombreMoneda = "";
                  $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarMoneda() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos };
              $.ajax({
                  url: "/Moneda/RegistrarMoneda",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarMoneda.Filtro;
                  $scope.gridapigrillaListaMaestroMoneda.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarMoneda.ListaMaestroMoneda = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.CodigoMonedaSunat == undefined) {
                  $(".caja11.msgerror.CodigoMonedaSunat").html("Codigo Sunat de la Moneda es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.CodigoMonedaSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoMonedaSunat").html("Codigo Sunat de la Moneda es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoMonedaSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.NombreMoneda == undefined) {
                  $(".caja11.msgerror.NombreMoneda").html("Nombre del Moneda es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarMoneda.RegistroDatos.NombreMoneda.length <= 0) {
                  $(".caja11.msgerror.NombreMoneda").html("Nombre del Moneda es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreMoneda").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarMoneda();
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