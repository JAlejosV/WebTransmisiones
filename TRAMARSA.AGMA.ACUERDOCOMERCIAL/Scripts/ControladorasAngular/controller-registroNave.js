(function () {
    angular.module('api')
    .controller('RegistroNaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarNave == undefined)
                  $rootScope.DatosFormulario.AdministrarNave = new Object();
              if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              if ($scope.$parent.ModoPagina == "Editar") {
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoNave = $scope.row.CodigoNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreNave = $scope.row.NombreNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoTipoNave = $scope.row.CodigoTipoNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreTipoNave = $scope.row.NombreTipoNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoPais = $scope.row.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombrePais = $scope.row.NombrePais;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoLineaNaviera = $scope.row.CodigoLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreLineaNaviera = $scope.row.NombreLineaNaviera;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.MatriculaNave = $scope.row.MatriculaNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.TrbNave = $scope.row.TrbNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.TrnNave = $scope.row.TrnNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.EsloraNave = $scope.row.EsloraNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.MangaNave = $scope.row.MangaNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CaladoNave = $scope.row.CaladoNave;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.Accion = "U";
                  $scope.FlagEditing = false;
              } else {
                  $scope.FlagEditing = true;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoNave = 0;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoTipoNave = 0;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreTipoNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoPais = 0;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombrePais = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoLineaNaviera = 0;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreLineaNaviera = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.MatriculaNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.TrbNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.TrnNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.EsloraNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.MangaNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CaladoNave = "";
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.Accion = "I";
              }
          });

          function registrarNave() {
              $rootScope.DatosFormulario.OpcionLineaNaviera = "RegistrarNave";
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarNave.RegistroDatos };
              $.ajax({
                  url: "/Nave/RegistrarNave",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarNave.Filtro;
                  $scope.gridapigrillaListaMaestroNave.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarNave.ListaMaestroNave = [];
              }
                  $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreNave == undefined) {
                  $(".caja11.msgerror.NombreNave").html("Nombre de Nave es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreNave.length <= 0) {
                  $(".caja11.msgerror.NombreNave").html("Nombre de Nave es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreNave").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombrePais == undefined) {
                  $(".caja11.msgerror.NombrePais").html("Pais es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombrePais.length <= 0) {
                  $(".caja11.msgerror.NombrePais").html("Pais es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombrePais").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreTipoNave == undefined) {
                  $(".caja11.msgerror.NombreTipoNave").html("Tipo de Nave es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreTipoNave.length <= 0) {
                  $(".caja11.msgerror.NombreTipoNave").html("Tipo de Nave es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoNave").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreLineaNaviera == undefined) {
                  $(".caja11.msgerror.NombreLineaNaviera").html("Linea Naviera es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombreLineaNaviera.length <= 0) {
                  $(".caja11.msgerror.NombreLineaNaviera").html("Linea Naviera es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreLineaNaviera").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.MatriculaNave == undefined) {
                  $(".caja11.msgerror.MatriculaNave").html("Matricula es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarNave.RegistroDatos.MatriculaNave.length <= 0) {
                  $(".caja11.msgerror.MatriculaNave").html("Matricula es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.MatriculaNave").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarNave();
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

          $scope.BuscarPaisRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionPais = "RegistroNave";
              getPopupResponsive({
                  formURL: "Pais/BuscarPais",
                  title: "Buscar Pais",
                  nombreDiv: "divPopupBuscarPais",
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
                      $compile($("#divPopupBuscarPais"))($scope);
                  }
              });
          }

          $scope.BuscarTipoNaveRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoNave = "RegistroNave";
              getPopupResponsive({
                  formURL: "TipoNave/BuscarTipoNave",
                  title: "Buscar TipoNave",
                  nombreDiv: "divPopupBuscarTipoNave",
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
                      $compile($("#divPopupBuscarTipoNave"))($scope);
                  }
              });
          }

          $scope.BuscarLineaNavieraRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionLineaNaviera = "RegistroNave";
              getPopupResponsive({
                  formURL: "LineaNaviera/BuscarLineaNaviera",
                  title: "Buscar LineaNaviera",
                  nombreDiv: "divPopupBuscarLineaNaviera",
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
                      $compile($("#divPopupBuscarLineaNaviera"))($scope);
                  }
              });
          }
      }]);
})();