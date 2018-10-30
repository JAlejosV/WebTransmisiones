(function () {
    angular.module('api')
    .controller('BuscarTarifaEscalonadaGeneralController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral = new Object();
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial = new Object();
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro = new Object();
              $rootScope.FlagMostrarBotonSeleccionar = true;
              $scope.CargaInicialBusquedaTarifaEscalonadaGeneral();
          });
          $scope.CargaInicialBusquedaTarifaEscalonadaGeneral = function () {
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
                          $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Linea = data.Linea;
                          $scope.Limpiar_Click();
                          $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Habilitado = 'True';
                          }
                          $scope.ChangeLineaNaviera($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoLinea);
                      }
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.FechaVigencia = data.FechaVigencia;
                      //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Contenedor = data.Contenedor;
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.ValorDescuento = data.TipoDescuentoDefault;
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.ValorMoneda = data.MonedaDefault;
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.ValorMonto = data.MontoAcuerdoDefault;
                      $scope.$apply();
                      $scope.Buscar_Click();
                  }
              });
              $("#VigenteTarifaEscalonada").prop("checked", true);
              if ($rootScope.DatosFormulario.OpcionTarifaEscalonadaGenerales != "AcuerdoComercialEscalonado") {
                  $("#grillaListaTarifaEscalonadaGeneral").hideCol("idCheck");
              } else {
                  $("#grillaListaTarifaEscalonadaGeneral").hideCol("Precio");
              }

          }
          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 60);
              if (idgrilla == "grillaListaTarifaEscalonadaGeneral") {
                  OnOffAllSelectGrilla(idgrilla, check);
              }
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              //if (validateForm("#BusquedaTarifaEscalonadaGeneralFrm") == false) {
              //    return false;
              //}
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.FechaVigencia = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.FlagTarifaLigada = false;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.FlagVigente = true;

              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              } else if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  return false;
              } else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              miBlock(true, "#divPopupBuscarTarifaEscalonadaLigada");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro)) };
              $scope.gridapigrillaListaTarifaEscalonadaGeneral.find(objRequest);
              miBlock(false, "#divPopupBuscarTarifaEscalonadaLigada");

          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.DescripcionTarifa = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoTipoContenedor = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.FechaVigencia = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.FlagTarifaLigada = false;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.FlagVigente = true;
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Linea.length > 1) {
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoLinea = null;
              }
              $("#VigenteTarifaEscalonada").prop("checked", true);
          }
          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
              var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
              var estado = ProcesarSeleccionado(data);
              if (estado) {
                  $rootScope.$apply();
                  $scope.$parent.SalirPopup_Click();
              }
          }
          function ProcesarSeleccionado(data) {
              var opcion = $rootScope.DatosFormulario.OpcionTarifaEscalonadaGenerales;
              if (opcion == "TarifaEscalonadaLigada") {
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa = data.DescripcionTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda = data.DescripcionMoneda;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto = parseFloat(Math.round(data.Precio * 100) / 100).toFixed(2);
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal = data.CodigoTarifaEscalonada;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa = data.CodigoTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada = data.CodigoMoneda;
              }
              else if (opcion == "reporteTarifaEscalonada") {
                  $rootScope.DatosFormulario.ReporteTarifaEscalonada.Filtro.CodigoTarifaEscalonada = data.CodigoTarifaEscalonada;
                  $rootScope.DatosFormulario.ReporteTarifaEscalonada.Datos.NombreTarifa = data.DescripcionTarifa;

              } else if (opcion == "AcuerdoComercialEscalonado") {
                  $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifasEscalonadaGenerales = $('#grillaListaTarifaEscalonadaGeneral').jqGrid('getRowData');
                  if ($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifasEscalonadaGenerales.length > 0) {
                      var lista = $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifasEscalonadaGenerales;
                      var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });
                      if (filtroLista.length > 0) {
                          for (var i = 0; i < filtroLista.length; i++) {
                              var listaExiste = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa, function (e) { return e.CodigoTarifaEscalonado == filtroLista[i].CodigoTarifaEscalonada; });
                              if (listaExiste.length > 0) {
                                  $(".caja11.msgerror.Objeto").html("La Tarifa Escalonada ya existe, seleccione otra.");
                                  return false;
                              } else {
                                  $(".caja11.msgerror.Objeto").html("");
                              }
                              CargarTarifaLigadaAcuerdoComercial(filtroLista[i].CodigoTarifaEscalonada)
                          }
                          $(".caja11.msgerror.Objeto").html("");
                      } else {
                          $(".caja11.msgerror.Objeto").html("Seleccione por lo menos un registro.");
                          return false;
                      }
                  }
              }
              return true;
          }
          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaTarifaEscalonadaGeneral").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaTarifaEscalonadaGeneral').getRowData(rowKey);
                      var estado = ProcesarSeleccionado(rowObject);
                      if (estado) {
                          $scope.$parent.SalirPopup_Click();
                      } else {
                          $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                      }
                      $(".caja11.msgerror.Objeto").html("");
                  } else {
                      $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                  }
              }
              if (ProcesarSeleccionado()) {
                  $scope.$parent.SalirPopup_Click();
              }
              /*else {
                  $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
              }*/
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          function CargarTarifaLigadaAcuerdoComercial(codigoTarifaEscalonado) {
              $.ajax({
                  url: "/TarifaEscalonada/ConsultarDetalleTarifaEscalonada",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoTarifaEscalonada=" + codigoTarifaEscalonado,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.Result.Satisfactorio) {
                              if (data.DetalleTarifaEscalonadaList.length > 0) {
                                  var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifa, "IdTarifa");
                                  var newObjet = {
                                      IdTarifa: nuevoId,
                                      CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                                      CodigoTarifaEscalonado: data.DetalleTarifaEscalonadaList[0].CodigoTarifaEscalonada,
                                      DescripcionTarifa: data.DetalleTarifaEscalonadaList[0].DescripcionTarifa,
                                      CodigoTipoDescuento: $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.ValorDescuento,
                                      CodigoMonedaAcuerdo: $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.ValorMoneda,
                                      CodigoUnidadCalculo: data.DetalleTarifaEscalonadaList[0].CodigoUnidadCalculo,
                                      UnidadCalculo: data.DetalleTarifaEscalonadaList[0].UnidadCalculo,
                                      MontoAcuerdo: $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.ValorMonto,
                                      CodigoTipoFechaCalculo: "",
                                      CodigoTipoDiaCalculo: "",
                                      DiasDelayCalculo: "",
                                      CodigoTipoCobro: "",
                                      idCheck: false,
                                      Accion: "I"
                                  };
                                  $scope.gridapigrillaAceListaTarifa.insertRange([
                                      newObjet
                                  ]);
                                  if ($.inArray(newObjet, $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList) > -1) {
                                  } else {
                                      $rootScope.DatosFormulario.RegistroACEscalonado.grillaAceListaTarifaMemoriaList.push(newObjet);
                                  }

                                  if (data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaLigadaList.length > 0) {
                                      var listLigada = data.DetalleTarifaEscalonadaList[0].TarifaEscalonadaLigadaList;
                                      $(listLigada).each(function (j) {
                                          var objItem = new Object();
                                          objItem.IdConfiguracionTarifaLigada = -this.IdConfiguracionTarifaLigada;
                                          objItem.CodigoTarifa = this.CodigoTarifa;
                                          objItem.CodigoAcuerdoComercialEscalonado = $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado;
                                          objItem.CodigoTarifaEscalonado = codigoTarifaEscalonado;
                                          objItem.CodigoTarifaLigadaEscalonado = this.CodigoTarifaLigadaEscalonada;
                                          objItem.DescripcionTarifaEscalonada = this.DescripcionTarifaEscalonada;
                                          objItem.DescripcionConfiguracionTarifaLigada = this.DescripcionConfiguracionTarifaLigada;
                                          objItem.Porcentaje = this.Porcentaje;
                                          objItem.Moneda = this.Moneda;
                                          objItem.Monto = this.Monto;
                                          objItem.CodigoMoneda = this.CodigoMoneda;
                                          objItem.CodigoConfiguracionTarifaLigada = this.CodigoConfiguracionTarifaLigada;
                                          objItem.MonedaTarifaEscalonada = this.MonedaTarifaEscalonada;
                                          objItem.MontoTarifaEscalonada = this.MontoTarifaEscalonada;
                                          objItem.CodigoMonedaTarifaLigada = this.CodigoMonedaTarifaLigada;
                                          objItem.DescripcionMonedaBase = this.DescripcionMonedaBase;
                                          objItem.Accion = "I";
                                          $rootScope.DatosFormulario.RegistroACEscalonado.ListaTarifaLigadaMemoria.push(objItem);
                                      });
                                  }

                              }
                              return true;
                          } else {
                              $(".caja11.msgerror.Objeto").html("Ocurrió un problema interno en el sistema.");
                              return false;
                          }
                      }
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
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Contenedor = data.ListaTipoContenedor;
                          } else {
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Contenedor = [];
                              $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoTipoContenedor = null;
                          }
                      }
                  });
              } else {
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneralCargaInicial.Contenedor = [];
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaGeneral.Filtro.CodigoTipoContenedor = null;
              }
          }
      }]);
})();