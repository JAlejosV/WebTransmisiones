using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web;
using System.Web.Mvc;
using GR.Comun.DTO;
using GR.Frameworks;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class NotificacionContenedorController : Controller
    {


        public ActionResult NotificarContenedores()
        {
            return View("NotificarContenedores");
        }

         
        /// <summary>
        /// Carga inicial de documento origen
        /// </summary>
        /// <returns></returns>
        public ActionResult NotificarContenedor()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var codLinea = ConfigurationManager.AppSettings["CodigoLinea"].ToString();
                var agente = new AcuerdoComercialAgente();
                var response = agente.NotificarContenedor(codLinea);
                actionResult = Content(JsonConvert.SerializeObject(response));
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