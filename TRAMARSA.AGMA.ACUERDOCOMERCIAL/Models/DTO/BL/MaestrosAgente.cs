using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Frameworks;
using GR.Msc.Memberships;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Agente.BL
{
    public class MaestrosAgente
    {
        /// <summary>
        /// Lista Sucursales
        /// </summary>
        /// <returns></returns>
        public ResponseListarSucursal ListarSucursal()
        {
            ResponseListarSucursal responseListarSucursal = new ResponseListarSucursal();
            try
            {
                var clases = new List<ListaSucursalDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Sucursal);

                clases = manejadorCache.ObtenerValorCache<List<ListaSucursalDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarSucursal = (new TransmisionesProxyrest()).ListarSucursal();
                    manejadorCache.InsertarValorCache(keyCache, responseListarSucursal.SucursalesList);
                }
                else
                {
                    responseListarSucursal.SucursalesList = clases;
                }
                responseListarSucursal.Result = new GR.Comun.DTO.Result();
                responseListarSucursal.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarSucursal.Result = new GR.Comun.DTO.Result();
                responseListarSucursal.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseListarSucursal;
        }

        /// <summary>
        /// Lista Terminal Portuario
        /// </summary>
        /// <returns></returns>
        public ResponseListarTerminalPortuario ListarTerminalPortuario()
        {
            ResponseListarTerminalPortuario responseListarTerminalPortuario = new ResponseListarTerminalPortuario();
            try
            {
                var clases = new List<ListaTerminalPortuarioDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TerminalPortuario);

                clases = manejadorCache.ObtenerValorCache<List<ListaTerminalPortuarioDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTerminalPortuario = (new TransmisionesProxyrest()).ListarTerminalPortuario();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTerminalPortuario.TerminalPortuarioList);
                }
                else
                {
                    responseListarTerminalPortuario.TerminalPortuarioList = clases;
                }

                responseListarTerminalPortuario.Result = new GR.Comun.DTO.Result();
                responseListarTerminalPortuario.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarTerminalPortuario.Result = new GR.Comun.DTO.Result();
                responseListarTerminalPortuario.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseListarTerminalPortuario;
        }

        /// <summary>
        /// Lista Terminal Linea
        /// </summary>
        /// <returns></returns>
        public ResponseListarLinea ListarLinea()
        {
            ResponseListarLinea responseListarLinea = new ResponseListarLinea();
            var usuario = Helpers.Helper.GetUsuario();
            try
            {

                var clases = new List<ListaLineaDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Linea);

                clases = manejadorCache.ObtenerValorCache<List<ListaLineaDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarLinea = (new TransmisionesProxyrest()).ListarLinea();
                    manejadorCache.InsertarValorCache(keyCache, responseListarLinea.LineasList);
                }
                else
                {
                    responseListarLinea.LineasList = clases;
                }

                responseListarLinea.Result = new GR.Comun.DTO.Result();
                responseListarLinea.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarLinea.Result = new GR.Comun.DTO.Result();
                responseListarLinea.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            if (usuario != null)
                responseListarLinea.LineasList = (from xx in responseListarLinea.LineasList join yy in usuario.Usuario.ListaCodigosLineas on xx.Codigo equals yy select xx).ToList();

            return responseListarLinea;
        }

        /// <summary>
        /// Lista Moneda
        /// </summary>
        /// <returns></returns>
        public ResponseListarMoneda ListarMoneda()
        {
            ResponseListarMoneda responseListarMoneda = new ResponseListarMoneda();
            var usuario = Helpers.Helper.GetUsuario();
            try
            {

                var clases = new List<ListaMonedaDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Moneda);

                clases = manejadorCache.ObtenerValorCache<List<ListaMonedaDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarMoneda = (new TransmisionesProxyrest()).ListarMoneda();
                    manejadorCache.InsertarValorCache(keyCache, responseListarMoneda.MonedaList);
                }
                else
                {
                    responseListarMoneda.MonedaList = clases;
                }

                responseListarMoneda.Result = new GR.Comun.DTO.Result();
                responseListarMoneda.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarMoneda.Result = new GR.Comun.DTO.Result();
                responseListarMoneda.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarMoneda;
        }

        /// <summary>
        /// Lista Detalle Catalogo
        /// </summary>
        /// <returns></returns>
        public ResponseListaDetalleCatalogo ListarDetalleCatalogo(RequestConsultaDetalleCatalogoViewModel request)
        {
            ResponseListaDetalleCatalogo responseListarDetalleCatalogo = new ResponseListaDetalleCatalogo();
            try
            {
                var requestDetalleCatalogo = new RequestConsultaDetalleCatalago()
                {
                    DescripcionCatalogo = request.filtro.DescripcionCatalogo
                };

                var clases = new List<ListaDetalleCatalagoDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(requestDetalleCatalogo.DescripcionCatalogo);

                clases = manejadorCache.ObtenerValorCache<List<ListaDetalleCatalagoDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarDetalleCatalogo = (new TransmisionesProxyrest()).ListarDetalleCatalogo(requestDetalleCatalogo);
                    manejadorCache.InsertarValorCache(keyCache, responseListarDetalleCatalogo.DetalleCatalogoList);
                }
                else
                {
                    responseListarDetalleCatalogo.DetalleCatalogoList = clases;
                }

                responseListarDetalleCatalogo.Result = new GR.Comun.DTO.Result();
                responseListarDetalleCatalogo.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarDetalleCatalogo.Result = new GR.Comun.DTO.Result();
                responseListarDetalleCatalogo.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarDetalleCatalogo;
        }
       
        /// <summary>
        /// Lista Puertos
        /// </summary>
        /// <returns></returns>
        //public ResponseListarPuerto ListarPuerto()
        //{
        //    ResponseListarPuerto responseListarPuerto = new ResponseListarPuerto();
        //    try
        //    {

        //        var clases = new List<ListaPuertoDTO>();
        //        var manejadorCache = new ManejadorCache();
        //        var keyCache = Convert.ToString(KeyCache.Puerto);

        //        clases = manejadorCache.ObtenerValorCache<List<ListaPuertoDTO>>(keyCache);
        //        if (clases == null || clases.Count == 0)
        //        {
        //            responseListarPuerto = (new AcuerdosComercialesProxyrest()).ListarPuerto();
        //            manejadorCache.InsertarValorCache(keyCache, responseListarPuerto.PuertosList);
        //        }
        //        else
        //        {
        //            responseListarPuerto.PuertosList = clases;
        //        }

        //        responseListarPuerto.Result = new GR.Comun.DTO.Result();
        //        responseListarPuerto.Result.Satisfactorio = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        responseListarPuerto.Result = new GR.Comun.DTO.Result();
        //        responseListarPuerto.Result.Satisfactorio = false;
        //        ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
        //    }

        //    return responseListarPuerto;
        //}
    }
}