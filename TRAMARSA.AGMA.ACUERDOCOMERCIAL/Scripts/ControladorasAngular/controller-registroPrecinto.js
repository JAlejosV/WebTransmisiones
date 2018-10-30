(function () {
    angular.module('api')
    .controller('RegistroPrecintoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPrecinto == undefined)
                  $rootScope.DatosFormulario.AdministrarPrecinto = new Object();
              if ($rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoPrecinto = $scope.row.CodigoPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NumeroPrecinto = $scope.row.NumeroPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoCondicionPrecinto = $scope.row.CodigoCondicionPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreCondicionPrecinto = $scope.row.NombreCondicionPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoEntidadPrecinto = $scope.row.CodigoEntidadPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreEntidadPrecinto = $scope.row.NombreEntidadPrecinto;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoPrecinto = 0;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NumeroPrecinto = "";
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoCondicionPrecinto = 0;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreCondicionPrecinto = "";
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.CodigoEntidadPrecinto = 0;
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreEntidadPrecinto = "";
                  $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.Accion = "I";
              }
          });

          function registrarPrecinto() {
              $rootScope.DatosFormulario.OpcionPrecinto = "RegistrarPrecinto";
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos };
              $.ajax({
                  url: "/Precinto/RegistrarPrecinto",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarPrecinto.Filtro;
                  $scope.gridapigrillaListaMaestroPrecinto.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarPrecinto.ListaMaestroPrecinto = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;

              if ($rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NumeroPrecinto == undefined) {
                  $(".caja11.msgerror.NumeroPrecinto").html("Numero de Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NumeroPrecinto.length <= 0) {
                  $(".caja11.msgerror.NumeroPrecinto").html("Numero de Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NumeroPrecinto").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreCondicionPrecinto == undefined) {
                  $(".caja11.msgerror.NombreCondicionPrecinto").html("Condicion de Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreCondicionPrecinto.length <= 0) {
                  $(".caja11.msgerror.NombreCondicionPrecinto").html("Condicion de Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreCondicionPrecinto").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreEntidadPrecinto == undefined) {
                  $(".caja11.msgerror.NombreEntidadPrecinto").html("Entidad de Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPrecinto.RegistroDatos.NombreEntidadPrecinto.length <= 0) {
                  $(".caja11.msgerror.NombreEntidadPrecinto").html("Entidad de Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreEntidadPrecinto").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarPrecinto();
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

          $scope.BuscarCondicionPrecintoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionCondicionPrecinto = "RegistroPrecinto";
              getPopupResponsive({
                  formURL: "CondicionPrecinto/BuscarCondicionPrecinto",
                  title: "Buscar CondicionPrecinto",
                  nombreDiv: "divPopupBuscarCondicionPrecinto",
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
                      $compile($("#divPopupBuscarCondicionPrecinto"))($scope);
                  }
              });
          }

          $scope.BuscarEntidadPrecintoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionEntidadPrecinto = "RegistroPrecinto";
              getPopupResponsive({
                  formURL: "EntidadPrecinto/BuscarEntidadPrecinto",
                  title: "Buscar EntidadPrecinto",
                  nombreDiv: "divPopupBuscarEntidadPrecinto",
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
                      $compile($("#divPopupBuscarEntidadPrecinto"))($scope);
                  }
              });
          }
      }]);
})();