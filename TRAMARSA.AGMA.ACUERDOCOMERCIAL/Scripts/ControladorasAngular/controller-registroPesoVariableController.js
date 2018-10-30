(function () {
    angular.module('api')
    .controller('RegistroPesoVariableController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroPesoVariable == undefined)
                  $rootScope.DatosFormulario.RegistroPesoVariable = new Object();
              if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos = new Object();
              if ($rootScope.DatosFormulario.RegistroPesoVariable.Datos == undefined)
                  $rootScope.DatosFormulario.RegistroPesoVariable.Datos = new Object();

              $scope.FlagMostrarBotonGuardar = true;
              $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.EstadoRegistroActivo = "Activo";
              $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.EstadoRegistroInactivo = "Inactivo";
              $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.Descripcion = null;
              $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.PesoVariable = null;
              $scope.CargarDatosIniciales();
              
          });

          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/PesoVariable/RegistroPesoVariableIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.RegistroPesoVariable.Datos.Lineas = data.Lineas;
                      if (data.Lineas.length > 0) {
                          $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.CodigoLinea = data.Lineas[0].Codigo;
                          if (data.Lineas.length == 1) {
                              $rootScope.DatosFormulario.RegistroPesoVariable.Datos.Habilitado = 'False';
                          }
                      }
                      if ($scope.$parent.ModoPagina == "Editar") {
                          $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.CodigoVariable = $scope.row.CodigoVariable;
                          $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.PesoVariable = '' + $scope.row.PesoVariable + '';
                          $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.Descripcion = $scope.row.Descripcion;
                          $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.EstadoRegistro = $scope.row.EstadoRegistro;
                          $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.CodigoLinea = $scope.row.CodigoLinea;
                          $rootScope.DatosFormulario.RegistroPesoVariable.Datos.RequestFiltro = $scope.row.RequestFiltro;
                          $scope.FlagEditing = false;
                      } else {
                          $scope.FlagEditing = false;
                          $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.EstadoRegistroActivo;
                      }
                  }
              });
          }

          function miAlertOkSuccess() {
              if ($scope.$parent.ModoPagina == "Editar") {
                  var objRequest = $rootScope.DatosFormulario.RegistroPesoVariable.Datos.RequestFiltro;
                  $scope.gridapigrillaListaMaestroPesoVariable.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarPesoVariable.ListaMaestroPesoVariable = [];
              }
              $scope.$parent.SalirPopup_Click();
          }
          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.PesoVariable == undefined) {
                  $(".caja11.msgerror.PesoVariable").html("Peso Variable es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.PesoVariable.length <= 0) {
                  $(".caja11.msgerror.PesoVariable").html("Peso Variable es requerido.");
                  salida = false;
              }
              else if (parseInt($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.PesoVariable) > 999) {
                  $(".caja11.msgerror.PesoVariable").html("Valor de Peso Variable no debe ser mayor que 999.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.PesoVariable").html("");
              }

              if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.Descripcion == undefined) {
                  $(".caja11.msgerror.Descripcion").html("Descripción es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.Descripcion.length <= 0) {
                  $(".caja11.msgerror.Descripcion").html("Descripción es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.Descripcion.length > 100) {
                  $(".caja11.msgerror.Descripcion").html("Descripción supera 100 caracteres.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.Descripcion").html("");
              }

              if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              return salida;
          }
          function registrarPesoVariable() {
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos };
              $.ajax({
                  url: "/PesoVariable/RegistrarPesoVariable",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      //   miBlock(false, "#divPopupRegistroPesoVariable");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Peso Variable fue registrado correctamente.", miAlertOkSuccess);
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
          function actualizarPesoVariable() {
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroPesoVariable.RegistroDatos };
              $.ajax({
                  url: "/PesoVariable/ActualizarPesoVariable",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      //   miBlock(false, "#divPopupRegistroPesoVariable");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Peso Variable fue actualizado correctamente.", miAlertOkSuccess);
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
                      actualizarPesoVariable();
                  } else {
                      registrarPesoVariable();
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