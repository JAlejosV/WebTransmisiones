(function () {
    angular.module('api')
    .controller('RegistroTipoBLController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoBL == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoBL = new Object();
              if ($rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.CodigoTipoBL = $scope.row.CodigoTipoBL;
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.CodigoTipoBLSunat = $scope.row.CodigoTipoBLSunat;
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.NombreTipoBL = $scope.row.NombreTipoBL;
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.CodigoTipoBL = 0;
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.CodigoTipoBLSunat = "";
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.NombreTipoBL = "";
                  $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarTipoBL() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos };
              $.ajax({
                  url: "/TipoBL/RegistrarTipoBL",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarTipoBL.Filtro;
                  $scope.gridapigrillaListaMaestroTipoBL.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarTipoBL.ListaMaestroTipoBL = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.CodigoTipoBLSunat == undefined) {
                  $(".caja11.msgerror.CodigoTipoBLSunat").html("Codigo Sunat del Tipo de BL es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.CodigoTipoBLSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoBLSunat").html("Codigo Sunat del Tipo de BL es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoBLSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.NombreTipoBL == undefined) {
                  $(".caja11.msgerror.NombreTipoBL").html("Nombre del Tipo de BL es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarTipoBL.RegistroDatos.NombreTipoBL.length <= 0) {
                  $(".caja11.msgerror.NombreTipoBL").html("Nombre del Tipo de BL es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoBL").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarTipoBL();
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