(function () {
    angular.module('api')
    .controller('RegistroNotificacionController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          function getUrlVars() {
              var vars = [], hash;
              var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
              for (var i = 0; i < hashes.length; i++) {
                  hash = hashes[i].split('=');
                  vars.push(hash[0]);
                  vars[hash[0]] = hash[1];
              }
              return vars;
          }
          $timeout(function () {
             if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroNotificacion == undefined)
                  $rootScope.DatosFormulario.RegistroNotificacion = new Object();
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosView == undefined)
                  $rootScope.DatosFormulario.RegistroNotificacion.DatosView = new Object();
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro == undefined)
                  $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro = new Object();

              var paramCodigo = getUrlVars()["CodigoNotificacion"];
              if (paramCodigo) {
                  $rootScope.DatosFormulario.RegistroNotificacion.DatosView.FlagEditar = true;
                  $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoNotificacion = paramCodigo;
              }
              $rootScope.DatosFormulario.RegistroNotificacion.DatosView.FlagEditar = true;
              var esEditar = $rootScope.DatosFormulario.RegistroNotificacion.DatosView.FlagEditar;
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoNotificacion = 9 ;
              $scope.DatosNotificacionIndex();
              if (esEditar) {
                  $scope.FlagMostrarBotonGuardar = false;
                  $scope.FlagMostrarBotonModificar = true;
                  $scope.FlagMostrarBotonDeshabilitar = true;
                  $scope.FlagEditing = false;
                  $scope.EnabledDisabledJqte(false);
              } else {
                  $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Accion = "I";
                  $scope.FlagMostrarBotonGuardar = true;
                  $scope.FlagEditing = true;
                  $scope.EnabledDisabledJqte(true);
              }
              $scope.EditingForms();
             $(".InputTEXT_04Fecha").prop('disabled', true);
             $('.timepicker').timeEntry({ show24Hours: true });
            
          });
          $scope.DatosNotificacionIndex = function () {
              $.ajax({
                  url: "/Notificacion/RegistroNotificacionIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.RegistroNotificacion.DatosView.ListLinea = data.ListLinea;
                      $rootScope.DatosFormulario.RegistroNotificacion.DatosView.ListTipoFrecuencia = data.ListTipoFrecuencia;
                      $rootScope.DatosFormulario.RegistroNotificacion.DatosView.MinDateProgramacion = data.FechaToday;
                      if (data.ListLinea.length > 0) {
                          $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoLinea = data.ListLinea[0].Codigo;
                          if (data.ListLinea.length == 1) {
                              $rootScope.DatosFormulario.RegistroNotificacion.DatosView.Habilitado = 'False';
                          }
                      }
                      var objEdition = new Object();
                      objEdition.CodigoLinea = $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoLinea;
                      objEdition.CodigoNotificacion = $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoNotificacion;
                      var objRequest = { "request": objEdition };
                      $scope.CargarDatosNotificacion(objRequest);

                      $("#MaxDateProgramacion").datepicker("option", "minDate", data.FechaToday);
                  }
              });
          }
          $scope.Salir_Click = function () {
              window.location.href = "/#!/sistema/bienvenido/";
          }
          $scope.Modificar_Click = function () {
              $scope.FlagMostrarBotonGuardar = true;
              $scope.FlagMostrarBotonModificar = false;
              $scope.FlagMostrarBotonDeshabilitar = false;
              $scope.FlagEditing = true;
              $scope.EnabledDisabledJqte(true);
              $scope.EditingForms();
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $scope.EnabledDisabledJqte = function (status) {
              if (status) {
                  $("#DetalleCorreoBody").find(".jqte_editor").attr("contenteditable", "true");
                  $("#DetalleCorreoBody").find(".jqte_toolbar ").show();
              } else {
                  $("#DetalleCorreoBody").find(".jqte_editor").attr("contenteditable", "false");
                  $("#DetalleCorreoBody").find(".jqte_toolbar ").hide();
              }
          }
          $scope.EditingForms = function () {
              var arrayContentFechas = new Array();
              arrayContentFechas.push("frmProgramacion");
              ReadOnlyForm([], $scope.FlagEditing, arrayContentFechas);
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          
          $('#detalleNotificacion').jqte();
        
          function miAlertOkSuccess() {
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosView.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.RegistroNotificacion.DatosView.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/bienvenido/";
              }
          }
          $scope.Deshabilitar_Click = function () {
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoNotificacion > 0) {
                  MiConfirm("¿Está seguro de desactivar la Notificación?.", function () {
                      $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.EstadoRegistro = false;
                      $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.DetalleCorreo = encodeURI($("#detalleNotificacion").val());
                      //url: "/Notificacion/DesactivarNotificacion",
                      $.ajax({
                          url: "/Notificacion/ActualizarNotificacion",
                          type: "POST",
                          headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                          data: $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro,
                          dataType: "json",
                          cache: true,
                          async: false,
                          success: function (data) {
                              if (data.Result != null) {
                                  if (data.Result.Satisfactorio === true) {
                                      MiAlertOk("Se ha desactivado la Notificación.", miAlertOkSuccess);
                                  }
                                  else {
                                      if (data.Result.Mensajes.length > 0) {
                                          MiError(data.Result.Mensajes[0].Mensaje);
                                      } else {
                                          MiError(data.Result.Mensaje);
                                      }
                                  }
                              } else {
                                  MiAlert("Ocurrió un problema interno en el sistema.");
                              }
                          }
                      });
                  });
              }
          }
    function guardarNotificacion() {
        /*      miBlock(true, "#html");
              $.ajax({
                  url: "/Notificacion/RegistrarNotificacion",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("Se ha grabado correctamente la Notificación.", miAlertOkSuccess);
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
              */
          }
          function actualizarNotificacion() {
              miBlock(true, "#html");
              $.ajax({
                  url: "/Notificacion/ActualizarNotificacion",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("Se ha actualizado correctamente la Notificación.", miAlertOkSuccess);
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
          function validacionesCamposGuardar() {
              var salida = true;
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Frecuencia == undefined) {
                  $(".caja11.msgerror.Frecuencia").html("Frecuencia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Frecuencia.length <= 0) {
                  $(".caja11.msgerror.Frecuencia").html("Frecuencia es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.Frecuencia").html("");
              }
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoTipoFrecuencia == undefined) {
                  $(".caja11.msgerror.CodigoTipoFrecuencia").html("Frecuencia es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoTipoFrecuencia.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoFrecuencia").html("Frecuencia es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoTipoFrecuencia").html("");
              }

              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Asunto == undefined) {
                  $(".caja11.msgerror.Asunto").html("Asunto es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Asunto.length <= 0) {
                  $(".caja11.msgerror.Asunto").html("Asunto es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.Asunto").html("");
              }
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.FechaHoraEjecucion == undefined) {
                  $(".caja11.msgerror.FechaHoraEjecucion").html("Fecha de Ejecución es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.FechaHoraEjecucion.length <= 0) {
                  $(".caja11.msgerror.FechaHoraEjecucion").html("Fecha de Ejecución es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.FechaHoraEjecucion").html("");
              }
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.HoraEjecucion == undefined) {
                  $(".caja11.msgerror.HoraEjecucion").html("Hora de Ejecución es requerido. El formato debe ser HH:mm.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.HoraEjecucion.length <= 0) {
                  $(".caja11.msgerror.HoraEjecucion").html("Hora de Ejecución es requerido. El formato debe ser HH:mm.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.HoraEjecucion").html("");
              }
              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.DetalleCorreo == undefined) {
                  $(".caja11.msgerror.DetalleCorreo").html("Detalle de  Correo es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.DetalleCorreo.length <= 0) {
                  $(".caja11.msgerror.DetalleCorreo").html("Detalle de  Correo es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.DetalleCorreo").html("");
              }
              return salida;
          }
          $scope.Guardar_Click = function () {
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.DetalleCorreo = encodeURI($("#detalleNotificacion").val());
              var validacion = validacionesCamposGuardar();
              if (validacion == false) {
                  return false;
              }

              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoNotificacion > 0) {
                  $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.EstadoRegistro = true;
                  actualizarNotificacion();
              } else {
                  $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.EstadoRegistro = true;
                  guardarNotificacion();
              }
          }
          $scope.ChangeLinea = function () {
              var objEdition = new Object();
              objEdition.CodigoLinea = $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoLinea;
              objEdition.CodigoNotificacion = $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoNotificacion;
              var objRequest = { "request": objEdition };
              $scope.CargarDatosNotificacion(objRequest);
          }

          $scope.CargarDatosNotificacion = function (objRequest) {
              $.ajax({
                  url: "/Notificacion/ConsultarDetalleNotificacion",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.DetalleBlNotificacionList.length > 0) {
                              $scope.FlagMostrarBotonGuardar = true;
                              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro = data.DetalleBlNotificacionList[0];
                              if ($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.EstadoRegistro == "False") {
                                  $scope.FlagMostrarBotonGuardar = false;
                                  $scope.FlagMostrarBotonModificar = false;
                                  $scope.FlagMostrarBotonDeshabilitar = false;
                              }
                              $("#detalleNotificacion").jqteVal($rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.DetalleCorreo);
                          } else {
                              $scope.FlagMostrarBotonGuardar = false;
                              $scope.FlagMostrarBotonModificar = false;
                              $scope.FlagMostrarBotonDeshabilitar = false;
                              $scope.LimpiarForm();
                          }
                      } else {
                          $scope.LimpiarForm();
                          $scope.FlagMostrarBotonGuardar = false;
                          $scope.FlagMostrarBotonModificar = false;
                          $scope.FlagMostrarBotonDeshabilitar = false;
                      }
                  }
              });
          }
          $scope.LimpiarForm = function () {
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoNotificacion = 0;
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.FechaHoraEjecucion = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.HoraEjecucion = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Frecuencia = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.CodigoTipoFrecuencia = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Asunto = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.Nombre = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.DetalleCorreo = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.UsuarioCreacion = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.FechaHoraCreacion = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.UsuarioActualizacion = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.FechaHoraActualizacion = "";
              $rootScope.DatosFormulario.RegistroNotificacion.DatosRegistro.EstadoRegistro = false;
              $("#detalleNotificacion").jqteVal("");
          }
      }]);
})();