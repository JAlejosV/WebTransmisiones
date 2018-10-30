using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web;
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
    public class ReporteTarifaEscalonadaController : Controller
    {
        public ActionResult TarifaEscalonada()
        {
            return View("../Reporte/TarifaEscalonada");
        }
        public ActionResult ReporteTarifaEscalonadIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseIndex = new ReporteTarifaEscalonadaIndexViewModel();
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

        public ActionResult ConsultarReporteTarifaEscalonada(RequestReporteTarifaEscalonadaViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas",
                            Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ListaReporteTarifaEscalonada");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestReporteTarifaEscalonadaViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord =
                            new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().ReporteTarifaEscalonada(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ReporteTarifaEscalonadaList, filtros.paginacionDTO.IdGrilla, "CodigoLinea", Request.QueryString["export"], Response, "Reporte_de_tarifa_escalonada_");
                    }
                    else
                    {
                        var listTarifaLocal = new TarifasAgente().ReporteTarifaEscalonada(filtros);
                        if (listTarifaLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listTarifaLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listTarifaLocal.ReporteTarifaEscalonadaList, filtros.paginacionDTO.GetNroPagina(), listTarifaLocal.TotalRegistros, totalPages, "CodigoLinea");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listTarifaLocal.ReporteTarifaEscalonadaList, 0, 0, 0));
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