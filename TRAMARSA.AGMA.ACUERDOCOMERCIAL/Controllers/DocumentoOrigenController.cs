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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class DocumentoOrigenController : Controller
    {
        public ActionResult BuscarDocumentoOrigen()
        {
            return View("../Acuerdos/BuscarDocumentoOrigen");
        }

        /// <summary>
        /// Carga inicial de documento origen
        /// </summary>
        /// <returns></returns>
        public ActionResult BusquedaDocumnetoOrigenIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var response = new ResponseBusquedaDocumentoOrigenIndexViewModel();
            try
            {
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel() { });

                response.Linea = (from item in responseListarLinea.LineasList
                                  select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                response.TipoDocumento = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                          where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoDocumento)
                                          select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                response.TipoDocumentoOrigen = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoDocumentoOrigen)
                                                select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(response));
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
        /// <summary>
        /// Busqueda de documento origen
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult BusquedaDocumnetoOrigen(RequestBusquedaDocumentoOrigenViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaDocumentoOrigen");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaDocumentoOrigenViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().BusquedaDocumentoOrigen(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.DocumentoOrigenList, filtros.paginacionDTO.IdGrilla, "NroBL", Request.QueryString["export"], Response, "Lista_de_documento_origen_");
                    }
                    else
                    {
                        var listaAcLocal = new TarifasAgente().BusquedaDocumentoOrigen(filtros);
                        if (listaAcLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaAcLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaAcLocal.DocumentoOrigenList, filtros.paginacionDTO.GetNroPagina(), listaAcLocal.TotalRegistros, totalPages, "NroBL");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaAcLocal.DocumentoOrigenList, 0, 0, 0));
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


        public ActionResult ObtenerDocumentoOrigenTodos(RequestBusquedaDocumentoOrigenViewModel filtros)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;
                    var listaRespuesta = new TarifasAgente().BusquedaDocumentoOrigen(filtros);
                    listaRespuesta.DocumentoOrigenList.ForEach(x => {
                        x.idCheck = true;
                    });
                    if (listaRespuesta.Result.Satisfactorio)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(listaRespuesta));
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaRespuesta.DocumentoOrigenList, 0, 0, 0));
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