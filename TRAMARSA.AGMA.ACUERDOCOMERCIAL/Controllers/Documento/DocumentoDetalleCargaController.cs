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
    public class DocumentoDetalleCargaController : Controller
    {
        public ActionResult RegistrarCarga()
        {
            return View("../Documento/RegistrarCarga");
        }

        public ActionResult BuscarContenedor()
        {
            return View("../Busqueda/BuscarContenedor");
        }

        public ActionResult BuscarUnidadMercancia()
        {
            return View("../Busqueda/BuscarUnidadMercancia");
        }

        public ActionResult BuscarClaseIMO()
        {
            return View("../Busqueda/BuscarClaseIMO");
        }

        public ActionResult BuscarNumeroIMO()
        {
            return View("../Busqueda/BuscarNumeroIMO");
        }

        //public ActionResult BuscarAlmacen()
        //{
        //    return View("../Busqueda/BuscarAlmacen");
        //}

        //public ActionResult BuscarDeposito()
        //{
        //    return View("../Busqueda/BuscarDeposito");
        //}

        public ActionResult BuscarPrecinto()
        {
            return View("../Busqueda/BuscarPrecinto");
        }

        public ActionResult CargaIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexCarga = new ResponseRegistrarCargaIndexViewModel();
            try
            {
                var responseListarCondicionesCarga = new MaestrosAgente().ListarCondicionesCarga();
                var responseListarTemperaturas = new MaestrosAgente().ListarTemperaturas();
                var responseListarCondicionesTransporte = new MaestrosAgente().ListarCondicionesTransporte();

                indexCarga.CondicionesCarga = (from item in responseListarCondicionesCarga.ListaCondicionesCarga select HelperCtrl.MiMapper<ListaCondicionesCargaDTO, ListaCondicionesCargaViewModel>(item)).ToList();
                indexCarga.Temperaturas = (from item in responseListarTemperaturas.ListaTemperaturas select HelperCtrl.MiMapper<ListaTemperaturasDTO, ListaTemperaturasViewModel>(item)).ToList();
                indexCarga.CondicionesTransporte = (from item in responseListarCondicionesTransporte.ListaCondicionesTransporte select HelperCtrl.MiMapper<ListaCondicionesTransporteDTO, ListaCondicionesTransporteViewModel>(item)).ToList();

                actionResult = Content(JsonConvert.SerializeObject(indexCarga));
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