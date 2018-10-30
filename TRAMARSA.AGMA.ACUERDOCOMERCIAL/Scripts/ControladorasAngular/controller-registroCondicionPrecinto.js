(function () {
    angular.module('api')
    .controller('RegistroCondicionPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.CodigoCondicionPrecinto = $scope.row.CodigoCondicionPrecinto;
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.CodigoCondicionPrecintoSunat = $scope.row.CodigoCondicionPrecintoSunat;
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.NombreCondicionPrecinto = $scope.row.NombreCondicionPrecinto;
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.CodigoCondicionPrecinto = 0;
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.CodigoCondicionPrecintoSunat = "";
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.NombreCondicionPrecinto = "";
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarCondicionPrecinto() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos };
              $.ajax({
                  url: "/CondicionPrecinto/RegistrarCondicionPrecinto",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarCondicionPrecinto.Filtro;
                  $scope.gridapigrillaListaMaestroCondicionPrecinto.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarCondicionPrecinto.ListaMaestroCondicionPrecinto = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.CodigoCondicionPrecintoSunat == undefined) {
                  $(".caja11.msgerror.CodigoCondicionPrecintoSunat").html("Codigo Sunat de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.CodigoCondicionPrecintoSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoCondicionPrecintoSunat").html("Codigo Sunat de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoCondicionPrecintoSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.NombreCondicionPrecinto == undefined) {
                  $(".caja11.msgerror.NombreCondicionPrecinto").html("Nombre de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionPrecinto.RegistroDatos.NombreCondicionPrecinto.length <= 0) {
                  $(".caja11.msgerror.NombreCondicionPrecinto").html("Nombre de Condicion de Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreCondicionPrecinto").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarCondicionPrecinto();
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