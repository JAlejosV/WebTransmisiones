using GR.Frameworks;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Documento
{
    public class DocumentoDetalleClienteController : Controller
    {
        public ActionResult RegistrarCliente()
        {
            return View("../Documento/RegistrarCliente");
        }

        public ActionResult BuscarTipoCliente()
        {
            return View("../Busqueda/BuscarCliente");
        }

        public ActionResult ClienteIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexCliente = new ResponseRegistrarClienteIndexViewModel();
            try
            {
                var responseListarRoles = new MaestrosAgente().ListarRol();
                indexCliente.Roles = (from item in responseListarRoles.ListaRoles select HelperCtrl.MiMapper<ListaRolDTO, ListaRolesViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(indexCliente));
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("",
                    HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                        MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;

        }
    }
}