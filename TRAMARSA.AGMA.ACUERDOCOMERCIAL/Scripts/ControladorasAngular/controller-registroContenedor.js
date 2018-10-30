(function () {
    angular.module('api')
    .controller('RegistroContenedorController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedor == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedor = new Object();
              if ($rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.CodigoContenedor = $scope.row.CodigoContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NumeroContenedor = $scope.row.NumeroContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.TaraContenedor = $scope.row.TaraContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.CodigoTipoContenedor = $scope.row.CodigoTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NombreTipoContenedor = $scope.row.NombreTipoContenedor;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.CodigoContenedor = 0;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NumeroContenedor = "";
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.TaraContenedor = "";
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.CodigoTipoContenedor = 0;
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NombreTipoContenedor = "";
                  $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.Accion = "I";
              }
          });

          function registrarContenedor() {
              $rootScope.DatosFormulario.OpcionContenedor = "RegistrarContenedor";
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos };
              $.ajax({
                  url: "/Contenedor/RegistrarContenedor",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarContenedor.Filtro;
                  $scope.gridapigrillaListaMaestroContenedor.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarContenedor.ListaMaestroContenedor = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NumeroContenedor == undefined) {
                  $(".caja11.msgerror.NumeroContenedor").html("Numero de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NumeroContenedor.length <= 0) {
                  $(".caja11.msgerror.NumeroContenedor").html("Numero de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NumeroContenedor").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.TaraContenedor == undefined) {
                  $(".caja11.msgerror.TaraContenedor").html("Tara de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.TaraContenedor.length <= 0) {
                  $(".caja11.msgerror.TaraContenedor").html("Tara de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.TaraContenedor").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NombreTipoContenedor == undefined) {
                  $(".caja11.msgerror.NombreTipoContenedor").html("Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarContenedor.RegistroDatos.NombreTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.NombreTipoContenedor").html("Tipo de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoContenedor").html("");
              }


              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarContenedor();
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

          $scope.BuscarTipoContenedorRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoContenedor = "RegistroContenedor";
              getPopupResponsive({
                  formURL: "TipoContenedor/BuscarTipoContenedor",
                  title: "Buscar TipoContenedor",
                  nombreDiv: "divPopupBuscarTipoContenedor",
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
                      $compile($("#divPopupBuscarTipoContenedor"))($scope);
                  }
              });
          }
      }]);
})();