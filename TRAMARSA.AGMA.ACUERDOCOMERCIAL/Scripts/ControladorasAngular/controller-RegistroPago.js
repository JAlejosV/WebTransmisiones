(function () {
    angular.module('api')       
		.controller('RegistroPagoController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector','$attrs',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector,$attrs) {
			   
			    $timeout(function () {
			        	//aqui también puede activar plugins, se ejecuta al final de carga de página.
						$scope.Init();
			    });
                /*
                $rootScope.AbrirEditarPago_Popup=function(objPago)
                {
                	alert("POPUP");
                }
                */
                $scope.Init=function()
                {
                   
                  //instanciando datos
                  if($rootScope.DatosFormulario==undefined)
                    $rootScope.DatosFormulario=new Object();
                  if($rootScope.DatosFormulario.DatosRegistroPago==undefined)
                    $rootScope.DatosFormulario.DatosRegistroPago=new Object();
                  
                  $rootScope.DatosFormulario.DatosRegistroPago.DetallePago=undefined;
                  
                  if($rootScope.DatosFormulario.DatosRegistroPago.DetallePago==undefined)
                    $rootScope.DatosFormulario.DatosRegistroPago.DetallePago=new Object();
                  
                 
                  
                  
                  
                  
                  
                  //carga combos solo una vez
                  if($rootScope.DatosFormulario.DatosRegistroPago.Bancos!=undefined)
                  {
                    ValoresPorDefectoCombo();
                    return;
                  }
					 $.ajax({
                                    url:"/ModuloCalculadorWebAgma/RegistroPago",
                                    type:"POST",
                                    headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                    //data:param,
                       				data:"",
                                    dataType:"json",
                    				async:false,
                                    success:function(data){
                                      var jdata=JSON.parse(data);
                                      
                                      
                                      $rootScope.DatosFormulario.DatosRegistroPago.Bancos=jdata.Bancos;
                                      $rootScope.DatosFormulario.DatosRegistroPago.TipoDocumento=jdata.TipoDocumento;
                                      $rootScope.DatosFormulario.DatosRegistroPago.TipoMoneda=jdata.TipoMoneda;
                                      $rootScope.DatosFormulario.DatosRegistroPago.TipoRecargo=jdata.TipoRecargo;
                                      ValoresPorDefectoCombo();
                                    }
                                });   
                }
                ValoresPorDefectoCombo=function()
                {
                //valores por defecto
                                
                  
                   if($rootScope.DatosFormulario.DatosRegistroPago.Bancos.length>0)
                    $rootScope.DatosFormulario.DatosRegistroPago.DetallePago.CodigoBanco=$from($scope.$root.DatosFormulario.DatosGenerales.ListaValoresDefecto).where("$CodigoParametro=='BancoDefault'").firstOrDefault().ValorDefecto;
                  //$rootScope.DatosFormulario.DatosRegistroPago.DetallePago.CodigoBanco=$rootScope.DatosFormulario.DatosRegistroPago.Bancos[0].CodigoBanco;
                  if($rootScope.DatosFormulario.DatosRegistroPago.TipoDocumento.length>0)
                    $rootScope.DatosFormulario.DatosRegistroPago.DetallePago.CodigoTipoDocumento=$from($scope.$root.DatosFormulario.DatosGenerales.ListaValoresDefecto).where("$CodigoParametro=='TipoDocumentoDefault'").firstOrDefault().ValorDefecto;
                  //$rootScope.DatosFormulario.DatosRegistroPago.DetallePago.CodigoTipoDocumento=$rootScope.DatosFormulario.DatosRegistroPago.TipoDocumento[0].TipoDocumento ;
                  if($rootScope.DatosFormulario.DatosRegistroPago.TipoMoneda.length>0)
                    $rootScope.DatosFormulario.DatosRegistroPago.DetallePago.CodigoMoneda=$from($scope.$root.DatosFormulario.DatosGenerales.ListaValoresDefecto).where("$CodigoParametro=='MonedaDefault'").firstOrDefault().ValorDefecto;
                  //$rootScope.DatosFormulario.DatosRegistroPago.DetallePago.CodigoMoneda=$rootScope.DatosFormulario.DatosRegistroPago.TipoMoneda[0].Codigo;
                  
                  if($rootScope.DatosFormulario.DatosRegistroPago.TipoRecargo.length>0)
                    $rootScope.DatosFormulario.DatosRegistroPago.DetallePago.CodigoRecargo=$rootScope.DatosFormulario.DatosRegistroPago.TipoRecargo[0].Codigo;
                  
                }
               
               $scope.Salir_Click=function()
               {
               		$scope.$parent.SalirPopup_Click();
               }
			   $scope.Grabar_Click=function(){
                //	alert("prueba");
                // event.preventDefault();

                 if(validateForm("#RegistroDetallePagoForm")==false)
                 {
                   return false;
                 }
                 else
                 {
                   		var pagosdelBL=$rootScope.DatosFormulario.DatosRegistroPago.DetallePago;
                   		var objPagoTmp=new Object();
                   		angular.copy(pagosdelBL, objPagoTmp);
                   
                   		var nroRegistros= $from($scope.$root.DatosFormulario.DocumentoMemoria.ListaPagos).where("$CodigoBanco=='"+objPagoTmp.CodigoBanco+"' && $CodigoMoneda=='"+objPagoTmp.CodigoMoneda+"' && $NroOperacionVaucher=='"+objPagoTmp.NroOperacionVaucher+"'").toArray().length;
                   		if(nroRegistros>0)
                        {
                          	MiAlert("Ya ingresó el número de vaucher "+objPagoTmp.NroOperacionVaucher);
                        	return false;
                        }
                     	
                   		
                   
                       objPagoTmp.DescripcionBanco=$("select[ng-model='$root.DatosFormulario.DatosRegistroPago.DetallePago.CodigoBanco']").find("option:selected").text();
                       objPagoTmp.DescripcionTipoDocumento=$("select[ng-model='$root.DatosFormulario.DatosRegistroPago.DetallePago.CodigoTipoDocumento']").find("option:selected").text();
                       objPagoTmp.DescripcionMoneda=$("select[ng-model='$root.DatosFormulario.DatosRegistroPago.DetallePago.CodigoMoneda']").find("option:selected").text();
                       objPagoTmp.DescripcionRecargo=$("select[ng-model='$root.DatosFormulario.DatosRegistroPago.DetallePago.CodigoRecargo']").find("option:selected").text();
                   
                   		var objMinIdPago = $from($rootScope.DatosFormulario.DocumentoMemoria.ListaPagos).min("parseInt($IdPago)");
                   		var	nuevoId=-1;
                        if(objMinIdPago!=undefined)
                          	nuevoId=objMinIdPago.IdPago-1;
                   
                        objPagoTmp.IdPago=nuevoId;
                   		
                   
                  		$rootScope.DatosFormulario.DocumentoMemoria.ListaPagos.push(objPagoTmp);
						$scope.$parent.$parent.Grid_DataBind("ListaPagos");

                   		//$("#divPopupDetallePagos").dialog("close");
                   		$("#divPopupDetallePagos").modal("hide");
                 }
                 
              
                }
                
           
              
            }]);


})();
             