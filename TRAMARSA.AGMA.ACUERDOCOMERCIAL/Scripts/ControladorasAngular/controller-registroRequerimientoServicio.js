(function () {
    angular.module('api')
    .controller('RegistroRequerimientoServicioController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio == undefined)
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio = new Object();
              if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.CodigoRequerimientoServicio = $scope.row.CodigoRequerimientoServicio;
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.CodigoRequerimientoServicioSunat = $scope.row.CodigoRequerimientoServicioSunat;
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.NombreRequerimientoServicio = $scope.row.NombreRequerimientoServicio;
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.CodigoRequerimientoServicio = 0;
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.CodigoRequerimientoServicioSunat = "";
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.NombreRequerimientoServicio = "";
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.Accion = "I";
              }
          });

          function registrarRequerimientoServicio() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos };
              $.ajax({
                  url: "/RequerimientoServicio/RegistrarRequerimientoServicio",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarRequerimientoServicio.Filtro;
                  $scope.gridapigrillaListaMaestroRequerimientoServicio.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarRequerimientoServicio.ListaMaestroRequerimientoServicio = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.CodigoRequerimientoServicioSunat == undefined) {
                  $(".caja11.msgerror.CodigoRequerimientoServicioSunat").html("Codigo Sunat de Requerimiento de Servicio es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.CodigoRequerimientoServicioSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoRequerimientoServicioSunat").html("Codigo Sunat de Requerimiento de Servicio es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoRequerimientoServicioSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.NombreRequerimientoServicio == undefined) {
                  $(".caja11.msgerror.NombreRequerimientoServicio").html("Nombre de Requerimiento de Servicio es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarRequerimientoServicio.RegistroDatos.NombreRequerimientoServicio.length <= 0) {
                  $(".caja11.msgerror.NombreRequerimientoServicio").html("Nombre de Requerimiento de Servicioo es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreRequerimientoServicio").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarRequerimientoServicio();
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