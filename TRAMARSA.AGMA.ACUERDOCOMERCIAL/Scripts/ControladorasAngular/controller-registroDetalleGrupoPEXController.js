(function () {
    angular.module('api')
    .controller('RegistroDetalleGrupoPuertoExternoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno == undefined)
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno = new Object();
              if ($rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos = new Object();
              if ($rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.Datos == undefined)
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.Datos = new Object();

              $scope.FlagMostrarBotonGuardar = true;
              $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.EstadoRegistroActivo = "Activo";
              $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.EstadoRegistroInactivo = "Inactivo";
              $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.CodigoPuerto = null;
              $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.CodigoGrupoPuerto = $scope.row.CodigoGrupoPuerto;
              $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.Datos.RequestFiltro = $scope.row.RequestFiltro;
              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.CodigoGrupoPuertoDetalle = $scope.row.CodigoGrupoPuertoDetalle;
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.CodigoPuerto = $scope.row.CodigoPuerto;
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.EstadoRegistro = $scope.row.EstadoRegistro;
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = true;
              } else {
                  $scope.FlagEditing = false;
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.Accion = "I";
                  $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function miAlertOkSuccess() {
              var objRequest = $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.Datos.RequestFiltro;
              $scope.gridapigrillaListaMaestroDetalleGrupoPuertoExterno.find(objRequest);
              $rootScope.DatosFormulario.BusquedaDetalleGrupoPuertoExterno.ListaMaestroDetalleGrupoPuertoExterno = [];
              $scope.$parent.SalirPopup_Click();
          }
          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.CodigoPuerto == undefined) {
                  $(".caja11.msgerror.CodigoPuerto").html("Código Puerto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.CodigoPuerto.length <= 0) {
                  $(".caja11.msgerror.CodigoPuerto").html("Código Puerto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos.CodigoPuerto.length != 5) {
                  $(".caja11.msgerror.CodigoPuerto").html("Código Puerto debe ser de 5 caracteres.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoPuerto").html("");
              }

              return salida;
          }
          function grabarDetalle() {
              miBlock(true, "#divPopupRegistroDetalleGrupoPuertoExterno");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroDetalleGrupoPuertoExterno.RegistroDatos };
              $.ajax({
                  url: "/DetalleGrupoPuertoExterno/TransaccionDetalleGrupoPuertoExterno",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupRegistroDetalleGrupoPuertoExterno");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Detalle Grupo Puerto Externo fue grabado correctamente.", miAlertOkSuccess);
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

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  grabarDetalle();
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