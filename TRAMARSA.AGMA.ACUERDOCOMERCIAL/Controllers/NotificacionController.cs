using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web;
using System.Web.Mvc;
using GR.Comun.DTO;
using GR.Frameworks;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Response;


namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class NotificacionController : Controller
    {


        public ActionResult RegistroNotificacion()
        {
            return View("RegistroNotificacion");
        }


        public ActionResult ConsultaNotificacionIntegracion()
        {
            return View("ConsultaNotificacionIntegracion");
        }

        public ActionResult RegistroNotificacionIntegracion()
        {
            return View("RegistroNotificacionIntegracion");
        }

        /// <summary>
        /// Index Registro
        /// </summary>
        /// <returns></returns>
        public ActionResult RegistroNotificacionIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseIndex = new ResponseRegistroNotificacionIndex();
            try
            {
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                responseIndex.ListLinea = (from item in responseListarLinea.LineasList
                                           select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                responseIndex.ListTipoFrecuencia = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                    where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoFrecuencia)
                                                    select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();
                responseIndex.FechaToday = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
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


        public ActionResult ConsultarDetalleNotificacion(RequestConsultaDetalleNotificacionViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    var oresponse = new AcuerdoComercialAgente().ConsultarDetalleNotificacion(request);
                    if (oresponse != null)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(oresponse));
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



        public ActionResult ActualizarNotificacion(RequestRegistroNotificacionViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                }
                var response = new AcuerdoComercialAgente().ActualizarNotificacion(request);
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


        //public ActionResult DesactivarNotificacion(RequestRegistroNotificacionViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
        //        }
        //        var response = new ControlEmisionBlAgente().ActualizarNotificacion(request);
        //        actionResult = Content(JsonConvert.SerializeObject(response));
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


        public ActionResult ConsultarDetalleNotificacionIntegracion(RequestConsultaDetalleNotificacionIntegracionViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    var oresponse = new NotificacionIntegracionAgente().ConsultarDetalleNotificacionIntegracion(request);
                    if (oresponse != null)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(oresponse));
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

        public ActionResult ActualizarNotificacionIntegracion(RequestActualizaNotificacionIntegracionViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                }
                var response = new NotificacionIntegracionAgente().ActualizarNotificacionIntegracion(request);
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
        /// Consulta de naves 
        /// La paginacion es el servicio
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultaBandejaNotificacionIntegracion(RequestConsultaBandejaNotificacionIntegracionViewModel filtros, string requestExportar)
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
                    var idGrilla = rm.GetString("IdGrilla_ConsultaBandejaNotificacionIntegracion");
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestConsultaBandejaNotificacionIntegracionViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;

                    var listaRespuesta = new NotificacionIntegracionAgente().ListarBandejaNotificacionIntegracion(filtros);
                    listaRespuesta.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaNotificacionIntegracion, filtros.paginacionDTO.IdGrilla, "CodigoNotificacion", Request.QueryString["export"], Response, "Lista_de_Notificaciones_");
                }
                else
                {
                    var listaNave = new NotificacionIntegracionAgente().ListarBandejaNotificacionIntegracion(filtros);
                    if (listaNave.Result.Satisfactorio && listaNave.ListaNotificacionIntegracion.Count > 0)
                    {
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaNave.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        var res = Grid.toJSONFormat2(listaNave.ListaNotificacionIntegracion, filtros.paginacionDTO.GetNroPagina(), listaNave.TotalRegistros, totalPages, "CodigoNotificacion");
                        actionResult = Content(res);
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaNave.ListaNotificacionIntegracion, 0, 0, 0, ""));
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

        public ActionResult ConsultarBandejaNotificacionIntegracionIndex()
        {
            var responseConfig = new ResponseConsultaBandejaNotificacionIntegracionIndexViewModel();
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {

                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogoTramarsa(new RequestConsultaDetalleCatalogoViewModel());

                responseConfig.Estados = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                          where item.IdCatalogo == Convert.ToInt32(TablaTablasTramarsa.EstadosRegistro)
                                          select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

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

        public ActionResult AgregarNotificacionIntegracion(RequestRegistroNotificacionIntegracionViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioCreacion = usuario.Usuario.CodigoUsuario;
                }
                var response = new NotificacionIntegracionAgente().AgregarNotificacionIntegracion(request);
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
    }
}