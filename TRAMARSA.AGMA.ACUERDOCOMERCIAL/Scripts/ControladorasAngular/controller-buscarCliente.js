(function () {
    angular.module('api')
    .controller('BuscarClienteController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
        var tipoCliente= "";
          $timeout(function () {
              $scope.MostrarFiltroRoles();
              $scope.CargarDatosIniciales();
           
          });



         $scope.MostrarFiltroRoles = function () {
             var opc = $rootScope.FlagCallClientes;
             if ( opc == "busquedaACLocal" || 
                  opc == "seguimientoACLocal"  ||  
                  opc == "busquedaACEscalonado" ||
                  opc == "reporteACEscalonadoCliente" ||
                  opc == "seguimientoACEscalonado") {
                  //Ocultar Filtro Rol
                  $("#divPopupBuscarCliente").find("#RolCliente").hide();
                  $("#grillaListaClientes").hideCol("DescripcionRolSap"); 
                  $scope.gridapigrillaListaClientes.acomodarGrillaVMobile();
             }
         }

           

          $scope.CargarDatosIniciales = function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.DatosBusqueda == undefined)
                  $rootScope.DatosFormulario.DatosBusqueda = new Object();
              if ($rootScope.DatosFormulario.DatosGenerales == undefined)
                  $rootScope.DatosFormulario.DatosGenerales = new Object();
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes = new Object();
              $rootScope.FlagMostrarBotonSeleccionar = true;
              var opc = $rootScope.FlagCallClientes;
              
              if($rootScope.FlagTipoCliente){
                  tipoCliente = $rootScope.FlagTipoCliente;
              }
              $.ajax({
                  url: "/Cliente/ConsultarClienteIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "tipoCliente=" + tipoCliente,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $scope.Limpiar_Click();
                      $rootScope.DatosFormulario.DatosBusqueda.Rol = data.Rol;
                  }
              });

             
              if (opc == "seguimientoACLocal" || opc == "seguimientoACEscalonado") {
                  $(".InputTEXT_04Fecha").prop('disabled', false);
              }
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
              var opc = $rootScope.FlagCallClientes;
              var nuevoId = 0;
              if (opc == "busquedaACLocal") {
                 // $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoRolSAP = data.CodigoRolSap; JM
                  $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoCliente = data.CodigoClienteSAP;
                  $rootScope.DatosFormulario.FiltrosBusquedaACLocal.DescripcionCliente = data.Nombre;

              }
              else if (opc == "reporteContenedorNoDevueltoCliente") {
                  $rootScope.DatosFormulario.ContenedorNoDevuelto.Filtro.CodigoCliente = data.CodigoClienteSAP;
                  $rootScope.DatosFormulario.ContenedorNoDevuelto.Datos.NombreCliente = data.Nombre;
              }

              else if (opc == "reporteACEscalonadoCliente") {
                  $rootScope.DatosFormulario.ReporteACEscalonado.Filtro.CodigoCliente  = data.CodigoClienteSAP;
                  $rootScope.DatosFormulario.ReporteACEscalonado.Datos.NombreCliente = data.Nombre;
              }

              else if (opc == "registroACLocal") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroAC.ListaClientesMaster, function (e) { return e.CodigoCliente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaClientesMaster, "IdClienteBLMaster");
                  var newObjAcLocalAgenteClientesMaster = {
                      IdClienteBLMaster: nuevoId,
                      CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                      CodigoCliente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoCliente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      CodigoTipoCondicion: $rootScope.DatosFormulario.DatosAC.CodigoTipoCondicion,
                      Accion: "I"
                  }
                  $scope.gridapiListaClienteBLMaster.insertRange([newObjAcLocalAgenteClientesMaster]);
                  if ($.inArray(newObjAcLocalAgenteClientesMaster, $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroAC.grillaListaClienteMemoriaList.push(newObjAcLocalAgenteClientesMaster);
                  }
              }
              else if (opc == "registroACLocalAgenteBLMaster") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLMaster, function (e) { return e.CodigoAgente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLMaster, "IdAgenteBLMaster");
                  var newObjAcLocalAgenteBLMaster = {
                      IdAgenteBLMaster: nuevoId,
                      CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                      CodigoAgente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoAgente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      Accion: "I"
                  }
                  $scope.gridapiListaAgenteBLMaster.insertRange([newObjAcLocalAgenteBLMaster]);
                  if ($.inArray(newObjAcLocalAgenteBLMaster, $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLMasterMemoriaList.push(newObjAcLocalAgenteBLMaster);
                  }
              }
              else if (opc == "registroACLocalClienteBLHome") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome, function (e) { return e.CodigoCliente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaClienteBLHome, "IdClienteBLHome");
                  var objItemNew = {
                      IdClienteBLHome: nuevoId,
                      CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                      CodigoCliente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoCliente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      CodigoCondicion: "HBLFCL",
                      Accion: "I"
                  }
                  $scope.gridapiListaClienteBLHome.insertRange([objItemNew]);
                  if ($.inArray(objItemNew, $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroAC.grillaListaClienteBLHomeMemoriaList.push(objItemNew);
                  }
              }
              else if (opc == "registroACLocalAgenteBLHome") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLHome, function (e) { return e.CodigoAgente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroAC.ListaAgenteBLHome, "IdAgenteBLHome");
                  var objItemNewBlHome = {
                      IdAgenteBLHome: nuevoId,
                      CodigoAcuerdoComercialLocal: $rootScope.DatosFormulario.RegistroAC.CodigoAcuerdoComercialLocal,
                      CodigoAgente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoAgente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      Accion: "I"
                  }
                  $scope.gridapiListaAgenteBLHome.insertRange([objItemNewBlHome]);
                  if ($.inArray(objItemNewBlHome, $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroAC.grillaListaAgenteBLHomeMemoriaList.push(objItemNewBlHome);
                  }
              }
              else if (opc == "seguimientoACLocal") {
                  $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoCliente = data.CodigoClienteSAP; 
                  //$rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoRol = data.CodigoRolSap; JM
                  $rootScope.DatosFormulario.SeguimientoACLocal.SeguimientoDatos.DescripcionCliente = data.Nombre;
              }
              else if (opc == "seguimientoACEscalonado") {
                  $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoCliente = data.CodigoClienteSAP;
                 // $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoRol = data.CodigoRolSap; JM
                  $rootScope.DatosFormulario.SeguimientoACEscalonado.SeguimientoDatos.DescripcionCliente = data.Nombre;
              }
              else if (opc == "busquedaACEscalonado") {
                  $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoCliente = data.CodigoClienteSAP; 
                   //$rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoRolSAP = data.CodigoRolSap; JM
                  $rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE.DescripcionCliente = data.Nombre;
              }
              else if (opc == "registroACEscalonadoClienteBLMaster") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaClientesMaster, function (e) { return e.CodigoCliente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaClientesMaster, "IdClienteBLMaster");
                  var objItemNewBlMaster = {
                      IdClienteBLMaster: nuevoId,
                      CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                      CodigoCliente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoCliente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      Accion: "I"
                  }
                  $scope.gridapigrillaAceListaClienteBLMaster.insertRange([objItemNewBlMaster]);
                  if ($.inArray(objItemNewBlMaster, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteMemoriaList.push(objItemNewBlMaster);
                  }
              }
              else if (opc == "registroACEscalonadoAgenteBLMaster") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLMaster, function (e) { return e.CodigoAgente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLMaster, "IdAgenteBLMaster");
                  var newObjEscalonadoAgenteBLMaster = {
                      IdAgenteBLMaster: nuevoId,
                      CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                      CodigoAgente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoAgente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      Accion: "I"
                  }
                  $scope.gridapigrillaAceListaAgenteBLMaster.insertRange([newObjEscalonadoAgenteBLMaster]);
                  if ($.inArray(newObjEscalonadoAgenteBLMaster, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLMasterMemoriaList.push(newObjEscalonadoAgenteBLMaster);
                  }
              }
              else if (opc == "registroACEscalonadoClienteBLHome") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome, function (e) { return e.CodigoCliente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }

                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaClienteBLHome, "IdClienteBLHome");
                  var newObjEscalonadoClienteBLHome = {
                      IdClienteBLHome: nuevoId,
                      CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                      CodigoCliente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoCliente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      CodigoCondicion: $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.CodigoTipoCondicion,
                      Accion: "I"
                  }
                  $scope.gridapigrillaAceListaClienteBLHome.insertRange([newObjEscalonadoClienteBLHome]);
                  if ($.inArray(newObjEscalonadoClienteBLHome, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaClienteBLHomeMemoriaList.push(newObjEscalonadoClienteBLHome);
                  }
              }
              else if (opc == "registroACEscalonadoAgenteBLHome") {
                  var existeCliente = $.grep($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome, function (e) { return e.CodigoAgente == data.CodigoClienteSAP && e.CodigoRol == data.CodigoRolSap; });
                  if (existeCliente.length > 0) {
                      $(".caja11.msgerror.Objeto").html("El cliente seleccionado ya existe.");
                      return false;
                  }
                  else {
                      $(".caja11.msgerror.Objeto").html("");
                  }
                  nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroACEscalonado.ListaAgenteBLHome, "IdAgenteBLHome");
                  var newObjEscalonadoAgenteBLHome = {
                      IdAgenteBLHome: nuevoId,
                      CodigoAcuerdoComercialEscalonado: $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado,
                      CodigoAgente: data.CodigoClienteSAP,
                      NombreInterlocutor: data.Nombre,
                      CodigoDocumentoAgente: data.Ruc,
                      CodigoRol: data.CodigoRolSap,
                      Rol: data.DescripcionRolSap,
                      Accion: "I"
                  }
                  $scope.gridapigrillaAceListaAgenteBLHome.insertRange([newObjEscalonadoAgenteBLHome]);
                  if ($.inArray(newObjEscalonadoAgenteBLHome, $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList) > -1) {
                  } else {
                      $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaAgenteBLHomeMemoriaList.push(newObjEscalonadoAgenteBLHome);
                  }

              }
              return true;
          }
          $scope.Seleccionar_Click = function () {
              var rowKey = jQuery("#grillaListaClientes").jqGrid('getGridParam', 'selrow');
              if (rowKey != undefined) {
                  if (rowKey.length > 0) {
                      var rowObject = jQuery('#grillaListaClientes').getRowData(rowKey);
                      var estado = ProcesarSeleccionado(rowObject);
                      $(".caja11.msgerror.Objeto").html("");
                      if (estado) {
                          $scope.$parent.SalirPopup_Click();
                      }
                  } else {
                      $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
                  }
              } else {
                  $(".caja11.msgerror.Objeto").html("Seleccione un registro.");

              }
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              if (verificarCampos()) {
                  $(".caja11.Objeto").html("");
                  if (CantidadCaracteresNombre())
                      return false;
                  miBlock(true, "#divPopupBuscarCliente");
                  $(".caja11.Nombre").html("");
                  if($rootScope.FlagCallClientes =="reporteContenedorNoDevueltoCliente")
                  {
                    $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.RequerirRol = true;
                  }
  
                  if ($rootScope.FlagCallClientes == "busquedaACLocal" ||
                      $rootScope.FlagCallClientes == "seguimientoACLocal" ||
                      $rootScope.FlagCallClientes == "busquedaACEscalonado" ||
                      $rootScope.FlagCallClientes == "reporteACEscalonadoCliente" ||
                      $rootScope.FlagCallClientes == "seguimientoACEscalonado") 
                  {

                    $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.OmitirRol = true;
                  }

                  $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.TipoCliente = tipoCliente;
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes)) };
                  $scope.gridapigrillaListaClientes.find(objRequest);
                  miBlock(false, "#divPopupBuscarCliente");
              } else {

                  var TextRol = "";
                  if (  $rootScope.FlagCallClientes != "busquedaACLocal" && 
                        $rootScope.FlagCallClientes != "seguimientoACLocal" &&
                        $rootScope.FlagCallClientes != "busquedaACEscalonado" &&  
                        $rootScope.FlagCallClientes != "reporteACEscalonadoCliente" && 
                        $rootScope.FlagCallClientes != "seguimientoACEscalonado") {
                          TextRol = "Rol,";
                  }
                  $(".caja11.Objeto").html("Ingrese uno de estos campos: " + TextRol + " Cod. Cliente SAP, Cliente, DNI o RUC.");
                  return false;
              }
          }
          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }
          $scope.BuscarTarifa_Click = function () {
              var altura = 800;
              getPopupResponsive({
                  formURL: "es-PE/sistema/busqueda/buscar-tarifa/",
                  title: "Buscar Tarifa",
                  nombreDiv: "divPopupBuscarTarifa",
                  nombreGrid: "",
                  width: "1050px",
                  height: altura,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarTarifa"))($scope);
                  }
              });
          }
          $scope.Limpiar_Click = function () {
              $(".caja11.msgerror.Objeto").html("");
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoRol = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoCliente = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Nombre = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Dni = null;
              $rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Ruc = null;
          }
          function verificarCampos() {
              var band = false;

              if (  $rootScope.FlagCallClientes != "busquedaACLocal" && 
                    $rootScope.FlagCallClientes != "seguimientoACLocal" &&
                    $rootScope.FlagCallClientes != "busquedaACEscalonado" &&  
                    $rootScope.FlagCallClientes != "reporteACEscalonadoCliente" &&
                    $rootScope.FlagCallClientes != "seguimientoACEscalonado") {

                     if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoRol != null) {
                      if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoRol.length > 0) {
                          band = true;
                      }
                    }
              
              }
               /*if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoRol != null) {
                  if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoRol.length > 0) {
                      band = true;
                  }
              }*/
              
              if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoCliente != null) {
                  if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.CodigoCliente.length > 0) {
                      band = true;
                  }
              }
              if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Nombre != null) {
                  if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Nombre.length > 0) {
                      band = true;
                  }
              }
              if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Dni != null) {
                  if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Dni.length > 0) {
                      band = true;
                  }
              }
              if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Ruc != null) {
                  if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarClientes.Ruc.length > 0) {
                      band = true;
                  }
              }
              return band;
          }
          function CantidadCaracteresNombre() {
              var devuelve = false;
              var id = "$root.DatosFormulario.DatosGenerales.DataBuscarClientes.Nombre";
              var texto = document.getElementById(id).value;
              var indice = id.indexOf("_");
              var campo = id.substring(indice + 1);
              var longitud = texto.length;

              if (longitud > 0 && longitud < 3) {
                  devuelve = true;
                  var nombre = ".caja11.Nombre";
                  $(nombre).html("Ingrese más de 3 caracteres para el campo Cliente.");
              }
              return devuelve;
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
