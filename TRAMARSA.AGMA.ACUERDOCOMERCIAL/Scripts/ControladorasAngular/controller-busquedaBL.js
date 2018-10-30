(function () {
    angular.module('api')       
		.controller('BusquedaBLController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector','$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector,$compile) {
			   
              
              
              if($rootScope.DatosFormulario==undefined||$rootScope.DatosFormulario.DataFiltroBuscarBL==undefined)
              {
              	window.location.href = "/";
              }
              else
              {
              	$rootScope.DatosFormulario.DataFiltroBuscarBL.FiltroCheck="CodCli";
              
             
              
			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.
                  	$scope.Buscar_Click();
                  	//comienza vacia la lista
                  	$rootScope.DatosFormulario.DataParaLiberar=new Object;
                  	//$scope.DatosPrueba();
                  
                  	sessionStorage.clear();
                  
			    });
            
              }
              $scope.VerificarSiInactivar=function(rowObject,nameCol)
              {
                var salida=false;
                if(nameCol=="Liberar")
                {
                  	salida=false; 
                }
                else
                {
                	/*if(options.colModel.name=="FlagThc")
                    {
                    	if(rowObject.FlagThc!='X')
                          salida=true; 
                    }        */        
                }
                //devuelve true para inactivar.
              	return salida;
              }
              $scope.VerificarSiMarcar=function(rowObjectMemory,rowObject,nameCol)
              {
                var salida=false;
                if(nameCol=="Liberar")
                {
                  	if(rowObjectMemory==undefined)
                      return false;
                	//var itemDocumento	 = $from($rootScope.DatosFormulario.DataParaLiberar.ListaDocumentos).where("$CodigoNave=='"+rowObject.CodigoNave+"'&&$NumeroViaje=='"+rowObject.NumeroViaje+"'&&$PuertoOrigen=='"+rowObject.PuertoOrigen+"'&&$PuertoDestino=='"+rowObject.PuertoDestino+"'&&$PuertoEmbarque=='"+rowObject.PuertoEmbarque+"'&&$DestinoFinal=='"+rowObject.DestinoFinal+"'&&$CodigoLinea=='"+rowObject.CodigoLinea+"'&&$NumeroBL=='"+rowObject.NumeroBL+"'").firstOrDefault();
                    if(rowObjectMemory.CodigoNave==undefined)
                      return false;
                    if(rowObjectMemory.CodigoNave==rowObject.CodigoNave&&
                      rowObjectMemory.NumeroViaje==rowObject.NumeroViaje&&
                      rowObjectMemory.PuertoOrigen==rowObject.PuertoOrigen&&
                      rowObjectMemory.PuertoDestino==rowObject.PuertoDestino&&
                      rowObjectMemory.PuertoEmbarque==rowObject.PuertoEmbarque&&
                      rowObjectMemory.DestinoFinal==rowObject.DestinoFinal&&
                      rowObjectMemory.CodigoLinea==rowObject.CodigoLinea&&
                      rowObjectMemory.NumeroBL==rowObject.NumeroBL)
                    {
                        salida= true;
                    }
                }
                else
                {
                	/*if(options.colModel.name=="FlagThc")
                    {
                    	if(rowObject.FlagThc=='X')
                          salida=true; 
                    } */               
                }
              	return salida;
              }
              $scope.CompleteJqGRid=function(nameGrilla)
              {
              	if(nameGrilla=="ResultadoBuscarLiberacion")
                {
                	var rows= jQuery("#"+nameGrilla).jqGrid('getRowData');
                  	var accion="Liberar";
                  var colCheckMarcar=0;
                  	$.each(rows, function(x)
                           {
                              if(rows[x].FlagThc=="False")
                              {
                                       $($('#'+nameGrilla).find("tr[role=row][id="+(x+1)+"]").find("td")[9]).find("input[type=checkbox]").attr("disabled","disabled")
                              }
                             
                             
                             
                                var idsAlmacenado2 = JSON.parse(sessionStorage.getItem(nameGrilla));
                             rows[x].Liberar=undefined;
                             rows[x].FlagThc=undefined;
                             rows[x].Agregar=undefined;
                                var jsondata=encodeURIComponent(JSON.stringify(rows[x]));
                                if(idsAlmacenado2==null)
                                {
                                  idsAlmacenado2=new Array();
                                }
                             	if($scope.VerificarSiInactivar(rows[x],accion)==true){
                                	$($('#ResultadoBuscarLiberacion').find("tr[role=row][id="+(x+1)+"]").find("td")[colCheckMarcar]).find("input[type=checkbox]").attr("disabled","disabled");
                                }
                             	if($scope.VerificarSiMarcar(undefined,rows[x],accion)==true){
									$($('#ResultadoBuscarLiberacion').find("tr[role=row][id="+(x+1)+"]").find("td")[colCheckMarcar]).find("input[type=checkbox]").attr("tooltip",accion);
                                  	
                                }
                             	var jsevento="checkBoxGrillaItem(this,'"+accion+"','"+jsondata+"','"+nameGrilla+"')";
                             	
                             	 $($('#'+nameGrilla).find("tr[role=row][id="+(x+1)+"]").find("td")[0]).find("input[type=checkbox]").attr("onclick",jsevento);
                             	 $.each(idsAlmacenado2, function (index, value) {
                                         if (value) {
                                           //if (value.NUMFACTURA == rowObject.NUMFACTURA && value.NUMSERIE == rowObject.NUMSERIE) {
                                           if($scope.VerificarSiMarcar(value,rows[x],accion)){                                             
                                             $($('#'+nameGrilla).find("tr[role=row][id="+(x+1)+"]").find("td")[colCheckMarcar]).find("input[type=checkbox]")[0].checked=true;
                                             return;
                                           }
                                           else {
                                             //$($('#'+nameGrilla).find("tr[role=row][id="+(index+1)+"]").find("td")[colCheckMarcar]).find("input[type=checkbox]")[0].checked=false;
                                           }
                                         }
                                       });
                             
                           });
                }
              }
              $rootScope.checkBoxGrilla=function(event,nameGrilla)
              {
                event.preventDefault();
                
                var check= angular.element(event.target)[0].checked;
                var ids=new Array();
                ids.push("CodigoNave");
                ids.push("NumeroViaje");
                ids.push("PuertoOrigen");
                ids.push("PuertoDestino");
                ids.push("PuertoEmbarque");
                ids.push("DestinoFinal");
                ids.push("CodigoLinea");
                ids.push("NumeroBL");
                
                
              	checkBox(check, nameGrilla,ids);
                setTimeout('$("#'+event.target.id+'").prop("checked",'+check+')',100);
                var idsencode=  encodeURIComponent(ids);
				setTimeout('RefreshCheckBox("Liberar","'+nameGrilla+'","'+idsencode+'");',100);
                
              }
               $rootScope.checkBoxGrillaItem=function(event, rowObject,nameGrilla)
              {
                var tipo = angular.element(event.target).attr("tooltip");
                
                if(tipo=="Liberar")
                {
                  	event.preventDefault();
                 	var check= angular.element(event.target)[0].checked;
                    var ids=new Array();
                    ids.push("CodigoNave");
                    ids.push("NumeroViaje");
                    ids.push("PuertoOrigen");
                    ids.push("PuertoDestino");
                    ids.push("PuertoEmbarque");
                    ids.push("DestinoFinal");
                    ids.push("CodigoLinea");
                    ids.push("NumeroBL");
                    rowObject=decodeURIComponent(rowObject)
                    var objFila = JSON.parse(rowObject);
                    AddOrRemovecheckBox(check,objFila,ids,nameGrilla);
                    
                    var idsencode=  encodeURIComponent(ids);
                    setTimeout('RefreshCheckBox("'+tipo+'","'+nameGrilla+'","'+idsencode+'");',100);
                }
              }
               
              $scope.MiBoton=function(idgrilla,tipoboton, cellvalue, options, rowObject)
                {
                  if (rowObject.FlagThc =="")
                    	return '';
                  else
                  	return '<button class="ColorBotonGrilla" ng-click="$root.AgregarPago($event, \''  + rowObject.CodigoNave + '\'' + ',' + '\'' + rowObject.NumeroViaje + '\'' + ',' + '\'' + rowObject.PuertoOrigen + '\'' + ',' + '\'' + rowObject.PuertoEmbarque + '\'' + ',' + '\''  + rowObject.PuertoDestino + '\'' + ',' + '\'' + rowObject.DestinoFinal + '\'' + ',' + '\'' + rowObject.CodigoLinea + '\'' + ',' +  '\'' + rowObject.FlagThc +  '\'' + ',' + '\'' + rowObject.NumeroBL  + '\');">+</button>'; 
                	
                    
                }
              $rootScope.AgregarPago=function(event,CodigoNave    , 
                                              NumeroViaje   , 
                                              PuertoOrigen  , 
                                              PuertoEmbarque, 
                                              PuertoDestino , 
                                              DestinoFinal  , 
                                              CodigoLinea   , 
                                              FlagThc,
                                              NumeroBL)
              {
            	event.preventDefault();
                if (FlagThc==""){
                	alert('El BL seleccionado no posee THC');
                }
                else{
                  		$rootScope.DatosFormulario.DocumentoMemoria=null;		
                  		$rootScope.DatosFormulario.DocumentoMemoria=undefined;
                		if( $rootScope.DatosFormulario.DocumentoMemoria==undefined)
                            $rootScope.DatosFormulario.DocumentoMemoria=new Object();
                
                
                    	if( $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL==undefined)
                            $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL=new Object();
                    
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.CodigoNave    = CodigoNave;
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.NumeroViaje   = NumeroViaje;
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.PuertoOrigen  = PuertoOrigen;
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.PuertoEmbarque= PuertoEmbarque;
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.PuertoDestino = PuertoDestino;
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.DestinoFinal  = PuertoDestino;
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.CodigoLinea   = CodigoLinea;
                        $rootScope.DatosFormulario.DocumentoMemoria.CodigosBL.NumeroBL      = NumeroBL;
                		
                
						var altura=800;//(window.innerHeight==undefined?$(document).height():window.innerHeight);
                        getPopupResponsive({
                            formURL: "es-PE/sistema/liberacion-de-bl/registro-de-pago-listado/",
                            title: "Registro de Pagos de Recargo",
                            nombreDiv: "divPopupRegistroPagos",
                            nombreGrid: "",
                            width: "1050px",
                          	height:altura,
                          	params: {},
                            HideSelection: true,    
                            multiSelect: false,
                            select: function (row) {
                              
                              	//llena aqui o cuando completa el grabado:  $rootScope.DatosFormulario.DataParaLiberar
                                return true;
                            },
                          	beforeShow: function (obj) {
                              	$rootScope.hashPopup=$(obj).attr("mapurl");
                                $compile($("#divPopupRegistroPagos"))($scope);
                            },

                        });
             	}
                
              }
             
              	$scope.Buscar_Click=function()
                {
                	//if(validateForm("#BusquedaBL")==false)
                    //{
                    //  return false;
                    //}
                  
                    
                  if($rootScope.DatosFormulario.DataFiltroBuscarBL.FiltroCheck=="NroFactura")
                  {
                  	if(validateForm("#BusquedaBL")==false)
                    {
                      return false;
                    }
                  }
                  
                  $rootScope.DatosFormulario.DataFiltroBuscarBLtmp=new Object();
                  
                  
                  if($rootScope.DatosFormulario.DataFiltroBuscarBL.FiltroCheck=="NroFactura"){
                  	$rootScope.DatosFormulario.DataFiltroBuscarBLtmp.Ruc="";
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.RazonSocial="";
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.CodigoAgente="";
                  	$rootScope.DatosFormulario.DataFiltroBuscarBLtmp.FechaInicio =null;
					$rootScope.DatosFormulario.DataFiltroBuscarBLtmp.FechaFin =null;
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.NroDocumento=$rootScope.DatosFormulario.DataFiltroBuscarBL.NumeroFactura;
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.NroSerieDocumento=$rootScope.DatosFormulario.DataFiltroBuscarBL.SerieFactura;
                    
                  }else
                  {
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.Ruc=$rootScope.DatosFormulario.DataFiltroBuscarBL.Ruc;
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.RazonSocial=$rootScope.DatosFormulario.DataFiltroBuscarBL.RazonSocial;
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.CodigoAgente=$rootScope.DatosFormulario.DataFiltroBuscarBL.CodigoAgente;
                  	$rootScope.DatosFormulario.DataFiltroBuscarBLtmp.FechaInicio =$rootScope.DatosFormulario.DataFiltroBuscarBL.FechaInicio;
					$rootScope.DatosFormulario.DataFiltroBuscarBLtmp.FechaFin =$rootScope.DatosFormulario.DataFiltroBuscarBL.FechaFin;
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.NroDocumento=0;
                    $rootScope.DatosFormulario.DataFiltroBuscarBLtmp.NroSerieDocumento=0;
                  }
                  
                  miBlock(true,"html");
                  
					var objRequest= {
                                        "filtro":$rootScope.DatosFormulario.DataFiltroBuscarBLtmp
                                    };

                    $scope.gridapiResultadoBuscarLiberacion.find(objRequest);    
                  
                  miBlock(false,"html");
                  
                }
                
               /* $scope.SoloNumeros=function(eventKey){
                  
                  return HelperJS.Validaciones.EscribeSoloNumero(eventKey,false);
                
                }
                */
                $scope.Regresar_Click=function()
                {
                    $rootScope.Redirect("/#!/sistema/liberacion-de-bl/");
                }
                
                $scope.Filtro_Click=function(){
                  if ($rootScope.DatosFormulario.DataFiltroBuscarBL.FiltroCheck=="CodCli")
                  {
                  	$rootScope.DatosFormulario.DataFiltroBuscarBL.SerieFactura="";
                    $rootScope.DatosFormulario.DataFiltroBuscarBL.NumeroFactura="";
                    $rootScope.Limpiar_Click();
                  }
                  else
                  {
                 	$rootScope.DatosFormulario.DataFiltroBuscarBL.SerieFactura=$from($scope.$root.DatosFormulario.DatosGenerales.ListaValoresDefecto).where("$CodigoParametro=='SerieDefault'").firstOrDefault().ValorDefecto;
                  }
                  
                  
                }
                
                $scope.LiberarBL=function()
                {
                    var validoSeleccionRegistro=true;
                  	var valido=true;
                  	var requestListaDocumentos=new Array();
                    
                  	var idsCheksAlmacenado = JSON.parse(sessionStorage.getItem("ResultadoBuscarLiberacion"));
                  	
                  	if(idsCheksAlmacenado==undefined||idsCheksAlmacenado==null||idsCheksAlmacenado.length==0)
                    {
                    	validoSeleccionRegistro=false;                      
                    }
                    if(validoSeleccionRegistro==false)
                    {
                      MiAlert("Seleccione un registro");
                      return;
                    }
                  	
                  	requestListaDocumentos=CompletarDatosDocumentos($rootScope.DatosFormulario.DataParaLiberar.ListaDocumentos,idsCheksAlmacenado);
                  
                  	if(requestListaDocumentos.Datos==undefined)
                    {
                    	valido=false;
                    }
                  	else
                  	{
                        for(var i=0;i< idsCheksAlmacenado.length;i++)                      
                        {
                          rowObject=idsCheksAlmacenado[i];
                          var objItem = $from(requestListaDocumentos.Datos).where("$CodigosBL.CodigoNave=='"+rowObject.CodigoNave+"'&&$CodigosBL.NumeroViaje=='"+rowObject.NumeroViaje+"'&&$CodigosBL.PuertoOrigen=='"+rowObject.PuertoOrigen+"'&&$CodigosBL.PuertoDestino=='"+rowObject.PuertoDestino+"'&&$CodigosBL.PuertoEmbarque=='"+rowObject.PuertoEmbarque+"'&&$CodigosBL.DestinoFinal=='"+rowObject.DestinoFinal+"'&&$CodigosBL.CodigoLinea=='"+rowObject.CodigoLinea+"'&&$CodigosBL.NumeroBL=='"+rowObject.NumeroBL+"'").firstOrDefault(); 
                          
                          if(objItem==undefined)
                          {
                            valido=false;
                            break;
                          }
                          else
                          {
                            if(objItem.EsTHC=="True")
                            {
                              if(objItem.ListaPagos==undefined)
                              {
                                valido=false;
                                break;
                              }
                              if(objItem.ListaPagos.length==0)
                              {
                                valido=false;
                                break;
                              }
                            }
                            else
                            {
                            	continue;
                            }
                            
                          }                        
                        }
                    }
                  	if(valido==false)
                    {
                      MiAlert("No se puede liberar un Bl con pago de THC pendiente");

                      return;
                    }
                    miBlock(true,"html");
                  	
                  
                   	$.ajax({
                                    url:"/ModuloCalculadorWebAgma/RegistrarLiberacion/",
                                    type:"POST",
                                    headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                    //data:param,
                       				data:requestListaDocumentos,
                                    dataType:"json",
                    				async:false,
                                    success:function(data){
											data=JSON.parse(data);
                                          	if(data!=undefined)
                                            {
                                              if(data.Result.Success===true){
                                                
                                                if(data.Estado=="true")
                                                {
                                                    MiAlert("Liberación Exitosa");
                                                }
                                                else
                                                {
                                                	MostrarAlertaSimple(data.ListaMensajes);
                                                } 
                                              }
                                              else{
                                                  alert("Respondio un error, consulte con el Administrador del sistema");
                                              }
                                            }
                                      		miBlock(false,"html");
                                    },
                                      error:function()
                                      {
                      						alert("ocurrió un error, consulte con el Administrador del sistema");
                                    		miBlock(false,"html");
                                    }
                                });  
                  
                  
                  
                  
                  		
                }
                 CompletarDatosDocumentos=function(ListaDocumentos, idsCheksAlmacenado)
                {
                  	var ListaDocumentosReturn = new Array();
                	var rows= jQuery("#ResultadoBuscarLiberacion").jqGrid('getRowData');
                  	
                  	$.each(rows, function(x)
                           {
                             var rowObject=rows[x];
                             
                             var objCheck = $from(idsCheksAlmacenado).where("$CodigoNave=='"+rowObject.CodigoNave+"'&&$NumeroViaje=='"+rowObject.NumeroViaje+"'&&$PuertoOrigen=='"+rowObject.PuertoOrigen+"'&&$PuertoDestino=='"+rowObject.PuertoDestino+"'&&$PuertoEmbarque=='"+rowObject.PuertoEmbarque+"'&&$DestinoFinal=='"+rowObject.DestinoFinal+"'&&$CodigoLinea=='"+rowObject.CodigoLinea+"'&&$NumeroBL=='"+rowObject.NumeroBL+"'").firstOrDefault(); 
                             if(objCheck!==undefined)
                             {
                                 var objItem = new Object();
                                 
                                 objItem.EsTHC=rowObject.FlagThc;
                                 objItem.FechaTransaccion=rowObject.FechaTransaccion;
                                 objItem.Transaccion=rowObject.Transaccion;
                                 objItem.CodigoCaja=rowObject.CodigoCaja;
                                 objItem.ListaRecargos=undefined;
                               	 var flagOriginal=(rowObject.FlagThcOriginal=='X'?'True':'False');
                               	 if(rowObject.FlagThc=="False")
                                 {
                                       if(rowObject.FlagThcOriginal=="X")
                                     		objItem.ActualizaPrePaid=true;
                                 }
                               
                               objItem.TipoBL=rowObject.TipoBL;
                               
                               	 var objTmpItem = undefined;
                               	 if(ListaDocumentos!=undefined)
                                 {
                               		objTmpItem=$from(ListaDocumentos).where("$CodigosBL.CodigoNave=='"+rowObject.CodigoNave+"'&&$CodigosBL.NumeroViaje=='"+rowObject.NumeroViaje+"'&&$CodigosBL.PuertoOrigen=='"+rowObject.PuertoOrigen+"'&&$CodigosBL.PuertoDestino=='"+rowObject.PuertoDestino+"'&&$CodigosBL.PuertoEmbarque=='"+rowObject.PuertoEmbarque+"'&&$CodigosBL.DestinoFinal=='"+rowObject.DestinoFinal+"'&&$CodigosBL.CodigoLinea=='"+rowObject.CodigoLinea+"'&&$CodigosBL.NumeroBL=='"+rowObject.NumeroBL+"'").firstOrDefault(); 
                                 }
                                 if(objTmpItem!==undefined)
                                 {
                                   	 
                                   	 
                                   	 objItem.ListaPagos= objTmpItem.ListaPagos;
                                   	 objItem.CodigosBL= objTmpItem.CodigosBL;
                                     ListaDocumentosReturn.push(objItem);
                                 }
                                 else
                                 {
                                   	 objItem.CodigosBL=objCheck;
                                     objItem.ListaPagos=new Array();
                                     ListaDocumentosReturn.push(objItem);//La validacion de flgtch es despues.
                                 }
                               
                             }
                           });
                  
                  return { Datos: ListaDocumentosReturn };
                }
              	
			}]);


})();