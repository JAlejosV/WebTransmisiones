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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Persona;

namespace TRAMARSA.AGMA.Persona.Controllers.Persona
{
    public class PersonaController : Controller
    {

        public ActionResult BuscarPersona()
        {
            return View("../Persona/BuscarPersona");
        }
        public ActionResult RegistrarPersona()
        {
            return View("../Persona/RegistrarPersona");
        }

        public ActionResult GrabarPersonaCargaInicial()
        {
            var registraPersonaVm = new RegistrarPersonaViewModel();

            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();

            try
            {
                var responseListarRol = new MaestrosAgente().ListarRol();

                registraPersonaVm.Rol = (from item in responseListarRol.ListaRoles
                                         select HelperCtrl.MiMapper<ListaRolDTO, ListaRolViewModel>(item)).ToList();

                actionResult = Content(JsonConvert.SerializeObject(registraPersonaVm));
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

        public ActionResult BusquedaPersona(RequestBusquedaPersonaViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        var rm = new ResourceManager("TRAMARSA.AGMA.Persona.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ConsultaPersona");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaPersonaViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new PersonaAgente().BusquedaPersona(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaPersona, filtros.paginacionDTO.IdGrilla, "CodigoPersona", Request.QueryString["export"], Response, "Lista_de_persona");
                    }
                    else
                    {
                        var listaPersona = new PersonaAgente().BusquedaPersona(filtros);
                        if (listaPersona.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaPersona.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaPersona.ListaPersona, filtros.paginacionDTO.GetNroPagina(), listaPersona.TotalRegistros, totalPages, "CodigoPersona");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaPersona.ListaPersona, 0, 0, 0));
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

        public ActionResult GrabarPersona(RequestRegistrarPersonaViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var usuario = TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helpers.Helper.GetUsuarioCliente();
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
                var response = new PersonaAgente().RegistroPersona(request);
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

        public ActionResult ConsultarDetallePersona(long codigoPersona)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var ofiltro = new RequestConsultaDetallePersonaViewModel
                {
                    filtro = { CodigoPersona = codigoPersona }
                };
                if (ModelState.IsValid)
                {
                    var oPersona = new PersonaAgente().ConsultarDetallePersona(ofiltro);
                    if (oPersona != null)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(oPersona));
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

        public ActionResult DeshabilitarPersona(RequestRegistrarPersonaViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                //JAV
                //var usuario = TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helpers.Helper.GetUsuarioCliente();
                var usuario = TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
                }
                var response = new PersonaAgente().RegistroPersona(request);
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