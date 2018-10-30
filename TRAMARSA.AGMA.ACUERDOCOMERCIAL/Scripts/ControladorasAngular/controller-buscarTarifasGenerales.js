(function () {
    angular.module('api')
    .controller('BuscarTarifaGeneralesController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              $scope.CargarDatosIniciales();
          });
          $scope.CargarDatosIniciales = function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial = new Object();

              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro == undefined)
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro = new Object();
              $rootScope.FlagMostrarBotonSeleccionar = true;
              $.ajax({
                  url: "/TarifaGenerales/ConsultarTarifaGeneralesIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      //$rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.Sucursal = data.Sucursal;
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.Linea = data.Linea;
                      $scope.Limpiar_Click();
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.Linea[0].Codigo
                      $scope.CargarSucursal();
                      if (data.Linea.length == 1) {
                          $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.Habilitado = 'False';
                      }
                      $scope.$apply();
                      $scope.Buscar_Click();
                  }
              });
              $("#VigenteTarifaLocal").prop("checked", true);
              $scope.Limpiar_Click();
              if($rootScope.DatosFormulario.OpcionTarifaGenerales != "AcuerdoComercial"){
                  $("#grillaListaTarifasGenerales").hideCol("idCheck");
              }
          }
          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 60);
              if (idgrilla == "grillaListaTarifasGenerales") {
                  OnOffAllSelectGrilla(idgrilla, check);
              }
          }
          /*
          $scope.CargarTerminalPortuario = function () {
              var param = $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoSucursal;
              $.ajax({
                  url: "/Maestros/ListarTerminalPortuarioBySucursal",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoSucursal=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.TerminalPorturario = data.TerminalPorturario;
                  }
              });
          }
          */
           $scope.CargarTerminalPortuario = function () {
             var codLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoLinea;
             var codSucursal = $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoSucursal;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.TerminalPorturario = ObtenerTerminalesByLinea(codLinea,codSucursal);
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoTerminalPortuario = null;
         }  
          $scope.CargarSucursal = function () {
             var codLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoLinea;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.Sucursal  = ObtenerSucursalesByLinea(codLinea);
               $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoSucursal = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.TerminalPorturario = [];
         }

          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {             
              if($rootScope.DatosFormulario.OpcionTarifaGenerales != "AcuerdoComercial"){
                  var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
                  var estado = ProcesarSeleccionado(data);
                  if (estado) {
                      $rootScope.$apply();
                      $scope.$parent.SalirPopup_Click();
                  }
              }
          }
          function ProcesarSeleccionado(data) {
              var opcion = $rootScope.DatosFormulario.OpcionTarifaGenerales;
              if (opcion == "TarifaLigada") {
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa = data.DescripcionTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda = data.DescripcionMoneda;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto = data.Monto;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal = data.CodigoTarifaLocal;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa = data.CodigoTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada = data.CodigoMoneda;
              }
              else if (opcion == "TarifaEscalonada") {

                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa = data.DescripcionTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda = data.DescripcionMoneda;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto = data.Monto;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal = data.CodigoTarifaLocal;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa = data.CodigoTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada = data.CodigoMoneda;
              }
              else if (opcion == "AcuerdoComercialEscalonado") {

                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.DescripcionTarifa = data.DescripcionTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Moneda = data.DescripcionMoneda;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.Monto = data.Monto;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifaLigadaLocal = data.CodigoTarifaLocal;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoTarifa = data.CodigoTarifa;
                  $rootScope.DatosFormulario.DataConfiguracionTarifaLigada.CodigoMonedaTarifaLigada = data.CodigoMoneda;
              }
              else if (opcion == "reporteTarifaLocal") {
                  $rootScope.DatosFormulario.ReporteTarifaLocal.Filtro.CodigoTarifaLocal = data.CodigoTarifaLocal;
                  $rootScope.DatosFormulario.ReporteTarifaLocal.Datos.NombreTarifa = data.DescripcionTarifa;
              }
              else if (opcion == "AcuerdoComercial") {
                 $rootScope.DatosFormulario.RegistroAC.ListaTarifasGenerales = $('#grillaListaTarifasGenerales').jqGrid('getRowData');
                  if ($rootScope.DatosFormulario.RegistroAC.ListaTarifasGenerales .length > 0) {
                      var lista = $rootScope.DatosFormulario.RegistroAC.ListaTarifasGenerales ;
                      var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });
                        if (filtroLista.length > 0) {
                          var nuevoId;
                          for (var i = 0; i < filtroLista.length; i++) {
                              var listaExiste = $.grep($rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas, function (e) { return e.CodigoTarifaLocal == filtroLista[i].CodigoTarifaLocal; });
                              if (listaExiste.length > 0) {
                                  $(".caja11.msgerror.Objeto").html("La Tarifa Local ya existe, seleccione otra.");
                                  return false;
                              } else {
                                  $(".caja11.msgerror.Objeto").html("");
                              }
                              nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas, "IdConfiguracionTarifa");
                                var newObjet = {
                                    IdConfiguracionTarifa: nuevoId,
                                    CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                                    CodigoTarifaLocal: filtroLista[i].CodigoTarifaLocal,
                                    DescripcionTarifa: filtroLista[i].DescripcionTarifa,
                                    Moneda: filtroLista[i].DescripcionMoneda,
                                    MontoBase: filtroLista[i].Monto,
                                    CodigoTipoDescuento: null,
                                    ValorDescuento: "0",
                                    CodigoMonedaAcuerdo: null,
                                    MontoAcuerdo: "0",
                                    Accion: "I"
                                };
                                  CargarTarifaLigadaAcuerdoComercial(filtroLista[i].CodigoTarifaLocal, nuevoId);
                                  $scope.gridapiListaConfiguracionTarifas.insertRange([newObjet]);
                              
                                            
                                  if ($.inArray(newObjet, $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList) > -1) {
                                  } else {
                                      $rootScope.DatosFormulario.RegistroAC.grillaListaConfiguracionTarifasMemoriaList.push(newObjet);
                                  }
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
          function CargarTarifaLigadaAcuerdoComercial(param, idConfiguracionTarifa) {
              $.ajax({
                  url: "/TarifaPlana/ConsultarDetalleTarifaLocal",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "codigoTarifaLocal=" + param,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          if (data.DetalleTarifaLocalList.length > 0) {
                              var listaLigada = data.DetalleTarifaLocalList[0].TarifaLocalLigadaList;
                              $(listaLigada).each(function (j) {
                                  this.IdConfiguracionTarifa = idConfiguracionTarifa;
                                  this.Accion = "I";
                                  this.CodigoTarifaLocal = data.DetalleTarifaLocalList[0].CodigoTarifaLocal;
                                  $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList.push(this);
                                  if ($.inArray(this, $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList) > -1) {
                                  } else {
                                      $rootScope.DatosFormulario.DatosTarifaLocal.grillaListaTarifaLigadaMemList.push(this);
                                  }
                              });
                          }
                      }
                  }
              });
          }
          $scope.Seleccionar_Click = function () {  
              if($rootScope.DatosFormulario.OpcionTarifaGenerales == "AcuerdoComercial"){
                  var lstGeneralLista = $('#grillaListaTarifasGenerales').jqGrid('getRowData');                    
                  if (lstGeneralLista.length > 0) {                     
                      var filtroLista = lstGeneralLista.filter(function (x) { return x.idCheck == "True"; });
                        if (filtroLista.length > 0) {
                          var existe=false;
                          for (var i = 0; i < filtroLista.length; i++) {
                              var listaExiste = $.grep($rootScope.DatosFormulario.RegistroAC.ListaConfiguracionTarifas, function (e) { return e.CodigoTarifaLocal == filtroLista[i].CodigoTarifaLocal; });
                              if (listaExiste.length > 0) {
                                  existe = true;
                              }                               
                          }
                          if(existe)
                          {
                             $(".caja11.msgerror.Objeto").html("La Tarifa Local ya existe, seleccione otra.");
                             return false;
                          }
                          else
                          {
                            $(".caja11.msgerror.Objeto").html("");
                            var estado = ProcesarSeleccionado(filtroLista);
                            if (estado) {
                                $scope.$parent.SalirPopup_Click();
                            }
                            else
                            {
                              return false;
                            }
                          }
                      } else {
                          $(".caja11.msgerror.Objeto").html("Seleccione por lo menos un registro.");
                          return false;
                      }
                  }     
              }
              else
              {
                var rowKey = jQuery("#grillaListaTarifasGenerales").jqGrid('getGridParam', 'selrow');
                if (rowKey != undefined) {
                    if (rowKey.length > 0) {
                        var rowObject = jQuery('#grillaListaTarifasGenerales').getRowData(rowKey);
                        var estado = ProcesarSeleccionado(rowObject);
                        if (estado) {
                            $scope.$parent.SalirPopup_Click();
                        }
                        $(".caja11.msgerror.Objeto").html("");
                    } else {
                        $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                    }
                } else {
                    $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                }
              }
          }
          $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.DescripcionTarifa = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoSucursal = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoTerminalPortuario = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.TerminalPorturario = null;
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.Linea.length > 1) {
                  //$rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoLinea = null;
              }
          }
          $scope.Salir_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.DescripcionTarifa = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoSucursal = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoTerminalPortuario = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.TerminalPorturario = null;
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneralCargaInicial.Linea.length > 1) {
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoLinea = null;
              }
              $scope.$parent.SalirPopup_Click();
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarTarifaLigada");
              if (validateForm("#BusquedaTarifaGeneralFrm") == false) {
                  miBlock(false, "#divPopupBuscarTarifaLigada");
                  return false;
              }
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.FlagVigente == null || $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.FlagVigente == undefined) {
                  $rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.FlagVigente = true;
              }
              if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro.CodigoLinea.length > 0) {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosBusquedaTarifaGeneral.Filtro)) };
                  $scope.gridapigrillaListaTarifasGenerales.find(objRequest);
                  miBlock(false, "#divPopupBuscarTarifaLigada");
              }
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