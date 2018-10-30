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
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class DepositoDefaultAgente
    {

        /// <summary>
        /// Lista Deposito Default
        /// </summary>
        /// <returns></returns>
        public ResponseConsultarDepositoDefaultViewModel ListarDepositoDefault(RequestConsultaDepositoDefaultViewModel request)
        {
            var responseConsultaDepositoDefault = new ResponseConsultarDepositoDefaultViewModel();
            try
            {

                var requestAgente = new ConsultaDepositoDefaultRequestDTO
                {
                    CodigoDeposito = request.filtro.CodigoDeposito,
                    CodigoTipoContenedor = request.filtro.CodigoTipoContenedor,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoEstado = request.filtro.CodigoEstado,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaDepositoDefault = new TransmisionesProxyrest().ConsultaDepositoDefault(requestAgente);

                var lstDepositoDefault = listaDepositoDefault.DepositoDefaultList.Select(item =>
                            new ListaDepositoDefaultViewModel
                            {
                                CodigoDeposito = item.CodigoDeposito,
                                CodigoTipoContenedor = item.CodigoTipoContenedor,
                                DescripcionDeposito = item.DescripcionDeposito,
                                DescripcionTipoContenedor = item.DescripcionTipoContenedor,
                                DescripcionEstado = item.DescripcionEstado,
                                FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraActualizacion),
                                FechaHoraCreacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraCreacion),
                                Id = item.Id,
                                Observacion = item.Observacion,
                                UsuarioActualizacion = item.UsuarioActualizacion,
                                UsuarioCreacion = item.UsuarioCreacion,
                                CodigoLinea = item.CodigoLinea,
                                DescripcionLinea = item.DescripcionLinea,
                                CodigoSucursal = item.CodigoSucursal,
                                DescripcionSucursal = item.DescripcionSucursal,
                                CodigoEstado = item.CodigoEstado
                            }).ToList();

                responseConsultaDepositoDefault = new ResponseConsultarDepositoDefaultViewModel
                {
                    Result = listaDepositoDefault.Result,
                    TotalRegistros = listaDepositoDefault.TotalRegistros,
                    CantidadPaginas = listaDepositoDefault.CantidadPaginas,
                    DepositoDefaultList = lstDepositoDefault
                };

            }
            catch (Exception ex)
            {
                responseConsultaDepositoDefault.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseConsultaDepositoDefault;
        }




        /// <summary>
        /// Lista Detalle Catalogo
        /// </summary>
        /// <returns></returns>
        public ResponseConsultaAlmacenViewModel ListarAlmacenTodos()
        {
            ResponseConsultaAlmacenViewModel responseListarDetalleCatalogo = new ResponseConsultaAlmacenViewModel();
            try
            {

                var clases = new List<ListaDepositoViewModel>();
                var manejadorCache = new ManejadorCache();
                var keyCache = Convert.ToString(KeyCache.Almacen);
                clases = manejadorCache.ObtenerValorCache<List<ListaDepositoViewModel>>(keyCache);
                if (clases == null || clases.Count == 0)
                {
                    var lstDepositos = (new TransmisionesProxyrest()).ListarDeposito();
                    var lstDeposito = lstDepositos.AlmacenList.Select(item => new ListaDepositoViewModel
                    {
                        CodigoDeposito = item.CodigoAlmacen,
                        CodigoSun = item.CodigoSun,
                        DescripcionDeposito = item.DescripcionAlmacen,
                        DireccionAlmacen = item.DireccionAlmacen,
                        RucAlmacen = item.RucAlmacen
                    }).ToList();


                    responseListarDetalleCatalogo.DepositosList = lstDeposito;
                    manejadorCache.InsertarValorCache(keyCache, lstDeposito);
                }
                else
                {
                    responseListarDetalleCatalogo.DepositosList = clases;
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

        public ResponseActualizarDepositoDefaultViewModel ActualizarDepositoDefault(RequestActualizarDepositoDefaultViewModel request)
        {
            var responseResult = new ResponseActualizarDepositoDefaultViewModel();
            try
            {
                var requestAge = new ActualizaDepositoDefaultRequestDTO
                {
                    CodigoDeposito = request.CodigoDeposito,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    Id = request.Id,
                    CodigoSucursal = request.CodigoSucursal,
                    CodigoLinea = request.CodigoLinea,
                    CodigoEstado = request.CodigoEstado,
                    Observacion = request.Observacion,
                    UsuarioActualizacion = request.UsuarioActualizacion
                };
                var response = new TransmisionesProxyrest().ActualizaDepositoDefault(requestAge);
                responseResult.Result = response.Result;

            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }

        public ResponseAgregarDepositoDefaultViewModel AgregarDepositoDefault(RequestAgregarDepositoDefaultViewModel request)
        {
            var responseResult = new ResponseAgregarDepositoDefaultViewModel();
            try
            {
                var requestAge = new AgregaDepositoDefaultRequestDTO
                {
                    CodigoDeposito = request.CodigoDeposito,
                    CodigoTipoContenedor = request.CodigoTipoContenedor,
                    CodigoSucursal = request.CodigoSucursal,
                    CodigoLinea = request.CodigoLinea,
                    Observacion = request.Observacion,
                    UsuarioCreacion = request.UsuarioCreacion
                };
                var response = new TransmisionesProxyrest().AgregaDepositoDefault(requestAge);
                responseResult.Result = response.Result;

            }
            catch (Exception ex)
            {
                responseResult.Result = new Result();
                responseResult.Result.Satisfactorio = false;
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseResult;
        }


        /// <summary>
        /// Valida Deposito Default
        /// </summary>
        /// <returns></returns>
        public ResponseValidaDepositoDefaultViewModel ValidaDepositoDefault(RequestValidaDepositoDefaultViewModel request)
        {
            var responseConsultaDepositoDefault = new ResponseValidaDepositoDefaultViewModel();
            try
            {

                var requestAgente = new ValidaDepositoDefaultRequestDTO
                {
                    CodigoDeposito = request.filtro.CodigoDeposito,
                    CodigoTipoContenedor = request.filtro.CodigoTipoContenedor,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoEstado = request.filtro.CodigoEstado,

                };

                var listaDepositoDefault = new TransmisionesProxyrest().ValidaDepositoDefault(requestAgente);

                var lstDepositoDefault = listaDepositoDefault.DepositoDefaultList.Select(item =>
                            new ListaDepositoDefaultViewModel
                            {
                                CodigoDeposito = item.CodigoDeposito,
                                CodigoTipoContenedor = item.CodigoTipoContenedor,
                                DescripcionDeposito = item.DescripcionDeposito,
                                DescripcionTipoContenedor = item.DescripcionTipoContenedor,
                                DescripcionEstado = item.DescripcionEstado,
                                //FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraActualizacion),
                                //FechaHoraCreacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraCreacion),
                                Id = item.Id,
                                Observacion = item.Observacion,
                                UsuarioActualizacion = item.UsuarioActualizacion,
                                UsuarioCreacion = item.UsuarioCreacion,
                                CodigoLinea = item.CodigoLinea,
                                DescripcionLinea = item.DescripcionLinea,
                                CodigoSucursal = item.CodigoSucursal,
                                DescripcionSucursal = item.DescripcionSucursal,
                                CodigoEstado = item.CodigoEstado
                            }).ToList();

                responseConsultaDepositoDefault = new ResponseValidaDepositoDefaultViewModel
                {
                    Result = listaDepositoDefault.Result,
                    DepositoDefaultList = lstDepositoDefault
                };

            }
            catch (Exception ex)
            {
                responseConsultaDepositoDefault.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseConsultaDepositoDefault;
        }

    }
}