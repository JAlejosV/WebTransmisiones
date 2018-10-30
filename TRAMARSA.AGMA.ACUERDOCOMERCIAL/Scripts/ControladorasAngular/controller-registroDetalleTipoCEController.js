(function () {
    angular.module('api')
    .controller('RegistroDetalleTipoContenedorExternoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno == undefined)
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno = new Object();
              if ($rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos = new Object();

              if ($rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.Datos == undefined)
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.Datos = new Object();

              $scope.FlagMostrarBotonGuardar = true;
              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.EstadoRegistroActivo = "Activo";
              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.EstadoRegistroInactivo = "Inactivo";

              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoClaseContenedor = null;
              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoTipoContenedor = null;
              $scope.CargarDatosIniciales();
              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoTipoContenedorExterno = $scope.row.CodigoTipoContenedorExterno;
              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoLinea = $scope.row.CodigoLinea;
              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.Datos.RequestFiltro = $scope.row.RequestFiltro;
              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoTipoContenedorExternoDetalle = $scope.row.CodigoTipoContenedorExternoDetalle;
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.EstadoRegistro = $scope.row.EstadoRegistro;
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoClaseContenedor = $scope.row.CodigoClaseContenedor;
                  $scope.BuscarTipoContenedor($scope.row.CodigoClaseContenedor, $scope.row.CodigoTipoContenedor);
              } else {
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.Accion = "I";
                  $scope.FlagEditing = false;
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.EstadoRegistroActivo;
              }
          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/DetalleTipoContenedorExterno/DetalleTipoContenedorExternoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.ClaseContenedorList.length > 0) {
                              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.Datos.ClaseContenedorList = data.ClaseContenedorList;
                          }
                      }
                  }
              });
          }

          $scope.BuscarTipoContenedor = function (codigoClaseContenedor, codigoTipoContenedor) {
              if (codigoClaseContenedor == null) {
                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.Datos.TipoContenedorList = [];
                  return false;
              }
              $.ajax({
                  url: "/DetalleTipoContenedorExterno/BuscarTipoContenedor",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoClaseContenedor=" + codigoClaseContenedor,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.TipoContenedorList.length > 0) {
                              $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.Datos.TipoContenedorList = data.TipoContenedorList;
                              if (codigoTipoContenedor != null) {
                                  $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoTipoContenedor = codigoTipoContenedor;
                              }
                          }
                      }
                  }
              });
          }
          function miAlertOkSuccess() {
              var objRequest = $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.Datos.RequestFiltro;
              $scope.gridapigrillaListaMaestroDetalleTipoContenedorExterno.find(objRequest);
              $rootScope.DatosFormulario.BusquedaDetalleTipoContenedorExterno.ListaMaestroDetalleTipoContenedorExterno = [];
              $scope.$parent.SalirPopup_Click();
          }
          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoClaseContenedor == undefined) {
                  $(".caja11.msgerror.CodigoClaseContenedor").html("Clase Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoClaseContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoClaseContenedor").html("Clase Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoClaseContenedor").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoTipoContenedor == undefined) {
                  $(".caja11.msgerror.CodigoTipoContenedor").html("Código Tipo Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos.CodigoTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoContenedor").html("Código Tipo Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoContenedor").html("");
              }
              return salida;
          }
          function realizarTransaccionContenedorExterno() {
              miBlock(true, "#divPopupRegistroDetalleContenedorExterno");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroDetalleTipoContenedorExterno.RegistroDatos };
              $.ajax({
                  url: "/DetalleTipoContenedorExterno/TransaccionDetalleTipoContenedorExterno",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupRegistroDetalleContenedorExterno");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Detalle Tipo Contenedor Externo fue grabado correctamente.", miAlertOkSuccess);
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
                  realizarTransaccionContenedorExterno();
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