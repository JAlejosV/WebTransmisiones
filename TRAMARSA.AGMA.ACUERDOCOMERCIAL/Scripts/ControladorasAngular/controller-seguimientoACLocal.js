(function () {
    angular.module('api')
    .controller('SeguimientoACLocalController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {

              if ($rootScope.DatosFormulario == undefined) {
                  $rootScope.DatosFormulario = new Object();
              }
              if ($rootScope.DatosFormulario.DatosAC == undefined) {
                  $rootScope.DatosFormulario.DatosAC = new Object();
              }


              if ($rootScope.DatosFormulario.DatosAC.FlagACLocal) {
                  $scope.CargaInicialSeguimientoAcLocal(true);
                  $rootScope.DatosFormulario.DatosAC.FlagACLocal = false;
              } else {
                  $rootScope.DatosFormulario = new Object();
                  $rootScope.DatosFormulario.SeguimientoACLocalIndex = new Object();
                  $rootScope.DatosFormulario.SeguimientoACLocal = new Object();
                  $rootScope.DatosFormulario.SeguimientoACLocal.Filtro = new Object();
                  $rootScope.DatosFormulario.SeguimientoACLocal.SeguimientoDatos = new Object();
                  $scope.CargaInicialSeguimientoAcLocal(false);
              }

              if ($rootScope.DatosFormulario.RolSAP == undefined) {
                  $rootScope.DatosFormulario.RolSAP = new Object();
              }



              $(".InputTEXT_04Fecha").prop('disabled', false);
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
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.AcuerdoComercialFlagSeguimiento = true;
              $rootScope.DatosFormulario.DatosAC.UrlOrigen = "/#!/sistema/seguimiento/seguimiento-ac-local/";
              $rootScope.DatosFormulario.RegistroAC.DatasRegistro.CodigoAcuerdoComercialLocal = codigoAcuerdoComercialLocal;
              $rootScope.Redirect("/#!/sistema/registro-de-acuerdo-comercial-local/");
          }
          $scope.CargaInicialSeguimientoAcLocal = function (continuar) {
              if (continuar) {
                  if ($rootScope.DatosFormulario.SeguimientoACLocal.Filtro != undefined) {

                      var selectDefault = [];
                      selectDefault = $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.ListaRolSAP;
                      $scope.CargarRolCliente($rootScope.DatosFormulario.RolSAP, selectDefault);
                      if (selectDefault == undefined) {
                          //$("#RolCliente").multipleSelect("checkAll");   
                      }
                      $scope.Buscar_Click();
                      return;
                  }
              }

              $.ajax({
                  url: "/AcuerdoComercialLocal/SeguimientoAcLocalIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.SeguimientoACLocalIndex.Linea = data.Linea;
                          $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoLinea = $rootScope.DatosFormulario.SeguimientoACLocalIndex.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.SeguimientoACLocalIndex.Habilitado = 'False';
                          } else {
                              $rootScope.DatosFormulario.SeguimientoACLocalIndex.Habilitado = 'True';
                          }
                      }
                      $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.OriginalFechaInicio = data.FechaDefault;
                      $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.OriginalFechaFin = data.FechaFinDefault;

                      $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaInicio = data.FechaDefault;
                      $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaFin = data.FechaFinDefault;
                      //$rootScope.DatosFormulario.SeguimientoACLocalIndex.Rol = data.Rol;
                      $rootScope.DatosFormulario.SeguimientoACLocalIndex.Estados = data.Estados;

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

              var RolCliente = $("#RolCliente").multipleSelect("getSelects");

              //var ListaRolSAP = $("#RolCliente").multipleSelect("getSelects");

              var ListaRolSAP = $.map(RolCliente, function (value, index)
              { return [value]; });


              if (ListaRolSAP != undefined) {
                  if (ListaRolSAP.length > 0) {
                      $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.ListaRolSAP = ListaRolSAP;
                  }
                  else {

                      $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.ListaRolSAP = [];
                      $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.ListaRolSAP.push("");
                  }
              }

              /*
              if($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoRA){

                    if($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoRA.length < 10){
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
              var objRequest = { "filtro": $rootScope.DatosFormulario.SeguimientoACLocal.Filtro };
              $scope.gridapigrillaListaSeguimientoACLocal.find(objRequest);
              miBlock(false, "html");
              return false;
          }
          function validar() {
              miBlock(true, "#html");
              var salida = true;
              if (validateForm("#SeguimientoACLocalFrm") == false) {
                  miBlock(false, "#html");
                  salida = false;
              }
              if ($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea naviera es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoLinea.length <= 0) {
                      $(".caja11.msgerror.CodigoLinea").html("Línea naviera es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.CodigoLinea").html("");
                  }
              }

              if ($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaInicio == undefined) {
                  $(".caja11.msgerror.FechaInicio").html("Fecha Inicio es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaInicio.length <= 0) {
                      $(".caja11.msgerror.FechaInicio").html("Fecha Inicio es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.FechaInicio").html("");
                  }
              }

              if ($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaFin == undefined) {
                  $(".caja11.msgerror.FechaFin").html("Fecha Fin es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaFin.length <= 0) {
                      $(".caja11.msgerror.FechaFin").html("Fecha Fin es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.FechaFin").html("");
                  }
              }
              return salida;
          }

          $scope.BuscarNroBL_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "seguimientoACLocalNroBL";
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
          $scope.BuscarNroCtn_Click = function () {
              $rootScope.FlagCallDocumentosOrigen = "seguimientoACLocalNroCtn";
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
              $rootScope.FlagCallClientes = "seguimientoACLocal";
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
          $scope.BuscarUsuarioCreacion_Click = function () {
              $rootScope.DatosFormulario.OpcionUsuario = "seguimientoACLocalUserCreacion";
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
              $rootScope.DatosFormulario.OpcionUsuario = "seguimientoACLocalUserAprobacion";
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
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoAcuerdoComercialLocal = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoRA = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.NumeroBL = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoCliente = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.SeguimientoDatos.DescripcionCliente = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoContenedor = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoRol = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.Estado = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.UsuarioCreacion = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.SeguimientoDatos.NombreUsuarioCreacion = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.UsuarioAprobacion = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.SeguimientoDatos.NombreUsuarioAprobacion = "";
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaInicio = $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.OriginalFechaInicio;
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.FechaFin = $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.OriginalFechaFin;
              $(".caja11.msgerror.FechaInicio").html("");
              $(".caja11.msgerror.FechaFin").html("");
              if ($rootScope.DatosFormulario.SeguimientoACLocalIndex.Linea.length > 1) {
                  $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.ListaRolSAP = [];
              $("#RolCliente").multipleSelect("checkAll");

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