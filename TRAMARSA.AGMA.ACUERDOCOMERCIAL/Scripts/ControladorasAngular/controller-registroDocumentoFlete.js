(function () {
    angular.module('api')
    .controller('RegistroDocumentoDetalleFleteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroDocumento == undefined)
                  $rootScope.DatosFormulario.RegistroDocumento = new Object();
              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete == undefined)
                  $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete = new Object();
              if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento == undefined)
                  $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento = new Object();

              $rootScope.FlagMostrarBotonSeleccionar = true;
              $scope.Limpiar_Click();
              CargarDatosIniciales();

              if ($rootScope.DatosFormulario.OpcionFlete == 'EditarFlete') {
                  if ($scope.row != undefined) {
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoModoPago = $scope.row.CodigoModoPago;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreModoPago = $scope.row.NombreModoPago;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoMoneda = $scope.row.CodigoMoneda;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoTipoFlete = $scope.row.CodigoTipoFlete;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreTipoFlete = $scope.row.NombreTipoFlete;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.MontoDocumentoDetalleFlete = $scope.row.MontoDocumentoDetalleFlete;
                      $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreMoneda = $scope.row.NombreMoneda;
                  }
              }

          });

          function CargarDatosIniciales() {
              $.ajax({
                  url: "/DocumentoDetalleFlete/FleteIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.ModosPago = data.ModosPago;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoModoPago = data.ModosPago[0].CodigoModoPago;
                          $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreModoPago = data.ModosPago[0].NombreModoPago;
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

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreTipoFlete == undefined) {
                  $(".caja11.msgerror.NombreTipoFlete").html("Tipo de Flete es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreTipoFlete.length <= 0) {
                  $(".caja11.msgerror.NombreTipoFlete").html("Tipo de Flete es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoFlete").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreMoneda == undefined) {
                  $(".caja11.msgerror.NombreMoneda").html("Moneda es requerida.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreMoneda.length <= 0) {
                  $(".caja11.msgerror.NombreMoneda").html("Moneda es requerida.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreMoneda").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoModoPago == undefined) {
                  $(".caja11.msgerror.CodigoModoPago").html("Modo de Pago es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoModoPago.length <= 0) {
                  $(".caja11.msgerror.CodigoModoPago").html("Modo de Pago es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoModoPago").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.MontoDocumentoDetalleFlete == undefined) {
                  $(".caja11.msgerror.MontoDocumentoDetalleFlete").html("Monto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.MontoDocumentoDetalleFlete <= 0) {
                  $(".caja11.msgerror.MontoDocumentoDetalleFlete").html("Monto es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.MontoDocumentoDetalleFlete").html("");
              }

              return salida;
          }

          $scope.Guardar_Click = function () {

              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarDocumentoFlete();
              }
          }

          function registrarDocumentoFlete() {
              //nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete, "IdFlete");
              //obj.IdFlete = nuevoId;
              var obj = new Object();
              obj.CodigoDocumentoDetalleFlete = null;
              obj.CodigoDocumento = $rootScope.DatosFormulario.CodigoDocumento;
              obj.CodigoModoPago = $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoModoPago;
              var LstModoPago = $.grep($rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.ModosPago, function (e) {
                  return e.CodigoModoPago == obj.CodigoModoPago;
              });

              obj.NombreModoPago = LstModoPago[0].NombreModoPago;
              obj.CodigoMoneda = $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoMoneda;
              obj.CodigoTipoFlete = $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoTipoFlete;
              obj.MontoDocumentoDetalleFlete = $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.MontoDocumentoDetalleFlete;
              obj.NombreMoneda = $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreMoneda;
              obj.NombreTipoFlete = $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreTipoFlete;
              if ($rootScope.DatosFormulario.OpcionFlete == 'EditarFlete') {
                  if ($scope.row.CodigoDocumentoDetalleFlete == undefined || $scope.row.CodigoDocumentoDetalleFlete == null) {
                      obj.Accion = "I";
                  } else {
                      obj.Accion = "U";
                      obj.CodigoDocumentoDetalleFlete = $scope.row.CodigoDocumentoDetalleFlete;
                  }
                  obj.IdFlete = $scope.row.IdFlete;
              } else {
                  obj.Accion = "I";
                  obj.IdFlete = Helpers.GenerarId($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete, "IdFlete");
                  //$rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete.length + 1;
              }
              //Valida si existe el registro -------------------
              var ExisteFlete = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete, function (e) {
                  return e.CodigoTipoFlete == obj.CodigoTipoFlete && e.CodigoModoPago == obj.CodigoModoPago && obj.CodigoDocumentoDetalleFlete!=e.CodigoDocumentoDetalleFlete;
              });
              if (ExisteFlete.length > 0) {
                  $(".caja11.msgerror.Objeto").html("El Flete seleccionado ya existe.");
                  return false;
              }
              else {
                  $(".caja11.msgerror.Objeto").html("");
              }
              //--------------------------------------------

              if ($rootScope.DatosFormulario.OpcionFlete == 'EditarFlete') {
                  $.each($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete, function (x) {
                      if (this.IdFlete == obj.IdFlete) {
                          this.Accion = obj.Accion;
                          this.CodigoDocumentoDetalleFlete = obj.CodigoDocumentoDetalleFlete;
                          this.CodigoDocumento = obj.CodigoDocumento;
                          this.CodigoModoPago = obj.CodigoModoPago;
                          this.NombreModoPago = obj.NombreModoPago;
                          this.CodigoMoneda = obj.CodigoMoneda;
                          this.CodigoTipoFlete = obj.CodigoTipoFlete;
                          this.MontoDocumentoDetalleFlete = obj.MontoDocumentoDetalleFlete;
                          this.NombreMoneda = obj.NombreMoneda;
                          this.NombreTipoFlete = obj.NombreTipoFlete;
                          return false;
                      }
                  });

              } else {
                  $rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete.push(obj);
              }
              $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosFleteMemoria = $rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete;
              $scope.gridapigrillaListaDatosFlete.refresh($rootScope.DatosFormulario.RegistroDocumento.ListaDatosFlete);
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoTipoFlete = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreTipoFlete = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoMoneda = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreMoneda = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.MontoDocumentoDetalleFlete = null;

          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoTipoFlete = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreTipoFlete = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.CodigoMoneda = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.NombreMoneda = null;
              $rootScope.DatosFormulario.RegistroDocumento.RegistroFlete.MontoDocumentoDetalleFlete = null;
              $scope.$parent.SalirPopup_Click();
          }

          $scope.BuscarTipoFleteRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoFlete = "RegistrarTipoFlete";
              getPopupResponsive({
                  formURL: "TipoFlete/BuscarTipoFlete",
                  title: "Buscar Tipo de Flete",
                  nombreDiv: "divPopupBuscarTipoFlete",
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
                      $compile($("#divPopupBuscarTipoFlete"))($scope);
                  }
              });
          }

          $scope.BuscarMonedaRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionMoneda = "RegistrarMoneda";
              getPopupResponsive({
                  formURL: "Moneda/BuscarMoneda",
                  title: "Buscar Moneda",
                  nombreDiv: "divPopupBuscarMoneda",
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
                      $compile($("#divPopupBuscarMoneda"))($scope);
                  }
              });
          }

          $scope.BuscarModoPagoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionModoPago = "RegistrarModoPago";
              getPopupResponsive({
                  formURL: "ModoPago/BuscarModoPago",
                  title: "Buscar Modo de Pago",
                  nombreDiv: "divPopupBuscarModoPago",
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
                      $compile($("#divPopupBuscarModoPago"))($scope);
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