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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Maestros.TipoTransmision;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Transmisiones
{
    public class TransmisionDocumentoController : Controller
    {
        public ActionResult AdministrarTransmisionDocumento()
        {
            return View("../Transmisiones/Documento/AdministrarTransmisionDocumento");
        }

        public ActionResult RegistrarTransmisionDocumento()
        {
            return View("../Transmisiones/Documento/RegistrarTransmisionDocumento");
        }

        public ActionResult BuscarLogTransmisionDocumento()
        {
            return View("../Busqueda/BuscarLogTransmisionDocumento");
        }

        public ActionResult BuscarTiposTransmisionDocumento()
        {
            return View("../Maestros/TiposTransmision/ListarTiposTransmisionDocumento");
        }


        public ActionResult ConsultaLogTransmisionDocumento(RequestBusquedaLogTransmisionDocumentoViewModel filtros, string requestExportar)
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
                        var listaRespuesta = new TransmisionesAgente().BusquedaLogTransmisionDocumento(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaLogTransmisionDocumento,
                            filtros.paginacionDTO.IdGrilla, "CodigoDocumento", Request.QueryString["export"], Response, "Lista_de_LogTransmisionDocumento_");

                    }
                    else
                    {
                        var listaCliente = new TransmisionesAgente().BusquedaLogTransmisionDocumento(filtros);
                        if (listaCliente.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaCliente.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaCliente.ListaLogTransmisionDocumento, filtros.paginacionDTO.GetNroPagina(),
                                listaCliente.TotalRegistros, totalPages, "CodigoDocumento");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaCliente.ListaLogTransmisionDocumento, 0, 0, 0, ""));
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

        public ActionResult GrabarTransmisionDocumento(RequestRegistrarTransmisionDocumentoViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var response = new TransmisionesAgente().RegistroTransmisionDocumento(request);
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

        public ActionResult TransmisionDocumentoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexTransmisionDocumento = new ResponseTransmisionDocumentoIndexViewModel();
            try
            {
                var responseListarTiposEnvio = new MaestrosAgente().ListarTiposEnvio();
                indexTransmisionDocumento.TiposEnvio = (from item in responseListarTiposEnvio.ListaTiposEnvio select HelperCtrl.MiMapper<ListaTiposEnvioDTO, ListaTiposEnvioViewModel>(item)).ToList();
                indexTransmisionDocumento.FechaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddDays(-30));
                indexTransmisionDocumento.FechaFinDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                actionResult = Content(JsonConvert.SerializeObject(indexTransmisionDocumento));
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

        public ActionResult ListarTiposTransmisionDocumentoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexTiposTransmisionDocumento = new ResponseTiposTransmisionDocumentoIndexViewModel();
            try
            {
                var responseListarTiposTransmisionDocumento = new MaestrosAgente().ListarTiposTransmisionDocumento();
                indexTiposTransmisionDocumento.TiposTransmisionDocumento = (from item in responseListarTiposTransmisionDocumento.ListaTiposTransmisionDocumento select HelperCtrl.MiMapper<ListaTiposTransmisionDocumentoDTO, ListaTiposTransmisionDocumentoViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(indexTiposTransmisionDocumento));
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

        public ActionResult BusquedaTransmisionDocumento(RequestBusquedaTransmisionDocumentoViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        var rm = new ResourceManager("TRAMARSA.AGMA.TransmisionDocumento.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ConsultaTransmisionDocumento");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaTransmisionDocumentoViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TransmisionesAgente().BusquedaTransmisionDocumento(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaTransmisionDocumento, filtros.paginacionDTO.IdGrilla, "CodigoDocumento", Request.QueryString["export"], Response, "Lista_de_TransmisionDocumento");
                    }
                    else
                    {
                        var listaTransmisionDocumento = new TransmisionesAgente().BusquedaTransmisionDocumento(filtros);
                        if (listaTransmisionDocumento.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaTransmisionDocumento.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaTransmisionDocumento.ListaTransmisionDocumento, filtros.paginacionDTO.GetNroPagina(), listaTransmisionDocumento.TotalRegistros, totalPages, "CodigoDocumento");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaTransmisionDocumento.ListaTransmisionDocumento, 0, 0, 0));
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

        public ActionResult ObtenerTransmisionDocumentoTodos(RequestBusquedaTransmisionDocumentoViewModel filtros)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;
                    var listaRespuesta = new TransmisionesAgente().BusquedaTransmisionDocumento(filtros);

                    listaRespuesta.ListaTransmisionDocumento.ForEach(x =>
                    {
                        x.idCheck = true;
                    });
                    if (listaRespuesta.Result.Satisfactorio)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(listaRespuesta));
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaRespuesta.ListaTransmisionDocumento, 0, 0, 0));
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