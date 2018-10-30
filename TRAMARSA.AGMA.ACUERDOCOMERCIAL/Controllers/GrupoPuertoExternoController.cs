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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class GrupoPuertoExternoController : Controller
    {

        public ActionResult AdministrarGrupoPuertoExterno()
        {
            return View("../Maestros/GrupoPuertoExterno/AdministrarGrupoPuertoExterno");
        }

        public ActionResult RegistroNuevoGrupoPuerto()
        {
            return View("../Maestros/GrupoPuertoExterno/RegistroNuevoGrupoPuerto");
        }

        /// <summary>
        /// Index búsqueda tarifa
        /// </summary>
        /// <returns></returns>
        public ActionResult ConsultarGrupoPuertoExternoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                actionResult = Content(JsonConvert.SerializeObject(""));
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
        public ActionResult GrabarGrupoPuertoExternoIndex()
        {
            var responseConfig = new ResponseGrupoPuertoExternoIndexViewModel();
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var response = new MaestrosAgente().ListarLinea();
                responseConfig.Lineas = (from item in response.LineasList
                                         select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
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
        public ActionResult GrabarGrupoPuertoExterno()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                actionResult = Content(JsonConvert.SerializeObject(""));
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
        /// Index Administrar tipo contenedor
        /// </summary>
        /// <returns></returns>
        public ActionResult AdministrarTipoContenedorIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var response = new MaestrosAgente().ListarClaseContenedor();
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
        /// Buscar Administrar Tipo Contenedor
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        //public ActionResult BuscarTipoContenedor(RequestAdministrarTipoContenedorBusquedaViewModel filtros, string requestExportar)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(Request.QueryString["export"]))
        //        {
        //            var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
        //            var idGrilla = rm.GetString("IdGrilla_AdminTipoContenedor");
        //            filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestAdministrarTipoContenedorBusquedaViewModel>(requestExportar);
        //            if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
        //            filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
        //            filtros.paginacionDTO.rows = 9999;
        //            filtros.paginacionDTO.page = 1;
        //            var listaRespuesta = new MaestrosAgente().BusquedaAdministrarTipoContenedor(filtros);
        //            listaRespuesta.NroPagina = 1;
        //            actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.TipoContenedorList, filtros.paginacionDTO.IdGrilla, "CodigoTipoContenedor", Request.QueryString["export"], Response, "Lista_de_Tipo_Contenedor_");
        //        }
        //        else
        //        {
        //            var listarTipoContenedor = new MaestrosAgente().BusquedaAdministrarTipoContenedor(filtros);
        //            if (listarTipoContenedor.Result.Satisfactorio && listarTipoContenedor.TipoContenedorList.Count > 0)
        //            {
        //                var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listarTipoContenedor.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
        //                var res = Grid.toJSONFormat2(listarTipoContenedor.TipoContenedorList, filtros.paginacionDTO.GetNroPagina(), listarTipoContenedor.TotalRegistros, totalPages, "CodigoTipoContenedor");
        //                actionResult = Content(res);
        //            }
        //            else
        //            {
        //                actionResult = Content(Grid.toJSONFormat2(listarTipoContenedor.TipoContenedorList, 0, 0, 0, ""));
        //            }
        //        }
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
        
        public ActionResult ConsultarGrupoPuertoExterno(RequestBusquedaGrupoPuertoExternoViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                var idGrilla = rm.GetString("IdGrilla_ConsultarGrupoPuerto");
                if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                {
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaGrupoPuertoExternoViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;
                    var listaRespuesta = new MaestrosAgente().ListarGrupoPuerto(filtros);
                    listaRespuesta.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.GrupoPuertoExternoList, filtros.paginacionDTO.IdGrilla, "CodigoGrupoPuerto", Request.QueryString["export"], Response, "Lista_Grupo_Puerto_");
                }
                else
                {
                    var response = new MaestrosAgente().ListarGrupoPuerto(filtros);
                    if (response.Result.Satisfactorio)
                    {
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(response.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        var res = Grid.toJSONFormat2(response.GrupoPuertoExternoList, filtros.paginacionDTO.GetNroPagina(), response.TotalRegistros, totalPages, "CodigoGrupoPuerto");
                        actionResult = Content(res);
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(response.GrupoPuertoExternoList, 0, 0, 0));
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
        public ActionResult AgregarGrupoPuertoExterno(RequestAgregarGrupoPuertoExternoViewModel request)
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
                var response = new MaestrosAgente().AgregarGrupoPuertoExterno(request);
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
        public ActionResult ActualizarGrupoPuertoExterno(RequestActualizarGrupoPuertoExternoViewModel request)
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
                var response = new MaestrosAgente().ActualizarGrupoPuertoExterno(request);
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
        public ActionResult EliminarGrupoPuertoExterno(RequestEliminarGrupoPuertoExternoViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    var response = new MaestrosAgente().EliminarGrupoPuertoExterno(request);
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