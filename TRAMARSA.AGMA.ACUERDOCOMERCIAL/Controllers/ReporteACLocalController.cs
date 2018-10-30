using System;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using GR.Frameworks;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class ReporteACLocalController : Controller
    {

        public ActionResult AcuerdoComercialLocal()
        {
            return View("../Reporte/AcuerdoComercialLocal");
        }

        public ActionResult ReporteACLocalIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseIndex = new ReporteACLocalIndexViewModel();
            try
            {
                var responseListarMoneda = new MaestrosAgente().ListarMoneda();
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                responseIndex.Sucursal = (from item in responseListarSucursal.SucursalesList
                                          select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();
                responseIndex.Moneda = (from item in responseListarMoneda.MonedaList
                                        select GR.Frameworks.Helper.MiMapper<ListaMonedaDTO, ListaMonedaViewModel>(item)).ToList();
                responseIndex.Linea = (from item in responseListarLinea.LineasList
                                       select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(responseIndex));
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

        public ActionResult ConsultarReporteAcLocal(RequestReporteACLocalViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ListaReporteACLocal");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestReporteACLocalViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 100000;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new AcuerdoComercialAgente().ReporteACLocal(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaReporteAcuerdoComercialLocal, filtros.paginacionDTO.IdGrilla, "CodigoLinea", Request.QueryString["export"], Response, "Reporte_de_acuerdo_comercial_local_");
                    }
                    else
                    {
                        var listaAcLocal = new AcuerdoComercialAgente().ReporteACLocal(filtros);
                        if (listaAcLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaAcLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaAcLocal.ListaReporteAcuerdoComercialLocal, filtros.paginacionDTO.GetNroPagina(), listaAcLocal.TotalRegistros, totalPages, "CodigoLinea");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaAcLocal.ListaReporteAcuerdoComercialLocal, 0, 0, 0));
                        }
                    }
                }
                else
                {
                    var cadena = string.Empty;
                    var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
                    actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
                }
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("",
                    HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(),
                        MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }
    }
}