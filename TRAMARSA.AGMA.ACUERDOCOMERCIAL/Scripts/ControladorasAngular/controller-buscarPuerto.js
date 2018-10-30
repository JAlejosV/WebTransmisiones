(function () {
    angular.module('api')
    .controller('BuscarPuertoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaPuerto == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaPuerto = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro = new Object();

              $rootScope.FlagMostrarBotonSeleccionar = true;
              $scope.Limpiar_Click();
          });

          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
                  var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
                  var estado = ProcesarSeleccionado(data);
                  if (estado) {
                      $rootScope.$apply();
                      $scope.$parent.SalirPopup_Click();
                  }
          }

          function ProcesarSeleccionado(data) {
              var opcion = $rootScope.DatosFormulario.OpcionPuerto;

              if (opcion == "ConsultaPuerto") {
                  $rootScope.DatosFormulario.AdministrarAduana.Filtro.CodigoPuerto = data.CodigoPuerto;
                  $rootScope.DatosFormulario.AdministrarAduana.Datos.NombrePuerto = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoAduana") {
                  $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.CodigoPuerto = data.CodigoPuerto;
                  $rootScope.DatosFormulario.FiltrosBusquedaAduana.Filtro.NombrePuerto = data.NombrePuerto;
              }
              else if (opcion == "RegistroItinerario") {
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoPuertoIntermedio = data.CodigoPuerto;
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombrePuertoIntermedio = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoOrigenDocumento") {
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoOrigenDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoOrigen = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoEmbarqueDocumento") {
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoEmbarqueDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoEmbarque = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoDescargaDocumento") {
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoDescargaDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoDescarga = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoFinalDocumento") {
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.CodigoPuertoFinalDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.BusquedaDocumento.Filtro.NombrePuertoFinal = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoOrigenRegistrarDocumento") {
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoOrigenDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoOrigen = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoEmbarqueRegistrarDocumento") {
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoEmbarqueDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoEmbarque = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoDescargaRegistrarDocumento") {
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoDescargaDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoDescarga = data.NombrePuerto;
              }
              else if (opcion == "BuscarPuertoFinalRegistrarDocumento") {
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.CodigoPuertoFinalDocumento = data.CodigoPuerto;
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento.NombrePuertoFinal = data.NombrePuerto;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.CodigoPuerto = data.CodigoPuerto;
                  $rootScope.DatosFormulario.AdministrarAduana.RegistroDatos.NombrePuerto = data.NombrePuerto;
              }
              return true;
          } 

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaPuerto").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaPuerto').getRowData(rowKey);
                          var estado = ProcesarSeleccionado(rowObject);
                          if (estado) {
                              $scope.$parent.SalirPopup_Click();
                          }
                          $(".caja11.msgerror.Objeto").html("");
                      } else {
                          $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                      }
                  } else {
                      $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                  }
          }
          
          $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.NombrePuerto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.CodigoPuertoSunat = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.CodigoPais = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.NombrePais = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.NombrePuerto = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.CodigoPuertoSunat = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.CodigoPais = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.NombrePais = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarPuerto");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro)) };
              $scope.gridapigrillaListaPuerto.find(objRequest);
              miBlock(false, "#divPopupBuscarPuerto");

          }

          $scope.BuscarPais_Click = function () {
              $rootScope.DatosFormulario.OpcionPais = "BuscarPuerto";
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

          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });

      }]);
})();