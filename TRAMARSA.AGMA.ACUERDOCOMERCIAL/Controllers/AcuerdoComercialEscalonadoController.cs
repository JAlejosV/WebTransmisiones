using System;
using System.Configuration;
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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class AcuerdoComercialEscalonadoController : Controller
    {

        public ActionResult BuscarAcuerdoEscalonado()
        {
            return View("../Acuerdos/BuscarAcuerdoEscalonado");
        }
        public ActionResult RegistrarAcuerdoEscalonado()
        {
            return View("../Acuerdos/RegistrarAcuerdoEscalonado");
        }
        public ActionResult SeguimientoAcuerdoEscalonado()
        {
            return View("../Acuerdos/SeguimientoAcuerdoEscalonado");
        }

        public ActionResult HistorialAcuerdoEscalonado()
        {
            return View("../Acuerdos/HistorialAcuerdoEscalonado");
        }
        public ActionResult RegistrarConfiguracionTarifaAcEscalonado()
        {
            return View("../Acuerdos/RegistrarConfiguracionTarifaAcEscalonado");
        }
        /// <summary>
        /// Grabar Acuerdo Comercial Escalonado 
        /// </summary>
        /// <returns></returns>
        public ActionResult GrabarAcuerdoComercialEscalonadoCargaInicial()
        {
            var registraAcuerdoComercialVm = new RegistrarAcuerdoComercialEscalonadoViewModel();

            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();

            try
            {
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                var responseListaMoneda = new MaestrosAgente().ListarMoneda();
                var codTarifa = ConfigurationManager.AppSettings["CodTarifaDefault"];
                var codigoConcepto = ConfigurationManager.AppSettings["CodigoConceptoDefault"];
                string codTarifaDefault = new MaestrosAgente().ObtenerParametroNegocio(codTarifa).Valor;
                string codigoConceptoDefault = new MaestrosAgente().ObtenerParametroNegocio(codigoConcepto).Valor;
                registraAcuerdoComercialVm.BaseAce = new AcuerdoComercialAgente().ConsultarAcuerdoComercialEscalonadoTarifaBase(codigoConceptoDefault, codTarifaDefault);
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

                registraAcuerdoComercialVm.ListaTipoCobro = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                             where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoCobroAcuerdo)
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
        /// Carga inicial de seguimiento de AC Escalonado
        /// </summary>
        /// <returns></returns>
        public ActionResult SeguimientoAcEscalonadoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexSeguimiento = new ResponseSeguimientoACEscalonadoIndexViewModel();
            try
            {
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                var responseListarLinea = new MaestrosAgente().ListarLinea();
              
                var ListRolRatp = new List<ListaRolClienteViewModel>();
                var listaDcRolRatp = responseListaDetalleCatalogo.DetalleCatalogoList.Where(x => x.IdCatalogo == Convert.ToInt32(TablaTablas.RolRatp)).ToList();
                listaDcRolRatp.ForEach(x =>
                {
                    ListaRolClienteViewModel obj = new ListaRolClienteViewModel();
                    obj.Codigo = x.Valor1.ToString().Trim();
                    obj.Descripcion = x.Valor1.ToString().Trim() + " - " + x.Descripcion;
                    ListRolRatp.Add(obj);
                });
                indexSeguimiento.Rol = ListRolRatp;

                indexSeguimiento.Linea = (from item in responseListarLinea.LineasList select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

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
        public ActionResult SeguimientoAcEscalonado(RequestSeguimientoACEscalonadoViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_SeguimientoACEscalonado");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestSeguimientoACEscalonadoViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().SeguimientoAcEscalonado(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.SeguimientoAcuerdoComercialEscalonadoList, filtros.paginacionDTO.IdGrilla, "CodigoAcuerdoComercialEscalonado", Request.QueryString["export"], Response, "Seguimiento_de_acuerdo_comercial_escalonado_");
                    }
                    else
                    {
                        var listaAcLocal = new TarifasAgente().SeguimientoAcEscalonado(filtros);
                        if (listaAcLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaAcLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaAcLocal.SeguimientoAcuerdoComercialEscalonadoList, filtros.paginacionDTO.GetNroPagina(), listaAcLocal.TotalRegistros, totalPages, "CodigoAcuerdoComercialEscalonado");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaAcLocal.SeguimientoAcuerdoComercialEscalonadoList, 0, 0, 0));
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
        /// Carga inicial de búsqueda de ACE
        /// </summary>
        /// <returns></returns>
        public ActionResult BusquedaAcEscalonadoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var registraTarifaVm = new ResponseBusquedaACEscalonadoIndexViewModel();
            try
            {
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                registraTarifaVm.Linea = (from item in responseListarLinea.LineasList
                                          select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                //var registraTarifaVm = new ResponseBusquedaACEscalonadoIndexViewModel();
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());

                //var listaClienteMaster = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                //                          where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlMaster)
                //                          select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                //var listaClienteHouse = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                //                         where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlHouse)
                //                         select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                //var roles = new MaestrosAgente().ListarRolCliente();

                //var listaRolesMasterHouse =
                //                        listaClienteMaster.Union(listaClienteHouse)
                //                            .GroupBy(c => c.Codigo)
                //                            .Select(group => group.First())
                //                            .ToList();
                //roles.ListaRolesClientes = (from xx in roles.ListaRolesClientes join yy in listaRolesMasterHouse on xx.Codigo equals yy.Codigo select xx).ToList();


                //registraTarifaVm.Rol = (from item in roles.ListaRolesClientes
                //                        select GR.Frameworks.Helper.MiMapper<ListaRolClienteDTO, ListaRolClienteViewModel>(item)).ToList();
                var ListRolRatp = new List<ListaRolClienteViewModel>();
                var listaDcRolRatp = responseListaDetalleCatalogo.DetalleCatalogoList.Where(x => x.IdCatalogo == Convert.ToInt32(TablaTablas.RolRatp)).ToList();
                listaDcRolRatp.ForEach(x =>
                {
                    ListaRolClienteViewModel obj = new ListaRolClienteViewModel();
                    obj.Codigo = x.Valor1.ToString().Trim();
                    obj.Descripcion = x.Valor1.ToString().Trim() + " - " + x.Descripcion;
                    ListRolRatp.Add(obj);
                });
                registraTarifaVm.Rol = ListRolRatp;
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
        /// Busqueda de acuerdo comercial escalonado
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult BusquedaAcEscalonado(RequestBusquedaACEscalonadoViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaACEscalonado");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaACEscalonadoViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new TarifasAgente().BusquedaAcEscalonado(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.AcuerdoComercialEscalonadoList, filtros.paginacionDTO.IdGrilla, "CodigoAcuerdoComercialEscalonado", Request.QueryString["export"], Response, "Lista_de_acuerdo_comercial_escalonado_");
                    }
                    else
                    {
                        var listaAcLocal = new TarifasAgente().BusquedaAcEscalonado(filtros);
                        if (listaAcLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaAcLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaAcLocal.AcuerdoComercialEscalonadoList, filtros.paginacionDTO.GetNroPagina(), listaAcLocal.TotalRegistros, totalPages, "CodigoAcuerdoComercialEscalonado");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaAcLocal.AcuerdoComercialEscalonadoList, 0, 0, 0));
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
        public ActionResult GrabarAcuerdoComercial(RequestRegistrarAcuerdoComercialEscalonadoViewModel request)
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
                var response = new AcuerdoComercialAgente().RegistroAcuerdoComercialEscolonado(request);
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
        /// Consultr detalle de AC Escalonado
        /// </summary>
        /// <param name="codigoAcuerdoComercialEscalonado"></param>
        /// <returns></returns>
        public ActionResult ConsultarDetalleAcuerdoComercial(int codigoAcuerdoComercialEscalonado)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var ofiltro = new RequestConsultaDetalleAcuerdoComercialEscalonadoViewModel
                {
                    filtro = { CodigoAcuerdoComercialEscalonado = codigoAcuerdoComercialEscalonado }
                };
                if (ModelState.IsValid)
                {
                    var oAcuerdoComercial = new AcuerdoComercialAgente().ConsultarDetalleAcuerdoComercialEscalonado(ofiltro);
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
        /// Consultar Historial Escalonado
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult ConsultarHistorialACEscalonado(RequestHistorialACEscalonadoViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ConsultaHistorialACEscalonado");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestHistorialACEscalonadoViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new AcuerdoComercialAgente().ConsultarHistorialACEscalonado(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.AcuerdoComercialEscalonadoHistorialList, filtros.paginacionDTO.IdGrilla, "CodigoAcuerdoComercialEscalonadoHistorial", Request.QueryString["export"], Response, "Historial_acuerdo_comercial_escalonado_");
                    }
                    else
                    {
                        var listTarifaLocal = new AcuerdoComercialAgente().ConsultarHistorialACEscalonado(filtros);
                        if (listTarifaLocal.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listTarifaLocal.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listTarifaLocal.AcuerdoComercialEscalonadoHistorialList, filtros.paginacionDTO.GetNroPagina(), listTarifaLocal.TotalRegistros, totalPages, "CodigoAcuerdoComercialEscalonadoHistorial");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listTarifaLocal.AcuerdoComercialEscalonadoHistorialList, 0, 0, 0));
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
        /// Deshabilitar  AC Escalonado
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ActionResult DeshabilitarAcuerdoComercialEscalonado(RequestRegistrarAcuerdoComercialEscalonadoViewModel request)
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
                var response = new AcuerdoComercialAgente().RegistroAcuerdoComercialEscolonado(request);
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
        /// Carga inicial de Configuración de tarifa
        /// </summary>
        /// <returns></returns>
        public ActionResult ConfiguracionTarifaIndex()
        {
            var response = new RegistrarAcuerdoComercialEscalonadoConfiguracionTarifaViewModel();
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                response.ListaTipoFechaCalculo = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                  where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoFechaCalculo)
                                                  select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                response.ListaTipoDiaCalculo = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                                where item.IdCatalogo == Convert.ToInt32(TablaTablas.TipoDias)
                                                select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                actionResult = Content(JsonConvert.SerializeObject(response));
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