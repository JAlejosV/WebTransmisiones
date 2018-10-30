(function () {
    angular.module('api')
    .controller('RegistroCondicionTransporteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte = new Object();
              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoCondicionTransporte = $scope.row.CodigoCondicionTransporte;
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoCondicionTransporteSunat = $scope.row.CodigoCondicionTransporteSunat;
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.NombreCondicionTransporte = $scope.row.NombreCondicionTransporte;
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoAduanaCondicionTransporte = $scope.row.CodigoAduanaCondicionTransporte;
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoCondicionTransporte = 0;
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoCondicionTransporteSunat = "";
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.NombreCondicionTransporte = "";
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoAduanaCondicionTransporte = "";
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarCondicionTransporte() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos };
              $.ajax({
                  url: "/CondicionTransporte/RegistrarCondicionTransporte",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarCondicionTransporte.Filtro;
                  $scope.gridapigrillaListaMaestroCondicionTransporte.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarCondicionTransporte.ListaMaestroCondicionTransporte = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoCondicionTransporteSunat == undefined) {
                  $(".caja11.msgerror.CodigoCondicionTransporteSunat").html("Codigo Sunat de Condicion de Transporte es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoCondicionTransporteSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoCondicionTransporteSunat").html("Codigo Sunat de Condicion de Transporte es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoCondicionTransporteSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.NombreCondicionTransporte == undefined) {
                  $(".caja11.msgerror.NombreCondicionTransporte").html("Nombre de Condicion de Transporte es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.NombreCondicionTransporte.length <= 0) {
                  $(".caja11.msgerror.NombreCondicionTransporte").html("Nombre de Condicion de Transporte es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreCondicionTransporte").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoAduanaCondicionTransporte == undefined) {
                  $(".caja11.msgerror.CodigoAduanaCondicionTransporte").html("Codigo Aduana de Condicion de Transporte es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCondicionTransporte.RegistroDatos.CodigoAduanaCondicionTransporte.length <= 0) {
                  $(".caja11.msgerror.CodigoAduanaCondicionTransporte").html("Codigo Aduana de Condicion de Transporte es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoAduanaCondicionTransporte").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarCondicionTransporte();
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