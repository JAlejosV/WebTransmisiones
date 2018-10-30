(function () {
    angular.module('api')
    .controller('RegistroTipoContenedorExternoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroContenedorExterno == undefined)
                  $rootScope.DatosFormulario.RegistroContenedorExterno = new Object();
              if ($rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos = new Object();

              if ($rootScope.DatosFormulario.RegistroContenedorExterno.Datos == undefined)
                  $rootScope.DatosFormulario.RegistroContenedorExterno.Datos = new Object();
              $scope.FlagMostrarBotonGuardar = true;
              $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.EstadoRegistroActivo = "Activo";
              $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.EstadoRegistroInactivo = "Inactivo";
              $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoEquivalencia = null;
              $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoTipoContenedorExterno = null;

              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/TipoContenedorExterno/RegistroTipoContenedorExternoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.RegistroContenedorExterno.Datos.Lineas = data.Lineas;
                          if (data.Lineas.length > 0) {
                              $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoLinea = data.Lineas[0].Codigo;
                              if (data.Lineas.length == 1) {
                                  $rootScope.DatosFormulario.RegistroContenedorExterno.Datos.Habilitado = 'False';
                              }
                          }
                      }
                      if ($scope.$parent.ModoPagina == "Editar") {
                          $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoTipoContenedorExterno = $scope.row.CodigoTipoContenedorExterno;
                          $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoEquivalencia = $scope.row.CodigoEquivalencia;
                          $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.EstadoRegistro = $scope.row.EstadoRegistro;
                          $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoLinea = $scope.row.CodigoLinea;
                          $rootScope.DatosFormulario.RegistroContenedorExterno.Datos.RequestFiltro = $scope.row.RequestFiltro;
                          $scope.FlagEditing = false;
                      } else {
                          $scope.FlagEditing = true;
                          $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.EstadoRegistroActivo;
                      }
                  }
              });
          }

          function miAlertOkSuccess() {
              if ($scope.$parent.ModoPagina == "Editar") {
                  var objRequest = $rootScope.DatosFormulario.RegistroContenedorExterno.Datos.RequestFiltro;
                  $scope.gridapigrillaListaMaestroTipoContenedorExterno.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarContenedorExterno.ListaMaestroContenedorExterno = [];
              }
              $scope.$parent.SalirPopup_Click();
          }
          function validarDatos() {
              var salida = true;

              if ($rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoEquivalencia == undefined) {
                  $(".caja11.msgerror.CodigoEquivalencia").html("Código Equivalencia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoEquivalencia.length <= 0) {
                  $(".caja11.msgerror.CodigoEquivalencia").html("Código Equivalencia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos.CodigoEquivalencia.length >100) {
                  $(".caja11.msgerror.CodigoEquivalencia").html("Código Equivalencia supera 100 caracteres.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoEquivalencia").html("");
              }
              return salida;
          }
          function registrarContenedorExterno() {
              miBlock(true, "#divPopupRegistroPesoVariable");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos };
              $.ajax({
                  url: "/TipoContenedorExterno/RegistrarTipoContenedorExterno",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupRegistroPesoVariable");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Tipo Contenedor Externo fue registrado correctamente.", miAlertOkSuccess);
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
          function actualizarContenedorExterno() {
              miBlock(true, "#divPopupRegistroPesoVariable");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroContenedorExterno.RegistroDatos };
              $.ajax({
                  url: "/TipoContenedorExterno/ActualizarTipoContenedorExterno",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupRegistroPesoVariable");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El El Tipo Contenedor Externo fue actualizado correctamente.", miAlertOkSuccess);
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
                  if ($scope.$parent.ModoPagina == "Editar") {
                      actualizarContenedorExterno();
                  } else {
                      registrarContenedorExterno();
                  }
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