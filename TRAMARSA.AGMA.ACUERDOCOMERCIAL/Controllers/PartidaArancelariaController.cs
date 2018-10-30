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


namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class PartidaArancelariaController : Controller
    {
        public ActionResult BuscarPartidaArancelaria()
        {
            return View("../Acuerdos/BuscarPartidaArancelaria");
        }

        public ActionResult AdministrarPartidaArancelaria()
        {
            return View("../Maestros/PartidaArancelaria/AdministrarPartidaArancelaria");
        }

        public ActionResult RegistroPartidaArancelaria()
        {
            return View("../Maestros/PartidaArancelaria/RegistroPartidaArancelaria");
        }


        public ActionResult ConsultaPartidaArancelaria(RequestBusquedaPartidaArancelariaViewModel filtros, string requestExportar)
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
                        var listaRespuesta = new MaestrosAgente().ConsultaPartidaArancelaria(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.PartidaArancelariaList,
                            filtros.paginacionDTO.IdGrilla, "CodigoCliente", Request.QueryString["export"], Response, "Lista_de_Partida_Arancelaria_");

                    }
                    else
                    {
                        var listaCliente = new MaestrosAgente().ConsultaPartidaArancelaria(filtros);
                        if (listaCliente.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaCliente.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaCliente.PartidaArancelariaList, filtros.paginacionDTO.GetNroPagina(),
                                listaCliente.TotalRegistros, totalPages, "CodigoPartidaArancelaria");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaCliente.PartidaArancelariaList, 0, 0, 0, ""));
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

        public ActionResult ActualizarPartidaArancelaria(RequesAcrualizarPartidaArancelariaViewModel request)
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
                var response = new MaestrosAgente().ActualizarPartidaArancelaria(request);
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