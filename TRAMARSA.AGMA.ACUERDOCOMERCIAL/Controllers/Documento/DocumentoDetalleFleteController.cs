using GR.Frameworks;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Documento
{
    public class DocumentoDetalleFleteController : Controller
    {
        public ActionResult RegistrarFlete()
        {
            return View("../Documento/RegistrarFlete");
        }

        public ActionResult BuscarTipoFlete()
        {
            return View("../Busqueda/BuscarTipoFlete");
        }

        public ActionResult BuscarMoneda()
        {
            return View("../Busqueda/BuscarMoneda");
        }

        //public ActionResult BuscarModoPago()
        //{
        //    return View("../Busqueda/BuscarModoPago");
        //}

        public ActionResult FleteIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexFlete = new ResponseRegistrarFleteIndexViewModel();
            try
            {
                var responseListarModosPago = new MaestrosAgente().ListarModosPago();
                indexFlete.ModosPago = (from item in responseListarModosPago.ListaModosPago select HelperCtrl.MiMapper<ListaModosPagoDTO, ListaModosPagoViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(indexFlete));
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