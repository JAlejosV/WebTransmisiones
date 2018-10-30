using GR.Comun.Controladoras.Proxys;
using GR.Msc.Memberships.Agente.Request;
using GR.Msc.Memberships.Agente.Response;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Proxy
{
    public class SeguridadProxyRest : ProxyBaseRest
    {
        public bool CambiarClave(RequestCambioClave request)
        {
            var url = ConfigurationManager.AppSettings["UrlCambiarClave"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/CambiarClave";

            var responseBusquedaDocumentoOrigen = DeserializarJSON<RequestCambioClave, bool>(request, url);
            return responseBusquedaDocumentoOrigen;
        }
        public ResponseInfoUsuarioDTO TraerInformacionUsuario(RequestInfoUsuario request)
        {
            return DeserializarJSON<RequestInfoUsuario, ResponseInfoUsuarioDTO>(request, WebConfigReader.UrlSeguridadTraerInfoUsuario);
        }

        public ResponseInfoBasicaUsuarioDTO GetInfoBasicaUsuariosByCodigo(RequestInfoBasicaUsuarioDTO request)
        {
            return DeserializarJSON<RequestInfoBasicaUsuarioDTO, ResponseInfoBasicaUsuarioDTO>(request, WebConfigReader.UrlGetInfoBasicaUsuariosByCodigo);
        }

        private String GetUrlServicioSeguridad()
        {
            return ConfigurationManager.AppSettings["UrlServicioSeguridad"].ToString();
        }
        public ResponseCambioClave CambiarClaveWeb(RequestCambioClave request)
        {
            var url = ConfigurationManager.AppSettings["UrlCambiarClaveWeb"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad3/SeguridadGR.svc/CambiarClaveWeb";
            //var url = "http://localhost:18665/SeguridadGR.svc/CambiarClaveWeb";

            var response = DeserializarJSON<RequestCambioClave, ResponseCambioClave>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseLoginUsuario Login(RequestLogin request)
        {
            var url = ConfigurationManager.AppSettings["UrlLogin"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/Login";

            var response = DeserializarJSON<RequestLogin, ResponseLoginUsuario>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ResponseLoginUsuario LoginApp(RequestLogin request)
        {
            var url = ConfigurationManager.AppSettings["UrlLogin"] + "App";
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/Login";

            var responseBusquedaDocumentoOrigen = DeserializarJSON<RequestLogin, ResponseLoginUsuario>(request, url);
            return responseBusquedaDocumentoOrigen;
        }
        public ResponseInfoUsuarioDTO GetInfoUsuario(RequestInfoUsuario infousuario)
        {
            var url = ConfigurationManager.AppSettings["UrlGetInfoUsuario"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/GetInfoUsuario";
            var response = DeserializarJSON<RequestInfoUsuario, ResponseInfoUsuarioDTO>(infousuario, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public bool CerrarSesion(String IdUsuario)
        {
            var url = ConfigurationManager.AppSettings["UrlCerrarSesion"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/CerrarSesion";
            var responseBusquedaDocumentoOrigen = DeserializarJSON<String, bool>(IdUsuario, url);
            return responseBusquedaDocumentoOrigen;
        }
        public bool ConsultarPermisos(RequestConsultaPermiso request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarPermisos"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/ConsultarPermisos";
            var responseBusquedaDocumentoOrigen = DeserializarJSON<RequestConsultaPermiso, bool>(request, url);
            return responseBusquedaDocumentoOrigen;
        }

        public List<ResponseListaUsuarios> ListarUsuarios(RequestListarUsuario request)
        {
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/ListarUsuarios";
            var url = ConfigurationManager.AppSettings["UrlListarUsuarios"];

            var responseBusquedaDocumentoOrigen = DeserializarJSON<RequestListarUsuario, List<ResponseListaUsuarios>>(request, url);
            return responseBusquedaDocumentoOrigen;
        }

        public List<ResponseUsuarioCargo> ListarUsuariosPorCargo(RequestDTOUsuarioPorCargo request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarUsuariosPorCargo"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/ListarUsuariosPorCargo";

            var responselistResponseUsuarioCargo = DeserializarJSON<RequestDTOUsuarioPorCargo, List<ResponseUsuarioCargo>>(request, url);
            return responselistResponseUsuarioCargo;
        }

        public ResponseInfoBasicaUsuarioDTO GetInfoBasicaUsuarios(RequestInfoBasicaUsuarioDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlGetInfoBasicaUsuarios"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/GetInfoBasicaUsuarios";
            var responseInfoBasicaUsuarioDTO = DeserializarJSON<RequestInfoBasicaUsuarioDTO, ResponseInfoBasicaUsuarioDTO>(request, url);
            return responseInfoBasicaUsuarioDTO;
        }

        public ResponseListaUsuarios GetInfoBasicaUsuariosPorAlias(string Alias)
        {
            var url = ConfigurationManager.AppSettings["UrlGetInfoBasicaUsuariosPorAlias"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/GetInfoBasicaUsuariosPorAlias";
            var responseInfoBasicaUsuarioDTO = DeserializarJSON<string, ResponseListaUsuarios>(Alias, url);
            return responseInfoBasicaUsuarioDTO;
        }

        public List<ResponseCargo> ListarCargosPorSociedad(RequestListaCargo request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarCargosPorSociedad"];
            //var url = "http://tramoldev01.tramarsa.com.pe/GRSeguridad/SeguridadGR.svc/ListarCargosPorSociedad";
            var responseInfoBasicaUsuarioDTO = DeserializarJSON<RequestListaCargo, List<ResponseCargo>>(request, url);
            return responseInfoBasicaUsuarioDTO;
        }

        public string GetNombreUsuarioByCodigoUsuario(string request)
        {
            var url = ConfigurationManager.AppSettings["UrlGetNombreUsuarioByCodigoUsuario"];
            //var url = "http://localhost:18665/SeguridadGR.svc/GetNombreUsuarioByCodigoUsuario";

            var response = DeserializarJSON<string, string>(request, url);
            return response;
        }

        public ResponseRol GetRolesUsuario(RequestRol request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarRolesUsuario"];
            var response = DeserializarJSON<RequestRol, ResponseRol>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }

        public ResponseBusquedaUsuario BusquedaUsuario(RequestBusquedaUsuario request)
        {
            var url = ConfigurationManager.AppSettings["UrlListarBusquedaUsuario"];
            var response = DeserializarJSON<RequestBusquedaUsuario, ResponseBusquedaUsuario>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));
            return response;
        }
    }
}