(function () {
    angular.module('api')
    .controller('RegistroTipoMovimientoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoMovimiento == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.CodigoTipoMovimiento = $scope.row.CodigoTipoMovimiento;
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.CodigoTipoMovimientoSunat = $scope.row.CodigoTipoMovimientoSunat;
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.NombreTipoMovimiento = $scope.row.NombreTipoMovimiento;
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.CodigoTipoMovimiento = 0;
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.CodigoTipoMovimientoSunat = "";
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.NombreTipoMovimiento = "";
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarTipoMovimiento() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos };
              $.ajax({
                  url: "/TipoMovimiento/RegistrarTipoMovimiento",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoMovimiento.Filtro;
                  $scope.gridapigrillaListaMaestroTipoMovimiento.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoMovimiento.ListaMaestroTipoMovimiento = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.CodigoTipoMovimientoSunat == undefined) {
                  $(".caja11.msgerror.CodigoTipoMovimientoSunat").html("Codigo Sunat del Tipo de Movimiento es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.CodigoTipoMovimientoSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoMovimientoSunat").html("Codigo Sunat del Tipo de Movimiento es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoMovimientoSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.NombreTipoMovimiento == undefined) {
                  $(".caja11.msgerror.NombreTipoMovimiento").html("Nombre del Tipo de Movimiento es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoMovimiento.RegistroDatos.NombreTipoMovimiento.length <= 0) {
                  $(".caja11.msgerror.NombreTipoMovimiento").html("Nombre del Tipo de Movimiento es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoMovimiento").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoMovimiento();
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