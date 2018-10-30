using GR.Frameworks;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Itinerario;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Maestros.Itinerario;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Maestros
{
    public class ItinerarioController : Controller
    {
        public ActionResult AdministrarItinerario()
        {
            return View("../Maestros/Itinerario/AdministrarItinerario");
        }

        public ActionResult RegistroItinerario()
        {
            return View("../Maestros/Itinerario/RegistroItinerario");
        }

        public ActionResult BuscarItinerario()
        {
            return View("../Busqueda/BuscarItinerario");
        }

        public ActionResult ConsultaItinerario(RequestBusquedaItinerarioViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        //ResourceManager rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        //var idGrilla = rm.GetString("IdGrilla_ConsultaPartidaArancelaria");
                        //filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaPartidaArancelariaViewModel>(requestExportar);
                        //if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);

                        filtros.paginacionDTO.sord =
                            new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        //"NroItem";// columnaOrden;
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new MaestrosAgente().ConsultaItinerario(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaItinerario,
                            filtros.paginacionDTO.IdGrilla, "CodigoItinerario", Request.QueryString["export"], Response, "Lista_de_Itinerario_");

                    }
                    else
                    {
                        var listaCliente = new MaestrosAgente().ConsultaItinerario(filtros);
                        if (listaCliente.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaCliente.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaCliente.ListaItinerario, filtros.paginacionDTO.GetNroPagina(),
                                listaCliente.TotalRegistros, totalPages, "CodigoItinerario");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaCliente.ListaItinerario, 0, 0, 0, ""));
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
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }

        public ActionResult RegistrarItinerario(RequestRegistrarItinerarioViewModel request)
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
                var response = new MaestrosAgente().RegistrarItinerario(request);
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

        public ActionResult ItinerarioIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexItinerario = new ResponseItinerarioIndexViewModel();
            try
            {
                var responseListarTiposOperacion = new MaestrosAgente().ListarTiposOperacion();
                indexItinerario.TiposOperacion = (from item in responseListarTiposOperacion.ListaTiposOperacion select HelperCtrl.MiMapper<ListaTiposOperacionDTO, ListaTiposOperacionViewModel>(item)).ToList();
                indexItinerario.FechaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddDays(-30));
                indexItinerario.FechaFinDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                actionResult = Content(JsonConvert.SerializeObject(indexItinerario));
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