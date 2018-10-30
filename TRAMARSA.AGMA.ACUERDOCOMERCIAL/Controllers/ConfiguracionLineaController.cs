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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class ConfiguracionLineaController : Controller
    {


        public ActionResult AdministrarConfiguracionLinea()
        {
            return View("../Maestros/ConfiguracionLinea/AdministrarConfiguracionLinea");
        }

        public ActionResult RegistroConfiguracionLinea()
        {
            return View("../Maestros/ConfiguracionLinea/RegistroConfiguracionLinea");
        }

        public ActionResult ConfiguracionLineaIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseIndex = new ConfiguracionLineaIndexViewModel();
            try
            {
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                responseIndex.Linea = (from item in responseListarLinea.LineasList
                                       select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                responseIndex.Estados = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                         where item.IdCatalogo == Convert.ToInt32(TablaTablas.Estado)
                                         select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();
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

        public ActionResult ConsultaConfiguracionLinea(RequestBusquedaConfiguracionLineaViewModel filtros, string requestExportar)
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
                        var idGrilla = rm.GetString("IdGrilla_ListaconfiguracionLinea");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaConfiguracionLineaViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 100000;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new MaestrosAgente().ConsultaConfiguracionLinea(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaConfiguracionLinea, filtros.paginacionDTO.IdGrilla, "CodigoConfiguracion", Request.QueryString["export"], Response, "Lista_de_Configuracion_Linea_");
                    }
                    else
                    {
                        var listaConfiguracionLinea = new MaestrosAgente().ConsultaConfiguracionLinea(filtros);
                        if (listaConfiguracionLinea.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaConfiguracionLinea.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaConfiguracionLinea.ListaConfiguracionLinea, filtros.paginacionDTO.GetNroPagina(), listaConfiguracionLinea.TotalRegistros, totalPages, "CodigoConfiguracion");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaConfiguracionLinea.ListaConfiguracionLinea, 0, 0, 0));
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
        /// Obtener Configuracion Linea
        /// </summary>
        /// <returns></returns>
        public ActionResult ObtenerConfiguracionLinea()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var responseListarTerminalPortuario = new MaestrosAgente().ObtenerConfiguracionLinea();
                actionResult = Content(JsonConvert.SerializeObject(responseListarTerminalPortuario));
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

        public ActionResult RegistrarConfiguracionLineaIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseIndex = new RegistrarConfiguracionLineaIndexViewModel();
            try
            {
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                var responseListarLinea = new MaestrosAgente().ListarLineaSinConfiguracionLinea();
                var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();

                responseIndex.Linea = (from item in responseListarLinea.LineasList
                                       select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();

                responseIndex.Sucursal = (from item in responseListarSucursal.SucursalesList
                                          select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();

                responseIndex.TerminalPorturario = (from item in responseListarTerminalPortuario.TerminalPortuarioList
                                                    select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item)).ToList();

                var ofiltro = new RequestObtenerConfiguracionLineaViewModel();
                ofiltro.CodigoConfiguracion = 1;
                ofiltro.isNuevo = true;
                var BaseConfiguracionLinea = new AcuerdoComercialAgente().ObtenerConfiguracionLineaxCodigo(ofiltro);
                responseIndex.ListaConfiguracionSeccionConcesionLocal = BaseConfiguracionLinea.ListaConfiguracionSeccionConcesionLocal;
                responseIndex.ListaConfiguracionSeccionConcesionEscalonada = BaseConfiguracionLinea.ListaConfiguracionSeccionConcesionEscalonada;
                responseIndex.ListaConfiguracionSeccionAdmConcesionLocal = BaseConfiguracionLinea.ListaConfiguracionSeccionAdmConcesionLocal;
                responseIndex.ListaConfiguracionSeccionAdmConcesionEscalonada = BaseConfiguracionLinea.ListaConfiguracionSeccionAdmConcesionEscalonada;

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

        public ActionResult ObtenerConfiguracionLineaxCodigo(int codigoConfiguracionLinea)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var ofiltro = new RequestObtenerConfiguracionLineaViewModel();
                ofiltro.CodigoConfiguracion = codigoConfiguracionLinea;
                if (ModelState.IsValid)
                {
                    var oAcuerdoComercial = new AcuerdoComercialAgente().ObtenerConfiguracionLineaxCodigo(ofiltro);
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

        public ActionResult ModificarConfiguracionLinea(RequestActualizarConfiguracionLineaViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioRegistro = usuario.Usuario.CodigoUsuario;
                }
                var response = new AcuerdoComercialAgente().ModificarConfiguracionLinea(request);
                actionResult = Content(JsonConvert.SerializeObject(response));

                if (response.Result.Satisfactorio)
                {
                    var Maestro = new MaestrosController();
                    Maestro.LimpiarDatosCache();
                }
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

        public ActionResult ValidarconfiguracionLinea(string codigoLinea)
        {
            ActionResult actionResult = null;
            Int32 Existe = 0;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var responseListarTerminalPortuario = new MaestrosAgente().ObtenerConfiguracionLinea();
                var Registro = responseListarTerminalPortuario.ConfiguracionLinea.Where(x => x.CodigoLinea == codigoLinea).ToList();
                if (Registro.Count > 0)
                {
                    Existe = 1;
                }
                actionResult = Content(JsonConvert.SerializeObject(Existe));
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