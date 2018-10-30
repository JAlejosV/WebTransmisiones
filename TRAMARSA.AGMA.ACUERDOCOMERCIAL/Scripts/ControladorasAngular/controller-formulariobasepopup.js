(function () {
    angular.module('api')
		.controller('FormularioBasePopupController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$attrs',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $attrs) {

			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.
			        ponerFechas($attrs.id);
			        PonerFocoInicio($attrs.id);
			        ColoresConfiguracionLinea();
			        $("input[type=text]").on("keyup", function (e) {
			            var keyespecial = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
			            if (keyespecial == 13) {
			                $("img[alt=Buscar]").parent().parent().click();
			            }
			        });


			    });
			    $scope.SalirPopup_Click = function () {
			        //$("#"+$attrs.id).dialog("close");
			        $("#" + $attrs.id).modal("hide");
			    }
			    function ColoresConfiguracionLinea() {
			        if ($scope.Logo) {
			            $("#cliente_logo").attr("src", $scope.Logo);
			        }
			        if ($scope.Color) {
			            var color = $scope.Color;
			           
			            $(".block_menu").attr('style', 'border-right: 1px solid ' + color + '; border-left: 1px solid ' + color + '; border-bottom: 1px solid ' + color + '; border-top: 1px solid ' + color + ';');
			            $(".block_cab").attr('style', 'background:repeat-x ' + color + ' !important; border-right: 1px solid ' + color + '; border-left: 1px solid ' + color + '; border-bottom: 1px solid ' + color + '; border-top: 1px solid ' + color + ';');
			            $(".block_content").attr('style','width: 100%;' + 'border-right: 1px solid ' + color + '; border-left: 1px solid ' + color + '; border-bottom: 1px solid ' + color + '; border-top: 1px solid ' + color + ';');
			            $(".modal-title.ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix").attr('style', 'font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;font-size: 13px;cursor: move!important;padding: .4em 1em;' + 'background:' + color + ' ;' + ' border: 1px solid ' + color + ';');
			            $("#tablaBancos").attr('style', ' background:' + color + ' !important;');
			            setTimeout(function () {
			                var HeaderBackgroundColor = color;
			                $(".ui-jqgrid-sortable").each(function () {
			                    this.style.backgroundColor = color;
			                });
			                $(".ui-state-default.ui-jqgrid-pager").each(function () {
			                    this.style.backgroundColor = color;
			                });
			                $(".ui-jqgrid-resize.ui-jqgrid-resize-ltr").remove();
			                $(".ui-state-default.ui-th-column.ui-th-ltr").each(function () {
			                    this.style.backgroundColor = color;
			                });
			            }, 100);

			        }
			    }
			    var hashPagina = $rootScope.hashPopup;
			    //hashPagina = hashPagina.replace("es-PE", "");
			    hashPagina = hashPagina.replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_");
			    
			    if (hashPagina.length > 0) {
			        if (hashPagina[hashPagina.length - 1] == '/') {
			            hashPagina = hashPagina.substr(0, hashPagina.length - 1);
			        } else {
			            var lstHash = hashPagina.split("/");
			            lstHash.clean("");
			            if (lstHash.length > 1) {
			                hashPagina = lstHash[lstHash.length - 1];
			            }
			        }
			    }
			    var valido = true;
			    if ($rootScope.Formulario != undefined) {
			        if ($rootScope.Formulario.hash == hashPagina && $rootScope.Formulario.tipo == "popup") {
			            valido = false;
			        }
			        else {
			            if ($rootScope.OtrosFormularios != undefined) {
			                for (var x = 0; x < $rootScope.OtrosFormularios.length; x++) {
			                    if ($rootScope.OtrosFormularios[x].hash == hashPagina && $rootScope.OtrosFormularios[x].tipo == "popup") {
			                        valido = false;
			                        break;
			                    }
			                }
			            }
			        }
			    }
			    //url: "data/ChannelProperties?path=" + hashPagina,
			    if (valido == true) {
			        $.ajax({
			            url: "/Content/Configuracion/" + hashPagina + ".json",
			            contentType: "application/json; charset=utf-8",
			            type: "GET",
			            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
			            data: "",
			            async: false,
			            dataType: "json",
			            success: function (data) {
			                var frm = data.Data[0];
			                frm.hash = hashPagina;
			                frm.tipo = "popup";
			                if ($rootScope.Formulario == undefined) {
			                    $rootScope.Formulario = frm;
			                }
			                else {

			                    if ($rootScope.OtrosFormularios == undefined) {
			                        $rootScope.OtrosFormularios = new Array();
			                    }
			                    $rootScope.OtrosFormularios.push(frm);
			                }
			            },
			            error: function (xhr, ajaxOptions, thrownError) {
			                var error1 = xhr.status;
			                var error2 = thrownError;
			             }

			        });
			    }



			}]);


})();