(function () {
    angular.module('api')       
		.controller('ConsultaAgentesController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector','$window',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector,$window) {
			   
			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.
                   	$scope.CargarDatosIniciales(); 
			    });
              	$scope.Salir_Click=function()
                {
                    $rootScope.Redirect("/#!/sistema/bienvenido/");
                }
              	$scope.Limpiar_Click=function()
                {
                  	//$scope.DatosFormulario=null;
                	$rootScope.DatosFormulario.DataInicialBuscarAgentes.FechaInicio="";
                  	$rootScope.DatosFormulario.DataInicialBuscarAgentes.FechaFin="";
                  	$rootScope.DatosFormulario.DataInicialBuscarAgentes.RUC="";
                  	$rootScope.DatosFormulario.DataInicialBuscarAgentes.RazonSocial="";
                  	$scope.CargarDatosIniciales(true);
                }
                $scope.MiBoton=function(idgrilla,tipoboton, cellvalue, options, rowObject)
                {
                  
                   //'<button ng-click="$root.Ver_Detalle(\''  + rowObject.Ruc + '\'' + ',' + '\'' + rowObject.RazonSocial + '\'' + ',' + '\'' + rowObject.CodigoCliente + '\'' + ',' + '\'' + rowObject.CantidadBLImpo + '\');">Ver</button>'; 
                  var eventoclick="$root.Ver_Detalle('"  + rowObject.Ruc + "','"+ rowObject.RazonSocial + "','"+rowObject.CodigoCliente + "','"+ rowObject.CantidadBLImpo + "');";
                  html=HtmlCrearBoton("Modificar",eventoclick,"");
                  return html;
                }
                
                $rootScope.Ver_Detalle=function(ruc,razonsocial,codigocliente,cantidadBLImpo){
                   DobleClicBusquedaAgente(ruc,razonsocial,codigocliente,cantidadBLImpo);
                }
                
                DobleClicBusquedaAgente=function(ruc,razonsocial,codigocliente,cantidadBLImpo)
                {
                
                  
                  if (cantidadBLImpo == "0"){
                  	MiAlert(" El agente seleccionado no tiene Bl’s pendientes de Liberar ");
                  }
                  else{
                    
                     
                       if($rootScope.DatosFormulario==undefined)
                       $rootScope.DatosFormulario=new Object();
                    
            			$rootScope.DatosFormulario.DataFiltroBuscarBL=new Object(); 
                		$rootScope.DatosFormulario.DataFiltroBuscarBL.Ruc=ruc;
               	 		$rootScope.DatosFormulario.DataFiltroBuscarBL.RazonSocial=razonsocial;
               			$rootScope.DatosFormulario.DataFiltroBuscarBL.CodigoAgente=codigocliente;
                		$rootScope.DatosFormulario.DataFiltroBuscarBL.FechaInicio =$rootScope.DatosFormulario.DataInicialBuscarAgentes.FechaInicio;
                		$rootScope.DatosFormulario.DataFiltroBuscarBL.FechaFin =$rootScope.DatosFormulario.DataInicialBuscarAgentes.FechaFin;
                    
                 
                    
                   
                    	$rootScope.Redirect("/#!/sistema/liberacion-de-bl/busqueda-de-bl");
                    //$window.location.reload();
                 	//setTimeout("window.location.href = '/#!/sistema/liberacion-de-bl/busqueda-de-bl'; ",1000);   
                  
                    

                  }
                }
                $scope.GrillaDblClick=function(obj, idgrilla,rowid, iRow, iCol, e)
                {
                  var ret = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
                  
                	DobleClicBusquedaAgente(ret.Ruc,ret.RazonSocial,ret.CodigoCliente,ret.CantidadBLImpo);
                  


                }
                $scope.Buscar_Click=function()
                {
                  
                  
                  if($rootScope.DatosFormulario.DataInicialBuscarAgentes.Ruc != undefined) { 	
                    if($rootScope.DatosFormulario.DataInicialBuscarAgentes.Ruc.length>0)
                    {
                      if(! HelperJS.Validaciones.esrucok($rootScope.DatosFormulario.DataInicialBuscarAgentes.Ruc))
                      { 
                        $(".caja11msgerrorRuc span").text("Ingrese un Ruc valido.");
                        return false; 
                      }
                      else
                      {
                        $(".caja11msgerrorRuc span").text("");
                      }	
                    }
 				  } 	

                  

                    if(validateForm("#BusquedaAgenteFrm")==false)
                    {
                      return false;
                    }
                  
                  	miBlock(true,"html");
                  
					var objRequest= {
                                        "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DataInicialBuscarAgentes))
                                      };

                    $scope.gridapiResponseListaClienteLiberacion.find(objRequest);
                  
                  	miBlock(false,"html");
                  
                }
                
              	$scope.CargarDatosIniciales = function(continuar){
                  /*
                  if(continuar==undefined)
                  {
                  if($rootScope.DatosFormulario.DataInicialBuscarAgentes!=undefined){
                    return;
                  }
                  }
                  */
                  $.ajax({
                                    url:"/ModuloCalculadorWebAgma/BuscarAgentes",
                                    type:"POST",
                                    headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                    data:"",
                    				dataType:"json",
                    				cache:true,
                    				async:false,
                                    success:function(data){
        								if($rootScope.DatosFormulario==undefined)
                                          $rootScope.DatosFormulario=new Object();
                                  		$rootScope.DatosFormulario.DataInicialBuscarAgentes=data;
                                    }
                                });
             
                	
                }
                
                
				$scope.SoloNumeros=function(eventKey){
                  
                  return HelperJS.Validaciones.EscribeSoloNumero(eventKey,false);
                
                }
              
              	
			}]);


})();