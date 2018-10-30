(function () {
    angular.module('api')
    .controller('AdministrarCuentaContrasenaController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarCuenta == undefined)
                  $rootScope.DatosFormulario.AdministrarCuenta = new Object();
          });
          $scope.CambiarContrasena_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = ValidarDatos();
              if (validar) {
                  miBlock(true, "#html");
                  $rootScope.DatosFormulario.AdministrarCuenta.Usuario = $scope.Menus.CodigoUsuario;
                  var objRequest = { "request": $rootScope.DatosFormulario.AdministrarCuenta };
                  $.ajax({
                      url: "/SeguridadAgma/CambiarClaveUsuario",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: objRequest,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          miBlock(false, "#html");
                          if (data.Result != null) {
                              if (data.Result.Satisfactorio === true) {
                                  MiAlertOk("Se actualizó la nueva contraseña.", MiAlertOk_success);
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
          }
          $scope.Salir_Click = function () {
              $rootScope.Redirect("/#!/sistema/bienvenido/");
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          function MiAlertOk_success() {
              window.location.href = "/#!/sistema/bienvenido/";
          }
          function ValidarDatos() {
              var salida = true;
              var cuenta = $scope.Menus.CodigoUsuario.split('\\');
              if (!isValidEmailAddress(cuenta[1])) {
                  $(".caja11.msgerror.Objecto").html("La cuenta no tiene un correo electrónico válido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.Objecto").html("");
              }
              if (!salida) {
                  return false;
              }
              if ($rootScope.DatosFormulario.AdministrarCuenta.ClaveAnterior == undefined) {
                  $(".caja11.msgerror.ClaveAnterior").html("Contraseña Actual es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.AdministrarCuenta.ClaveAnterior.length <= 0) {
                      $(".caja11.msgerror.ClaveAnterior").html("Contraseña Actual es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.ClaveAnterior").html("");
                  }
              }

              if ($rootScope.DatosFormulario.AdministrarCuenta.ClaveNueva == undefined) {
                  $(".caja11.msgerror.ClaveNueva").html("Nueva Contraseña es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.AdministrarCuenta.ClaveNueva.length <= 0) {
                      $(".caja11.msgerror.ClaveNueva").html("Nueva Contraseña es requerido.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.ClaveNueva").html("");
                  }
              }

              if ($rootScope.DatosFormulario.AdministrarCuenta.ClaveNuevaConfirmada == undefined) {
                  $(".caja11.msgerror.ClaveNuevaConfirmada").html("Repetir Contraseña es requerido.");
                  salida = false;
              }
              else if ($rootScope.DatosFormulario.AdministrarCuenta.ClaveNuevaConfirmada.length <= 0) {
                  $(".caja11.msgerror.ClaveNuevaConfirmada").html("Repetir Contraseña es requerido.");
                  salida = false;
              } else {
                  if ($rootScope.DatosFormulario.AdministrarCuenta.ClaveNuevaConfirmada != $rootScope.DatosFormulario.AdministrarCuenta.ClaveNueva) {
                      $(".caja11.msgerror.ClaveNuevaConfirmada").html("Repetir contraseña no coincide con la Nueva Contraseña.");
                      salida = false;
                  } else {
                      $(".caja11.msgerror.ClaveNuevaConfirmada").html("");
                  }
              }
              return salida;
          }
          function isValidEmailAddress(emailAddress) {
              var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
              return pattern.test(emailAddress);
          }
      }]);
})();