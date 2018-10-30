(function () {
    angular.module('api')
    .controller('BuscarClienteMatchCodeController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

    		    if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
            if ($rootScope.DatosFormulario.DatosBusqueda == undefined)
                  $rootScope.DatosFormulario.DatosBusqueda = new Object();
            if ($rootScope.DatosFormulario.DatosGenerales == undefined)
                  $rootScope.DatosFormulario.DatosGenerales = new Object();

                
    				if ($rootScope.DatosFormulario.DatosGenerales.ListaMatchCodeGenerales == undefined)
                  $rootScope.DatosFormulario.DatosGenerales.ListaMatchCodeGenerales = [];

            
            $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientesMatchCode = new Object();
            $rootScope.FlagMostrarBotonSeleccionar = true;



          });
		    
          $scope.Seleccionar_Click = function () {
              miBlock(true, "#divPopupBuscarClienteMatchCode");

              var rowKey = jQuery("#grillaListaClientesMatchCode").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaClientesMatchCode').getRowData(rowKey);
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

              
              
              
              miBlock(false, "#divPopupBuscarClienteMatchCode");
          }

        function ProcesarSeleccionado(data) {
                  
                  var opc = $rootScope.FlagCallClientes;
                  var  CodigoAcuerdoComercial  = "";
                  if ($rootScope.CodigoAcuerdoComercial != undefined && $rootScope.CodigoAcuerdoComercial !="") {
                      CodigoAcuerdoComercial = $rootScope.CodigoAcuerdoComercial;
                  }              
                  
                  $rootScope.DatosFormulario.DatosGenerales.ListaMatchCodeGenerales = $('#grillaListaClientesMatchCode').jqGrid('getRowData');
                  if ($rootScope.DatosFormulario.DatosGenerales.ListaMatchCodeGenerales.length > 0) {
                      var lista = $rootScope.DatosFormulario.DatosGenerales.ListaMatchCodeGenerales;
                      var filtroLista = lista.filter(function (x) { return x.idCheck == "True"; });
                      if (filtroLista.length > 0) {
                          for (var i = 0; i < filtroLista.length; i++) {

                                if (opc =="registroACEscalonadoClienteMatchcode") {
                                    var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaMatchCode, "IdMatchCode");
                                    $scope.gridapigrillaAceListaMatchCode.insertRange([
                                            {
                                                IdMatchCode: nuevoId,
                                                CodigoMatchCode: filtroLista[i].CodigoClienteMatchCode,
                                                CodigoAcuerdoComercialEscalonado : CodigoAcuerdoComercial,
                                                Rol: "",
                                                Accion: "I"
                                            }]);
                                }

                                if (opc =="registroAcLocalClienteMatchcode") {
                                    var nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaMatchCode, "IdMatchCode");
                                    $scope.gridapigrillaACListaMatchCode.insertRange([
                                            {
                                                IdMatchCode: nuevoId,
                                                CodigoMatchCode: filtroLista[i].CodigoClienteMatchCode,
                                                CodigoAcuerdoComercialLocal : CodigoAcuerdoComercial,
                                                Rol: "",
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
              if (idgrilla == "grillaListaClientesMatchCode") {
                  OnOffAllSelectGrilla(idgrilla, check);
              }
          }

  
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "#divPopupBuscarClienteMatchCode");
              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientesMatchCode)) };
              $scope.gridapigrillaListaClientesMatchCode.find(objRequest);
              miBlock(false, "#divPopupBuscarClienteMatchCode");
 
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
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientesMatchCode.CodigoClienteMatchCode = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientesMatchCode.Nombre = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientesMatchCode.Ruc = null;
          }

  
      }]);
})();