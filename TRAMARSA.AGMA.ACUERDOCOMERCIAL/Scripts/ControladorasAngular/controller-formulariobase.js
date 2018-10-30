(function () {
    angular.module('api')
		.controller('FormularioBaseController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector) {

			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.
			        ponerFechas();
			        PonerFocoInicio();
			       ColoresConfiguracionLinea();
			        $("input[type=text]").on("keyup", function (e) {
			            var keyespecial = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
			            if (keyespecial == 13) {
			                $("img[alt=Buscar]").parent().parent().click();
			            }
			        });
			    });

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
			            $("#tablaBancos").attr('style', ' background:' + color + ' !important;');
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
                            
			        }
			    }
			  
			    var hashPagina = window.location.hash.replace("#!", "");
			    if (hashPagina.length > 0) {
			        var arrhashPagina = [];
			        arrhashPagina = hashPagina.split('/');
			        arrhashPagina.clean("");
			        if (arrhashPagina.length > 0) {
			            hashPagina = arrhashPagina[arrhashPagina.length - 1];
			        }
			        if (hashPagina[hashPagina.length - 1] == '/') {
			            hashPagina = hashPagina.substr(0, hashPagina.length - 1);
			        }
			    }
			    var valido = true;
			    if ($rootScope.Formulario != undefined) {
			        if ($rootScope.Formulario.hash == hashPagina && $rootScope.Formulario.tipo == "pagina") {
			            valido = false;
			        }
			        else {
			            if ($rootScope.OtrosFormularios != undefined) {
			                for (var x = 0; x < $rootScope.OtrosFormularios.length; x++) {
			                    if ($rootScope.OtrosFormularios[x].hash == hashPagina && $rootScope.OtrosFormularios[x].tipo == "pagina") {
			                        valido = false;
			                        break;
			                    }
			                }
			            }
			        }
			    }

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
			                frm.tipo = "pagina";
			                if ($rootScope.Formulario == undefined) {
			                    $rootScope.Formulario = frm;
			                }
			                else {

			                    if ($rootScope.OtrosFormularios == undefined) {
			                        $rootScope.OtrosFormularios = new Array();
			                    }
			                    $rootScope.OtrosFormularios.push(frm);
			                }
			              
			            }
			        });
			    }



			}]);


})();