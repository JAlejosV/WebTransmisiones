using System;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using GR.Frameworks;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class DetalleGrupoPuertoExternoController : Controller
    {
        public ActionResult DetalleGrupoPuertoExterno()
        {
            return View("../Maestros/GrupoPuertoExterno/DetalleGrupoPuertoExterno");
        }

        public ActionResult RegistroDetalleGrupoPuertoExterno()
        {
            return View("../Maestros/GrupoPuertoExterno/RegistroDetalleGrupoPuertoExterno");
        }

        public ActionResult ConsultarDetalleGrupoPuertoExterno(RequestConsultarDetalleGrupoPuertoExternoViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                var idGrilla = rm.GetString("IdGrilla_ConsultarDetalleGrupoPuertoExterno");
                if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                {
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestConsultarDetalleGrupoPuertoExternoViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;
                    var listaRespuesta = new MaestrosAgente().ConsultarDetalleGrupoPuertoExterno(filtros);
                    listaRespuesta.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.DetalleGrupoPuertoExternoList, filtros.paginacionDTO.IdGrilla, "CodigoGrupoPuertoDetalle", Request.QueryString["export"], Response, "Lista_Detalle_Grupo_Puerto_Externo_");
                }
                else
                {
                    var listaResponse = new MaestrosAgente().ConsultarDetalleGrupoPuertoExterno(filtros);
                    if (listaResponse.Result.Satisfactorio && listaResponse.DetalleGrupoPuertoExternoList.Count > 0)
                    {
                        int nroRegistros;
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.HabilitarPaginacion = true;
                        string columnaOrden = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        listaResponse.DetalleGrupoPuertoExternoList = PaginacionBL.PaginarLista(listaResponse.DetalleGrupoPuertoExternoList,
                                                                                                filtros.paginacionDTO,
                                                                                                out nroRegistros,
                                                                                                columnaOrden);
                        listaResponse.TotalRegistros = nroRegistros;
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaResponse.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        var res = Grid.toJSONFormat2(
                            listaResponse.DetalleGrupoPuertoExternoList,
                            filtros.paginacionDTO.GetNroPagina(),
                            listaResponse.TotalRegistros,
                            totalPages,
                            "CodigoGrupoPuertoDetalle");
                        actionResult = Content(res);
                    }
                    else
                    {
                        actionResult = Content(Grid.toJSONFormat2(listaResponse.DetalleGrupoPuertoExternoList, 0, 0, 0, ""));
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
        public ActionResult TransaccionDetalleGrupoPuertoExterno(RequestDetalleGrupoPuertoExternoViewModel request)
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
                request.FechaHoraCreacion = DateTime.Now;
                var response = new MaestrosAgente().TransaccionDetalleGrupoPuertoExterno(request);
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