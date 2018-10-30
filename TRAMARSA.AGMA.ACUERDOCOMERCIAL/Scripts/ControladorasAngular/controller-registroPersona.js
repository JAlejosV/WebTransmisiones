(function () {
    angular.module('api')
    .controller('RegistroPersonaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroPersona == undefined)
                  $rootScope.DatosFormulario.RegistroPersona = new Object();
              if ($rootScope.DatosFormulario.RegistroPersona.DatosPersona == undefined)
                  $rootScope.DatosFormulario.RegistroPersona.DatosPersona = new Object();
              if ($rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona == undefined)
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona = new Object();

              if ($rootScope.DatosFormulario.RegistroPersona.DatosPersona.ConfiguracionSecciones == undefined)
                  $rootScope.DatosFormulario.RegistroPersona.DatosPersona.ConfiguracionSecciones = new Object();

              var paramCodigo = getUrlVars()["codigoPersona"];
              if (paramCodigo) {
                  $rootScope.DatosFormulario.RegistroPersona.DatosPersona.PersonaFlagEditar = true;
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona = paramCodigo;
              }

              //JAV CargaInicial MaxLength


              //FIN

              var esEditar = $rootScope.DatosFormulario.RegistroPersona.DatosPersona.PersonaFlagEditar;
              var esSeguimiento = $rootScope.DatosFormulario.RegistroPersona.DatosPersona.PersonaFlagSeguimiento;
              //$scope.CargarDatosIniciales();
              $scope.CargarRol();
              if (esEditar) {
                  $scope.FlagMostrarBotonGuardar = false;
                  $scope.FlagMostrarBotonModificar = true;
                  //$scope.FlagMostrarBotonHistorial = true;
                  $scope.FlagMostrarBotonDeshabilitar = true;
                  $rootScope.DatosFormulario.RegistroPersona.PersonaRecoverOriginalDataView = new Object();
                  $scope.CargaInicialPersona();
                  $scope.FlagEditing = false;
              } else {
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.EstadoRegistro = true;
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona = 0;
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.Accion = "I";
                  $scope.FlagMostrarBotonGuardar = true;
                  $scope.FlagEditing = true;
              }
              if (esSeguimiento) {
                  $scope.FlagMostrarBotonModificar = false;
                  $scope.FlagMostrarBotonDeshabilitar = false;
              }
              //$scope.MaxLengthCampoCodigoAduanaROL();
              $scope.EditingGrillas(); 
          });


          $scope.CargarRol = function () {
              $rootScope.DatosFormulario.RegistroPersona.ListaRol = ObtenerRoles();
              $scope.gridapiListaRoles.refresh($rootScope.DatosFormulario.RegistroPersona.ListaRol);
          }

          $scope.BuscarTipoDocumentoRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionTipoDocumento = "RegistroPersona";
              getPopupResponsive({
                  formURL: "TipoDocumento/BuscarTipoDocumento",
                  title: "Buscar Tipo Documento",
                  nombreDiv: "divPopupBuscarTipoDocumento",
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
                      $compile($("#divPopupBuscarTipoDocumento"))($scope);
                  }
              });
          }

          $scope.BuscarPaisRegistro_Click = function () {
              $rootScope.DatosFormulario.OpcionPais = "RegistroPersona";
              getPopupResponsive({
                  formURL: "Pais/BuscarPais",
                  title: "Buscar Pais",
                  nombreDiv: "divPopupBuscarPais",
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
                      $compile($("#divPopupBuscarPais"))($scope);
                  }
              });
          }

          $scope.CargaInicialPersona = function () {
              var param = $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona;
              $.ajax({
                  url: "/Persona/ConsultarDetallePersona",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoPersona=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.ListaDetallePersona.length > 0) {
                              //codRol
                              //$rootScope.DatosFormulario.RegistroPersona.ListaRol = data.ListaDetallePersona[0].ListMatchRol; //JM
                              $rootScope.DatosFormulario.RegistroPersona.ListaRol = data.ListaDetallePersona[0].ListaRol;
                              if (data.ListaDetallePersona[0].ListaPersonaRol.length > 0) {
                                  for (var number = 0; number < data.ListaDetallePersona[0].ListaPersonaRol.length; number++) {
                                      for (var z = 0; z < $rootScope.DatosFormulario.RegistroPersona.ListaRol.length; z++) {
                                          if ($rootScope.DatosFormulario.RegistroPersona.ListaRol[z].CodigoRol == data.ListaDetallePersona[0].ListaPersonaRol[number].CodigoRol) {
                                              $rootScope.DatosFormulario.RegistroPersona.ListaRol[z].idCheck = true;
                                              $rootScope.DatosFormulario.RegistroPersona.ListaRol[z].CodigoAduanaPersonaRol = data.ListaDetallePersona[0].ListaPersonaRol[number].CodigoAduanaPersonaRol;
                                              $rootScope.DatosFormulario.RegistroPersona.ListaRol[z].Accion = "U";
                                              $scope.CheckItem_Rol($rootScope.DatosFormulario.RegistroPersona.ListaRol[z]);
                                          } else {
                                              $rootScope.DatosFormulario.RegistroPersona.ListaRol[z].Accion = "";
                                          }
                                      }
                                  }
                                  $rootScope.DatosFormulario.RegistroPersona.DatosPersona.ListaRolEdit = data.ListaDetallePersona[0].ListaPersonaRol;
                              }

                              //Datos generales
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoTipoDocumento = data.ListaDetallePersona[0].CodigoTipoDocumento;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPais = data.ListaDetallePersona[0].CodigoPais;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.RazonSocialPersona = data.ListaDetallePersona[0].RazonSocialPersona;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NumeroDocumentoPersona = data.ListaDetallePersona[0].NumeroDocumentoPersona;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.DireccionPersona = data.ListaDetallePersona[0].DireccionPersona;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.TelefonoPersona = data.ListaDetallePersona[0].TelefonoPersona;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.EmailPersona = data.ListaDetallePersona[0].EmailPersona;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.ContactoPersona = data.ListaDetallePersona[0].ContactoPersona;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.WebPersona = data.ListaDetallePersona[0].WebPersona;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.Accion = data.ListaDetallePersona[0].Accion;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.FechaHoraCreacion = data.ListaDetallePersona[0].FechaHoraCreacion;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.FechaHoraActualizacion = data.ListaDetallePersona[0].FechaHoraActualizacion;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.UsuarioActualizacion = data.ListaDetallePersona[0].UsuarioActualizacion;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.UsuarioCreacion = data.ListaDetallePersona[0].UsuarioCreacion;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.EstadoRegistro = data.ListaDetallePersona[0].EstadoRegistro;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona = data.ListaDetallePersona[0].CodigoPersona;

                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NombreTipoDocumento = data.ListaDetallePersona[0].NombreTipoDocumento;
                              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NombrePais = data.ListaDetallePersona[0].NombrePais;

                              //Original cabecera
                              //$rootScope.DatosFormulario.RegistroPersona.AceRecoverOriginalDataView.CodigoLinea = data.ListaDetallePersona[0].CodigoLinea;
                              //$rootScope.DatosFormulario.RegistroPersona.AceRecoverOriginalDataView.CodigoUsuarioAutorizador = data.ListaDetallePersona[0].CodigoUsuarioAutorizador;
                              //$rootScope.DatosFormulario.RegistroPersona.AceRecoverOriginalDataView.FechaAutorizacion = data.ListaDetallePersona[0].FechaAutorizacion;
                              //$rootScope.DatosFormulario.RegistroPersona.AceRecoverOriginalDataView.InicioVigencia = data.ListaDetallePersona[0].InicioVigencia;
                              //$rootScope.DatosFormulario.RegistroPersona.AceRecoverOriginalDataView.FinVigencia = data.ListaDetallePersona[0].FinVigencia;
                              //$rootScope.DatosFormulario.RegistroPersona.AceRecoverOriginalDataView.CodigoTipoCondicion = data.ListaDetallePersona[0].CodigoTipoCondicion;
                              //fin original
                              if (!data.ListaDetallePersona[0].EstadoRegistro) {
                                  $scope.FlagMostrarBotonModificar = false;
                                  $scope.FlagMostrarBotonDeshabilitar = false;
                              }

                              //Grillas
                              $scope.gridapiListaRoles.refresh($rootScope.DatosFormulario.RegistroPersona.ListaRol);
                          }
                      }
                  }
              });
          }

          $scope.CheckItem_Rol = function (row) {
              row.idCheck;
              if (row.idCheck) {
                  $rootScope.DatosFormulario.RegistroPersona.DatosPersona.CodigoRolActual = row.Codigo;
              }
          }

          $scope.Grid_DataBind = function (grid, data) {
              if (grid == "DetalleRol") {
                  $scope.gridapiListaRoles.insertRange(data);
              }
          }

          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 100);
              if (idgrilla == "grillaListaRoles") {
                  $.each($rootScope.DatosFormulario.RegistroPersona.ListaRol, function (x) { this.idCheck = check; });
              }
          }

          $scope.Guardar_Click = function () {
              //Rol
              var listaRolGrabar = [];
              var listaRoles = $from($rootScope.DatosFormulario.RegistroPersona.ListaRol).where("$idCheck==true").toArray();
              for (var x = 0; x < listaRoles.length; x++) {
                  var objRolTmp = new Object();
                  objRolTmp.CodigoPersona = $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona;
                  objRolTmp.CodigoRol = listaRoles[x].CodigoRol;
                  objRolTmp.CodigoAduanaPersonaRol = listaRoles[x].CodigoAduanaPersonaRol;
                  objRolTmp.Accion = "I";
                  listaRolGrabar.push(objRolTmp);
              }
              if ($rootScope.DatosFormulario.RegistroPersona.DatosPersona.PersonaFlagEditar && $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona != 0) {
                  var listaEdit = $rootScope.DatosFormulario.RegistroPersona.DatosPersona.ListaRolEdit;
                  if (listaEdit.length > 0) {
                      for (var a = 0; a < listaEdit.length; a++) {
                          var exist = false;
                          for (var b = 0; b < listaRolGrabar.length; b++) {
                              if (listaRolGrabar[b].CodigoRol == listaEdit[a].CodigoRol
                                  && listaRolGrabar[b].CodigoPersona == listaEdit[a].CodigoPersona) {
                                  if (listaRolGrabar[b].CodigoAduanaPersonaRol != listaEdit[a].CodigoAduanaPersonaRol) {
                                      listaRolGrabar[b].Accion = 'U';
                                      exist = true;
                                  }
                                  else {
                                      listaRolGrabar.splice(b, 1);
                                      exist = true;
                                  }
                              }
                          }
                          if (!exist) {
                              var objRol = new Object();
                              objRol.CodigoPersona = listaEdit[a].CodigoPersona;
                              objRol.CodigoRol = listaEdit[a].CodigoRol;
                              objRol.Accion = "D";
                              listaRolGrabar.push(objRol);
                          }
                      }
                  }
              }

              //Seteo datos registro
              $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.ListaPersonaRol = listaRolGrabar;

              if ($rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.Accion != "I") {
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.Accion = determinarAccion($rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona);
              }

              var validacion = validacionesCamposGuardar();
              if (validacion == false) {
                  return false;
              }

              guardarPersona();
          }

          $scope.Deshabilitar_Click = function () {
              if ($rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.CodigoPersona > 0) {
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.EstadoRegistro = false;
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.Estado = "D";
                  $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.Accion = "U";
                  MiConfirm("¿Está seguro de deshabilitar a la Persona?.", function () {
                      $.ajax({
                          url: "/Persona/DeshabilitarPersona",
                          type: "POST",
                          headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                          data: $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona,
                          dataType: "json",
                          cache: true,
                          async: false,
                          success: function (data) {
                              if (data.Result != null) {
                                  if (data.Result.Satisfactorio === true) {
                                      MiAlertOk("Se ha deshabilitado a la Persona", MiAlertOk_success);
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

          $scope.Salir_Click = function () {
              if ($rootScope.DatosFormulario.RegistroPersona.DatosPersona.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.RegistroPersona.DatosPersona.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/busqueda/buscar-persona/";
              }
              $rootScope.DatosFormulario.RegistroPersona.FlagPersona = true;
          }
          $scope.Modificar_Click = function () {
              $scope.FlagMostrarBotonGuardar = true;
              $scope.FlagMostrarBotonModificar = false;
              $scope.FlagMostrarBotonDeshabilitar = false;
              $scope.FlagEditing = true;
              $scope.EditingGrillas();
          }

          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaListaRoles");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, []);
          }

          function determinarAccion(objGrabar) {
              var actionU = "U";
              var actionN = "N";
              var viewInitialData = $rootScope.DatosFormulario.RegistroPersona.PersonaRecoverOriginalDataView;
              if (viewInitialData != undefined) {
                  if (objGrabar.CodigoLinea != viewInitialData.CodigoLinea) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoPersona != viewInitialData.CodigoPersona) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoTipoDocumento != viewInitialData.CodigoTipoDocumento) {
                      return actionU;
                  }
                  else if (objGrabar.CodigoPais != viewInitialData.CodigoPais) {
                      return actionU;
                  }
                  else {
                      return actionN;
                  }
              } else {
                  return actionU;
              }
          }

          function guardarPersona() {
              miBlock(true, "#html");
              $.ajax({
                  url: "/Persona/GrabarPersona",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              if ($rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.Accion == 'I') {
                                  MiAlertOk("Se ha grabado correctamente la Persona", MiAlertOk_success);
                              } else {
                                  MiAlertOk("Se ha actualizado correctamente la Persona", MiAlertOk_success);
                              }
                          }
                          else {
                              if (data.Result.Mensajes.length > 0) {
                                  MiAlert(data.Result.Mensaje);
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
              if ($rootScope.DatosFormulario.RegistroPersona.DatosPersona.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.RegistroPersona.DatosPersona.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/busqueda/buscar-persona/";
              }
          }

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
          function limpiarControlesValidados() {
              $(".caja11.listaRol").html("");
          }

          function validacionesCamposGuardar() {
              limpiarControlesValidados();
              miBlock(true, "#html");
              var salida = true;

              if (validateForm("#frmPersona_DatosGenerales") == false) {
                  miBlock(false, "#html");
                  salida = false;
              }

              var vRazonSocialPersona = $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.RazonSocialPersona;
              if (vRazonSocialPersona == undefined) {
                  $(".caja11.msgerror.RazonSocialPersona").html("Razon Social debe tener un valor.");
                  salida = false;
              }
              else if (vRazonSocialPersona.length <= 0) {
                  $(".caja11.msgerror.RazonSocialPersona").html("Razon Social debe tener un valor.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.RazonSocialPersona").html("");
              }

              var vNombreTipoDocumento = $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NombreTipoDocumento;
              if (vNombreTipoDocumento == undefined) {
                  $(".caja11.msgerror.NombreTipoDocumento").html("Tipo de Documento debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.NombreTipoDocumento").html("");
              }

              var vNumeroDocumentoPersona = $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NumeroDocumentoPersona;
              if (vNumeroDocumentoPersona == undefined && $rootScope.DatosFormulario.FlagDeshabilidadoNumeroDocumentoPersona != true) {
                  $(".caja11.msgerror.NumeroDocumentoPersona").html("Numero de Documento debe tener un valor.");
                  salida = false;
              }
              else if (vNumeroDocumentoPersona.length <= 0 && $rootScope.DatosFormulario.FlagDeshabilidadoNumeroDocumentoPersona != true) {
                  $(".caja11.msgerror.NumeroDocumentoPersona").html("Numero de Documento debe tener un valor.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.NumeroDocumentoPersona").html("");
              }

              var vNombrePais = $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.NombrePais;
              if (vNombrePais == undefined) {
                  $(".caja11.msgerror.NombrePais").html("Pais debe tener un valor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.NombrePais").html("");
              }

              var vDireccionPersona = $rootScope.DatosFormulario.RegistroPersona.DatosRegistroPersona.DireccionPersona;
              if (vDireccionPersona == undefined) {
                  $(".caja11.msgerror.DireccionPersona").html("Direccion debe tener un valor.");
                  salida = false;
              }
              else if (vDireccionPersona.length <= 0) {
                  $(".caja11.msgerror.DireccionPersona").html("Direccion debe tener un valor.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.DireccionPersona").html("");
              }

              //INICIO
              //var newListRol = $.grep($rootScope.DatosFormulario.RegistroPersona.ListaRol, function (e)
              //{ return e.Accion != "D"; });;

              ////$rootScope.DatosFormulario.RegistroPersona.ListaRol

              //if (newListRol.length > 0) {
              //    var isInco = false;
              //    for (var a = 0; a < newListRol.length; a++) {
              //        if (newListRol[a].CodigoAduanaPersonaRol == undefined) {
              //            isInco = true;
              //        } else if (newListRol[a].CodigoAduanaPersonaRol == null) {
              //            isInco = true;
              //        }
              //        else if (newListTarifa[a].CodigoAduanaPersonaRol == "") {
              //            isInco = true;
              //        }

              //    }
              //    if (isInco) {
              //        $(".caja11.msgerror.listaRol").html("Debe registrar Codigo Aduana.");
              //        salida = false;
              //    } else {
              //        $(".caja11.msgerror.listaRol").html("");
              //    }
              //}
              //FIN

              var listaRoles = $from($rootScope.DatosFormulario.RegistroPersona.ListaRol).where("$idCheck==true").toArray();;
              if (listaRoles.length <= 0) {
                  $(".caja11.msgerror.listaRol").html("Debe seleccionar por lo menos un Rol.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaRol").html("");
              }

              return salida;
          }

          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          //$rootScope.MaxLengthCampoCodigoAduanaROL = function () {
          //    var lstcontrolsInput = $("#grillaListaRoles").find('input[type="text"]');
          //    $.each(lstcontrolsInput, function (x, y) {
          //        $("#grillaListaRoles").find(lstcontrolsInput[x]).attr('maxlength', '4');
          //        /* if ($(lstcontrolsInput[x]).val().length <= 0) {
          //             $("#grillaListaRoles").find(lstcontrolsInput[x]).removeAttr('disabled');
          //         }
          //         else {
          //             $("#grillaListaRoles").find(lstcontrolsInput[x]).attr('disabled', 'disabled');
          //         }*/
          //    });

          //}
      }]);
})();