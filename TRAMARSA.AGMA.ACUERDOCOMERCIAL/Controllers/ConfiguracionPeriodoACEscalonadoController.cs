using System;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
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
    public class ConfiguracionPeriodoACEscalonadoController : Controller
    {


        //public ActionResult ConfiguracionPeridoACE()
        //{
        //    return View("ConfiguracionPeridoACE");
        //}




        //public ActionResult GrabarConfiguracionPeriodoIndex()
        //{
        //    var responseConfig = new ResponseConfiguracionPeriodoACEscalonadoViewModel();
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var responseListarClaseContenedor = new MaestrosAgente().ListarClaseContenedor();
        //        var responseListarMoneda = new MaestrosAgente().ListarMoneda();

        //        responseConfig.ListaMonedas = (from item in responseListarMoneda.MonedaList
        //                                       select HelperCtrl.MiMapper<ListaMonedaDTO, ListaMonedaViewModel>(item)).ToList();
        //        responseConfig.ListaCategoriaContenedor = (from item in responseListarClaseContenedor.ClaseContenedorList
        //                                                   select HelperCtrl.MiMapper<ClaseContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();
        //        actionResult = Content(JsonConvert.SerializeObject(responseConfig));
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        //public ActionResult ListarTipoContendorByClaseContenedor(string codigoClaseContenedor, string codigoLinea)
        //{
        //    var responseConfig = new ResponseConfiguracionPeriodoACEscalonadoViewModel();
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        RequestBusquedaTipoContenedorViewModel requestTipoContenedor =
        //            new RequestBusquedaTipoContenedorViewModel
        //            {
        //                filtro =
        //                {
        //                    CodigoClaseContenedor = codigoClaseContenedor,
        //                    CodigoLinea = codigoLinea
        //                }
        //            };
        //        var responseListarTipoContenedor = new MaestrosAgente().ListarTipoContenedor(requestTipoContenedor);
        //        responseConfig.ListaTipoContenedor = (from item in responseListarTipoContenedor.TipoContenedorList
        //                                              select HelperCtrl.MiMapper<ListaTipoContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();
        //        actionResult = Content(JsonConvert.SerializeObject(responseConfig));
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}
    }
}