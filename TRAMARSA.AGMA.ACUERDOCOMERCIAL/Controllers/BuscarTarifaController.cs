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
    public class BuscarTarifaController : Controller
    {
        public ActionResult BuscarTarifa()
        {
            return View("../Tarifas/BuscarTarifa");
        }
        /// <summary>
        /// Consulta Tarifa
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultaTarifa(RequestBusquedaTarifaViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {

                        ResourceManager rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ConsultaTarifa");
                        //var ID_Grilla = ConfigurationManager.AppSettings["IdGrilla_ConsultaAgente"];

                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaTarifaViewModel>(requestExportar);

                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);

                        filtros.paginacionDTO.sord =
                            new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                            //"NroItem";// columnaOrden;
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().ListarTarifa(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.TarifasList,
                            filtros.paginacionDTO.IdGrilla, "CodigoConcepto", Request.QueryString["export"], Response,"Lista_de_tarifas_");

                    }
                    else
                    {
                        var listaTarifa = new TarifasAgente().ListarTarifa(filtros);
                        if (listaTarifa.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaTarifa.TotalRegistros)/
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaTarifa.TarifasList, filtros.paginacionDTO.GetNroPagina(),
                                listaTarifa.TotalRegistros, totalPages, "CodigoConcepto");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaTarifa.TarifasList, 0, 0, 0, ""));
                        }
                    }
                }
                else
                {
                    string cadena = string.Empty;
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
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }

        /// <summary>
        /// Carga inicial de búsqueda de tarifa local
        /// </summary>
        /// <returns></returns>
        public ActionResult ConsultarTarifaIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var listaBusquedaTarifaViewModel = new ListaBusquedaTarifaViewModel();
            try
            {
                var lineas = new MaestrosAgente().ListarLinea();
                var regimenes = new MaestrosController().ListarRegimen();
                listaBusquedaTarifaViewModel.Regimen = regimenes;
                listaBusquedaTarifaViewModel.Linea = (from item in lineas.LineasList
                                          select GR.Frameworks.Helper.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(listaBusquedaTarifaViewModel));
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