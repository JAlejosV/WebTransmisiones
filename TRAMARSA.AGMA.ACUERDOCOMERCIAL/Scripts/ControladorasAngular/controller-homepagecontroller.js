(function () {
    angular.module('api')
    .controller('PageHomeController',
      			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$location', '$window', '$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $location, $window, $compile) {

          $timeout(function () {             
              //aqui también puede activar plugins, se ejecuta al final de carga de página.
              $("#frmLogin").appendTo("#HomeSeccionDerecha")
              PORTAL.init();
              $scope.CargarFormularioLogin();
              ColoresConfiguracionLinea();
              
          });
          function getUrlVars() {
              var vars = [], hash;
              var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
              for (var i = 0; i < hashes.length; i++) {
                  hash = hashes[i].split('=');
                  vars.push(hash[0]);
                  vars[hash[0]] = hash[1];
              }
              return vars;
          }
          function ColoresConfiguracionLinea() {
              if ($scope.Logo) {
                  $("#cliente_logo").attr("src", $scope.Logo);
              }
              if ($scope.Color) {
                  var color = $scope.Color;
                  $(".navbar").attr('style', 'margin-bottom: 0px !important; background-color: ' + color + ' !important;')
                  $(".block").attr('style', 'background-color: white; border-bottom:1px solid ' + color + ';');
                  $(".block_head").attr('style', 'border-top:1px solid ' + color + '');
                  $(".bheadl").attr('style', 'border-right:1px solid ' + color + '; border-left:1px solid ' + color + ';');
                  $(".contenido ").attr('style', 'border:1px solid ' + color + ';')
                  $("#footer").attr('style', 'border-left:1px solid ' + color + '; background:repeat-x ' + color + '; border-right-color:' + color + '; border-bottom-color:' + color + ';');

                  $(".slick-prev").attr('style', 'background-color: ' + color + ' !important');
                  $(".slick-next").attr('style', 'background-color: ' + color + ' !important');
                  $("input[type=submit]").attr('style', 'background: ' + color + ';');

                  $(".block_menu").attr('style', 'border-right: 1px solid ' + color + '; border-left: 1px solid ' + color + '; border-bottom: 1px solid ' + color + '; border-top: 1px solid ' + color + ';');

                  $(".block_cab").attr('style', 'background:repeat-x ' + color + ' !important; border-right: 1px solid ' + color + '; border-left: 1px solid ' + color + '; border-bottom: 1px solid ' + color + '; border-top: 1px solid ' + color + ';');

                  $(".block_content").attr('style', 'border-right: 1px solid ' + color + '; border-left: 1px solid ' + color + '; border-bottom: 1px solid ' + color + '; border-top: 1px solid ' + color + ';');


                  $(".ui-state-default.ui-jqgrid-pager.ui-corner-bottom.ng-scope").attr('style', 'background: ' + color + ' !important;');
                  $(".ui-jqgrid-sortable").attr('style', 'background: ' + color + ' !important;');
                  $(".ui-jqgrid-resize.ui-jqgrid-resize-ltr").attr('style', 'background: ' + color + ' !important;');
                  $(".dropdown-toggle").attr('style', 'background-color:' + color + ' !important;');
                  $(".dropdown-menu").attr('style', 'background-color: ' + color + ' !important;');
                  $("a.claseHover").hover(function () {
                      $(this).css("background-color", color)
                  });

                  $(".ui-state-default.ui-th-column.ui-th-ltr").attr('style', 'background-color: ' + color + ' !important;');
                  $(".ui-state-default.ui-th-column.ui-th-ltr").css("background-image", "url(/Content/Images/sep_header_grilla.gif) !important;");
              }
          }
          $scope.CargarFormularioLogin = function () {
              //if($scope.datosFormularioLogin==undefined)
              //{
              //return null;
              //}
              //var datosFormularioLogin= $scope.datosFormularioLogin;
              //var datosLogin={
              //      "submit":datosFormularioLogin.Parts.es_pe__NombreBoton,
              //      "mensajeError":datosFormularioLogin.Parts.es_pe__MensajeError,
              //      "urlLogin":"/SeguridadAgma/Login/",
              //      "urlHome": datosFormularioLogin.Parts.PaginaInicio,
              //      "modoAutenticacion": datosFormularioLogin.Parts.ModoAutenticacion.Value,
              //    };
              var datosLogin = {
                  "submit": "Ingresar",
                  "mensajeError": "Usuario y/o Contraseña Incorrectos",
                  "urlLogin": "/SeguridadAgma/Login/",
                  "urlHome": "sistema/bienvenido/",
                  "modoAutenticacion": "AW",
              };
              if (datosLogin.modoAutenticacion == "AW") {
                  //$("#linkOlvidoContrasena").hide();
              }
              var mifrmLogin = $("#frmLogin form");
              mifrmLogin.find(":submit").val(datosLogin.submit);

              mifrmLogin.find("input[name=Usuario], input[name=Contrasena]").attr("maxlength", 50);
              mifrmLogin.find("input[name=Usuario]").addClass("soloalfanumerico inc_arroba inc_backslash inc_punto inc_menos");
              $(mifrmLogin).submit(function () {
                  var valorUsuario = mifrmLogin.find("input[name=Usuario]").val();
                  var valorClave = mifrmLogin.find("input[name=Contrasena]").val();
                  var resultado = true;
                  if (valorUsuario == "") {
                      mifrmLogin.find("input[name=Usuario]").parent().find(".field-validation-valid").html("Campo obligatorio");
                      resultado = false;
                  }
                  if (valorClave == "") {
                      mifrmLogin.find("input[name=Contrasena]").parent().find(".field-validation-valid").html("Campo obligatorio");
                      resultado = false;
                  }
                  if (!resultado) {
                      return false;
                  }
                  if (!validarCorreo(valorUsuario) && !validarCuenta(valorUsuario) && !validarCliente(valorUsuario)) {
                      MiError("El nombre de usuario no tiene el formato correcto.")
                      return false;
                  }

                  //if (!$(this).data("validator").valid())
                  //    return false;

                  if (mifrmLogin.find("input[name=Contrasena]").val() === "")
                      return false;

                  miBlock(true, "#ContenedorBody");
                  mifrmLogin.find(":submit").attr("disabled", "disabled");
                  $.ajax({
                      url: datosLogin.urlLogin,
                      type: "POST",
                      headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                      data: "usuario=" + encodeURIComponent(mifrmLogin.find("input[name=Usuario]").val())
                          + "&Password=" + encodeURIComponent(mifrmLogin.find("input[name=Contrasena]").val()),
                      dataType: "json",
                      success: function (data) {
                          if (data != undefined) {
                              if (data.Satisfactorio === true) {
                                  $rootScope.CargaInicialAplicacion();

                                  //$location.url(datosLogin.urlHome)
                                  $window.location.href = "#!/" + datosLogin.urlHome;
                              }
                              else {
                                  MiError(datosLogin.mensajeError);
                              }
                          }
                          mifrmLogin.find(":submit").removeAttr("disabled");
                          miBlock(false, "#ContenedorBody");
                          $scope.CargarMenu();
                      }
                  });


                  return false;
              });

          };


          $('#btnOlvido').click(function () {
              getPopupResponsive({
                  formURL: "SeguridadAgma/RecuperarClave",
                  title: "Recuperar Clave",
                  nombreDiv: "divRecuperarClavePopup",
                  nombreGrid: "",
                  width: "200px",
                  height: 450,
                  params: {},
                  HideSelection: true,
                  multiSelect: false,
                  select: function (row) {
                      return true;
                  },
                  beforeShow: function (obj) {
                      $rootScope.hashPopup = $(obj).attr("mapurl");
                      $compile($("#divRecuperarClavePopup"))($scope);
                  }
              });
          });



      }]);


})();