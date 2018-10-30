(function () {
    angular.module('api')
        .controller('RegistroDocumentoDetalleClienteController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {

                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = new Object();
                        if ($rootScope.DatosFormulario.RegistroDocumento == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento = new Object();
                        if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCliente == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente = new Object();
                        if ($rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento == undefined)
                            $rootScope.DatosFormulario.RegistroDocumento.DatosRegistroDocumento = new Object();

                        $rootScope.FlagMostrarBotonSeleccionar = true;
                        $scope.Limpiar_Click();
                        CargarDatosIniciales();

                        if ($rootScope.DatosFormulario.OpcionCliente == 'EditarCliente') {
                            if ($scope.row != undefined) {
                                $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol = $scope.row.CodigoRol;
                                $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.NombreRol = $scope.row.NombreRol;
                                $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoPersona = $scope.row.CodigoPersona;
                                $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona = $scope.row.RazonSocialPersona;
                            }
                        }

                    });

                    function CargarDatosIniciales() {
                        $.ajax({
                            url: "/DocumentoDetalleCliente/ClienteIndex",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data != null) {
                                    $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.Roles = data.Roles;
                                    $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol = data.Roles[0].CodigoRol;
                                    $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.NombreRol = data.Roles[0].NombreRol;
                                }
                            }
                        });
                    }

                    $scope.GrillaDblClick = function (obj, idgrilla, rowid, iRow, iCol, e) {
                        var data = jQuery("#" + obj.id).jqGrid('getRowData', rowid);
                        var estado = ProcesarSeleccionado(data);
                        if (estado) {
                            $rootScope.$apply();
                            $scope.$parent.SalirPopup_Click();
                        }
                    }

                    function validarDatos() {
                        var salida = true;

                        if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona == undefined) {
                            $(".caja11.msgerror.RazonSocialPersona").html("Razon Social es requerido.");
                            salida = false;
                        }
                        else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona.length <= 0) {
                            $(".caja11.msgerror.RazonSocialPersona").html("Razon Social es requerido.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.RazonSocialPersona").html("");
                        }

                        if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol == undefined) {
                            $(".caja11.msgerror.CodigoRol").html("Rol es requerido.");
                            salida = false;
                        }
                        else if ($rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol.length <= 0) {
                            $(".caja11.msgerror.CodigoRol").html("Rol es requerido.");
                            salida = false;
                        }
                        else {
                            $(".caja11.msgerror.CodigoRol").html("");
                        }

                        return salida;
                    }

                    $scope.Guardar_Click = function () {

                        if ($rootScope.EsEnter) {
                            return false;
                        }

                        var validar = validarDatos();
                        if (validar) {
                            registrarDocumentoCliente();
                        }
                    }

                    function registrarDocumentoCliente() {
                        //nuevoId = Helpers.GenerarId($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente, "IdCliente");
                        //obj.IdCliente = nuevoId;
                        var obj = new Object();
                        obj.CodigoDocumentoDetalleCliente = null;
                        obj.CodigoDocumento = $rootScope.DatosFormulario.CodigoDocumento;
                        obj.CodigoRol = $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol;
                        var LstRol = $.grep($rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.Roles, function (e) {
                            return e.CodigoRol == obj.CodigoRol;
                        });

                        obj.NombreRol = LstRol[0].NombreRol;
                        obj.CodigoPersona = $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoPersona;
                        obj.RazonSocialPersona = $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona;

                        if ($rootScope.DatosFormulario.OpcionCliente == 'EditarCliente') {
                            if ($scope.row.CodigoDocumentoDetalleCliente == undefined || $scope.row.CodigoDocumentoDetalleCliente == null) {
                                obj.Accion = "I";
                            } else {
                                obj.Accion = "U";
                                obj.CodigoDocumentoDetalleCliente = $scope.row.CodigoDocumentoDetalleCliente;
                            }
                            obj.IdCliente = $scope.row.IdCliente;
                        } else {
                            obj.Accion = "I";
                            obj.IdCliente = Helpers.GenerarId($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente, "IdCliente");
                            //$rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente.length + 1;
                        }
                        //Valida si existe el registro -------------------
                        var ExisteCliente = $.grep($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente, function (e) {
                            return e.CodigoRol == obj.CodigoRol && obj.CodigoDocumentoDetalleCliente != e.CodigoDocumentoDetalleCliente;
                        });
                        if (ExisteCliente.length > 0) {
                            $(".caja11.msgerror.Objeto").html("Rol seleccionado ya existe.");
                            return false;
                        }
                        else {
                            $(".caja11.msgerror.Objeto").html("");
                        }
                        //--------------------------------------------

                        if ($rootScope.DatosFormulario.OpcionCliente == 'EditarCliente') {
                            $.each($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente, function (x) {
                                if (this.IdCliente == obj.IdCliente) {
                                    this.Accion = obj.Accion;
                                    this.CodigoDocumentoDetalleCliente = obj.CodigoDocumentoDetalleCliente;
                                    this.CodigoDocumento = obj.CodigoDocumento;
                                    this.CodigoRol = obj.CodigoRol;
                                    this.NombreRol = obj.NombreRol;
                                    this.CodigoPersona = obj.CodigoPersona;
                                    this.RazonSocialPersona = obj.RazonSocialPersona;
                                    return false;
                                }
                            });

                        } else {
                            $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente.push(obj);
                        }
                        $rootScope.DatosFormulario.RegistroDocumento.grillaListaDatosClienteMemoria = $rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente;
                        $scope.gridapigrillaListaDatosCliente.refresh($rootScope.DatosFormulario.RegistroDocumento.ListaDatosCliente);
                        $scope.$parent.SalirPopup_Click();
                    }

                    $scope.Limpiar_Click = function () {
                        $(".caja11.msgerror.Objeto").html("");
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol = null;
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.NombreRol = null;
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoPersona = null;
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona = null;
                    }
                    $scope.Salir_Click = function () {
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoRol = null;
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.NombreRol = null;
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoPersona = null;
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona = null;
                        $scope.$parent.SalirPopup_Click();
                    }

                    $scope.LimpiarNombreRol = function () {
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.CodigoPersona = null;
                        $rootScope.DatosFormulario.RegistroDocumento.RegistroCliente.RazonSocialPersona = null;
                    }

                    $scope.BuscarClienteRegistro_Click = function () {
                        $rootScope.DatosFormulario.OpcionClienteRol = "RegistrarClienteRol";
                        getPopupResponsive({
                            formURL: "PersonaxRol/BuscarPersonaxRol",
                            title: "Buscar Cliente",
                            nombreDiv: "divPopupBuscarPersonaxRol",
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
                                $compile($("#divPopupBuscarPersonaxRol"))($scope);
                            }
                        });
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