(function () {
    angular.module('api')
    .controller('ConfiguracionRangoController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              $rootScope.DatosFormulario.ConfiguracionPeriodo = new Object();
              $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango = [];
              $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor = [];
              if ($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo == undefined)
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo = [];
              if ($rootScope.DatosFormulario.ConfiguracionPeriodo.DataCombos == undefined)
                  $rootScope.DatosFormulario.ConfiguracionPeriodo.DataCombos = new Object();
              if ($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRangoMemoria == undefined)
                  $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRangoMemoria = [];
              $scope.FlagMostrarBotonGuardar = $scope.FlagEditing;
              $scope.CargarDatosIniciales();
              $scope.EditingGrillas();

          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/ConfiguracionPeriodoTarifaEscalonada/GrabarConfiguracionPeriodoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.ConfiguracionPeriodo.DataCombos.ListaCategoriaContenedor = data.ListaCategoriaContenedor;
                      $rootScope.DatosFormulario.ConfiguracionPeriodo.DataCombos.ListaMoneda = data.ListaMonedas;
                      var objReg = $scope.row;
                      if (objReg) {
                          $rootScope.DatosFormulario.ConfiguracionPeriodo.IdPeriodo = objReg.IdPeriodo;
                          $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoTarifaEscalonadaVigencia = objReg.CodigoTarifaEscalonadaVigencia;
                          if ($scope.$parent.ModoPagina == "Editar") {
                              $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoClaseContenedor = objReg.CodigoClaseContenedor;
                              $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoMoneda = objReg.CodigoMoneda;
                              $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango = objReg.ListaDetalleRango;
                              $scope.CargarTipoContenedor(objReg.CodigoClaseContenedor);
                              var lstTipoContenedor = $.grep(objReg.ListaTipoContenedor, function (e) { return e.idCheck == true; });
                              if (lstTipoContenedor.length > 0) {
                                  $(lstTipoContenedor).each(function (i) {
                                      $($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor).each(function (j) {
                                          if (lstTipoContenedor[i].CodigoTipoContenedor == this.CodigoTipoContenedor) {
                                              this.idCheck = true;
                                          }
                                      });
                                  });
                              }
                              if ($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango.length > 0) {
                                  var maximumPeriodo = 0;
                                  $.each($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango, function (x) {
                                      maximumPeriodo = (this.Periodo > maximumPeriodo) ? this.Periodo : maximumPeriodo;
                                  });
                                  $.each($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango, function (x) {
                                      if (maximumPeriodo == this.Periodo) {
                                          this.IsDelete = true;
                                      } else {
                                          this.IsDelete = false;
                                      }
                                  });
                              }
                              $scope.gridapiListaDetalleRango.refresh($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango);
                              $scope.gridapiListaDetalleTipoContenedor.refresh($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor);
                          }
                          else {
                              $scope.gridapiListaDetalleRango.refresh([]);
                              $scope.gridapiListaDetalleTipoContenedor.refresh([]);
                          }
                      }

                  }
              });
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.Grabar_Click = function () {
              var validacion = validacionesCamposGuardar();
              if (validacion == false) {
                  return false;
              }
              guardarDatos();
              $scope.$parent.SalirPopup_Click();
          }
          function validacionesCamposGuardar() {
              var salida = true;
              if (validateForm("#frmDetalleTipoContenedor") == false) {
                  salida = false;
              }
              if (validateForm("#frmDetalleRangos") == false) {
                  salida = false;
              }
              if (validateForm("#frmConfigRangosMoneda") == false) {
                  salida = false;
              }
              var listaSucursales = $from($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor).where("$idCheck==true").toArray();
              if (listaSucursales.length <= 0) {
                  $(".caja11.msgerror.listaSucursal").html("Debe seleccionar por lo menos un tipo contenedor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaSucursal").html("");
                  salida = (salida && true);;
              }
              if ($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango.length <= 0) {
                  $(".caja11.msgerror.listaDetalleRando").html("Debe agregar por lo menos un detalle rango.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaDetalleRando").html("");
                  salida = (salida && true);;
              }

              if ($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango.length > 0) {
                  $.each($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango, function (x) {

                      // if(this.UnidadLibres == ){
                      //  $(".caja11.msgerror.listaDetalleRando").html("Debe agregar por lo menos un detalle rango.");
                      //  salida = false;
                      // }

                  });

              } else {
                  $(".caja11.msgerror.listaDetalleRando").html("");
                  salida = (salida && true);;
              }

              if (salida) {
                  var idPeriodo = $rootScope.DatosFormulario.ConfiguracionPeriodo.IdPeriodo;
                  var codigoTarifaEscalonadaVigencia = $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoTarifaEscalonadaVigencia;
                  var periodosListCurrentView = $.grep($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo, function (e) { return e.CodigoTarifaEscalonadaVigencia == codigoTarifaEscalonadaVigencia});
                  var listDiffCurrent = $.grep(periodosListCurrentView, function (e) { return e.IdPeriodo != idPeriodo && e.Accion != "D" });
                  if (listDiffCurrent.length > 0) {
                      var codigoCategoriaContenedor = $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoClaseContenedor;
                      var codigoMoneda = $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoMoneda;
                      var objExisteElemento = $.grep(listDiffCurrent, function (e) { return e.CodigoClaseContenedor == codigoCategoriaContenedor && e.CodigoMoneda == codigoMoneda });
                      if (objExisteElemento.length > 0) {
                          var flagExistTipo = false;
                          var lstTipoContendorToday = $.grep($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor, function (e) { return e.idCheck == true; });
                          for (var p = 0; p < objExisteElemento.length; p++) {
                              var typeContList = $.grep(objExisteElemento[p].ListaTipoContenedor, function (e) { return e.idCheck == true; });
                              for (var k = 0; k < lstTipoContendorToday.length; k++) {
                                  for (var z = 0; z < typeContList.length; z++) {
                                      if (lstTipoContendorToday[k].CodigoTipoContenedor == typeContList[z].CodigoTipoContenedor) {
                                          flagExistTipo = true;
                                          break;
                                      }
                                  }
                                  if (flagExistTipo) {
                                      break;
                                  }
                              }
                          }
                          if (flagExistTipo) {
                              salida = false;
                              MiAlert("Ya existe un registro con la misma Moneda, Clase Contenedor y Tipo Contenedor.");
                          }
                      } else {
                          var lstMonedaExiste = $from(listDiffCurrent).where("$CodigoMoneda=='" + codigoMoneda + "'").toArray();
                          if (lstMonedaExiste.length <= 0) {
                              salida = false;
                              MiAlert("Debe configurar rangos con la misma moneda.");
                          }
                      }
                  }
              }
              return salida;
          }
          function guardarDatos() {
              var idPeriodo = $rootScope.DatosFormulario.ConfiguracionPeriodo.IdPeriodo;
              var codigoClassContenedor = $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoClaseContenedor;
              var codigoMoneda = $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoMoneda;
              var nombreClaseContenedor = $from($rootScope.DatosFormulario.ConfiguracionPeriodo.DataCombos.ListaCategoriaContenedor).where("$CodigoClaseContenedor=='" + codigoClassContenedor + "'").firstOrDefault().Descripcion;
              var nombreMoneda = $from($rootScope.DatosFormulario.ConfiguracionPeriodo.DataCombos.ListaMoneda).where("$Codigo=='" + codigoMoneda + "'").firstOrDefault().Nombre;
              var objInsertEdit = new Object();
              objInsertEdit.IdPeriodo = idPeriodo;
              objInsertEdit.CodigoTarifaEscalonadaVigencia = $rootScope.DatosFormulario.ConfiguracionPeriodo.CodigoTarifaEscalonadaVigencia;
              objInsertEdit.CodigoClaseContenedor = codigoClassContenedor;
              objInsertEdit.CodigoMoneda = codigoMoneda;
              objInsertEdit.ClaseContenedor = nombreClaseContenedor;
              objInsertEdit.Moneda = nombreMoneda;
              objInsertEdit.ListaTipoContenedor = $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor;
              objInsertEdit.ListaDetalleRango = $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango;
              var nombresTiposContenedores = "";
              for (var i = 0; i < objInsertEdit.ListaTipoContenedor.length; i++) {
                  if (objInsertEdit.ListaTipoContenedor[i].idCheck) {
                      if (nombresTiposContenedores.length == 0) {
                          nombresTiposContenedores = objInsertEdit.ListaTipoContenedor[i].CodigoTipoContenedor;
                      } else {
                          nombresTiposContenedores = nombresTiposContenedores + '; ' + objInsertEdit.ListaTipoContenedor[i].CodigoTipoContenedor;
                      }
                  }
              }
              objInsertEdit.TiposContenedores = nombresTiposContenedores;
              if ($scope.$parent.ModoPagina == "Nuevo") {
                  $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo.push(objInsertEdit);
                  if ($.inArray(objInsertEdit, $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo) > -1) {
                  } else {
                      $rootScope.DatosFormulario.MemoriaConfiguracionPeriodo.push(objInsertEdit);
                  }
                  var lista = $rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo;
                  $scope.gridapiListaConfiguracionPeriodo.refresh(lista);
              } else {
                  $($rootScope.DatosFormulario.DatosTarifaEscalonada.ListaConfiguracionPeriodo).each(function (index) {
                      if (this.IdPeriodo == idPeriodo) {
                          this.CodigoClaseContenedor = objInsertEdit.CodigoClaseContenedor;
                          this.ClaseContenedor = objInsertEdit.ClaseContenedor;
                          this.CodigoTarifaEscalonadaVigencia = objInsertEdit.CodigoTarifaEscalonadaVigencia;
                          this.CodigoMoneda = objInsertEdit.CodigoMoneda;
                          this.Moneda = objInsertEdit.Moneda;
                          this.ListaTipoContenedor = objInsertEdit.ListaTipoContenedor;
                          this.ListaDetalleRango = objInsertEdit.ListaDetalleRango;
                          this.TiposContenedores = objInsertEdit.TiposContenedores;
                      }
                  });
                  $($rootScope.DatosFormulario.MemoriaConfiguracionPeriodo).each(function (index) {
                      if (this.IdPeriodo == idPeriodo) {
                          this.CodigoClaseContenedor = objInsertEdit.CodigoClaseContenedor;
                          this.ClaseContenedor = objInsertEdit.ClaseContenedor;
                          this.CodigoTarifaEscalonadaVigencia = objInsertEdit.CodigoTarifaEscalonadaVigencia;
                          this.CodigoMoneda = objInsertEdit.CodigoMoneda;
                          this.Moneda = objInsertEdit.Moneda;
                          this.ListaTipoContenedor = objInsertEdit.ListaTipoContenedor;
                          this.ListaDetalleRango = objInsertEdit.ListaDetalleRango;
                          this.TiposContenedores = objInsertEdit.TiposContenedores;
                      }
                  });
              }
          }
          $scope.CheckItem_TipoContenedor = function (row) {
              row.idCheck;
          }
          $scope.AgregarDetalleRango = function () {
              var newItem = new Object();
              var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango, "IdRango");
              var nuevoPeriodo = Helpers.GenerarContador($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango, "Periodo");
              var codTarifaEscalonda = 0;
              if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada) {
                  codTarifaEscalonda = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada;
              }
              $.each($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango, function (x) { this.IsDelete = false; });
              newItem = {
                  IdRango: nuevoId,
                  Periodo: nuevoPeriodo,
                  CodigoTarifaEscalonada: codTarifaEscalonda,
                  Accion: "I",
                  IsDelete: true
              }

              $scope.gridapiListaDetalleRango.insertRange([
                      newItem
              ]);
              $(".solonumeros").numeric();
              $(".solodecimal").numeric();

          }
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              var html = "";
              if (rowObject.IsDelete) {
                  switch (idgrilla) {
                      case "grillaListaDetalleRango":
                          {
                              switch (tipoboton) {
                                  case "Quitar":
                                      eventoclick = "$parent.QuitarDetalleRango('" + rowObject.IdRango + "','" + rowObject.Periodo + "');";
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
              }
              return html;
          }
          $scope.QuitarDetalleRango = function (idRango, codPeriodo) {
              MiConfirm("¿Está seguro de eliminar el Periodo?.", function () {
                  var listaGrillaMemoria = $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango;
                  var listaBaseMemoria = $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRangoMemoria;
                  var listaGrilla = [];
                  var listaBase = [];
                  for (var x = 0; x < listaGrillaMemoria.length; x++) {
                      if (listaGrillaMemoria[x].IdRango != idRango) {
                          listaGrilla.push(listaGrillaMemoria[x]);
                      }
                  }
                  for (var x = 0; x < listaBaseMemoria.length; x++) {
                      if (listaBaseMemoria[x].IdRango == idRango) {
                          if (listaBaseMemoria[x].IdRango > 0) {
                              listaBaseMemoria[x].Accion = "D";
                              listaBase.push(listaBaseMemoria[x]);
                          }
                      }
                  }
                  $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango = listaGrilla;
                  $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRangoMemoria = listaBase;

                  if ($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango.length > 0) {
                      $.each($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango, function (x) {
                          if ((codPeriodo - 1) == this.Periodo) {
                              this.IsDelete = true;
                          }
                      });
                  }

                  $scope.gridapiListaDetalleRango.refresh($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaDetalleRango);
                  $rootScope.$apply();

              });
          }
          $scope.CargarTipoContenedor = function (codigoClaseContenedor) {
              miBlock(true, "#divPopupConfiguracionRangos");
              var codigoLinea = $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoLinea;
              $.ajax({
                  url: "/ConfiguracionPeriodoTarifaEscalonada/ListarTipoContendorByClaseContenedor",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  //data: "codigoClaseContenedor=" + codigoClaseContenedor + "&&codigoLinea=" + codigoLinea,
                  data: { codigoClaseContenedor: codigoClaseContenedor, codigoLinea: codigoLinea },
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupConfiguracionRangos");
                      $rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor = data.ListaTipoContenedor;
                      $scope.gridapiListaDetalleTipoContenedor.refresh(data.ListaTipoContenedor);
                  }
              });
          }
          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaListaDetalleTipoContenedor");
              arrayGrillas.push("grillaListaDetalleRango");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, []);
          }
          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 40);
              if (idgrilla == "grillaListaDetalleTipoContenedor") {
                  $.each($rootScope.DatosFormulario.ConfiguracionPeriodo.ListaTipoContenedor, function (x) { this.idCheck = check; });
              }
          }
      }]);
})();
