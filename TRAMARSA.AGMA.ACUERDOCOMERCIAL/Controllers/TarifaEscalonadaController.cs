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
    public class TarifaEscalonadaController : Controller
    {
        //public ActionResult BuscarTarifaEscalonada()
        //{
        //    return View("../Tarifas/BuscarTarifaEscalonada");
        //}
        //public ActionResult RegistrarTarifaEscalonada()
        //{
        //    return View("../Tarifas/RegistrarTarifaEscalonada");
        //}
        //public ActionResult HistorialTarifaEscalonada()
        //{
        //    return View("../Tarifas/HistorialTarifaEscalonada");
        //}

        //public ActionResult BuscarTarifaEscalonadaGeneral()
        //{
        //    return View("../Tarifas/BuscarTarifaEscalonadaGeneral");
        //}

        ///// <summary>
        ///// Búsqueda de tarifa escalonada
        ///// Búsqueda de tarifa escalonada general
        ///// </summary>
        ///// <param name="filtros"></param>
        ///// <returns></returns>
        //public ActionResult BusquedaTarifaEscalonada(RequestBusquedaTarifaEscalonadaViewModel filtros, string requestExportar)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            if (!string.IsNullOrEmpty(Request.QueryString["export"]))
        //            {
        //                var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas",
        //                    Assembly.GetExecutingAssembly());
        //                var idGrilla = rm.GetString("IdGrilla_ConsultaTarifaEscalonada");
        //                filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaTarifaEscalonadaViewModel>(requestExportar);
        //                if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
        //                filtros.paginacionDTO.sord =
        //                    new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
        //                filtros.paginacionDTO.rows = 9999;
        //                filtros.paginacionDTO.page = 1;
        //                var listaRespuesta = new TarifasAgente().BusquedaTarifaEscalonada(filtros);
        //                listaRespuesta.NroPagina = 1;
        //                actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.TarifaEscalonadaList, filtros.paginacionDTO.IdGrilla, "CodigoTarifaEscalonada", Request.QueryString["export"], Response, "Lista_de_tarifa_escalonada_");
        //            }
        //            else
        //            {
        //                var listTarifaLocal = new TarifasAgente().BusquedaTarifaEscalonada(filtros);
        //                if (listTarifaLocal.Result.Satisfactorio)
        //                {
        //                    var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listTarifaLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
        //                    var res = Grid.toJSONFormat2(listTarifaLocal.TarifaEscalonadaList, filtros.paginacionDTO.GetNroPagina(), listTarifaLocal.TotalRegistros, totalPages, "CodigoTarifaEscalonada");
        //                    actionResult = Content(res);
        //                }
        //                else
        //                {
        //                    actionResult = Content(Grid.toJSONFormat2(listTarifaLocal.TarifaEscalonadaList, 0, 0, 0));
        //                }
        //            }
        //        }
        //        else
        //        {
        //            var cadena = string.Empty;
        //            var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
        //            actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("",
        //            HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(),
        //                MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        ///// <summary>
        ///// Consultar tarifa escalonada
        ///// </summary>
        ///// <param name="filtros"></param>
        ///// <returns></returns>
        //public ActionResult ConsultarHistorialTarifaEscalonada(ResquestConsultaHistorialTarifaEscalonadaViewModel filtros, string requestExportar)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            if (!string.IsNullOrEmpty(Request.QueryString["export"]))
        //            {
        //                var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
        //                var idGrilla = rm.GetString("IdGrilla_ConsultaHistorialTarifaEscalonada");
        //                filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<ResquestConsultaHistorialTarifaEscalonadaViewModel>(requestExportar);
        //                if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
        //                filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
        //                filtros.paginacionDTO.rows = 9999;
        //                filtros.paginacionDTO.page = 1;
        //                var listaRespuesta = new TarifasAgente().ConsultarHistorialTarifaEscalonada(filtros);
        //                listaRespuesta.NroPagina = 1;
        //                actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.TarifaEscalonadaHistorialList, filtros.paginacionDTO.IdGrilla, "CodigoTarifaEscalonadaHistorial", Request.QueryString["export"], Response, "Historial_Tarifa_Escalonada_");
        //            }
        //            else
        //            {
        //                var listaTarifaEscalonada = new TarifasAgente().ConsultarHistorialTarifaEscalonada(filtros);
        //                if (listaTarifaEscalonada.Result.Satisfactorio)
        //                {
        //                    var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaTarifaEscalonada.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
        //                    var res = Grid.toJSONFormat2(listaTarifaEscalonada.TarifaEscalonadaHistorialList, filtros.paginacionDTO.GetNroPagina(), listaTarifaEscalonada.TotalRegistros, totalPages, "CodigoTarifaEscalonadaHistorial");
        //                    actionResult = Content(res);
        //                }
        //                else
        //                {
        //                    actionResult = Content(Grid.toJSONFormat2(listaTarifaEscalonada.TarifaEscalonadaHistorialList, 0, 0, 0));
        //                }
        //            }
        //        }
        //        else
        //        {
        //            var cadena = string.Empty;
        //            var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
        //            actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("",
        //            HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(),
        //                MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        ///// <summary>
        ///// Carga inicial de búsqueda de tarifa Escalonada
        ///// Carga inicial de búsqueda de tarifa Escalonada General
        ///// </summary>
        ///// <returns></returns>
        //public ActionResult BusquedaTarifaEscalonadaIndex()
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    var registraTarifaVm = new ListaBusquedaTarifaEscalonadaViewModel();
        //    try
        //    {
        //        var responseParametroNegocio = new MaestrosAgente().ListarParametrosNegocio();
        //        //var tipoContenedor = new MaestrosAgente().ListarContenedor();
        //        var responseListarLinea = new MaestrosAgente().ListarLinea();
        //        //registraTarifaVm.Contenedor = (from item in tipoContenedor.TipoContenedorList
        //        //                               select HelperCtrl.MiMapper<ListaTipoContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();

        //        registraTarifaVm.Linea = (from item in responseListarLinea.LineasList
        //                                  select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

        //        registraTarifaVm.FechaVigencia = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
        //        if (responseParametroNegocio.ParametrosNegocioList.Count > 0)
        //        {

        //            var TipoDescuento = responseParametroNegocio.ParametrosNegocioList.Where(c => c.Codigo == ParametrosNegocio.TipoDescuentoTarifaACEscalonado).ToList();
        //            if (TipoDescuento.Count > 0)
        //            {
        //                registraTarifaVm.TipoDescuentoDefault = TipoDescuento[0].Valor;
        //            }
        //            var Moneda = responseParametroNegocio.ParametrosNegocioList.Where(c => c.Codigo == ParametrosNegocio.MonedaTarifaACEscalonado).ToList();
        //            if (Moneda.Count > 0)
        //            {
        //                registraTarifaVm.MonedaDefault = Moneda[0].Valor;
        //            }
        //            var MontoAcuerdo = responseParametroNegocio.ParametrosNegocioList.Where(c => c.Codigo == ParametrosNegocio.MontoAcuerdoTarifaACEscalonado).ToList();
        //            if (TipoDescuento.Count > 0)
        //            {
        //                registraTarifaVm.MontoAcuerdoDefault = MontoAcuerdo[0].Valor;
        //            }
        //        }

        //        actionResult = Content(JsonConvert.SerializeObject(registraTarifaVm));
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

        ///// <summary>
        ///// Grabar Tarifa Escalonada 
        ///// </summary>
        ///// <returns></returns>
        //public ActionResult GrabarTarifaEscalonadaCargaInicial()
        //{
        //    var listaRegistraTarifaEscalonadaViewModel = new ListaRegistraTarifaEscalonadaViewModel();

        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();

        //    try
        //    {
        //        var responseListarSucursal = new MaestrosAgente().ListarSucursal();
        //        var responseListarLinea = new MaestrosAgente().ListarLinea();
        //        var responseListarTipoContenedor = new MaestrosAgente().ListarContenedor();
        //        var responseListarClaseContenedor = new MaestrosAgente().ListarClaseContenedor();
        //        var responseListarMoneda = new MaestrosAgente().ListarMoneda();

        //        var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());

        //        listaRegistraTarifaEscalonadaViewModel.Sucursal = (from item in responseListarSucursal.SucursalesList
        //                                                           orderby item.Nombre ascending
        //                                                           select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)
        //                                     ).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.Linea = (from item in responseListarLinea.LineasList
        //                                                        select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.ListaUnidadCalculo = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
        //                                                                     where item.IdCatalogo == Convert.ToInt32(TablaTablas.UnidadDeCalculo)
        //                                                                     select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.ListaTipoFechaCalculo = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
        //                                                                        where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoFechaCalculo)
        //                                                                        select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.ListaTipoDiaCalculo = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
        //                                                                      where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoDias)
        //                                                                      select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.ListaMonedas = (from item in responseListarMoneda.MonedaList
        //                                                               select HelperCtrl.MiMapper<ListaMonedaDTO, ListaMonedaViewModel>(item)).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.ListaCategoriaContenedor = (from item in responseListarClaseContenedor.ClaseContenedorList
        //                                                                           select HelperCtrl.MiMapper<ClaseContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.ListaTipoCobro = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
        //                                                                        where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoCobroTarifa)
        //                                                                        select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();
        //        actionResult = Content(JsonConvert.SerializeObject(listaRegistraTarifaEscalonadaViewModel));
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        ///// <summary>
        ///// Carga de Tipo Contenedor by codigo de Clase Contenedor
        ///// </summary>
        ///// <returns></returns>
        //public ActionResult ListarTipoContendorByClaseContenedor(string codigoClaseContenedor)
        //{
        //    var listaRegistraTarifaEscalonadaViewModel = new ListaRegistraTarifaEscalonadaViewModel();

        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();

        //    try
        //    {
        //        RequestBusquedaTipoContenedorViewModel requestTipoContenedor =
        //            new RequestBusquedaTipoContenedorViewModel
        //            {
        //                filtro = { CodigoClaseContenedor = codigoClaseContenedor }
        //            };
        //        var responseListarTipoContenedor = new MaestrosAgente().ListarTipoContenedor(requestTipoContenedor);

        //        listaRegistraTarifaEscalonadaViewModel.ListaTipoContenedor = (from item in responseListarTipoContenedor.TipoContenedorList
        //                                                                      select HelperCtrl.MiMapper<ListaTipoContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();


        //        actionResult = Content(JsonConvert.SerializeObject(listaRegistraTarifaEscalonadaViewModel));
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}
        ///// <summary>
        ///// Grabar Tarifa Escalonada
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public ActionResult GrabarTarifaEscalonada(RequestRegistrarTarifaEscalonadaViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.Usuario = usuario.Usuario.CodigoUsuario;
        //        }
        //        var responseListarSucursal = new TarifasAgente().RegistroTarifaEscalonada(request);
        //        actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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

        ///// <summary>
        ///// Consultar detalle tarifa local
        ///// </summary>
        ///// <param name="codigoTarifaEscalonada"></param>
        ///// <returns></returns>
        //public ActionResult ConsultarDetalleTarifaEscalonada(int codigoTarifaEscalonada)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var ofiltro = new RequestConsultaDetalleTarifaEscalonadaViewModel
        //        {
        //            filtro = { CodigoTarifaEscalonada = codigoTarifaEscalonada }
        //        };
        //        if (ModelState.IsValid)
        //        {
        //            var response = new TarifasAgente().ConsultarDetalleTarifaEscalonada(ofiltro);
        //            if (response != null)
        //            {
        //                actionResult = Content(JsonConvert.SerializeObject(response));
        //            }
        //        }
        //        else
        //        {
        //            var cadena = string.Empty;
        //            var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
        //            actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("",
        //            HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(),
        //                MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        ///// <summary>
        ///// Actualizar Tarifa Escalonada
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public ActionResult ActualizarTarifaEscalonada(RequestActualizarTarifaEscalonadaViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        //request.Accion = "U";
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
        //        }
        //        var responseListarSucursal = new TarifasAgente().ActualizarTarifaEscalonada(request);
        //        actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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

        ///// <summary>
        ///// Deshabilitar Tarifa Escalonada
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public ActionResult DeshabilitarTarifaEscalonada(RequestActualizarTarifaEscalonadaViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        request.EstadoRegistro = "Inactivo";
        //        request.Accion = "U";
        //        request.ValidarTarifaEnAC = true;
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
        //        }
        //        var responseListarSucursal = new TarifasAgente().ActualizarTarifaEscalonada(request);
        //        actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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
        ///// <summary>
        ///// Deshabilitar de todas maneras
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public ActionResult DeshabilitarTarifaEscalonadaConfirmado(RequestActualizarTarifaEscalonadaViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        request.EstadoRegistro = "Inactivo";
        //        request.Accion = "U";
        //        request.ValidarTarifaEnAC = false;
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
        //        }
        //        var responseListarSucursal = new TarifasAgente().ActualizarTarifaEscalonada(request);
        //        actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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

        ///// <summary>
        ///// ConsultarTarifasLigadasTarifaEscalonada
        ///// </summary>
        ///// <param name="codigoTarifaEscalonadaVigencia"></param>
        ///// <param name="codigoLinea"></param>
        ///// <returns></returns>
        //public ActionResult ConsultarLigadasPeriodosTarifaEscalonada(int codigoTarifaEscalonadaVigencia,string codigoLinea)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            var response = new TarifasAgente().ConsultarLigadasPeriodosTarifaEscalonada(codigoTarifaEscalonadaVigencia,codigoLinea);
        //            if (response != null)
        //            {
        //                actionResult = Content(JsonConvert.SerializeObject(response));
        //            }
        //        }
        //        else
        //        {
        //            var cadena = string.Empty;
        //            var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
        //            actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("",
        //            HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(),
        //                MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}
    }
}