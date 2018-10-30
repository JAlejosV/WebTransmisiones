(function () {
    angular.module('api')
    .controller('RegistroAduanaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarAduana == undefined)
                  $rootScope.DatosFormulario.AdministrarAduana = new Object();
              if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoAduana = $scope.row.CodigoAduana;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoAduanaSunat = $scope.row.CodigoAduanaSunat;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreAduana = $scope.row.NombreAduana;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoPuerto = $scope.row.CodigoPuerto;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombrePuerto = $scope.row.NombrePuerto;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoViaTransporte = $scope.row.CodigoViaTransporte;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreViaTransporte = $scope.row.NombreViaTransporte;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoAduana = 0;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoAduanaSunat = "";
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreAduana = "";
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoPuerto = 0;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombrePuerto = "";
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoViaTransporte = 0;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreViaTransporte = "";
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.Accion = "I";
              }
          });

          function registrarAduana() {
              $rootScope.DatosFormulario.OpcionLineaNaviera = "RegistrarAduana";
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos };
              $.ajax({
                  url: "/Aduana/RegistrarAduana",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarAduana.Filtro;
                  $scope.gridapigrillaListaMaestroAduana.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarAduana.ListaMaestroAduana = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoAduanaSunat == undefined) {
                  $(".caja11.msgerror.CodigoAduanaSunat").html("Codigo Aduana Sunat es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoAduanaSunat.length <= 0) {
                  $(".caja11.msgerror.CodigoAduanaSunat").html("Codigo Aduana Sunat es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoAduanaSunat").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreAduana == undefined) {
                  $(".caja11.msgerror.NombreAduana").html("Nombre de Aduana es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreAduana.length <= 0) {
                  $(".caja11.msgerror.NombreAduana").html("Nombre de Aduana es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreAduana").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombrePuerto == undefined) {
                  $(".caja11.msgerror.NombrePuerto").html("Puerto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombrePuerto.length <= 0) {
                  $(".caja11.msgerror.NombrePuerto").html("Puerto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombrePuerto").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreViaTransporte == undefined) {
                  $(".caja11.msgerror.NombreViaTransporte").html("Via de Transporte es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombreViaTransporte.length <= 0) {
                  $(".caja11.msgerror.NombreViaTransporte").html("Via de Transporte es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreViaTransporte").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarAduana();
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

          $scope.BuscarPuertoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "RegistroAduana";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto",
                  nombreDiv: "divPopupBuscarPuerto",
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
                      $compile($("#divPopupBuscarPuerto"))($scope);
                  }
              });
          }

          $scope.BuscarViaTransporteRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionViaTransporte = "RegistroAduana";
              getPopupResponsive({
                  formURL: "ViaTransporte/BuscarViaTransporte",
                  title: "Buscar ViaTransporte",
                  nombreDiv: "divPopupBuscarViaTransporte",
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
                      $compile($("#divPopupBuscarViaTransporte"))($scope);
                  }
              });
          }
      }]);
})();