(function () {
    angular.module('api')
    .controller('RegistroUnidadMercanciaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia == undefined)
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia = new Object();
              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoUnidadMercancia = $scope.row.CodigoUnidadMercancia;
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoUnidadMercanciaSunat = $scope.row.CodigoUnidadMercanciaSunat;
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.NombreUnidadMercancia = $scope.row.NombreUnidadMercancia;
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoAduanaUnidadMercancia = $scope.row.CodigoAduanaUnidadMercancia;
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoUnidadMercancia = 0;
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoUnidadMercanciaSunat = "";
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.NombreUnidadMercancia = "";
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoAduanaUnidadMercancia = "";
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarUnidadMercancia() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos };
              $.ajax({
                  url: "/UnidadMercancia/RegistrarUnidadMercancia",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarUnidadMercancia.Filtro;
                  $scope.gridapigrillaListaMaestroUnidadMercancia.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarUnidadMercancia.ListaMaestroUnidadMercancia = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoUnidadMercanciaSunat == undefined) {
                  $(".caja11.msgerror.CodigoUnidadMercanciaSunat").html("Codigo Sunat de Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoUnidadMercanciaSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoUnidadMercanciaSunat").html("Codigo Sunat de Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoUnidadMercanciaSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.NombreUnidadMercancia == undefined) {
                  $(".caja11.msgerror.NombreUnidadMercancia").html("Nombre de Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.NombreUnidadMercancia.length <= 0) {
                  $(".caja11.msgerror.NombreUnidadMercancia").html("Nombre de Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreUnidadMercancia").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoAduanaUnidadMercancia == undefined) {
                  $(".caja11.msgerror.CodigoAduanaUnidadMercancia").html("Codigo Aduana de Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarUnidadMercancia.RegistroDatos.CodigoAduanaUnidadMercancia.length <= 0) {
                  $(".caja11.msgerror.CodigoAduanaUnidadMercancia").html("Codigo Aduana de Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoAduanaUnidadMercancia").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarUnidadMercancia();
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