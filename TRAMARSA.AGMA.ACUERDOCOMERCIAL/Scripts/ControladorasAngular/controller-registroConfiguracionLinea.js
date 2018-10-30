(function () {
    angular.module('api')
    .controller('RegistroConfiguracionLineaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

      		      if ($rootScope.DatosFormulario == undefined)
                    $rootScope.DatosFormulario = new Object();
                if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea == undefined)
                    $rootScope.DatosFormulario.AdministrarConfiguracionLinea = new Object();
                if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos == undefined)
                    $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos = new Object();
                if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro == undefined)
                    $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro = new Object();
				 
                 var esEditar = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditar;                
          				
                 $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales  = [];
                 $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario = [];
                 $scope.gridapiListaSucursales.clear();
                 $scope.gridapiListaTerminalPortuario.clear();

                 $scope.CargarDatosIniciales();
                 if (esEditar) {
                      $scope.ObtenerDetalleConfiguracionLinea();
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.Accion = "U";
                      $scope.FlagMostrarBotonGuardar = false;
                      $scope.FlagMostrarBotonModificar = true;
                      //$scope.FlagMostrarBotonDeshabilitar = false;
                      $scope.FlagEditing = false;
                      $scope.FlagEditarLinea = false;

                  }else {
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.codigoConfiguracionLinea=0;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.Accion = "I";
                      $scope.FlagMostrarBotonGuardar = true;
                      $scope.FlagEditing = true;
                     $scope.FlagEditarLinea = true;
                 } 

              $scope.EditingGrillas();
          });
		  
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/ConfiguracionLinea/RegistrarConfiguracionLineaIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Lineas= data.Linea;
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.CodigoLinea = data.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Habilitado = 'False';
                          }
                      }

                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales = data.Sucursal;
                      $scope.Grid_DataBind("DetalleSucursal", $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales);

 
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionConcesionLocal = data.ListaConfiguracionSeccionConcesionLocal;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionConcesionEscalonada =  data.ListaConfiguracionSeccionConcesionEscalonada;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionAdmConcesionLocal =  data.ListaConfiguracionSeccionAdmConcesionLocal;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionAdmConcesionEscalonada =  data.ListaConfiguracionSeccionAdmConcesionEscalonada;
                     
                      $scope.gridapigrillaListaConfiguracionLineaAce.refresh(data.ListaConfiguracionSeccionConcesionEscalonada);
                      $scope.gridapigrillaListaConfiguracionLineaAdmAce.refresh(data.ListaConfiguracionSeccionAdmConcesionEscalonada);
                      $scope.gridapigrillaListaConfiguracionLineaAcLocal.refresh(data.ListaConfiguracionSeccionConcesionLocal);
                      $scope.gridapigrillaListaConfiguracionLineaAdmAcLocal.refresh(data.ListaConfiguracionSeccionAdmConcesionLocal);
                      


                  }
              });
          }

          $scope.ObtenerDetalleConfiguracionLinea = function () {
              var param = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.codigoConfiguracionLinea;
              $.ajax({
                  url: "/ConfiguracionLinea/ObtenerConfiguracionLineaxCodigo",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoConfiguracionLinea=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {

                      //Sucursal
                      if (data.ListaConfiguracionSucursal.length > 0) {
                            for (var number = 0; number < data.ListaConfiguracionSucursal.length; number++) {
                                for (var z = 0; z < $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales.length; z++) {

           
                                    if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales[z].Codigo == data.ListaConfiguracionSucursal[number].CodigoSucursal) {
                                        $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales[z].idCheck = true;
                                        $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales[z].Accion = "U";
                                        $scope.CheckItem_Sucursal($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales[z]);
                                    } else {
                                        $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales[z].Accion = "";
                                    }
                                }
                            }
                        $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaSucursalEdit = data.ListaConfiguracionSucursal;
                      }
                      
                      //Terminal portuario
                      if (data.ListaConfiguracionSucursalTerminal.length > 0) {
                        
                          for (var m = 0; m < data.ListaConfiguracionSucursalTerminal.length; m++) {
                              for (var y = 0; y < $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario.length; y++) {
                                  if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario[y].CodigoSucursal == data.ListaConfiguracionSucursalTerminal[m].CodigoSucursal
                                      && $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario[y].CodigoAlmacen == data.ListaConfiguracionSucursalTerminal[m].CodigoTerminalPortuario) {
                                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario[y].idCheck = true;
                                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario[y].Accion = "U";
                                  } else {
                                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario[y].Accion = "";
                                  }
                              }
                          }
                          $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaTerminalPortuarioEdit = data.ListaConfiguracionSucursalTerminal;
                      }

                      //Datos generales
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.CodigoLinea = data.CodigoLinea;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.CodigoConfiguracion =  data.CodigoConfiguracion;

                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionConcesionLocal = data.ListaConfiguracionSeccionConcesionLocal;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionConcesionEscalonada =  data.ListaConfiguracionSeccionConcesionEscalonada;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionAdmConcesionLocal =  data.ListaConfiguracionSeccionAdmConcesionLocal;
                      $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionAdmConcesionEscalonada =  data.ListaConfiguracionSeccionAdmConcesionEscalonada;
                     


                      $scope.gridapiListaSucursales.refresh($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursal);
                      $scope.gridapiListaTerminalPortuario.refresh($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario);
                      
                      $scope.gridapigrillaListaConfiguracionLineaAce.refresh(data.ListaConfiguracionSeccionConcesionEscalonada);
                      $scope.gridapigrillaListaConfiguracionLineaAdmAce.refresh(data.ListaConfiguracionSeccionAdmConcesionEscalonada);
                      $scope.gridapigrillaListaConfiguracionLineaAcLocal.refresh(data.ListaConfiguracionSeccionConcesionLocal);
                      $scope.gridapigrillaListaConfiguracionLineaAdmAcLocal.refresh(data.ListaConfiguracionSeccionAdmConcesionLocal);

                  }
              });
          }

 
          function ValidarLinea() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida =  false;
              }
              else if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.CodigoLinea").html("");

                     var codigoLinea  =   $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.CodigoLinea;
                     var esEditar = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditar; 
                    if (!esEditar || esEditar ==undefined ) {
                        $.ajax({
                            url: "/ConfiguracionLinea/ValidarconfiguracionLinea",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                             data: "codigoLinea=" + codigoLinea,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data == 1) {
                                  MiAlert("Ya existe una configuración para la Línea seleccionada.");
                                  salida = false;
                                }                        
                            }
                        });
                    }
               }
              return salida;
          }

          function guardarConfiguracionLinea() {
              miBlock(true, "#html");
              $.ajax({
                  url: "/ConfiguracionLinea/ModificarConfiguracionLinea",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#html");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.Accion == 'I') {
                                  MiAlertOk("Se ha grabado correctamente la Configuración Línea.", MiAlertOk_success);
                              } else {
                                  MiAlertOk("Se ha actualizado correctamente la Configuración Línea.", MiAlertOk_success);
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

          $scope.Guardar_Click = function () {

              //Sucursal
              var listaSucursalGrabar = [];
              var listaSucursales = $from($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales).where("$idCheck==true").toArray();
              for (var x = 0; x < listaSucursales.length; x++) {
                  var objSucursalTmp = new Object();
                  objSucursalTmp.CodigoConfiguracion = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.codigoConfiguracionLinea;
                  objSucursalTmp.CodigoSucursal = listaSucursales[x].Codigo;
                  objSucursalTmp.Accion = "I";
                  listaSucursalGrabar.push(objSucursalTmp);
              }
              if ( $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditar && $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.codigoConfiguracionLinea != 0) {
                  var listaEdit = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaSucursalEdit;
                  if (listaEdit) {
                      if (listaEdit.length > 0 ) {
                          for (var a = 0; a < listaEdit.length; a++) {
                              var exist = false;
                              for (var b = 0; b < listaSucursalGrabar.length; b++) {
                                  if (listaSucursalGrabar[b].CodigoSucursal == listaEdit[a].CodigoSucursal
                                      && listaSucursalGrabar[b].CodigoConfiguracion == listaEdit[a].CodigoConfiguracion) {
                                      listaSucursalGrabar.splice(b, 1);
                                      exist = true;
                                  }
                              }
                              if (!exist) {
                                  var objSucursal = new Object();
                                  objSucursal.CodigoConfiguracionLineaSucursal = listaEdit[a].CodigoConfiguracionLineaSucursal;
                                  objSucursal.CodigoConfiguracion = listaEdit[a].CodigoConfiguracion;
                                  objSucursal.CodigoSucursal = listaEdit[a].CodigoSucursal;
                                  objSucursal.Accion = "D";
                                  listaSucursalGrabar.push(objSucursal);
                              }
                          }
                      }
                  }
              }
              //Terminal
              var listaTerminalGrabar = [];
              var listaTerminal = $from($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario).where("$idCheck==true").toArray();
              for (var x = 0; x < listaTerminal.length; x++) {
                  var objTerminalTmp = new Object();
                  objTerminalTmp.CodigoConfiguracion = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.codigoConfiguracionLinea;
                  objTerminalTmp.CodigoSucursal = listaTerminal[x].CodigoSucursal;
                  objTerminalTmp.CodigoTerminalPortuario = listaTerminal[x].CodigoAlmacen;
                  objTerminalTmp.Accion = "I";
                  listaTerminalGrabar.push(objTerminalTmp);
              }
              if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.FlagEditar && $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.codigoConfiguracionLinea != 0) {
                  var listaTerminalEdit = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaTerminalPortuarioEdit;
                  if (listaTerminalEdit) {
                      if (listaTerminalEdit.length > 0) {
                          for (var c = 0; c < listaTerminalEdit.length; c++) {
                              var band = false;
                              for (var d = 0; d < listaTerminalGrabar.length; d++) {
                                  if (listaTerminalGrabar[d].CodigoSucursal == listaTerminalEdit[c].CodigoSucursal
                                      && listaTerminalGrabar[d].CodigoTerminalPortuario == listaTerminalEdit[c].CodigoTerminalPortuario) {
                                      listaTerminalGrabar.splice(d, 1);
                                      band = true;
                                  }
                              }
                              if (!band) {
                                  var obtTerminal = new Object();
                                  obtTerminal.CodigoConfiguracion = listaTerminalEdit[c].CodigoConfiguracion;
                                  obtTerminal.CodigoSucursal = listaTerminalEdit[c].CodigoSucursal;
                                  obtTerminal.CodigoConfiguracionLineaSucursalTerminal = listaTerminalEdit[c].CodigoConfiguracionLineaSucursalTerminal;
                                  obtTerminal.CodigoTerminalPortuario = listaTerminalEdit[c].CodigoTerminalPortuario;
                                  obtTerminal.Accion = "D";
                                  listaTerminalGrabar.push(obtTerminal);
                              }
                          }
                      }
                  }
              }

              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSucursal = listaSucursalGrabar;
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSucursalTerminal = listaTerminalGrabar;

              if (ValidarLinea()) {
                  guardarConfiguracionLinea();
              }
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
              arrayGrillas.push("grillaListaSucursales");
              arrayGrillas.push("grillaListaTerminalPortuario");
              arrayGrillas.push("grillaListaConfiguracionLineaAdmAce");
              arrayGrillas.push("grillaListaConfiguracionLineaAce");
              arrayGrillas.push("grillaListaConfiguracionLineaAdmAcLocal");
              arrayGrillas.push("grillaListaConfiguracionLineaAcLocal");

              var arrayContentFechas = new Array();
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, arrayContentFechas);
          }

          function MiAlertOk_success() {
              
             window.location.href = "/#!/sistema/maestros/configuracion-linea/";

              /*if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/busqueda/buscar-acescalonado/";
              }*/
          }
 
          $scope.CheckItem_Sucursal = function (row) {
              row.idCheck;
              if (row.idCheck) {
                  $rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.CodigoSucursalActual = row.Codigo;
                  $scope.AgregarTerminalPortuarioTarifaLocal(row.Codigo);
              }
              else {
                  $scope.QuitarTerminalPortuarioTarifaLocal(row.Codigo);
              }
          }

          $scope.CheckItem_TerminalPortuario = function (row) {
              row.idCheck;
          }

          $scope.CheckItem_ConcesionEscalonada = function (row) {
              row.idCheck;
          }


          $scope.CheckItem_AdmConcesionEscalonada = function (row) {
              row.idCheck;
          }


          $scope.CheckItem_ConcesionLocal= function (row) {
              row.idCheck;
          }


          $scope.CheckItem_AdmConcesionLocal = function (row) {
              row.idCheck;
          }

 
          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 100);
               if (idgrilla == "grillaListaSucursales") {
                    $.each($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales, function (x) { this.idCheck = check; });
                    if (check) {
                        $scope.AgregarTerminalPortuarioTarifaLocalTodos();
                    }
                    else {
                        $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario = [];
                        $scope.gridapiListaTerminalPortuario.clear();
                    }
                }
              
                if (idgrilla == "grillaListaTerminalPortuario") {
                    $.each($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario, function (x) { this.idCheck = check; });
                }

                if (idgrilla == "grillaListaConfiguracionLineaAdmAce") {
                    $.each($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionAdmConcesionEscalonada  , function (x) { this.SeccionVisible = check; });
                }

                if (idgrilla == "grillaListaConfiguracionLineaAce") {
                  $.each($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionConcesionEscalonada , function (x) { this.SeccionVisible = check; });
                }
                
                if (idgrilla == "grillaListaConfiguracionLineaAdmAcLocal") {
                    $.each($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionAdmConcesionLocal , function (x) { this.SeccionVisible = check; });
                }
                
                if (idgrilla == "grillaListaConfiguracionLineaAcLocal") {
                    $.each($rootScope.DatosFormulario.AdministrarConfiguracionLinea.DatosRegistro.ListaConfiguracionSeccionConcesionLocal , function (x) { this.SeccionVisible = check; });
                }
                
          }

          $scope.AgregarTerminalPortuarioTarifaLocal = function (codigoSucursal) {
              $.ajax({
                  url: "/Maestros/ListarTerminalPortuarioBySucursal",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoSucursal=" + codigoSucursal,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $.each(data.TerminalPorturario, function (x) {
                          $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario.push(this);
                          $scope.gridapiListaTerminalPortuario.insertRange(this);
                      });
                  }
              });
          }


          $scope.AgregarTerminalPortuarioTarifaLocalTodos = function () {
              $.ajax({
                  url: "/Maestros/ListarTerminalPortuarioTodos",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $scope.gridapiListaTerminalPortuario.clear();
                      $.each(data.TerminalPorturario, function (x) {
                          $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario.push(this);
                          $scope.gridapiListaTerminalPortuario.insertRange(this);
                      });
                  }
              });
          }

          $scope.QuitarTerminalPortuarioTarifaLocal = function (codigoSucursal) {
              var terminalLista = $.grep($rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario, function (e) { return e.CodigoSucursal != codigoSucursal; });
              $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario = terminalLista;
              $scope.gridapiListaTerminalPortuario.clear();
              $scope.gridapiListaTerminalPortuario.insertRange(terminalLista);
          }


          $scope.AgregarTerminalPortuarioTarifaLocalTodos = function () {
              $.ajax({
                  url: "/Maestros/ListarTerminalPortuarioTodos",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $scope.gridapiListaTerminalPortuario.clear();
                      $.each(data.TerminalPorturario, function (x) {
                          $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario.push(this);
                          $scope.gridapiListaTerminalPortuario.insertRange(this);
                      });
                  }
              });
          }


          $scope.Grid_DataBind = function (grid, data) {
              if (grid == "DetalleSucursal") {
                  $scope.gridapiListaSucursales.insertRange(data);
              }
              if (grid == "DetalleTerminalPortuario") {
                  $scope.gridapiListaTerminalPortuario.refresh(data);
              }
          }


          $scope.Salir_Click = function () {
           $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaSucursales  = [];
           $rootScope.DatosFormulario.AdministrarConfiguracionLinea.ListaTerminalPortuario = [];
           $scope.gridapiListaSucursales.clear();
           $scope.gridapiListaTerminalPortuario.clear();
            window.location.href = "/#!/sistema/maestros/configuracion-linea";
            /*  if ($rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.UrlOrigen != undefined) {
                  window.location.href = $rootScope.DatosFormulario.AdministrarConfiguracionLinea.Datos.UrlOrigen;
              } else {
                  window.location.href = "/#!/sistema/maestros/configuracion-linea";
              }
              */
             // $rootScope.DatosFormulario.RegistroACEscalonado.FlagACEscalonado = true;
          }
 
  
      }]);
})();