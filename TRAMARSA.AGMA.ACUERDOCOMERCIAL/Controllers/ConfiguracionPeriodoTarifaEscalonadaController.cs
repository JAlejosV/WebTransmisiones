using System;
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
    public class ConfiguracionPeriodoTarifaEscalonadaController : Controller
    {
        //public ActionResult ConfigurarRangos()
        //{
        //    return View("../Tarifas/ConfigurarRangos");
        //}
        //public ActionResult GrabarConfiguracionPeriodoIndex()
        //{
        //    var listaRegistraTarifaEscalonadaViewModel = new ListaRegistraTarifaEscalonadaViewModel();

        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();

        //    try
        //    {
        //        var responseListarClaseContenedor = new MaestrosAgente().ListarClaseContenedor();
        //        var responseListarMoneda = new MaestrosAgente().ListarMoneda();

        //        listaRegistraTarifaEscalonadaViewModel.ListaMonedas = (from item in responseListarMoneda.MonedaList
        //                                   select HelperCtrl.MiMapper<ListaMonedaDTO, ListaMonedaViewModel>(item)).ToList();

        //        listaRegistraTarifaEscalonadaViewModel.ListaCategoriaContenedor = (from item in responseListarClaseContenedor.ClaseContenedorList
        //                                                             select HelperCtrl.MiMapper<ClaseContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();


        //        actionResult = Content(JsonConvert.SerializeObject(listaRegistraTarifaEscalonadaViewModel));
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

        ///// <summary>
        ///// Carga de Tipo Contenedor by codigo de Clase Contenedor
        ///// </summary>
        ///// <returns></returns>
        //public ActionResult ListarTipoContendorByClaseContenedor(string codigoClaseContenedor,string codigoLinea)
        //{
        //    var listaRegistraTarifaEscalonadaViewModel = new ListaRegistraTarifaEscalonadaViewModel();

        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();

        //    try
        //    {
        //        RequestBusquedaTipoContenedorViewModel requestTipoContenedor =
        //            new RequestBusquedaTipoContenedorViewModel
        //            {
        //                filtro =
        //                {
        //                    CodigoClaseContenedor = codigoClaseContenedor,
        //                    CodigoLinea = codigoLinea
        //                }
        //            };
        //        var responseListarTipoContenedor = new MaestrosAgente().ListarTipoContenedor(requestTipoContenedor);

        //        listaRegistraTarifaEscalonadaViewModel.ListaTipoContenedor = (from item in responseListarTipoContenedor.TipoContenedorList
        //                                                                           select HelperCtrl.MiMapper<ListaTipoContenedorDTO, ListaClaseContenedorViewModel>(item)).ToList();


        //        actionResult = Content(JsonConvert.SerializeObject(listaRegistraTarifaEscalonadaViewModel));
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
        ///// <summary>
        ///// Grabar Tarifa Escalonada
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public ActionResult GrabarTarifaEscalonada(RequestRegistrarTarifaEscalonadaViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.Usuario = usuario.Usuario.CodigoUsuario;
        //        }
        //        var responseListarSucursal = new TarifasAgente().RegistroTarifaEscalonada(request);
        //        actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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

        ///// <summary>
        ///// Consultar detalle tarifa local
        ///// </summary>
        ///// <param name="codigoTarifaEscalonada"></param>
        ///// <returns></returns>
        //public ActionResult ConsultarDetalleTarifaEscalonada(int codigoTarifaEscalonada)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var ofiltro = new RequestConsultaDetalleTarifaEscalonadaViewModel
        //        {
        //            filtro = { CodigoTarifaEscalonada = codigoTarifaEscalonada }
        //        };
        //        if (ModelState.IsValid)
        //        {
        //            var response = new TarifasAgente().ConsultarDetalleTarifaEscalonada(ofiltro);
        //            if (response != null)
        //            {
        //                actionResult = Content(JsonConvert.SerializeObject(response));
        //            }
        //        }
        //        else
        //        {
        //            var cadena = string.Empty;
        //            var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
        //            actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
        //    }
        //    finally
        //    {
        //        manejadorLogEventos.RegistrarTiempoEjecucion("",
        //            HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(),
        //                MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
        //    }
        //    return actionResult;
        //}

        ///// <summary>
        ///// Actualizar Tarifa Escalonada
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public ActionResult ActualizarTarifaEscalonada(RequestActualizarTarifaEscalonadaViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
        //        }
        //        var responseListarSucursal = new TarifasAgente().ActualizarTarifaEscalonada(request);
        //        actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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

        ///// <summary>
        ///// Deshabilitar Tarifa Escalonada
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public ActionResult DeshabilitarTarifaEscalonada(RequestActualizarTarifaEscalonadaViewModel request)
        //{
        //    ActionResult actionResult = null;
        //    var manejadorLogEventos = new ManejadorLogEventos();
        //    try
        //    {
        //        request.EstadoRegistro = "Inactivo";
        //        var usuario = Helpers.Helper.GetUsuarioCliente();
        //        if (usuario != null)
        //        {
        //            request.UsuarioActualizacion = usuario.Usuario.CodigoUsuario;
        //        }
        //        var responseListarSucursal = new TarifasAgente().ActualizarTarifaEscalonada(request);
        //        actionResult = Content(JsonConvert.SerializeObject(responseListarSucursal));
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
    }
}