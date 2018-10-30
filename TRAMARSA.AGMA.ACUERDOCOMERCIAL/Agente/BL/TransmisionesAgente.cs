using GR.Comun.DTO;
using GR.Frameworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Transmisiones;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class TransmisionesAgente
    {
        public ResponseRegistrarTransmisionNave RegistroTransmisionNave(RequestRegistrarTransmisionNaveViewModel request)
        {
            var responseRegistroDocumento = new ResponseRegistrarTransmisionNave();
            try
            {
                var requestAgente = RegistrarTransmisionNave(request);
                responseRegistroDocumento = new TransmisionesProxyrest().RegistrarTransmisionNave(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroDocumento.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroDocumento;
        }

        private RegistraTransmisionNaveDTO RegistrarTransmisionNave(RequestRegistrarTransmisionNaveViewModel request)
        {
            RegistraTransmisionNaveDTO requestTransmisionNave = new RegistraTransmisionNaveDTO();
            requestTransmisionNave.TipoTransmision = request.TipoTransmision;
            requestTransmisionNave.ListaItinerarios = new List<DetalleTransmisionNaveDTO>();

            foreach (var item in request.ListaItinerario)
            {
                DetalleTransmisionNaveDTO Itinerarios = new DetalleTransmisionNaveDTO();
                Itinerarios.CodigoItinerario = item.CodigoItinerario;
                requestTransmisionNave.ListaItinerarios.Add(Itinerarios);
            }

            return requestTransmisionNave;
        }

        public ResponseRegistrarTransmisionDocumento RegistroTransmisionDocumento(RequestRegistrarTransmisionDocumentoViewModel request)
        {
            var responseRegistroDocumento = new ResponseRegistrarTransmisionDocumento();
            try
            {
                var requestAgente = RegistrarTransmisionDocumento(request);
                responseRegistroDocumento = new TransmisionesProxyrest().RegistrarTransmisionDocumento(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroDocumento.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroDocumento;
        }

        private RegistraTransmisionDocumentoDTO RegistrarTransmisionDocumento(RequestRegistrarTransmisionDocumentoViewModel request)
        {
            RegistraTransmisionDocumentoDTO requestTransmisionDocumento = new RegistraTransmisionDocumentoDTO();
            requestTransmisionDocumento.TipoTransmision = request.TipoTransmision;
            requestTransmisionDocumento.ListaDocumentos = new List<DetalleTransmisionDocumentoDTO>();

            foreach (var item in request.ListaDocumento)
            {
                DetalleTransmisionDocumentoDTO Documentos = new DetalleTransmisionDocumentoDTO();
                Documentos.CodigoDocumento = item.CodigoDocumento;
                requestTransmisionDocumento.ListaDocumentos.Add(Documentos);
            }

            return requestTransmisionDocumento;
        }
        public ResponseBusquedaTransmisionNaveViewModel BusquedaTransmisionNave(RequestBusquedaTransmisionNaveViewModel request)
        {
            var responseViewModel = new ResponseBusquedaTransmisionNaveViewModel();
            try
            {
                var requestAgente = new RequestBusquedaTransmisionNave
                {
                    CodigoItinerario = request.filtro.CodigoItinerario,
                    CodigoNave = request.filtro.CodigoNave,
                    CodigoAduana = request.filtro.CodigoAduana,
                    CodigoTipoOperacion = request.filtro.CodigoTipoOperacion,
                    NumeroViajeItinerario = request.filtro.NumeroViajeItinerario,
                    NumeroManifiestoItinerario = request.filtro.NumeroManifiestoItinerario,
                    AnioManifiestoItinerario = request.filtro.AnioManifiestoItinerario,
                    EstadoEnvioAduanas = request.filtro.EstadoEnvioAduanas,
                    EstadoTransmision = request.filtro.EstadoTransmision,
                    FechaInicio = request.filtro.FechaInicio,
                    FechaFin = request.filtro.FechaFin,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaTransmisionNave = new TransmisionesProxyrest().BusquedaTransmisionNave(requestAgente);
                if (listaTransmisionNave.ListaTransmisionNave.Count > 0)
                {
                    responseViewModel.CantidadPaginas = listaTransmisionNave.CantidadPaginas;
                    responseViewModel.TotalRegistros = listaTransmisionNave.TotalRegistros;
                    responseViewModel.NroPagina = listaTransmisionNave.NroPagina;
                    responseViewModel.Result = listaTransmisionNave.Result;
                    foreach (var item in listaTransmisionNave.ListaTransmisionNave)
                    {
                        var objet = new ListaTransmisionNaveViewModel();
                        objet.CodigoItinerario = item.CodigoItinerario;
                        objet.AnioManifiestoItinerario = item.AnioManifiestoItinerario;
                        objet.NumeroViajeItinerario = item.NumeroViajeItinerario;
                        objet.NumeroManifiestoItinerario = item.NumeroManifiestoItinerario;
                        objet.NombreNave = item.NombreNave;
                        objet.NumeroViajeItinerario = item.NumeroViajeItinerario;
                        objet.NombreAduana = item.NombreAduana;
                        objet.NombreTipoOperacion = item.NombreTipoOperacion;
                        objet.NombreOperadorDescargaItinerario = item.NombreOperadorDescargaItinerario;
                        objet.NombreAduana = item.NombreAduana;
                        objet.FechaArriboItinerario = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.TotalPesoBrutoTransmision = item.TotalPesoBrutoTransmision;
                        objet.TotalBultosTransmision = item.TotalBultosTransmision;
                        objet.TotalContenedoresTransmision = item.TotalContenedoresTransmision;
                        objet.EstadoEnvioAduanas = item.EstadoEnvioAduanas;
                        objet.EstadoTransmision = item.EstadoTransmision;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        responseViewModel.ListaTransmisionNave.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseViewModel;
        }

        public ResponseBusquedaTransmisionDocumentoViewModel BusquedaTransmisionDocumento(RequestBusquedaTransmisionDocumentoViewModel request)
        {
            var responseViewModel = new ResponseBusquedaTransmisionDocumentoViewModel();
            try
            {
                var requestAgente = new RequestBusquedaTransmisionDocumento
                {
                    CodigoDocumento = request.filtro.CodigoDocumento,
                    CodigoItinerario = request.filtro.CodigoItinerario,
                    NumeroManifiestoItinerario = request.filtro.NumeroManifiestoItinerario,
                    AnioManifiestoItinerario = request.filtro.AnioManifiestoItinerario,
                    NumeroDocumento = request.filtro.NumeroDocumento,
                    CodigoTipoEnvio = request.filtro.CodigoTipoEnvio,
                    EstadoEnvioAduanas = request.filtro.EstadoEnvioAduanas,
                    EstadoTransmision = request.filtro.EstadoTransmision,
                    FechaInicio = request.filtro.FechaInicio,
                    FechaFin = request.filtro.FechaFin,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaTransmisionDocumento = new TransmisionesProxyrest().BusquedaTransmisionDocumento(requestAgente);
                if (listaTransmisionDocumento.ListaTransmisionDocumento.Count > 0)
                {
                    responseViewModel.CantidadPaginas = listaTransmisionDocumento.CantidadPaginas;
                    responseViewModel.TotalRegistros = listaTransmisionDocumento.TotalRegistros;
                    responseViewModel.NroPagina = listaTransmisionDocumento.NroPagina;
                    responseViewModel.Result = listaTransmisionDocumento.Result;
                    foreach (var item in listaTransmisionDocumento.ListaTransmisionDocumento)
                    {
                        var objet = new ListaTransmisionDocumentoViewModel();
                        objet.CodigoDocumento = item.CodigoDocumento;
                        objet.NumeroDocumento = item.NumeroDocumento;
                        objet.NombreNave = item.NombreNave;
                        objet.NumeroViajeItinerario = item.NumeroViajeItinerario;
                        objet.AnioManifiestoItinerario = item.AnioManifiestoItinerario;
                        objet.NumeroManifiestoItinerario = item.NumeroManifiestoItinerario;
                        objet.NombreAduana = item.NombreAduana;
                        objet.NombreTipoEnvio = item.NombreTipoEnvio;
                        objet.TotalPesoBrutoTransmision = item.TotalPesoBrutoTransmision;
                        objet.TotalBultosTransmision = item.TotalBultosTransmision;
                        objet.TotalContenedoresTransmision = item.TotalContenedoresTransmision;
                        objet.Consignatario = item.Consignatario;
                        objet.Embarcador = item.Embarcador;
                        objet.PuertoEmbarque = item.PuertoEmbarque;
                        objet.PuertoFinal = item.PuertoFinal;
                        objet.EstadoEnvioAduanas = item.EstadoEnvioAduanas;
                        objet.EstadoTransmision = item.EstadoTransmision;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        responseViewModel.ListaTransmisionDocumento.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseViewModel;
        }

        public ResponseBusquedaLogTransmisionNaveViewModel BusquedaLogTransmisionNave(RequestBusquedaLogTransmisionNaveViewModel request)
        {
            var responseViewModel = new ResponseBusquedaLogTransmisionNaveViewModel();
            try
            {
                var requestAgente = new RequestBusquedaLogTransmisionNave
                {
                    CodigoItinerario = request.filtro.CodigoItinerario,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaLogTransmisionNave = new TransmisionesProxyrest().BusquedaLogTransmisionNave(requestAgente);
                if (listaLogTransmisionNave.ListaLogTransmisionNave.Count > 0)
                {
                    responseViewModel.CantidadPaginas = listaLogTransmisionNave.CantidadPaginas;
                    responseViewModel.TotalRegistros = listaLogTransmisionNave.TotalRegistros;
                    responseViewModel.NroPagina = listaLogTransmisionNave.NroPagina;
                    responseViewModel.Result = listaLogTransmisionNave.Result;
                    foreach (var item in listaLogTransmisionNave.ListaLogTransmisionNave)
                    {
                        var objet = new ListaLogTransmisionNaveViewModel();
                        objet.CodigoItinerario = item.CodigoItinerario;
                        objet.CampoLogTransmisionItinerario = item.CampoLogTransmisionItinerario;
                        objet.ValorLogTransmisionItinerario = item.ValorLogTransmisionItinerario;
                        objet.TextoLogTransmisionItinerario = item.TextoLogTransmisionItinerario;
                        objet.FechaLogTransmisionItinerario = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaLogTransmisionItinerario);
                        responseViewModel.ListaLogTransmisionNave.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseViewModel;
        }

        public ResponseBusquedaLogTransmisionDocumentoViewModel BusquedaLogTransmisionDocumento(RequestBusquedaLogTransmisionDocumentoViewModel request)
        {
            var responseViewModel = new ResponseBusquedaLogTransmisionDocumentoViewModel();
            try
            {
                var requestAgente = new RequestBusquedaLogTransmisionDocumento
                {
                    CodigoDocumento = request.filtro.CodigoDocumento,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaLogTransmisionDocumento = new TransmisionesProxyrest().BusquedaLogTransmisionDocumento(requestAgente);
                if (listaLogTransmisionDocumento.ListaLogTransmisionDocumento.Count > 0)
                {
                    responseViewModel.CantidadPaginas = listaLogTransmisionDocumento.CantidadPaginas;
                    responseViewModel.TotalRegistros = listaLogTransmisionDocumento.TotalRegistros;
                    responseViewModel.NroPagina = listaLogTransmisionDocumento.NroPagina;
                    responseViewModel.Result = listaLogTransmisionDocumento.Result;
                    foreach (var item in listaLogTransmisionDocumento.ListaLogTransmisionDocumento)
                    {
                        var objet = new ListaLogTransmisionDocumentoViewModel();
                        objet.CodigoDocumento = item.CodigoDocumento;
                        objet.CampoLogTransmisionDocumento = item.CampoLogTransmisionDocumento;
                        objet.ValorLogTransmisionDocumento = item.ValorLogTransmisionDocumento;
                        objet.TextoLogTransmisionDocumento = item.TextoLogTransmisionDocumento;
                        objet.FechaLogTransmisionDocumento = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaLogTransmisionDocumento);
                        responseViewModel.ListaLogTransmisionDocumento.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseViewModel;
        }
    }
}