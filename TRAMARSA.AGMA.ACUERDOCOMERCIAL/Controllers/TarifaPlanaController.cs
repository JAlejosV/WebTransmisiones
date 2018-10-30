using System;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using GR.Frameworks;
using GR.Msc.Memberships.Models;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class TarifaPlanaController : Controller
    {
        public ActionResult BuscarTarifaLocal()
        {
            return View("../Tarifas/BuscarTarifaLocal");
        }
        public ActionResult RegistrarTarifaLocal()
        {
            return View("../Tarifas/RegistrarTarifaLocal");
        }
        public ActionResult HistorialTarifaLocal()
        {
            return View("../Tarifas/HistorialTarifaLocal");
        }
        public ActionResult BusquedaTarifaLocal(RequestBusquedaTarifaLocalViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaTarifaLocal");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaTarifaLocalViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().BusquedaTarifaLocal(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.TarifaLocalList, filtros.paginacionDTO.IdGrilla, "CodigoConcepto", Request.QueryString["export"], Response, "Lista_de_tarifa_local_");
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
        /// Grabar Tarifa Local 
        /// </summary>
        /// <returns></returns>
        public ActionResult GrabarTarifaLocalCargaInicial()
        {
            var registraTarifaVm = new ListaRegistraTarifaViewModel();

            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();

            try
            {
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                var responseListaMoneda = new MaestrosAgente().ListarMoneda();
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                registraTarifaVm.Vigencia = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                             where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoVigencia)
                                             select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();
                registraTarifaVm.VigenciaValor = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                  where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoValorVigencia)
                                                  select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                registraTarifaVm.Sucursal = (from item in responseListarSucursal.SucursalesList
                                             orderby item.Nombre ascending
                                             select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)
                                             ).ToList();

                registraTarifaVm.TerminalPorturario =
                    (from item in responseListarTerminalPortuario.TerminalPortuarioList
                     orderby item.NombreAlmacen ascending
                     select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item))
                        .ToList();

                registraTarifaVm.Linea = (from item in responseListarLinea.LineasList
                                          select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                registraTarifaVm.Moneda = (from item in responseListaMoneda.MonedaList
                                           select HelperCtrl.MiMapper<ListaMonedaDTO, ListaMonedaViewModel>(item)).ToList();





                actionResult = Content(JsonConvert.SerializeObject(registraTarifaVm));
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
        public ActionResult BusquedaTarifaLocalIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var registraTarifaVm = new ListaBusquedaTarifaLocalViewModel();
            try
            {
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                registraTarifaVm.Sucursal = (from item in responseListarSucursal.SucursalesList
                                             select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();

                registraTarifaVm.TerminalPorturario =
                    (from item in responseListarTerminalPortuario.TerminalPortuarioList
                     select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item))
                        .ToList();

                registraTarifaVm.Linea = (from item in responseListarLinea.LineasList
                                          select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                registraTarifaVm.FechaVigencia = string.Format("{0:dd/MM/yyyy}", DateTime.Now);

                actionResult = Content(JsonConvert.SerializeObject(registraTarifaVm));
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

        public ActionResult GrabarTarifaLocal(RequestRegistrarTarifaLocaViewModell request)
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
                var responseListarSucursal = new TarifasAgente().RegistroTarifaLocal(request);
                actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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
        /// Consultar detalle tarifa local
        /// </summary>
        /// <param name="filtro"></param>
        /// <returns></returns>
        public ActionResult ConsultarDetalleTarifaLocal(int codigoTarifaLocal)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var ofiltro = new RequestConsultaDetalleTarifaLocalViewModel
                {
                    filtro = { CodigoTarifaLocal = codigoTarifaLocal }
                };
                if (ModelState.IsValid)
                {
                    var oTarifaLocal = new TarifasAgente().ConsultarDetalleTarifaLocal(ofiltro);
                    if (oTarifaLocal != null)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(oTarifaLocal));
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
        /// Consultar tarifa local
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult ConsultarHistorialTarifaLocal(RequestConsultaHistorialTarifaLocalViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaHistorialTarifaLocal");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestConsultaHistorialTarifaLocalViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().ConsultarHistorialTarifaLocal(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.TarifaLocalHistorialList, filtros.paginacionDTO.IdGrilla, "CodigoTarifaLocalHistorial", Request.QueryString["export"], Response, "Historial_tarifa_local_");
                    }
                    else
                    {
                        var listTarifaLocal = new TarifasAgente().ConsultarHistorialTarifaLocal(filtros);
                        if (listTarifaLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listTarifaLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listTarifaLocal.TarifaLocalHistorialList, filtros.paginacionDTO.GetNroPagina(), listTarifaLocal.TotalRegistros, totalPages, "CodigoTarifaLocalHistorial");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listTarifaLocal.TarifaLocalHistorialList, 0, 0, 0));
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

        public ActionResult ActualizarTarifaLocal(RequestActualizarTarifaLocaViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = Helpers.Helper.GetUsuarioCliente();
                //request.Accion = "U";
                if (usuario != null)
                {
                    request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                }
                request.ValidarTarifaEnAC = false;
                var responseListarSucursal = new TarifasAgente().ActualizarTarifaLocal(request);
                actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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

        public ActionResult DeshabilitarTarifaLocal(RequestActualizarTarifaLocaViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                request.EstadoRegistro = "Inactivo";
                request.Accion = "U";
                request.ValidarTarifaEnAC = true;
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                }
                var responseListarSucursal = new TarifasAgente().ActualizarTarifaLocal(request);
                actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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
        public ActionResult DeshabilitarTarifaLocalConfirmado(RequestActualizarTarifaLocaViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                request.EstadoRegistro = "Inactivo";
                request.Accion = "U";
                request.ValidarTarifaEnAC = false;
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                }
                var responseListarSucursal = new TarifasAgente().ActualizarTarifaLocal(request);
                actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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

        public ActionResult ConsultaTarifaLigadaXVigencia(int codigoTarifaLocalVigencia, string codigoLinea)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    var response = new TarifasAgente().ConsultaTarifaLigadaXVigencia(codigoTarifaLocalVigencia, codigoLinea);
                    if (response != null)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(response));
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