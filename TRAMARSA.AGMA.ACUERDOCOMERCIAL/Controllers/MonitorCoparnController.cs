using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Web.Mvc;
using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships;
using GR.Msc.Memberships.Models;
//using ModuloMultimarca.Helper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using System.Resources;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Response;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class MonitorCoparnController : Controller
    {


        public ActionResult MonitorCoparn()
        {
            return View("MonitorCoparn");
        }
         
        /// <summary>
        /// Consulta de naves 
        /// La paginacion es el servicio
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultarMonitorCoparn(RequestConsultaMonitorCoparnViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                //if (ModelState.IsValid)
                //{
                if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                {
                    var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                    var idGrilla = rm.GetString("IdGrilla_ConsultaMonitorCoparn");
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestConsultaMonitorCoparnViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;

                    var listaRespuesta = new MonitorCoparnAgente().ListarMonitorCoparn(filtros);
                    listaRespuesta.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.MonitorCoparnList, filtros.paginacionDTO.IdGrilla, "Id", Request.QueryString["export"], Response, "Lista_de_Movimientos_");
                }
                else
                {
                    var listaNave = new MonitorCoparnAgente().ListarMonitorCoparn(filtros);
                    if (listaNave.Result.Satisfactorio && listaNave.MonitorCoparnList.Count > 0)
                    {
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaNave.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        var res = Grid.toJSONFormat2(listaNave.MonitorCoparnList, filtros.paginacionDTO.GetNroPagina(), listaNave.TotalRegistros, totalPages, "Id");
                        actionResult = Content(res);
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaNave.MonitorCoparnList, 0, 0, 0, ""));
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
        public ActionResult ConsultarMonitorCoparnIndex()
        {
            var responseConfig = new ResponseConsultaMonitorCoparnIndexViewModel();
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {

                var lstDepositos = new DepositoDefaultAgente().ListarAlmacenTodos();
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogoTramarsa(new RequestConsultaDetalleCatalogoViewModel());
                responseConfig.Deposito = lstDepositos.DepositosList;
                responseConfig.Estados = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                    where item.IdCatalogo == Convert.ToInt32(TablaTablasTramarsa.EstadosIntegracion)
                                                    select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                responseConfig.FechaFinDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                responseConfig.FechaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddMonths(-1));


                actionResult = Content(JsonConvert.SerializeObject(responseConfig));
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