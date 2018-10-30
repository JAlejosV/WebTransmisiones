using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships;
using GR.Msc.Memberships.Models;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Puerto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ViaTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.ViaTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ViaTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Aduana;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Aduana;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Aduana;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoDocumento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoDocumento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoDocumento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoFlete;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoFlete;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoFlete;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Moneda;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Moneda;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Moneda;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ModoPago;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.ModoPago;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ModoPago;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoNave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoNave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoNave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoLugarCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoLugarCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoLugarCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.MedioTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.MedioTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.MedioTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.LineaNaviera;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.LineaNaviera;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.LineaNaviera;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Nave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Nave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Nave;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Rol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Rol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Rol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoOperacion;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoOperacion;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoOperacion;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.EntidadPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.EntidadPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.EntidadPrecinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Precinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Precinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Precinto;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoEnvio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoEnvio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoEnvio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionContrato;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionContrato;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionContrato;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.RequerimientoServicio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.RequerimientoServicio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.RequerimientoServicio;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoBL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoBL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoBL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoContenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoContenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoContenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Temperatura;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Temperatura;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Temperatura;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionTransporte;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoMovimiento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoMovimiento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoMovimiento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.UnidadMercancia;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.UnidadMercancia;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.UnidadMercancia;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.NaturalezaCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.NaturalezaCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.NaturalezaCarga;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ClaseIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.ClaseIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ClaseIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.NumeroIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.NumeroIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.NumeroIMO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Contenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Contenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Contenedor;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Itinerario;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Itinerario;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Itinerario;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.PersonaxRol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.PersonaxRol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.PersonaxRol;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TiposBL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoTransmision;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class MaestrosAgente
    {
        //public ResponseListarSucursal ListarSucursal()
        //{

        //    var responseListarSucursal = new ResponseListarSucursal();
        //    var usuario = Helpers.Helper.GetUsuarioCliente();
        //    try
        //    {
        //        var manejadorCache = new ManejadorCache();
        //        var keyCache = Convert.ToString(KeyCache.Sucursal);

        //        var clases = manejadorCache.ObtenerValorCache<List<ListaSucursalDTO>>(keyCache);
        //        if (clases == null || clases.Count == 0)
        //        {
        //            responseListarSucursal = (new TransmisionesProxyrest()).ListarSucursal();
        //            manejadorCache.InsertarValorCache(keyCache, responseListarSucursal.SucursalesList);
        //        }
        //        else
        //        {
        //            responseListarSucursal.SucursalesList = clases;
        //        }
        //        responseListarSucursal.Result = new Result { Satisfactorio = true };
        //    }
        //    catch (Exception ex)
        //    {
        //        responseListarSucursal.Result = new Result { Satisfactorio = false };
        //        ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
        //    }

        //    return responseListarSucursal;
        //}
        
        // JAVRoles
        public ResponseListarRol ListarRol()
        {
            var responseListarRol = new ResponseListarRol();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Rol);

                var clases = manejadorCache.ObtenerValorCache<List<ListaRolDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarRol = (new TransmisionesProxyrest()).ListarRol();
                    manejadorCache.InsertarValorCache(keyCache, responseListarRol.ListaRoles);
                }
                else
                {
                    responseListarRol.ListaRoles = clases;
                }
                responseListarRol.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarRol.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarRol;
        }

         public ResponseListarSucursal ListarSucursal()
        {

            var responseListarSucursal = new ResponseListarSucursal();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Sucursal);

                var clases = manejadorCache.ObtenerValorCache<List<ListaSucursalDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarSucursal = (new TransmisionesProxyrest()).ListarSucursal();
                    manejadorCache.InsertarValorCache(keyCache, responseListarSucursal.SucursalesList);
                }
                else
                {
                    responseListarSucursal.SucursalesList = clases;
                }
                responseListarSucursal.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarSucursal.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarSucursal;
        }
        public ResponseListarSucursal ListarSucursalByLinea(string codigoLinea)
        {
            var responseListarSucursal = new ResponseListarSucursal();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Sucursal);

                var clases = manejadorCache.ObtenerValorCache<List<ListaSucursalDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarSucursal = (new TransmisionesProxyrest()).ListarSucursal();
                    manejadorCache.InsertarValorCache(keyCache, responseListarSucursal.SucursalesList);
                }
                else
                {
                    responseListarSucursal.SucursalesList = clases;
                }
                responseListarSucursal.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarSucursal.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            var responseConfiguracionLinea = ObtenerConfiguracionLinea();
            var codigoConfiguracionLinea = responseConfiguracionLinea.ConfiguracionLinea.Where(c => c.CodigoLinea == codigoLinea).ToList();

            var lstConfiguracionListaSucursal = responseConfiguracionLinea.ConfiguracionLineaSucursal;
            if (codigoConfiguracionLinea.Count > 0)
            {
                lstConfiguracionListaSucursal =
                    lstConfiguracionListaSucursal.Where(
                        c => c.CodigoConfiguracion == codigoConfiguracionLinea[0].CodigoConfiguracion).ToList();

            }
            else
            {
                responseConfiguracionLinea.ConfiguracionLineaSucursal = new List<ConfiguracionLineaSucursalDTO>();
            }
            responseListarSucursal.SucursalesList = (from xx in responseListarSucursal.SucursalesList join yy in lstConfiguracionListaSucursal on xx.Codigo equals yy.CodigoSucursal select xx).ToList();
            if (usuario != null)
                responseListarSucursal.SucursalesList = (from xx in responseListarSucursal.SucursalesList join yy in usuario.Usuario.ListaCodigosSucursales on xx.Codigo equals yy select xx).ToList();

            return responseListarSucursal;
        }

        /// <summary>
        /// Listar Terminal By Linea y Sucursal
        /// </summary>
        /// <param name="codigoLinea"></param>
        /// <param name="codigoSucursal"></param>
        /// <returns></returns>
        public ResponseListarTerminalPortuario ListarTerminalPortuarioByLineaSucursal(string codigoLinea, string codigoSucursal)
        {
            var usuario = Helpers.Helper.GetUsuarioCliente();
            var listarTerminalPortuario = new ResponseListarTerminalPortuario();
            try
            {
                var responseListarTerminalPortuario = ListarTerminalPortuario();
                listarTerminalPortuario.TotalRegistros = responseListarTerminalPortuario.TotalRegistros;
                listarTerminalPortuario.CantidadPaginas = responseListarTerminalPortuario.CantidadPaginas;
                listarTerminalPortuario.Result = responseListarTerminalPortuario.Result;
                listarTerminalPortuario.TerminalPortuarioList = responseListarTerminalPortuario.TerminalPortuarioList;
                var responseConfiguracionLinea = ObtenerConfiguracionLinea();
                var codigoConfiguracionLinea = responseConfiguracionLinea.ConfiguracionLinea.Where(c => c.CodigoLinea == codigoLinea).ToList();
                var lstConfiguracionLineaSucursalTerminal = responseConfiguracionLinea.ConfiguracionLineaSucursalTerminal;
                if (codigoConfiguracionLinea.Count > 0)
                {
                    lstConfiguracionLineaSucursalTerminal =
                        lstConfiguracionLineaSucursalTerminal.Where(
                            c => c.CodigoConfiguracion == codigoConfiguracionLinea[0].CodigoConfiguracion).ToList();
                }
                else
                {
                    lstConfiguracionLineaSucursalTerminal = new List<ConfiguracionLineaSucursalTerminalDTO>();
                }
                listarTerminalPortuario.TerminalPortuarioList = (from xx in listarTerminalPortuario.TerminalPortuarioList join yy in lstConfiguracionLineaSucursalTerminal on xx.CodigoAlmacen equals yy.CodigoTerminalPortuario select xx).ToList();


                if (!string.IsNullOrEmpty(codigoSucursal))
                {
                    listarTerminalPortuario.TerminalPortuarioList =
                        (from x in listarTerminalPortuario.TerminalPortuarioList
                         where x.CodigoSucursal == codigoSucursal
                         select x).ToList();
                }
                if (usuario != null)
                    listarTerminalPortuario.TerminalPortuarioList = (from xx in listarTerminalPortuario.TerminalPortuarioList join yy in usuario.Usuario.ListaCodigosSucursales on xx.CodigoSucursal equals yy select xx).ToList();

            }
            catch (Exception ex)
            {
                listarTerminalPortuario.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return listarTerminalPortuario;
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
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TerminalPortuario);

                var clases = manejadorCache.ObtenerValorCache<List<ListaTerminalPortuarioDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTerminalPortuario = (new TransmisionesProxyrest()).ListarTerminalPortuario();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTerminalPortuario.TerminalPortuarioList);
                }
                else
                {
                    responseListarTerminalPortuario.TerminalPortuarioList = clases;
                }

                responseListarTerminalPortuario.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarTerminalPortuario.Result = new Result();
                responseListarTerminalPortuario.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            //var responseConfiguracionLinea = ObtenerConfiguracionLinea();
            //responseListarTerminalPortuario.TerminalPortuarioList = (from xx in responseListarTerminalPortuario.TerminalPortuarioList join yy in responseConfiguracionLinea.ConfiguracionLineaSucursalTerminal on xx.CodigoAlmacen equals yy.CodigoSucursal select xx).ToList();
            return responseListarTerminalPortuario;
        }

        /// <summary>
        /// Lista Terminal Linea
        /// </summary>
        /// <returns></returns>

        public ResponseListarTiposBL ListarTiposBL()
        {
            var responseListarTiposBL = new ResponseListarTiposBL();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TipoBL);

                var clases = manejadorCache.ObtenerValorCache<List<ListaTiposBLDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTiposBL = (new TransmisionesProxyrest()).ListarTiposBL();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTiposBL.ListaTiposBL);
                }
                else
                {
                    responseListarTiposBL.ListaTiposBL = clases;
                }
                responseListarTiposBL.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarTiposBL.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarTiposBL;
        }

        public ResponseListarTemperaturas ListarTemperaturas()
        {
            var responseListarTemperaturas = new ResponseListarTemperaturas();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Temperatura);

                var clases = manejadorCache.ObtenerValorCache<List<ListaTemperaturasDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTemperaturas = (new TransmisionesProxyrest()).ListarTemperaturas();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTemperaturas.ListaTemperaturas);
                }
                else
                {
                    responseListarTemperaturas.ListaTemperaturas = clases;
                }
                responseListarTemperaturas.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarTemperaturas.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarTemperaturas;
        }

        public ResponseListarCondicionesCarga ListarCondicionesCarga()
        {
            var responseListarCondicionesCarga = new ResponseListarCondicionesCarga();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.CondicionCarga);

                var clases = manejadorCache.ObtenerValorCache<List<ListaCondicionesCargaDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarCondicionesCarga = (new TransmisionesProxyrest()).ListarCondicionesCarga();
                    manejadorCache.InsertarValorCache(keyCache, responseListarCondicionesCarga.ListaCondicionesCarga);
                }
                else
                {
                    responseListarCondicionesCarga.ListaCondicionesCarga = clases;
                }
                responseListarCondicionesCarga.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarCondicionesCarga.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarCondicionesCarga;
        }

        public ResponseListarCondicionesTransporte ListarCondicionesTransporte()
        {
            var responseListarCondicionesTransporte = new ResponseListarCondicionesTransporte();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.CondicionTransporte);

                var clases = manejadorCache.ObtenerValorCache<List<ListaCondicionesTransporteDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarCondicionesTransporte = (new TransmisionesProxyrest()).ListarCondicionesTransporte();
                    manejadorCache.InsertarValorCache(keyCache, responseListarCondicionesTransporte.ListaCondicionesTransporte);
                }
                else
                {
                    responseListarCondicionesTransporte.ListaCondicionesTransporte = clases;
                }
                responseListarCondicionesTransporte.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarCondicionesTransporte.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarCondicionesTransporte;
        }

        public ResponseListarModosPago ListarModosPago()
        {
            var responseListarModosPago = new ResponseListarModosPago();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.ModoPago);

                var clases = manejadorCache.ObtenerValorCache<List<ListaModosPagoDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarModosPago = (new TransmisionesProxyrest()).ListarModosPago();
                    manejadorCache.InsertarValorCache(keyCache, responseListarModosPago.ListaModosPago);
                }
                else
                {
                    responseListarModosPago.ListaModosPago = clases;
                }
                responseListarModosPago.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarModosPago.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarModosPago;
        }

        public ResponseListarTiposTransmisionNave ListarTiposTransmisionNave()
        {
            var responseListarTiposTransmisionNave = new ResponseListarTiposTransmisionNave();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TipoTransmisionNave);

                var clases = manejadorCache.ObtenerValorCache<List<ListaTiposTransmisionNaveDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTiposTransmisionNave = (new TransmisionesProxyrest()).ListarTiposTransmisionNave();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTiposTransmisionNave.ListaTiposTransmisionNave);
                }
                else
                {
                    responseListarTiposTransmisionNave.ListaTiposTransmisionNave = clases;
                }
                responseListarTiposTransmisionNave.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarTiposTransmisionNave.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarTiposTransmisionNave;
        }

        public ResponseListarTiposTransmisionDocumento ListarTiposTransmisionDocumento()
        {
            var responseListarTiposTransmisionDocumento = new ResponseListarTiposTransmisionDocumento();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TipoTransmisionDocumento);

                var clases = manejadorCache.ObtenerValorCache<List<ListaTiposTransmisionDocumentoDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTiposTransmisionDocumento = (new TransmisionesProxyrest()).ListarTiposTransmisionDocumento();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTiposTransmisionDocumento.ListaTiposTransmisionDocumento);
                }
                else
                {
                    responseListarTiposTransmisionDocumento.ListaTiposTransmisionDocumento = clases;
                }
                responseListarTiposTransmisionDocumento.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarTiposTransmisionDocumento.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarTiposTransmisionDocumento;
        }

        public ResponseListarCondicionesContrato ListarCondicionesContrato()
        {
            var responseListarCondicionesContrato = new ResponseListarCondicionesContrato();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.CondicionContrato);

                var clases = manejadorCache.ObtenerValorCache<List<ListaCondicionesContratoDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarCondicionesContrato = (new TransmisionesProxyrest()).ListarCondicionesContrato();
                    manejadorCache.InsertarValorCache(keyCache, responseListarCondicionesContrato.ListaCondicionesContrato);
                }
                else
                {
                    responseListarCondicionesContrato.ListaCondicionesContrato = clases;
                }
                responseListarCondicionesContrato.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarCondicionesContrato.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarCondicionesContrato;
        }

        public ResponseListarTiposEnvio ListarTiposEnvio()
        {
            var responseListarTiposEnvio = new ResponseListarTiposEnvio();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TipoEnvio);

                var clases = manejadorCache.ObtenerValorCache<List<ListaTiposEnvioDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTiposEnvio = (new TransmisionesProxyrest()).ListarTiposEnvio();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTiposEnvio.ListaTiposEnvio);
                }
                else
                {
                    responseListarTiposEnvio.ListaTiposEnvio = clases;
                }
                responseListarTiposEnvio.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarTiposEnvio.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarTiposEnvio;
        }

        public ResponseListarTiposOperacion ListarTiposOperacion()
        {
            var responseListarTiposOperacion = new ResponseListarTiposOperacion();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TipoOperacion);

                var clases = manejadorCache.ObtenerValorCache<List<ListaTiposOperacionDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarTiposOperacion = (new TransmisionesProxyrest()).ListarTiposOperacion();
                    manejadorCache.InsertarValorCache(keyCache, responseListarTiposOperacion.ListaTiposOperacion);
                }
                else
                {
                    responseListarTiposOperacion.ListaTiposOperacion = clases;
                }
                responseListarTiposOperacion.Result = new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                responseListarTiposOperacion.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarTiposOperacion;
        }

        public ResponseListarLinea ListarLinea()
        {
            ResponseListarLinea responseListarLinea = new ResponseListarLinea();
            var usuario = Helpers.Helper.GetUsuarioCliente();
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

                responseListarLinea.Result = new Result();
                responseListarLinea.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarLinea.Result = new Result();
                responseListarLinea.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            var responseConfiguracionLinea = ObtenerConfiguracionLinea();
            responseListarLinea.LineasList = (from xx in responseListarLinea.LineasList join yy in responseConfiguracionLinea.ConfiguracionLinea on xx.Codigo equals yy.CodigoLinea select xx).ToList();
            if (usuario != null)

                responseListarLinea.LineasList = (from xx in responseListarLinea.LineasList join yy in usuario.Usuario.ListaCodigosLineas on xx.Codigo equals yy select xx).ToList();

            return responseListarLinea;
        }



        public ResponseListarLinea ListarLineaSinConfiguracionLinea()
        {
            ResponseListarLinea responseListarLinea = new ResponseListarLinea();
            var usuario = Helpers.Helper.GetUsuarioCliente();
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

                responseListarLinea.Result = new Result();
                responseListarLinea.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarLinea.Result = new Result();
                responseListarLinea.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            if (usuario != null)

                responseListarLinea.LineasList = (from xx in responseListarLinea.LineasList join yy in usuario.Usuario.ListaCodigosLineas on xx.Codigo equals yy select xx).ToList();

            return responseListarLinea;
        }



        public ResponseListarRolCiente ListarRolCliente()
        {
            ResponseListarRolCiente responseListarRolCliente = new ResponseListarRolCiente();
            var usuario = Helpers.Helper.GetUsuarioCliente();
            try
            {
                RequestConsultaRolCliente requestAgente = new RequestConsultaRolCliente();
                requestAgente.codigo = new CodigoClienteRolDTO();
                requestAgente.codigo.SociedadPropietaria = "301";

                responseListarRolCliente = (new TransmisionesProxyrest()).ListarRolCliente(requestAgente);

                responseListarRolCliente.Result = new Result();
                responseListarRolCliente.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarRolCliente.Result = new Result();
                responseListarRolCliente.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarRolCliente;
        }

        public ResponseListarMoneda ListarMoneda()
        {
            ResponseListarMoneda responseListarMoneda = new ResponseListarMoneda();
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

                responseListarMoneda.Result = new Result();
                responseListarMoneda.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarMoneda.Result = new Result();
                responseListarMoneda.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarMoneda;
        }
        /// <summary>
        /// Lista Parametros de Negocio
        /// </summary>
        /// <returns></returns>
        public ResponseListarParametrosNegocios ListarParametrosNegocio()
        {
            ResponseListarParametrosNegocios responseListarParametroNegocio = new ResponseListarParametrosNegocios();
            try
            {

                var clases = new List<ListaParametroNegocioDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.ParametroNegocio);

                clases = manejadorCache.ObtenerValorCache<List<ListaParametroNegocioDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarParametroNegocio = (new TransmisionesProxyrest()).ListarParametroNegocio();
                    manejadorCache.InsertarValorCache(keyCache, responseListarParametroNegocio.ParametrosNegocioList);
                }
                else
                {
                    responseListarParametroNegocio.ParametrosNegocioList = clases;
                }

                responseListarParametroNegocio.Result = new Result();
                responseListarParametroNegocio.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarParametroNegocio.Result = new Result();
                responseListarParametroNegocio.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarParametroNegocio;
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
                var keyCache = Convert.ToString(KeyCache.DetalleCatalogo);
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

                responseListarDetalleCatalogo.Result = new Result();
                responseListarDetalleCatalogo.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarDetalleCatalogo.Result = new Result();
                responseListarDetalleCatalogo.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarDetalleCatalogo;
        }

        /// <summary>
        /// Lista Terminal Portuario by codigoSucursal
        /// </summary>
        /// <returns></returns>
        public ResponseListarTerminalPortuario ListarTerminalPortuarioBySucursal(string codigoSucursal)
        {
            var listarTerminalPortuario = new ResponseListarTerminalPortuario();
            try
            {
                var responseListarTerminalPortuario = ListarTerminalPortuario();
                listarTerminalPortuario.TotalRegistros = responseListarTerminalPortuario.TotalRegistros;
                listarTerminalPortuario.CantidadPaginas = responseListarTerminalPortuario.CantidadPaginas;
                listarTerminalPortuario.Result = responseListarTerminalPortuario.Result;
                listarTerminalPortuario.TerminalPortuarioList = (from x in responseListarTerminalPortuario.TerminalPortuarioList
                                                                 where x.CodigoSucursal == codigoSucursal
                                                                 select x).ToList();
            }
            catch (Exception ex)
            {
                listarTerminalPortuario.Result = new Result();
                listarTerminalPortuario.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return listarTerminalPortuario;
        }
        /// <summary>
        /// Lista Terminal Portuario by codigoSucursal
        /// </summary>
        /// <returns></returns>
        public ResponseListarTerminalPortuario ListarTerminalPortuarioTodos()
        {
            ResponseListarTerminalPortuario listarTerminalPortuario = new ResponseListarTerminalPortuario();
            try
            {
                var responseListarTerminalPortuario = ListarTerminalPortuario();
                listarTerminalPortuario.TotalRegistros = responseListarTerminalPortuario.TotalRegistros;
                listarTerminalPortuario.CantidadPaginas = responseListarTerminalPortuario.CantidadPaginas;
                listarTerminalPortuario.Result = responseListarTerminalPortuario.Result;
                listarTerminalPortuario.TerminalPortuarioList = responseListarTerminalPortuario.TerminalPortuarioList;

            }
            catch (Exception ex)
            {
                listarTerminalPortuario.Result = new Result();
                listarTerminalPortuario.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return listarTerminalPortuario;
        }

        public ResponseListarTipoCambio ListarTipoCambio(RequestBusquedaTipoCambio request)
        {
            ResponseListarTipoCambio responseListarTipoCambio = new ResponseListarTipoCambio();
            try
            {
                responseListarTipoCambio = (new TransmisionesProxyrest()).ListarTipoCambio(request);
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseListarTipoCambio;
        }


        /// <summary>
        /// Lista Clientes
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaCliente ListarCliente(RequestBusquedaClienteViewModel request)
        {
            var responseListarCliente = new ResponseBusquedaCliente();
            try
            {
                var requestAgente = new RequestConsultaCliente
                {
                    CodigoCliente = request.filtro.CodigoCliente,
                    Nombre = request.filtro.Nombre,
                    Ruc = request.filtro.Ruc,
                    Dni = request.filtro.Dni,
                    CodigoRol = request.filtro.CodigoRol,
                    RequerirRol = request.filtro.RequerirRol,
                    OmitirRol = request.filtro.OmitirRol, //JM
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                responseListarCliente = new TransmisionesProxyrest().ListarCliente(requestAgente);
                var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                List<ListaDetalleCatalagoViewModel> listaCliente;
                if (request.filtro.TipoCliente == "Master")
                {
                    listaCliente = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                    where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlMaster)
                                    select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                    responseListarCliente.ClienteList = (from xx in responseListarCliente.ClienteList join yy in listaCliente on xx.CodigoRolSap equals yy.Codigo select xx).ToList();
                }
                if (request.filtro.TipoCliente == "House")
                {
                    listaCliente = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                                    where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlHouse)
                                    select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                    responseListarCliente.ClienteList = (from xx in responseListarCliente.ClienteList join yy in listaCliente on xx.CodigoRolSap equals yy.Codigo select xx).ToList();

                }
                //responseListarCliente.ClienteList = (from xx in responseListarCliente.ClienteList join yy in listaCliente on xx.CodigoRolSap equals yy.Codigo select xx).ToList();
            }
            catch (Exception ex)
            {
                responseListarCliente.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseListarCliente;
        }
        /// <summary>
        /// Lista Clientes
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseListarGrupoPuertoExternoViewModel ListarGrupoPuerto(RequestBusquedaGrupoPuertoExternoViewModel request)
        {
            var responseData = new ResponseListarGrupoPuertoExternoViewModel();
            try
            {
                var requestAgente = new RequestListarGrupoPuertoExterno
                {
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoGrupoPuerto = request.filtro.CodigoGrupoPuerto,
                    NombreGrupoPuerto = request.filtro.NombreGrupoPuerto,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var result = new TransmisionesProxyrest().ListarGrupoPuertoExterno(requestAgente);

                if (result.GrupoPuertoExternoList.Count > 0)
                {
                    responseData.CantidadPaginas = result.CantidadPaginas;
                    responseData.TotalRegistros = result.TotalRegistros;
                    responseData.NroPagina = result.NroPagina;
                    responseData.Result = result.Result;
                    responseData.GrupoPuertoExternoList = (from item in result.GrupoPuertoExternoList
                                                           select new ListaGrupoPuertoExternoViewModel()
                                                              {
                                                                  CodigoLinea = item.CodigoLinea,
                                                                  Linea = item.Linea,
                                                                  CodigoGrupoPuerto = item.CodigoGrupoPuerto,
                                                                  NombreGrupoPuerto = item.NombreGrupoPuerto,
                                                                  EstadoRegistro = item.EstadoRegistro ? "Activo" : "Inactivo",
                                                                  FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion),
                                                                  UsuarioCreacion = item.UsuarioCreacion,
                                                                  FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion),
                                                                  UsuarioActualizacion = item.UsuarioActualizacion
                                                              }
                                                       ).ToList();

                }
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }

        /// <summary>
        /// Lista Contenedor
        /// </summary>
        /// <returns></returns>
        //public ResponseListarTipoContenedor ListarTipoContenedor(RequestBusquedaTipoContenedorViewModel request)
        //{
        //    var listaResponseResult = new ResponseListarTipoContenedor();
        //    try
        //    {
        //        var response = ListarContenedor();
        //        listaResponseResult.TotalRegistros = response.TotalRegistros;
        //        listaResponseResult.CantidadPaginas = response.CantidadPaginas;
        //        listaResponseResult.Result = response.Result;
        //        if (string.IsNullOrEmpty(request.filtro.CodigoClaseContenedor) && string.IsNullOrEmpty(request.filtro.CodigoLinea))
        //        {
        //            listaResponseResult.TipoContenedorList = response.TipoContenedorList;
        //        }
        //        else
        //        {
        //            listaResponseResult.TipoContenedorList = (from x in response.TipoContenedorList
        //                                                      where
        //                                                      x.CodigoClaseContenedor == (string.IsNullOrEmpty(request.filtro.CodigoClaseContenedor) ? x.CodigoClaseContenedor : request.filtro.CodigoClaseContenedor)
        //                                                      && x.CodigoLinea == request.filtro.CodigoLinea
        //                                                      select x).ToList();
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        listaResponseResult.Result = new Result();
        //        listaResponseResult.Result.Satisfactorio = false;
        //        ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
        //    }
        //    return listaResponseResult;
        //}

        /// <summary>
        /// Listar Tipo contenedor Linea
        /// </summary>
        /// <param name="codigoLinea"></param>
        /// <returns></returns>
        public ResponseListarTipoContenedor ListarTipoContenedorByLinea(string codigoLinea)
        {
            var listaResponseResult = new ResponseListarTipoContenedor();
            try
            {
                var response = ListarContenedor();
                listaResponseResult.TotalRegistros = response.TotalRegistros;
                listaResponseResult.CantidadPaginas = response.CantidadPaginas;
                listaResponseResult.Result = response.Result;
                if (string.IsNullOrEmpty(codigoLinea))
                {
                    listaResponseResult.TipoContenedorList = response.TipoContenedorList;
                }
                else
                {
                    listaResponseResult.TipoContenedorList = (from x in response.TipoContenedorList
                                                              where
                                                                  x.CodigoLinea == codigoLinea
                                                              select x).ToList();
                }

            }
            catch (Exception ex)
            {
                listaResponseResult.Result = new Result();
                listaResponseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return listaResponseResult;
        }
        public ResponseListarTipoContenedor ListarContenedor()
        {
            ResponseListarTipoContenedor responseTipoContenedor = new ResponseListarTipoContenedor();
            try
            {
                var clases = new List<ListaTipoContenedorDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.TipoContenedor);

                clases = manejadorCache.ObtenerValorCache<List<ListaTipoContenedorDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseTipoContenedor = (new TransmisionesProxyrest()).ListarTipoContenedor();
                    manejadorCache.InsertarValorCache(keyCache, responseTipoContenedor.TipoContenedorList);
                }
                else
                {
                    responseTipoContenedor.TipoContenedorList = clases;
                }

                responseTipoContenedor.Result = new Result();
                responseTipoContenedor.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseTipoContenedor.Result = new Result();
                responseTipoContenedor.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTipoContenedor;
        }

        /// <summary>
        /// Lista clase contenedor
        /// </summary>
        /// <returns></returns>
        public ResponseListarClaseContenedor ListarClaseContenedor()
        {
            ResponseListarClaseContenedor responseTipoContenedor = new ResponseListarClaseContenedor();
            try
            {
                var clases = new List<ClaseContenedorDTO>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.ClaseContenedor);
                clases = manejadorCache.ObtenerValorCache<List<ClaseContenedorDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseTipoContenedor = (new TransmisionesProxyrest()).ListarClaseContenedor();
                    manejadorCache.InsertarValorCache(keyCache, responseTipoContenedor.ClaseContenedorList);
                }
                else
                {
                    responseTipoContenedor.ClaseContenedorList = clases;
                }
                responseTipoContenedor.Result = new Result();
                responseTipoContenedor.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseTipoContenedor.Result = new Result();
                responseTipoContenedor.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTipoContenedor;
        }


        /// <summary>
        /// Buscar administrar tipo contenedor
        /// </summary>
        /// <returns></returns>
        //public ResponseTipoContenedorViewModel BusquedaAdministrarTipoContenedor(RequestAdministrarTipoContenedorBusquedaViewModel request)
        //{
        //    var listaResponseResult = new ResponseTipoContenedorViewModel();
        //    try
        //    {
        //        var response = new TransmisionesProxyrest().ListarTipoContenedor();
        //        listaResponseResult.TotalRegistros = response.TotalRegistros;
        //        listaResponseResult.CantidadPaginas = response.CantidadPaginas;
        //        listaResponseResult.Result = response.Result;
        //        listaResponseResult.TipoContenedorList = (from x in response.TipoContenedorList
        //                                                  where x.CodigoClaseContenedor == (string.IsNullOrEmpty(request.filtro.CodigoClaseContenedor) ? x.CodigoClaseContenedor : request.filtro.CodigoClaseContenedor)
        //                                                  && x.Descripcion.Contains((string.IsNullOrEmpty(request.filtro.NombreTipoContenedor) ? x.Descripcion : request.filtro.NombreTipoContenedor))
        //                                                  select new TipoContenedorViewModel()
        //                                                    {
        //                                                        CodigoTipoContenedor = x.CodigoTipoContenedor,
        //                                                        CodigoClaseContenedor = x.CodigoClaseContenedor,
        //                                                        Descripcion = x.Descripcion,
        //                                                        UsuarioCreacion = x.UsuarioCreacion,
        //                                                        FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", x.FechaHoraCreacion),
        //                                                        UsuarioActualizacion = x.UsuarioActualizacion,
        //                                                        FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", x.FechaHoraActualizacion),
        //                                                        EstadoRegistro = x.EstadoRegistro ? "Activo" : "Inactivo"
        //                                                    }
        //                                                ).ToList();

        //    }
        //    catch (Exception ex)
        //    {
        //        listaResponseResult.Result = new Result();
        //        listaResponseResult.Result.Satisfactorio = false;
        //        ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
        //    }
        //    return listaResponseResult;
        //}

        /// <summary>
        /// Eliminar tipo contenedor
        /// </summary>
        /// <returns></returns>
        public ResponseEliminarTipoContenedor EliminarTipoContenedor(RequestEliminarTipoContenedorViewModel request)
        {
            var responseResult = new ResponseEliminarTipoContenedor();
            try
            {
                var requestAge = new RequestEliminarTipoContenedor()
                {
                    CodigoLinea = request.CodigoLinea,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoClaseContenedor = request.CodigoClaseContenedor,
                    UsuarioActualizacion = request.UsuarioActualizacion
                };
                responseResult = new TransmisionesProxyrest().EliminarTipoContenedor(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }
        public ResponseActualizarTipoContenedor ActualizarTipoContenedor(RequestActualizarTipoContenedorViewModel request)
        {
            var responseResult = new ResponseActualizarTipoContenedor();
            try
            {
                var requestAge = new RequestActualizarTipoContenedor()
                {
                    CodigoLinea = request.CodigoLinea,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoClaseContenedor = request.CodigoClaseContenedor,
                    Descripcion = request.Descripcion,
                    UsuarioActualizacion = request.UsuarioActualizacion,
                    FechaHoraActualizacion = DateTime.Now,
                    EstadoRegistro = request.EstadoRegistro == "Activo"
                };
                responseResult = new TransmisionesProxyrest().ActualizarTipoContenedor(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }
        //public ResponseRegistrarTipoContenedor RegistrarTipoContenedor(RequestRegistrarTipoContenedorViewModel2 request)
        //{
        //    var responseResult = new ResponseRegistrarTipoContenedor();
        //    try
        //    {
        //        var requestAge = new RequestRegistrarTipoContenedor()
        //        {
        //            CodigoLinea = request.CodigoLinea,
        //            CodigoTipoContenedor = request.CodigoTipoContenedor,
        //            CodigoClaseContenedor = request.CodigoClaseContenedor,
        //            Descripcion = request.Descripcion,
        //            UsuarioCreacion = request.UsuarioCreacion,
        //            FechaHoraCreacion = DateTime.Now,
        //            EstadoRegistro = request.EstadoRegistro == "Activo",
        //        };

        //        responseResult = new TransmisionesProxyrest().RegistrarTipoContenedor(requestAge);
        //    }
        //    catch (Exception ex)
        //    {
        //        responseResult.Result = new Result();
        //        responseResult.Result.Satisfactorio = false;
        //        ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
        //    }
        //    return responseResult;
        //}


        #region Maestro

        public Result LimpiarDatosCache()
        {
            return new TransmisionesProxyrest().LimpiarCache();
        }

        public ResponseAgregarGrupoPuertoExterno AgregarGrupoPuertoExterno(RequestAgregarGrupoPuertoExternoViewModel request)
        {
            var responseResult = new ResponseAgregarGrupoPuertoExterno();
            try
            {
                var requestAge = new RequestAgregarGrupoPuertoExterno
                {
                    CodigoLinea = request.CodigoLinea,
                    NombreGrupoPuerto = request.NombreGrupoPuerto,
                    UsuarioCreacion = request.UsuarioCreacion
                };

                responseResult = new TransmisionesProxyrest().AgregarGrupoPuertoExterno(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }
        public ResponseActualizarGrupoPuertoExterno ActualizarGrupoPuertoExterno(RequestActualizarGrupoPuertoExternoViewModel request)
        {
            var responseResult = new ResponseActualizarGrupoPuertoExterno();
            try
            {
                var requestAge = new RequestActualizarGrupoPuertoExterno
                {
                    CodigoLinea = request.CodigoLinea,
                    CodigoGrupoPuerto = request.CodigoGrupoPuerto,
                    NombreGrupoPuerto = request.NombreGrupoPuerto,
                    UsuarioActualizacion = request.UsuarioActualizacion
                };
                responseResult = new TransmisionesProxyrest().ActualizarGrupoPuertoExterno(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }
        public ResponseEliminarGrupoPuertoExterno EliminarGrupoPuertoExterno(RequestEliminarGrupoPuertoExternoViewModel request)
        {

            var responseResult = new ResponseEliminarGrupoPuertoExterno();
            try
            {
                var requestAge = new RequestEliminarGrupoPuertoExterno
                {
                    CodigoGrupoPuerto = request.CodigoGrupoPuerto
                };
                responseResult = new TransmisionesProxyrest().EliminarGrupoPuertoExterno(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseConsultarPesoVariableViewModel ConsultarPesoVariable(RequestConsultarPesoVariableViewModel request)
        {
            var responseData = new ResponseConsultarPesoVariableViewModel();
            try
            {
                var requestAgente = new RequestConsultarPesoVariable
                {
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoVariable = request.filtro.CodigoVariable,
                    Descripcion = request.filtro.Descripcion,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var result = new TransmisionesProxyrest().ConsultarPesoVariable(requestAgente);
                if (result.PesoVariableList.Count > 0)
                {
                    responseData.CantidadPaginas = result.CantidadPaginas;
                    responseData.TotalRegistros = result.TotalRegistros;
                    responseData.NroPagina = result.NroPagina;
                    responseData.Result = result.Result;
                    responseData.PesoVariableList = (from item in result.PesoVariableList
                                                     select new PesoVariableViewModel()
                                                              {
                                                                  CodigoLinea = item.CodigoLinea,
                                                                  Linea = item.Linea,
                                                                  CodigoVariable = item.CodigoVariable,
                                                                  Descripcion = item.Descripcion,
                                                                  PesoVariable = item.PesoVariable,
                                                                  EstadoRegistro = item.EstadoRegistro ? "Activo" : "Inactivo",
                                                                  FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion),
                                                                  UsuarioCreacion = item.UsuarioCreacion,
                                                                  FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion),
                                                                  UsuarioActualizacion = item.UsuarioActualizacion
                                                              }
                                                       ).ToList();
                }
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }
        public ResponseRegistrarPesoVariable RegistrarPesoVariable(RequestRegistrarPesoVariableViewModel request)
        {
            var responseResult = new ResponseRegistrarPesoVariable();
            try
            {
                var requestAge = new RequestRegistrarPesoVariable()
                {
                    CodigoLinea = request.CodigoLinea,
                    Descripcion = request.Descripcion,
                    EstadoRegistro = request.EstadoRegistro == "Activo",
                    FechaHoraCreacion = request.FechaHoraCreacion,
                    PesoVariable = request.PesoVariable,
                    UsuarioCreacion = request.UsuarioCreacion
                };

                responseResult = new TransmisionesProxyrest().RegistrarPesoVariable(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }
        public ResponseActualizarPesoVariable ActualizarPesoVariable(RequestActualizarPesoVariableViewModel request)
        {
            var responseResult = new ResponseActualizarPesoVariable();
            try
            {
                var requestAge = new RequestActualizarPesoVariable()
                {
                    CodigoLinea = request.CodigoLinea,
                    CodigoVariable = request.CodigoVariable,
                    Descripcion = request.Descripcion,
                    EstadoRegistro = request.EstadoRegistro == "Activo",
                    FechaHoraActualizacion = request.FechaHoraActualizacion,
                    PesoVariable = request.PesoVariable,
                    UsuarioActualizacion = request.UsuarioActualizacion
                };

                responseResult = new TransmisionesProxyrest().ActualizarPesoVariable(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }
        public ResponseEliminarPesoVariable EliminarPesoVariable(RequestEliminarPesoVariableViewModel request)
        {
            var responseResult = new ResponseEliminarPesoVariable();
            try
            {
                var requestAge = new RequestEliminarPesoVariable()
                {
                    CodigoVariable = request.CodigoVariable
                };
                responseResult = new TransmisionesProxyrest().EliminarPesoVariable(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseConsultarTipoContenedorExternoViewModel ConsultarTipoContenedorExterno(RequestConsultarTipoContenedorExternoViewModel request)
        {
            var responseData = new ResponseConsultarTipoContenedorExternoViewModel();
            try
            {
                var requestAgente = new RequestConsultarTipoContenedorExterno
                {
                    CodigoEquivalencia = request.filtro.CodigoEquivalencia,
                    CodigoTipoContenedorExterno = request.filtro.CodigoTipoContenedorExterno,
                    CodigoLinea = request.filtro.CodigoLinea,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var result = new TransmisionesProxyrest().ConsultarTipoContenedorExterno(requestAgente);
                if (result.TipoContenedorExternoList.Count > 0)
                {
                    responseData.CantidadPaginas = result.CantidadPaginas;
                    responseData.TotalRegistros = result.TotalRegistros;
                    responseData.NroPagina = result.NroPagina;
                    responseData.Result = result.Result;
                    responseData.TipoContenedorExternoList = (from item in result.TipoContenedorExternoList
                                                              select new TipoContenedorExternoViewModel()
                                                              {
                                                                  ClaseContenedor = item.ClaseContenedor,
                                                                  CodigoClaseContenedor = item.CodigoClaseContenedor,
                                                                  CodigoEquivalencia = item.CodigoEquivalencia,
                                                                  CodigoTipoContenedor = item.CodigoTipoContenedor,
                                                                  CodigoTipoContenedorExterno = item.CodigoTipoContenedorExterno,
                                                                  TipoContenedor = item.TipoContenedor,
                                                                  EstadoRegistro = item.EstadoRegistro ? "Activo" : "Inactivo",
                                                                  FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion),
                                                                  UsuarioCreacion = item.UsuarioCreacion,
                                                                  FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion),
                                                                  UsuarioActualizacion = item.UsuarioActualizacion,
                                                                  CodigoLinea = item.CodigoLinea,
                                                                  Linea = item.Linea
                                                              }
                                                       ).ToList();
                }
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }
        public ResponseRegistrarTipoContenedorExterno RegistrarTipoContenedorExterno(RequesRegistrarTipoContenedorExternoViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoContenedorExterno();
            try
            {
                var requestAge = new RequesRegistrarTipoContenedorExterno()
                {
                    CodigoLinea = request.CodigoLinea,
                    CodigoClaseContenedor = request.CodigoClaseContenedor,
                    CodigoEquivalencia = request.CodigoEquivalencia,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoTipoContenedorExterno = request.CodigoTipoContenedorExterno,
                    EstadoRegistro = request.EstadoRegistro == "Activo",
                    FechaHoraCreacion = request.FechaHoraCreacion,
                    UsuarioCreacion = request.UsuarioCreacion
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoContenedorExterno(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }
        public ResponseActualizarTipoContenedorExterno ActualizarTipoContenedorExterno(RequestActualizarTipoContenedorExternoViewModel request)
        {
            var responseResult = new ResponseActualizarTipoContenedorExterno();
            try
            {
                var requestAge = new RequestActualizarTipoContenedorExterno()
                {
                    CodigoLinea = request.CodigoLinea,
                    CodigoClaseContenedor = request.CodigoClaseContenedor,
                    CodigoEquivalencia = request.CodigoEquivalencia,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoTipoContenedorExterno = request.CodigoTipoContenedorExterno,
                    EstadoRegistro = request.EstadoRegistro == "Activo",
                    FechaHoraActualizacion = request.FechaHoraActualizacion,
                    UsuarioActualizacion = request.UsuarioActualizacion
                };
                responseResult = new TransmisionesProxyrest().ActualizarTipoContenedorExterno(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;

        }
        public ResponseEliminarTipoContenedorExterno EliminarTipoContenedorExterno(RequestEliminarTipoContenedorExternoViewModel request)
        {
            var responseResult = new ResponseEliminarTipoContenedorExterno();
            try
            {
                var requestAge = new RequestEliminarTipoContenedorExterno()
                {
                    CodigoLinea = request.CodigoLinea,
                    CodigoClaseContenedor = request.CodigoClaseContenedor,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoTipoContenedorExterno = request.CodigoTipoContenedorExterno,
                    UsuarioActualizacion = request.UsuarioActualizacion
                };
                responseResult = new TransmisionesProxyrest().EliminarTipoContenedorExterno(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseConsultarDetalleGrupoPuertoExternoViewModel ConsultarDetalleGrupoPuertoExterno(RequestConsultarDetalleGrupoPuertoExternoViewModel request)
        {
            var responseData = new ResponseConsultarDetalleGrupoPuertoExternoViewModel();
            try
            {
                var requestAgente = new RequestConsultarDetalleGrupoPuertoExterno
                {
                    CodigoGrupoPuerto = request.filtro.CodigoGrupoPuerto
                    //CodigoGrupoPuertoDetalle = request.filtro.CodigoGrupoPuertoDetalle
                };
                var result = new TransmisionesProxyrest().ConsultarDetalleGrupoPuertoExterno(requestAgente);
                if (result.DetalleGrupoPuertoExternoList.Count > 0)
                {
                    responseData.CantidadPaginas = result.CantidadPaginas;
                    responseData.TotalRegistros = result.TotalRegistros;
                    responseData.NroPagina = result.NroPagina;
                    responseData.Result = result.Result;
                    foreach (var item in result.DetalleGrupoPuertoExternoList)
                    {
                        var objet = new DetalleGrupoPuertoExternoViewModel
                        {
                            CodigoGrupoPuertoDetalle = item.CodigoGrupoPuertoDetalle,
                            CodigoGrupoPuerto = item.CodigoGrupoPuerto,
                            CodigoPuerto = item.CodigoPuerto,
                            Accion = item.Accion,
                            EstadoRegistro = item.EstadoRegistro ? "Activo" : "Inactivo",
                            UsuarioCreacion = item.UsuarioCreacion,
                            FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion)
                        };
                        responseData.DetalleGrupoPuertoExternoList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }
        public ResponseModificarDetalleGrupoPuertoExterno TransaccionDetalleGrupoPuertoExterno(RequestDetalleGrupoPuertoExternoViewModel request)
        {
            var responseResult = new ResponseModificarDetalleGrupoPuertoExterno();
            try
            {
                var requestAgente = new RequestModificarDetalleGrupoPuertoExterno();
                var item = new DetalleGrupoPuertoExternoDTO()
                {
                    CodigoGrupoPuertoDetalle = request.CodigoGrupoPuertoDetalle,
                    CodigoGrupoPuerto = request.CodigoGrupoPuerto,
                    CodigoPuerto = request.CodigoPuerto,
                    UsuarioCreacion = request.UsuarioCreacion,
                    EstadoRegistro = request.EstadoRegistro == "Activo",
                    FechaHoraCreacion = request.FechaHoraCreacion,
                    Accion = request.Accion
                };
                requestAgente.ListaDetalleGrupoPuerto.Add(item);
                responseResult = new TransmisionesProxyrest().ModificarDetalleGrupoPuertoExterno(requestAgente);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseConsultarDetalleTipoContenedorExternoViewModel ConsultarDetalleTipoContenedorExterno(RequestConsultarDetalleTipoContenedorExternoViewModel request)
        {
            var responseData = new ResponseConsultarDetalleTipoContenedorExternoViewModel();
            try
            {
                var requestAgente = new RequestConsultarDetalleTipoContenedorExterno
                {
                    CodigoTipoContenedorExterno = request.filtro.CodigoTipoContenedorExterno
                };
                var result = new TransmisionesProxyrest().ConsultarDetalleTipoContenedorExterno(requestAgente);
                if (result.DetalleTipoContenedorExternoList.Count > 0)
                {
                    responseData.CantidadPaginas = result.CantidadPaginas;
                    responseData.TotalRegistros = result.TotalRegistros;
                    responseData.NroPagina = result.NroPagina;
                    responseData.Result = result.Result;
                    foreach (var item in result.DetalleTipoContenedorExternoList)
                    {
                        var objet = new DetalleTipoContenedorExternoViewModel
                        {
                            CodigoClaseContenedor = item.CodigoClaseContenedor,
                            CodigoTipoContenedor = item.CodigoTipoContenedor,
                            CodigoTipoContenedorExterno = item.CodigoTipoContenedorExterno,
                            CodigoTipoContenedorExternoDetalle = item.CodigoTipoContenedorExternoDetalle,
                            EstadoRegistro = item.EstadoRegistro ? "Activo" : "Inactivo",
                            FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion),
                            UsuarioCreacion = item.UsuarioCreacion,
                            FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion),
                            UsuarioActualizacion = item.UsuarioActualizacion
                        };
                        responseData.DetalleTipoContenedorExternoList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }
        public ResponseModificarDetalleTipoContenedorExterno TransaccionDetalleTipoContenedorExterno(RequestDetalleTipoContenedorExternoViewModel request)
        {
            var responseResult = new ResponseModificarDetalleTipoContenedorExterno();
            try
            {
                var requestAgente = new RequestModificarDetalleTipoContenedorExterno();
                var item = new DetalleTipoContenedorExternoDTO()
                {
                    CodigoClaseContenedor = request.CodigoClaseContenedor,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoLinea = request.CodigoLinea,
                    CodigoTipoContenedorExterno = request.CodigoTipoContenedorExterno,
                    CodigoTipoContenedorExternoDetalle = request.CodigoTipoContenedorExternoDetalle,
                    EstadoRegistro = request.EstadoRegistro == "Activo",
                    FechaHoraActualizacion = request.FechaHoraActualizacion,
                    FechaHoraCreacion = request.FechaHoraCreacion,
                    UsuarioActualizacion = request.UsuarioActualizacion,
                    UsuarioCreacion = request.UsuarioCreacion,
                    Accion = request.Accion
                };
                requestAgente.DetalleTipoContenedorExternoList.Add(item);
                responseResult = new TransmisionesProxyrest().ModificarDetalleTipoContenedorExterno(requestAgente);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        //public ResponseListarTipoContenedor BuscarTipoContenedor(string codigoClaseContenedor)
        //{
        //    var listaResponseResult = new ResponseListarTipoContenedor();
        //    try
        //    {
        //        var response = ListarContenedor();
        //        listaResponseResult.TotalRegistros = response.TotalRegistros;
        //        listaResponseResult.CantidadPaginas = response.CantidadPaginas;
        //        listaResponseResult.Result = response.Result;
        //        if (!string.IsNullOrEmpty(codigoClaseContenedor))
        //        {
        //            listaResponseResult.TipoContenedorList = (from x in response.TipoContenedorList
        //                                                      where x.CodigoClaseContenedor == codigoClaseContenedor
        //                                                      select x).ToList();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        listaResponseResult.Result = new Result();
        //        listaResponseResult.Result.Satisfactorio = false;
        //        ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
        //    }
        //    return listaResponseResult;
        //}

        //public ResponseTipoContenedorViewModel ConsultarTipoContenedorMaestro(RequestAdministrarTipoContenedorBusquedaViewModel request)
        //{
        //    var listaResponseResult = new ResponseTipoContenedorViewModel();
        //    try
        //    {
        //        var response = new TransmisionesProxyrest().ConsultarTipoContenedorMaestro();
        //        listaResponseResult.TotalRegistros = response.TotalRegistros;
        //        listaResponseResult.CantidadPaginas = response.CantidadPaginas;
        //        listaResponseResult.Result = response.Result;
        //        listaResponseResult.TipoContenedorList = (from x in response.TipoContenedorList
        //                                                  where x.CodigoClaseContenedor == (string.IsNullOrEmpty(request.filtro.CodigoClaseContenedor) ? x.CodigoClaseContenedor : request.filtro.CodigoClaseContenedor)
        //                                                  && x.CodigoLinea == (string.IsNullOrEmpty(request.filtro.CodigoLinea) ? x.CodigoLinea : request.filtro.CodigoLinea)
        //                                                  && x.Descripcion.Contains((string.IsNullOrEmpty(request.filtro.NombreTipoContenedor) ? x.Descripcion : request.filtro.NombreTipoContenedor))
        //                                                  select new TipoContenedorViewModel()
        //                                                  {
        //                                                      CodigoTipoContenedor = x.CodigoTipoContenedor,
        //                                                      CodigoClaseContenedor = x.CodigoClaseContenedor,
        //                                                      Descripcion = x.Descripcion,
        //                                                      UsuarioCreacion = x.UsuarioCreacion,
        //                                                      Linea = x.Linea,
        //                                                      CodigoLinea = x.CodigoLinea,
        //                                                      FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", x.FechaHoraCreacion),
        //                                                      UsuarioActualizacion = x.UsuarioActualizacion,
        //                                                      FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", x.FechaHoraActualizacion),
        //                                                      EstadoRegistro = x.EstadoRegistro ? "Activo" : "Inactivo"
        //                                                  }
        //                                                ).ToList();

        //    }
        //    catch (Exception ex)
        //    {
        //        listaResponseResult.Result = new Result();
        //        listaResponseResult.Result.Satisfactorio = false;
        //        ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
        //    }
        //    return listaResponseResult;
        //}
        #endregion

        public ListaParametroNegocioDTO ObtenerParametroNegocio(string codigo)
        {
            var parametroNegocio = new ListaParametroNegocioDTO();
            try
            {
                var lstParametrosNegocio = ListarParametrosNegocio().ParametrosNegocioList;
                if (lstParametrosNegocio.Count > 0)
                {
                    parametroNegocio = lstParametrosNegocio.FirstOrDefault(x => x.Codigo == codigo);
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.LogicaNegocio);
            }

            return parametroNegocio;
        }

        public ResponseBusquedaClienteMatchCode ListarClienteMatchCode(RequestBusquedaClienteMatchCodeViewModel request)
        {
            var responseListarCliente = new ResponseBusquedaClienteMatchCode();
            try
            {
                var requestAgente = new RequestConsultaClienteMatchCode
                {
                    CodigoCliente = request.filtro.CodigoCliente,
                    Nombre = request.filtro.Nombre,
                    Ruc = request.filtro.Ruc,
                    Dni = request.filtro.Dni,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoClienteMatchCode = request.filtro.CodigoClienteMatchCode,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                responseListarCliente = new TransmisionesProxyrest().ListarClienteMatchCode(requestAgente);
                //var responseListaDetalleCatalogo = new MaestrosAgente().ListarDetalleCatalogo(new RequestConsultaDetalleCatalogoViewModel());
                //List<ListaDetalleCatalagoViewModel> listaCliente;
                //if (request.filtro.TipoCliente == "Master")
                //{
                //    listaCliente = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                //                    where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlMaster)
                //                    select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                //    responseListarCliente.ClienteList = (from xx in responseListarCliente.ClienteList join yy in listaCliente on xx.CodigoRolSap equals yy.Codigo select xx).ToList();
                //}
                //if (request.filtro.TipoCliente == "House")
                //{
                //    listaCliente = (from item in responseListaDetalleCatalogo.DetalleCatalogoList
                //                    where item.IdCatalogo == Convert.ToInt32(TablaTablas.RolClienteBlHouse)
                //                    select HelperCtrl.MiMapper<ListaDetalleCatalagoDTO, ListaDetalleCatalagoViewModel>(item)).ToList();

                //    responseListarCliente.ClienteList = (from xx in responseListarCliente.ClienteList join yy in listaCliente on xx.CodigoRolSap equals yy.Codigo select xx).ToList();

                //}
                //responseListarCliente.ClienteList = (from xx in responseListarCliente.ClienteList join yy in listaCliente on xx.CodigoRolSap equals yy.Codigo select xx).ToList();
            }
            catch (Exception ex)
            {
                responseListarCliente.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseListarCliente;
        }

        public ResponseBusquedaPartidaArancelaria ConsultaPartidaArancelaria(RequestBusquedaPartidaArancelariaViewModel request)
        {
            var responseBusquedaPartidaArancelaria = new ResponseBusquedaPartidaArancelaria();
            try
            {
                var requestAgente = new RequestConsultaPartidaArancelaria();
                {
                    requestAgente.CodigoPartidaArancelaria = request.filtro.CodigoPartidaArancelaria;
                    requestAgente.DescripcionPartidaArancelaria = request.filtro.Nombre;
                    requestAgente.IdPartidaArancelaria = request.filtro.IdPartidaArancelaria;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaPartidaArancelaria = new TransmisionesProxyrest().ConsultaPartidaArancelaria(requestAgente);

            }
            catch (Exception ex)
            {
                responseBusquedaPartidaArancelaria.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaPartidaArancelaria;
        }

        public ResponseActualizarPartidaArancelaria ActualizarPartidaArancelaria(RequesAcrualizarPartidaArancelariaViewModel request)
        {
            var responseResult = new ResponseActualizarPartidaArancelaria();
            try
            {
                var requestAge = new RequestActualizarPartidaArancelaria()
                {
                    IdPartidaArancelaria = request.IdPartidaArancelaria,
                    CodigoPartidaArancelaria = request.CodigoPartidaArancelaria,
                    DescripcionPartidaArancelaria = request.DescripcionPartidaArancelaria,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                    FechaHoraRegistro = DateTime.Now,
                };
                responseResult = new TransmisionesProxyrest().ActualizarPartidaArancelaria(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseRegistrarPais RegistrarPais(RequestRegistrarPaisViewModel request)
        {
            var responseResult = new ResponseRegistrarPais();
            try
            {
                var requestAge = new RequestRegistrarPais()
                {
                    CodigoPais = request.CodigoPais,
                    CodigoPaisSunat = request.CodigoPaisSunat,
                    NombrePais = request.NombrePais,
                    CodigoAlfaPais = request.CodigoAlfaPais,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarPais(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaPais ConsultaPais(RequestBusquedaPaisViewModel request)
        {
            var responseBusquedaPais = new ResponseBusquedaPais();
            try
            {
                var requestAgente = new RequestConsultaPais();
                {
                    requestAgente.CodigoPais = request.filtro.CodigoPais;
                    requestAgente.CodigoPaisSunat = request.filtro.CodigoPaisSunat;
                    requestAgente.NombrePais = request.filtro.NombrePais;
                    requestAgente.CodigoAlfaPais = request.filtro.CodigoAlfaPais;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaPais = new TransmisionesProxyrest().ConsultarPais(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaPais.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaPais;
        }

        public ResponseBusquedaPersonaxRol ConsultaPersonaxRol(RequestBusquedaPersonaxRolViewModel request)
        {
            var responseBusquedaPersonaxRol = new ResponseBusquedaPersonaxRol();
            try
            {
                var requestAgente = new RequestConsultaPersonaxRol();
                {
                    requestAgente.CodigoPersona = request.filtro.CodigoPersona;
                    requestAgente.CodigoRol = request.filtro.CodigoRol;
                    requestAgente.RazonSocialPersona = request.filtro.RazonSocialPersona;
                    requestAgente.NumeroDocumentoPersona = request.filtro.NumeroDocumentoPersona;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaPersonaxRol = new TransmisionesProxyrest().ConsultarPersonaxRol(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaPersonaxRol.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaPersonaxRol;
        }

        public ResponseRegistrarItinerario RegistrarItinerario(RequestRegistrarItinerarioViewModel request)
        {
            var responseResult = new ResponseRegistrarItinerario();
            try
            {
                var requestAge = new RequestRegistrarItinerario()
                {
                    CodigoItinerario = request.CodigoItinerario,
                    CodigoNave = request.CodigoNave,
                    CodigoAduana = request.CodigoAduana,
                    CodigoTipoOperacion = request.CodigoTipoOperacion,
                    CodigoTipoLugarCarga = request.CodigoTipoLugarCarga,
                    CodigoOperadorEmbarqueItinerario = request.CodigoOperadorEmbarqueItinerario,
                    CodigoOperadorDescargaItinerario = request.CodigoOperadorDescargaItinerario,
                    CodigoAgenteMaritimoItinerario = request.CodigoAgenteMaritimoItinerario,
                    CodigoTipoLugarCargaPuertoIntermedio = request.CodigoTipoLugarCargaPuertoIntermedio,
                    CodigoPuertoIntermedio = request.CodigoPuertoIntermedio,
                    NumeroViajeItinerario = request.NumeroViajeItinerario,
                    NumeroManifiestoItinerario = request.NumeroManifiestoItinerario,
                    AnioManifiestoItinerario = request.AnioManifiestoItinerario,
                    FechaArriboItinerario = request.FechaArriboItinerario,
                    FechaZarpeItinerario = request.FechaZarpeItinerario,
                    FechaAtraqueItinerario = request.FechaAtraqueItinerario,
                    FechaTerminoDescargaItinerario = request.FechaTerminoDescargaItinerario,
                    DUEItinerario = request.DUEItinerario,
                    CapitanNaveItinerario = request.CapitanNaveItinerario,
                    FechaZarpePuertoIntermedio = request.FechaZarpePuertoIntermedio,
                    Voyage = request.Voyage,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarItinerario(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaItinerario ConsultaItinerario(RequestBusquedaItinerarioViewModel request)
        {
            var responseBusquedaItinerario = new ResponseBusquedaItinerario();
            try
            {
                var requestAgente = new RequestConsultaItinerario();
                {
                    requestAgente.CodigoItinerario = request.filtro.CodigoItinerario;
                    requestAgente.CodigoNave = request.filtro.CodigoNave;
                    requestAgente.CodigoAduana = request.filtro.CodigoAduana;
                    requestAgente.CodigoTipoOperacion = request.filtro.CodigoTipoOperacion;
                    requestAgente.NumeroViajeItinerario = request.filtro.NumeroViajeItinerario;
                    requestAgente.NumeroManifiestoItinerario = request.filtro.NumeroManifiestoItinerario;
                    requestAgente.AnioManifiestoItinerario = request.filtro.AnioManifiestoItinerario;
                    requestAgente.FechaArriboItinerarioInicio = request.filtro.FechaArriboItinerarioInicio;
                    requestAgente.FechaArriboItinerarioFin = request.filtro.FechaArriboItinerarioFin;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaItinerario = new TransmisionesProxyrest().ConsultarItinerario(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaItinerario.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaItinerario;
        }

        public ResponseRegistrarNave RegistrarNave(RequestRegistrarNaveViewModel request)
        {
            var responseResult = new ResponseRegistrarNave();
            try
            {
                var requestAge = new RequestRegistrarNave()
                {
                    CodigoNave = request.CodigoNave,
                    CodigoPais = request.CodigoPais,
                    CodigoTipoNave = request.CodigoTipoNave,
                    CodigoLineaNaviera = request.CodigoLineaNaviera,
                    NombreNave = request.NombreNave,
                    MatriculaNave = request.MatriculaNave,
                    TrbNave = request.TrbNave,
                    TrnNave = request.TrnNave,
                    EsloraNave = request.EsloraNave,
                    MangaNave = request.MangaNave,
                    CaladoNave = request.CaladoNave,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarNave(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Nave.ResponseBusquedaNave ConsultaNave(TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Nave.RequestBusquedaNaveViewModel request)
        {
            var responseBusquedaNave = new TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Nave.ResponseBusquedaNave();
            try
            {
                var requestAgente = new TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Nave.RequestConsultaNave();
                {
                    requestAgente.CodigoNave = request.filtro.CodigoNave;
                    requestAgente.CodigoPais = request.filtro.CodigoPais;
                    requestAgente.CodigoTipoNave = request.filtro.CodigoTipoNave;
                    requestAgente.CodigoLineaNaviera = request.filtro.CodigoLineaNaviera;
                    requestAgente.NombreNave = request.filtro.NombreNave;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaNave = new TransmisionesProxyrest().ConsultarNave(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaNave.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaNave;
        }

        public ResponseRegistrarLineaNaviera RegistrarLineaNaviera(RequestRegistrarLineaNavieraViewModel request)
        {
            var responseResult = new ResponseRegistrarLineaNaviera();
            try
            {
                var requestAge = new RequestRegistrarLineaNaviera()
                {
                    CodigoLineaNaviera = request.CodigoLineaNaviera,
                    NombreLineaNaviera = request.NombreLineaNaviera,
                    DireccionLineaNaviera = request.DireccionLineaNaviera,
                    RucLineaNaviera = request.RucLineaNaviera,
                    CodigoEquivalencia = request.CodigoEquivalencia,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarLineaNaviera(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaLineaNaviera ConsultaLineaNaviera(RequestBusquedaLineaNavieraViewModel request)
        {
            var responseBusquedaLineaNaviera = new ResponseBusquedaLineaNaviera();
            try
            {
                var requestAgente = new RequestConsultaLineaNaviera();
                {
                    requestAgente.CodigoLineaNaviera = request.filtro.CodigoLineaNaviera;
                    requestAgente.NombreLineaNaviera = request.filtro.NombreLineaNaviera;
                    requestAgente.RucLineaNaviera = request.filtro.RucLineaNaviera;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaLineaNaviera = new TransmisionesProxyrest().ConsultarLineaNaviera(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaLineaNaviera.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaLineaNaviera;
        }

        public ResponseRegistrarTipoLugarCarga RegistrarTipoLugarCarga(RequestRegistrarTipoLugarCargaViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoLugarCarga();
            try
            {
                var requestAge = new RequestRegistrarTipoLugarCarga()
                {
                    CodigoTipoLugarCarga = request.CodigoTipoLugarCarga,
                    CodigoTipoLugarCargaSunat = request.CodigoTipoLugarCargaSunat,
                    NombreTipoLugarCarga = request.NombreTipoLugarCarga,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoLugarCarga(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoLugarCarga ConsultaTipoLugarCarga(RequestBusquedaTipoLugarCargaViewModel request)
        {
            var responseBusquedaTipoLugarCarga = new ResponseBusquedaTipoLugarCarga();
            try
            {
                var requestAgente = new RequestConsultaTipoLugarCarga();
                {
                    requestAgente.CodigoTipoLugarCarga = request.filtro.CodigoTipoLugarCarga;
                    requestAgente.CodigoTipoLugarCargaSunat = request.filtro.CodigoTipoLugarCargaSunat;
                    requestAgente.NombreTipoLugarCarga = request.filtro.NombreTipoLugarCarga;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoLugarCarga = new TransmisionesProxyrest().ConsultarTipoLugarCarga(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoLugarCarga.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoLugarCarga;
        }

        public ResponseRegistrarTipoEnvio RegistrarTipoEnvio(RequestRegistrarTipoEnvioViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoEnvio();
            try
            {
                var requestAge = new RequestRegistrarTipoEnvio()
                {
                    CodigoTipoEnvio = request.CodigoTipoEnvio,
                    CodigoTipoEnvioSunat = request.CodigoTipoEnvioSunat,
                    NombreTipoEnvio = request.NombreTipoEnvio,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoEnvio(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoEnvio ConsultaTipoEnvio(RequestBusquedaTipoEnvioViewModel request)
        {
            var responseBusquedaTipoEnvio = new ResponseBusquedaTipoEnvio();
            try
            {
                var requestAgente = new RequestConsultaTipoEnvio();
                {
                    requestAgente.CodigoTipoEnvio = request.filtro.CodigoTipoEnvio;
                    requestAgente.CodigoTipoEnvioSunat = request.filtro.CodigoTipoEnvioSunat;
                    requestAgente.NombreTipoEnvio = request.filtro.NombreTipoEnvio;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoEnvio = new TransmisionesProxyrest().ConsultarTipoEnvio(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoEnvio.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoEnvio;
        }

        public ResponseRegistrarTipoNave RegistrarTipoNave(RequestRegistrarTipoNaveViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoNave();
            try
            {
                var requestAge = new RequestRegistrarTipoNave()
                {
                    CodigoTipoNave = request.CodigoTipoNave,
                    CodigoTipoNaveSunat = request.CodigoTipoNaveSunat,
                    NombreTipoNave = request.NombreTipoNave,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoNave(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoNave ConsultaTipoNave(RequestBusquedaTipoNaveViewModel request)
        {
            var responseBusquedaTipoNave = new ResponseBusquedaTipoNave();
            try
            {
                var requestAgente = new RequestConsultaTipoNave();
                {
                    requestAgente.CodigoTipoNave = request.filtro.CodigoTipoNave;
                    requestAgente.CodigoTipoNaveSunat = request.filtro.CodigoTipoNaveSunat;
                    requestAgente.NombreTipoNave = request.filtro.NombreTipoNave;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoNave = new TransmisionesProxyrest().ConsultarTipoNave(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoNave.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoNave;
        }

        public ResponseRegistrarTipoFlete RegistrarTipoFlete(RequestRegistrarTipoFleteViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoFlete();
            try
            {
                var requestAge = new RequestRegistrarTipoFlete()
                {
                    CodigoTipoFlete = request.CodigoTipoFlete,
                    NombreTipoFlete = request.NombreTipoFlete,
                    CodigoAduanaTipoFlete = request.CodigoAduanaTipoFlete,
                    CodigoEquivalencia = request.CodigoEquivalencia,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoFlete(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoFlete ConsultaTipoFlete(RequestBusquedaTipoFleteViewModel request)
        {
            var responseBusquedaTipoFlete = new ResponseBusquedaTipoFlete();
            try
            {
                var requestAgente = new RequestConsultaTipoFlete();
                {
                    requestAgente.CodigoTipoFlete = request.filtro.CodigoTipoFlete;
                    requestAgente.NombreTipoFlete = request.filtro.NombreTipoFlete;
                    requestAgente.CodigoAduanaTipoFlete = request.filtro.CodigoAduanaTipoFlete;
                    requestAgente.CodigoEquivalencia = request.filtro.CodigoEquivalencia;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoFlete = new TransmisionesProxyrest().ConsultarTipoFlete(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoFlete.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoFlete;
        }

        public ResponseRegistrarTipoDocumento RegistrarTipoDocumento(RequestRegistrarTipoDocumentoViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoDocumento();
            try
            {
                var requestAge = new RequestRegistrarTipoDocumento()
                {
                    CodigoTipoDocumento = request.CodigoTipoDocumento,
                    CodigoTipoDocumentoSunat = request.CodigoTipoDocumentoSunat,
                    NombreTipoDocumento = request.NombreTipoDocumento,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoDocumento(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoDocumento ConsultaTipoDocumento(RequestBusquedaTipoDocumentoViewModel request)
        {
            var responseBusquedaTipoDocumento = new ResponseBusquedaTipoDocumento();
            try
            {
                var requestAgente = new RequestConsultaTipoDocumento();
                {
                    requestAgente.CodigoTipoDocumento = request.filtro.CodigoTipoDocumento;
                    requestAgente.CodigoTipoDocumentoSunat = request.filtro.CodigoTipoDocumentoSunat;
                    requestAgente.NombreTipoDocumento = request.filtro.NombreTipoDocumento;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoDocumento = new TransmisionesProxyrest().ConsultarTipoDocumento(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoDocumento.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoDocumento;
        }

        public ResponseRegistrarMoneda RegistrarMoneda(RequestRegistrarMonedaViewModel request)
        {
            var responseResult = new ResponseRegistrarMoneda();
            try
            {
                var requestAge = new RequestRegistrarMoneda()
                {
                    CodigoMoneda = request.CodigoMoneda,
                    CodigoMonedaSunat = request.CodigoMonedaSunat,
                    NombreMoneda = request.NombreMoneda,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarMoneda(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaMoneda ConsultaMoneda(RequestBusquedaMonedaViewModel request)
        {
            var responseBusquedaMoneda = new ResponseBusquedaMoneda();
            try
            {
                var requestAgente = new RequestConsultaMoneda();
                {
                    requestAgente.CodigoMoneda = request.filtro.CodigoMoneda;
                    requestAgente.CodigoMonedaSunat = request.filtro.CodigoMonedaSunat;
                    requestAgente.NombreMoneda = request.filtro.NombreMoneda;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaMoneda = new TransmisionesProxyrest().ConsultarMoneda(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaMoneda.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaMoneda;
        }

        public ResponseRegistrarCondicionCarga RegistrarCondicionCarga(RequestRegistrarCondicionCargaViewModel request)
        {
            var responseResult = new ResponseRegistrarCondicionCarga();
            try
            {
                var requestAge = new RequestRegistrarCondicionCarga()
                {
                    CodigoCondicionCarga = request.CodigoCondicionCarga,
                    CodigoCondicionCargaSunat = request.CodigoCondicionCargaSunat,
                    NombreCondicionCarga = request.NombreCondicionCarga,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarCondicionCarga(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaCondicionCarga ConsultaCondicionCarga(RequestBusquedaCondicionCargaViewModel request)
        {
            var responseBusquedaCondicionCarga = new ResponseBusquedaCondicionCarga();
            try
            {
                var requestAgente = new RequestConsultaCondicionCarga();
                {
                    requestAgente.CodigoCondicionCarga = request.filtro.CodigoCondicionCarga;
                    requestAgente.CodigoCondicionCargaSunat = request.filtro.CodigoCondicionCargaSunat;
                    requestAgente.NombreCondicionCarga = request.filtro.NombreCondicionCarga;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaCondicionCarga = new TransmisionesProxyrest().ConsultarCondicionCarga(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaCondicionCarga.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaCondicionCarga;
        }

        public ResponseRegistrarNaturalezaCarga RegistrarNaturalezaCarga(RequestRegistrarNaturalezaCargaViewModel request)
        {
            var responseResult = new ResponseRegistrarNaturalezaCarga();
            try
            {
                var requestAge = new RequestRegistrarNaturalezaCarga()
                {
                    CodigoNaturalezaCarga = request.CodigoNaturalezaCarga,
                    CodigoNaturalezaCargaSunat = request.CodigoNaturalezaCargaSunat,
                    NombreNaturalezaCarga = request.NombreNaturalezaCarga,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarNaturalezaCarga(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaNaturalezaCarga ConsultaNaturalezaCarga(RequestBusquedaNaturalezaCargaViewModel request)
        {
            var responseBusquedaNaturalezaCarga = new ResponseBusquedaNaturalezaCarga();
            try
            {
                var requestAgente = new RequestConsultaNaturalezaCarga();
                {
                    requestAgente.CodigoNaturalezaCarga = request.filtro.CodigoNaturalezaCarga;
                    requestAgente.CodigoNaturalezaCargaSunat = request.filtro.CodigoNaturalezaCargaSunat;
                    requestAgente.NombreNaturalezaCarga = request.filtro.NombreNaturalezaCarga;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaNaturalezaCarga = new TransmisionesProxyrest().ConsultarNaturalezaCarga(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaNaturalezaCarga.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaNaturalezaCarga;
        }

        public ResponseRegistrarCondicionTransporte RegistrarCondicionTransporte(RequestRegistrarCondicionTransporteViewModel request)
        {
            var responseResult = new ResponseRegistrarCondicionTransporte();
            try
            {
                var requestAge = new RequestRegistrarCondicionTransporte()
                {
                    CodigoCondicionTransporte = request.CodigoCondicionTransporte,
                    CodigoCondicionTransporteSunat = request.CodigoCondicionTransporteSunat,
                    NombreCondicionTransporte = request.NombreCondicionTransporte,
                    CodigoAduanaCondicionTransporte = request.CodigoAduanaCondicionTransporte,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarCondicionTransporte(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaCondicionTransporte ConsultaCondicionTransporte(RequestBusquedaCondicionTransporteViewModel request)
        {
            var responseBusquedaCondicionTransporte = new ResponseBusquedaCondicionTransporte();
            try
            {
                var requestAgente = new RequestConsultaCondicionTransporte();
                {
                    requestAgente.CodigoCondicionTransporte = request.filtro.CodigoCondicionTransporte;
                    requestAgente.CodigoCondicionTransporteSunat = request.filtro.CodigoCondicionTransporteSunat;
                    requestAgente.NombreCondicionTransporte = request.filtro.NombreCondicionTransporte;
                    requestAgente.CodigoAduanaCondicionTransporte = request.filtro.CodigoAduanaCondicionTransporte;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaCondicionTransporte = new TransmisionesProxyrest().ConsultarCondicionTransporte(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaCondicionTransporte.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaCondicionTransporte;
        }

        public ResponseRegistrarUnidadMercancia RegistrarUnidadMercancia(RequestRegistrarUnidadMercanciaViewModel request)
        {
            var responseResult = new ResponseRegistrarUnidadMercancia();
            try
            {
                var requestAge = new RequestRegistrarUnidadMercancia()
                {
                    CodigoUnidadMercancia = request.CodigoUnidadMercancia,
                    CodigoUnidadMercanciaSunat = request.CodigoUnidadMercanciaSunat,
                    NombreUnidadMercancia = request.NombreUnidadMercancia,
                    CodigoAduanaUnidadMercancia = request.CodigoAduanaUnidadMercancia,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarUnidadMercancia(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaUnidadMercancia ConsultaUnidadMercancia(RequestBusquedaUnidadMercanciaViewModel request)
        {
            var responseBusquedaUnidadMercancia = new ResponseBusquedaUnidadMercancia();
            try
            {
                var requestAgente = new RequestConsultaUnidadMercancia();
                {
                    requestAgente.CodigoUnidadMercancia = request.filtro.CodigoUnidadMercancia;
                    requestAgente.CodigoUnidadMercanciaSunat = request.filtro.CodigoUnidadMercanciaSunat;
                    requestAgente.NombreUnidadMercancia = request.filtro.NombreUnidadMercancia;
                    requestAgente.CodigoAduanaUnidadMercancia = request.filtro.CodigoAduanaUnidadMercancia;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaUnidadMercancia = new TransmisionesProxyrest().ConsultarUnidadMercancia(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaUnidadMercancia.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaUnidadMercancia;
        }

        public ResponseRegistrarTemperatura RegistrarTemperatura(RequestRegistrarTemperaturaViewModel request)
        {
            var responseResult = new ResponseRegistrarTemperatura();
            try
            {
                var requestAge = new RequestRegistrarTemperatura()
                {
                    CodigoTemperatura = request.CodigoTemperatura,
                    CodigoTemperaturaSunat = request.CodigoTemperaturaSunat,
                    NombreTemperatura = request.NombreTemperatura,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTemperatura(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTemperatura ConsultaTemperatura(RequestBusquedaTemperaturaViewModel request)
        {
            var responseBusquedaTemperatura = new ResponseBusquedaTemperatura();
            try
            {
                var requestAgente = new RequestConsultaTemperatura();
                {
                    requestAgente.CodigoTemperatura = request.filtro.CodigoTemperatura;
                    requestAgente.CodigoTemperaturaSunat = request.filtro.CodigoTemperaturaSunat;
                    requestAgente.NombreTemperatura = request.filtro.NombreTemperatura;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTemperatura = new TransmisionesProxyrest().ConsultarTemperatura(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTemperatura.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTemperatura;
        }

        public ResponseRegistrarClaseIMO RegistrarClaseIMO(RequestRegistrarClaseIMOViewModel request)
        {
            var responseResult = new ResponseRegistrarClaseIMO();
            try
            {
                var requestAge = new RequestRegistrarClaseIMO()
                {
                    CodigoClaseIMO = request.CodigoClaseIMO,
                    CodigoClaseIMOSunat = request.CodigoClaseIMOSunat,
                    NombreClaseIMO = request.NombreClaseIMO,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarClaseIMO(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaClaseIMO ConsultaClaseIMO(RequestBusquedaClaseIMOViewModel request)
        {
            var responseBusquedaClaseIMO = new ResponseBusquedaClaseIMO();
            try
            {
                var requestAgente = new RequestConsultaClaseIMO();
                {
                    requestAgente.CodigoClaseIMO = request.filtro.CodigoClaseIMO;
                    requestAgente.CodigoClaseIMOSunat = request.filtro.CodigoClaseIMOSunat;
                    requestAgente.NombreClaseIMO = request.filtro.NombreClaseIMO;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaClaseIMO = new TransmisionesProxyrest().ConsultarClaseIMO(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaClaseIMO.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaClaseIMO;
        }

        public ResponseRegistrarNumeroIMO RegistrarNumeroIMO(RequestRegistrarNumeroIMOViewModel request)
        {
            var responseResult = new ResponseRegistrarNumeroIMO();
            try
            {
                var requestAge = new RequestRegistrarNumeroIMO()
                {
                    CodigoNumeroIMO = request.CodigoNumeroIMO,
                    CodigoClaseIMO = request.CodigoClaseIMO,
                    NumberIMO = request.NumberIMO,
                    NombreNumeroIMO = request.NombreNumeroIMO,
                    PaginaNumeroIMO = request.PaginaNumeroIMO,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarNumeroIMO(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaNumeroIMO ConsultaNumeroIMO(RequestBusquedaNumeroIMOViewModel request)
        {
            var responseBusquedaNumeroIMO = new ResponseBusquedaNumeroIMO();
            try
            {
                var requestAgente = new RequestConsultaNumeroIMO();
                {
                    requestAgente.CodigoNumeroIMO = request.filtro.CodigoNumeroIMO;
                    requestAgente.CodigoClaseIMO = request.filtro.CodigoClaseIMO;
                    requestAgente.NumberIMO = request.filtro.NumberIMO;
                    requestAgente.NombreNumeroIMO = request.filtro.NombreNumeroIMO;
                    requestAgente.PaginaNumeroIMO = request.filtro.PaginaNumeroIMO;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaNumeroIMO = new TransmisionesProxyrest().ConsultarNumeroIMO(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaNumeroIMO.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaNumeroIMO;
        }

        public ResponseRegistrarTipoMovimiento RegistrarTipoMovimiento(RequestRegistrarTipoMovimientoViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoMovimiento();
            try
            {
                var requestAge = new RequestRegistrarTipoMovimiento()
                {
                    CodigoTipoMovimiento = request.CodigoTipoMovimiento,
                    CodigoTipoMovimientoSunat = request.CodigoTipoMovimientoSunat,
                    NombreTipoMovimiento = request.NombreTipoMovimiento,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoMovimiento(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoMovimiento ConsultaTipoMovimiento(RequestBusquedaTipoMovimientoViewModel request)
        {
            var responseBusquedaTipoMovimiento = new ResponseBusquedaTipoMovimiento();
            try
            {
                var requestAgente = new RequestConsultaTipoMovimiento();
                {
                    requestAgente.CodigoTipoMovimiento = request.filtro.CodigoTipoMovimiento;
                    requestAgente.CodigoTipoMovimientoSunat = request.filtro.CodigoTipoMovimientoSunat;
                    requestAgente.NombreTipoMovimiento = request.filtro.NombreTipoMovimiento;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoMovimiento = new TransmisionesProxyrest().ConsultarTipoMovimiento(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoMovimiento.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoMovimiento;
        }

        public ResponseRegistrarContenedor RegistrarContenedor(RequestRegistrarContenedorViewModel request)
        {
            var responseResult = new ResponseRegistrarContenedor();
            try
            {
                var requestAge = new RequestRegistrarContenedor()
                {
                    CodigoContenedor = request.CodigoContenedor,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    NumeroContenedor = request.NumeroContenedor,
                    TaraContenedor = request.TaraContenedor,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarContenedor(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaContenedor ConsultaContenedor(RequestBusquedaContenedorViewModel request)
        {
            var responseBusquedaContenedor = new ResponseBusquedaContenedor();
            try
            {
                var requestAgente = new RequestConsultaContenedor();
                {
                    requestAgente.CodigoContenedor = request.filtro.CodigoContenedor;
                    requestAgente.CodigoTipoContenedor = request.filtro.CodigoTipoContenedor;
                    requestAgente.NumeroContenedor = request.filtro.NumeroContenedor;
                    requestAgente.TaraContenedor = request.filtro.TaraContenedor;
                    requestAgente.CodTipoContenedor = request.filtro.CodTipoContenedor;
                    requestAgente.TamanioTipoContenedor = request.filtro.TamanioTipoContenedor;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaContenedor = new TransmisionesProxyrest().ConsultarContenedor(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaContenedor.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaContenedor;
        }

        public ResponseRegistrarCondicionContrato RegistrarCondicionContrato(RequestRegistrarCondicionContratoViewModel request)
        {
            var responseResult = new ResponseRegistrarCondicionContrato();
            try
            {
                var requestAge = new RequestRegistrarCondicionContrato()
                {
                    CodigoCondicionContrato = request.CodigoCondicionContrato,
                    CodigoCondicionContratoSunat = request.CodigoCondicionContratoSunat,
                    NombreCondicionContrato = request.NombreCondicionContrato,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarCondicionContrato(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaCondicionContrato ConsultaCondicionContrato(RequestBusquedaCondicionContratoViewModel request)
        {
            var responseBusquedaCondicionContrato = new ResponseBusquedaCondicionContrato();
            try
            {
                var requestAgente = new RequestConsultaCondicionContrato();
                {
                    requestAgente.CodigoCondicionContrato = request.filtro.CodigoCondicionContrato;
                    requestAgente.CodigoCondicionContratoSunat = request.filtro.CodigoCondicionContratoSunat;
                    requestAgente.NombreCondicionContrato = request.filtro.NombreCondicionContrato;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaCondicionContrato = new TransmisionesProxyrest().ConsultarCondicionContrato(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaCondicionContrato.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaCondicionContrato;
        }

        public ResponseRegistrarTipoBL RegistrarTipoBL(RequestRegistrarTipoBLViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoBL();
            try
            {
                var requestAge = new RequestRegistrarTipoBL()
                {
                    CodigoTipoBL = request.CodigoTipoBL,
                    CodigoTipoBLSunat = request.CodigoTipoBLSunat,
                    NombreTipoBL = request.NombreTipoBL,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoBL(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoBL ConsultaTipoBL(RequestBusquedaTipoBLViewModel request)
        {
            var responseBusquedaTipoBL = new ResponseBusquedaTipoBL();
            try
            {
                var requestAgente = new RequestConsultaTipoBL();
                {
                    requestAgente.CodigoTipoBL = request.filtro.CodigoTipoBL;
                    requestAgente.CodigoTipoBLSunat = request.filtro.CodigoTipoBLSunat;
                    requestAgente.NombreTipoBL = request.filtro.NombreTipoBL;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoBL = new TransmisionesProxyrest().ConsultarTipoBL(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoBL.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoBL;
        }

        public TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoContenedor.ResponseRegistrarTipoContenedor RegistrarTipoContenedor(RequestRegistrarTipoContenedorViewModel request)
        {
            var responseResult = new TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoContenedor.ResponseRegistrarTipoContenedor();
            try
            {
                var requestAge = new TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoContenedor.RequestRegistrarTipoContenedor()
                {
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoIsoTipoContenedor = request.CodigoIsoTipoContenedor,
                    CodigoIsoGrupoTipoContenedor = request.CodigoIsoGrupoTipoContenedor,
                    NombreTipoContenedor = request.NombreTipoContenedor,
                    CodigoAduanaTipoContenedor = request.CodigoAduanaTipoContenedor,
                    CodTipoContenedor = request.CodTipoContenedor,
                    TamanioTipoContenedor = request.TamanioTipoContenedor,
                    IsoTipoContenedor = request.IsoTipoContenedor,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoContenedor(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoContenedor ConsultaTipoContenedor(TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoContenedor.RequestBusquedaTipoContenedorViewModel request)
        {
            var responseBusquedaTipoContenedor = new ResponseBusquedaTipoContenedor();
            try
            {
                var requestAgente = new RequestConsultaTipoContenedor();
                {
                    requestAgente.CodigoTipoContenedor = request.filtro.CodigoTipoContenedor;
                    requestAgente.CodigoIsoTipoContenedor = request.filtro.CodigoIsoTipoContenedor;
                    requestAgente.CodigoIsoGrupoTipoContenedor = request.filtro.CodigoIsoGrupoTipoContenedor;
                    requestAgente.NombreTipoContenedor = request.filtro.NombreTipoContenedor;
                    requestAgente.CodTipoContenedor = request.filtro.CodTipoContenedor;
                    requestAgente.TamanioTipoContenedor = request.filtro.TamanioTipoContenedor;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoContenedor = new TransmisionesProxyrest().ConsultarTipoContenedor(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoContenedor.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoContenedor;
        }

        public ResponseRegistrarRequerimientoServicio RegistrarRequerimientoServicio(RequestRegistrarRequerimientoServicioViewModel request)
        {
            var responseResult = new ResponseRegistrarRequerimientoServicio();
            try
            {
                var requestAge = new RequestRegistrarRequerimientoServicio()
                {
                    CodigoRequerimientoServicio = request.CodigoRequerimientoServicio,
                    CodigoRequerimientoServicioSunat = request.CodigoRequerimientoServicioSunat,
                    NombreRequerimientoServicio = request.NombreRequerimientoServicio,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarRequerimientoServicio(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaRequerimientoServicio ConsultaRequerimientoServicio(RequestBusquedaRequerimientoServicioViewModel request)
        {
            var responseBusquedaRequerimientoServicio = new ResponseBusquedaRequerimientoServicio();
            try
            {
                var requestAgente = new RequestConsultaRequerimientoServicio();
                {
                    requestAgente.CodigoRequerimientoServicio = request.filtro.CodigoRequerimientoServicio;
                    requestAgente.CodigoRequerimientoServicioSunat = request.filtro.CodigoRequerimientoServicioSunat;
                    requestAgente.NombreRequerimientoServicio = request.filtro.NombreRequerimientoServicio;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaRequerimientoServicio = new TransmisionesProxyrest().ConsultarRequerimientoServicio(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaRequerimientoServicio.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaRequerimientoServicio;
        }

        public ResponseRegistrarRol RegistrarRol(RequestRegistrarRolViewModel request)
        {
            var responseResult = new ResponseRegistrarRol();
            try
            {
                var requestAge = new RequestRegistrarRol()
                {
                    CodigoRol = request.CodigoRol,
                    CodigoRolSunat = request.CodigoRolSunat,
                    NombreRol = request.NombreRol,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarRol(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaRol ConsultaRol(RequestBusquedaRolViewModel request)
        {
            var responseBusquedaRol = new ResponseBusquedaRol();
            try
            {
                var requestAgente = new RequestConsultaRol();
                {
                    requestAgente.CodigoRol = request.filtro.CodigoRol;
                    requestAgente.CodigoRolSunat = request.filtro.CodigoRolSunat;
                    requestAgente.NombreRol = request.filtro.NombreRol;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaRol = new TransmisionesProxyrest().ConsultarRol(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaRol.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaRol;
        }

        public ResponseRegistrarCondicionPrecinto RegistrarCondicionPrecinto(RequestRegistrarCondicionPrecintoViewModel request)
        {
            var responseResult = new ResponseRegistrarCondicionPrecinto();
            try
            {
                var requestAge = new RequestRegistrarCondicionPrecinto()
                {
                    CodigoCondicionPrecinto = request.CodigoCondicionPrecinto,
                    CodigoCondicionPrecintoSunat = request.CodigoCondicionPrecintoSunat,
                    NombreCondicionPrecinto = request.NombreCondicionPrecinto,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarCondicionPrecinto(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaCondicionPrecinto ConsultaCondicionPrecinto(RequestBusquedaCondicionPrecintoViewModel request)
        {
            var responseBusquedaCondicionPrecinto = new ResponseBusquedaCondicionPrecinto();
            try
            {
                var requestAgente = new RequestConsultaCondicionPrecinto();
                {
                    requestAgente.CodigoCondicionPrecinto = request.filtro.CodigoCondicionPrecinto;
                    requestAgente.CodigoCondicionPrecintoSunat = request.filtro.CodigoCondicionPrecintoSunat;
                    requestAgente.NombreCondicionPrecinto = request.filtro.NombreCondicionPrecinto;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaCondicionPrecinto = new TransmisionesProxyrest().ConsultarCondicionPrecinto(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaCondicionPrecinto.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaCondicionPrecinto;
        }

        public ResponseRegistrarEntidadPrecinto RegistrarEntidadPrecinto(RequestRegistrarEntidadPrecintoViewModel request)
        {
            var responseResult = new ResponseRegistrarEntidadPrecinto();
            try
            {
                var requestAge = new RequestRegistrarEntidadPrecinto()
                {
                    CodigoEntidadPrecinto = request.CodigoEntidadPrecinto,
                    CodigoEntidadPrecintoSunat = request.CodigoEntidadPrecintoSunat,
                    NombreEntidadPrecinto = request.NombreEntidadPrecinto,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarEntidadPrecinto(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaEntidadPrecinto ConsultaEntidadPrecinto(RequestBusquedaEntidadPrecintoViewModel request)
        {
            var responseBusquedaEntidadPrecinto = new ResponseBusquedaEntidadPrecinto();
            try
            {
                var requestAgente = new RequestConsultaEntidadPrecinto();
                {
                    requestAgente.CodigoEntidadPrecinto = request.filtro.CodigoEntidadPrecinto;
                    requestAgente.CodigoEntidadPrecintoSunat = request.filtro.CodigoEntidadPrecintoSunat;
                    requestAgente.NombreEntidadPrecinto = request.filtro.NombreEntidadPrecinto;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaEntidadPrecinto = new TransmisionesProxyrest().ConsultarEntidadPrecinto(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaEntidadPrecinto.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaEntidadPrecinto;
        }

        public ResponseRegistrarTipoOperacion RegistrarTipoOperacion(RequestRegistrarTipoOperacionViewModel request)
        {
            var responseResult = new ResponseRegistrarTipoOperacion();
            try
            {
                var requestAge = new RequestRegistrarTipoOperacion()
                {
                    CodigoTipoOperacion = request.CodigoTipoOperacion,
                    CodigoTipoOperacionSunat = request.CodigoTipoOperacionSunat,
                    NombreTipoOperacion = request.NombreTipoOperacion,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarTipoOperacion(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaTipoOperacion ConsultaTipoOperacion(RequestBusquedaTipoOperacionViewModel request)
        {
            var responseBusquedaTipoOperacion = new ResponseBusquedaTipoOperacion();
            try
            {
                var requestAgente = new RequestConsultaTipoOperacion();
                {
                    requestAgente.CodigoTipoOperacion = request.filtro.CodigoTipoOperacion;
                    requestAgente.CodigoTipoOperacionSunat = request.filtro.CodigoTipoOperacionSunat;
                    requestAgente.NombreTipoOperacion = request.filtro.NombreTipoOperacion;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaTipoOperacion = new TransmisionesProxyrest().ConsultarTipoOperacion(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaTipoOperacion.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaTipoOperacion;
        }

        public ResponseRegistrarModoPago RegistrarModoPago(RequestRegistrarModoPagoViewModel request)
        {
            var responseResult = new ResponseRegistrarModoPago();
            try
            {
                var requestAge = new RequestRegistrarModoPago()
                {
                    CodigoModoPago = request.CodigoModoPago,
                    CodigoModoPagoSunat = request.CodigoModoPagoSunat,
                    NombreModoPago = request.NombreModoPago,
                    CodigoEquivalencia = request.CodigoEquivalencia,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarModoPago(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaModoPago ConsultaModoPago(RequestBusquedaModoPagoViewModel request)
        {
            var responseBusquedaModoPago = new ResponseBusquedaModoPago();
            try
            {
                var requestAgente = new RequestConsultaModoPago();
                {
                    requestAgente.CodigoModoPago = request.filtro.CodigoModoPago;
                    requestAgente.CodigoModoPagoSunat = request.filtro.CodigoModoPagoSunat;
                    requestAgente.NombreModoPago = request.filtro.NombreModoPago;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaModoPago = new TransmisionesProxyrest().ConsultarModoPago(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaModoPago.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaModoPago;
        }

        public ResponseRegistrarPrecinto RegistrarPrecinto(RequestRegistrarPrecintoViewModel request)
        {
            var responseResult = new ResponseRegistrarPrecinto();
            try
            {
                var requestAge = new RequestRegistrarPrecinto()
                {
                    CodigoPrecinto = request.CodigoPrecinto,
                    CodigoCondicionPrecinto = request.CodigoCondicionPrecinto,
                    CodigoEntidadPrecinto = request.CodigoEntidadPrecinto,
                    NumeroPrecinto = request.NumeroPrecinto,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarPrecinto(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaPrecinto ConsultaPrecinto(RequestBusquedaPrecintoViewModel request)
        {
            var responseBusquedaPrecinto = new ResponseBusquedaPrecinto();
            try
            {
                var requestAgente = new RequestConsultaPrecinto();
                {
                    requestAgente.CodigoPrecinto = request.filtro.CodigoPrecinto;
                    requestAgente.CodigoCondicionPrecinto = request.filtro.CodigoCondicionPrecinto;
                    requestAgente.CodigoEntidadPrecinto = request.filtro.CodigoEntidadPrecinto;
                    requestAgente.NumeroPrecinto = request.filtro.NumeroPrecinto;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaPrecinto = new TransmisionesProxyrest().ConsultarPrecinto(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaPrecinto.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaPrecinto;
        }

        public ResponseRegistrarPuerto RegistrarPuerto(RequestRegistrarPuertoViewModel request)
        {
            var responseResult = new ResponseRegistrarPuerto();
            try
            {
                var requestAge = new RequestRegistrarPuerto()
                {
                    CodigoPuerto = request.CodigoPuerto,
                    CodigoPuertoSunat = request.CodigoPuertoSunat,
                    NombrePuerto = request.NombrePuerto,
                    CodigoPais = request.CodigoPais,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarPuerto(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaPuerto ConsultaPuerto(RequestBusquedaPuertoViewModel request)
        {
            var responseBusquedaPuerto = new ResponseBusquedaPuerto();
            try
            {
                var requestAgente = new RequestConsultaPuerto();
                {
                    requestAgente.CodigoPuerto = request.filtro.CodigoPuerto;
                    requestAgente.CodigoPuertoSunat = request.filtro.CodigoPuertoSunat;
                    requestAgente.NombrePuerto = request.filtro.NombrePuerto;
                    requestAgente.CodigoPais = request.filtro.CodigoPais;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaPuerto = new TransmisionesProxyrest().ConsultarPuerto(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaPuerto.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaPuerto;
        }

        public ResponseRegistrarAduana RegistrarAduana(RequestRegistrarAduanaViewModel request)
        {
            var responseResult = new ResponseRegistrarAduana();
            try
            {
                var requestAge = new RequestRegistrarAduana()
                {
                    CodigoAduana = request.CodigoAduana,
                    CodigoAduanaSunat = request.CodigoAduanaSunat,
                    NombreAduana = request.NombreAduana,
                    CodigoPuerto = request.CodigoPuerto,
                    CodigoViaTransporte = request.CodigoViaTransporte,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarAduana(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaAduana ConsultaAduana(RequestBusquedaAduanaViewModel request)
        {
            var responseBusquedaAduana = new ResponseBusquedaAduana();
            try
            {
                var requestAgente = new RequestConsultaAduana();
                {
                    requestAgente.CodigoAduana = request.filtro.CodigoAduana;
                    requestAgente.CodigoAduanaSunat = request.filtro.CodigoAduanaSunat;
                    requestAgente.NombreAduana = request.filtro.NombreAduana;
                    requestAgente.CodigoPuerto = request.filtro.CodigoPuerto;
                    requestAgente.CodigoViaTransporte = request.filtro.CodigoViaTransporte;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaAduana = new TransmisionesProxyrest().ConsultarAduana(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaAduana.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaAduana;
        }

        public ResponseRegistrarViaTransporte RegistrarViaTransporte(RequestRegistrarViaTransporteViewModel request)
        {
            var responseResult = new ResponseRegistrarViaTransporte();
            try
            {
                var requestAge = new RequestRegistrarViaTransporte()
                {
                    CodigoViaTransporte = request.CodigoViaTransporte,
                    CodigoViaTransporteSunat = request.CodigoViaTransporteSunat,
                    NombreViaTransporte = request.NombreViaTransporte,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarViaTransporte(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaViaTransporte ConsultaViaTransporte(RequestBusquedaViaTransporteViewModel request)
        {
            var responseBusquedaViaTransporte = new ResponseBusquedaViaTransporte();
            try
            {
                var requestAgente = new RequestConsultaViaTransporte();
                {
                    requestAgente.CodigoViaTransporte = request.filtro.CodigoViaTransporte;
                    requestAgente.CodigoViaTransporteSunat = request.filtro.CodigoViaTransporteSunat;
                    requestAgente.NombreViaTransporte = request.filtro.NombreViaTransporte;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaViaTransporte = new TransmisionesProxyrest().ConsultarViaTransporte(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaViaTransporte.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaViaTransporte;
        }

        public ResponseRegistrarMedioTransporte RegistrarMedioTransporte(RequestRegistrarMedioTransporteViewModel request)
        {
            var responseResult = new ResponseRegistrarMedioTransporte();
            try
            {
                var requestAge = new RequestRegistrarMedioTransporte()
                {
                    CodigoMedioTransporte = request.CodigoMedioTransporte,
                    CodigoMedioTransporteSunat = request.CodigoMedioTransporteSunat,
                    NombreMedioTransporte = request.NombreMedioTransporte,
                    Accion = request.Accion,
                    UsuarioRegistro = request.UsuarioRegistro,
                };
                responseResult = new TransmisionesProxyrest().RegistrarMedioTransporte(requestAge);
            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseBusquedaMedioTransporte ConsultaMedioTransporte(RequestBusquedaMedioTransporteViewModel request)
        {
            var responseBusquedaMedioTransporte = new ResponseBusquedaMedioTransporte();
            try
            {
                var requestAgente = new RequestConsultaMedioTransporte();
                {
                    requestAgente.CodigoMedioTransporte = request.filtro.CodigoMedioTransporte;
                    requestAgente.CodigoMedioTransporteSunat = request.filtro.CodigoMedioTransporteSunat;
                    requestAgente.NombreMedioTransporte = request.filtro.NombreMedioTransporte;

                    requestAgente.NroRegistrosPorPagina = request.paginacionDTO.rows;
                    requestAgente.OrdenCampo = request.paginacionDTO.sidx;
                    requestAgente.OrdenOrientacion = request.paginacionDTO.sord;
                    requestAgente.PaginaActual = request.paginacionDTO.page;
                };
                responseBusquedaMedioTransporte = new TransmisionesProxyrest().ConsultarMedioTransporte(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaMedioTransporte.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaMedioTransporte;
        }

        public ResponseBusquedaConfiguracionLineaViewModel ConsultaConfiguracionLinea(RequestBusquedaConfiguracionLineaViewModel request)
        {
            var responseBusqueda = new ResponseBusquedaConfiguracionLineaViewModel();
            try
            {
                if (request.filtro.Estado != null)
                {
                    if (request.filtro.Estado == 1)
                        request.filtro.EstadoRegistro = true;
                    else
                        request.filtro.EstadoRegistro = false;
                }
                var requestAgente = new RequestBusquedaConfiguracionLinea
                {
                    CodigoConfiguracion = request.filtro.CodigoConfiguracion,
                    CodigoLinea = request.filtro.CodigoLinea,
                    EstadoRegistro = request.filtro.EstadoRegistro,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaConfiguracionLinea = new TransmisionesProxyrest().ConsultarConfiguracionLinea(requestAgente);

                if (listaConfiguracionLinea.ListaConfiguracionLinea.Count > 0)
                {
                    responseBusqueda.CantidadPaginas = listaConfiguracionLinea.CantidadPaginas;
                    responseBusqueda.TotalRegistros = listaConfiguracionLinea.TotalRegistros;
                    responseBusqueda.NroPagina = listaConfiguracionLinea.NroPagina;
                    responseBusqueda.Result = listaConfiguracionLinea.Result;
                    foreach (var item in listaConfiguracionLinea.ListaConfiguracionLinea)
                    {
                        var objet = new ListaConfiguracionLineaViewModel();
                        objet.CodigoConfiguracion = item.CodigoConfiguracion;
                        objet.DescripcionLinea = item.DescripcionLinea;
                        objet.DescripcionEstado = item.DescripcionEstado;
                        objet.CodigoLinea = item.CodigoLinea;
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraCreacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraActualizacion);
                        objet.EstadoRegistro = item.EstadoRegistro;
                        responseBusqueda.ListaConfiguracionLinea.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseBusqueda.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusqueda;
        }

        /// <summary>
        /// Lista Parametros de Negocio
        /// </summary>
        /// <returns></returns>
        public ResponseConfiguracionLineaDTO ObtenerConfiguracionLinea()
        {
            var lstConfiguracionLinea = new ResponseConfiguracionLineaDTO();
            try
            {
                var keyCache = Convert.ToString(KeyCache.ConfiguracionLinea);
                var manejadorCache = new ManejadorCache();
                lstConfiguracionLinea = manejadorCache.ObtenerValorCache<ResponseConfiguracionLineaDTO>(keyCache);

                if (lstConfiguracionLinea == null || lstConfiguracionLinea.ConfiguracionLinea.Count == 0
                    || lstConfiguracionLinea.ConfiguracionLineaSucursal.Count == 0
                    || lstConfiguracionLinea.ConfiguracionLineaSucursalTerminal.Count == 0
                    || lstConfiguracionLinea.ConfiguracionLineaPantallaSeccion.Count == 0)
                {
                    lstConfiguracionLinea = new TransmisionesProxyrest().ObtenerConfiguracionLinea();
                    manejadorCache.InsertarValorCache(keyCache, lstConfiguracionLinea);
                }

            }
            catch (Exception ex)
            {
                if (lstConfiguracionLinea != null)
                {
                    lstConfiguracionLinea.Result = new Result { Satisfactorio = false };
                }
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return lstConfiguracionLinea;
        }

        /// <summary>
        /// Lista Detalle Catalogo
        /// </summary>
        /// <returns></returns>
        public ResponseListaDetalleCatalogo ListarDetalleCatalogoTramarsa(RequestConsultaDetalleCatalogoViewModel request)
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
                var keyCache = Convert.ToString(KeyCache.DetalleCatalogoTramarsa);
                clases = manejadorCache.ObtenerValorCache<List<ListaDetalleCatalagoDTO>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    responseListarDetalleCatalogo = (new TransmisionesProxyrest()).ListarDetalleCatalogoTramarsa(requestDetalleCatalogo);
                    manejadorCache.InsertarValorCache(keyCache, responseListarDetalleCatalogo.DetalleCatalogoList);
                }
                else
                {
                    responseListarDetalleCatalogo.DetalleCatalogoList = clases;
                }

                responseListarDetalleCatalogo.Result = new Result();
                responseListarDetalleCatalogo.Result.Satisfactorio = true;
            }
            catch (Exception ex)
            {
                responseListarDetalleCatalogo.Result = new Result();
                responseListarDetalleCatalogo.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }

            return responseListarDetalleCatalogo;
        }


    }
}