using System;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using GR.Frameworks;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.ViewModel;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class AcuerdoComercialLocalController : Controller
    {
        public ActionResult BuscarAcuerdoLocal()
        {
            return View("../Acuerdos/BuscarAcuerdoLocal");
        }
        public ActionResult RegistrarAcuerdoLocal()
        {
            return View("../Acuerdos/RegistrarAcuerdoLocal");
        }
        public ActionResult RegistrarConfiguracionTarifa()
        {
            return View("../Acuerdos/RegistrarConfiguracionTarifa");
        }

        public ActionResult SeguimientoAcuerdoLocal()
        {
            return View("../Acuerdos/SeguimientoAcuerdoLocal");
        }

        public ActionResult HistorialAcuerdoComercialLocal()
        {
            return View("../Acuerdos/HistorialAcuerdoComercialLocal");
        }


        /// <summary>
        /// Grabar Acuerdo Comercial Local 
        /// </summary>
        /// <returns></returns>
        public ActionResult GrabarAcuerdoComercialLocalCargaInicial()
        {
            var registraAcuerdoComercialVm = new RegistrarAcuerdoComercialViewModel();

            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();

            try
            {
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                var responseListaMoneda = new MaestrosAgente().ListarMoneda();
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                registraAcuerdoComercialVm.Tipo = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                   where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoCriterio)
                                                   select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                registraAcuerdoComercialVm.Sucursal = (from item in responseListarSucursal.SucursalesList
                                                       select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();

                registraAcuerdoComercialVm.TerminalPorturario =
                    (from item in responseListarTerminalPortuario.TerminalPortuarioList
                     select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item))
                        .ToList();

                registraAcuerdoComercialVm.Linea = (from item in responseListarLinea.LineasList
                                                    select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                registraAcuerdoComercialVm.TipoPuerto = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                         where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoPuerto)
                                                         select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                registraAcuerdoComercialVm.TipoDescuento = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                            where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoDescuento)
                                                            select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                registraAcuerdoComercialVm.MonedaAcuerdo = (from item in responseListaMoneda.MonedaList
                                                            select HelperCtrl.MiMapper<ListaMonedaDTO, ListaMonedaViewModel>(item)).ToList();

                registraAcuerdoComercialVm.Codicion = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                       where item.IdCatalogo == Convert.ToInt32(TablaTablas.Condicion)
                                                       select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                registraAcuerdoComercialVm.TipoCarga = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                        where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoCarga)
                                                        select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();


                var ListRolRatp = new List<ListaRolClienteViewModel>();
                var listaDcRolRatp = responseListaDetalleCatalogo.DetalleCatalogoList.Where(x => x.IdCatalogo == Convert.ToInt32(TablaTablas.RolRatp)).ToList();
                listaDcRolRatp.ForEach(x =>
                {
                    ListaRolClienteViewModel obj = new ListaRolClienteViewModel();
                    obj.Codigo = x.Valor1.ToString().Trim();
                    obj.Descripcion = x.Valor1.ToString().Trim() + " - " + x.Descripcion;
                    ListRolRatp.Add(obj);
                });

                registraAcuerdoComercialVm.ListaRol = ListRolRatp;

                actionResult = Content(JsonConvert.SerializeObject(registraAcuerdoComercialVm));
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
        /// Carga inicial de búsqueda de AC Local
        /// </summary>
        /// <returns></returns>
        public ActionResult BusquedaAcLocalIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var registraTarifaVm = new ResponseBusquedaACLocalIndexViewModel();
            try
            {
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                registraTarifaVm.Linea = (from item in responseListarLinea.LineasList
                                          select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                // ROLC LCIENTE
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());

                var listaClienteMaster = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                          where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlMaster)
                                          select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                var listaClienteHouse = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                         where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlHouse)
                                         select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                var roles = new MaestrosAgente().ListarRolCliente();

                var listaRolesMasterHouse =
                                        listaClienteMaster.Union(listaClienteHouse)
                                            .GroupBy(c => c.Codigo)
                                            .Select(group => group.First())
                                            .ToList();
                roles.ListaRolesClientes = (from xx in roles.ListaRolesClientes join yy in listaRolesMasterHouse on xx.Codigo equals yy.Codigo select xx).ToList();
                registraTarifaVm.Rol = (from item in roles.ListaRolesClientes
                                        select GR.Frameworks.Helper.MiMapper<ListaRolClienteDTO, ListaRolClienteViewModel>(item)).ToList();

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

        /// <summary>
        /// Busqueda de acuerdo comercial
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult BusquedaAcLocal(RequestBusquedaACLocallViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaACLocal");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaACLocallViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().BusquedaACLocal(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.AcuerdoComercialLocalList, filtros.paginacionDTO.IdGrilla, "CodigoAcuerdoComercialLocal", Request.QueryString["export"], Response, "Lista_de_acuerdo_comercial_local_");
                    }
                    else
                    {
                        var listaAcLocal = new TarifasAgente().BusquedaACLocal(filtros);
                        if (listaAcLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaAcLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaAcLocal.AcuerdoComercialLocalList, filtros.paginacionDTO.GetNroPagina(), listaAcLocal.TotalRegistros, totalPages, "CodigoAcuerdoComercialLocal");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaAcLocal.AcuerdoComercialLocalList, 0, 0, 0));
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
        /// GrabarAcuerdoComercial
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ActionResult GrabarAcuerdoComercial(ActualizaAcuerdoComercialLocalRequestViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    if (request.Accion == "U" || request.Accion == "N")
                    {
                        request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                    }
                    else if (request.Accion == "I")
                    {
                        request.UsuarioCreacion = usuario.Usuario.CodigoUsuario;
                    }
                }
                var response = new AcuerdoComercialAgente().RegistroAcuerdoComercial(request);
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
        /// ConsultarDetalleAcuerdoComercial
        /// </summary>
        /// <param name="codigoTarifaLocal"></param>
        /// <returns></returns>
        public ActionResult ConsultarDetalleAcuerdoComercial(int codigoAcuerdoComercial)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var ofiltro = new RequestConsultaDetalleAcuerdoComercialViewModel
                {
                    filtro = { CodigoAcuerdoComercialLocal = codigoAcuerdoComercial }
                };
                if (ModelState.IsValid)
                {
                    var oAcuerdoComercial = new AcuerdoComercialAgente().ConsultarDetalleAcuerdoComercial(ofiltro);
                    if (oAcuerdoComercial != null)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(oAcuerdoComercial));
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
        /// Deshabilitar  AC Local
        /// </summary>
        /// <param name="codigoAcuerdoComercial"></param>
        /// <returns></returns>
        public ActionResult DeshabilitarAcuerdoComercialLocal(ActualizaAcuerdoComercialLocalRequestViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                request.EstadoRegistro = false;
                request.Estado = "D";
                request.Accion = "U";
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                }
                var response = new AcuerdoComercialAgente().RegistroAcuerdoComercial(request);
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
        /// Consultar Historial
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult ConsultarHistorialACLocal(RequestHistorialACLocalViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaHistorialACLocal");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestHistorialACLocalViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().ConsultarHistorialACLocal(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.AcuerdoComercialLocalHistorialList, filtros.paginacionDTO.IdGrilla, "CodigoAcuerdoComercialLocalHistorial", Request.QueryString["export"], Response, "Historial_acuerdo_comercial_local_");
                    }
                    else
                    {
                        var listTarifaLocal = new TarifasAgente().ConsultarHistorialACLocal(filtros);
                        if (listTarifaLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listTarifaLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listTarifaLocal.AcuerdoComercialLocalHistorialList, filtros.paginacionDTO.GetNroPagina(), listTarifaLocal.TotalRegistros, totalPages, "CodigoAcuerdoComercialLocalHistorial");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listTarifaLocal.AcuerdoComercialLocalHistorialList, 0, 0, 0));
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
        /// Carga inicial de seguimiento de AC Local
        /// </summary>
        /// <returns></returns>
        public ActionResult SeguimientoAcLocalIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexSeguimiento = new ResponseSeguimientoACLocalIndexViewModel();
            try
            {
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                var roles = new MaestrosAgente().ListarRolCliente();

                var listaClienteMaster = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                          where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlMaster)
                                          select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                var listaClienteHouse = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                         where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlHouse)
                                         select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();
                var listaRolesMasterHouse =
                     listaClienteMaster.Union(listaClienteHouse)
                         .GroupBy(c => c.Codigo)
                         .Select(group => group.First())
                         .ToList();
                roles.ListaRolesClientes = (from xx in roles.ListaRolesClientes join yy in listaRolesMasterHouse on xx.Codigo equals yy.Codigo select xx).ToList();

                indexSeguimiento.Linea = (from item in responseListarLinea.LineasList select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                indexSeguimiento.Rol = (from item in roles.ListaRolesClientes
                                        select GR.Frameworks.Helper.MiMapper<ListaRolClienteDTO, ListaRolClienteViewModel>(item)).ToList();
                indexSeguimiento.Estados = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                            where item.IdCatalogo == Convert.ToInt32(TablaTablas.EstadoAcuerdoComercial)
                                            select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();
                indexSeguimiento.FechaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddDays(-30));
                indexSeguimiento.FechaFinDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                actionResult = Content(JsonConvert.SerializeObject(indexSeguimiento));
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
        /// Seguimiento de acuerdo comercial local
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult SeguimientoAcLocal(RequestSeguimientoACLocalViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_SeguimientoACLocal");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestSeguimientoACLocalViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().SeguimientoAcLocal(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.SeguimientoAcuerdoComercialLocalList, filtros.paginacionDTO.IdGrilla, "CodigoAcuerdoComercialLocal", Request.QueryString["export"], Response, "Seguimiento_de_acuerdo_comercial_local_");
                    }
                    else
                    {
                        var listaAcLocal = new TarifasAgente().SeguimientoAcLocal(filtros);
                        if (listaAcLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaAcLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaAcLocal.SeguimientoAcuerdoComercialLocalList, filtros.paginacionDTO.GetNroPagina(), listaAcLocal.TotalRegistros, totalPages, "CodigoAcuerdoComercialLocal");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaAcLocal.SeguimientoAcuerdoComercialLocalList, 0, 0, 0));
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