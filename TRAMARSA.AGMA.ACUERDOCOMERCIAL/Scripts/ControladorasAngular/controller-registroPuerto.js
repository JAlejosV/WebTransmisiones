(function () {
    angular.module('api')
    .controller('RegistroPuertoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPuerto == undefined)
                  $rootScope.DatosFormulario.AdministrarPuerto = new Object();
              if ($rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPuerto = $scope.row.CodigoPuerto;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPuertoSunat = $scope.row.CodigoPuertoSunat;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePuerto = $scope.row.NombrePuerto;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPais = $scope.row.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePais = $scope.row.NombrePais;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPuerto = 0;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPuertoSunat = "";
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePuerto = "";
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPais = 0;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePais = "";
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.Accion = "I";
              }
          });

          function registrarPuerto() {
              $rootScope.DatosFormulario.OpcionPuerto = "RegistrarPuerto";
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos };
              $.ajax({
                  url: "/Puerto/RegistrarPuerto",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarPuerto.Filtro;
                  $scope.gridapigrillaListaMaestroPuerto.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarPuerto.ListaMaestroPuerto = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPuertoSunat == undefined) {
                  $(".caja11.msgerror.CodigoPuertoSunat").html("Codigo Sunat es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPuertoSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoPuertoSunat").html("Codigo Sunat es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoPuertoSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePuerto == undefined) {
                  $(".caja11.msgerror.NombrePuerto").html("Nombre del Puerto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePuerto.length <= 0) {
                  $(".caja11.msgerror.NombrePuerto").html("Nombre del Puerto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombrePuerto").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePais == undefined) {
                  $(".caja11.msgerror.NombrePais").html("Pais es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePais.length <= 0) {
                  $(".caja11.msgerror.NombrePais").html("Pais es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombrePais").html("");
              }


              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarPuerto();
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

          $scope.BuscarPaisRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionPais = "RegistroPuerto";
              getPopupResponsive({
                  formURL: "Pais/BuscarPais",
                  title: "Buscar Pais",
                  nombreDiv: "divPopupBuscarPais",
                  nombreGrid: "",
                  width: "1200px",
                  height: 800,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarPais"))($scope);
                  }
              });
          }
      }]);
})();