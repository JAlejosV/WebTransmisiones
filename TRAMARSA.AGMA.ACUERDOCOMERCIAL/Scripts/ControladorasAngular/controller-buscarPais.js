(function () {
    angular.module('api')
    .controller('BuscarPaisController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaPais == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaPais = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaPais.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaPais.Filtro = new Object();

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
              var opcion = $rootScope.DatosFormulario.OpcionPais;

              if (opcion == "ConsultaPuerto") {
                  $rootScope.DatosFormulario.AdministrarPuerto.Filtro.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarPuerto.Datos.NombrePais = data.NombrePais;
              }
              else if (opcion == "ConsultaNave") {
                  $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarNave.Datos.NombrePais = data.NombrePais;
              }
              else if (opcion == "RegistroPersona") {
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NombrePais = data.NombrePais;
              }
              else if (opcion == "RegistroNave") {
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarNave.RegistroDatos.NombrePais = data.NombrePais;
              }
              else if (opcion == "ConsultaPais") {
                  $rootScope.DatosFormulario.AdministrarNave.Filtro.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarNave.Datos.NombrePais = data.NombrePais;
              }
              else if (opcion == "BuscarPuerto") {
                  $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.FiltrosBusquedaPuerto.Filtro.NombrePais = data.NombrePais;
              }
              else if (opcion == "BuscarNave") {
                  $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.FiltrosBusquedaNave.Filtro.NombrePais = data.NombrePais;
              }
              else {
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.CodigoPais = data.CodigoPais;
                  $rootScope.DatosFormulario.AdministrarPuerto.RegistroDatos.NombrePais = data.NombrePais;
              }
              return true;
          }

          $scope.Seleccionar_Click = function () {
                  var rowKey = jQuery("#grillaListaPais").jqGrid('getGridParam', 'selrow');
                  if (rowKey != undefined) {
                      if (rowKey.length > 0) {
                          var rowObject = jQuery('#grillaListaPais').getRowData(rowKey);
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
              $rootScope.DatosFormulario.FiltrosBusquedaPais.Filtro.NombrePais = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPais.Filtro.CodigoPaisSunat = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaPais.Filtro.NombrePais = null;
              $rootScope.DatosFormulario.FiltrosBusquedaPais.Filtro.CodigoPaisSunat = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarPais");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaPais.Filtro)) };
              $scope.gridapigrillaListaPais.find(objRequest);
              miBlock(false, "#divPopupBuscarPais");

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