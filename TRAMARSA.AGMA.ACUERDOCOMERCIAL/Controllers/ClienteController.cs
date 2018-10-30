using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Resources;
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
    public class ClienteController : Controller
    {
        public ActionResult BuscarCliente()
        {
            return View("../Cliente/BuscarCliente");
        }
        public ActionResult BuscarClienteMatchCode()
        {
            return View("../Acuerdos/BuscarClienteMatchCode");
        }
        /// <summary>
        /// Consulta Tarifa
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        public ActionResult ConsultaCliente(RequestBusquedaClienteViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {

                        ResourceManager rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ConsultaCliente");
                        //var ID_Grilla = ConfigurationManager.AppSettings["IdGrilla_ConsultaAgente"];

                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaClienteViewModel>(requestExportar);

                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);

                        filtros.paginacionDTO.sord =
                            new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        //"NroItem";// columnaOrden;
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new MaestrosAgente().ListarCliente(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ClienteList,
                            filtros.paginacionDTO.IdGrilla, "CodigoCliente", Request.QueryString["export"], Response, "Lista_de_clientes_");

                    }
                    else
                    {
                        var listaTarifa = new MaestrosAgente().ListarCliente(filtros);
                        if (listaTarifa.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaTarifa.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaTarifa.ClienteList, filtros.paginacionDTO.GetNroPagina(),
                                listaTarifa.TotalRegistros, totalPages, "CodigoCliente");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaTarifa.ClienteList, 0, 0, 0, ""));
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

        /// <summary>
        /// Carga inicial de búsqueda de tarifa local
        /// </summary>
        /// <returns></returns>
        public ActionResult ConsultarClienteIndex(string tipoCliente = "")
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var listaBusquedaClienteViewModel = new ListaBusquedaClienteViewModel();
            var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
            try
            {
                var listaClienteMaster = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                          where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlMaster)
                                          select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                var listaClienteHouse = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                         where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlHouse)
                                         select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                var roles = new MaestrosAgente().ListarRolCliente();
                if (tipoCliente == "Master")
                {
                    roles.ListaRolesClientes = (from xx in roles.ListaRolesClientes join yy in listaClienteMaster on xx.Codigo equals yy.Codigo select xx).ToList();
                }
                if (tipoCliente == "House")
                {
                    roles.ListaRolesClientes = (from xx in roles.ListaRolesClientes join yy in listaClienteHouse on xx.Codigo equals yy.Codigo select xx).ToList();
                }
                if (tipoCliente == "busqueda")
                {
                    //   List<ListaDetalleCatalagoViewModel> lista = listaClienteHouse;
                    var listaRolesMasterHouse =
                        listaClienteMaster.Union(listaClienteHouse)
                            .GroupBy(c => c.Codigo)
                            .Select(group => group.First())
                            .ToList();
                    roles.ListaRolesClientes = (from xx in roles.ListaRolesClientes join yy in listaRolesMasterHouse on xx.Codigo equals yy.Codigo select xx).ToList();
                }
                listaBusquedaClienteViewModel.Rol = (from item in roles.ListaRolesClientes
                                                     select GR.Frameworks.Helper.MiMapper<ListaRolClienteDTO, ListaRolClienteViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(listaBusquedaClienteViewModel));
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
         
        public ActionResult ConsultaClienteMatchCode(RequestBusquedaClienteMatchCodeViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {

                        ResourceManager rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                        var idGrilla = rm.GetString("IdGrilla_ConsultaClienteMatchCode");
                        //var ID_Grilla = ConfigurationManager.AppSettings["IdGrilla_ConsultaAgente"];

                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaClienteMatchCodeViewModel>(requestExportar);

                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);

                        filtros.paginacionDTO.sord =
                            new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        //"NroItem";// columnaOrden;
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = new MaestrosAgente().ListarClienteMatchCode(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ClienteMatchCodeList,
                            filtros.paginacionDTO.IdGrilla, "CodigoCliente", Request.QueryString["export"], Response, "Lista_de_clientes_MatchCode_");

                    }
                    else
                    {
                        var listaCliente = new MaestrosAgente().ListarClienteMatchCode(filtros);
                        if (listaCliente.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaCliente.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaCliente.ClienteMatchCodeList, filtros.paginacionDTO.GetNroPagina(),
                                listaCliente.TotalRegistros, totalPages, "CodigoCliente");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaCliente.ClienteMatchCodeList, 0, 0, 0, ""));
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
    }
}