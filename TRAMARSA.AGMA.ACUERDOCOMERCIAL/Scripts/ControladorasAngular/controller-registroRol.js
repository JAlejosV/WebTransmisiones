(function () {
    angular.module('api')
    .controller('RegistroRolController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarRol == undefined)
                  $rootScope.DatosFormulario.AdministrarRol = new Object();
              if ($rootScope.DatosFormulario.AdministrarRol.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.CodigoRol = $scope.row.CodigoRol;
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.CodigoRolSunat = $scope.row.CodigoRolSunat;
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.NombreRol = $scope.row.NombreRol;
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.CodigoRol = 0;
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.CodigoRolSunat = "";
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.NombreRol = "";
                  $rootScope.DatosFormulario.AdministrarRol.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarRol() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarRol.RegistroDatos };
              $.ajax({
                  url: "/Rol/RegistrarRol",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarRol.Filtro;
                  $scope.gridapigrillaListaMaestroRol.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarRol.ListaMaestroRol = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarRol.RegistroDatos.CodigoRolSunat == undefined) {
                  $(".caja11.msgerror.CodigoRolSunat").html("Codigo Sunat de Rol es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarRol.RegistroDatos.CodigoRolSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoRolSunat").html("Codigo Sunat de Rol es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoRolSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarRol.RegistroDatos.NombreRol == undefined) {
                  $(".caja11.msgerror.NombreRol").html("Nombre del Rol es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarRol.RegistroDatos.NombreRol.length <= 0) {
                  $(".caja11.msgerror.NombreRol").html("Nombre del Rol es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreRol").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarRol();
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