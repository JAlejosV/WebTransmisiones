using GR.Frameworks;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Maestros.TipoTransmision;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Transmisiones
{
    public class TransmisionNaveController : Controller
    {
        public ActionResult AdministrarTransmisionNave()
        {
            return View("../Transmisiones/Nave/AdministrarTransmisionNave");
        }

        public ActionResult RegistrarTransmisionNave()
        {
            return View("../Transmisiones/Nave/RegistrarTransmisionNave");
        }

        public ActionResult BuscarLogTransmisionNave()
        {
            return View("../Busqueda/BuscarLogTransmisionNave");
        }

        public ActionResult BuscarTiposTransmisionNave()
        {
            return View("../Maestros/TiposTransmision/ListarTiposTransmisionNave");
        }

        //public ActionResult RegistroItinerario()
        //{
        //    return View("../Maestros/Itinerario/RegistroItinerario");
        //}

        public ActionResult ConsultaLogTransmisionNave(RequestBusquedaLogTransmisionNaveViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        //ResourceManager rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        //var idGrilla = rm.GetString("IdGrilla_ConsultaPartidaArancelaria");
                        //filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaPartidaArancelariaViewModel>(requestExportar);
                        //if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);

                        filtros.paginacionDTO.sord =
                            new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        //"NroItem";// columnaOrden;
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TransmisionesAgente().BusquedaLogTransmisionNave(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaLogTransmisionNave,
                            filtros.paginacionDTO.IdGrilla, "CodigoItinerario", Request.QueryString["export"], Response, "Lista_de_LogTransmisionNave_");

                    }
                    else
                    {
                        var listaCliente = new TransmisionesAgente().BusquedaLogTransmisionNave(filtros);
                        if (listaCliente.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaCliente.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaCliente.ListaLogTransmisionNave, filtros.paginacionDTO.GetNroPagina(),
                                listaCliente.TotalRegistros, totalPages, "CodigoItinerario");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaCliente.ListaLogTransmisionNave, 0, 0, 0, ""));
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
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }

        public ActionResult GrabarTransmisionNave(RequestRegistrarTransmisionNaveViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var response = new TransmisionesAgente().RegistroTransmisionNave(request);
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

        public ActionResult TransmisionNaveIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexTransmisionNave = new ResponseTransmisionNaveIndexViewModel();
            try
            {
                var responseListarTiposOperacion = new MaestrosAgente().ListarTiposOperacion();
                indexTransmisionNave.TiposOperacion = (from item in responseListarTiposOperacion.ListaTiposOperacion select HelperCtrl.MiMapper<ListaTiposOperacionDTO, ListaTiposOperacionViewModel>(item)).ToList();
                indexTransmisionNave.FechaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddDays(-30));
                indexTransmisionNave.FechaFinDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                actionResult = Content(JsonConvert.SerializeObject(indexTransmisionNave));
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

        public ActionResult ListarTiposTransmisionNaveIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexTiposTransmisionNave = new ResponseTiposTransmisionNaveIndexViewModel();
            try
            {
                var responseListarTiposTransmisionNave = new MaestrosAgente().ListarTiposTransmisionNave();
                indexTiposTransmisionNave.TiposTransmisionNave = (from item in responseListarTiposTransmisionNave.ListaTiposTransmisionNave select HelperCtrl.MiMapper<ListaTiposTransmisionNaveDTO, ListaTiposTransmisionNaveViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(indexTiposTransmisionNave));
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

        //public ActionResult ListarTiposTransmisionDocumentoIndex()
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    var indexTiposTransmisionDocumento = new ResponseTiposTransmisionDocumentoIndexViewModel();
        //    try
        //    {
        //        var responseListarTiposTransmisionDocumento = new MaestrosAgente().ListarTiposTransmisionDocumento();
        //        indexTiposTransmisionDocumento.TiposTransmisionDocumento = (from item in responseListarTiposTransmisionDocumento.ListaTiposTransmisionDocumento select HelperCtrl.MiMapper<ListaTiposTransmisionDocumentoDTO, ListaTiposTransmisionDocumentoViewModel>(item)).ToList();
        //        actionResult = Content(JsonConvert.SerializeObject(indexTiposTransmisionDocumento));
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("",
        //            HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
        //                MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        public ActionResult BusquedaTransmisionNave(RequestBusquedaTransmisionNaveViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        var rm = new ResourceManager("TRAMARSA.AGMA.TransmisionNave.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ConsultaTransmisionNave");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaTransmisionNaveViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TransmisionesAgente().BusquedaTransmisionNave(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaTransmisionNave, filtros.paginacionDTO.IdGrilla, "CodigoItinerario", Request.QueryString["export"], Response, "Lista_de_TransmisionNave");
                    }
                    else
                    {
                        var listaTransmisionNave = new TransmisionesAgente().BusquedaTransmisionNave(filtros);
                        if (listaTransmisionNave.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaTransmisionNave.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaTransmisionNave.ListaTransmisionNave, filtros.paginacionDTO.GetNroPagina(), listaTransmisionNave.TotalRegistros, totalPages, "CodigoItinerario");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaTransmisionNave.ListaTransmisionNave, 0, 0, 0));
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

        public ActionResult ObtenerTransmisionNaveTodos(RequestBusquedaTransmisionNaveViewModel filtros)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;
                    var listaRespuesta = new TransmisionesAgente().BusquedaTransmisionNave(filtros);

                    listaRespuesta.ListaTransmisionNave.ForEach(x =>
                    {
                        x.idCheck = true;
                    });
                    if (listaRespuesta.Result.Satisfactorio)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(listaRespuesta));
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaRespuesta.ListaTransmisionNave, 0, 0, 0));
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