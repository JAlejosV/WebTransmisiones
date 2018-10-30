(function () {
    angular.module('api')
    .controller('RegistroClaseIMOController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarClaseIMO == undefined)
                  $rootScope.DatosFormulario.AdministrarClaseIMO = new Object();
              if ($rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.CodigoClaseIMO = $scope.row.CodigoClaseIMO;
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.CodigoClaseIMOSunat = $scope.row.CodigoClaseIMOSunat;
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.NombreClaseIMO = $scope.row.NombreClaseIMO;
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.CodigoClaseIMO = 0;
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.CodigoClaseIMOSunat = "";
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.NombreClaseIMO = "";
                  $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarClaseIMO() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos };
              $.ajax({
                  url: "/ClaseIMO/RegistrarClaseIMO",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarClaseIMO.Filtro;
                  $scope.gridapigrillaListaMaestroClaseIMO.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarClaseIMO.ListaMaestroClaseIMO = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.CodigoClaseIMOSunat == undefined) {
                  $(".caja11.msgerror.CodigoClaseIMOSunat").html("Codigo Sunat de la Clase IMO es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.CodigoClaseIMOSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoClaseIMOSunat").html("Codigo Sunat de la Clase IMO es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoClaseIMOSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.NombreClaseIMO == undefined) {
                  $(".caja11.msgerror.NombreClaseIMO").html("Nombre de la Clase IMO es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarClaseIMO.RegistroDatos.NombreClaseIMO.length <= 0) {
                  $(".caja11.msgerror.NombreClaseIMO").html("Nombre de la Clase IMO es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreClaseIMO").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarClaseIMO();
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