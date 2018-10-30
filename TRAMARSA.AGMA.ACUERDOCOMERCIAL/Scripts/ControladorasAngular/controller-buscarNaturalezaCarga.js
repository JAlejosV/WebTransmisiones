(function () {
    angular.module('api')
    .controller('BuscarNaturalezaCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionNaturalezaCarga;

              if (opcion == "RegistrarNaturalezaCarga") {
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNaturalezaCarga = data.CodigoNaturalezaCarga;
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNaturalezaCarga = data.NombreNaturalezaCarga;
              }

              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaNaturalezaCarga").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaNaturalezaCarga').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga.Filtro.NombreNaturalezaCarga = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga.Filtro.CodigoNaturalezaCargaSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga.Filtro.NombreNaturalezaCarga = null;
              $rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga.Filtro.CodigoNaturalezaCargaSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarNaturalezaCarga");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaNaturalezaCarga.Filtro)) };
              $scope.gridapigrillaListaNaturalezaCarga.find(objRequest);
              miBlock(false, "#divPopupBuscarNaturalezaCarga");

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