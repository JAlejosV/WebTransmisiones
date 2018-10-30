(function () {
    angular.module('api')
    .controller('RegistroLineaNavieraController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarLineaNaviera == undefined)
                  $rootScope.DatosFormulario.AdministrarLineaNaviera = new Object();
              if ($rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.CodigoLineaNaviera = $scope.row.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.NombreLineaNaviera = $scope.row.NombreLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.DireccionLineaNaviera = $scope.row.DireccionLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.RucLineaNaviera = $scope.row.RucLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.CodigoEquivalencia = $scope.row.CodigoEquivalencia;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.CodigoLineaNaviera = 0;
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.NombreLineaNaviera = "";
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.DireccionLineaNaviera = "";
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.RucLineaNaviera = "";
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.CodigoEquivalencia = "";
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function registrarLineaNaviera() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos };
              $.ajax({
                  url: "/LineaNaviera/RegistrarLineaNaviera",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarLineaNaviera.Filtro;
                  $scope.gridapigrillaListaMaestroLineaNaviera.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarLineaNaviera.ListaMaestroLineaNaviera = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              
              if ($rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.NombreLineaNaviera == undefined) {
                  $(".caja11.msgerror.NombreLineaNaviera").html("Nombre de Linea Naviera es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarLineaNaviera.RegistroDatos.NombreLineaNaviera.length <= 0) {
                  $(".caja11.msgerror.NombreLineaNaviera").html("Nombre de Linea Naviera es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreLineaNaviera").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarLineaNaviera();
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