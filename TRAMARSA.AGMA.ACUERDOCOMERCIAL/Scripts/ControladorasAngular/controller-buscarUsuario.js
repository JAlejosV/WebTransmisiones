(function () {
    angular.module('api')
		.controller('BuscarUsuarioController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
			    $timeout(function () {
			        $scope.CargarDatosIniciales();
			    });
			    $scope.CargarDatosIniciales = function () {
			        if ($rootScope.DatosFormulario == undefined)
			            $rootScope.DatosFormulario = new Object();
			        if ($rootScope.DatosFormulario.DatosBusquedaUsuario == undefined)
			            $rootScope.DatosFormulario.DatosBusquedaUsuario = new Object();
			        if ($rootScope.DatosFormulario.DatosGenerales == undefined)
			            $rootScope.DatosFormulario.DatosGenerales = new Object();
			        if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro == undefined)
			            $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro = new Object();

			        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.CodigoLinea = null;
			        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.NombreUsuario = null;
			        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.IdRol = null;

			        $rootScope.FlagMostrarBotonSeleccionar = true;

			        $.ajax({
			            url: "/SeguridadAgma/BusquedaUsuarioIndex",
			            type: "POST",
			            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
			            data: "",
			            dataType: "json",
			            cache: true,
			            async: false,
			            success: function (data) {
			                $rootScope.DatosFormulario.DatosBusquedaUsuario.Rol = data.RolesUsuarioList;
			                $rootScope.DatosFormulario.DatosBusquedaUsuario.Linea = data.Linea;
			                $scope.Limpiar_Click();
			                if (data.Linea.length > 0) {
			                    $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.CodigoLinea = data.Linea[0].Codigo;
			                    if (data.Linea.length == 1) {
			                        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.Habilitado = 'False';
			                    }
			                }
                            if(data.RolesUsuarioList.length > 0)
                            {
                            	$rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.IdRol=$from($scope.$root.DatosFormulario.DatosBusquedaUsuario.Rol).where("$NombreRol=='Autorizador'").firstOrDefault().IdRol;
                            }
			            }
			        });
			        var opc = $rootScope.DatosFormulario.OpcionUsuario;
			        if (opc == "seguimientoACLocalUserCreacion" || opc == "seguimientoACLocalUserAprobacion" || opc == "seguimientoACEscalonadoUserCreacion"
	                  || opc == "seguimientoACEscalonadoUserAprobacion") {
			            $(".InputTEXT_04Fecha").prop('disabled', false);
			        }


			    }
			    $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
			        var ret = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
			        var estado = ProcesarSeleccionado(ret);
			        if (estado) {
			            $rootScope.$apply();
			            $scope.$parent.SalirPopup_Click();
			        }

			    }
			    $scope.Limpiar_Click = function () {
			        $(".caja11.msgerror.Objeto").html("");
			        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.NombreUsuario = null;
			        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.IdRol = null;
			        if ($rootScope.DatosFormulario.DatosBusquedaUsuario.Linea.length > 1) {
			            $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.CodigoLinea = null;
			        }
			    }
			    $scope.Buscar_Click = function () {
			        if ($rootScope.EsEnter) {
			            return false;
			        }
			        miBlock(true, "#divPopupBuscarUsuario");
			        if (validateForm("#BusquedaUsuarioFrm") == false) {
			            miBlock(false, "#divPopupBuscarUsuario");
			            return false;
			        }
			        if ($rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.CodigoLinea != undefined) {
			            var objRequest = { "filtro": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro)) };
			            $scope.gridapigrillaListaUsuario.find(objRequest);
			            miBlock(false, "#divPopupBuscarUsuario");
			        }
			    }
			    $scope.Salir_Click = function () {
			        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.NombreUsuario = null;
			        $rootScope.DatosFormulario.DatosGenerales.DataBuscarUsuarioFiltro.IdRol = null;
			        $scope.$parent.SalirPopup_Click();
			    }
			    function ProcesarSeleccionado(data) {
			        var opc = $rootScope.DatosFormulario.OpcionUsuario;
			        if (opc == "TarifaLocal") {
			            $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.Autorizado = data.NombresCompletos;
			            $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoUsuarioAutorizador = data.NombreUsuario;
			        }
			        else if (opc == "AcuerdoComercial") {
			            $rootScope.DatosFormulario.DatosAC.Autorizado = data.NombresCompletos;
			            $rootScope.DatosFormulario.DatosAC.CodigoUsuarioAutorizador = data.NombreUsuario;
			            $rootScope.DatosFormulario.DatosAC.FechaAutorizacion = data.NombreUsuario;
			            var d = new Date();
						var month = d.getMonth()+1;
						var day = d.getDate();
						var fechaActual = (day<10 ? '0' : '') + day + '/'+ (month<10 ? '0' : '') + month + '/' + d.getFullYear();
			            $rootScope.DatosFormulario.RegistroAC.FechaAutorizacion =  fechaActual;
			        }
			        else if (opc == "TarifaEscalonada") {
			            $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosTE.Autorizado = data.NombresCompletos;
			            $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoUsuarioAutorizador = data.NombreUsuario;
			        }
			        else if (opc == "seguimientoACLocalUserCreacion") {
			            $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.UsuarioCreacion = data.NombreUsuario;
			            $rootScope.DatosFormulario.SeguimientoACLocal.SeguimientoDatos.NombreUsuarioCreacion = data.NombresCompletos;
			        }
			        else if (opc == "seguimientoACLocalUserAprobacion") {
			            $rootScope.DatosFormulario.SeguimientoACLocal.Filtro.UsuarioAprobacion = data.NombreUsuario;
			            $rootScope.DatosFormulario.SeguimientoACLocal.SeguimientoDatos.NombreUsuarioAprobacion = data.NombresCompletos;
			        }
			        else if (opc == "seguimientoACEscalonadoUserCreacion") {
			            $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.UsuarioCreacion = data.NombreUsuario;
			            $rootScope.DatosFormulario.SeguimientoACEscalonado.SeguimientoDatos.NombreUsuarioCreacion = data.NombresCompletos;
			        }
			        else if (opc == "seguimientoACEscalonadoUserAprobacion") {
			            $rootScope.DatosFormulario.SeguimientoACEscalonado.Filtro.UsuarioAprobacion = data.NombreUsuario;
			            $rootScope.DatosFormulario.SeguimientoACEscalonado.SeguimientoDatos.NombreUsuarioAprobacion = data.NombresCompletos;
			        }
			        else if (opc == "TarifaEscalonada") {
			            $rootScope.DatosFormulario.DatosTarifaEscalonada.DatasRegistro.Autorizado = data.NombresCompletos;
			            $rootScope.DatosFormulario.DatosTarifaEscalonada.DatasRegistro.CodigoUsuarioAutorizador = data.NombreUsuario;
			        }
			        else if (opc == "AcuerdoComercialEscalonado") {
			            var d = new Date();
						var month = d.getMonth()+1;
						var day = d.getDate();
						var fechaActual = (day<10 ? '0' : '') + day + '/'+ (month<10 ? '0' : '') + month + '/' + d.getFullYear();
			            $rootScope.DatosFormulario.RegistroACEscalonado.DatosACE.Autorizado = data.NombresCompletos;
			            $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoUsuarioAutorizador = data.NombreUsuario;
			            $rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.FechaAutorizacion = fechaActual;
			        }
			        return true;
			    }
			    $scope.Seleccionar_Click = function () {
			        var rowKey = jQuery("#grillaListaUsuario").jqGrid('getGridParam', 'selrow');
			        if (rowKey != undefined) {
			            if (rowKey.length > 0) {
			                var rowObject = jQuery('#grillaListaUsuario').getRowData(rowKey);
			                var estado = ProcesarSeleccionado(rowObject);
			                $(".caja11.msgerror.Objeto").html("");
			                if (estado) {
			                    $scope.$parent.SalirPopup_Click();
			                }
			            } else {
			                $(".caja11.msgerror.Objeto").html("Seleccione un registro.");
			            }
			        } else {
			            $(".caja11.msgerror.Objeto").html("Seleccione un registro.");

			        }
			    }
			    $scope.Enter = function () {
			        $rootScope.EsEnter = true;
			        return false;
			    }
			    $("input").focusout(function () {
			        $rootScope.EsEnter = false;
			    });
			}]);
})();