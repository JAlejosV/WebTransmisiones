using System;
using GR.Comun.DTO;
using GR.Frameworks;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Agente.BL
{
    public class TarifasAgente
    {
        /// <summary>
        /// Lista distribucion tarifa
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaDistribucionTarifa ListarDistribucionTarifa(RequestBusquedaDistribucionTarifaViewModel request)
        {
            var responseBusquedaDistribucionTarifa = new ResponseBusquedaDistribucionTarifa();
            try
            {
                var requestAgente = new RequestBusquedaDistribucionTarifa()
                {
                    CodigoConcepto  = request.filtro.CodigoConcepto,
                    CodigoTarifa = request.filtro.CodigoTarifa
                };
                responseBusquedaDistribucionTarifa = new TransmisionesProxyrest().ListarDistribucionTarifa(requestAgente);
            }
            catch (Exception ex)
            {
                //responseBusquedaDistribucionTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaDistribucionTarifa;
        }

        /// <summary>
        /// Lista tarifa
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaTarifa ListarTarifa(RequestBusquedaTarifaViewModel request)
        {
            var responseListarTarifa = new ResponseBusquedaTarifa();
            try
            {
                var requestAgente = new RequestConsultaTarifa
                {
                    CodigoRegimen = request.filtro.CodigoRegimen,
                    CodigoConcepto = request.filtro.CodigoConcepto,
                    CodigoTarifa = request.filtro.CodigoTarifa,
                    DescripcionTarifa = request.filtro.DescripcionTarifa,
                    CodigoLinea = request.filtro.CodigoLinea,

                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sord,
                    OrdenOrientacion = request.paginacionDTO.sidx,
                    PaginaActual = request.paginacionDTO.page
                };
                responseListarTarifa = new TransmisionesProxyrest().ListarTarifa(requestAgente);
            }
            catch (Exception ex)
            {
                responseListarTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseListarTarifa;
        }

        /// <summary>
        /// Busqueda de naves
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaNave ListarNave(RequestBusquedaNaveViewModel request)
        {
            var responseListarNave = new ResponseBusquedaNave();
            try
            {
                var requestAgente = new RequestConsultaNave
                {
                    Codigo = request.filtro.Codigo,
                    Nombre = request.filtro.Nombre,
                    NumeroViaje = request.filtro.NumeroViaje,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sord,
                    OrdenOrientacion = request.paginacionDTO.sidx,
                    PaginaActual = request.paginacionDTO.page
                };
                responseListarNave = new TransmisionesProxyrest().ListarNave(requestAgente);
            }
            catch (Exception ex)
            {
                responseListarNave.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseListarNave;
        }

        /// <summary>
        /// Busqueda de Tarifas Locales
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaTarifaLocal BusquedaTarifaLocal(RequestBusquedaTarifaLocalViewModel request)
        {
            var responseTarifaPlana = new ResponseBusquedaTarifaLocal();
            try
            {
                var requestAgente = new RequestBusquedaTarifaLocal
                {
                    CodigoLinea = request.filtro.CodigoLinea,
                    DescripcionTarifa = request.filtro.DescripcionTarifa,
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoTerminalPortuario = request.filtro.CodigoTerminalPortuario,
                    FlagTarifaLigada = request.filtro.FlagTarifaLigada,
                    FechaVigencia = request.filtro.FechaVigencia,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sord,
                    OrdenOrientacion = request.paginacionDTO.sidx,
                    PaginaActual = request.paginacionDTO.page
                };
                responseTarifaPlana = new TransmisionesProxyrest().BusquedaTarifaLocal(requestAgente);
            }
            catch (Exception ex)
            {
                responseTarifaPlana.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaPlana;
        }

        /// <summary>
        /// Registro de Tarifas Locales
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseRegistrarTarifaLocal RegistroTarifaLocal(RequestRegistrarTarifaLocal request)
        {
            var responseRegistroTarifa = new ResponseRegistrarTarifaLocal();
            try
            {
                //var requestAgente = new RequestRegistrarTarifaLocal
                //{
                //    CodigoLinea = request.filtro.CodigoLinea,
                //    DescripcionTarifa = request.filtro.DescripcionTarifa,
                //    Codigo = request.filtro.Codigo,
                //    CodigoAlmacen = request.filtro.CodigoAlmacen,
                //    FlagTarifaLigada = request.filtro.FlagTarifaLigada,
                //    FechaVigencia = request.filtro.FechaVigencia,
                //    NroRegistrosPorPagina = request.paginacionDTO.rows,
                //    OrdenCampo = request.paginacionDTO.sord,
                //    OrdenOrientacion = request.paginacionDTO.sidx,
                //    PaginaActual = request.paginacionDTO.page
                //};
                responseRegistroTarifa = new TransmisionesProxyrest().RegistroTarifaLocal(request);
            }
            catch (Exception ex)
            {
                responseRegistroTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroTarifa;
        }
    }
}