(function () {
    var app = angular.module('api', ['ngIdle', 'ngRoute']);
    //app.config(['$routeProvider', '$locationProvider', function (IdleProvider, KeepaliveProvider,$routeProvider, $locationProvider) { 

    app.config(function (IdleProvider, KeepaliveProvider, $routeProvider, $locationProvider) {
        // IdleProvider.idle(59 * 60); // in seconds 
        // IdleProvider.timeout(5); // in seconds 
        // KeepaliveProvider.interval(2); // in seconds


        $locationProvider.hashPrefix('!');

        $routeProvider.when("/", {
            templateUrl: "SeguridadAgma/Seguridad",
            controller: 'PageHomeController'
        }).when("/sistema/bienvenido/", {
            templateUrl: "bienvenido",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/pagina/no_encontrado", {
            templateUrl: "Error",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/busqueda/buscar-tarifa-local", {
            templateUrl: "TarifaPlana/BuscarTarifaLocal",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/registro-de-tarifa-local/", {
            templateUrl: "TarifaPlana/RegistrarTarifaLocal",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/busqueda/buscar-tarifa-escalonada", {
            templateUrl: "TarifaEscalonada/BuscarTarifaEscalonada",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/registro-de-tarifa-escalonada", {
            templateUrl: "TarifaEscalonada/RegistrarTarifaEscalonada",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/busqueda/buscar-aclocal", {
            templateUrl: "AcuerdoComercialLocal/BuscarAcuerdoLocal",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/registro-de-acuerdo-comercial-local/", {
            templateUrl: "AcuerdoComercialLocal/RegistrarAcuerdoLocal",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/seguimiento/seguimiento-ac-local", {
            templateUrl: "AcuerdoComercialLocal/SeguimientoAcuerdoLocal",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/busqueda/buscar-acescalonado", {
            templateUrl: "AcuerdoComercialEscalonado/BuscarAcuerdoEscalonado",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/registro-de-acuerdo-comercial-escalonado", {
            templateUrl: "AcuerdoComercialEscalonado/RegistrarAcuerdoEscalonado",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/registro-persona", {
            templateUrl: "Persona/RegistrarPersona",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/busqueda/buscar-persona", {
            templateUrl: "Persona/BuscarPersona",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/registro-documento", {
            templateUrl: "Documento/RegistrarDocumento",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'

            //Carga
        }).when("/sistema/documento/registro-carga", {
            templateUrl: "/DocumentoDetalleCarga/RegistrarCarga",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
            //Cliente
        }).when("/sistema/documento/registro-cliente", {
            templateUrl: "/DocumentoDetalleCliente/RegistrarCliente",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
            //Flete
        }).when("/sistema/documento/registro-flete", {
            templateUrl: "/DocumentoDetalleFlete/RegistrarFlete",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'

        }).when("/sistema/busqueda/buscar-documento", {
            templateUrl: "Documento/BuscarDocumento",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'

        }).when("/sistema/transmision/naves", {
            templateUrl: "TransmisionNave/AdministrarTransmisionNave",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'

        }).when("/sistema/transmision/documentos", {
            templateUrl: "TransmisionDocumento/AdministrarTransmisionDocumento",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'

        }).when("/sistema/seguimiento/seguimiento-ac-escalonado", {
            templateUrl: "AcuerdoComercialEscalonado/SeguimientoAcuerdoEscalonado",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/carga-masiva", {
            templateUrl: "CargaMasiva/CargaMasivaSobreestadia",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/notificar-contenedores", {
            templateUrl: "NotificacionContenedor/NotificarContenedores",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/reporte/tarifa-local/", {
            templateUrl: "ReporteTarifaLocal/TarifaLocal/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/reporte/tarifa-escalonada/", {
            templateUrl: "ReporteTarifaEscalonada/TarifaEscalonada/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/reporte/acuerdo-comercial-local/", {
            templateUrl: "ReporteACLocal/AcuerdoComercialLocal/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/reporte/contenedor-no-devuelto/", {
            templateUrl: "ReporteContenedorNoDevuelto/ContenedorNoDevuelto/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/reporte/acuerdo-comercial-escalonado/", {
            templateUrl: "ReporteACEscalonado/AcuerdoComercialEscalonado/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipo-contenedor-externo/", {
            templateUrl: "TipoContenedorExterno/AdministrarTipoContenedorExterno/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/grupo-puerto-externo/", {
            templateUrl: "GrupoPuertoExterno/AdministrarGrupoPuertoExterno/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/peso-variable/", {
            templateUrl: "PesoVariable/AdministrarPesoVariable/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/partida-arancelaria/", {
            templateUrl: "PartidaArancelaria/AdministrarPartidaArancelaria/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/pais/", {
            templateUrl: "Pais/AdministrarPais/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/itinerario/", {
            templateUrl: "Itinerario/AdministrarItinerario/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/contenedor/", {
            templateUrl: "Contenedor/AdministrarContenedor/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/numeroimo/", {
            templateUrl: "NumeroIMO/AdministrarNumeroIMO/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/claseimo/", {
            templateUrl: "ClaseIMO/AdministrarClaseIMO/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/naturalezacarga/", {
            templateUrl: "NaturalezaCarga/AdministrarNaturalezaCarga/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/condicioncarga/", {
            templateUrl: "CondicionCarga/AdministrarCondicionCarga/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/unidadmercancia/", {
            templateUrl: "UnidadMercancia/AdministrarUnidadMercancia/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipomovimiento/", {
            templateUrl: "TipoMovimiento/AdministrarTipoMovimiento/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/condiciontransporte/", {
            templateUrl: "CondicionTransporte/AdministrarCondicionTransporte/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/temperatura/", {
            templateUrl: "Temperatura/AdministrarTemperatura/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipocontenedor/", {
            templateUrl: "TipoContenedor/AdministrarTipoContenedor/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipobl/", {
            templateUrl: "TipoBL/AdministrarTipoBL/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/requerimientoservicio/", {
            templateUrl: "RequerimientoServicio/AdministrarRequerimientoServicio/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/condicioncontrato/", {
            templateUrl: "CondicionContrato/AdministrarCondicionContrato/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipoenvio/", {
            templateUrl: "TipoEnvio/AdministrarTipoEnvio/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/precinto/", {
            templateUrl: "Precinto/AdministrarPrecinto/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/entidadprecinto/", {
            templateUrl: "EntidadPrecinto/AdministrarEntidadPrecinto/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/condicionprecinto/", {
            templateUrl: "CondicionPrecinto/AdministrarCondicionPrecinto/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/rol/", {
            templateUrl: "Rol/AdministrarRol/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipooperacion/", {
            templateUrl: "TipoOperacion/AdministrarTipoOperacion/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/lineanaviera/", {
            templateUrl: "LineaNaviera/AdministrarLineaNaviera/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/mediotransporte/", {
            templateUrl: "MedioTransporte/AdministrarMedioTransporte/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipolugarcarga/", {
            templateUrl: "TipoLugarCarga/AdministrarTipoLugarCarga/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tiponave/", {
            templateUrl: "TipoNave/AdministrarTipoNave/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/nave/", {
            templateUrl: "Nave/AdministrarNave/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/modopago/", {
            templateUrl: "ModoPago/AdministrarModoPago/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/moneda/", {
            templateUrl: "Moneda/AdministrarMoneda/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipoflete/", {
            templateUrl: "TipoFlete/AdministrarTipoFlete/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/tipodocumento/", {
            templateUrl: "TipoDocumento/AdministrarTipoDocumento/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/puerto/", {
            templateUrl: "Puerto/AdministrarPuerto/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/via-transporte/", {
            templateUrl: "ViaTransporte/AdministrarViaTransporte/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/aduana/", {
            templateUrl: "Aduana/AdministrarAduana/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/configuracion-linea/", {
            templateUrl: "ConfiguracionLinea/AdministrarConfiguracionLinea/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/configuracion-linea/registro-configuracion-linea/", {
            templateUrl: "ConfiguracionLinea/RegistroConfiguracionLinea/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/maestros/deposito-default/consulta-deposito-default/", {
            templateUrl: "DepositoDefault/ConsultaDepositoDefault/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/notificacion/registro-notificacion/", {
            templateUrl: "Notificacion/RegistroNotificacion/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/notificacion/consulta-notificacion-integracion/", {
            templateUrl: "Notificacion/ConsultaNotificacionIntegracion/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/monitorcoparn/consulta-monitor-coparn/", {
            templateUrl: "MonitorCoparn/MonitorCoparn/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).when("/sistema/cuentas/cambiar-contrasena/", {
            templateUrl: "SeguridadAgma/CambiarContrasena/",
            controller: 'FormularioBaseController',
            controllerAs: 'currentController'
        }).otherwise({
            redirectTo: '/pagina/no_encontrado'
        });




    });
    app.run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default. 
        // Idle.watch();
    });
})();

