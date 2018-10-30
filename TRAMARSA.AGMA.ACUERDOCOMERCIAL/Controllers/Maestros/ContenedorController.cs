﻿using GR.Frameworks;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Contenedor;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers.Maestros
{
    public class ContenedorController : Controller
    {
        public ActionResult AdministrarContenedor()
        {
            return View("../Maestros/Contenedor/AdministrarContenedor");
        }

        public ActionResult RegistroContenedor()
        {
            return View("../Maestros/Contenedor/RegistroContenedor");
        }

        public ActionResult BuscarContenedor()
        {
            return View("../Busqueda/BuscarContenedor");
        }

        public ActionResult ConsultaContenedor(RequestBusquedaContenedorViewModel filtros, string requestExportar)
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
                        var listaRespuesta = new MaestrosAgente().ConsultaContenedor(filtros);
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaContenedor,
                            filtros.paginacionDTO.IdGrilla, "CodigoContenedor", Request.QueryString["export"], Response, "Lista_de_Contenedor_");

                    }
                    else
                    {
                        var listaCliente = new MaestrosAgente().ConsultaContenedor(filtros);
                        if (listaCliente.Result.Satisfactorio)
                        {
                            var totalPages =
                                int.Parse("" +
                                          Math.Ceiling(Convert.ToDouble(listaCliente.TotalRegistros) /
                                                       filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listaCliente.ListaContenedor, filtros.paginacionDTO.GetNroPagina(),
                                listaCliente.TotalRegistros, totalPages, "CodigoContenedor");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listaCliente.ListaContenedor, 0, 0, 0, ""));
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

        public ActionResult RegistrarContenedor(RequestRegistrarContenedorViewModel request)
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
                var response = new MaestrosAgente().RegistrarContenedor(request);
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