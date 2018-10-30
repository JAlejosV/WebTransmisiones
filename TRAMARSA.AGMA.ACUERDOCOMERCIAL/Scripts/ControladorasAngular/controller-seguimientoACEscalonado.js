(function () {
    angular.module('api')
    .controller('SeguimientoACEscalonadoController',
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
                  $scope.CargaInicialSeguimientoAcEscalonado(true);
                  $rootScope.DatosFormulario.RegistroACEscalonado.FlagACEscalonado = false;
               }else{
                  $rootScope.DatosFormulario = new Object();
                  $rootScope.DatosFormulario.SeguimientoACEscalonadoIndex  = new Object();
                  $rootScope.DatosFormulario.SeguimientoACEscalonado = new Object();
                  $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro = new Object();
                  $rootScope.DatosFormulario.SeguimientoACEscalonado.SeguimientoDatos = new Object();
                  $scope.CargaInicialSeguimientoAcEscalonado(false);
              }


              if($rootScope.DatosFormulario.RolSAP == undefined){
               $rootScope.DatosFormulario.RolSAP = new Object();
              } 


              $(".InputTEXT_04Fecha").prop('disabled', false);
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
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.AcuerdoComercialFlagSeguimiento = true;
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.UrlOrigen = "/#!/sistema/seguimiento/seguimiento-ac-escalonado/";
              $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado = codigoAcuerdoComercialEscalonado;
              $rootScope.Redirect("/#!/sistema/registro-de-acuerdo-comercial-escalonado/");
          }
          $scope.CargaInicialSeguimientoAcEscalonado = function (continuar) {
              if (continuar) {
                  if ($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro != undefined) {

                      var selectDefault =[];
                      selectDefault = $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.ListaRolSAP;
                      $scope.CargarRolCliente($rootScope.DatosFormulario.RolSAP, selectDefault);
                      if (selectDefault==undefined) {
                        //$("#RolCliente").multipleSelect("checkAll");   
                      }
                      $scope.Buscar_Click();
                      return;
                  }
              }

              $.ajax({
                  url: "/AcuerdoComercialEscalonado/SeguimientoAcEscalonadoIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.SeguimientoACEscalonadoIndex.Linea = data.Linea;
                          $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoLinea = $rootScope.DatosFormulario.SeguimientoACEscalonadoIndex.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.SeguimientoACEscalonadoIndex.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.SeguimientoACEscalonadoIndex.Habilitado = 'True';
                          }
                      }
                      $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaInicio = data.FechaDefault;
                      $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaFin = data.FechaFinDefault;
                      //$rootScope.DatosFormulario.SeguimientoACEscalonadoIndex.Rol = data.Rol;
                      $rootScope.DatosFormulario.SeguimientoACEscalonadoIndex.Estados = data.Estados;

                      $rootScope.DatosFormulario.RolSAP = data.Rol;
                      $scope.CargarRolCliente(data.Rol, []);
                      //$("#RolCliente").multipleSelect("checkAll");

                  }
              });
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              if (!validar()) {
                  return false;
              }
              if($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoRA){
                  /*
                    if($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoRA.length < 10){
                        $(".caja11.msgerror.CodigoRA").html("El Nro. RA debe tener 10 carácteres");
                        return false;
                    }else {
                         $(".caja11.msgerror.CodigoRA").html("");
                    }
                    */
              }else{
                 $(".caja11.msgerror.CodigoRA").html("");
              }

			  //var ListaRolSAP = $("#RolCliente").multipleSelect("getSelects");
            
			  var RolCliente = $("#RolCliente").multipleSelect("getSelects");
              var ListaRolSAP = $.map(RolCliente, function(value, index) {
                            return [value];
                          });

              
              if (ListaRolSAP != undefined) {
                  if (ListaRolSAP.length > 0) {
                      $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.ListaRolSAP = ListaRolSAP;
                  }
                else{
                       
                      $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.ListaRolSAP = [];
                  		$rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.ListaRolSAP.push("");
                  }
                
              } 

              miBlock(true, "html");
              var objRequest = { "filtro": $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro };
              $scope.gridapigrillaListaSeguimientoACEscalonado.find(objRequest);
              miBlock(false, "html");

              return false;
          }

          function validar() {
              miBlock(true, "#html");
              var salida = true;
              if (validateForm("#SeguimientoACEscalonadoFrm") == false) {
                  miBlock(false, "#html");
                  salida = false;
              }
              if ($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea naviera es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea naviera es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }
              if ($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaInicio == undefined) {
                  $(".caja11.msgerror.FechaInicio").html("Fecha Inicio es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaInicio.length <= 0) {
                      $(".caja11.msgerror.FechaInicio").html("Fecha Inicio es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.FechaInicio").html("");
                  }
              }

              if ($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaFin == undefined) {
                  $(".caja11.msgerror.FechaFin").html("Fecha Fin es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaFin.length <= 0) {
                      $(".caja11.msgerror.FechaFin").html("Fecha Fin es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.FechaFin").html("");
                  }
              }
              return salida;
          }

          $scope.BuscarNroBL_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "seguimientoACEscalonadoNroBL";
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
              $rootScope.FlagCallClientes = "seguimientoACEscalonado";
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
              $rootScope.FlagCallDocumentosOrigen = "seguimientoACEscalonadoNroCtn";
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
          $scope.BuscarUsuarioCreacion_Click = function () {
              $rootScope.DatosFormulario.OpcionUsuario = "seguimientoACEscalonadoUserCreacion";
              getPopupResponsive({
                  formURL: "/SeguridadAgma/BuscarUsuario",
                  title: "Buscar Usuario",
                  nombreDiv: "divPopupBuscarUsuario",
                  nombreGrid: "",
                  width: "1200px",
                  height: 800,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarUsuario"))($scope);
                  }
              });
          }
          $scope.BuscarUsuarioAprobacion_Click = function () {
              $rootScope.DatosFormulario.OpcionUsuario = "seguimientoACEscalonadoUserAprobacion";
              getPopupResponsive({
                  formURL: "/SeguridadAgma/BuscarUsuario",
                  title: "Buscar Usuario",
                  nombreDiv: "divPopupBuscarUsuario",
                  nombreGrid: "",
                  width: "1200px",
                  height: 800,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divPopupBuscarUsuario"))($scope);
                  }
              });
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoAcuerdoComercialEscalonado = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoRA = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.NumeroBL = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoCliente = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.SeguimientoDatos.DescripcionCliente = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoContenedor = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoRol = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.Estado = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.UsuarioCreacion = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.SeguimientoDatos.NombreUsuarioCreacion = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.UsuarioAprobacion = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.SeguimientoDatos.NombreUsuarioAprobacion = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaInicio = "";
              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.FechaFin = "";
              $(".caja11.msgerror.FechaInicio").html("");
              $(".caja11.msgerror.FechaFin").html("");
              if ($rootScope.DatosFormulario.SeguimientoACEscalonadoIndex.Linea.length > 1) {
                  $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }

              $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.ListaRolSAP=[];
              $("#RolCliente").multipleSelect("checkAll");

          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });

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