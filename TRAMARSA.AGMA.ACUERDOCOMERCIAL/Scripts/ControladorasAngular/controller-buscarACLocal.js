(function () {
    angular.module('api') 
    .controller('BuscarACLocalController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
            if ($rootScope.DatosFormulario == undefined){
                  $rootScope.DatosFormulario = new Object();
            }
            if ($rootScope.DatosFormulario.DatosAC == undefined){
                  $rootScope.DatosFormulario.DatosAC = new Object();
            }
            

            if($rootScope.DatosFormulario.DatosAC.FlagACLocal)
             {
                $scope.CargaInicialBusquedaAcLocal(true);
                $rootScope.DatosFormulario.DatosAC.FlagACLocal = false;
             }else{
                $rootScope.DatosFormulario = new Object();
                $rootScope.DatosFormulario.BusquedaACLocalIndex  = new Object();
                $rootScope.DatosFormulario.FiltrosBusquedaACLocal = new Object();
                $scope.CargaInicialBusquedaAcLocal(false);
            }

            if($rootScope.DatosFormulario.RolSAP == undefined){
               $rootScope.DatosFormulario.RolSAP = new Object();
            }

            
          });
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (tipoboton) {
                  case "Editar":
                      eventoclick = "$parent.EditarAcLocal('" + rowObject.CodigoAcuerdoComercialLocal + "');";
                      break;
              }
              var html = "";
              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              return html;
          }
          $scope.EditarAcLocal = function (codigoAcuerdoComercialLocal) {
              $rootScope.DatosFormulario.RegistroAC = new Object();
              $rootScope.DatosFormulario.DatosAC = new Object();
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro = new Object();
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagEditar = true;
              $rootScope.DatosFormulario.DatosAC.UrlOrigen = "/#!/sistema/busqueda/buscar-aclocal/";
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal = codigoAcuerdoComercialLocal;
              $rootScope.Redirect("/#!/sistema/registro-de-acuerdo-comercial-local/");
          }
     
          $scope.CargaInicialBusquedaAcLocal = function (continuar) {
              if (continuar) {
                  if ($rootScope.DatosFormulario.FiltrosBusquedaACLocal != undefined) {
                      var selectDefault =[];
                      selectDefault = $rootScope.DatosFormulario.FiltrosBusquedaACLocal.ListaRolSAP
                      $scope.CargarRolCliente($rootScope.DatosFormulario.RolSAP, selectDefault);
                      if (selectDefault==undefined) {
                        //$("#RolCliente").multipleSelect("checkAll");   
                      }
                      $scope.Buscar_Click();
                      return;
                  }
              }

              $.ajax({
                  url: "/AcuerdoComercialLocal/BusquedaAcLocalIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.BusquedaACLocalIndex.Linea = data.Linea;
                          $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoLinea = $rootScope.DatosFormulario.BusquedaACLocalIndex.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.Habilitado = 'True';
                          }
                      }
                        // ROL LCIENTE MULTISELECT
                       $rootScope.DatosFormulario.RolSAP = data.Rol;
                       $scope.CargarRolCliente(data.Rol, []);
                      //$("#RolCliente").multipleSelect("checkAll");

                       ConfiguracionSecciones("AdministracionConcesionLocal",$rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoLinea);
                  }
              });
          }
          $scope.CambiarLinea = function () {
            ConfiguracionSecciones("AdministracionConcesionLocal",$rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoLinea);
          }

          $scope.Buscar_Click = function () {
            if($rootScope.EsEnter)
            {
              return false;
            }
       
              if (validateForm("#BusquedaACLocalFrm") == false) {
                  return false;
              }

              //var ListaRolSAP = $("#RolCliente").multipleSelect("getSelects");
            var RolCliente = $("#RolCliente").multipleSelect("getSelects");
            
            var ListaRolSAP = $.map(RolCliente, function(value, index) {
                            return [value];
                          });
            
              if (ListaRolSAP != undefined) {
                  if (ListaRolSAP.length > 0) {
                      $rootScope.DatosFormulario.FiltrosBusquedaACLocal.ListaRolSAP = ListaRolSAP;
                  }
                else{
                       
                      $rootScope.DatosFormulario.FiltrosBusquedaACLocal.ListaRolSAP = [];
                  	  $rootScope.DatosFormulario.FiltrosBusquedaACLocal.ListaRolSAP.push("");
                  }
              }

              /*
            if ($rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoLinea == undefined) {
                $(".caja11.msgerror.CodigoLinea").html("Linea es requerido");
                return false;
            } else {
                if ($rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoLinea.length <= 0) {
                    $(".caja11.msgerror.CodigoLinea").html("Linea es requerido");
                    return false;
                } else {
                    $(".caja11.msgerror.CodigoLinea").html("");
                }
            }
            */
            /*
            if($rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoRA){

                if($rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoRA.length < 10){
                    $(".caja11.msgerror.CodigoRA").html("El Nro. RA debe tener 10 carácteres");
                    return false;
                }else {
                     $(".caja11.msgerror.CodigoRA").html("");
                }
            }else{
               $(".caja11.msgerror.CodigoRA").html("");
            }
            */

            miBlock(true, "html");
            var objRequest = { "filtro": $rootScope.DatosFormulario.FiltrosBusquedaACLocal };
            $scope.gridapigrillaResultadoBusquedaACLocal.find(objRequest);
            miBlock(false, "html");

              return false;
          }
          $scope.Enter = function () {
              $rootScope.EsEnter= true;
              return false;
          }
          $( "input" ).focusout(function() {
             $rootScope.EsEnter= false;
          });
          $scope.Nuevo_Click = function () {
              $rootScope.DatosFormulario.RegistroAC = new Object();
              $rootScope.DatosFormulario.DatosAC = new Object();
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro = new Object();
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagEditar = false;
              $rootScope.Redirect("/#!/sistema/registro-de-acuerdo-comercial-local/");
          }
          $scope.BuscarNroBL_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "busquedaACLocalNroBL";
              var altura = 800;
              getPopupResponsive({
                  formURL: "/DocumentoOrigen/BuscarDocumentoOrigen",
                  title: "Buscar Documento Origen",
                  nombreDiv: "divPopupBuscarDocumentoOrigen",
                  nombreGrid: "",
                  width: "1200px",
                  height: altura,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarDocumentoOrigen"))($scope);
                  }
              });
          }
          $scope.BuscarCliente_Click = function () {
              $rootScope.FlagCallClientes = "busquedaACLocal";
              $rootScope.FlagTipoCliente = "busqueda";
              var altura = 800;
              getPopupResponsive({
                  formURL: "/Cliente/BuscarCliente",
                  title: "Buscar Cliente",
                  nombreDiv: "divPopupBuscarCliente",
                  nombreGrid: "",
                  width: "1200px",
                  height: altura,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarCliente"))($scope);
                  }
              });
          }
          $scope.BuscarNroCtn_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "busquedaACLocalNroCtn";
              var altura = 800;
              getPopupResponsive({
                  formURL: "DocumentoOrigen/BuscarDocumentoOrigen",
                  title: "Buscar Documento Origen",
                  nombreDiv: "divPopupBuscarDocumentoOrigen",
                  nombreGrid: "",
                  width: "1200px",
                  height: altura,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarDocumentoOrigen"))($scope);
                  }
              });
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoAcuerdoComercialLocal = "";
              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoRA = "";
              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.NumeroBL = "";
              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoCliente = "";
              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoContenedor = "";
             // $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoRolSAP = "";
              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.DescripcionCliente = "";
              if ($rootScope.DatosFormulario.BusquedaACLocalIndex.Linea.length > 1) {
                  $rootScope.DatosFormulario.FiltrosBusquedaACLocal.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              $rootScope.DatosFormulario.FiltrosBusquedaACLocal.ListaRolSAP  =[];
              $("#RolCliente").multipleSelect("checkAll");
          }



          // ROL CLIENTE
          $('#RolCliente').multipleSelect({
              width: '100%'
          });
          
          $scope.CargarRolCliente = function (datos, selectDefault) {
              for (var number = 0; number < datos.length; number++) {
                  var $select = $("#RolCliente"), $opt = $("<option />", {
                      value: datos[number].Codigo,
                      text: datos[number].Descripcion
                  });
                  $select.append($opt).multipleSelect("refresh");
              }
              if (selectDefault != undefined) {
                  if (selectDefault.length > 0) {
                      $("#RolCliente").multipleSelect("setSelects", selectDefault);
                  }
              }
          } 



      }]);
})();