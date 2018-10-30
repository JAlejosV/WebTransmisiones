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
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using System.Resources;

//using System.Drawing.Image;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class MaestrosController : Controller
    {
        #region "Datos Inicial Aplicacion"
        public ActionResult CargaInicialAplicacion()
        {
            ActionResult actionResult = null;
            ManejadorLogEventos manejadorLogEventos = new ManejadorLogEventos();
            RequestConsultaParametroNegocio requestParametroNegocio = new RequestConsultaParametroNegocio();
            ResponseCargaInicial response = new ResponseCargaInicial();
            ResponseUsuarioMscDTO usuario = HelperSeguridad.ObtenerSessionUsuarioMsc();
            ListaTipoCambioViewModel request = new ListaTipoCambioViewModel();
            ResponseListarTipoCambio responseListarTipoCambio = new ResponseListarTipoCambio();
            try
            {
                request.CodigoMoneda = ConfigurationManager.AppSettings["strDefaultMonedaTipoCambio"];
                request.Fecha = DateTime.Now;
                responseListarTipoCambio = new MaestrosAgente().ListarTipoCambio(GR.Frameworks.Helper.MiMapper<ListaTipoCambioViewModel, RequestBusquedaTipoCambio>(request));
                response.TipoCambio = responseListarTipoCambio;
                response.PermisosBotones = usuario.Usuario.PermisosBotones;
                response.Resultado = new Result { Satisfactorio = true };
                actionResult = Json(JsonConvert.SerializeObject(response), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                response.Resultado = new Result();
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Web);
            }
            return actionResult;
        }
        #endregion
        /// <summary>
        /// Consulta Tarifa
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultaSucursal(RequestConsultaSucursalViewModel filtros)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    var listaConsultaSucursalesViewModel = new MaestrosAgente().ListarSucursal();
                    int nroRegistros = 0;
                    string columnaOrden = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    listaConsultaSucursalesViewModel.SucursalesList = PaginacionBL.PaginarLista(listaConsultaSucursalesViewModel.SucursalesList,
                                                                        filtros.paginacionDTO, out nroRegistros, columnaOrden);
                    listaConsultaSucursalesViewModel.TotalRegistros = nroRegistros;

                    var res = Grid.toJSONFormat2(listaConsultaSucursalesViewModel.SucursalesList, filtros.paginacionDTO.GetNroPagina(),
                                                  listaConsultaSucursalesViewModel.TotalRegistros, listaConsultaSucursalesViewModel.TotalRegistros, columnaOrden);
                    return Content(res);
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
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                                                             MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }
        /// <summary>
        /// Consulta Terminal Portuario Test xxxx
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultaTerminalPortuario(RequestConsultaTerminalPortuarioViewModel filtros)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {

                    var listaConsultaTerminalPortuarioViewModel = new MaestrosAgente().ListarTerminalPortuario();
                    var nroRegistros = 0;
                    var columnaOrden = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    listaConsultaTerminalPortuarioViewModel.TerminalPortuarioList = PaginacionBL.PaginarLista(listaConsultaTerminalPortuarioViewModel.TerminalPortuarioList,
                                                                                                        filtros.paginacionDTO, out nroRegistros, columnaOrden);
                    listaConsultaTerminalPortuarioViewModel.TotalRegistros = nroRegistros;
                    var res = Grid.toJSONFormat2(listaConsultaTerminalPortuarioViewModel.TerminalPortuarioList,
                                                 filtros.paginacionDTO.GetNroPagina(),
                                                  listaConsultaTerminalPortuarioViewModel.TotalRegistros,
                                                  listaConsultaTerminalPortuarioViewModel.TotalRegistros, columnaOrden);
                    return Content(res);

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
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                                                            MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }
        /// <summary>
        /// Consulta Puertos xxxx
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        //public ActionResult ConsultaPuertos(RequestConsultaPuertoViewModel filtros)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {

        //            var listaConsultaPuertoViewModel = new MaestrosAgente().ListarPuerto();
        //            var nroRegistros = 0;
        //            var columnaOrden = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
        //            listaConsultaPuertoViewModel.PuertosList = PaginacionBL.PaginarLista(listaConsultaPuertoViewModel.PuertosList,
        //                                                                                filtros.paginacionDTO, out nroRegistros, columnaOrden);
        //            listaConsultaPuertoViewModel.TotalRegistros = nroRegistros;
        //            var res = Grid.toJSONFormat2(listaConsultaPuertoViewModel.PuertosList, filtros.paginacionDTO.GetNroPagina(),
        //                                      listaConsultaPuertoViewModel.TotalRegistros, listaConsultaPuertoViewModel.TotalRegistros, columnaOrden);
        //            return Content(res);
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
        //        manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
        //                                                    MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        /// <summary>
        /// Consulta distribución de tarifas 2
        /// <param name="filtros"></param>
        /// </summary>
        /// <returns></returns>
        public ActionResult BusquedaDistribucionTarifa(RequestBusquedaDistribucionTarifaViewModel filtros)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    var listaDisTarifa = new TarifasAgente().ListarDistribucionTarifa(filtros);
                    //if (listaDisTarifa.Result.Satisfactorio)
                    //{
                    return Content(JsonConvert.SerializeObject(listaDisTarifa));
                    //}
                    //else
                    //{
                    //    actionResult = Content(Grid.toJSONFormat2(listaDisTarifa.DistribucionTarifasList, 0, 0, 0, ""));
                    //}
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

        public List<ListaDetalleCatalagoViewModel> ListarRegimen()
        {
            var maestrosAgente = new MaestrosAgente();

            var request = new RequestConsultaDetalleCatalogoViewModel();
            var responseListaDetalleCatalogo = maestrosAgente.ListarDetalleCatalogo(request);

            var regimen = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                           where item.IdCatalogo == Convert.ToInt32(TablaTablas.Regimen)
                           select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

            return regimen;

        }

        public List<ListaDetalleCatalagoViewModel> ListarTipoVigencia()
        {
            var maestrosAgente = new MaestrosAgente();

            var request = new RequestConsultaDetalleCatalogoViewModel();
            //request.filtro.DescripcionCatalogo = Convert.ToString(KeyCache.TipoVigencia);
            var responseListaDetalleCatalogo = maestrosAgente.ListarDetalleCatalogo(request);


            var regimen = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                           select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

            return regimen;

        }

        /// <summary>
        /// Carga de terminal portuarioa by codigo de sucursal
        /// </summary>
        /// <returns></returns>
        public ActionResult ListarTerminalPortuarioBySucursal(string codigoSucursal)
        {

            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var registraTarifaVm = new ListaBusquedaTarifaLocalViewModel();
            try
            {
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuarioBySucursal(codigoSucursal);
                registraTarifaVm.TerminalPorturario = (from item in responseListarTerminalPortuario.TerminalPortuarioList
                                                       orderby item.NombreAlmacen ascending
                                                       select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item)).ToList();
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

        public ActionResult ListarSucursalByLinea(string codigoLinea)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var responseSucursal = new MaestrosAgente().ListarSucursalByLinea(codigoLinea);
                //responseIndex.Sucursal = (from item in responseSucursal.SucursalesList
                //                          select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(responseSucursal));
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

        // JAVRoles ActionResult
        public ActionResult ListarRol()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var responseRol = new MaestrosAgente().ListarRol();
                actionResult = Content(JsonConvert.SerializeObject(responseRol));
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

        public ActionResult ListarTerminalPortuarioByLineaSucursal(string codigoLinea, string codigoSucursal)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var registraTarifaVm = new ListaBusquedaTarifaLocalViewModel();
            try
            {
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuarioByLineaSucursal(codigoLinea,codigoSucursal);
                registraTarifaVm.TerminalPorturario = (from item in responseListarTerminalPortuario.TerminalPortuarioList
                                                       orderby item.NombreAlmacen ascending
                                                       select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item)).ToList();
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
        /// Obtener Configuracion Linea
        /// </summary>
        /// <returns></returns>
        public ActionResult ObtenerConfiguracionLinea()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var responseConfiguracionLinea = new MaestrosAgente().ObtenerConfiguracionLinea();
                actionResult = Content(JsonConvert.SerializeObject(responseConfiguracionLinea));
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
        /// Carga de terminal portuarioa by codigo de sucursal
        /// </summary>
        /// <returns></returns>
        public ActionResult ListarTerminalPortuarioTodos()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var registraTarifaVm = new ListaBusquedaTarifaLocalViewModel();
            try
            {
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuarioTodos();
                registraTarifaVm.TerminalPorturario = (from item in responseListarTerminalPortuario.TerminalPortuarioList
                                                       select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item)).ToList();
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

        public ActionResult LimpiarDatosCache()
        {
            ActionResult actionResult = null;
            foreach (var value in Enum.GetValues(typeof(KeyCache)))
            {
                ManejadorCache manejadorCache = new ManejadorCache();
                manejadorCache.EliminarValorCache(value.ToString());
            }
            var oResult = new MaestrosAgente().LimpiarDatosCache();
            actionResult = Content(JsonConvert.SerializeObject(oResult));
            return actionResult;
        }
 
    }
}