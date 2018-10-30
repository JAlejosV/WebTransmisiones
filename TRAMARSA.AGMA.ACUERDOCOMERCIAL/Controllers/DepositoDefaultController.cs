using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Web.Mvc;
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
using GR.Frameworks;
using GR.Msc.Memberships;
using GR.Msc.Memberships.Models;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class DepositoDefaultController : Controller
    {

        public ActionResult ConsultaDepositoDefault()
        {
            return View("../Maestros/DepositoDefault/ConsultaDepositoDefault");
        }

        public ActionResult RegistrarDepositoDefault()
        {
            return View("../Maestros/DepositoDefault/RegistrarDepositoDefault");
        }
         
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

        public ActionResult ConsultarDepositoDefaultIndex(string codigoLinea)
        {
            var responseConfig = new ResponseConsultarDepositoDefaultIndexViewModel();
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var responseListarTipoContenedor = new MaestrosAgente().ListarTipoContenedorByLinea(codigoLinea);
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogoTramarsa(new RequestConsultaDetalleCatalogoViewModel());
                var lstDepositos = new DepositoDefaultAgente().ListarAlmacenTodos();
                var response = new MaestrosAgente().ListarLinea();
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();

                responseConfig.Lineas = (from item in response.LineasList
                                         select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                responseConfig.TipoContenedor = (from item in responseListarTipoContenedor.TipoContenedorList
                                                 select HelperCtrl.MiMapper<ListaTipoContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();
                responseConfig.Deposito = lstDepositos.DepositosList;

                responseConfig.Estados = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                          where item.IdCatalogo == Convert.ToInt32(TablaTablasTramarsa.EstadosDepositoDefault)
                                          select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                responseConfig.Sucursal = (from item in responseListarSucursal.SucursalesList
                                           select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();


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


        /// <summary>
        /// Consulta de naves 
        /// La paginacion es el servicio
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultarDepositoDefault(RequestConsultaDepositoDefaultViewModel filtros, string requestExportar)
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
                    var idGrilla = rm.GetString("IdGrilla_ConsultaDepositoDefault");
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestConsultaDepositoDefaultViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;

                    var listaRespuesta = new DepositoDefaultAgente().ListarDepositoDefault(filtros);
                    listaRespuesta.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.DepositoDefaultList, filtros.paginacionDTO.IdGrilla, "Id", Request.QueryString["export"], Response, "Lista_de_Depositos_");
                }
                else
                {
                    var listaNave = new DepositoDefaultAgente().ListarDepositoDefault(filtros);
                    if (listaNave.Result.Satisfactorio && listaNave.DepositoDefaultList.Count > 0)
                    {
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaNave.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        var res = Grid.toJSONFormat2(listaNave.DepositoDefaultList, filtros.paginacionDTO.GetNroPagina(), listaNave.TotalRegistros, totalPages, "Id");
                        actionResult = Content(res);
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaNave.DepositoDefaultList, 0, 0, 0, ""));
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

        public ActionResult RegistrarDepositoDefaultIndex(string codigoLinea)
        {
            var responseConfig = new ResponseRegistrarDepositoDefaultIndexViewModel();
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {


                var lstDepositos = new DepositoDefaultAgente().ListarAlmacenTodos();
                var response = new MaestrosAgente().ListarLinea();
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();

                responseConfig.Lineas = (from item in response.LineasList
                                         select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                responseConfig.Deposito = lstDepositos.DepositosList;


                responseConfig.Sucursal = (from item in responseListarSucursal.SucursalesList
                                           select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();


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

        public ActionResult ActualizarDepositoDefault(RequestActualizarDepositoDefaultViewModel request)
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
                var response = new DepositoDefaultAgente().ActualizarDepositoDefault(request);
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

        public ActionResult AgregarDepositoDefault(RequestAgregarDepositoDefaultViewModel request)
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
                var response = new DepositoDefaultAgente().AgregarDepositoDefault(request);
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
        public ActionResult ValidarDepositoDefault(RequestValidaDepositoDefaultViewModel filtros)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                ////if (ModelState.IsValid)
                ////{
                //if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                //{
                //    var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                //    var idGrilla = rm.GetString("IdGrilla_ConsultaDepositoDefault");
                //    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestValidaDepositoDefaultViewModel>(requestExportar);
                //    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                //    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                //    filtros.paginacionDTO.rows = 9999;
                //    filtros.paginacionDTO.page = 1;

                //    var listaRespuesta = new DepositoDefaultAgente().ValidaDepositoDefault(filtros);
                //    //listaRespuesta.NroPagina = 1;
                //    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.DepositoDefaultList, filtros.paginacionDTO.IdGrilla, "Id", Request.QueryString["export"], Response, "Lista_de_Depositos_");
                //}
                //else
                //{
                //    var listaNave = new DepositoDefaultAgente().ValidaDepositoDefault(filtros);
                //    if (listaNave.Result.Satisfactorio && listaNave.DepositoDefaultList.Count > 0)
                //    {
                //        //var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaNave.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                //        var res = Grid.toJSONFormat2(listaNave.DepositoDefaultList, filtros.paginacionDTO.GetNroPagina(), 99999, 1, "Id");
                //        actionResult = Content(res);
                //    }
                //    else
                //    {
                //        actionResult = Content(Grid.toJSONFormat2(listaNave.DepositoDefaultList, 0, 0, 0, ""));
                //    }
                //}

                var response = new DepositoDefaultAgente().ValidaDepositoDefault(filtros);
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