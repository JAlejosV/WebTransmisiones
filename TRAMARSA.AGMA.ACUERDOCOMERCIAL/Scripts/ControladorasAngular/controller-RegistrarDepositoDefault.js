(function () {
    angular.module('api')
    .controller('RegistrarDepositoDefaultController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.RegistroDepositoDefault == undefined)
                  $rootScope.DatosFormulario.RegistroDepositoDefault = new Object();
              if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos == undefined)
                  $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos = new Object();

              if ($rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial == undefined)
                  $rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial = new Object();

              if ($rootScope.DatosFormulario.RegistroDepositoDefault.DatosView == undefined)    
                  $rootScope.DatosFormulario.RegistroDepositoDefault.DatosView=new Object();

              //$scope.FlagMostrarBotonGuardar = true;
              $rootScope.DatosFormulario.RegistroDepositoDefault.DatosView.FlagEditar = true;

              //$rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.EstadoRegistroActivo = "Activo";
              //$rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.EstadoRegistroInactivo = "Inactivo";
              /*
              if ($scope.$parent.ModoPagina == "Editar") {
                $scope.FlagMostrarBotonGuardar = true;
              }
              else{
                $scope.FlagMostrarBotonDeshabilitar = true;
                
              }
              */
              $scope.DatosIniciales();
          });
          $scope.DatosIniciales = function () {
              $.ajax({
                  url: "/DepositoDefault/RegistrarDepositoDefaultIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      if (data != null) {
                          $rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial.Lineas = data.Lineas;

                          $rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial.Deposito = data.Deposito;
                                                    
                          $rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial.Sucursal = data.Sucursal;


                          if (data.Lineas.length > 0) {
                              $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoLinea = data.Lineas[0].Codigo;
                              //if (data.Lineas.length == 1) {
                              //    $rootScope.DatosFormulario.RegistroDepositoDefault.Datos.Habilitado = 'False';
                              //}
                          }
                      }

                      if ($scope.$parent.ModoPagina == "Editar") {
                          
                          $scope.FlagEditing = false;

                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoLinea = $scope.row.CodigoLinea;      

                          $scope.ChangeLineaNaviera($scope.row.CodigoLinea);
                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.Id = $scope.row.Id;  
                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoDeposito = $scope.row.CodigoDeposito;
                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoSucursal = $scope.row.CodigoSucursal;
                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoTipoContenedor = $scope.row.CodigoTipoContenedor;
                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.Observacion = $scope.row.Observacion;
                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoEstado = $scope.row.CodigoEstado;


                          //$rootScope.DatosFormulario.RegistroDepositoDefault.Datos.RequestFiltro = $scope.row.RequestFiltro;

                            if($scope.row.CodigoEstado=="S"){
                                $scope.FlagMostrarBotonGuardar = false;
                                $scope.FlagMostrarBotonModificar = true;
                                $scope.FlagMostrarBotonDeshabilitar = true;
                            }
                            else{
                                $scope.FlagMostrarBotonGuardar = false;
                                $scope.FlagMostrarBotonModificar = false;
                                $scope.FlagMostrarBotonDeshabilitar = false;
                            }
                      } else {
                          $scope.FlagEditing = true;
                          $scope.FlagMostrarBotonGuardar = true;
                          $scope.FlagMostrarBotonModificar = false;
                          $scope.FlagMostrarBotonDeshabilitar = false;

                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos = new Object();  

                          $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.EstadoRegistro = $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.EstadoRegistroActivo;
                      }
                  }
              });
          }
          function miAlertOkSuccess() {
              if ($scope.$parent.ModoPagina == "Editar") {
                  var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.FiltrosConsultaDepositoDefault.Filtro)) };
                  $scope.gridapigrillaListaDepositoDefault.find(objRequest);
                  //$rootScope.DatosFormulario.AdministrarGrupoPuerto.ListaGrupoPuertoExterno = [];
              }
              $scope.$parent.SalirPopup_Click();
          }
          function validarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoTipoContenedor == undefined) {
                  $(".caja11.msgerror.CodigoTipoContenedor").html("Tipo Contenedor es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoTipoContenedor").html("Tipo Contenedor es requerido.");
                  salida = false;
              }
              //else if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.NombreGrupoPuerto.length > 100) {
              //    $(".caja11.msgerror.NombreGrupoPuerto").html("Nombre Grupo Puerto no debe superar 100 caracteres.");
              //    salida = false;
              //}
              else {
                  $(".caja11.msgerror.CodigoTipoContenedor").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoSucursal == undefined) {
                  $(".caja11.msgerror.CodigoSucursal").html("Sucursal es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoSucursal").html("Sucursal es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoSucursal").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoDeposito == undefined) {
                  $(".caja11.msgerror.CodigoDeposito").html("Deposito es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoTipoContenedor.length <= 0) {
                  $(".caja11.msgerror.CodigoDeposito").html("Deposito es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoDeposito").html("");
              }

              if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoLinea == undefined) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.CodigoLinea.length <= 0) {
                  $(".caja11.msgerror.CodigoLinea").html("Línea es requerido.");
                  salida = false;
              }
              else {
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              return salida;
          }

          function registrarDepositoDefault() {
              miBlock(true, "#divPopupNuevoDepositoDefault");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos };
              $.ajax({
                  url: "/DepositoDefault/AgregarDepositoDefault",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupNuevoDepositoDefault");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Deposito Default fue registrado correctamente.", miAlertOkSuccess);
                          }
                          else {
                              if (data.Result.Mensajes.length > 0) {
                                  MiError(data.Result.Mensajes[0].Mensaje);
                              }
                              else {
                                  MiError(data.Result.Mensaje);
                              }
                          }
                      } else {
                          MiAlert("Ocurrió un problema interno en el sistema.");
                      }
                  }
              });
          }

          function actualizarDepositoDefault() {
              miBlock(true, "#divPopupNuevoDepositoDefault");
              var objRequest = { "request": $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos };
              $.ajax({
                  url: "/DepositoDefault/ActualizarDepositoDefault",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupNuevoDepositoDefault");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              MiAlertOk("El Deposito Default fue actualizado correctamente.", miAlertOkSuccess);
                              $scope.$parent.SalirPopup_Click();
                          }
                          else {
                              if (data.Result.Mensajes.length > 0) {
                                  MiError(data.Result.Mensajes[0].Mensaje);
                              }
                              else {
                                  MiError(data.Result.Mensaje);
                              }
                          }
                      } else {
                          MiAlert("Ocurrió un problema interno en el sistema.");
                      }
                  }
              });
          }

          function validaDepositoDefault() {
              var salida = true;
              miBlock(true, "#divPopupNuevoDepositoDefault");
              //var objRequest = { "request": $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos };

              var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos)) };
              objRequest.filtro.CodigoEstado="S";

              $.ajax({
                  url: "/DepositoDefault/ValidarDepositoDefault",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: objRequest,
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      miBlock(false, "#divPopupNuevoDepositoDefault");
                      if (data.Result != null) {
                          if (data.Result.Satisfactorio === true) {
                              //MiAlertOk("El Deposito Default fue actualizado correctamente.", miAlertOkSuccess);
                              if(data.DepositoDefaultList.length>0){
                                //MiAlertOk("El Deposito Default fue actualizado correctamente.", miAlertOkSuccess);
                                if(data.DepositoDefaultList[0].Id != $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.Id){
                                    salida = false;
                                    MiError("El tipo de contenedor ya se encuentra registrado para el deposito " + data.DepositoDefaultList[0].DescripcionDeposito + ", sucursal " + data.DepositoDefaultList[0].DescripcionSucursal + " y linea " + data.DepositoDefaultList[0].DescripcionLinea);

                                }
                              }
                          }
                          else {
                              salida = false;
                              if (data.Result.Mensajes.length > 0) {

                                  MiError(data.Result.Mensajes[0].Mensaje);
                              }
                              else {
                                  MiError(data.Result.Mensaje);
                              }
                          }
                      } else {
                          salida = false;
                          MiAlert("Ocurrió un problema interno en el sistema.");
                      }
                  }
              });
              return salida;
          }
          $scope.Guardar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = validarDatos();
              if (validar) {
                  validar=validaDepositoDefault();
                  if (validar){
                     if ($scope.$parent.ModoPagina == "Editar") {
                        actualizarDepositoDefault();
                     } else {
                          registrarDepositoDefault();
                      }
                  }
                
              }
          }

          $scope.Deshabilitar_Click = function () {
              miBlock(true, "#divPopupNuevoDepositoDefault");

              if ($rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos.Id > 0) {
                  MiConfirm("¿Está seguro de desactivar la configuración de depósito?.", function () {

                      
                      var objRequest = { "request": $rootScope.DatosFormulario.RegistroDepositoDefault.RegistroDatos };  
                      objRequest.request.CodigoEstado="A";

                      //url: "/Notificacion/DesactivarNotificacion",
                      $.ajax({
                          url: "/DepositoDefault/ActualizarDepositoDefault",
                          type: "POST",
                          headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                          data: objRequest,
                          dataType: "json",
                          cache: true,
                          async: false,
                          success: function (data) {
                              miBlock(false, "#divPopupNuevoDepositoDefault");
                              if (data.Result != null) {
                                  if (data.Result.Satisfactorio === true) {
                                      MiAlertOk("Se ha desactivado la configuración del depósito.", miAlertOkSuccess);
                                      $scope.$parent.SalirPopup_Click();
                                  }
                                  else {
                                      if (data.Result.Mensajes.length > 0) {
                                          MiError(data.Result.Mensajes[0].Mensaje);
                                      } else {
                                          MiError(data.Result.Mensaje);
                                      }
                                  }
                              } else {
                                  MiAlert("Ocurrió un problema interno en el sistema.");
                              }
                          }
                      });
                  });
              }
              miBlock(false, "#divPopupNuevoDepositoDefault");
          }

          $scope.Salir_Click = function () {
              $scope.$parent.SalirPopup_Click();
          }

          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $scope.Modificar_Click = function () {
              $scope.FlagMostrarBotonGuardar = true;
              $scope.FlagMostrarBotonModificar = false;
              $scope.FlagMostrarBotonDeshabilitar = false;
              $scope.FlagEditing = true;
              $scope.EnabledDisabledJqte(true);
              $scope.EditingForms();
          }



          

          $scope.ChangeLineaNaviera = function (codigoLinea) {
              if (codigoLinea != undefined) {
                  $.ajax({
                      url: "/TipoContenedor/ListarTipoContenedorByLinea",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "codigoLinea=" + codigoLinea,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          if (data.ListaTipoContenedor.length > 0) {
                              //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = data.ListaTipoContenedor;
                              $rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial.TipoContenedor = data.ListaTipoContenedor;
                          } else {
                              //$rootScope.DatosFormulario.FiltrosBusquedaTarifaEscalonadaCargaInicial.Contenedor = [];
                              $rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial.TipoContenedor = [];
                          }
                      }
                  });
              } else {
                  $rootScope.DatosFormulario.RegistroDepositoDefaultCargaInicial.TipoContenedor = [];
              }
          }

          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
      }]);
})();