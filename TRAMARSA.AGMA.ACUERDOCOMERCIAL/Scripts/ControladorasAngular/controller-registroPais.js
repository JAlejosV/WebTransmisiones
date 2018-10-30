(function () {
    angular.module('api')
    .controller('RegistroPaisController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPais == undefined)
                  $rootScope.DatosFormulario.AdministrarPais = new Object();
              if ($rootScope.DatosFormulario.AdministrarPais.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoPais = $scope.row.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoPaisSunat = $scope.row.CodigoPaisSunat;
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.NombrePais = $scope.row.NombrePais;
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoAlfaPais = $scope.row.CodigoAlfaPais;
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoPais = 0;
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoPaisSunat = "";
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.NombrePais = "";
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoAlfaPais = "";
                  $rootScope.DatosFormulario.AdministrarPais.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarPais() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPais.RegistroDatos };
              $.ajax({
                  url: "/Pais/RegistrarPais",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarPais.Filtro;
                  $scope.gridapigrillaListaMaestroPais.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarPais.ListaMaestroPais = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoPaisSunat == undefined) {
                  $(".caja11.msgerror.CodigoPaisSunat").html("Codigo Sunat es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoPaisSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoPaisSunat").html("Codigo Sunat es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoPaisSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarPais.RegistroDatos.NombrePais == undefined) {
                  $(".caja11.msgerror.NombrePais").html("Nombre del Pais es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPais.RegistroDatos.NombrePais.length <= 0) {
                  $(".caja11.msgerror.NombrePais").html("Nombre del Pais es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombrePais").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoAlfaPais == undefined) {
                  $(".caja11.msgerror.CodigoAlfaPais").html("Codigo Alfa es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPais.RegistroDatos.CodigoAlfaPais.length <= 0) {
                  $(".caja11.msgerror.CodigoAlfaPais").html("Codigo Alfa es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoAlfaPais").html("");
              }


              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarPais();
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