(function () {
    angular.module('api')
    .controller('AdministrarConfiguracionLineaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea == undefined)
                  $rootScope.DatosFormulario.AdministrarConfiguracionLinea = new Object();
              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro == undefined)
                  $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro = new Object();
              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos == undefined)
                  $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos = new Object();
              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro == undefined)
                  $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro = new Object();

              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaMaestroConfiguracionLinea = [];

              $scope.CargarDatosIniciales();

              //   if (true) {


              //  $scope.Buscar_Click();
              // }

          });

          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/ConfiguracionLinea/ConfiguracionLineaIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.Lineas = data.Linea;
                      if (data.Linea.length > 0) {
                          //$rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.CodigoLinea = data.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.CodigoLinea = data.Linea[0].Codigo;
                              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.Habilitado = 'False';
                          }
                      }

                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.Estados = data.Estados;
                      //if (data.Estados.length > 0) {
                      //    $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.Estado = data.Estados[0].Codigo;
                      //}


                  }
              });
          }


          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaMaestroConfiguracionLinea":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarConfiguracionLinea('" + rowObject.CodigoConfiguracion + "');";
                                  break;
                              case "Quitar":
                                  eventoclick = "$parent.EliminarConfiguracionLinea('" + rowObject.CodigoConfiguracion + "');";
                                  break;
                          }
                      }
                      break;
              }

              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              if (tipoboton == "Quitar") {
                  html = HtmlCrearBoton("Eliminar", eventoclick, "");
              }
              return html;
          }


          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }

              /* if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.Estado == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Estado es requerido.");
                  return false;
              } else {
                  if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.Estado.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Estado es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              */


              miBlock(true, "html");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro)) };
              $scope.gridapigrillaListaMaestroConfiguracionLinea.find(objRequest);
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaMaestroConfiguracionLinea = [];
              miBlock(false, "html");
          }




          $scope.EditarConfiguracionLinea = function (CodigoConfiguracion) {

              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro = new Object();
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditar = true;
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditarLinea = true;

              //$rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.UrlOrigen = "/#!/sistema/maestros/configuracion-linea";
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.codigoConfiguracionLinea = CodigoConfiguracion;
              $rootScope.Redirect("/#!/sistema/maestros/configuracion-linea/registro-configuracion-linea/");
          }


          $scope.Nuevo_Click = function () {
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro = new Object();
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditar = false;
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditarLinea = false;

              $rootScope.Redirect("/#!/sistema/maestros/configuracion-linea/registro-configuracion-linea/");
          }


          $scope.Limpiar_Click = function () {

              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.Descripcion = "";
              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.Lineas.length > 1) {
                  $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.Estados.length > 1) {
                  $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Filtro.Estado = "";
              }
          }



          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }


      }]);
})();