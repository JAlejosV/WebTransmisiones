(function () {
    angular.module('api')
    .controller('RegistroNumeroIMOController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarNumeroIMO == undefined)
                  $rootScope.DatosFormulario.AdministrarNumeroIMO = new Object();
              if ($rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.CodigoNumeroIMO = $scope.row.CodigoNumeroIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NumberIMO = $scope.row.NumberIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreNumeroIMO = $scope.row.NombreNumeroIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.PaginaNumeroIMO = $scope.row.PaginaNumeroIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.CodigoClaseIMO = $scope.row.CodigoClaseIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreClaseIMO = $scope.row.NombreClaseIMO;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.CodigoNumeroIMO = 0;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NumberIMO = "";
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreNumeroIMO = "";
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.PaginaNumeroIMO = "";
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.CodigoClaseIMO = 0;
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreClaseIMO = "";
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.Accion = "I";
              }
          });

          function registrarNumeroIMO() {
              $rootScope.DatosFormulario.OpcionNumeroIMO = "Registrar Numero IMO";
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos };
              $.ajax({
                  url: "/NumeroIMO/RegistrarNumeroIMO",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarNumeroIMO.Filtro;
                  $scope.gridapigrillaListaMaestroNumeroIMO.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarNumeroIMO.ListaMaestroNumeroIMO = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;

              if ($rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreNumeroIMO == undefined) {
                  $(".caja11.msgerror.NombreNumeroIMO").html("Nombre Numero IMO es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreNumeroIMO.length <= 0) {
                  $(".caja11.msgerror.NombreNumeroIMO").html("Nombre Numero IMO es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreNumeroIMO").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NumberIMO == undefined) {
                  $(".caja11.msgerror.NumberIMO").html("Numero IMO es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NumberIMO.length <= 0) {
                  $(".caja11.msgerror.NumberIMO").html("Numero IMO es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NumberIMO").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreClaseIMO == undefined) {
                  $(".caja11.msgerror.NombreClaseIMO").html("Clase IMO es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNumeroIMO.RegistroDatos.NombreClaseIMO.length <= 0) {
                  $(".caja11.msgerror.NombreClaseIMO").html("Clase IMO es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreClaseIMO").html("");
              }


              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarNumeroIMO();
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

          $scope.BuscarClaseIMORegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionClaseIMO = "RegistroNumeroIMO";
              getPopupResponsive({
                  formURL: "ClaseIMO/BuscarClaseIMO",
                  title: "Buscar ClaseIMO",
                  nombreDiv: "divPopupBuscarClaseIMO",
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
                      $compile($("#divPopupBuscarClaseIMO"))($scope);
                  }
              });
          }
      }]);
})();