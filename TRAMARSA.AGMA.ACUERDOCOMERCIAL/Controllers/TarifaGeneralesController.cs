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
    public class TarifaGeneralesController : Controller
    {
        public ActionResult BuscarTarifaGenerales()
        {
            return View("../Tarifas/BuscarTarifaGenerales");
        }
        /// <summary>
        /// Consulta Tarifa
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultaTarifaGenerales(RequestBusquedaTarifaLocalViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaTarifaGeneral");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaTarifaLocalViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().BusquedaTarifaLocal(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.TarifaLocalList, filtros.paginacionDTO.IdGrilla, "CodigoConcepto", Request.QueryString["export"], Response, "Lista_de_tarifa_general_");

                    }
                    else
                    {
                        var listTarifaLocal = new TarifasAgente().BusquedaTarifaLocal(filtros);
                        if (listTarifaLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listTarifaLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listTarifaLocal.TarifaLocalList, filtros.paginacionDTO.GetNroPagina(), listTarifaLocal.TotalRegistros, totalPages, "CodigoConcepto");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listTarifaLocal.TarifaLocalList, 0, 0, 0));
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

        /// <summary>
        /// Carga inicial de búsqueda de tarifa local
        /// </summary>
        /// <returns></returns>
        public ActionResult ConsultarTarifaGeneralesIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var listaBusquedaTarifaGeneralesViewModel = new ListaBusquedaTarifaGeneralesViewModel();
            try
            {
                var sucursales = new MaestrosAgente().ListarSucursal();
                //var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();
                var responseListarLinea = new MaestrosAgente().ListarLinea();

                listaBusquedaTarifaGeneralesViewModel.Sucursal = (from item in sucursales.SucursalesList
                                          select GR.Frameworks.Helper.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();

                //listaBusquedaTarifaGeneralesViewModel.TerminalPortuario =
                //    (from item in responseListarTerminalPortuario.TerminalPortuarioList
                //     select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item))
                //        .ToList();

                listaBusquedaTarifaGeneralesViewModel.Linea = (from item in responseListarLinea.LineasList
                                          select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();


                actionResult = Content(JsonConvert.SerializeObject(listaBusquedaTarifaGeneralesViewModel));
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