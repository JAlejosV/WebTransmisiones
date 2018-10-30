(function () {
    angular.module('api')
    .controller('RegistroItinerarioController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarItinerario == undefined)
                  $rootScope.DatosFormulario.AdministrarItinerario = new Object();
              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos = new Object();

              $scope.FlagMostrarBotonGuardar = true;

              $('#HoraArriboItinerario').timeEntry({ show24Hours: true });
              $('#HoraZarpeItinerario').timeEntry({ show24Hours: true });
              $('#HoraAtraqueItinerario').timeEntry({ show24Hours: true });
              $('#HoraTerminoDescargaItinerario').timeEntry({ show24Hours: true });
              $('#HoraZarpePuertoIntermedio').timeEntry({ show24Hours: true });

              $(".timepicker").change(function () {
                  var elemento = this;
              });

              $(".timepicker").focusout(function () {
                  var datosHora = $(this).val().split(":");
                  if (datosHora.length > 0) {
                      if ($.isNumeric(datosHora[0]) && $.isNumeric(datosHora[1])) {

                      } else {
                          $(this).val("");
                      }
                  }
              });

              CargarDatosIniciales();
          });

          function CargarDatosIniciales() {
              $.ajax({
                  url: "/Itinerario/ItinerarioIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.TiposOperacion = data.TiposOperacion;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion = data.TiposOperacion[0].CodigoTipoOperacion;
                      }
                      if ($scope.$parent.ModoPagina == "Editar") {
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoItinerario = $scope.row.CodigoItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NumeroViajeItinerario = $scope.row.NumeroViajeItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NumeroManifiestoItinerario = $scope.row.NumeroManifiestoItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.AnioManifiestoItinerario = $scope.row.AnioManifiestoItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaArriboItinerario = $scope.row.FechaArriboItinerario.substring(0, 10);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraArriboItinerario = $scope.row.FechaArriboItinerario.substring(11, 16);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaZarpeItinerario = $scope.row.FechaZarpeItinerario.substring(0, 10);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpeItinerario = $scope.row.FechaZarpeItinerario.substring(11, 16);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaAtraqueItinerario = $scope.row.FechaAtraqueItinerario.substring(0, 10);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraAtraqueItinerario = $scope.row.FechaAtraqueItinerario.substring(11, 16);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaTerminoDescargaItinerario = $scope.row.FechaTerminoDescargaItinerario.substring(0, 10);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraTerminoDescargaItinerario = $scope.row.FechaTerminoDescargaItinerario.substring(11, 16);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.DUEItinerario = $scope.row.DUEItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CapitanNaveItinerario = $scope.row.CapitanNaveItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaZarpePuertoIntermedio = $scope.row.FechaZarpePuertoIntermedio.substring(0, 10);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpePuertoIntermedio = $scope.row.FechaZarpePuertoIntermedio.substring(11, 16);
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.Voyage = $scope.row.Voyage;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoNave = $scope.row.CodigoNave;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreNave = $scope.row.NombreNave;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoAduana = $scope.row.CodigoAduana;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAduana = $scope.row.NombreAduana;
                          //$rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion = $scope.row.CodigoTipoOperacion;

                          //$rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion = $scope.row.CodigoTipoOperacion;
                          //$rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion = "1";
                          var Var_CodigoTipoOperacion = $scope.row.CodigoTipoOperacion * 1;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion = Var_CodigoTipoOperacion;

                          //$rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoOperacion = $scope.row.NombreTipoOperacion;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoLugarCarga = $scope.row.CodigoTipoLugarCarga;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCarga = $scope.row.NombreTipoLugarCarga;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoOperadorEmbarqueItinerario = $scope.row.CodigoOperadorEmbarqueItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorEmbarqueItinerario = $scope.row.NombreOperadorEmbarqueItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoOperadorDescargaItinerario = $scope.row.CodigoOperadorDescargaItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorDescargaItinerario = $scope.row.NombreOperadorDescargaItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoAgenteMaritimoItinerario = $scope.row.CodigoAgenteMaritimoItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAgenteMaritimoItinerario = $scope.row.NombreAgenteMaritimoItinerario;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoLugarCargaPuertoIntermedio = $scope.row.CodigoTipoLugarCargaPuertoIntermedio;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCargaPuertoIntermedio = $scope.row.NombreTipoLugarCargaPuertoIntermedio;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoPuertoIntermedio = $scope.row.CodigoPuertoIntermedio;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombrePuertoIntermedio = $scope.row.NombrePuertoIntermedio;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.Accion = "U";
                          $scope.FlagEditing = false;
                      } else {
                          $scope.FlagEditing = true;
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoItinerario = ""
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NumeroViajeItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NumeroManifiestoItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.AnioManifiestoItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaArriboItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaZarpeItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaAtraqueItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaTerminoDescargaItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.DUEItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CapitanNaveItinerario = ""
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.FechaZarpePuertoIntermedio = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.Voyage = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoNave = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreNave = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoAduana = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAduana = "";
                          //$rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion = "";
                          //$rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoOperacion = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoLugarCarga = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCarga = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoOperadorEmbarqueItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorEmbarqueItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoOperadorDescargaItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorDescargaItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoAgenteMaritimoItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAgenteMaritimoItinerario = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoLugarCargaPuertoIntermedio = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCargaPuertoIntermedio = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoPuertoIntermedio = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombrePuertoIntermedio = "";
                          $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.Accion = "I";

                          LimpiarFormulario();
                      }
                  }
              });
          }

          function registrarItinerario() {
              $rootScope.DatosFormulario.OpcionItinerario = "RegistrarItinerario";
              var objRequest = { "request": $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos };
              $.ajax({
                  url: "/Itinerario/RegistrarItinerario",
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
                  var objRequest = $rootScope.DatosFormulario.AdministrarItinerario.Filtro;
                  $scope.gridapigrillaListaMaestroItinerario.find(objRequest);
                  $rootScope.DatosFormulario.AdministrarItinerario.ListaMaestroItinerario = [];
              }
              $scope.$parent.SalirPopup_Click();
          }

          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NumeroViajeItinerario == undefined) {
                  $(".caja11.msgerror.NumeroViajeItinerario").html("Viaje es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NumeroViajeItinerario.length <= 0) {
                  $(".caja11.msgerror.NumeroViajeItinerario").html("Viaje es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NumeroViajeItinerario").html("");
              }


              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CapitanNaveItinerario == undefined) {
                  $(".caja11.msgerror.CapitanNaveItinerario").html("Capitan es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CapitanNaveItinerario.length <= 0) {
                  $(".caja11.msgerror.CapitanNaveItinerario").html("Capitan es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CapitanNaveItinerario").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreNave == undefined) {
                  $(".caja11.msgerror.NombreNave").html("Nave es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreNave.length <= 0) {
                  $(".caja11.msgerror.NombreNave").html("Nave es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreNave").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAduana == undefined) {
                  $(".caja11.msgerror.NombreAduana").html("Aduana es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAduana.length <= 0) {
                  $(".caja11.msgerror.NombreAduana").html("Aduana es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreAduana").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion == undefined) {
                  $(".caja11.msgerror.CodigoTipoOperacion").html("Tipo de Operacion es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.CodigoTipoOperacion.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoOperacion").html("Tipo de Operacion es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoTipoOperacion").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCarga == undefined) {
                  $(".caja11.msgerror.NombreTipoLugarCarga").html("Tipo Lugar de Carga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCarga.length <= 0) {
                  $(".caja11.msgerror.NombreTipoLugarCarga").html("Tipo Lugar de Carga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoLugarCarga").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorEmbarqueItinerario == undefined) {
                  $(".caja11.msgerror.NombreOperadorEmbarqueItinerario").html("Operador de Embarque es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorEmbarqueItinerario.length <= 0) {
                  $(".caja11.msgerror.NombreOperadorEmbarqueItinerario").html("Operador de Embarque es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreOperadorEmbarqueItinerario").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorDescargaItinerario == undefined) {
                  $(".caja11.msgerror.NombreOperadorDescargaItinerario").html("Operador de Descarga es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreOperadorDescargaItinerario.length <= 0) {
                  $(".caja11.msgerror.NombreOperadorDescargaItinerario").html("Operador de Descarga es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreOperadorDescargaItinerario").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAgenteMaritimoItinerario == undefined) {
                  $(".caja11.msgerror.NombreAgenteMaritimoItinerario").html("Agente Maritimo es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreAgenteMaritimoItinerario.length <= 0) {
                  $(".caja11.msgerror.NombreAgenteMaritimoItinerario").html("Agente Maritimo es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreAgenteMaritimoItinerario").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCargaPuertoIntermedio == undefined) {
                  $(".caja11.msgerror.NombreTipoLugarCargaPuertoIntermedio").html("Tipo Lugar de Carga de Puerto Intermedio es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombreTipoLugarCargaPuertoIntermedio.length <= 0) {
                  $(".caja11.msgerror.NombreTipoLugarCargaPuertoIntermedio").html("Tipo Lugar de Carga de Puerto Intermedio es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombreTipoLugarCargaPuertoIntermedio").html("");
              }

              if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombrePuertoIntermedio == undefined) {
                  $(".caja11.msgerror.NombrePuertoIntermedio").html("Puerto Intermedio es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.NombrePuertoIntermedio.length <= 0) {
                  $(".caja11.msgerror.NombrePuertoIntermedio").html("Puerto Intermedio es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NombrePuertoIntermedio").html("");
              }

              //if (validarHoraArriboItinerario()) {
              //} else {
              //    salida = false;
              //    $(".caja11.msgerror.HoraArriboItinerario").html("Por favor ingrese una hora válida. El formato debe ser HH:mm.");
              //}

              //if (validarHoraZarpeItinerario()) {
              //} else {
              //    salida = false;
              //    $(".caja11.msgerror.HoraZarpeItinerario").html("Por favor ingrese una hora válida. El formato debe ser HH:mm.");
              //}

              //if (validarHoraAtraqueItinerario()) {
              //} else {
              //    salida = false;
              //    $(".caja11.msgerror.HoraAtraqueItinerario").html("Por favor ingrese una hora válida. El formato debe ser HH:mm.");
              //}

              //if (validarHoraTerminoDescargaItinerario()) {
              //} else {
              //    salida = false;
              //    $(".caja11.msgerror.HoraTerminoDescargaItinerario").html("Por favor ingrese una hora válida. El formato debe ser HH:mm.");
              //}

              //if (validarHoraZarpePuertoIntermedio()) {
              //} else {
              //    salida = false;
              //    $(".caja11.msgerror.HoraZarpePuertoIntermedio").html("Por favor ingrese una hora válida. El formato debe ser HH:mm.");
              //}
              return salida;
          }

          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  registrarItinerario();
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

          $scope.BuscarNaveRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionNave = "RegistroItinerario";
              getPopupResponsive({
                  formURL: "Nave/BuscarNave",
                  title: "Buscar Nave",
                  nombreDiv: "divPopupBuscarNave",
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
                      $compile($("#divPopupBuscarNave"))($scope);
                  }
              });
          }

          $scope.BuscarAduanaRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionAduana = "RegistroItinerario";
              getPopupResponsive({
                  formURL: "Aduana/BuscarAduana",
                  title: "Buscar Aduana",
                  nombreDiv: "divPopupBuscarAduana",
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
                      $compile($("#divPopupBuscarAduana"))($scope);
                  }
              });
          }

          $scope.BuscarTipoOperacionRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoOperacion = "RegistroItinerario";
              getPopupResponsive({
                  formURL: "TipoOperacion/BuscarTipoOperacion",
                  title: "Buscar Tipo de Operacion",
                  nombreDiv: "divPopupBuscarTipoOperacion",
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
                      $compile($("#divPopupBuscarTipoOperacion"))($scope);
                  }
              });
          }

          $scope.BuscarAgenteMaritimoItinerarioRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionAgenteMaritimoItinerario = "RegistroItinerarioAM";
              $rootScope.DatosFormulario.OpcionOperadorEmbarqueItinerario = "";
              $rootScope.DatosFormulario.OpcionOperadorDescargaItinerario = "";

              getPopupResponsive({
                  formURL: "PersonaxRol/BuscarPersonaxRol",
                  title: "Buscar Agente Maritimo",
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

          $scope.BuscarOperadorEmbarqueItinerarioRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionOperadorEmbarqueItinerario = "RegistroItinerarioOE";
              $rootScope.DatosFormulario.OpcionAgenteMaritimoItinerario = "";
              $rootScope.DatosFormulario.OpcionOperadorDescargaItinerario = "";

              getPopupResponsive({
                  formURL: "PersonaxRol/BuscarPersonaxRol",
                  title: "Buscar Operador Embarque",
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

          $scope.BuscarOperadorDescargaItinerarioRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionOperadorDescargaItinerario = "RegistroItinerarioOD";
              $rootScope.DatosFormulario.OpcionAgenteMaritimoItinerario = "";
              $rootScope.DatosFormulario.OpcionOperadorEmbarqueItinerario = "";

              getPopupResponsive({
                  formURL: "PersonaxRol/BuscarPersonaxRol",
                  title: "Buscar Operador Descarga",
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

          //$scope.BuscarNaveRegistro_Click = function () {
          //    $rootScope.DatosFormulario.OpcionNave = "RegistroItinerario";
          //    getPopupResponsive({
          //        formURL: "Nave/BuscarNave",
          //        title: "Buscar Nave",
          //        nombreDiv: "divPopupBuscarNave",
          //        nombreGrid: "",
          //        width: "1200px",
          //        height: 800,
          //        params: {},
          //        HideSelection: true,
          //        multiSelect: false,
          //        select: function (row) {
          //            return true;
          //        },
          //        beforeShow: function (obj) {
          //            $rootScope.hashPopup = $(obj).attr("mapurl");
          //            $compile($("#divPopupBuscarNave"))($scope);
          //        }
          //    });
          //}

          $scope.BuscarTipoLugarCargaRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoLugarCarga = "RegistroItinerario";
              $rootScope.DatosFormulario.OpcionTipoLugarCargaPuertoIntermedio = "";
              getPopupResponsive({
                  formURL: "TipoLugarCarga/BuscarTipoLugarCarga",
                  title: "Buscar Tipo de Lugar de Carga",
                  nombreDiv: "divPopupBuscarTipoLugarCarga",
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
                      $compile($("#divPopupBuscarTipoLugarCarga"))($scope);
                  }
              });
          }

          $scope.BuscarTipoLugarCargaPuertoIntermedioRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoLugarCargaPuertoIntermedio = "RegistroItinerarioPuertoIntermedio";
              $rootScope.DatosFormulario.OpcionTipoLugarCarga = "";
              getPopupResponsive({
                  formURL: "TipoLugarCarga/BuscarTipoLugarCarga",
                  title: "Buscar Tipo de Lugar de Carga del Puerto Intermedio",
                  nombreDiv: "divPopupBuscarTipoLugarCarga",
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
                      $compile($("#divPopupBuscarTipoLugarCarga"))($scope);
                  }
              });
          }

          $scope.BuscarPuertoIntermedioRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionPuerto = "RegistroItinerario";
              getPopupResponsive({
                  formURL: "Puerto/BuscarPuerto",
                  title: "Buscar Puerto Intermedio",
                  nombreDiv: "divPopupBuscarPuerto",
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
                      $compile($("#divPopupBuscarPuerto"))($scope);
                  }
              });
          }

          function LimpiarFormulario() {
              $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraArriboItinerario = "";
              $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpeItinerario = "";
              $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraAtraqueItinerario = "";
              $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraTerminoDescargaItinerario = "";
              $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpePuertoIntermedio = "";
          }

          //function validarHoraArriboItinerario() {
          //    var salida = true;
          //    if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraArriboItinerario) {
          //        if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraArriboItinerario.length > 0) {
          //            var datosHora = $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraArriboItinerario.split(":");
          //            if (datosHora.length > 0) {
          //                if ($.isNumeric(datosHora[0]) && $.isNumeric(datosHora[1])) {
          //                    if (datosHora[0].length == 2) {
          //                        var dato1 = datosHora[0];
          //                        if (dato1 < 25) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }

          //                    if (datosHora[1].length == 2) {
          //                        var dato2 = datosHora[1];
          //                        if (dato2 < 60) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }
          //                } else {
          //                    salida = false;
          //                }
          //            } else {
          //                salida = false;
          //            }
          //        }
          //    }
          //    return salida;
          //}

          //function validarHoraZarpeItinerario() {
          //    var salida = true;
          //    if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpeItinerario) {
          //        if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpeItinerario.length > 0) {
          //            var datosHora = $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpeItinerario.split(":");
          //            if (datosHora.length > 0) {
          //                if ($.isNumeric(datosHora[0]) && $.isNumeric(datosHora[1])) {
          //                    if (datosHora[0].length == 2) {
          //                        var dato1 = datosHora[0];
          //                        if (dato1 < 25) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }

          //                    if (datosHora[1].length == 2) {
          //                        var dato2 = datosHora[1];
          //                        if (dato2 < 60) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }
          //                } else {
          //                    salida = false;
          //                }
          //            } else {
          //                salida = false;
          //            }
          //        }
          //    }
          //    return salida;
          //}

          //function validarHoraAtraqueItinerario() {
          //    var salida = true;
          //    if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraAtraqueItinerario) {
          //        if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraAtraqueItinerario.length > 0) {
          //            var datosHora = $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraAtraqueItinerario.split(":");
          //            if (datosHora.length > 0) {
          //                if ($.isNumeric(datosHora[0]) && $.isNumeric(datosHora[1])) {
          //                    if (datosHora[0].length == 2) {
          //                        var dato1 = datosHora[0];
          //                        if (dato1 < 25) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }

          //                    if (datosHora[1].length == 2) {
          //                        var dato2 = datosHora[1];
          //                        if (dato2 < 60) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }
          //                } else {
          //                    salida = false;
          //                }
          //            } else {
          //                salida = false;
          //            }
          //        }
          //    }
          //    return salida;
          //}

          //function validarHoraTerminoDescargaItinerario() {
          //    var salida = true;
          //    if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraTerminoDescargaItinerario) {
          //        if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraTerminoDescargaItinerario.length > 0) {
          //            var datosHora = $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraTerminoDescargaItinerario.split(":");
          //            if (datosHora.length > 0) {
          //                if ($.isNumeric(datosHora[0]) && $.isNumeric(datosHora[1])) {
          //                    if (datosHora[0].length == 2) {
          //                        var dato1 = datosHora[0];
          //                        if (dato1 < 25) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }

          //                    if (datosHora[1].length == 2) {
          //                        var dato2 = datosHora[1];
          //                        if (dato2 < 60) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }
          //                } else {
          //                    salida = false;
          //                }
          //            } else {
          //                salida = false;
          //            }
          //        }
          //    }
          //    return salida;
          //}

          //function validarHoraZarpePuertoIntermedio() {
          //    var salida = true;
          //    if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpePuertoIntermedio) {
          //        if ($rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpePuertoIntermedio.length > 0) {
          //            var datosHora = $rootScope.DatosFormulario.AdministrarItinerario.RegistroDatos.HoraZarpePuertoIntermedio.split(":");
          //            if (datosHora.length > 0) {
          //                if ($.isNumeric(datosHora[0]) && $.isNumeric(datosHora[1])) {
          //                    if (datosHora[0].length == 2) {
          //                        var dato1 = datosHora[0];
          //                        if (dato1 < 25) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }

          //                    if (datosHora[1].length == 2) {
          //                        var dato2 = datosHora[1];
          //                        if (dato2 < 60) {

          //                        } else {
          //                            salida = false;
          //                        }
          //                    } else {
          //                        salida = false;
          //                    }
          //                } else {
          //                    salida = false;
          //                }
          //            } else {
          //                salida = false;
          //            }
          //        }
          //    }
          //    return salida;
          //}
      }]);
})();