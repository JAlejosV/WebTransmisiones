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
    public class ReporteACEscalonadoController : Controller
    {

        public ActionResult AcuerdoComercialEscalonado()
        {
            return View("../Reporte/AcuerdoComercialEscalonado");
        }


        public ActionResult ReporteACEscalonadoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseIndex = new ReporteACEscalonadoIndexViewModel();
            try
            {
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                responseIndex.Sucursal = (from item in responseListarSucursal.SucursalesList
                                          select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();
                responseIndex.Linea = (from item in responseListarLinea.LineasList
                                       select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                responseIndex.FechaVigenciaHastaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);

                responseIndex.TipoBL = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                        where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoBL)
                                                   select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();



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

        public ActionResult ConsultarReporteAcEscalonado(RequestReporteACEscalonadoViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ListaReporteACEscalonado");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestReporteACEscalonadoViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 100000;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new AcuerdoComercialAgente().ReporteACEscalonado(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaReporteAcuerdoComercialEscalonado, filtros.paginacionDTO.IdGrilla, "CodigoAcuerdoComercialEscalonado", Request.QueryString["export"], Response, "Reporte_de_acuerdo_comercial_Escalonado_");
                    }
                    else
                    {
                        var listaAcEscalonado = new AcuerdoComercialAgente().ReporteACEscalonado(filtros);
                        if (listaAcEscalonado.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaAcEscalonado.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaAcEscalonado.ListaReporteAcuerdoComercialEscalonado, filtros.paginacionDTO.GetNroPagina(), listaAcEscalonado.TotalRegistros, totalPages, "CodigoAcuerdoComercialEscalonado");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaAcEscalonado.ListaReporteAcuerdoComercialEscalonado, 0, 0, 0));
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