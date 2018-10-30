(function () {
    angular.module('api')
    .controller('BuscarTarifaEscalonadaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined) {
                  $rootScope.DatosFormulario = new Object();
              }
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada == undefined) {
                  $rootScope.DatosFormulario.DatosTarifaEscalonada = new Object();
              }


              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.FlagTarifaEscalonada) {
                  $scope.CargaInicialBusquedaTarifaEscalonada(true);
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.FlagTarifaEscalonada = false;
              } else {
                  $rootScope.DatosFormulario = new Object();
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada = new Object();
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial = new Object();
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro = new Object();
                  $scope.CargaInicialBusquedaTarifaEscalonada(false);
              }

              $(".InputTEXT_04Fecha").prop('disabled', false);
          });
          $scope.CargaInicialBusquedaTarifaEscalonada = function (continuar) {
              if (continuar) {
                  if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro != undefined) {
                      if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.CodigoLinea != undefined) {
                          if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.CodigoLinea.length > 0) {
                              $scope.Buscar_Click();
                              return;
                          }
                      }
                  }
              }
              $.ajax({
                  url: "/TarifaEscalonada/BusquedaTarifaEscalonadaIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Linea = data.Linea;
                          $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.CodigoLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Habilitado = 'True';
                          }
                          $scope.ChangeLineaNaviera($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.CodigoLinea);
                      }
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.RealFechaVigencia = data.FechaVigencia;
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.FechaVigencia = data.FechaVigencia;
                      //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = data.Contenedor;
                  }
              });
              $("#VigenteTarifaEscalonada").prop("checked", true);
          }
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (idgrilla) {
                  case "grillaListaTarifaEscalonada":
                      {
                          switch (tipoboton) {
                              case "Editar":
                                  eventoclick = "$parent.EditarTarifaEscalonada('" + rowObject.CodigoTarifaEscalonada + "');";
                                  break;
                          }
                      }
                      break;
              }
              var html = "";
              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              return html;
          }
          $scope.EditarTarifaEscalonada = function (codigo) {
              $rootScope.DatosFormulario.DatosTarifaEscalonada = new Object();
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE = new Object();
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro = new Object();
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.TarifaEscalonadaFlagEditar = true;
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.UrlOrigen = "/#!/sistema/busqueda/buscar-tarifa-escalonada/";
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada = codigo;
              $rootScope.Redirect("/#!/sistema/registro-de-tarifa-escalonada/");
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }

              if (validateForm("#BusquedaTarifaEscalonadaFrm") == false) {
                  return false;
              }
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.FlagVigente == null || $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.FlagVigente == undefined) {
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.FlagVigente = true;
              }
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.CodigoLinea.length > 0) {
                  $(".caja11.msgerror.CodigoLinea").html("");
                  miBlock(true, "html");
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro)) };
                  $scope.gridapigrillaListaTarifaEscalonada.find(objRequest);
                  miBlock(false, "html");
              } else {
                  $(".caja11.msgerror.CodigoLinea").html("Cod. Linea es requerido");
              }
          }
          $scope.Nuevo_Click = function () {
              $rootScope.DatosFormulario.DatosTarifaEscalonada = new Object();
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE = new Object();
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro = new Object();
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.TarifaEscalonadaFlagEditar = false;
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.UrlOrigen = "/#!/sistema/busqueda/buscar-tarifa-escalonada/";
              $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada = 0;
              $rootScope.Redirect("/#!/sistema/registro-de-tarifa-escalonada/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.DescripcionTarifa = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.CodigoTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.FechaVigencia = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.FlagTarifaLigada = false;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.FlagVigente = true;
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Linea.length > 1) {
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonada.Filtro.CodigoLinea = null;
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = [];
              }
              $("#TarifaLigadaEscalonada").prop("checked", false);
              $("#VigenteTarifaEscalonada").prop("checked", true);
          }

          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          $scope.ChangeLineaNaviera = function (codigoLinea) {
              if (codigoLinea != undefined) {
                  $.ajax({
                      url: "/TipoContenedor/ListarTipoContenedorByLinea",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "codigoLinea=" + codigoLinea,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          if (data.ListaTipoContenedor.length > 0) {
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = data.ListaTipoContenedor;
                          } else {
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = [];
                          }
                      }
                  });
              } else {
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = [];
              }
          }

      }]);
})();