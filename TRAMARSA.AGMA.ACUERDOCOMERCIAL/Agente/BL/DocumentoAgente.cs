using GR.Frameworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class DocumentoAgente
    {
        public ResponseRegistrarDocumento RegistroDocumento(RequestRegistrarDocumentoViewModel request)
        {
            var responseRegistroDocumento = new ResponseRegistrarDocumento();
            try
            {
                var requestAgente = SetRequestGuardarDocumento(request);
                responseRegistroDocumento = new TransmisionesProxyrest().RegistrarDocumento(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroDocumento.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroDocumento;
        }

        private RegistrarDocumentoDTO SetRequestGuardarDocumento(RequestRegistrarDocumentoViewModel request)
        {
            RegistrarDocumentoDTO requestDocumento = new RegistrarDocumentoDTO();
            requestDocumento.CodigoDocumento = request.CodigoDocumento;
            requestDocumento.CodigoItinerario = request.CodigoItinerario;
            requestDocumento.CodigoPuertoOrigenDocumento = request.CodigoPuertoOrigenDocumento;
            requestDocumento.CodigoPuertoEmbarqueDocumento = request.CodigoPuertoEmbarqueDocumento;
            requestDocumento.CodigoPuertoDescargaDocumento = request.CodigoPuertoDescargaDocumento;
            requestDocumento.CodigoPuertoFinalDocumento = request.CodigoPuertoFinalDocumento;
            requestDocumento.CodigoLineaNaviera = request.CodigoLineaNaviera;
            requestDocumento.CodigoAduana = request.CodigoAduana;
            requestDocumento.CodigoTipoBL = request.CodigoTipoBL;
            requestDocumento.CodigoTipoEnvio = request.CodigoTipoEnvio;
            requestDocumento.CodigoCondicionContrato = request.CodigoCondicionContrato;
            requestDocumento.CodigoRequerimientoServicio = request.CodigoRequerimientoServicio;
            requestDocumento.NumeroDocumento = request.NumeroDocumento;
            requestDocumento.FechaEmisionDocumento = request.FechaEmisionDocumento;
            requestDocumento.FechaEmbarqueDocumento = request.FechaEmbarqueDocumento;
            requestDocumento.UsuarioCreacion = request.UsuarioCreacion;
            requestDocumento.FechaHoraCreacion = request.FechaHoraCreacion;
            requestDocumento.UsuarioActualizacion = request.UsuarioActualizacion;
            requestDocumento.FechaHoraActualizacion = request.FechaHoraActualizacion;
            requestDocumento.EstadoRegistro = request.EstadoRegistro;
            requestDocumento.Accion = request.Accion;
            requestDocumento.ListaDocumentoDetalleCarga = new List<DocumentoDetalleCargaRequestDTO>();
            requestDocumento.ListaDocumentoDetalleFlete = new List<DocumentoDetalleFleteRequestDTO>();

            foreach (var item in request.ListaDocumentoDetalleCarga)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    DocumentoDetalleCargaRequestDTO DocumentoDetalleCarga = new DocumentoDetalleCargaRequestDTO();
                    DocumentoDetalleCarga.CodigoDocumentoDetalleCarga = item.CodigoDocumentoDetalleCarga;
                    DocumentoDetalleCarga.CodigoDocumento = item.CodigoDocumento;
                    DocumentoDetalleCarga.CodigoContenedor = item.CodigoContenedor;
                    DocumentoDetalleCarga.NumeroContenedor = item.NumeroContenedor;
                    DocumentoDetalleCarga.NombreTipoContenedor = item.NombreTipoContenedor;
                    DocumentoDetalleCarga.TamanioTipoContenedor = item.TamanioTipoContenedor;
                    DocumentoDetalleCarga.CodigoCondicionTransporte = item.CodigoCondicionTransporte;
                    DocumentoDetalleCarga.NombreCondicionTransporte = item.NombreCondicionTransporte;
                    DocumentoDetalleCarga.CodigoTipoMovimiento = item.CodigoTipoMovimiento;
                    DocumentoDetalleCarga.NombreTipoMovimiento = item.NombreTipoMovimiento;
                    DocumentoDetalleCarga.CodigoUnidadMercancia = item.CodigoUnidadMercancia;
                    DocumentoDetalleCarga.NombreUnidadMercancia = item.NombreUnidadMercancia;
                    DocumentoDetalleCarga.CodigoNaturalezaCarga = item.CodigoNaturalezaCarga;
                    DocumentoDetalleCarga.NombreNaturalezaCarga = item.NombreNaturalezaCarga;
                    DocumentoDetalleCarga.CodigoCondicionCarga = item.CodigoCondicionCarga;
                    DocumentoDetalleCarga.NombreCondicionCarga = item.NombreCondicionCarga;
                    DocumentoDetalleCarga.CodigoTemperatura = item.CodigoTemperatura;
                    DocumentoDetalleCarga.NombreTemperatura = item.NombreTemperatura;
                    DocumentoDetalleCarga.CodigoClaseIMO = item.CodigoClaseIMO;
                    DocumentoDetalleCarga.NombreClaseIMO = item.NombreClaseIMO;
                    DocumentoDetalleCarga.CodigoNumeroIMO = item.CodigoNumeroIMO;
                    DocumentoDetalleCarga.NombreNumeroIMO = item.NombreNumeroIMO;
                    DocumentoDetalleCarga.CodigoAlmacenDocumentoDetalleCarga = item.CodigoAlmacenDocumentoDetalleCarga;
                    DocumentoDetalleCarga.NombreAlmacen = item.NombreAlmacen;
                    DocumentoDetalleCarga.CodigoDepositoDocumentoDetalleCarga = item.CodigoDepositoDocumentoDetalleCarga;
                    DocumentoDetalleCarga.NombreDeposito = item.NombreDeposito;
                    DocumentoDetalleCarga.CodigoPrecinto = item.CodigoPrecinto;
                    DocumentoDetalleCarga.NumeroPrecinto = item.NumeroPrecinto;
                    DocumentoDetalleCarga.ItemDocumentoDetalleCarga = item.ItemDocumentoDetalleCarga;
                    DocumentoDetalleCarga.CantidadBultoDocumentoDetalleCarga = item.CantidadBultoDocumentoDetalleCarga;
                    DocumentoDetalleCarga.PesoBrutoDocumentoDetalleCarga = item.PesoBrutoDocumentoDetalleCarga;
                    DocumentoDetalleCarga.VolumenBrutoDocumentoDetalleCarga = item.VolumenBrutoDocumentoDetalleCarga;
                    DocumentoDetalleCarga.TemperaturaMinimaDocumentoDetalleCarga = item.TemperaturaMinimaDocumentoDetalleCarga;
                    DocumentoDetalleCarga.TemperaturaMaximaDocumentoDetalleCarga = item.TemperaturaMaximaDocumentoDetalleCarga;
                    DocumentoDetalleCarga.PropietarioDocumentoDetalleCarga = item.PropietarioDocumentoDetalleCarga;
                    DocumentoDetalleCarga.ObservacionDocumentoDetalleCarga = item.ObservacionDocumentoDetalleCarga;
                    DocumentoDetalleCarga.DescripcionDocumentoDetalleCarga = item.DescripcionDocumentoDetalleCarga;
                    DocumentoDetalleCarga.MarcasNumerosDocumentoDetalleCarga = item.MarcasNumerosDocumentoDetalleCarga;
                    DocumentoDetalleCarga.FaltoDocumentoDetalleCarga = item.FaltoDocumentoDetalleCarga;
                    DocumentoDetalleCarga.Accion = item.Accion;
                    requestDocumento.ListaDocumentoDetalleCarga.Add(DocumentoDetalleCarga);
                }
            }

            foreach (var item in request.ListaDocumentoDetalleCliente)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    DocumentoDetalleClienteRequestDTO DocumentoDetalleCliente = new DocumentoDetalleClienteRequestDTO();
                    DocumentoDetalleCliente.CodigoDocumentoDetalleCliente = item.CodigoDocumentoDetalleCliente;
                    DocumentoDetalleCliente.CodigoDocumento = item.CodigoDocumento;
                    DocumentoDetalleCliente.CodigoRol = item.CodigoRol;
                    DocumentoDetalleCliente.NombreRol = item.NombreRol;
                    DocumentoDetalleCliente.CodigoPersona = item.CodigoPersona;
                    DocumentoDetalleCliente.Accion = item.Accion;
                    requestDocumento.ListaDocumentoDetalleCliente.Add(DocumentoDetalleCliente);
                }
            }

            foreach (var item in request.ListaDocumentoDetalleFlete)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    DocumentoDetalleFleteRequestDTO DocumentoDetalleFlete = new DocumentoDetalleFleteRequestDTO();
                    DocumentoDetalleFlete.CodigoDocumentoDetalleFlete = item.CodigoDocumentoDetalleFlete;
                    DocumentoDetalleFlete.CodigoDocumento = item.CodigoDocumento;
                    DocumentoDetalleFlete.CodigoTipoFlete = item.CodigoTipoFlete;
                    DocumentoDetalleFlete.NombreTipoFlete = item.NombreTipoFlete;
                    DocumentoDetalleFlete.CodigoMoneda = item.CodigoMoneda;
                    DocumentoDetalleFlete.NombreMoneda = item.NombreMoneda;
                    DocumentoDetalleFlete.CodigoModoPago = item.CodigoModoPago;
                    DocumentoDetalleFlete.NombreModoPago = item.NombreModoPago;
                    DocumentoDetalleFlete.MontoDocumentoDetalleFlete = item.MontoDocumentoDetalleFlete;
                    DocumentoDetalleFlete.Accion = item.Accion;
                    requestDocumento.ListaDocumentoDetalleFlete.Add(DocumentoDetalleFlete);
                }
            }

            return requestDocumento;
        }

        public ResponseBusquedaDocumentoViewModel BusquedaDocumento(RequestBusquedaDocumentoViewModel request)
        {
            var responseViewModel = new ResponseBusquedaDocumentoViewModel();
            try
            {
                var requestAgente = new RequestBusquedaDocumento
                {
                    //CodigoDocumento = request.filtro.CodigoDocumento != null ? Convert.ToInt64(request.filtro.CodigoDocumento) : 0,
                    CodigoDocumento = request.filtro.CodigoDocumento,
                    CodigoItinerario = request.filtro.CodigoItinerario,
                    CodigoPuertoOrigenDocumento = request.filtro.CodigoPuertoOrigenDocumento,
                    CodigoPuertoEmbarqueDocumento = request.filtro.CodigoPuertoEmbarqueDocumento,
                    CodigoPuertoDescargaDocumento = request.filtro.CodigoPuertoDescargaDocumento,
                    CodigoPuertoFinalDocumento = request.filtro.CodigoPuertoFinalDocumento,
                    CodigoLineaNaviera = request.filtro.CodigoLineaNaviera,
                    CodigoAduana = request.filtro.CodigoAduana,
                    CodigoTipoBL = request.filtro.CodigoTipoBL,
                    CodigoTipoEnvio = request.filtro.CodigoTipoEnvio,
                    NumeroDocumento = request.filtro.NumeroDocumento,
                    FechaEmisionDocumentoInicio = request.filtro.FechaEmisionDocumentoInicio,
                    FechaEmisionDocumentoFin = request.filtro.FechaEmisionDocumentoFin,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaDocumento = new TransmisionesProxyrest().BusquedaDocumento(requestAgente);
                if (listaDocumento.ListaDocumento.Count > 0)
                {
                    responseViewModel.CantidadPaginas = listaDocumento.CantidadPaginas;
                    responseViewModel.TotalRegistros = listaDocumento.TotalRegistros;
                    responseViewModel.NroPagina = listaDocumento.NroPagina;
                    responseViewModel.Result = listaDocumento.Result;
                    foreach (var item in listaDocumento.ListaDocumento)
                    {
                        var objet = new ListaDocumentoViewModel();
                        objet.CodigoDocumento = item.CodigoDocumento;
                        objet.NombreNave = item.NombreNave;
                        objet.NumeroViajeItinerario = item.NumeroViajeItinerario;
                        objet.NombrePuertoOrigenDocumento = item.NombrePuertoOrigenDocumento;
                        objet.NombrePuertoEmbarqueDocumento = item.NombrePuertoEmbarqueDocumento;
                        objet.NombrePuertoDescargaDocumento = item.NombrePuertoDescargaDocumento;
                        objet.NombrePuertoFinalDocumento = item.NombrePuertoFinalDocumento;
                        objet.NombreLineaNaviera = item.NombreLineaNaviera;
                        objet.NumeroDocumento = item.NumeroDocumento;
                        objet.NombreAduana = item.NombreAduana;
                        objet.NombreTipoBL = item.NombreTipoBL;
                        objet.NombreTipoEnvio = item.NombreTipoEnvio;
                        //objet.FechaEmisionDocumento = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaEmisionDocumento);
                        objet.FechaEmisionDocumento = string.Format("{0:dd/MM/yyyy}", item.FechaEmisionDocumento);
                        objet.FechaEmbarqueDocumento = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaEmbarqueDocumento);
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        responseViewModel.ListaDocumento.Add(objet);
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

        public ResponseConsultarDetalleDocumentoViewModel ConsultarDetalleDocumento(RequestConsultaDetalleDocumentoViewModel request)
        {
            var resp = new ResponseConsultarDetalleDocumentoViewModel();
            try
            {
                var requestConsulta = new RequestConsultaDetalleDocumento
                {
                    CodigoDocumento = request.filtro.CodigoDocumento
                };
                var response = new TransmisionesProxyrest().ConsultarDetalleDocumento(requestConsulta);
                resp.Result = response.Result;
                if (response.ListaDetalleDocumento.Count > 0)
                {
                    var datos = new DetalleDocumentoViewModel();
                    datos.CodigoDocumento = response.ListaDetalleDocumento[0].CodigoDocumento;
                    datos.CodigoItinerario = response.ListaDetalleDocumento[0].CodigoItinerario;
                    datos.NombreNave = response.ListaDetalleDocumento[0].NombreNave;
                    datos.NumeroViajeItinerario = response.ListaDetalleDocumento[0].NumeroViajeItinerario;
                    datos.NombreAduanaNave = response.ListaDetalleDocumento[0].NombreAduanaNave;
                    datos.NombreTipoOperacion = response.ListaDetalleDocumento[0].NombreTipoOperacion;
                    datos.CodigoPuertoOrigenDocumento = response.ListaDetalleDocumento[0].CodigoPuertoOrigenDocumento;
                    datos.NombrePuertoOrigen = response.ListaDetalleDocumento[0].NombrePuertoOrigen;
                    datos.CodigoPuertoEmbarqueDocumento = response.ListaDetalleDocumento[0].CodigoPuertoEmbarqueDocumento;
                    datos.NombrePuertoEmbarque = response.ListaDetalleDocumento[0].NombrePuertoEmbarque;
                    datos.CodigoPuertoDescargaDocumento = response.ListaDetalleDocumento[0].CodigoPuertoDescargaDocumento;
                    datos.NombrePuertoDescarga = response.ListaDetalleDocumento[0].NombrePuertoDescarga;
                    datos.CodigoPuertoFinalDocumento = response.ListaDetalleDocumento[0].CodigoPuertoFinalDocumento;
                    datos.NombrePuertoFinal = response.ListaDetalleDocumento[0].NombrePuertoFinal;
                    datos.CodigoLineaNaviera = response.ListaDetalleDocumento[0].CodigoLineaNaviera;
                    datos.NombreLineaNaviera = response.ListaDetalleDocumento[0].NombreLineaNaviera;
                    datos.CodigoAduana = response.ListaDetalleDocumento[0].CodigoAduana;
                    datos.NombreAduana = response.ListaDetalleDocumento[0].NombreAduana;
                    datos.CodigoTipoBL = response.ListaDetalleDocumento[0].CodigoTipoBL;
                    datos.NombreTipoBL = response.ListaDetalleDocumento[0].NombreTipoBL;
                    datos.CodigoTipoEnvio = response.ListaDetalleDocumento[0].CodigoTipoEnvio;
                    datos.NombreTipoEnvio = response.ListaDetalleDocumento[0].NombreTipoEnvio;
                    datos.CodigoCondicionContrato = response.ListaDetalleDocumento[0].CodigoCondicionContrato;
                    datos.NombreCondicionContrato = response.ListaDetalleDocumento[0].NombreCondicionContrato;
                    datos.CodigoRequerimientoServicio = response.ListaDetalleDocumento[0].CodigoRequerimientoServicio;
                    datos.NombreRequerimientoServicio = response.ListaDetalleDocumento[0].NombreRequerimientoServicio;
                    datos.NumeroDocumento = response.ListaDetalleDocumento[0].NumeroDocumento;
                    datos.FechaEmisionDocumento = string.Format("{0:dd/MM/yyyy}", response.ListaDetalleDocumento[0].FechaEmisionDocumento);
                    datos.FechaEmbarqueDocumento = string.Format("{0:dd/MM/yyyy}", response.ListaDetalleDocumento[0].FechaEmbarqueDocumento);
                    datos.UsuarioCreacion = response.ListaDetalleDocumento[0].UsuarioCreacion;
                    datos.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", response.ListaDetalleDocumento[0].FechaHoraCreacion);
                    datos.UsuarioActualizacion = response.ListaDetalleDocumento[0].UsuarioActualizacion;
                    datos.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy}", response.ListaDetalleDocumento[0].FechaHoraActualizacion);
                    datos.EstadoRegistro = response.ListaDetalleDocumento[0].EstadoRegistro;
                    datos.Accion = "U";

                    var c = 1;

                    foreach (var x in response.ListaDetalleDocumento[0].ListaDocumentoDetalleCarga)
                    {
                        var carga = new DocumentoDetalleCargaViewModel()
                        {
                            IdCarga = c,
                            CodigoDocumentoDetalleCarga = x.CodigoDocumentoDetalleCarga,
                            CodigoDocumento = x.CodigoDocumento,
                            CodigoContenedor = x.CodigoContenedor,
                            NumeroContenedor = x.NumeroContenedor,
                            NombreTipoContenedor = x.NombreTipoContenedor,
                            TamanioTipoContenedor = x.TamanioTipoContenedor,
                            CodigoCondicionTransporte = x.CodigoCondicionTransporte,
                            NombreCondicionTransporte = x.NombreCondicionTransporte,
                            CodigoTipoMovimiento = x.CodigoTipoMovimiento,
                            NombreTipoMovimiento = x.NombreTipoMovimiento,
                            CodigoUnidadMercancia = x.CodigoUnidadMercancia,
                            NombreUnidadMercancia = x.NombreUnidadMercancia,
                            CodigoNaturalezaCarga = x.CodigoNaturalezaCarga,
                            NombreNaturalezaCarga = x.NombreNaturalezaCarga,
                            CodigoCondicionCarga = x.CodigoCondicionCarga,
                            NombreCondicionCarga = x.NombreCondicionCarga,
                            CodigoTemperatura = x.CodigoTemperatura,
                            NombreTemperatura = x.NombreTemperatura,
                            CodigoClaseIMO = x.CodigoClaseIMO,
                            NombreClaseIMO = x.NombreClaseIMO,
                            CodigoNumeroIMO = x.CodigoNumeroIMO,
                            NombreNumeroIMO = x.NombreNumeroIMO,
                            CodigoAlmacenDocumentoDetalleCarga = x.CodigoAlmacenDocumentoDetalleCarga,
                            NombreAlmacen = x.NombreAlmacen,
                            CodigoDepositoDocumentoDetalleCarga = x.CodigoDepositoDocumentoDetalleCarga,
                            NombreDeposito = x.NombreDeposito,
                            CodigoPrecinto = x.CodigoPrecinto,
                            NumeroPrecinto = x.NumeroPrecinto,
                            ItemDocumentoDetalleCarga = x.ItemDocumentoDetalleCarga,
                            CantidadBultoDocumentoDetalleCarga = x.CantidadBultoDocumentoDetalleCarga,
                            PesoBrutoDocumentoDetalleCarga = x.PesoBrutoDocumentoDetalleCarga,
                            VolumenBrutoDocumentoDetalleCarga = x.VolumenBrutoDocumentoDetalleCarga,
                            TemperaturaMinimaDocumentoDetalleCarga = x.TemperaturaMinimaDocumentoDetalleCarga,
                            TemperaturaMaximaDocumentoDetalleCarga = x.TemperaturaMaximaDocumentoDetalleCarga,
                            PropietarioDocumentoDetalleCarga = x.PropietarioDocumentoDetalleCarga,
                            ObservacionDocumentoDetalleCarga = x.ObservacionDocumentoDetalleCarga,
                            DescripcionDocumentoDetalleCarga = x.DescripcionDocumentoDetalleCarga,
                            MarcasNumerosDocumentoDetalleCarga = x.MarcasNumerosDocumentoDetalleCarga,
                            FaltoDocumentoDetalleCarga = x.FaltoDocumentoDetalleCarga,
                            Accion = x.Accion
                        };
                        datos.ListaDocumentoDetalleCarga.Add(carga);
                        c++;
                    }

                    c = 1;

                    foreach (var x in response.ListaDetalleDocumento[0].ListaDocumentoDetalleCliente)
                    {
                        var Cliente = new DocumentoDetalleClienteViewModel()
                        {
                            IdCliente = c,
                            CodigoDocumentoDetalleCliente = x.CodigoDocumentoDetalleCliente,
                            CodigoDocumento = x.CodigoDocumento,
                            CodigoRol = x.CodigoRol,
                            NombreRol = x.NombreRol,
                            CodigoPersona = x.CodigoPersona,
                            RazonSocialPersona = x.RazonSocialPersona,
                            Accion = x.Accion
                        };
                        datos.ListaDocumentoDetalleCliente.Add(Cliente);
                        c++;
                    }

                    c = 1;

                    foreach (var x in response.ListaDetalleDocumento[0].ListaDocumentoDetalleFlete)
                    {
                        var flete = new DocumentoDetalleFleteViewModel()
                        {
                            IdFlete = c,
                            CodigoDocumentoDetalleFlete = x.CodigoDocumentoDetalleFlete,
                            CodigoDocumento = x.CodigoDocumento,
                            CodigoTipoFlete = x.CodigoTipoFlete,
                            NombreTipoFlete = x.NombreTipoFlete,
                            CodigoMoneda = x.CodigoMoneda,
                            NombreMoneda = x.NombreMoneda,
                            CodigoModoPago = x.CodigoModoPago,
                            NombreModoPago = x.NombreModoPago,
                            MontoDocumentoDetalleFlete = x.MontoDocumentoDetalleFlete,
                            Accion = x.Accion
                        };
                        datos.ListaDocumentoDetalleFlete.Add(flete);
                        c++;
                    }

                    resp.ListaDetalleDocumento.Add(datos);
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return resp;
        }
    }
}