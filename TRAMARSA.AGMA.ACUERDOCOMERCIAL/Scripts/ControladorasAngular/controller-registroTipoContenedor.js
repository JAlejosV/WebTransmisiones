(function () {
    angular.module('api')
    .controller('RegistroTipoContenedorController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoContenedor == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoContenedor = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoTipoContenedor = $scope.row.CodigoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoTipoContenedor = $scope.row.CodigoIsoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoGrupoTipoContenedor = $scope.row.CodigoIsoGrupoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.NombreTipoContenedor = $scope.row.NombreTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoAduanaTipoContenedor = $scope.row.CodigoAduanaTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodTipoContenedor = $scope.row.CodTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.TamanioTipoContenedor = $scope.row.TamanioTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.IsoTipoContenedor = $scope.row.IsoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoTipoContenedor = 0;
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoGrupoTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.NombreTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoAduanaTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.TamanioTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.IsoTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.Accion = "I";
              }
          });

          function registrarTipoContenedor() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos };
              $.ajax({
                  url: "/TipoContenedor/RegistrarTipoContenedor",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoContenedor.Filtro;
                  $scope.gridapigrillaListaMaestroTipoContenedor.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoContenedor.ListaMaestroTipoContenedor = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoTipoContenedor == undefined) {
                  $(".caja11.msgerror.CodigoIsoTipoContenedor").html("Codigo Iso del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoIsoTipoContenedor").html("Codigo Iso del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoIsoTipoContenedor").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoGrupoTipoContenedor == undefined) {
                  $(".caja11.msgerror.CodigoIsoGrupoTipoContenedor").html("Codigo Iso Grupo del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoIsoGrupoTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoIsoGrupoTipoContenedor").html("Codigo Iso Grupo del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoIsoGrupoTipoContenedor").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.NombreTipoContenedor == undefined) {
                  $(".caja11.msgerror.NombreTipoContenedor").html("Nombre del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.NombreTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.NombreTipoContenedor").html("Nombre del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoContenedor").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoAduanaTipoContenedor == undefined) {
                  $(".caja11.msgerror.CodigoAduanaTipoContenedor").html("Codigo Aduana del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodigoAduanaTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoAduanaTipoContenedor").html("Codigo Aduana del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoAduanaTipoContenedor").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodTipoContenedor == undefined) {
                  $(".caja11.msgerror.CodTipoContenedor").html("Codigo del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.CodTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodTipoContenedor").html("Codigo del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodTipoContenedor").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.TamanioTipoContenedor == undefined) {
                  $(".caja11.msgerror.TamanioTipoContenedor").html("Tamaño del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.TamanioTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.TamanioTipoContenedor").html("Tamaño del Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.TamanioTipoContenedor").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoContenedor();
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