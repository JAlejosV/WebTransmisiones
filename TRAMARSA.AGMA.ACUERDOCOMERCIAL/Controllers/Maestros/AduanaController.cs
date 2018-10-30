using GR.Frameworks;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Aduana;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Maestros
{
    public class AduanaController : Controller
    {
        public ActionResult AdministrarAduana()
        {
            return View("../Maestros/Aduana/AdministrarAduana");
        }

        public ActionResult RegistroAduana()
        {
            return View("../Maestros/Aduana/RegistroAduana");
        }

        public ActionResult BuscarAduana()
        {
            return View("../Busqueda/BuscarAduana");
        }


        public ActionResult ConsultaAduana(RequestBusquedaAduanaViewModel filtros, string requestExportar)
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
                        var listaRespuesta = new MaestrosAgente().ConsultaAduana(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaAduana,
                            filtros.paginacionDTO.IdGrilla, "CodigoAduana", Request.QueryString["export"], Response, "Lista_de_Aduana_");

                    }
                    else
                    {
                        var listaCliente = new MaestrosAgente().ConsultaAduana(filtros);
                        if (listaCliente.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaCliente.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaCliente.ListaAduana, filtros.paginacionDTO.GetNroPagina(),
                                listaCliente.TotalRegistros, totalPages, "CodigoAduana");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaCliente.ListaAduana, 0, 0, 0, ""));
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

        public ActionResult RegistrarAduana(RequestRegistrarAduanaViewModel request)
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
                var response = new MaestrosAgente().RegistrarAduana(request);
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