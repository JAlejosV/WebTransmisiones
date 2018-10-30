using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships;
using GR.Msc.Memberships.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class NotificacionIntegracionAgente
    {

        public ResponseActualizarNotificacion ActualizarNotificacionIntegracion(RequestActualizaNotificacionIntegracionViewModel request)
        {
            var responseData = new ResponseActualizarNotificacion();
            try
            {
                ActualizaNotificacionIntegracionRequestDTO requestAgente = new ActualizaNotificacionIntegracionRequestDTO();
                requestAgente.CodigoLinea = request.CodigoLinea;
                requestAgente.CodigoNotificacion = request.CodigoNotificacion;
                requestAgente.ConCopia = request.ConCopia;
                requestAgente.Destinatario = request.Destinatario;
                requestAgente.Asunto = request.Asunto;
                requestAgente.Nombre = request.Nombre;
                requestAgente.Cuerpo = HttpUtility.UrlDecode(request.DetalleCorreo); //request.DetalleCorreo;
                requestAgente.EstadoRegistro = request.EstadoRegistro;
                requestAgente.UsuarioActualizacion = request.UsuarioActualizacion;
                requestAgente.FechaHoraActualizacion = request.FechaHoraActualizacion;
                responseData = new TransmisionesProxyrest().ActualizarNotificacionIntegracion(requestAgente);
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }

        public ResponseConsultaDetalleNotificacionIntegracionViewModel ConsultarDetalleNotificacionIntegracion(RequestConsultaDetalleNotificacionIntegracionViewModel request)
        {
            var resp = new ResponseConsultaDetalleNotificacionIntegracionViewModel();
            try
            {
                var requestAg = new ConsultaDetalleNotificacionIntegracionRequestDTO
                {
                    CodigoNotificacion = request.CodigoNotificacion,
                    CodigoLinea = request.CodigoLinea
                };
                var response = new TransmisionesProxyrest().ConsultarDetalleNotificacionIntegracion(requestAg);
                resp.Result = response.Result;
                if (response.ListaDetalleNotificacionIntegracion.Count > 0)
                {

                    foreach (var item in response.ListaDetalleNotificacionIntegracion)
                    {
                        var objet = new ListaDetalleNotificacionIntegracionViewModel();
                        objet.Asunto = item.Asunto;
                        objet.CodigoNotificacion = item.CodigoNotificacion;
                        objet.CodigoLinea = item.CodigoLinea;
                        objet.ConCopia = item.ConCopia;
                        objet.Destinatario = item.Destinatario;
                        objet.DetalleCorreo = item.Cuerpo;
                        objet.EstadoRegistro = item.EstadoRegistro;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.Nombre = item.Nombre;
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        resp.DetalleNotifacionIntegracion.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return resp;
        }

        public ResponseConsultaBandejaNotificacionIntegracionViewModel ListarBandejaNotificacionIntegracion(RequestConsultaBandejaNotificacionIntegracionViewModel request)
        {
            var responseConsultaNotificacionIntegracion = new ResponseConsultaBandejaNotificacionIntegracionViewModel();
            try
            {

                var requestAgente = new ConsultaBandejaNotificacionIntegracionRequestDTO
                {
                    CodigoEstado = request.filtro.CodigoEstado,
                    CodigoLinea = request.filtro.CodigoLinea,
                    Nombre = request.filtro.Nombre,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaNotificacionIntegracion = new TransmisionesProxyrest().ConsultarBandejaNotificacionIntegracion(requestAgente);

                var lstNotificacionIntegracion = listaNotificacionIntegracion.ListaBandejaNotificacionIntegracion.Select(item =>
                            new ListaBandejaNotificacionIntegracionViewModel
                            {
                                CodigoEstado = item.CodigoEstado,
                                Asunto = item.Asunto,
                                CodigoLinea = item.CodigoLinea,
                                CodigoNotificacion = item.CodigoNotificacion,
                                ConCopia = item.ConCopia,
                                DescripcionEstado = item.DescripcionEstado,
                                DescripcionLinea = item.DescripcionLinea,
                                Destinatario = item.Destinatario,
                                Nombre = item.Nombre,
                                FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraActualizacion),
                                FechaHoraCreacion = string.Format("{0:dd/MM/yyyy H:mm:ss}", item.FechaHoraCreacion),
                                UsuarioActualizacion = item.UsuarioActualizacion,
                                UsuarioCreacion = item.UsuarioCreacion
                            }).ToList();

                responseConsultaNotificacionIntegracion = new ResponseConsultaBandejaNotificacionIntegracionViewModel
                {
                    Result = listaNotificacionIntegracion.Result,
                    TotalRegistros = listaNotificacionIntegracion.TotalRegistros,
                    CantidadPaginas = listaNotificacionIntegracion.CantidadPaginas,
                    ListaNotificacionIntegracion = lstNotificacionIntegracion
                };

            }
            catch (Exception ex)
            {
                responseConsultaNotificacionIntegracion.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseConsultaNotificacionIntegracion;
        }

        public ResponseActualizarNotificacion AgregarNotificacionIntegracion(RequestRegistroNotificacionIntegracionViewModel request)
        {
            var responseData = new ResponseActualizarNotificacion();
            try
            {
                RegistroNotificacionIntegracionRequestDTO requestAgente = new RegistroNotificacionIntegracionRequestDTO();
                requestAgente.CodigoLinea = request.CodigoLinea;

                requestAgente.ConCopia = request.ConCopia;
                requestAgente.Destinatario = request.Destinatario;
                requestAgente.Asunto = request.Asunto;
                requestAgente.Nombre = request.Nombre;
                requestAgente.Cuerpo = HttpUtility.UrlDecode(request.DetalleCorreo); //request.DetalleCorreo;

                requestAgente.UsuarioCreacion = request.UsuarioCreacion;
                requestAgente.FechaHoraCreacion = request.FechaHoraCreacion;
                responseData = new TransmisionesProxyrest().AgregarNotificacionIntegracion(requestAgente);
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }

    }
}