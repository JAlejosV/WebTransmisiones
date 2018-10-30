using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships;
using GR.Msc.Memberships.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class MonitorCoparnAgente
    {
        public ResponseConsultaMonitorCoparnViewModel ListarMonitorCoparn(RequestConsultaMonitorCoparnViewModel request)
        {
            var responseConsultaDepositoDefault = new ResponseConsultaMonitorCoparnViewModel();
            try
            {

                var requestAgente = new ConsultaMonitorCoparnRequestDTO
                {
                    CodigoEstado = request.filtro.CodigoEstado,
                    Contenedor = request.filtro.Contenedor,
                    Deposito=request.filtro.CodigoDeposito,
                    FechaFin = request.filtro.FechaFin,
                    FechaInicio = request.filtro.FechaInicio,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaDepositoDefault = new TransmisionesProxyrest().ConsultaMonitorCoparn(requestAgente);

                var lstDepositoDefault = listaDepositoDefault.MonitorCoparnList.Select(item =>
                            new ListaMonitorCoparnViewModel
                            {
                                CodigoEstado = item.CodigoEstado,
                                Contenedor = item.Contenedor,
                                CodigoDeposito = item.Deposito,
                                DescripcionDeposito = item.DescripcionAlmacen,
                                DescripcionEstado = item.DescripcionEstado,
                                FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraActualizacion),
                                FechaHoraCreacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraCreacion),
                                FechaProceso = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaProceso),
                                Id = item.Id,
                                Voyage=item.Voyage,
                                Observacion = item.Observacion,
                                UsuarioActualizacion = item.UsuarioActualizacion,
                                UsuarioCreacion = item.UsuarioCreacion
                            }).ToList();

                responseConsultaDepositoDefault = new ResponseConsultaMonitorCoparnViewModel
                {
                    Result = listaDepositoDefault.Result,
                    TotalRegistros = listaDepositoDefault.TotalRegistros,
                    CantidadPaginas = listaDepositoDefault.CantidadPaginas,
                    MonitorCoparnList = lstDepositoDefault
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