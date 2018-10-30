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

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class DetalleTipoContenedorExternoController : Controller
    {
        public ActionResult DetalleTipoContenedorExterno()
        {
            return View("../Maestros/TipoContenedorExterno/DetalleTipoContenedorExterno");
        }

        public ActionResult RegistrasDetalleTipoContenedorExterno()
        {
            return View("../Maestros/TipoContenedorExterno/RegistrasDetalleTipoContenedorExterno");
        }


        /// <summary>
        /// Index
        /// </summary>
        /// <returns></returns>
        public ActionResult DetalleTipoContenedorExternoIndex()
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
        /// Filtrar tipo contenedor
        /// </summary>
        /// <param name="codigoClaseContenedor"></param>
        /// <returns></returns>
        //public ActionResult BuscarTipoContenedor(string codigoClaseContenedor)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var response = new MaestrosAgente().BuscarTipoContenedor(codigoClaseContenedor);
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

        public ActionResult ConsultarDetalleTipoContenedorExterno(RequestConsultarDetalleTipoContenedorExternoViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                var idGrilla = rm.GetString("IdGrilla_ConsultarDetalleTipoContenedorExterno");
                if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                {
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestConsultarDetalleTipoContenedorExternoViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;
                    var listaRespuesta = new MaestrosAgente().ConsultarDetalleTipoContenedorExterno(filtros);
                    listaRespuesta.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.DetalleTipoContenedorExternoList, filtros.paginacionDTO.IdGrilla, "CodigoTipoContenedorExternoDetalle", Request.QueryString["export"], Response, "Lista_Detalle_Tipo_Contenedor_Externo_");
                }
                else
                {
                    var listarTipoContenedor = new MaestrosAgente().ConsultarDetalleTipoContenedorExterno(filtros);
                    if (listarTipoContenedor.Result.Satisfactorio && listarTipoContenedor.DetalleTipoContenedorExternoList.Count > 0)
                    {

                        int nroRegistros;
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.HabilitarPaginacion = true;
                        string columnaOrden = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        listarTipoContenedor.DetalleTipoContenedorExternoList = PaginacionBL.PaginarLista(listarTipoContenedor.DetalleTipoContenedorExternoList,
                                                                                                filtros.paginacionDTO,
                                                                                                out nroRegistros,
                                                                                                columnaOrden);
                        listarTipoContenedor.TotalRegistros = nroRegistros;
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listarTipoContenedor.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        var res = Grid.toJSONFormat2(listarTipoContenedor.DetalleTipoContenedorExternoList, filtros.paginacionDTO.GetNroPagina(), listarTipoContenedor.TotalRegistros, totalPages, "CodigoTipoContenedorExternoDetalle");
                        actionResult = Content(res);
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listarTipoContenedor.DetalleTipoContenedorExternoList, 0, 0, 0, ""));
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
        public ActionResult TransaccionDetalleTipoContenedorExterno(RequestDetalleTipoContenedorExternoViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    if (request.Accion == "I")
                    {
                        request.UsuarioCreacion = usuario.Usuario.CodigoUsuario;
                    }
                    else
                    {
                        request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                    }
                }
                if (request.Accion == "I")
                {
                    request.FechaHoraCreacion = DateTime.Now;
                }
                else
                {
                    request.FechaHoraActualizacion = DateTime.Now;
                }
                var response = new MaestrosAgente().TransaccionDetalleTipoContenedorExterno(request);
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