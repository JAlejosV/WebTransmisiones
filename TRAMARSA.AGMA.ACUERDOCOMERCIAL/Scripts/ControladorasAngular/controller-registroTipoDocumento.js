(function () {
    angular.module('api')
    .controller('RegistroTipoDocumentoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoDocumento == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoDocumento = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.CodigoTipoDocumento = $scope.row.CodigoTipoDocumento;
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.CodigoTipoDocumentoSunat = $scope.row.CodigoTipoDocumentoSunat;
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.NombreTipoDocumento = $scope.row.NombreTipoDocumento;
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.CodigoTipoDocumento = 0;
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.CodigoTipoDocumentoSunat = "";
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.NombreTipoDocumento = "";
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarTipoDocumento() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos };
              $.ajax({
                  url: "/TipoDocumento/RegistrarTipoDocumento",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoDocumento.Filtro;
                  $scope.gridapigrillaListaMaestroTipoDocumento.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoDocumento.ListaMaestroTipoDocumento = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.CodigoTipoDocumentoSunat == undefined) {
                  $(".caja11.msgerror.CodigoTipoDocumentoSunat").html("Codigo Sunat del Tipo de Documento es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.CodigoTipoDocumentoSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoDocumentoSunat").html("Codigo Sunat del Tipo de Documento es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoDocumentoSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.NombreTipoDocumento == undefined) {
                  $(".caja11.msgerror.NombreTipoDocumento").html("Nombre del Tipo de Documento es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoDocumento.RegistroDatos.NombreTipoDocumento.length <= 0) {
                  $(".caja11.msgerror.NombreTipoDocumento").html("Nombre del Tipo de Documento es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoDocumento").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoDocumento();
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