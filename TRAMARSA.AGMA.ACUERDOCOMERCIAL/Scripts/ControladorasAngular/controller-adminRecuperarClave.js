(function () {
    angular.module('api')
    .controller('AdministrarRecuperarClaveController',
      ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
      function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
          $timeout(function () {
              if ($rootScope.DatosFormulario == undefined)
                  $rootScope.DatosFormulario = new Object();
              if ($rootScope.DatosFormulario.AdministrarRecuperarClave == undefined)
                  $rootScope.DatosFormulario.AdministrarRecuperarClave = new Object();
              $rootScope.DatosFormulario.AdministrarRecuperarClave.Email = "";
              $(".caja11.msgerror.Email").html("");
          });
          $scope.RecuperarClave_Click = function () {
              if ($rootScope.EsEnter) {
                  return false;
              }
              var validar = ValidarDatos();
              if (validar) {
                  miBlock(true, "#divRecuperarClavePopup");
                  $.ajax({
                      url: "/SeguridadAgma/GenerarClaveUsuario",
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: $rootScope.DatosFormulario.AdministrarRecuperarClave,
                      dataType: "json",
                      cache: true,
                      async: false,
                      success: function (data) {
                          miBlock(false, "#divRecuperarClavePopup");
                          if (data.Result != null) {
                              if (data.Result.Satisfactorio === true) {
                                  MiAlertOk("La nueva contraseña fue enviada a su email.", MiAlertOk_success);
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
              $scope.$parent.SalirPopup_Click();
          }
          $scope.Enter = function () {
              $rootScope.EsEnter = true;
              return false;
          }
          $("input").focusout(function () {
              $rootScope.EsEnter = false;
          });
          function MiAlertOk_success() {
              $scope.$parent.SalirPopup_Click();
          }
          function ValidarDatos() {
              var salida = true;
              if ($rootScope.DatosFormulario.AdministrarRecuperarClave.Email == undefined) {
                  $(".caja11.msgerror.Email").html("Ingrese el correo electrónico.");
                  return false;
              } else {
                  $(".caja11.msgerror.Email").html("");
              }

              if (!isValidEmailAddress($rootScope.DatosFormulario.AdministrarRecuperarClave.Email)) {
                  $(".caja11.msgerror.Email").html("Ingrese un correo electrónico válido.");
                  salida = false;
              } else {
                  $(".caja11.msgerror.Email").html("");
              }
              return salida;
          }
          function isValidEmailAddress(emailAddress) {
              var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
              return pattern.test(emailAddress);
          }
          $('#btnRecuperarClave').click(function () {
              $scope.RecuperarClave_Click();
          });
      }]);
})();