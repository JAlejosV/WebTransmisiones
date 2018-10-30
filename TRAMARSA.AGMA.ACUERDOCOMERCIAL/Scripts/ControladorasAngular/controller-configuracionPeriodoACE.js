(function () {
    angular.module('api')
    .controller('ConfiguracionPeridoACEController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              $rootScope.DatosFormulario.ConfiguracionPeriodoACE = new Object();
              $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango = [];
              $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor = [];
              if ($rootScope.DatosFormulario.MemoriaConfiguracionPeriodoACE == undefined)
                  $rootScope.DatosFormulario.MemoriaConfiguracionPeriodoACE = [];
              if ($rootScope.DatosFormulario.ConfiguracionPeriodoACE.DataCombos == undefined)
                  $rootScope.DatosFormulario.ConfiguracionPeriodoACE.DataCombos = new Object();
              if ($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRangoMemoria == undefined)
                  $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRangoMemoria = [];
              $scope.CargarDatosIniciales();
              $scope.FlagMostrarBotonGuardar = $scope.FlagEditing;
              $scope.EditingGrillas();
          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/ConfiguracionPeriodoACEscalonado/GrabarConfiguracionPeriodoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.ConfiguracionPeriodoACE.DataCombos.ListaCategoriaContenedor = data.ListaCategoriaContenedor;
                      $rootScope.DatosFormulario.ConfiguracionPeriodoACE.DataCombos.ListaMoneda = data.ListaMonedas;
                      //Form
                      var objReg = $scope.row;
                      $rootScope.DatosFormulario.ConfiguracionPeriodoACE.IdPeriodo = $scope.row.IdPeriodo;
                      if (objReg) {
                          $rootScope.DatosFormulario.ConfiguracionPeriodoACE.CodigoClaseContenedor = objReg.CodigoClaseContenedor;
                          if (objReg.CodigoClaseContenedor != undefined) {
                              $scope.CargarTipoContenedor(objReg.CodigoClaseContenedor);
                          }
                          if (objReg.ListaTipoContenedor == undefined) {
                              objReg.ListaTipoContenedor = [];
                          }

                          if (objReg.ListaDetalleRango == undefined) {
                              objReg.ListaDetalleRango = [];
                          }
                          $rootScope.DatosFormulario.ConfiguracionPeriodoACE.CodigoMoneda = objReg.CodigoMoneda;
                          $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango = objReg.ListaDetalleRango;
                          var lstTipoContenedor = $.grep(objReg.ListaTipoContenedor, function (e) { return e.idCheck == true; });
                          if (lstTipoContenedor.length > 0) {
                              $(lstTipoContenedor).each(function (i) {
                                  $($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor).each(function (j) {
                                      if (lstTipoContenedor[i].CodigoTipoContenedor == this.CodigoTipoContenedor) {
                                          this.idCheck = true;
                                      }
                                  });
                              });
                          }

                          if ($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango.length > 0) {
                              var maximumPeriodo = 0;
                              $.each($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango, function (x) {
                                  maximumPeriodo = (this.Periodo > maximumPeriodo) ? this.Periodo : maximumPeriodo;
                              });
                              $.each($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango, function (x) {
                                  if (maximumPeriodo == this.Periodo) {
                                      this.IsDelete = true;
                                  } else {
                                      this.IsDelete = false;
                                  }
                              });
                          }

                          $scope.gridapigrillaAceListaDetalleRango.refresh($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango);
                          $scope.gridapigrillaAceListaDetalleTipoContenedor.refresh($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor);
                      }
                  }
              });
          }
          $scope.Guardar_Click = function () {

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
              var listaTipoDeContenedor = $from($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor).where("$idCheck==true").toArray();
              if (listaTipoDeContenedor.length <= 0) {
                  $(".caja11.msgerror.ListaTipoContenedor").html("Debe seleccionar por lo menos un Tipo de Contenedor.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.ListaTipoContenedor").html("");
                  salida = (salida && true);;
              }
              if ($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango.length <= 0) {
                  $(".caja11.msgerror.listaDetalleRando").html("Debe agregar por lo menos un detalle rango.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.listaDetalleRando").html("");
                  salida = (salida && true);;
              }
              if (salida) {
                  var idPeriodo = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.IdPeriodo;
                  var listDiffCurrent = $.grep($rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory, function (e) { return e.IdPeriodo != idPeriodo && e.Accion != "D" });
                  if (listDiffCurrent.length > 0) {
                      var codigoCategoriaContenedor = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.CodigoClaseContenedor;
                      var codigoMoneda = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.CodigoMoneda;
                      var objExisteElemento = $.grep(listDiffCurrent, function (e) { return e.CodigoClaseContenedor == codigoCategoriaContenedor && e.CodigoMoneda == codigoMoneda });
                      if (objExisteElemento.length > 0) {
                          var flagExistTipo = false;
                          var lstTipoContendorToday = $.grep($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor, function (e) { return e.idCheck == true; });
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
              var idPeriodo = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.IdPeriodo;
              var codigoClassContenedor = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.CodigoClaseContenedor;
              var codigoMoneda = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.CodigoMoneda;
              var nombreClaseContenedor = $from($rootScope.DatosFormulario.ConfiguracionPeriodoACE.DataCombos.ListaCategoriaContenedor).where("$CodigoClaseContenedor=='" + codigoClassContenedor + "'").firstOrDefault().Descripcion;
              var nombreMoneda = $from($rootScope.DatosFormulario.ConfiguracionPeriodoACE.DataCombos.ListaMoneda).where("$Codigo=='" + codigoMoneda + "'").firstOrDefault().Nombre;

              var objInsertEdit = new Object();
              objInsertEdit.IdPeriodo = idPeriodo;
              objInsertEdit.CodigoClaseContenedor = codigoClassContenedor;
              objInsertEdit.CodigoMoneda = codigoMoneda;
              objInsertEdit.ClaseContenedor = nombreClaseContenedor;
              objInsertEdit.Moneda = nombreMoneda;
              objInsertEdit.ListaTipoContenedor = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor;
              objInsertEdit.ListaDetalleRango = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango;
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
                  $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfiguracionPeriodo.push(objInsertEdit);
                  if ($.inArray(objInsertEdit, $rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory) > -1) {
                  } else {
                      $rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory.push(objInsertEdit);
                  }
                  var lista = $rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfiguracionPeriodo;
                  $scope.gridapigrillaAceListaConfiguracionPeriodo.refresh(lista);
              } else {
                  $($rootScope.DatosFormulario.ConfiguracionTarifaACE.ListaConfiguracionPeriodo).each(function (index) {
                      if (this.IdPeriodo == idPeriodo) {
                          this.CodigoClaseContenedor = objInsertEdit.CodigoClaseContenedor;
                          this.ClaseContenedor = objInsertEdit.ClaseContenedor;
                          this.CodigoMoneda = objInsertEdit.CodigoMoneda;
                          this.Moneda = objInsertEdit.Moneda;
                          this.ListaTipoContenedor = objInsertEdit.ListaTipoContenedor;
                          this.ListaDetalleRango = objInsertEdit.ListaDetalleRango;
                          this.TiposContenedores = objInsertEdit.TiposContenedores;
                      }
                  });
                  $($rootScope.DatosFormulario.ConfiguracionTarifaACE.PeriodoListaMemory).each(function (index) {
                      if (this.IdPeriodo == idPeriodo) {
                          this.CodigoClaseContenedor = objInsertEdit.CodigoClaseContenedor;
                          this.ClaseContenedor = objInsertEdit.ClaseContenedor;
                          this.CodigoMoneda = objInsertEdit.CodigoMoneda;
                          this.Moneda = objInsertEdit.Moneda;
                          this.ListaTipoContenedor = objInsertEdit.ListaTipoContenedor;
                          this.ListaDetalleRango = objInsertEdit.ListaDetalleRango;
                          this.TiposContenedores = objInsertEdit.TiposContenedores;
                      }
                  });
              }
              $rootScope.DatosFormulario.ConfiguracionPeriodoACE = null;
              $scope.gridapigrillaAceListaDetalleRango.refresh(null);
              $scope.gridapigrillaAceListaDetalleTipoContenedor.refresh(null);
          }
          $scope.AgregarDetalleRango = function () {
              var newItem = new Object();
              var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango, "IdRango");
              var nuevoPeriodo = Helpers.GenerarContador($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango, "Periodo");
              $.each($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango, function (x) { this.IsDelete = false; });
              newItem = {
                  IdRango: nuevoId,
                  Periodo: nuevoPeriodo,
                  Accion: "I",
                  IsDelete: true
              }

              $scope.gridapigrillaAceListaDetalleRango.insertRange([
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
                      case "grillaAceListaDetalleRango":
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
                  var listaGrillaMemoria = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango;
                  var listaBaseMemoria = $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRangoMemoria;
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
                      } else {
                          listaBase.push(listaBaseMemoria[x]);
                      }
                  }
                  $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango = listaGrilla;
                  $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRangoMemoria = listaBase;
                  if ($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango.length > 0) {
                      $.each($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango, function (x) {
                          if ((codPeriodo - 1) == this.Periodo) {
                              this.IsDelete = true;
                          }
                      });
                  }
                  $scope.gridapigrillaAceListaDetalleRango.refresh($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaDetalleRango);
                  $rootScope.$apply();
              });
          }
          $scope.CargarTipoContenedor = function (codigoClaseContenedor) {
              var codigoLinea = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoLinea;
              miBlock(true, "#divPopupConfiguracionRangos");
              $.ajax({
                  url: "/ConfiguracionPeriodoACEscalonado/ListarTipoContendorByClaseContenedor",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  //data: "codigoClaseContenedor=" + codigoClaseContenedor,
                  data: { codigoClaseContenedor: codigoClaseContenedor, codigoLinea: codigoLinea},
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupConfiguracionRangos");
                      $rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor = data.ListaTipoContenedor;
                      $scope.gridapigrillaAceListaDetalleTipoContenedor.refresh(data.ListaTipoContenedor);
                  }
              });
          }
          $scope.CheckItem_TipoContenedor = function (row) {
              row.idCheck;
          }
          $scope.EditingGrillas = function () {
              var arrayGrillas = new Array();
              arrayGrillas.push("grillaAceListaDetalleRango");
              arrayGrillas.push("grillaAceListaDetalleTipoContenedor");
              ReadOnlyForm(arrayGrillas, $scope.FlagEditing, []);
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 40);
              if (idgrilla == "grillaAceListaDetalleTipoContenedor") {
                  $.each($rootScope.DatosFormulario.ConfiguracionPeriodoACE.ListaTipoContenedor, function (x) { this.idCheck = check; });
              }
          }
          $scope.UnidadLibres_Change = function (objItem) {
              objItem.Accion = "I";
          }
          $scope.Precio_Change = function (objItem) {
              objItem.Accion = "I";
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
