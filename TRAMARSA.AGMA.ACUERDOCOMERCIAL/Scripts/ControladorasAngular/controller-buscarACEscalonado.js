(function () {
    angular.module('api')
    .controller('BuscarACEscalonadaController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

            if ($rootScope.DatosFormulario == undefined){
                  $rootScope.DatosFormulario = new Object();
            }
            if ($rootScope.DatosFormulario.RegistroACEscalonado == undefined){
                  $rootScope.DatosFormulario.RegistroACEscalonado = new Object();
            }
            

            if($rootScope.DatosFormulario.RegistroACEscalonado.FlagACEscalonado)
             {
                $scope.CargaInicialBusquedaAcEscalonado(true);
                $rootScope.DatosFormulario.RegistroACEscalonado.FlagACEscalonado = false;
             }else{
                $rootScope.DatosFormulario = new Object();
                $rootScope.DatosFormulario.BusquedaACEscalonado  = new Object();
                $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro = new Object();
                $rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE = new Object();
                $scope.CargaInicialBusquedaAcEscalonado(false);
            }

            if($rootScope.DatosFormulario.RolSAP == undefined){
               $rootScope.DatosFormulario.RolSAP = new Object();
              } 

          });
          $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
              var eventoclick = "";
              switch (tipoboton) {
                  case "Editar":
                      eventoclick = "$parent.EditarAcEscalonado('" + rowObject.CodigoAcuerdoComercialEscalonado + "');";
                      break;
              }
              var html = "";
              if (tipoboton == "Editar") {
                  html = HtmlCrearBoton("Modificar", eventoclick, "");
              }
              return html;
          }
          $scope.EditarAcEscalonado = function (codigoAcuerdoComercialEscalonado) {
              $rootScope.DatosFormulario.RegistroACEscalonado = new Object();
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE = new Object();
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE = new Object();
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar = true;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen = "/#!/sistema/busqueda/buscar-acescalonado/";
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado = codigoAcuerdoComercialEscalonado;
              $rootScope.Redirect("/#!/sistema/registro-de-acuerdo-comercial-escalonado/");
          }
          $scope.CargaInicialBusquedaAcEscalonado = function (continuar) {
              if (continuar) {
                  if ($rootScope.DatosFormulario.BusquedaACEscalonado.Filtro != undefined) {
                      if ($rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea != undefined) {
                          if ($rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea.length > 0) {
                              
                                 
                              var selectDefault =[];
                              selectDefault = $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.ListaRolSAP 
                              $scope.CargarRolCliente($rootScope.DatosFormulario.RolSAP, selectDefault);
                              if (selectDefault==undefined) {
                                //$("#RolCliente").multipleSelect("checkAll");   
                              } 
                                
                              $scope.Buscar_Click();
                              return;
                          }
                      }
                  }
              }
              $.ajax({
                  url: "/AcuerdoComercialEscalonado/BusquedaAcEscalonadoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE.Linea = data.Linea;
                          $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea = $rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE.Habilitado = 'True';
                          }
                      }
                       // ROL LCIENTE MULTISELECT
                       $rootScope.DatosFormulario.RolSAP = data.Rol;
                       $scope.CargarRolCliente(data.Rol, []);
                      //$("#RolCliente").multipleSelect("checkAll");

                      ConfiguracionSecciones("AdministracionConcesionEscalonada",$rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea);
                  }
              });
          }
          $scope.CambiarLinea = function () {
            ConfiguracionSecciones("AdministracionConcesionEscalonada",$rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea);
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              if ($rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea naviera es requerido.");
                  return false;
              } else {
                  if ($rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea naviera es requerido.");
                      return false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              /*
              if($rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoRA){

                  if($rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoRA.length < 10){
                      $(".caja11.msgerror.CodigoRA").html("El Nro. RA debe tener 10 carácteres");
                      return false;
                  }else {
                       $(".caja11.msgerror.CodigoRA").html("");
                  } 
              }else{
                 $(".caja11.msgerror.CodigoRA").html("");
              }
              */


              var RolCliente = $("#RolCliente").multipleSelect("getSelects");
              var ListaRolSAP = $.map(RolCliente, function(value, index) {
                            return [value];
                          });


              if (ListaRolSAP != undefined) {
                  if (ListaRolSAP.length > 0) {
                      $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.ListaRolSAP = ListaRolSAP;
                  }else{
                       
                      $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.ListaRolSAP = [];
                  }
              }

              
              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro };
              $scope.gridapigrillaListaACEscalonado.find(objRequest);
              miBlock(false, "html");

              return false;
          }
          $scope.Nuevo_Click = function () {
              $rootScope.DatosFormulario.RegistroACEscalonado = new Object();
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE = new Object();
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE = new Object();
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagEditar = false;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen = "/#!/sistema/busqueda/buscar-acescalonado/";
              $rootScope.Redirect("/#!/sistema/registro-de-acuerdo-comercial-escalonado/");
          }
          $scope.BuscarNroBL_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "busquedaACEscalonadoNroBL";
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
              $rootScope.FlagCallClientes = "busquedaACEscalonado";
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
              $rootScope.FlagCallDocumentosOrigen = "busquedaACEscalonadoNroCtn";
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
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoAcuerdoComercialEscalonado = "";
              $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoRA = "";
              $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.NumeroBL = "";
              $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoCliente = "";
              $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoContenedor = "";
              $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoRolSAP = "";
              $rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE.DescripcionCliente = "";
              if ($rootScope.DatosFormulario.BusquedaACEscalonado.DatosACE.Linea.length > 1) {
                  $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              $rootScope.DatosFormulario.BusquedaACEscalonado.Filtro.ListaRolSAP =[];
              //$("#RolCliente").multipleSelect("checkAll");
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });



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