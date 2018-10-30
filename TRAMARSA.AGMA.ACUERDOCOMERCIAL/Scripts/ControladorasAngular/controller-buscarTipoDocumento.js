(function () {
    angular.module('api')
    .controller('BuscarTipoDocumentoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionTipoDocumento;

              if (data.CodigoTipoDocumentoSunat == "999") {
                  $('#NumeroDocumentoPersona').prop("disabled", "true");
                  $rootScope.DatosFormulario.FlagDeshabilidadoNumeroDocumentoPersona = true;
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NumeroDocumentoPersona = "";
                  $(".caja11.msgerror.NumeroDocumentoPersona").html("");
              }
              else {
                  $('#NumeroDocumentoPersona').removeAttr("disabled");
                  $rootScope.DatosFormulario.FlagDeshabilidadoNumeroDocumentoPersona = false;
              }

              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoTipoDocumento = data.CodigoTipoDocumento;
              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NombreTipoDocumento = data.NombreTipoDocumento;

              return true;
          }

          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaTipoDocumento").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaTipoDocumento').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento.Filtro.NombreTipoDocumento = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento.Filtro.CodigoTipoDocumentoSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento.Filtro.NombreTipoDocumento = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento.Filtro.CodigoTipoDocumentoSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTipoDocumento");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTipoDocumento.Filtro)) };
              $scope.gridapigrillaListaTipoDocumento.find(objRequest);
              miBlock(false, "#divPopupBuscarTipoDocumento");

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