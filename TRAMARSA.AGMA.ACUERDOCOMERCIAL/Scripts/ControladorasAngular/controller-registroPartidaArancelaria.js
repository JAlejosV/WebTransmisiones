(function () {
    angular.module('api')
    .controller('RegistroPartidaArancelariaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria == undefined)
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria = new Object();
              if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.CodigoPartidaArancelaria = $scope.row.CodigoPartidaArancelaria;
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.DescripcionPartidaArancelaria = $scope.row.DescripcionPartidaArancelaria;
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.IdPartidaArancelaria = $scope.row.IdPartidaArancelaria;
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.Accion = "U";
                  // $rootScope.DatosFormulario.AdministrarTipoContenedor.DatosIndex.RequestFiltro = $scope.row.RequestFiltro;
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.CodigoPartidaArancelaria = "";
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.DescripcionPartidaArancelaria = "";
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.IdPartidaArancelaria = 0;
                  $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.Accion = "I";
                  //$rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.AdministrarTipoContenedor.RegistroDatos.EstadoRegistroActivo;
              }
          });

          function actualizarPartidaArancelaria() {
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos };
              $.ajax({
                  url: "/PartidaArancelaria/ActualizarPartidaArancelaria",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio == true) {

                              if ($scope.$parent.ModoPagina == "Nuevo") {
                                  MiAlertOk("Se ha grabado correctamente la Partida Arancelaria.", MiAlertOk_success);
                              } else {
                                  MiAlertOk("Se ha actualizado correctamente la Partida Arancelaria.", MiAlertOk_success);
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
              //  if ($scope.$parent.ModoPagina == "Editar") {
              var objRequest = $rootScope.DatosFormulario.AdministrarPartidaArancelaria.Filtro;
              $scope.gridapigrillaListaMaestroPartidaArancelaria.find(objRequest);
              $rootScope.DatosFormulario.AdministrarPartidaArancelaria.ListaMaestroPartidaArancelaria = [];
              //   }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.CodigoPartidaArancelaria == undefined) {
                  $(".caja11.msgerror.Codigo").html("Código HS es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.CodigoPartidaArancelaria.length <= 0) {
                  $(".caja11.msgerror.Codigo").html("Código HS es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.Codigo").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.DescripcionPartidaArancelaria == undefined) {
                  $(".caja11.msgerror.Descripcion").html("Descripción HS es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarPartidaArancelaria.RegistroDatos.DescripcionPartidaArancelaria.length <= 0) {
                  $(".caja11.msgerror.Descripcion").html("Descripción HS es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.Descripcion").html("");
              }


              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  actualizarPartidaArancelaria();
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