(function () {
    angular.module('api')
    .controller('CargaMasivaAcuerdoComercialController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.CargaMasivaAC == undefined)
                  $rootScope.DatosFormulario.CargaMasivaAC = new Object();
              if ($rootScope.DatosFormulario.DatosCargaMasivaAC == undefined)
                  $rootScope.DatosFormulario.DatosCargaMasivaAC = new Object();
              $scope.CargarDatosIniciales();
              $scope.Limpiar_Click();
              $scope.FlagCargaMasivaEliminar = true;
              uploadFile($('#upload'));

          });
          $scope.CargarDatosIniciales = function () {
              $.ajax({
                  url: "/CargaMasiva/CargaMasivaIndex",
                  type: "POST",
                  headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                  data: "",
                  dataType: "json",
                  cache: true,
                  async: false,
                  success: function (data) {
                      $rootScope.DatosFormulario.DatosCargaMasivaAC.Lineas = data.Linea;
                      if (data.Linea.length > 0) {
                          $rootScope.DatosFormulario.CargaMasivaAC.CodigoLinea = data.Linea[0].Codigo;
                          if (data.Linea.length == 1) {
                              $rootScope.DatosFormulario.DatosCargaMasivaAC.Habilitado = 'False';
                          }
                      }
                  }
              });
          }
          function uploadFile(element) {
              $(element).fileupload({
                  dataType: 'json',
                  url: '/CargaMasiva/CargaMasivaAc',
                  autoUpload: false,
                  replaceFileInput: false,
                  fileInput: $("input:file"),
                  add: function (e, data) {
                      var goUpload = true;
                      var uploadFile = data.files[0];
                    /*  if (!(/\.(csv)$/i).test(uploadFile.name)) {
                          $(".caja11.msgerror.upload").html("El archivo no es un formato CSV.");
                          goUpload = false;
                      }
                    
                      if (!(/\.(xlsx)$/i).test(uploadFile.name)) {  // 2007 +
                              if (!(/\.(xls)$/i).test(uploadFile.name)) {  //2003
                                $(".caja11.msgerror.upload").html("El archivo no es un formato Excel.");
                                goUpload = false;
                              }
                          }
                      */
                      if (!(/\.(xlsx)$/i).test(uploadFile.name)) {
                          $(".caja11.msgerror.upload").html("El archivo no es un formato xlsx.");
                          goUpload = false;
                      }

                      if (uploadFile.size > 2000000) { // 2mb
                          $(".caja11.msgerror.upload").html("El archivo es demasiado pesado.");
                          goUpload = false;
                      }
                      if (goUpload == true) {
                          $(".caja11.msgerror.upload").html("");
                          
                          $("#btnProcesar").off('click').on('click', function () {
                              //Inicio Limpiar Campos
                              $scope.Limpiar2_Click();
                              //Fin Limpiar Campos
                              if (data.files.length > 0) {
                                  if ($rootScope.DatosFormulario.CargaMasivaAC.CodigoLinea.length > 0) {
                                      miBlock(true, "html");
                                      data.formData = {
                                          files: data.files[0],
                                          codigoLinea: $rootScope.DatosFormulario.CargaMasivaAC.CodigoLinea
                                      };
                                      data.submit();
                                      //miBlock(false, "html");
                                  } else {
                                      $(".caja11.msgerror.CodigoLinea").html("Línea es un campo olbigatorio.");
                                  }
                              } else {
                                  $(".caja11.msgerror.upload").html("Seleccione un archivo CSV.");
                              }
                          });
                      }
                      $("#btnEliminar").off('click').on('click', function () {
                          data.files.length = 0;
                          $('#upload').val('');
                          $(".caja11.msgerror.upload").html("");
                      });
                  },
                  done: function (e, data) {
                      if (data.result.Result.Satisfactorio) {
                          $(".caja11.msgerror.upload").html("Terminó la carga...");
                          $rootScope.DatosFormulario.CargaMasivaAC.Resultado = data.result.Result.Mensaje;
                          $rootScope.$apply();
                      } else {
                          $(".caja11.msgerror.upload").html("Existe un error en el archivo, revise el resultado.");
                          $rootScope.DatosFormulario.CargaMasivaAC.Resultado = data.result.Result.Mensaje;
                          $rootScope.$apply();
                      }
                      miBlock(false, "html");
                      if (data.result.ListaNoIngresado.length > 0) {
                          $scope.Buscar_Click();
                      } else {
                          $scope.gridapigrillaListaCargaMasivaError.refresh([]);
                      }
                  },
                  fail: function (e, data) {
                      miBlock(false, "html");
                      $(".caja11.msgerror.upload").html("Ha ocurrido un error.");
                      $scope.gridapigrillaListaCargaMasivaError.refresh([]);
                  }
              });
          };
          $scope.Salir_Click = function () {
              window.location.href = "/#!/sistema/bienvenido/";
          }
          $scope.Limpiar_Click = function () {
              $rootScope.DatosFormulario.CargaMasivaAC.Resultado = "";
              if ($rootScope.DatosFormulario.DatosCargaMasivaAC.Lineas.length > 1) {
                  $rootScope.DatosFormulario.CargaMasivaAC.CodigoLinea = "";
                  $(".caja11.msgerror.CodigoLinea").html("");
              }
              $('#upload').val('');
              $(".caja11.msgerror.upload").html("");
              var lista = [];
              $scope.gridapigrillaListaCargaMasivaError.refresh(lista);
              $rootScope.$apply();
              $rootScope.$apply();
          }
          $scope.Limpiar2_Click = function () {
              $rootScope.DatosFormulario.CargaMasivaAC.Resultado = "";
              $scope.gridapigrillaListaCargaMasivaError.refresh([]);
              $rootScope.$apply();
          }
          $scope.Buscar_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              miBlock(true, "html");
              var objRequest = { "filtro": new Object() };
              $scope.gridapigrillaListaCargaMasivaError.find(objRequest);
              miBlock(false, "html");
              return false;
          }
      }]);
})();

