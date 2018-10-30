(function () {
    angular.module('api')
    .controller('AdministrarNuevoGrupoPuertoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno == undefined)
                  $rootScope.DatosFormulario.RegistroGrupoPuertoExterno = new Object();
              if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos = new Object();
              if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno.Datos == undefined)
                  $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.Datos = new Object();
              $scope.FlagMostrarBotonGuardar = true;
              $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.EstadoRegistroActivo = "Activo";
              $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.EstadoRegistroInactivo = "Inactivo";
              $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.NombreGrupoPuerto = null;
              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/GrupoPuertoExterno/GrabarGrupoPuertoExternoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.Datos.Lineas = data.Lineas;
                          if (data.Lineas.length > 0) {
                              $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.CodigoLinea = data.Lineas[0].Codigo;
                              if (data.Lineas.length == 1) {
                                  $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.Datos.Habilitado = 'False';
                              }
                          }
                      }
                      if ($scope.$parent.ModoPagina == "Editar") {
                          $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.CodigoGrupoPuerto = $scope.row.CodigoGrupoPuerto;
                          $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.NombreGrupoPuerto = $scope.row.NombreGrupoPuerto;
                          $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.EstadoRegistro = $scope.row.EstadoRegistro;
                          $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.CodigoLinea = $scope.row.CodigoLinea;
                          $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.Datos.RequestFiltro = $scope.row.RequestFiltro;
                          $scope.FlagEditing = true;
                      } else {
                          $scope.FlagEditing = false;
                          $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.EstadoRegistroActivo;
                      }
                  }
              });
          }
          function miAlertOkSuccess() {
              if ($scope.$parent.ModoPagina == "Editar") {
                  var objRequest = $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.Datos.RequestFiltro;
                  $scope.gridapigrillaMaestroGrupoPuertoExterno.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = [];
              }
              $scope.$parent.SalirPopup_Click();
          }
          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.NombreGrupoPuerto == undefined) {
                  $(".caja11.msgerror.NombreGrupoPuerto").html("Nombre Grupo Puerto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.NombreGrupoPuerto.length <= 0) {
                  $(".caja11.msgerror.NombreGrupoPuerto").html("Nombre Grupo Puerto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.NombreGrupoPuerto.length > 100) {
                  $(".caja11.msgerror.NombreGrupoPuerto").html("Nombre Grupo Puerto no debe superar 100 caracteres.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreGrupoPuerto").html("");
              }
              if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              return salida;
          }
          function registrarGrupoPuertoExterno() {
              miBlock(true, "#divPopupNuevoGrupoPuerto");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos };
              $.ajax({
                  url: "/GrupoPuertoExterno/AgregarGrupoPuertoExterno",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupNuevoGrupoPuerto");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Grupo Puerto Externo fue registrado correctamente.", miAlertOkSuccess);
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
          function actualizarGrupoPuertoExterno() {
              miBlock(true, "#divPopupNuevoGrupoPuerto");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroGrupoPuertoExterno.RegistroDatos };
              $.ajax({
                  url: "/GrupoPuertoExterno/ActualizarGrupoPuertoExterno",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupNuevoGrupoPuerto");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Grupo Puerto Externo fue actualizado correctamente.", miAlertOkSuccess);
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
                      actualizarGrupoPuertoExterno();
                  } else {
                      registrarGrupoPuertoExterno();
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