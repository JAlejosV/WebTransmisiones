using System;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using GR.Frameworks;
using Microsoft.Reporting.WebForms;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Reportes.ContenedoresNoDevueltos1;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class ReporteContenedorNoDevueltoController : Controller
    {
        public ActionResult ContenedorNoDevuelto()
        {
            return View("../Reporte/ContenedorNoDevuelto");
        }


        public ActionResult ReporteContenedorNoDevueltoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseIndex = new ReporteContenedorNoDevueltoIndexViewModel();
            try
            {
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                responseIndex.Linea = (from item in responseListarLinea.LineasList
                                       select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                responseIndex.FechaDesdeDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddDays(-30));
                responseIndex.FechaHastaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
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

        public ActionResult GenerarReporteContenedorNoDevuelto(string requestExportar)
        {
            try
            {
                var filtros = new RequestReporteContenedorNoDevueltoViewModel();
                var filtro = GR.Frameworks.Helper.ConvertirJsonAObjeto<ReporteContenedorNoDevueltoRequestViewModel>(requestExportar);
                filtros.filtro = filtro;
                var listaContNoDev = new AcuerdoComercialAgente().ConsultarReporteContenedorNoDevuelto(filtros);
                LocalReport localReport = new LocalReport();
                localReport.ReportPath = Server.MapPath("~/Content/Reportes/Contenedores.rdlc");
                ContenedoresNoDevueltos1.ContenedoresDataTable contenedoresDataTable = new ContenedoresNoDevueltos1.ContenedoresDataTable();
                ContenedoresNoDevueltos1.CabeceraDataTable cabeceraDataTable = new ContenedoresNoDevueltos1.CabeceraDataTable();
                if (listaContNoDev.LiquidacionesNoDevueltas.Count > 0)
                {
                    listaContNoDev.LiquidacionesNoDevueltas.ForEach(x =>
                            {
                                contenedoresDataTable.AddContenedoresRow(
                                        x.NombreSucursal,
                                        "NumeroTransaccion",
                                        x.FechaTransaccion,
                                        x.CodigoNave,
                                        x.NombreNave,
                                        x.NumeroViaje,
                                        x.PuertoOrigen,
                                        x.PuertoEmbarque,
                                        x.PuertoDescarga,
                                        x.PuertoFinal,
                                        x.CodigoLinea,
                                        x.NumeroBL,
                                        x.Consignatario,
                                        x.Notificante,
                                        x.CodigoContenedor,
                                        x.UDL,
                                        x.DiasSob.ToString(),
                                        x.FechaArribo,
                                        x.ServicioBL,
                                        x.TipoContenedor
                                    );

                            });
                }
                cabeceraDataTable.AddCabeceraRow(
                    "",
                    "",
                    filtros.filtro.NombreLinea,
                    "",
                    string.Format("{0:dd/MM/yyyy}", filtros.filtro.Desde) + " - " + string.Format("{0:dd/MM/yyyy}", filtros.filtro.Hasta),
                     filtros.filtro.CodigoCotenedor,
                    "Reporte Contenedores No Liquidados",
                    "");
                ReportDataSource reportDataSource = new ReportDataSource();
                reportDataSource.Name = "ContenedoresDataSet";
                reportDataSource.Value = contenedoresDataTable;
                localReport.DataSources.Add(reportDataSource);

                reportDataSource = new ReportDataSource();
                reportDataSource.Name = "CabeceraDataSet";
                reportDataSource.Value = cabeceraDataTable;
                localReport.DataSources.Add(reportDataSource);
                string reportType = "PDF";
                string mimeType;
                string encoding;
                string fileNameExtension;
                string deviceInfo = "<DeviceInfo>" +
                                    "  <OutputFormat>PDF</OutputFormat>" +
                                    "  <PageWidth></PageWidth>" +
                                    "  <PageHeight></PageHeight>" +
                                    "  <MarginTop></MarginTop>" +
                                    "  <MarginLeft></MarginLeft>" +
                                    "  <MarginRight></MarginRight>" +
                                    "  <MarginBottom></MarginBottom>" +
                                    "</DeviceInfo>";
                Warning[] warnings;
                string[] streams;
                byte[] renderedBytes;
                renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
                return File(renderedBytes, mimeType);
                

                

            }
            catch (Exception ex)
            {
                (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, ex.Message, ex.StackTrace);
                return Json(MethodBase.GetCurrentMethod().Name + ";" + ex.Message + ";" + ex.StackTrace, JsonRequestBehavior.AllowGet);
            }
        }
        
        public ActionResult ConsultarReporteContenedorNoDevuelto(RequestReporteContenedorNoDevueltoViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ReporteContenedorNoDevuelto");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestReporteContenedorNoDevueltoViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new AcuerdoComercialAgente().ConsultarReporteContenedorNoDevuelto(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.LiquidacionesNoDevueltas, filtros.paginacionDTO.IdGrilla, "CodigoContenedor", Request.QueryString["export"], Response, "Reporte_contenedores_no_liquidados_");
                    }
                    else
                    {
                        var responseContenedores = new AcuerdoComercialAgente().ConsultarReporteContenedorNoDevuelto(filtros);
                        if (responseContenedores.Result.Satisfactorio)
                        {
                            responseContenedores.TotalRegistros = responseContenedores.LiquidacionesNoDevueltas.Count;
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(responseContenedores.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(responseContenedores.LiquidacionesNoDevueltas, filtros.paginacionDTO.GetNroPagina(), responseContenedores.TotalRegistros, totalPages, "CodigoContenedor");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(responseContenedores.LiquidacionesNoDevueltas, 0, 0, 0));
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