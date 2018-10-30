(function () {
    angular.module('api')
    .controller('RegistroTipoLugarCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.CodigoTipoLugarCarga = $scope.row.CodigoTipoLugarCarga;
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.CodigoTipoLugarCargaSunat = $scope.row.CodigoTipoLugarCargaSunat;
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.NombreTipoLugarCarga = $scope.row.NombreTipoLugarCarga;
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.CodigoTipoLugarCarga = 0;
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.CodigoTipoLugarCargaSunat = "";
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.NombreTipoLugarCarga = "";
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarTipoLugarCarga() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos };
              $.ajax({
                  url: "/TipoLugarCarga/RegistrarTipoLugarCarga",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoLugarCarga.Filtro;
                  $scope.gridapigrillaListaMaestroTipoLugarCarga.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoLugarCarga.ListaMaestroTipoLugarCarga = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.CodigoTipoLugarCargaSunat == undefined) {
                  $(".caja11.msgerror.CodigoTipoLugarCargaSunat").html("Codigo Sunat del Tipo Lugar Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.CodigoTipoLugarCargaSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoLugarCargaSunat").html("Codigo Sunat del Tipo Lugar Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoLugarCargaSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.NombreTipoLugarCarga == undefined) {
                  $(".caja11.msgerror.NombreTipoLugarCarga").html("Nombre del Tipo Lugar Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoLugarCarga.RegistroDatos.NombreTipoLugarCarga.length <= 0) {
                  $(".caja11.msgerror.NombreTipoLugarCarga").html("Nombre del Tipo Lugar Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoLugarCarga").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoLugarCarga();
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