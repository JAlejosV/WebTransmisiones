(function () {
    angular.module('api')
    .controller('RegistroTipoNaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoNave == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoNave = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.CodigoTipoNave = $scope.row.CodigoTipoNave;
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.CodigoTipoNaveSunat = $scope.row.CodigoTipoNaveSunat;
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.NombreTipoNave = $scope.row.NombreTipoNave;
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.CodigoTipoNave = 0;
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.CodigoTipoNaveSunat = "";
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.NombreTipoNave = "";
                  $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarTipoNave() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos };
              $.ajax({
                  url: "/TipoNave/RegistrarTipoNave",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoNave.Filtro;
                  $scope.gridapigrillaListaMaestroTipoNave.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoNave.ListaMaestroTipoNave = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.CodigoTipoNaveSunat == undefined) {
                  $(".caja11.msgerror.CodigoTipoNaveSunat").html("Codigo Sunat del Tipo de Nave es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.CodigoTipoNaveSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoNaveSunat").html("Codigo Sunat del Tipo de Nave es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoNaveSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.NombreTipoNave == undefined) {
                  $(".caja11.msgerror.NombreTipoNave").html("Nombre del Tipo de Nave es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoNave.RegistroDatos.NombreTipoNave.length <= 0) {
                  $(".caja11.msgerror.NombreTipoNave").html("Nombre del Tipo de Nave es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoNave").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoNave();
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