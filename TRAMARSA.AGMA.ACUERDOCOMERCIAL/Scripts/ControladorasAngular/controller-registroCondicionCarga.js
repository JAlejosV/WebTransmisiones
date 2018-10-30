(function () {
    angular.module('api')
    .controller('RegistroCondicionCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionCarga == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionCarga = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.CodigoCondicionCarga = $scope.row.CodigoCondicionCarga;
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.CodigoCondicionCargaSunat = $scope.row.CodigoCondicionCargaSunat;
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.NombreCondicionCarga = $scope.row.NombreCondicionCarga;
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.CodigoCondicionCarga = 0;
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.CodigoCondicionCargaSunat = "";
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.NombreCondicionCarga = "";
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarCondicionCarga() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos };
              $.ajax({
                  url: "/CondicionCarga/RegistrarCondicionCarga",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarCondicionCarga.Filtro;
                  $scope.gridapigrillaListaMaestroCondicionCarga.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarCondicionCarga.ListaMaestroCondicionCarga = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.CodigoCondicionCargaSunat == undefined) {
                  $(".caja11.msgerror.CodigoCondicionCargaSunat").html("Codigo Sunat de la Condicion de Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.CodigoCondicionCargaSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoCondicionCargaSunat").html("Codigo Sunat de la Condicion de Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoCondicionCargaSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.NombreCondicionCarga == undefined) {
                  $(".caja11.msgerror.NombreCondicionCarga").html("Nombre de Condicion de Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionCarga.RegistroDatos.NombreCondicionCarga.length <= 0) {
                  $(".caja11.msgerror.NombreCondicionCarga").html("Nombre de Condicion de Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreCondicionCarga").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarCondicionCarga();
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