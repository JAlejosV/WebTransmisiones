(function () {
    angular.module('api')       
		.controller('ListadoRegistroPagoController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector','$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector,$compile) {
			   
              if($rootScope.DatosFormulario.DatosGenerales==undefined)
                $scope.TipoCambio=0.0;
              else
              	if($rootScope.DatosFormulario.DatosGenerales.ListaTipoCambio==undefined)
                   $scope.TipoCambio=0.0;
                else
                  if($rootScope.DatosFormulario.DatosGenerales.ListaTipoCambio.length==0)
                    $scope.TipoCambio=0.0;
                  else                      
                  	$scope.TipoCambio =  $rootScope.DatosFormulario.DatosGenerales.ListaTipoCambio[0].TipoCambioVenta;
              
			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.

                  	$scope.Init();
                  
           			$('#divPopupRegistroPagos').bind('hide', function () {
                     	$("#pg_ResultadoBuscarLiberacion_pager").find(".ui-pg-button").attr("style","")
                   	});
                  
			    });
              	$scope.Init=function()
                {
                  	if($rootScope.DatosFormulario.DataParaLiberar.ListaDocumentos==undefined)
                    	$rootScope.DatosFormulario.DataParaLiberar.ListaDocumentos=new Array();
                  
                  	var rowObject=$rootScope.DatosFormulario.DocumentoMemoria.CodigosBL;
                  	var objDocumentoBL = $from($rootScope.DatosFormulario.DataParaLiberar.ListaDocumentos).where("$CodigosBL.CodigoNave=='"+rowObject.CodigoNave+"'&&$CodigosBL.NumeroViaje=='"+rowObject.NumeroViaje+"'&&$CodigosBL.PuertoOrigen=='"+rowObject.PuertoOrigen+"'&&$CodigosBL.PuertoDestino=='"+rowObject.PuertoDestino+"'&&$CodigosBL.PuertoEmbarque=='"+rowObject.PuertoEmbarque+"'&&$CodigosBL.DestinoFinal=='"+rowObject.DestinoFinal+"'&&$CodigosBL.CodigoLinea=='"+rowObject.CodigoLinea+"'&&$CodigosBL.NumeroBL=='"+rowObject.NumeroBL+"'").firstOrDefault();
                   	if(objDocumentoBL!==undefined)
                   	{
                   		$rootScope.DatosFormulario.DocumentoMemoria=objDocumentoBL;
                   	}
                 	$scope.Grid_DataBind("ListaPagos",$rootScope.DatosFormulario.DocumentoMemoria.ListaPagos);
                }                 
                 
                
              	$scope.Grid_DataBind=function(grid, data)
              	{
                  	if(grid=="ListaPagos")
                 	{
              			$scope.gridapiResultadoListaPagoTHC.refresh(data);
                      	$scope.CargaListaRecargo();
                	}
                  	if(grid=="ListaRecargos")
                 	{
              			$scope.gridapiResponseDatosRecargo.refresh(data);
                	}
                  
              	}
               $scope.Salir_Click=function()
               {
               		$scope.$parent.SalirPopup_Click();
                 	$("#pg_ResultadoBuscarLiberacion_pager").find(".ui-pg-button").attr("style","")
               }
              
              
                $scope.MiBoton=function(idgrilla,tipoboton, cellvalue, options, rowObject)
                {
                  	var html="";
                  	if(tipoboton=="Editar")
                    {
                      html=HtmlCrearBoton("Modificar","$root.GrillaEditar_Click('"+rowObject.IdPago+"')","");
                    }
                  	if(tipoboton=="Quitar")
                    {
                      html=HtmlCrearBoton("Eliminar","$root.GrillaQuitar_Click('"+rowObject.IdPago+"')","");
                    }
                	return html;
                }
                $rootScope.GrillaEditar_Click=function(IdPago)
                {
                  var objListaPagos=$rootScope.DatosFormulario.DocumentoMemoria.ListaPagos;
                  var objPago = $from(objListaPagos).where("$IdPago=='"+IdPago+"'").firstOrDefault();
                  $rootScope.AbrirEditarPago_Popup(objPago);	     
                }
                $rootScope.GrillaQuitar_Click=function(IdPago)
                {
                  MiConfirm("¿Está Seguro de Eliminar el Pago?", function()
                            {
                  				var objListaPagos=$rootScope.DatosFormulario.DocumentoMemoria.ListaPagos;
                                for(i=objListaPagos.length-1;i>=0;i--)
                                {
                                  if(objListaPagos[i].IdPago==IdPago)
                                  {
                                      objListaPagos.splice(i, 1);
                                  }
                                }
                                $rootScope.DatosFormulario.DocumentoMemoria.ListaPagos=objListaPagos;
                              	$scope.Grid_DataBind("ListaPagos");
                            });
                }
                /*
                $rootScope.AbrirEditarPago_Popup=function(objPago)
                {
                	alert("POPUP");
                }
                */
              	$scope.Grabar_Click=function()
                {
                  	if($from($rootScope.$root.DatosFormulario.DocumentoMemoria.ListaRecargos).where("$MontoPendiente>0").toArray().length>0)
                    {
                    	MiAlert("La suma de los montos de los pagos no puede ser menor al monto de Recargo");
                      	return;
                    }
                	$rootScope.DatosFormulario.DataParaLiberar.ListaDocumentos.push($rootScope.DatosFormulario.DocumentoMemoria);
                  	$scope.$parent.SalirPopup_Click();
                  	$("#pg_ResultadoBuscarLiberacion_pager").find(".ui-pg-button").attr("style","")
                  	
                }
                /*
              	$scope.BusquedaBL=function()
                {
                	if(validateForm("#BusquedaBL")==false)
                    {
                      return false;
                    }
					var objRequest= {
                                        "filtro":$rootScope.DatosFormulario.DataFiltroBuscarBL
                                    };

                    $scope.gridapi.find(objRequest);                  
                }
                
                */
              /*	$rootScope.AgregarListadoDocumentos=function()
                {
                  	var pagosdelBL=$rootScope.DataFormulario.DocumentoMemoria;
                	$rootScope.DatosFormulario.DataParaLiberar.ListaDocumentos.push(pagosdelBL);
                }
                $rootScope.AgregarPagoItem=function(pago)
                {
                	$rootScope.DatosFormulario.DocumentoMemoria.ListaPagos.push(pago)
                }*/
                
                $scope.Agregar_Click=function(){
                	//$rootScope.Redirect("/#!/sistema/liberacion-de-bl/registro-de-pago");
                  
						
                        
                  getPopupResponsive({
                            formURL: "es-PE/sistema/liberacion-de-bl/registro-de-pago/",
                            title: "Detalle del Pago",
                            nombreDiv: "divPopupDetallePagos",
                            nombreGrid: "",
                            width: "650px",
                          	height:'500',
                          	params: {},
                            HideSelection: true,    
                            multiSelect: false,
                            select: function (row) {
                              
                              	//llena aqui o cuando completa el grabado:  $rootScope.DatosFormulario.DataParaLiberar
                                return true;
                            },
                          	beforeShow: function (obj) {
                              	$rootScope.hashPopup=$(obj).attr("mapurl");
                              	$(obj).attr("ModoPagina","Nuevo");
                                $compile($("#divPopupDetallePagos"))($scope);
                            },

                        });

                  
                }
                
                TransformarListaRecargo= function(arrayRecargos)
                {
                  	var listaTotalesPagos=new Array();
           
                  	var tipocambio=$scope.TipoCambio;
                  	var listaPagos  =$scope.$root.DatosFormulario.DocumentoMemoria.ListaPagos;
                    for(var i=0;i<listaPagos.length;i++)
                    {
                      	var objRow	=	listaPagos[i];
                    	var monto 	= 	parseFloat(objRow.MontoDocumento,10);
                      	var moneda 	=	objRow.CodigoMoneda;
                      	var CodigoRecargo 	=	objRow.CodigoRecargo;
                      	var montoDolares=0.0;
                      
                      	var itemTotalPago = $from(listaTotalesPagos).where("$CodigoRecargo=='"+CodigoRecargo+"'").firstOrDefault();
                      	
                      	if(moneda=="105")
                        {
                        	montoDolares=monto;
                        }
                      	else
                      	{
                              	montoDolares=monto/tipocambio;
                      	}
                      	var objRow=new Object();
                      	if(itemTotalPago==undefined||itemTotalPago==null)
                        {
                          	objRow.CodigoRecargo=CodigoRecargo;
                          	objRow.MontoDolares=montoDolares;
                          	listaTotalesPagos.push(objRow);
                        }
                      	else
                        {
                          	//se refresca solo
                       		itemTotalPago.MontoDolares=itemTotalPago.MontoDolares + montoDolares;
                        }
                      	
                    }
                  
                  	var listaRecargos= new Array();
                	for(var x=0;x<arrayRecargos.length;x++)
                    {
                      var newRecargo = new Object();
                      newRecargo.DescripcionRecargo  = arrayRecargos[x].DescripcionRecargo;
                      newRecargo.MonedaRecargo = arrayRecargos[x].DescripcionMoneda;
                      newRecargo.MontoRecargo = arrayRecargos[x].Monto;
                      var CodigoRecargo=arrayRecargos[x].CodigoRecargo;
                      var itemTotalPago = $from(listaTotalesPagos).where("$CodigoRecargo=='"+CodigoRecargo+"'").firstOrDefault();
                      if(itemTotalPago==undefined|| itemTotalPago==null)
                      {
                      	newRecargo.MontoPagado=0.0;
                      }
                      else
                      {
                        newRecargo.MontoPagado =itemTotalPago.MontoDolares;
                      }
                      var montoPendiente= newRecargo.MontoRecargo-newRecargo.MontoPagado;
                      if(montoPendiente<0)
                      	montoPendiente=0;
                      newRecargo.MontoPendiente =montoPendiente;
                      
                      listaRecargos.push(newRecargo);
                    }
                    $rootScope.DatosFormulario.DocumentoMemoria.ListaRecargos = listaRecargos;
                  	$scope.Grid_DataBind("ListaRecargos",$rootScope.DatosFormulario.DocumentoMemoria.ListaRecargos);
                }
                $scope.CargaListaRecargo=function()
                {
                	 var param=$rootScope.DatosFormulario.DocumentoMemoria.CodigosBL;
                  	 
					 $.ajax({
                                    url:"/ModuloCalculadorWebAgma/IndexRegistroPago",
                                    type:"POST",
                                    headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                    //data:param,
                       				data:param,
                                    dataType:"json",
                    				async:false,
                                    success:function(data){

                                      if($rootScope.DatosFormulario==undefined)
                                          $rootScope.DatosFormulario=new Object();
                                  	  var arrayRecargos= JSON.parse(data).ListaRecargo;
                                      TransformarListaRecargo(arrayRecargos);
                                    }
                                });  
                  
                  
                  	
                }
                
               
                
            }]);


})();
             