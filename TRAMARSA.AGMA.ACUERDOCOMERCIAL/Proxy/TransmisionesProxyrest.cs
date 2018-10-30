using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Comun.Controladoras.Proxys;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using System.Configuration;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.DTO.AcuerdosComerciales;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ConfiguracionLinea.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ConfiguracionLinea.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Puerto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ViaTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ViaTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Aduana;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Aduana;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoDocumento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoDocumento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoFlete;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoFlete;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Moneda;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Moneda;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ModoPago;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ModoPago;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoNave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoNave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoLugarCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoLugarCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.MedioTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.MedioTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.LineaNaviera;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.LineaNaviera;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Nave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Nave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Rol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Rol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoOperacion;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoOperacion;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.EntidadPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.EntidadPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Precinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Precinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoEnvio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoEnvio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionContrato;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionContrato;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.RequerimientoServicio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.RequerimientoServicio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoBL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoBL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoContenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoContenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Temperatura;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Temperatura;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoMovimiento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoMovimiento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.UnidadMercancia;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.UnidadMercancia;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.NaturalezaCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.NaturalezaCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ClaseIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ClaseIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.NumeroIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.NumeroIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Contenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Contenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Itinerario;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Itinerario;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.PersonaxRol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.PersonaxRol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TiposBL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoTransmision;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy
{
    public class TransmisionesProxyrest : ProxyBaseRest
    {
        public Result LimpiarCache()
        {
            var url = ConfigurationManager.AppSettings["UrlLimpiarDatosCache"];
            var response = DeserializarJSON<string, Result>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseBusquedaTarifa ListarTarifa(RequestConsultaTarifa request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarTarifa"];

            var response = DeserializarJSON<RequestConsultaTarifa, ResponseBusquedaTarifa>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseBusquedaCliente ListarCliente(RequestConsultaCliente request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarCliente"];

            var response = DeserializarJSON<RequestConsultaCliente, ResponseBusquedaCliente>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseListarGrupoPuertoExterno ListarGrupoPuertoExterno(RequestListarGrupoPuertoExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarGrupoPuertoExterno"];

            var response = DeserializarJSON<RequestListarGrupoPuertoExterno, ResponseListarGrupoPuertoExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ResponseBusquedaNave ListarNave(TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.RequestConsultaNave request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarNave"];

            var response = DeserializarJSON<TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.RequestConsultaNave, TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ResponseBusquedaNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarSucursal ListarSucursal()
        {
            var url = ConfigurationManager.AppSettings["UrlListarSucursalAC"];

            var response = DeserializarJSON<string, ResponseListarSucursal>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarRol ListarRol()
        {
            var url = ConfigurationManager.AppSettings["UrlListarRoles"];

            var response = DeserializarJSON<string, ResponseListarRol>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTiposBL ListarTiposBL()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTiposBL"];

            var response = DeserializarJSON<string, ResponseListarTiposBL>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTemperaturas ListarTemperaturas()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTemperaturas"];

            var response = DeserializarJSON<string, ResponseListarTemperaturas>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarCondicionesTransporte ListarCondicionesTransporte()
        {
            var url = ConfigurationManager.AppSettings["UrlListarCondicionesTransporte"];

            var response = DeserializarJSON<string, ResponseListarCondicionesTransporte>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarCondicionesCarga ListarCondicionesCarga()
        {
            var url = ConfigurationManager.AppSettings["UrlListarCondicionesCarga"];

            var response = DeserializarJSON<string, ResponseListarCondicionesCarga>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarModosPago ListarModosPago()
        {
            var url = ConfigurationManager.AppSettings["UrlListarModosPago"];

            var response = DeserializarJSON<string, ResponseListarModosPago>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTiposTransmisionNave ListarTiposTransmisionNave()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTiposTransmisionNave"];

            var response = DeserializarJSON<string, ResponseListarTiposTransmisionNave>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTiposTransmisionDocumento ListarTiposTransmisionDocumento()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTiposTransmisionDocumento"];

            var response = DeserializarJSON<string, ResponseListarTiposTransmisionDocumento>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarCondicionesContrato ListarCondicionesContrato()
        {
            var url = ConfigurationManager.AppSettings["UrlListarCondicionesContrato"];

            var response = DeserializarJSON<string, ResponseListarCondicionesContrato>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTiposOperacion ListarTiposOperacion()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTiposOperacion"];

            var response = DeserializarJSON<string, ResponseListarTiposOperacion>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTiposEnvio ListarTiposEnvio()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTiposEnvio"];

            var response = DeserializarJSON<string, ResponseListarTiposEnvio>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTerminalPortuario ListarTerminalPortuario()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTerminalPortuario"];

            var response = DeserializarJSON<string, ResponseListarTerminalPortuario>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarLinea ListarLinea()
        {
            var url = ConfigurationManager.AppSettings["UrlListarLinea"];

            var response = DeserializarJSON<string, ResponseListarLinea>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarRolCiente ListarRolCliente(RequestConsultaRolCliente request)
        {
            var url = ConfigurationManager.AppSettings["UrlListaRolCliente"];

            var response = DeserializarJSON<RequestConsultaRolCliente, ResponseListarRolCiente>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarMoneda ListarMoneda()
        {
            var url = ConfigurationManager.AppSettings["UrlListarMoneda"];

            var response = DeserializarJSON<string, ResponseListarMoneda>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseListarParametrosNegocios ListarParametroNegocio()
        {
            var url = ConfigurationManager.AppSettings["UrlConsultaParametroNegocio"];

            var response = DeserializarJSON<string, ResponseListarParametrosNegocios>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseBusquedaDistribucionTarifa ListarDistribucionTarifa(RequestBusquedaDistribucionTarifa request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDistribucionTarifa"];

            var response =
                DeserializarJSON<RequestBusquedaDistribucionTarifa, ResponseBusquedaDistribucionTarifa>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseListaDetalleCatalogo ListarDetalleCatalogo(RequestConsultaDetalleCatalago request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDetalleCatalogo"];

            var response = DeserializarJSON<RequestConsultaDetalleCatalago, ResponseListaDetalleCatalogo>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarPuerto ListarGrupoPuerto(RequestConsultaGrupoPuerto request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarGrupoPuerto"];

            var response = DeserializarJSON<RequestConsultaGrupoPuerto, ResponseListarPuerto>(request, url);

            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseBusquedaTarifaLocal BusquedaTarifaLocal(RequestBusquedaTarifaLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarTarifaLocal"];

            var response = DeserializarJSON<RequestBusquedaTarifaLocal, ResponseBusquedaTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseRegistrarTarifaLocal RegistroTarifaLocal(RequestRegistrarTarifaLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTarifaLocal"];

            var response = DeserializarJSON<RequestRegistrarTarifaLocal, ResponseRegistrarTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseRegistrarTarifaEscalonada RegistroTarifaEscalonada(RequestRegistrarTarifaEscalonada request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTarifaEscalonada"];

            var response = DeserializarJSON<RequestRegistrarTarifaEscalonada, ResponseRegistrarTarifaEscalonada>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseRegistrarTarifaLocal RegistroAcuerdoComercial(ActualizaAcuerdoComercialLocalRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarAcuerdoComercial"];

            var response = DeserializarJSON<ActualizaAcuerdoComercialLocalRequestDTO, ResponseRegistrarTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseNotificarContenedor NotificarContenedor(string request)
        {
            var url = ConfigurationManager.AppSettings["UrlNotificarContenedor"];

            var response = DeserializarJSON<string, ResponseNotificarContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseConsultarDetalleTarifaLocal ConsultarDetalleTarifaLocal(RequestConsultaDetalleTarifaLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDetalleTarifaLocal"];

            var response = DeserializarJSON<RequestConsultaDetalleTarifaLocal, ResponseConsultarDetalleTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseConsultarDetalleAcuerdoComercialLocal ConsultarDetalleAcuerdoComercial(RequestConsultaDetalleAcuerdoComercialLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDetalleAcuerdoComercial"];

            var response = DeserializarJSON<RequestConsultaDetalleAcuerdoComercialLocal, ResponseConsultarDetalleAcuerdoComercialLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseBusquedaTarifaEscalonada BusquedaTarifaEscalonada(RequestBusquedaTarifaEscalonada request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarTarifaEscalonada"];

            var response = DeserializarJSON<RequestBusquedaTarifaEscalonada, ResponseBusquedaTarifaEscalonada>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseConsultaDetalleTarifaEscalonada ConsultarDetalleTarifaEscalonada(RequestConsultaDetalleTarifaEscalonada request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDetalleTarifaEscalonada"];

            var response = DeserializarJSON<RequestConsultaDetalleTarifaEscalonada, ResponseConsultaDetalleTarifaEscalonada>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseConsultaHistorialTarifaLocal ConsultarHistorialTarifaLocal(RequestConsultaHistorialTarifaLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarHistorialTarifaLocal"];
            var response = DeserializarJSON<RequestConsultaHistorialTarifaLocal, ResponseConsultaHistorialTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseConsultaHistorialTarifaEscalonada ConsultarHistorialTarifaEscalonada(RequestConsultaHistorialTarifaEscalonada request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarHistorialTarifaEscalonada"];
            var response = DeserializarJSON<RequestConsultaHistorialTarifaEscalonada, ResponseConsultaHistorialTarifaEscalonada>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseListarTipoCambio ListarTipoCambio(RequestBusquedaTipoCambio request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoCambio"];

            var response = DeserializarJSON<RequestBusquedaTipoCambio, ResponseListarTipoCambio>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseActualizarTarifaLocal ActualizarTarifaLocal(RequestActualizarTarifaLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarTarifaLocal"];
            var response = DeserializarJSON<RequestActualizarTarifaLocal, ResponseActualizarTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaACLocal BusquedaACLocal(RequestBusquedaACLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarAcuerdoComercialLocal"];

            var response = DeserializarJSON<RequestBusquedaACLocal, ResponseBusquedaACLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseBusquedaDocumentoOrigen BusquedaDocumentoOrigen(RequestBusquedaDocumentoOrigen request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDocumentoOrigen"];

            var response = DeserializarJSON<RequestBusquedaDocumentoOrigen, ResponseBusquedaDocumentoOrigen>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseBusquedaServicioBl BusquedaServiciosBl(RequestConsultaServicioBL request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarServiciosBl"];

            var response = DeserializarJSON<RequestConsultaServicioBL, ResponseBusquedaServicioBl>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListarTipoContenedor ListarTipoContenedor()
        {
            var url = ConfigurationManager.AppSettings["UrlListarTipoContenedor"];

            var response = DeserializarJSON<string, ResponseListarTipoContenedor>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseListarClaseContenedor ListarClaseContenedor()
        {
            var url = ConfigurationManager.AppSettings["UrlListarClaseContenedor"];

            var response = DeserializarJSON<string, ResponseListarClaseContenedor>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }


        public ResponseConsultaHistorialACLocal ConsultarHistorialACLocal(RequestConsultaHistorialACLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarHistorialACLocal"];
            var response = DeserializarJSON<RequestConsultaHistorialACLocal, ResponseConsultaHistorialACLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseSeguimientoACLocal SeguimientoAcLocal(RequestSeguimientoACLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlSeguimientoAcuerdoComercialLocal"];

            var response = DeserializarJSON<RequestSeguimientoACLocal, ResponseSeguimientoACLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseSeguimientoACEscalonado SeguimientoAcEscalonado(RequestSeguimientoACEscalonado request)
        {
            var url = ConfigurationManager.AppSettings["UrlSeguimientoAcuerdoComercialEscalonado"];

            var response = DeserializarJSON<RequestSeguimientoACEscalonado, ResponseSeguimientoACEscalonado>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseBusquedaACEscalonado BusquedaAcEscalonado(RequestBusquedaACEscalonado request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarAcuerdoComercialEscalonado"];

            var response = DeserializarJSON<RequestBusquedaACEscalonado, ResponseBusquedaACEscalonado>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseRegistrarAcuerdoComercialEscalonado RegistroAcuerdoComercialEscalonado(ActualizarAcuerdoComercialEscalonadoDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarAcuerdoComercialEscalonado"];

            var response = DeserializarJSON<ActualizarAcuerdoComercialEscalonadoDTO, ResponseRegistrarAcuerdoComercialEscalonado>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseConsultarDetalleAcuerdoComercialEscalonado ConsultarDetalleAcuerdoComercialEscalonado(RequestConsultaDetalleAcuerdoComercialEscalonado request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDetalleAcuerdoComercialEscalonado"];

            var response = DeserializarJSON<RequestConsultaDetalleAcuerdoComercialEscalonado, ResponseConsultarDetalleAcuerdoComercialEscalonado>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseConsultaHistorialACEscalonado ConsultarHistorialACEscalonado(RequestConsultaHistorialACEscalonado request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarHistorialACEscalonado"];
            var response = DeserializarJSON<RequestConsultaHistorialACEscalonado, ResponseConsultaHistorialACEscalonado>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTarifaEscalonada ActualizarTarifaEscalonada(RequestActualizarTarifaEscalonada request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarTarifaEscalonada"];
            var response = DeserializarJSON<RequestActualizarTarifaEscalonada, ResponseRegistrarTarifaEscalonada>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseCargaMasiva CargaMasiva(IngresoMasivoRAPTDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlCargaMasiva"];

            var response = DeserializarJSON<IngresoMasivoRAPTDTO, ResponseCargaMasiva>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseReporteACLocal ReporteACLocal(RequestReporteACLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlReporteAcuerdoComercialLocal"];

            var response = DeserializarJSON<RequestReporteACLocal, ResponseReporteACLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseReporteTarifaEscalonada ReporteTarifaEscalonada(RequestReporteTarifaEscalonada request)
        {
            var url = ConfigurationManager.AppSettings["UrlReporteTarifaEscalonada"];

            var response = DeserializarJSON<RequestReporteTarifaEscalonada, ResponseReporteTarifaEscalonada>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseReporteTarifaLocal ReporteTarifaLocal(RequestReporteTarifaLocal request)
        {
            var url = ConfigurationManager.AppSettings["UrlReporteTarifaLocal"];

            var response = DeserializarJSON<RequestReporteTarifaLocal, ResponseReporteTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseReporteContenedorNoDevuelto ConsultarReporteContenedorNoDevuelto(RequestReporteContenedorNoDevuelto request)
        {
            var url = ConfigurationManager.AppSettings["UrlReporteContenedorNoDevuelto"];

            var response = DeserializarJSON<RequestReporteContenedorNoDevuelto, ResponseReporteContenedorNoDevuelto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseEliminarTipoContenedor EliminarTipoContenedor(RequestEliminarTipoContenedor request)
        {
            var url = ConfigurationManager.AppSettings["UrlDeleteTipoContenedor"];
            var response = DeserializarJSON<RequestEliminarTipoContenedor, ResponseEliminarTipoContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseCambiarClaveUsuario CambiarClaveUsuario(RequestCambiarClaveUsuario request)
        {
            var url = ConfigurationManager.AppSettings["UrlCambiarClaveUsuario"];
            var response = DeserializarJSON<RequestCambiarClaveUsuario, ResponseCambiarClaveUsuario>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseGenerarClaveUsuario GenerarClaveUsuario(RequestGenerarClaveUsuario request)
        {
            var url = ConfigurationManager.AppSettings["UrlGenerarClaveUsuario"];
            var response = DeserializarJSON<RequestGenerarClaveUsuario, ResponseGenerarClaveUsuario>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseActualizarTipoContenedor ActualizarTipoContenedor(RequestActualizarTipoContenedor request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarTipoContenedor"];
            var response = DeserializarJSON<RequestActualizarTipoContenedor, ResponseActualizarTipoContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.ResponseRegistrarTipoContenedor RegistrarTipoContenedor(TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.RequestRegistrarTipoContenedor request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoContenedor"];
            var response = DeserializarJSON<TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.RequestRegistrarTipoContenedor, TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.ResponseRegistrarTipoContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseAgregarGrupoPuertoExterno AgregarGrupoPuertoExterno(RequestAgregarGrupoPuertoExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlAgregarGrupoPuertoExterno"];
            var response = DeserializarJSON<RequestAgregarGrupoPuertoExterno, ResponseAgregarGrupoPuertoExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseActualizarGrupoPuertoExterno ActualizarGrupoPuertoExterno(RequestActualizarGrupoPuertoExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarGrupoPuertoExterno"];
            var response = DeserializarJSON<RequestActualizarGrupoPuertoExterno, ResponseActualizarGrupoPuertoExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseEliminarGrupoPuertoExterno EliminarGrupoPuertoExterno(RequestEliminarGrupoPuertoExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlEliminarGrupoPuertoExterno"];
            var response = DeserializarJSON<RequestEliminarGrupoPuertoExterno, ResponseEliminarGrupoPuertoExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseConsultarPesoVariable ConsultarPesoVariable(RequestConsultarPesoVariable request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarPesoVariable"];

            var response = DeserializarJSON<RequestConsultarPesoVariable, ResponseConsultarPesoVariable>(request, url);

            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseRegistrarPesoVariable RegistrarPesoVariable(RequestRegistrarPesoVariable request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarPesoVariable"];
            var response = DeserializarJSON<RequestRegistrarPesoVariable, ResponseRegistrarPesoVariable>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseActualizarPesoVariable ActualizarPesoVariable(RequestActualizarPesoVariable request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarPesoVariable"];
            var response = DeserializarJSON<RequestActualizarPesoVariable, ResponseActualizarPesoVariable>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseEliminarPesoVariable EliminarPesoVariable(RequestEliminarPesoVariable request)
        {
            var url = ConfigurationManager.AppSettings["UrlEliminarPesoVariable"];
            var response = DeserializarJSON<RequestEliminarPesoVariable, ResponseEliminarPesoVariable>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseConsultarTipoContenedorExterno ConsultarTipoContenedorExterno(RequestConsultarTipoContenedorExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoContenedorExterno"];

            var response = DeserializarJSON<RequestConsultarTipoContenedorExterno, ResponseConsultarTipoContenedorExterno>(request, url);

            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseRegistrarTipoContenedorExterno RegistrarTipoContenedorExterno(RequesRegistrarTipoContenedorExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoContenedorExterno"];
            var response = DeserializarJSON<RequesRegistrarTipoContenedorExterno, ResponseRegistrarTipoContenedorExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseActualizarTipoContenedorExterno ActualizarTipoContenedorExterno(RequestActualizarTipoContenedorExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarTipoContenedorExterno"];
            var response = DeserializarJSON<RequestActualizarTipoContenedorExterno, ResponseActualizarTipoContenedorExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseEliminarTipoContenedorExterno EliminarTipoContenedorExterno(RequestEliminarTipoContenedorExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlEliminarTipoContenedorExterno"];
            var response = DeserializarJSON<RequestEliminarTipoContenedorExterno, ResponseEliminarTipoContenedorExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseConsultarDetalleGrupoPuertoExterno ConsultarDetalleGrupoPuertoExterno(RequestConsultarDetalleGrupoPuertoExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDetalleGrupoPuertoExterno"];

            var response = DeserializarJSON<RequestConsultarDetalleGrupoPuertoExterno, ResponseConsultarDetalleGrupoPuertoExterno>(request, url);

            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseModificarDetalleGrupoPuertoExterno ModificarDetalleGrupoPuertoExterno(RequestModificarDetalleGrupoPuertoExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlModificarDetalleGrupoPuertoExterno"];
            var response = DeserializarJSON<RequestModificarDetalleGrupoPuertoExterno, ResponseModificarDetalleGrupoPuertoExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseConsultarDetalleTipoContenedorExterno ConsultarDetalleTipoContenedorExterno(RequestConsultarDetalleTipoContenedorExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDetalleTipoContenedorExterno"];

            var response = DeserializarJSON<RequestConsultarDetalleTipoContenedorExterno, ResponseConsultarDetalleTipoContenedorExterno>(request, url);

            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseModificarDetalleTipoContenedorExterno ModificarDetalleTipoContenedorExterno(RequestModificarDetalleTipoContenedorExterno request)
        {
            var url = ConfigurationManager.AppSettings["UrlModificarDetalleTipoContenedorExterno"];
            var response = DeserializarJSON<RequestModificarDetalleTipoContenedorExterno, ResponseModificarDetalleTipoContenedorExterno>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseListarTipoContenedor ConsultarTipoContenedorMaestro()
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoContenedorMaestro"];

            var response = DeserializarJSON<string, ResponseListarTipoContenedor>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseAcuerdoComercialEscalonadoTarifa ConsultarAcuerdoComercialEscalonadoTarifaBase(RequestAcuerdoComercialEscalonadoTarifa request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarAcuerdoComercialEscalonadoTarifaBase"];
            var response = DeserializarJSON<RequestAcuerdoComercialEscalonadoTarifa, ResponseAcuerdoComercialEscalonadoTarifa>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseConsultaLigadaPeriodoTarifaEscalonada ConsultarLigadasPeriodosTarifaEscalonada(RequestConsultaTarifaEscalonadaLigadaXVigenciaLigada request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarLigadasPeriodosTarifaEscalonada"];
            var response = DeserializarJSON<RequestConsultaTarifaEscalonadaLigadaXVigenciaLigada, ResponseConsultaLigadaPeriodoTarifaEscalonada>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseConsultaLigadasTarifaLocal ConsultaTarifaLigadaXVigencia(RequestConsultaTarifaLocalLigadaXVigencia request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultaTarifaLigadaXVigencia"];
            var response = DeserializarJSON<RequestConsultaTarifaLocalLigadaXVigencia, ResponseConsultaLigadasTarifaLocal>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaClienteMatchCode ListarClienteMatchCode(RequestConsultaClienteMatchCode request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarClienteMatchCode"];

            var response = DeserializarJSON<RequestConsultaClienteMatchCode, ResponseBusquedaClienteMatchCode>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseBusquedaPartidaArancelaria ConsultaPartidaArancelaria(RequestConsultaPartidaArancelaria request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultaPartidaArancelaria"];

            var response =
                DeserializarJSON<RequestConsultaPartidaArancelaria, ResponseBusquedaPartidaArancelaria>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarPais RegistrarPais(RequestRegistrarPais request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarPais"];
            var response = DeserializarJSON<RequestRegistrarPais, ResponseRegistrarPais>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaPais ConsultarPais(RequestConsultaPais request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarPais"];

            var response = DeserializarJSON<RequestConsultaPais, ResponseBusquedaPais>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaPersonaxRol ConsultarPersonaxRol(RequestConsultaPersonaxRol request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarPersonaxRol"];

            var response = DeserializarJSON<RequestConsultaPersonaxRol, ResponseBusquedaPersonaxRol>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarItinerario RegistrarItinerario(RequestRegistrarItinerario request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarItinerario"];
            var response = DeserializarJSON<RequestRegistrarItinerario, ResponseRegistrarItinerario>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaItinerario ConsultarItinerario(RequestConsultaItinerario request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarItinerario"];

            var response = DeserializarJSON<RequestConsultaItinerario, ResponseBusquedaItinerario>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarCondicionCarga RegistrarCondicionCarga(RequestRegistrarCondicionCarga request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarCondicionCarga"];
            var response = DeserializarJSON<RequestRegistrarCondicionCarga, ResponseRegistrarCondicionCarga>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaCondicionCarga ConsultarCondicionCarga(RequestConsultaCondicionCarga request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarCondicionCarga"];

            var response = DeserializarJSON<RequestConsultaCondicionCarga, ResponseBusquedaCondicionCarga>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTemperatura RegistrarTemperatura(RequestRegistrarTemperatura request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTemperatura"];
            var response = DeserializarJSON<RequestRegistrarTemperatura, ResponseRegistrarTemperatura>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTemperatura ConsultarTemperatura(RequestConsultaTemperatura request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTemperatura"];

            var response = DeserializarJSON<RequestConsultaTemperatura, ResponseBusquedaTemperatura>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarNaturalezaCarga RegistrarNaturalezaCarga(RequestRegistrarNaturalezaCarga request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarNaturalezaCarga"];
            var response = DeserializarJSON<RequestRegistrarNaturalezaCarga, ResponseRegistrarNaturalezaCarga>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaNaturalezaCarga ConsultarNaturalezaCarga(RequestConsultaNaturalezaCarga request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarNaturalezaCarga"];

            var response = DeserializarJSON<RequestConsultaNaturalezaCarga, ResponseBusquedaNaturalezaCarga>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarClaseIMO RegistrarClaseIMO(RequestRegistrarClaseIMO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarClaseIMO"];
            var response = DeserializarJSON<RequestRegistrarClaseIMO, ResponseRegistrarClaseIMO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaClaseIMO ConsultarClaseIMO(RequestConsultaClaseIMO request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarClaseIMO"];

            var response = DeserializarJSON<RequestConsultaClaseIMO, ResponseBusquedaClaseIMO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarContenedor RegistrarContenedor(RequestRegistrarContenedor request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarContenedor"];
            var response = DeserializarJSON<RequestRegistrarContenedor, ResponseRegistrarContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaContenedor ConsultarContenedor(RequestConsultaContenedor request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarContenedor"];

            var response = DeserializarJSON<RequestConsultaContenedor, ResponseBusquedaContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarNumeroIMO RegistrarNumeroIMO(RequestRegistrarNumeroIMO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarNumeroIMO"];
            var response = DeserializarJSON<RequestRegistrarNumeroIMO, ResponseRegistrarNumeroIMO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaNumeroIMO ConsultarNumeroIMO(RequestConsultaNumeroIMO request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarNumeroIMO"];

            var response = DeserializarJSON<RequestConsultaNumeroIMO, ResponseBusquedaNumeroIMO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoMovimiento RegistrarTipoMovimiento(RequestRegistrarTipoMovimiento request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoMovimiento"];
            var response = DeserializarJSON<RequestRegistrarTipoMovimiento, ResponseRegistrarTipoMovimiento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoMovimiento ConsultarTipoMovimiento(RequestConsultaTipoMovimiento request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoMovimiento"];

            var response = DeserializarJSON<RequestConsultaTipoMovimiento, ResponseBusquedaTipoMovimiento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarUnidadMercancia RegistrarUnidadMercancia(RequestRegistrarUnidadMercancia request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarUnidadMercancia"];
            var response = DeserializarJSON<RequestRegistrarUnidadMercancia, ResponseRegistrarUnidadMercancia>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaUnidadMercancia ConsultarUnidadMercancia(RequestConsultaUnidadMercancia request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarUnidadMercancia"];

            var response = DeserializarJSON<RequestConsultaUnidadMercancia, ResponseBusquedaUnidadMercancia>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarCondicionTransporte RegistrarCondicionTransporte(RequestRegistrarCondicionTransporte request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarCondicionTransporte"];
            var response = DeserializarJSON<RequestRegistrarCondicionTransporte, ResponseRegistrarCondicionTransporte>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaCondicionTransporte ConsultarCondicionTransporte(RequestConsultaCondicionTransporte request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarCondicionTransporte"];

            var response = DeserializarJSON<RequestConsultaCondicionTransporte, ResponseBusquedaCondicionTransporte>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoContenedor.ResponseRegistrarTipoContenedor RegistrarTipoContenedor(TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoContenedor.RequestRegistrarTipoContenedor request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoContenedor"];
            var response = DeserializarJSON<TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoContenedor.RequestRegistrarTipoContenedor, TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoContenedor.ResponseRegistrarTipoContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoContenedor ConsultarTipoContenedor(RequestConsultaTipoContenedor request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoContenedor"];

            var response = DeserializarJSON<RequestConsultaTipoContenedor, ResponseBusquedaTipoContenedor>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoBL RegistrarTipoBL(RequestRegistrarTipoBL request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoBL"];
            var response = DeserializarJSON<RequestRegistrarTipoBL, ResponseRegistrarTipoBL>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoBL ConsultarTipoBL(RequestConsultaTipoBL request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoBL"];

            var response = DeserializarJSON<RequestConsultaTipoBL, ResponseBusquedaTipoBL>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarRequerimientoServicio RegistrarRequerimientoServicio(RequestRegistrarRequerimientoServicio request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarRequerimientoServicio"];
            var response = DeserializarJSON<RequestRegistrarRequerimientoServicio, ResponseRegistrarRequerimientoServicio>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaRequerimientoServicio ConsultarRequerimientoServicio(RequestConsultaRequerimientoServicio request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarRequerimientoServicio"];

            var response = DeserializarJSON<RequestConsultaRequerimientoServicio, ResponseBusquedaRequerimientoServicio>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarCondicionContrato RegistrarCondicionContrato(RequestRegistrarCondicionContrato request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarCondicionContrato"];
            var response = DeserializarJSON<RequestRegistrarCondicionContrato, ResponseRegistrarCondicionContrato>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaCondicionContrato ConsultarCondicionContrato(RequestConsultaCondicionContrato request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarCondicionContrato"];

            var response = DeserializarJSON<RequestConsultaCondicionContrato, ResponseBusquedaCondicionContrato>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoEnvio RegistrarTipoEnvio(RequestRegistrarTipoEnvio request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoEnvio"];
            var response = DeserializarJSON<RequestRegistrarTipoEnvio, ResponseRegistrarTipoEnvio>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoEnvio ConsultarTipoEnvio(RequestConsultaTipoEnvio request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoEnvio"];

            var response = DeserializarJSON<RequestConsultaTipoEnvio, ResponseBusquedaTipoEnvio>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarRol RegistrarRol(RequestRegistrarRol request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarRol"];
            var response = DeserializarJSON<RequestRegistrarRol, ResponseRegistrarRol>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaRol ConsultarRol(RequestConsultaRol request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarRol"];

            var response = DeserializarJSON<RequestConsultaRol, ResponseBusquedaRol>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarCondicionPrecinto RegistrarCondicionPrecinto(RequestRegistrarCondicionPrecinto request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarCondicionPrecinto"];
            var response = DeserializarJSON<RequestRegistrarCondicionPrecinto, ResponseRegistrarCondicionPrecinto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaCondicionPrecinto ConsultarCondicionPrecinto(RequestConsultaCondicionPrecinto request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarCondicionPrecinto"];

            var response = DeserializarJSON<RequestConsultaCondicionPrecinto, ResponseBusquedaCondicionPrecinto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarEntidadPrecinto RegistrarEntidadPrecinto(RequestRegistrarEntidadPrecinto request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarEntidadPrecinto"];
            var response = DeserializarJSON<RequestRegistrarEntidadPrecinto, ResponseRegistrarEntidadPrecinto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaEntidadPrecinto ConsultarEntidadPrecinto(RequestConsultaEntidadPrecinto request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarEntidadPrecinto"];

            var response = DeserializarJSON<RequestConsultaEntidadPrecinto, ResponseBusquedaEntidadPrecinto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarPrecinto RegistrarPrecinto(RequestRegistrarPrecinto request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarPrecinto"];
            var response = DeserializarJSON<RequestRegistrarPrecinto, ResponseRegistrarPrecinto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaPrecinto ConsultarPrecinto(RequestConsultaPrecinto request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarPrecinto"];

            var response = DeserializarJSON<RequestConsultaPrecinto, ResponseBusquedaPrecinto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoOperacion RegistrarTipoOperacion(RequestRegistrarTipoOperacion request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoOperacion"];
            var response = DeserializarJSON<RequestRegistrarTipoOperacion, ResponseRegistrarTipoOperacion>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoOperacion ConsultarTipoOperacion(RequestConsultaTipoOperacion request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoOperacion"];

            var response = DeserializarJSON<RequestConsultaTipoOperacion, ResponseBusquedaTipoOperacion>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarNave RegistrarNave(RequestRegistrarNave request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarNave"];
            var response = DeserializarJSON<RequestRegistrarNave, ResponseRegistrarNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }


        public TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Nave.ResponseBusquedaNave ConsultarNave(TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Nave.RequestConsultaNave request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarNave"];

            var response = DeserializarJSON<TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Nave.RequestConsultaNave, TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Nave.ResponseBusquedaNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarLineaNaviera RegistrarLineaNaviera(RequestRegistrarLineaNaviera request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarLineaNaviera"];
            var response = DeserializarJSON<RequestRegistrarLineaNaviera, ResponseRegistrarLineaNaviera>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaLineaNaviera ConsultarLineaNaviera(RequestConsultaLineaNaviera request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarLineaNaviera"];

            var response = DeserializarJSON<RequestConsultaLineaNaviera, ResponseBusquedaLineaNaviera>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarMedioTransporte RegistrarMedioTransporte(RequestRegistrarMedioTransporte request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarMedioTransporte"];
            var response = DeserializarJSON<RequestRegistrarMedioTransporte, ResponseRegistrarMedioTransporte>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaMedioTransporte ConsultarMedioTransporte(RequestConsultaMedioTransporte request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarMedioTransporte"];

            var response = DeserializarJSON<RequestConsultaMedioTransporte, ResponseBusquedaMedioTransporte>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoLugarCarga RegistrarTipoLugarCarga(RequestRegistrarTipoLugarCarga request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoLugarCarga"];
            var response = DeserializarJSON<RequestRegistrarTipoLugarCarga, ResponseRegistrarTipoLugarCarga>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoLugarCarga ConsultarTipoLugarCarga(RequestConsultaTipoLugarCarga request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoLugarCarga"];

            var response = DeserializarJSON<RequestConsultaTipoLugarCarga, ResponseBusquedaTipoLugarCarga>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoNave RegistrarTipoNave(RequestRegistrarTipoNave request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoNave"];
            var response = DeserializarJSON<RequestRegistrarTipoNave, ResponseRegistrarTipoNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoNave ConsultarTipoNave(RequestConsultaTipoNave request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoNave"];

            var response = DeserializarJSON<RequestConsultaTipoNave, ResponseBusquedaTipoNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarModoPago RegistrarModoPago(RequestRegistrarModoPago request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarModoPago"];
            var response = DeserializarJSON<RequestRegistrarModoPago, ResponseRegistrarModoPago>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaModoPago ConsultarModoPago(RequestConsultaModoPago request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarModoPago"];

            var response = DeserializarJSON<RequestConsultaModoPago, ResponseBusquedaModoPago>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarMoneda RegistrarMoneda(RequestRegistrarMoneda request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarMoneda"];
            var response = DeserializarJSON<RequestRegistrarMoneda, ResponseRegistrarMoneda>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaMoneda ConsultarMoneda(RequestConsultaMoneda request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarMoneda"];

            var response = DeserializarJSON<RequestConsultaMoneda, ResponseBusquedaMoneda>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoFlete RegistrarTipoFlete(RequestRegistrarTipoFlete request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoFlete"];
            var response = DeserializarJSON<RequestRegistrarTipoFlete, ResponseRegistrarTipoFlete>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoFlete ConsultarTipoFlete(RequestConsultaTipoFlete request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoFlete"];

            var response = DeserializarJSON<RequestConsultaTipoFlete, ResponseBusquedaTipoFlete>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTipoDocumento RegistrarTipoDocumento(RequestRegistrarTipoDocumento request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTipoDocumento"];
            var response = DeserializarJSON<RequestRegistrarTipoDocumento, ResponseRegistrarTipoDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTipoDocumento ConsultarTipoDocumento(RequestConsultaTipoDocumento request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoDocumento"];

            var response = DeserializarJSON<RequestConsultaTipoDocumento, ResponseBusquedaTipoDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarPuerto RegistrarPuerto(RequestRegistrarPuerto request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarPuerto"];
            var response = DeserializarJSON<RequestRegistrarPuerto, ResponseRegistrarPuerto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaPuerto ConsultarPuerto(RequestConsultaPuerto request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarPuerto"];

            var response = DeserializarJSON<RequestConsultaPuerto, ResponseBusquedaPuerto>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarViaTransporte RegistrarViaTransporte(RequestRegistrarViaTransporte request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarViaTransporte"];
            var response = DeserializarJSON<RequestRegistrarViaTransporte, ResponseRegistrarViaTransporte>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaViaTransporte ConsultarViaTransporte(RequestConsultaViaTransporte request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarViaTransporte"];

            var response = DeserializarJSON<RequestConsultaViaTransporte, ResponseBusquedaViaTransporte>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarAduana RegistrarAduana(RequestRegistrarAduana request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarAduana"];
            var response = DeserializarJSON<RequestRegistrarAduana, ResponseRegistrarAduana>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaAduana ConsultarAduana(RequestConsultaAduana request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarAduana"];

            var response = DeserializarJSON<RequestConsultaAduana, ResponseBusquedaAduana>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarPersona RegistrarPersona(RegistrarPersonaDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarPersona"];
            var response = DeserializarJSON<RegistrarPersonaDTO, ResponseRegistrarPersona>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaPersona BusquedaPersona(RequestBusquedaPersona request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarPersona"];

            var response = DeserializarJSON<RequestBusquedaPersona, ResponseBusquedaPersona>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseConsultarDetallePersona ConsultarDetallePersona(RequestConsultaDetallePersona request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDetallePersona"];

            var response = DeserializarJSON<RequestConsultaDetallePersona, ResponseConsultarDetallePersona>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseRegistrarTransmisionNave RegistrarTransmisionNave(RegistraTransmisionNaveDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTransmisionNave"];
            var response = DeserializarJSON<RegistraTransmisionNaveDTO, ResponseRegistrarTransmisionNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarTransmisionDocumento RegistrarTransmisionDocumento(RegistraTransmisionDocumentoDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarTransmisionDocumento"];
            var response = DeserializarJSON<RegistraTransmisionDocumentoDTO, ResponseRegistrarTransmisionDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseRegistrarDocumento RegistrarDocumento(RegistrarDocumentoDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarDocumento"];
            var response = DeserializarJSON<RegistrarDocumentoDTO, ResponseRegistrarDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaDocumento BusquedaDocumento(RequestBusquedaDocumento request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDocumento"];

            var response = DeserializarJSON<RequestBusquedaDocumento, ResponseBusquedaDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTransmisionNave BusquedaTransmisionNave(RequestBusquedaTransmisionNave request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTransmisionNave"];

            var response = DeserializarJSON<RequestBusquedaTransmisionNave, ResponseBusquedaTransmisionNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaTransmisionDocumento BusquedaTransmisionDocumento(RequestBusquedaTransmisionDocumento request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTransmisionDocumento"];

            var response = DeserializarJSON<RequestBusquedaTransmisionDocumento, ResponseBusquedaTransmisionDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaLogTransmisionNave BusquedaLogTransmisionNave(RequestBusquedaLogTransmisionNave request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarLogTransmisionNave"];

            var response = DeserializarJSON<RequestBusquedaLogTransmisionNave, ResponseBusquedaLogTransmisionNave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaLogTransmisionDocumento BusquedaLogTransmisionDocumento(RequestBusquedaLogTransmisionDocumento request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarLogTransmisionDocumento"];

            var response = DeserializarJSON<RequestBusquedaLogTransmisionDocumento, ResponseBusquedaLogTransmisionDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseConsultarDetalleDocumento ConsultarDetalleDocumento(RequestConsultaDetalleDocumento request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDetalleDocumento"];

            var response = DeserializarJSON<RequestConsultaDetalleDocumento, ResponseConsultarDetalleDocumento>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseActualizarPartidaArancelaria ActualizarPartidaArancelaria(RequestActualizarPartidaArancelaria request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarPartidaArancelaria"];
            var response = DeserializarJSON<RequestActualizarPartidaArancelaria, ResponseActualizarPartidaArancelaria>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseReporteACEscalonado ReporteACEscalonado(RequestReporteACEscalonado request)
        {
            var url = ConfigurationManager.AppSettings["UrlReporteAcuerdoComercialEscalonado"];
            var response = DeserializarJSON<RequestReporteACEscalonado, ResponseReporteACEscalonado>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseConsultaDetalleNotificacion ConsultarDetalleNotificacion(RequestConsultaDetalleNotificacion request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDetalleNotificacion"];
            var response = DeserializarJSON<RequestConsultaDetalleNotificacion, ResponseConsultaDetalleNotificacion>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseActualizarNotificacion ActualizarNotificacion(RequestActualizarNotificacion request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarNotificacion"];
            var response = DeserializarJSON<RequestActualizarNotificacion, ResponseActualizarNotificacion>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaConfiguracionLinea ConsultarConfiguracionLinea(RequestBusquedaConfiguracionLinea request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarConfiguracionLinea"];
            var response = DeserializarJSON<RequestBusquedaConfiguracionLinea, ResponseBusquedaConfiguracionLinea>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
        public ResponseConfiguracionLineaDTO ObtenerConfiguracionLinea()
        {
            var url = ConfigurationManager.AppSettings["UrlObtenerConfiguracioLinea"];
            var response = DeserializarJSON<string, ResponseConfiguracionLineaDTO>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }


        public ResponseObtenerConfiguracionLineaDTO ObtenerConfiguracionLineaxCodigo(RequestObtenerConfiguracionLineaDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlObtenerConfiguracionLineaxCodigo"];

            var response = DeserializarJSON<RequestObtenerConfiguracionLineaDTO, ResponseObtenerConfiguracionLineaDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }


        public ResponseActualizarConfiguracionLineaDTO ModificarConfiguracionLinea(RequestActualizarConfiguracionLineaDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlModificarConfiguracionLinea"];

            var response = DeserializarJSON<RequestActualizarConfiguracionLineaDTO, ResponseActualizarConfiguracionLineaDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ConsultaDepositoDefaultResponseDTO ConsultaDepositoDefault(ConsultaDepositoDefaultRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDepositoDefault"];

            var response = DeserializarJSON<ConsultaDepositoDefaultRequestDTO, ConsultaDepositoDefaultResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ConsultaMonitorCoparnResponseDTO ConsultaMonitorCoparn(ConsultaMonitorCoparnRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarMonitorCoparn"];

            var response = DeserializarJSON<ConsultaMonitorCoparnRequestDTO, ConsultaMonitorCoparnResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseListaDetalleCatalogo ListarDetalleCatalogoTramarsa(RequestConsultaDetalleCatalago request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarDetalleCatalogoTramarsa"];

            var response = DeserializarJSON<RequestConsultaDetalleCatalago, ResponseListaDetalleCatalogo>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ConsultaAlmacenResponseDTO ListarDeposito()
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarAlmacenTodos"];

            var response = DeserializarJSON<string, ConsultaAlmacenResponseDTO>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ResponseActualizarNotificacion ActualizarNotificacionIntegracion(ActualizaNotificacionIntegracionRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizarNotificacionIntegracion"];
            var response = DeserializarJSON<ActualizaNotificacionIntegracionRequestDTO, ResponseActualizarNotificacion>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ConsultaDetalleNotificacionIntegracionResponseDTO ConsultarDetalleNotificacionIntegracion(ConsultaDetalleNotificacionIntegracionRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarDetalleNotificacionIntegracion"];
            var response = DeserializarJSON<ConsultaDetalleNotificacionIntegracionRequestDTO, ConsultaDetalleNotificacionIntegracionResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ActualizarDepositoDefaultResponseDTO ActualizaDepositoDefault(ActualizaDepositoDefaultRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlActualizaDepositoDefault"];

            var response = DeserializarJSON<ActualizaDepositoDefaultRequestDTO, ActualizarDepositoDefaultResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public AgregarDepositoDefaultResponseDTO AgregaDepositoDefault(AgregaDepositoDefaultRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlAgregaDepositoDefault"];

            var response = DeserializarJSON<AgregaDepositoDefaultRequestDTO, AgregarDepositoDefaultResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ValidaDepositoDefaultResponseDTO ValidaDepositoDefault(ValidaDepositoDefaultRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlValidaDepositoDefault"];

            var response = DeserializarJSON<ValidaDepositoDefaultRequestDTO, ValidaDepositoDefaultResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ConsultaBandejaNotificacionIntegracionResponseDTO ConsultarBandejaNotificacionIntegracion(ConsultaBandejaNotificacionIntegracionRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarBandejaNotificacionIntegracion"];
            var response = DeserializarJSON<ConsultaBandejaNotificacionIntegracionRequestDTO, ConsultaBandejaNotificacionIntegracionResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseActualizarNotificacion AgregarNotificacionIntegracion(RegistroNotificacionIntegracionRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlAgregarNotificacionIntegracion"];
            var response = DeserializarJSON<RegistroNotificacionIntegracionRequestDTO, ResponseActualizarNotificacion>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }



    }
}