(function () {
    angular.module('api')
    .controller('RegistroDocumentoDetalleCargaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroDocumento == undefined)
                  $rootScope.DatosFormulario.RegistroDocumento = new Object();
              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga == undefined)
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga = new Object();
              if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento == undefined)
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento = new Object();

              $rootScope.FlagMostrarBotonSeleccionar = true;
              $scope.Limpiar_Click();
              CargarDatosIniciales();

              if ($rootScope.DatosFormulario.OpcionCarga == 'EditarCarga') {
                  if ($scope.row != undefined) {
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoContenedor = $scope.row.CodigoContenedor;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor = $scope.row.NumeroContenedor;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoContenedor = $scope.row.NombreTipoContenedor;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TamanioTipoContenedor = $scope.row.TamanioTipoContenedor;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionTransporte = $scope.row.CodigoCondicionTransporte;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionTransporte = $scope.row.NombreCondicionTransporte;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTipoMovimiento = $scope.row.CodigoTipoMovimiento;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoMovimiento = $scope.row.NombreTipoMovimiento;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoUnidadMercancia = $scope.row.CodigoUnidadMercancia;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreUnidadMercancia = $scope.row.NombreUnidadMercancia;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNaturalezaCarga = $scope.row.CodigoNaturalezaCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNaturalezaCarga = $scope.row.NombreNaturalezaCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionCarga = $scope.row.CodigoCondicionCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionCarga = $scope.row.NombreCondicionCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTemperatura = $scope.row.CodigoTemperatura;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTemperatura = $scope.row.NombreTemperatura;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoClaseIMO = $scope.row.CodigoClaseIMO;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreClaseIMO = $scope.row.NombreClaseIMO;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNumeroIMO = $scope.row.CodigoNumeroIMO;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNumeroIMO = $scope.row.NombreNumeroIMO;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoAlmacenDocumentoDetalleCarga = $scope.row.CodigoAlmacenDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreAlmacen = $scope.row.NombreAlmacen;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoDepositoDocumentoDetalleCarga = $scope.row.CodigoDepositoDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreDeposito = $scope.row.NombreDeposito;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoPrecinto = $scope.row.CodigoPrecinto;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroPrecinto = $scope.row.NumeroPrecinto;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ItemDocumentoDetalleCarga = $scope.row.ItemDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CantidadBultoDocumentoDetalleCarga = $scope.row.CantidadBultoDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PesoBrutoDocumentoDetalleCarga = $scope.row.PesoBrutoDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.VolumenBrutoDocumentoDetalleCarga = $scope.row.VolumenBrutoDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMinimaDocumentoDetalleCarga = $scope.row.TemperaturaMinimaDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMaximaDocumentoDetalleCarga = $scope.row.TemperaturaMaximaDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PropietarioDocumentoDetalleCarga = $scope.row.PropietarioDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ObservacionDocumentoDetalleCarga = $scope.row.ObservacionDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.DescripcionDocumentoDetalleCarga = $scope.row.DescripcionDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.MarcasNumerosDocumentoDetalleCarga = $scope.row.MarcasNumerosDocumentoDetalleCarga;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.FaltoDocumentoDetalleCarga = $scope.row.FaltoDocumentoDetalleCarga;
                  }
              }

          });

          function CargarDatosIniciales() {
              $.ajax({
                  url: "/DocumentoDetalleCarga/CargaIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CondicionesCarga = data.CondicionesCarga;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionCarga = data.CondicionesCarga[0].CodigoCondicionCarga;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionCarga = data.CondicionesCarga[0].NombreCondicionCarga;

                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.Temperaturas = data.Temperaturas;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTemperatura = data.Temperaturas[0].CodigoTemperatura;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTemperatura = data.Temperaturas[0].NombreTemperatura;

                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CondicionesTransporte = data.CondicionesTransporte;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionTransporte = data.CondicionesTransporte[0].CodigoCondicionTransporte;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionTransporte = data.CondicionesTransporte[0].NombreCondicionTransporte;
                      }
                  }
              });
          }

          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
              var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
              var estado = ProcesarSeleccionado(data);
              if (estado) {
                  $rootScope.$apply();
                  $scope.$parent.SalirPopup_Click();
              }
          }

          function validarDatos() {
              var salida = true;

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor == undefined) {
                  $(".caja11.msgerror.NumeroContenedor").html("Numero de Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor.length <= 0) {
                  $(".caja11.msgerror.NumeroContenedor").html("Numero de Contenedor es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NumeroContenedor").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionTransporte == undefined) {
                  $(".caja11.msgerror.CodigoCondicionTransporte").html("Condicion de Transporte es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionTransporte.length <= 0) {
                  $(".caja11.msgerror.CodigoCondicionTransporte").html("Condicion de Transporte es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoCondicionTransporte").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoMovimiento == undefined) {
                  $(".caja11.msgerror.NombreTipoMovimiento").html("Tipo de Movimiento es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoMovimiento <= 0) {
                  $(".caja11.msgerror.NombreTipoMovimiento").html("Tipo de Movimiento es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoMovimiento").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreUnidadMercancia == undefined) {
                  $(".caja11.msgerror.NombreUnidadMercancia").html("Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreUnidadMercancia <= 0) {
                  $(".caja11.msgerror.NombreUnidadMercancia").html("Unidad de Mercancia es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreUnidadMercancia").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNaturalezaCarga == undefined) {
                  $(".caja11.msgerror.NombreNaturalezaCarga").html("Naturaleza de Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNaturalezaCarga <= 0) {
                  $(".caja11.msgerror.NombreNaturalezaCarga").html("Naturaleza de Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreNaturalezaCarga").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionCarga == undefined) {
                  $(".caja11.msgerror.CodigoCondicionCarga").html("Condicion de Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionCarga <= 0) {
                  $(".caja11.msgerror.CodigoCondicionCarga").html("Condicion de Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoCondicionCarga").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreClaseIMO == undefined) {
                  $(".caja11.msgerror.NombreClaseIMO").html("Clase IMO es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreClaseIMO <= 0) {
                  $(".caja11.msgerror.NombreClaseIMO").html("Clase IMO es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreClaseIMO").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNumeroIMO == undefined) {
                  $(".caja11.msgerror.NombreNumeroIMO").html("Numero IMO es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNumeroIMO <= 0) {
                  $(".caja11.msgerror.NombreNumeroIMO").html("Numero IMO es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreNumeroIMO").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreAlmacen == undefined) {
                  $(".caja11.msgerror.NombreAlmacen").html("Almacen es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreAlmacen <= 0) {
                  $(".caja11.msgerror.NombreAlmacen").html("Almacen es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreAlmacen").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreDeposito == undefined) {
                  $(".caja11.msgerror.NombreDeposito").html("Deposito es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreDeposito <= 0) {
                  $(".caja11.msgerror.NombreDeposito").html("Deposito es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreDeposito").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroPrecinto == undefined) {
                  $(".caja11.msgerror.NumeroPrecinto").html("Precinto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroPrecinto <= 0) {
                  $(".caja11.msgerror.NumeroPrecinto").html("Precinto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NumeroPrecinto").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CantidadBultoDocumentoDetalleCarga == undefined) {
                  $(".caja11.msgerror.CantidadBultoDocumentoDetalleCarga").html("Cantidad de bultos es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CantidadBultoDocumentoDetalleCarga <= 0) {
                  $(".caja11.msgerror.CantidadBultoDocumentoDetalleCarga").html("Cantidad de bultos es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CantidadBultoDocumentoDetalleCarga").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PesoBrutoDocumentoDetalleCarga == undefined) {
                  $(".caja11.msgerror.PesoBrutoDocumentoDetalleCarga").html("Peso Bruto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PesoBrutoDocumentoDetalleCarga <= 0) {
                  $(".caja11.msgerror.PesoBrutoDocumentoDetalleCarga").html("Peso Bruto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.PesoBrutoDocumentoDetalleCarga").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.VolumenBrutoDocumentoDetalleCarga == undefined) {
                  $(".caja11.msgerror.VolumenBrutoDocumentoDetalleCarga").html("Volumen es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.VolumenBrutoDocumentoDetalleCarga <= 0) {
                  $(".caja11.msgerror.VolumenBrutoDocumentoDetalleCarga").html("Volumen es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.VolumenBrutoDocumentoDetalleCarga").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTemperatura == undefined) {
                  $(".caja11.msgerror.CodigoTemperatura").html("Unidad de Temperatura es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTemperatura <= 0) {
                  $(".caja11.msgerror.CodigoTemperatura").html("Unidad de Temperatura es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTemperatura").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.DescripcionDocumentoDetalleCarga == undefined) {
                  $(".caja11.msgerror.DescripcionDocumentoDetalleCarga").html("Descripcion del bulto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.DescripcionDocumentoDetalleCarga <= 0) {
                  $(".caja11.msgerror.DescripcionDocumentoDetalleCarga").html("Descripcion del bulto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.DescripcionDocumentoDetalleCarga").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.MarcasNumerosDocumentoDetalleCarga == undefined) {
                  $(".caja11.msgerror.MarcasNumerosDocumentoDetalleCarga").html("Marcas es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.MarcasNumerosDocumentoDetalleCarga <= 0) {
                  $(".caja11.msgerror.MarcasNumerosDocumentoDetalleCarga").html("Marcas es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.MarcasNumerosDocumentoDetalleCarga").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {

              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarDocumentoCarga();
              }
          }

          function registrarDocumentoCarga() {
              //nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga, "IdCarga");
              //obj.IdCarga = nuevoId;
              var obj = new Object();
              obj.CodigoDocumentoDetalleCarga = null;
              obj.CodigoDocumento = $rootScope.DatosFormulario.CodigoDocumento;

              obj.CodigoCondicionTransporte = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionTransporte;
              var LstCondicionTransporte = $.grep($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CondicionesTransporte, function (e) {
                  return e.CodigoCondicionTransporte == obj.CodigoCondicionTransporte;
              });

              obj.CodigoTemperatura = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTemperatura;
              var LstTemperatura = $.grep($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.Temperaturas, function (e) {
                  return e.CodigoTemperatura == obj.CodigoTemperatura;
              });

              obj.CodigoCondicionCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionCarga;
              var LstCondicionCarga = $.grep($rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CondicionesCarga, function (e) {
                  return e.CodigoCondicionCarga == obj.CodigoCondicionCarga;
              });

              obj.NombreCondicionTransporte = LstCondicionTransporte[0].NombreCondicionTransporte;
              obj.NombreTemperatura = LstTemperatura[0].NombreTemperatura;
              obj.NombreCondicionCarga = LstCondicionCarga[0].NombreCondicionCarga;

              obj.CodigoContenedor = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoContenedor;
              obj.NumeroContenedor = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor;
              obj.NombreTipoContenedor = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoContenedor;
              obj.TamanioTipoContenedor = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TamanioTipoContenedor;
              obj.CodigoTipoMovimiento = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTipoMovimiento;
              obj.NombreTipoMovimiento = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoMovimiento;
              obj.CodigoUnidadMercancia = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoUnidadMercancia;
              obj.NombreUnidadMercancia = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreUnidadMercancia;
              obj.CodigoNaturalezaCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNaturalezaCarga;
              obj.NombreNaturalezaCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNaturalezaCarga;
              obj.CodigoClaseIMO = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoClaseIMO;
              obj.NombreClaseIMO = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreClaseIMO;
              obj.CodigoNumeroIMO = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNumeroIMO;
              obj.NombreNumeroIMO = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNumeroIMO;
              obj.CodigoAlmacenDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoAlmacenDocumentoDetalleCarga;
              obj.NombreAlmacen = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreAlmacen;
              obj.CodigoDepositoDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoDepositoDocumentoDetalleCarga;
              obj.NombreDeposito = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreDeposito;
              obj.CodigoPrecinto = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoPrecinto;
              obj.NumeroPrecinto = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroPrecinto;
              obj.ItemDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ItemDocumentoDetalleCarga;
              obj.CantidadBultoDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CantidadBultoDocumentoDetalleCarga;
              obj.PesoBrutoDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PesoBrutoDocumentoDetalleCarga;
              obj.VolumenBrutoDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.VolumenBrutoDocumentoDetalleCarga;
              obj.TemperaturaMinimaDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMinimaDocumentoDetalleCarga;
              obj.TemperaturaMaximaDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMaximaDocumentoDetalleCarga;
              obj.PropietarioDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PropietarioDocumentoDetalleCarga;
              obj.ObservacionDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ObservacionDocumentoDetalleCarga;
              obj.DescripcionDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.DescripcionDocumentoDetalleCarga;
              obj.MarcasNumerosDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.MarcasNumerosDocumentoDetalleCarga;
              obj.MarcasNumerosDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.MarcasNumerosDocumentoDetalleCarga;
              obj.FaltoDocumentoDetalleCarga = $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.FaltoDocumentoDetalleCarga;

              if ($rootScope.DatosFormulario.OpcionCarga == 'EditarCarga') {
                  if ($scope.row.CodigoDocumentoDetalleCarga == undefined || $scope.row.CodigoDocumentoDetalleCarga == null) {
                      obj.Accion = "I";
                  } else {
                      obj.Accion = "U";
                      obj.CodigoDocumentoDetalleCarga = $scope.row.CodigoDocumentoDetalleCarga;
                  }
                  obj.IdCarga = $scope.row.IdCarga;
              } else {
                  obj.Accion = "I";
                  obj.IdCarga = Helpers.GenerarId($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga, "IdCarga");
                  //$rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga.length + 1;
              }
              //Valida si existe el registro -------------------
              var ExisteCarga = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga, function (e) {
                  return e.CodigoContenedor == obj.CodigoContenedor && obj.CodigoDocumentoDetalleCarga != e.CodigoDocumentoDetalleCarga;
              });
              if (ExisteCarga.length > 0) {
                  $(".caja11.msgerror.Objeto").html("El contenedor seleccionado ya existe.");
                  return false;
              }
              else {
                  $(".caja11.msgerror.Objeto").html("");
              }
              //--------------------------------------------

              if ($rootScope.DatosFormulario.OpcionCarga == 'EditarCarga') {
                  $.each($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga, function (x) {
                      if (this.IdCarga == obj.IdCarga) {
                          this.Accion = obj.Accion;
                          this.CodigoDocumentoDetalleCarga = obj.CodigoDocumentoDetalleCarga;
                          this.CodigoContenedor = obj.CodigoContenedor;
                          this.NumeroContenedor = obj.NumeroContenedor;
                          this.NombreTipoContenedor = obj.NombreTipoContenedor;
                          this.TamanioTipoContenedor = obj.TamanioTipoContenedor;
                          this.CodigoCondicionTransporte = obj.CodigoCondicionTransporte;
                          this.NombreCondicionTransporte = obj.NombreCondicionTransporte;
                          this.CodigoTipoMovimiento = obj.CodigoTipoMovimiento;
                          this.NombreTipoMovimiento = obj.NombreTipoMovimiento;
                          this.CodigoUnidadMercancia = obj.CodigoUnidadMercancia;
                          this.NombreUnidadMercancia = obj.NombreUnidadMercancia;
                          this.CodigoNaturalezaCarga = obj.CodigoNaturalezaCarga;
                          this.NombreNaturalezaCarga = obj.NombreNaturalezaCarga;
                          this.CodigoCondicionCarga = obj.CodigoCondicionCarga;
                          this.NombreCondicionCarga = obj.NombreCondicionCarga;
                          this.CodigoTemperatura = obj.CodigoTemperatura;
                          this.NombreTemperatura = obj.NombreTemperatura;
                          this.CodigoClaseIMO = obj.CodigoClaseIMO;
                          this.NombreClaseIMO = obj.NombreClaseIMO;
                          this.CodigoNumeroIMO = obj.CodigoNumeroIMO;
                          this.NombreNumeroIMO = obj.NombreNumeroIMO;
                          this.CodigoAlmacenDocumentoDetalleCarga = obj.CodigoAlmacenDocumentoDetalleCarga;
                          this.NombreAlmacen = obj.NombreAlmacen;
                          this.CodigoDepositoDocumentoDetalleCarga = obj.CodigoDepositoDocumentoDetalleCarga;
                          this.NombreDeposito = obj.NombreDeposito;
                          this.CodigoPrecinto = obj.CodigoPrecinto;
                          this.NumeroPrecinto = obj.NumeroPrecinto;
                          this.ItemDocumentoDetalleCarga = obj.ItemDocumentoDetalleCarga;
                          this.CantidadBultoDocumentoDetalleCarga = obj.CantidadBultoDocumentoDetalleCarga;
                          this.PesoBrutoDocumentoDetalleCarga = obj.PesoBrutoDocumentoDetalleCarga;
                          this.VolumenBrutoDocumentoDetalleCarga = obj.VolumenBrutoDocumentoDetalleCarga;
                          this.TemperaturaMinimaDocumentoDetalleCarga = obj.TemperaturaMinimaDocumentoDetalleCarga;
                          this.TemperaturaMaximaDocumentoDetalleCarga = obj.TemperaturaMaximaDocumentoDetalleCarga;
                          this.PropietarioDocumentoDetalleCarga = obj.PropietarioDocumentoDetalleCarga;
                          this.ObservacionDocumentoDetalleCarga = obj.ObservacionDocumentoDetalleCarga;
                          this.DescripcionDocumentoDetalleCarga = obj.DescripcionDocumentoDetalleCarga;
                          this.MarcasNumerosDocumentoDetalleCarga = obj.MarcasNumerosDocumentoDetalleCarga;
                          this.FaltoDocumentoDetalleCarga = obj.FaltoDocumentoDetalleCarga;
                          return false;
                      }
                  });

              } else {
                  $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga.push(obj);
              }
              $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosCargaMemoria = $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga;
              $scope.gridapigrillaListaDatosCarga.refresh($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCarga);
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TamanioTipoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionTransporte = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionTransporte = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTipoMovimiento = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoMovimiento = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoUnidadMercancia = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreUnidadMercancia = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNaturalezaCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNaturalezaCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTemperatura = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTemperatura = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoClaseIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreClaseIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNumeroIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNumeroIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoAlmacenDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreAlmacen = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoDepositoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreDeposito = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoPrecinto = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroPrecinto = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ItemDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CantidadBultoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PesoBrutoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.VolumenBrutoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMinimaDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMaximaDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PropietarioDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ObservacionDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.DescripcionDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.MarcasNumerosDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.FaltoDocumentoDetalleCarga = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TamanioTipoContenedor = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionTransporte = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionTransporte = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTipoMovimiento = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTipoMovimiento = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoUnidadMercancia = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreUnidadMercancia = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNaturalezaCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNaturalezaCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoCondicionCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreCondicionCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoTemperatura = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreTemperatura = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoClaseIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreClaseIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoNumeroIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreNumeroIMO = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoAlmacenDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreAlmacen = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoDepositoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NombreDeposito = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CodigoPrecinto = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.NumeroPrecinto = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ItemDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.CantidadBultoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PesoBrutoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.VolumenBrutoDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMinimaDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.TemperaturaMaximaDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.PropietarioDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.ObservacionDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.DescripcionDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.MarcasNumerosDocumentoDetalleCarga = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroCarga.FaltoDocumentoDetalleCarga = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.BuscarContenedorRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionContenedor = "RegistrarContenedor";
              getPopupResponsive({
                  formURL: "Contenedor/BuscarContenedor",
                  title: "Buscar Contenedor",
                  nombreDiv: "divPopupBuscarContenedor",
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
                      $compile($("#divPopupBuscarContenedor"))($scope);
                  }
              });
          }

          $scope.BuscarTipoMovimientoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoMovimiento = "RegistrarTipoMovimiento";
              getPopupResponsive({
                  formURL: "TipoMovimiento/BuscarTipoMovimiento",
                  title: "Buscar Tipo de Movimiento",
                  nombreDiv: "divPopupBuscarTipoMovimiento",
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
                      $compile($("#divPopupBuscarTipoMovimiento"))($scope);
                  }
              });
          }

          $scope.BuscarUnidadMercanciaRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionUnidadMercancia = "RegistrarUnidadMercancia";
              getPopupResponsive({
                  formURL: "UnidadMercancia/BuscarUnidadMercancia",
                  title: "Buscar Unidad de Mercancia",
                  nombreDiv: "divPopupBuscarUnidadMercancia",
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
                      $compile($("#divPopupBuscarUnidadMercancia"))($scope);
                  }
              });
          }

          $scope.BuscarNaturalezaCargaRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionNaturalezaCarga = "RegistrarNaturalezaCarga";
              getPopupResponsive({
                  formURL: "NaturalezaCarga/BuscarNaturalezaCarga",
                  title: "Buscar Unidad de Mercancia",
                  nombreDiv: "divPopupBuscarNaturalezaCarga",
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
                      $compile($("#divPopupBuscarNaturalezaCarga"))($scope);
                  }
              });
          }

          $scope.BuscarClaseIMORegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionClaseIMO = "RegistrarClaseIMO";
              getPopupResponsive({
                  formURL: "ClaseIMO/BuscarClaseIMO",
                  title: "Buscar Clase IMO",
                  nombreDiv: "divPopupBuscarClaseIMO",
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
                      $compile($("#divPopupBuscarClaseIMO"))($scope);
                  }
              });
          }

          $scope.BuscarNumeroIMORegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionNumeroIMO = "RegistrarNumeroIMO";
              getPopupResponsive({
                  formURL: "NumeroIMO/BuscarNumeroIMO",
                  title: "Buscar Numero IMO",
                  nombreDiv: "divPopupBuscarNumeroIMO",
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
                      $compile($("#divPopupBuscarNumeroIMO"))($scope);
                  }
              });
          }

          $scope.BuscarPrecintoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionPrecinto = "RegistrarPrecinto";
              getPopupResponsive({
                  formURL: "Precinto/BuscarPrecinto",
                  title: "Buscar Precinto",
                  nombreDiv: "divPopupBuscarPrecinto",
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
                      $compile($("#divPopupBuscarPrecinto"))($scope);
                  }
              });
          }

          $scope.BuscarUnidadMercanciaRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionUnidadMercancia = "RegistrarUnidadMercancia";
              getPopupResponsive({
                  formURL: "UnidadMercancia/BuscarUnidadMercancia",
                  title: "Buscar Unidad de Mercancia",
                  nombreDiv: "divPopupBuscarUnidadMercancia",
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
                      $compile($("#divPopupBuscarUnidadMercancia"))($scope);
                  }
              });
          }

          $scope.BuscarAlmacenRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionAlmacenCarga = "RegistroCargaAlmacen";
              $rootScope.DatosFormulario.OpcionAgenteMaritimoItinerario = "";
              $rootScope.DatosFormulario.OpcionOperadorEmbarqueItinerario = "";
              $rootScope.DatosFormulario.OpcionOperadorDescargaItinerario = "";
              $rootScope.DatosFormulario.OpcionDepositoCarga = "";

              getPopupResponsive({
                  formURL: "PersonaxRol/BuscarPersonaxRol",
                  title: "Buscar Almacen",
                  nombreDiv: "divPopupBuscarPersonaxRol",
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
                      $compile($("#divPopupBuscarPersonaxRol"))($scope);
                  }
              });
          }

          $scope.BuscarDepositoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionDepositoCarga = "RegistroCargaDeposito";
              $rootScope.DatosFormulario.OpcionAgenteMaritimoItinerario = "";
              $rootScope.DatosFormulario.OpcionOperadorEmbarqueItinerario = "";
              $rootScope.DatosFormulario.OpcionOperadorDescargaItinerario = "";
              $rootScope.DatosFormulario.OpcionAlmacenCarga = "";

              getPopupResponsive({
                  formURL: "PersonaxRol/BuscarPersonaxRol",
                  title: "Buscar Deposito",
                  nombreDiv: "divPopupBuscarPersonaxRol",
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
                      $compile($("#divPopupBuscarPersonaxRol"))($scope);
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