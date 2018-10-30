(function () {
    angular.module('api')
    .controller('RegistroNaturalezaCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga == undefined)
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga = new Object();
              if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.CodigoNaturalezaCarga = $scope.row.CodigoNaturalezaCarga;
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.CodigoNaturalezaCargaSunat = $scope.row.CodigoNaturalezaCargaSunat;
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.NombreNaturalezaCarga = $scope.row.NombreNaturalezaCarga;
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.CodigoNaturalezaCarga = 0;
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.CodigoNaturalezaCargaSunat = "";
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.NombreNaturalezaCarga = "";
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarNaturalezaCarga() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos };
              $.ajax({
                  url: "/NaturalezaCarga/RegistrarNaturalezaCarga",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarNaturalezaCarga.Filtro;
                  $scope.gridapigrillaListaMaestroNaturalezaCarga.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarNaturalezaCarga.ListaMaestroNaturalezaCarga = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.CodigoNaturalezaCargaSunat == undefined) {
                  $(".caja11.msgerror.CodigoNaturalezaCargaSunat").html("Codigo Sunat de la Naturaleza de Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.CodigoNaturalezaCargaSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoNaturalezaCargaSunat").html("Codigo Sunat de la Naturaleza de Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoNaturalezaCargaSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.NombreNaturalezaCarga == undefined) {
                  $(".caja11.msgerror.NombreNaturalezaCarga").html("Nombre de Naturaleza de Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNaturalezaCarga.RegistroDatos.NombreNaturalezaCarga.length <= 0) {
                  $(".caja11.msgerror.NombreNaturalezaCarga").html("Nombre de Naturaleza de Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreNaturalezaCarga").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarNaturalezaCarga();
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