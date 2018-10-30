using System;
using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships;
using GR.Msc.Memberships.Agente.BL;
using GR.Msc.Memberships.Agente.Request;
using GR.Msc.Memberships.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class SeguridadAgente
    {
        public ResponseRol ObtenerRoles()
        {
            var obRoles = new SeguridadBL().GetRolesUsuario(new RequestRol
            {
                Acronimo = WebConfigReader.AcronimoAplicacion
            });

            return obRoles;
        }
        public ResponseCambiarClaveUsuario CambiarClaveUsuario(RequestCambiarClaveUsuarioViewModel request)
        {
            var response = new ResponseCambiarClaveUsuario();
            try
            {
                SimpleInteroperableEncryption crypter = new SimpleInteroperableEncryption(WebConfigReader.SemillaEncriptacionPublica);
                var requestAgente = new RequestCambiarClaveUsuario();
                requestAgente.Usuario = request.Usuario;
                requestAgente.ClaveAnterior = crypter.Encrypt(request.ClaveAnterior);
                requestAgente.ClaveNueva = crypter.Encrypt(request.ClaveNueva);
                requestAgente.AcronimoAplicacion = WebConfigReader.AcronimoAplicacion;
                requestAgente.DominioAplicacion = WebConfigReader.DominioAplicacion;
                response = new TransmisionesProxyrest().CambiarClaveUsuario(requestAgente);
            }
            catch (Exception ex)
            {
                response.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return response;
        }
        public ResponseGenerarClaveUsuario GenerarClaveUsuario(RequestGenerarClaveUsuarioViewModel request)
        {
            var response = new ResponseGenerarClaveUsuario();
            try
            {
                var requestAgente = new RequestGenerarClaveUsuario();
                requestAgente.Usuario = request.Usuario;
                requestAgente.AcronimoAplicacion = WebConfigReader.AcronimoAplicacion;
                requestAgente.DominioAplicacion = WebConfigReader.DominioAplicacion;
                response = new TransmisionesProxyrest().GenerarClaveUsuario(requestAgente);
            }
            catch (Exception ex)
            {
                response.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return response;
        }
    }
}