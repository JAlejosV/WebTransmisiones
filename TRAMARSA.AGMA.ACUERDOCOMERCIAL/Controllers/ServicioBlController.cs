using System;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using GR.Frameworks;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class ServicioBlController : Controller
    {


        public ActionResult BuscarServicioBL()
        {
            return View("BuscarServicioBL");
        }


        /// <summary>
        /// Consulta de servicios BL
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult BusquedaServiciosBl(RequestBusquedaServicioBLViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                {
                    var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                    var idGrilla = rm.GetString("IdGrilla_ConsultaServicioBl");
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaServicioBLViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;
                    var listaRespuesta = new TarifasAgente().BusquedaServiciosBl(filtros);
                    listaRespuesta.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ServiciosList, filtros.paginacionDTO.IdGrilla, "CodigoServicio", Request.QueryString["export"], Response, "Lista_Servicios_");
                }
                else
                {
                    var listaResultado = new TarifasAgente().BusquedaServiciosBl(filtros);
                    if (listaResultado.Result.Satisfactorio && listaResultado.ServiciosList.Count > 0)
                    {
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaResultado.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        var res = Grid.toJSONFormat2(listaResultado.ServiciosList, filtros.paginacionDTO.GetNroPagina(), listaResultado.TotalRegistros, totalPages, "CodigoServicio");
                        actionResult = Content(res);
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaResultado.ServiciosList, 0, 0, 0, ""));
                    }
                }
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }
    }
}