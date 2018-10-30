(function () {
    angular.module('api')
    .controller('BuscarPersonaController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined) {
                  $rootScope.DatosFormulario = new Object();
              }
              if ($rootScope.DatosFormulario.RegistroPersona == undefined) {
                  $rootScope.DatosFormulario.RegistroPersona = new Object();
              }


              if ($rootScope.DatosFormulario.RegistroPersona.FlagPersona) {
                  $rootScope.DatosFormulario.RegistroPersona.FlagPersona = false;
              } else {
                  $rootScope.DatosFormulario = new Object();
                  $rootScope.DatosFormulario.BusquedaPersona = new Object();
                  $rootScope.DatosFormulario.BusquedaPersona.Filtro = new Object();
                  $rootScope.DatosFormulario.BusquedaPersona.DatosPersona = new Object();
              }

          });

          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (tipoboton) {
                  case "Editar":
                      eventoclick = "$parent.EditarPersona('" + rowObject.CodigoPersona + "');";
                      break;
              }
              var html = "";
              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              return html;
          }

          $scope.EditarPersona = function (CodigoPersona) {
              $rootScope.DatosFormulario.RegistroPersona = new Object();
              $rootScope.DatosFormulario.RegistroPersona.DatosPersona = new Object();
              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona = new Object();
              $rootScope.DatosFormulario.RegistroPersona.DatosPersona.PersonaFlagEditar = true;
              $rootScope.DatosFormulario.RegistroPersona.DatosPersona.UrlOrigen = "/#!/sistema/busqueda/buscar-persona/";
              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona = CodigoPersona;
              $rootScope.Redirect("/#!/sistema/registro-persona/");
          }

          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }

              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.BusquedaPersona.Filtro };
              $scope.gridapigrillaListaPersona.find(objRequest);
              miBlock(false, "html");

              return false;
          }

          $scope.Nuevo_Click = function () {
              $rootScope.DatosFormulario.RegistroPersona = new Object();
              $rootScope.DatosFormulario.RegistroPersona.DatosPersona = new Object();
              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona = new Object();
              $rootScope.DatosFormulario.RegistroPersona.DatosPersona.PersonaFlagEditar = false;
              $rootScope.DatosFormulario.RegistroPersona.DatosPersona.UrlOrigen = "/#!/sistema/busqueda/buscar-persona/";
              $rootScope.Redirect("/#!/sistema/registro-persona/");
          }

          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.BusquedaPersona.Filtro.CodigoPersona = "";
              $rootScope.DatosFormulario.BusquedaPersona.Filtro.RazonSocialPersona = "";
              $rootScope.DatosFormulario.BusquedaPersona.Filtro.NumeroDocumentoPersona = "";

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