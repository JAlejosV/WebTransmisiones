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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Documento
{
    public class DocumentoController : Controller
    {

        public ActionResult BuscarDocumento()
        {
            return View("../Documento/BuscarDocumento");
        }

        public ActionResult RegistrarDocumento()
        {
            return View("../Documento/RegistrarDocumento");
        }

        public ActionResult GrabarDocumentoCargaInicial()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var RegistraDocumentoVm = new ResponseRegistrarDocumentoViewModel();
            try
            {
                var responseListarTiposBL = new MaestrosAgente().ListarTiposBL();
                var responseListarTiposEnvio = new MaestrosAgente().ListarTiposEnvio();
                var responseListarCondicionesContrato = new MaestrosAgente().ListarCondicionesContrato();

                RegistraDocumentoVm.TiposBL = (from item in responseListarTiposBL.ListaTiposBL select HelperCtrl.MiMapper<ListaTiposBLDTO, ListaTiposBLViewModel>(item)).ToList();
                RegistraDocumentoVm.TiposEnvio = (from item in responseListarTiposEnvio.ListaTiposEnvio select HelperCtrl.MiMapper<ListaTiposEnvioDTO, ListaTiposEnvioViewModel>(item)).ToList();
                RegistraDocumentoVm.CondicionesContrato = (from item in responseListarCondicionesContrato.ListaCondicionesContrato select HelperCtrl.MiMapper<ListaCondicionesContratoDTO, ListaCondicionesContratoViewModel>(item)).ToList();
                RegistraDocumentoVm.FechaEmisionDocumento = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                RegistraDocumentoVm.FechaEmbarqueDocumento = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                actionResult = Content(JsonConvert.SerializeObject(RegistraDocumentoVm));
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

        public ActionResult DocumentoIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var indexDocumento = new ResponseDocumentoIndexViewModel();
            try
            {
                var responseListarTiposBL = new MaestrosAgente().ListarTiposBL();
                var responseListarTiposEnvio = new MaestrosAgente().ListarTiposEnvio();

                indexDocumento.TiposBL = (from item in responseListarTiposBL.ListaTiposBL select HelperCtrl.MiMapper<ListaTiposBLDTO, ListaTiposBLViewModel>(item)).ToList();
                indexDocumento.TiposEnvio = (from item in responseListarTiposEnvio.ListaTiposEnvio select HelperCtrl.MiMapper<ListaTiposEnvioDTO, ListaTiposEnvioViewModel>(item)).ToList();
                indexDocumento.FechaDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddDays(-30));
                indexDocumento.FechaFinDefault = string.Format("{0:dd/MM/yyyy}", DateTime.Now);
                actionResult = Content(JsonConvert.SerializeObject(indexDocumento));
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

        public ActionResult BusquedaDocumento(RequestBusquedaDocumentoViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        var rm = new ResourceManager("TRAMARSA.AGMA.Documento.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ConsultaDocumento");
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaDocumentoViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new DocumentoAgente().BusquedaDocumento(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaDocumento, filtros.paginacionDTO.IdGrilla, "CodigoDocumento", Request.QueryString["export"], Response, "Lista_de_Documento");
                    }
                    else
                    {
                        var listaDocumento = new DocumentoAgente().BusquedaDocumento(filtros);
                        if (listaDocumento.Result.Satisfactorio)
                        {
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaDocumento.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaDocumento.ListaDocumento, filtros.paginacionDTO.GetNroPagina(), listaDocumento.TotalRegistros, totalPages, "CodigoDocumento");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaDocumento.ListaDocumento, 0, 0, 0));
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

        public ActionResult GrabarDocumento(RequestRegistrarDocumentoViewModel request)
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
                var response = new DocumentoAgente().RegistroDocumento(request);
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

        public ActionResult ConsultarDetalleDocumento(long codigoDocumento)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var ofiltro = new RequestConsultaDetalleDocumentoViewModel
                {
                    filtro = { CodigoDocumento = codigoDocumento }
                };
                if (ModelState.IsValid)
                {
                    var oDocumento = new DocumentoAgente().ConsultarDetalleDocumento(ofiltro);
                    if (oDocumento != null)
                    {
                        actionResult = Content(JsonConvert.SerializeObject(oDocumento));
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

        public ActionResult DeshabilitarDocumento(RequestRegistrarDocumentoViewModel request)
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
                var response = new DocumentoAgente().RegistroDocumento(request);
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