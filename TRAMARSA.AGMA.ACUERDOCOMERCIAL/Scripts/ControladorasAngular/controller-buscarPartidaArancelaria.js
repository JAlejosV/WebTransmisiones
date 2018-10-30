(function () {
    angular.module('api')
    .controller('BuscarPartidaArancelariaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

                if ($rootScope.DatosFormulario == undefined)
                      $rootScope.DatosFormulario = new Object();
                if ($rootScope.DatosFormulario.DatosBusqueda == undefined)
                      $rootScope.DatosFormulario.DatosBusqueda = new Object();
                if ($rootScope.DatosFormulario.DatosGenerales == undefined)
                      $rootScope.DatosFormulario.DatosGenerales = new Object();
                if ($rootScope.DatosFormulario.DatosGenerales.ListaPartidaArancelariaGenerales == undefined)
                      $rootScope.DatosFormulario.DatosGenerales.ListaPartidaArancelariaGenerales = [];

                $rootScope.DatosFormulario.DatosGenerales.DataBuscarPartidaArancelaria = new Object();
                $rootScope.FlagMostrarBotonSeleccionar = true;

          });

          $scope.Seleccionar_Click = function () {
              miBlock(true, "#divPopupBuscarPartidaArancelaria");
 
              var rowKey = jQuery("#grillaListaPartidaArancelaria").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaPartidaArancelaria').getRowData(rowKey);
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
              }else{

                if (ProcesarSeleccionado()) {
                   $scope.$parent.SalirPopup_Click();
                 }
              }
 
              miBlock(false, "#divPopupBuscarPartidaArancelaria");
          }

       function ProcesarSeleccionado(data) {
                  
                  var opc = $rootScope.FlagCallPartidaArancelaria;
                  var  CodigoAcuerdoComercial  = "";
                  if ($rootScope.CodigoAcuerdoComercial != undefined && $rootScope.CodigoAcuerdoComercial !="") {
                      CodigoAcuerdoComercial = $rootScope.CodigoAcuerdoComercial;
                  }        


                  $rootScope.DatosFormulario.DatosGenerales.ListaPartidaArancelariaGenerales = $('#grillaListaPartidaArancelaria').jqGrid('getRowData');
                  if ($rootScope.DatosFormulario.DatosGenerales.ListaPartidaArancelariaGenerales.length > 0) {
                      var lista = $rootScope.DatosFormulario.DatosGenerales.ListaPartidaArancelariaGenerales;
                      var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });
                      if (filtroLista.length > 0) {
                          for (var i = 0; i < filtroLista.length; i++) {
                                
                                if (opc =="registroACEscalonadoPartidaArancelaria") {

                                     var listaExiste = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaPartidaArancelaria, function (e) { 
                                      return e.CodigoPartidaArancelaria == filtroLista[i].CodigoPartidaArancelaria; 
                                     });

                                      if (listaExiste.length > 0) {
                                          $(".caja11.msgerror.Objeto").html("La Partida Arancelaria ya existe, seleccione otra.");
                                          return false;
                                      } else {
                                          $(".caja11.msgerror.Objeto").html("");
                                      }
                                      var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaPartidaArancelaria, "IdPA");
                                      $scope.gridapigrillaAceListaPartidaArancelaria.insertRange([
                                                {
                                                    IdPA: nuevoId,
                                                    IdPartidaArancelaria: 0,
                                                    CodigoAcuerdoComercialEscalonado: CodigoAcuerdoComercial,
                                                    CodigoPartidaArancelaria : filtroLista[i].CodigoPartidaArancelaria,
                                                    Accion: "I"
                                                }]);
                                }

                                if (opc=="registroAcLocalPartidaArancelaria") {

                                    var listaExiste = $.grep($rootScope.DatosFormulario.RegistroAC.ListaPartidaArancelaria, function (e) { 
                                      return e.CodigoPartidaArancelaria == filtroLista[i].CodigoPartidaArancelaria; 
                                     });

                                      if (listaExiste.length > 0) {
                                          $(".caja11.msgerror.Objeto").html("La Partida Arancelaria ya existe, seleccione otra.");
                                          return false;
                                      } else {
                                          $(".caja11.msgerror.Objeto").html("");
                                      }
                                      var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaPartidaArancelaria, "IdPA");
                                      $scope.gridapigrillaACListaPartidaArancelaria.insertRange([
                                                {
                                                    IdPA: nuevoId,
                                                    IdPartidaArancelaria: 0,
                                                    CodigoAcuerdoComercialLocal: CodigoAcuerdoComercial,
                                                    CodigoPartidaArancelaria : filtroLista[i].CodigoPartidaArancelaria,
                                                    Accion: "I"
                                                }]);
                                }
                          }
                          $(".caja11.msgerror.Objeto").html("");
                      } else {
                          $(".caja11.msgerror.Objeto").html("Seleccione por lo menos un registro.");
                          return false;
                      }
                  }
              
              return true;
          }
         
    
          $scope.checkBoxGrilla = function (event, idgrilla) {
              var check = angular.element(event.target)[0].checked;
              setTimeout('$("#gbox_' + idgrilla + '").find("#' + event.target.id + '").prop("checked",' + check + ')', 60);
              if (idgrilla == "grillaListaPartidaArancelaria") {
                  OnOffAllSelectGrilla(idgrilla, check);
              }
          }
      
  
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarPartidaArancelaria");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DatosGenerales.DataBuscarPartidaArancelaria)) };
              $scope.gridapigrillaListaPartidaArancelaria.find(objRequest);
              miBlock(false, "#divPopupBuscarPartidaArancelaria");
 
          }
          
          $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
              var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
              var estado = ProcesarSeleccionado(data);
              if (estado) {
                  $rootScope.$apply();
                  $scope.$parent.SalirPopup_Click();
              }
          }

          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });

          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
		  
           $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarPartidaArancelaria.CodigoPartidaArancelaria = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarPartidaArancelaria.Nombre = null;
        
          }
  
      }]);
})();