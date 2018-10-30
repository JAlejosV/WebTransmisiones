using System;
using System.Collections.Generic;
using System.Linq;
using GR.Comun.DTO;
using GR.Frameworks;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.ViewModel;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.DTO.AcuerdosComerciales;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ConfiguracionLinea.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class AcuerdoComercialAgente
    {
        /// <summary>
        /// Registro de Tarifas Locales
        /// </summary>
        /// <param name="request"></param>
        /// <param name="codLinea"></param>
        /// <returns></returns>
        public ResponseNotificarContenedor NotificarContenedor(string codLinea)
        {
            ResponseNotificarContenedor resultado = new ResponseNotificarContenedor();
            try
            {
                resultado = new TransmisionesProxyrest().NotificarContenedor(codLinea);
            }
            catch (Exception ex)
            {
                resultado.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return resultado;
        }


        /// <summary>
        /// Registro de Tarifas Locales
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseRegistrarTarifaLocal RegistroAcuerdoComercial(ActualizaAcuerdoComercialLocalRequestViewModel request)
        {
            var responseRegistroTarifa = new ResponseRegistrarTarifaLocal();
            try
            {
                var requestAgente = SetRequestGuardarAcuerdoComercial(request);
                responseRegistroTarifa = new TransmisionesProxyrest().RegistroAcuerdoComercial(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroTarifa;
        }

        /// <summary>
        /// Consultar detalle tarifa local
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private ActualizaAcuerdoComercialLocalRequestDTO SetRequestGuardarAcuerdoComercial(ActualizaAcuerdoComercialLocalRequestViewModel request)
        {
            ActualizaAcuerdoComercialLocalRequestDTO requestAcuerdoComercial = new ActualizaAcuerdoComercialLocalRequestDTO();
            requestAcuerdoComercial.CodigoAcuerdoComercialLocal = request.CodigoAcuerdoComercialLocal;
            requestAcuerdoComercial.Estado = request.Estado;
            requestAcuerdoComercial.CodigoLinea = request.CodigoLinea;
            requestAcuerdoComercial.CodigoUsuarioAutorizador = request.CodigoUsuarioAutorizador;
            requestAcuerdoComercial.FechaAutorizacion = request.FechaAutorizacion;
            requestAcuerdoComercial.CodigoTipoCriterio = request.CodigoTipoCriterio;
            requestAcuerdoComercial.InicioVigencia = request.InicioVigencia;
            requestAcuerdoComercial.FinVigencia = request.FinVigencia;
            requestAcuerdoComercial.UsuarioCreacion = request.UsuarioCreacion;
            requestAcuerdoComercial.FechaHoraCreacion = request.FechaHoraCreacion;
            requestAcuerdoComercial.UsuarioActualizacion = request.UsuarioActualizacion;
            requestAcuerdoComercial.FechaHoraActualizacion = request.FechaHoraActualizacion;
            requestAcuerdoComercial.EstadoRegistro = request.EstadoRegistro;
            requestAcuerdoComercial.Accion = request.Accion;
            requestAcuerdoComercial.CodigoCondicion = request.CodigoTipoCondicion;


            requestAcuerdoComercial.ListaAcuerdoComercialLocalSucursal = new List<AcuerdoComercialLocalSucursalRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalSucursalTerminal = new List<AcuerdoComercialLocalSucursalTerminalRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalRA = new List<AcuerdoComercialLocalRARequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalPuerto = new List<AcuerdoComercialLocalPuertoRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalClienteBLMaster = new List<AcuerdoComercialLocalClienteBLMasterRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalAgenteBLMaster = new List<AcuerdoComercialLocalAgenteBLMasterRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalClienteBLHouse = new List<AcuerdoComercialLocalClienteBLHouseRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalAgenteBLHouse = new List<AcuerdoComercialLocalAgenteBLHouseRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalServicioNave = new List<AcuerdoComercialLocalServicioNaveRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalServicioBL = new List<AcuerdoComercialLocalServicioBLRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalTipoContenedor = new List<AcuerdoComercialLocalTipoContenedorRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalCarga = new List<AcuerdoComercialLocalCargaRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalTarifa = new List<AcuerdoComercialLocalTarifaRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalTarifaLigada = new List<AcuerdoComercialLocalTarifaLigadaRequestDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalTipoCarga = new List<AcuerdoComercialLocalTipoCargaRequestDTO>();

            requestAcuerdoComercial.ListaAcuerdoComercialLocalMatchCode = new List<AcuerdoComercialLocalMatchCodeDTO>();
            requestAcuerdoComercial.ListaAcuerdoComercialLocalPartidaArancelaria = new List<AcuerdoComercialLocalPartidaArancelariaDTO>();


            foreach (var item in request.ListaAcuerdoComercialLocalSucursal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalSucursalRequestDTO acuerdoComercialSucursal = new AcuerdoComercialLocalSucursalRequestDTO();
                    acuerdoComercialSucursal.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialSucursal.CodigoSucursal = item.CodigoSucursal;
                    acuerdoComercialSucursal.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalSucursal.Add(acuerdoComercialSucursal);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalSucursalTerminal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalSucursalTerminalRequestDTO acuerdoComercialTerminal = new AcuerdoComercialLocalSucursalTerminalRequestDTO();
                    acuerdoComercialTerminal.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialTerminal.CodigoSucursal = item.CodigoSucursal;
                    acuerdoComercialTerminal.CodigoTerminalPortuario = item.CodigoTerminalPortuario;
                    acuerdoComercialTerminal.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalSucursalTerminal.Add(acuerdoComercialTerminal);
                }
            }
            foreach (var item in request.ListaAcuerdoComercialLocalRA)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalRARequestDTO acuerdoComercialLocalRA = new AcuerdoComercialLocalRARequestDTO();
                    acuerdoComercialLocalRA.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialLocalRA.CodigoRA = item.CodigoRA;
                    acuerdoComercialLocalRA.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalRA.Add(acuerdoComercialLocalRA);
                }
            }
            foreach (var item in request.ListaAcuerdoComercialLocalPuerto)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalPuertoRequestDTO acuerdoComercialLocalPuerto = new AcuerdoComercialLocalPuertoRequestDTO();
                    acuerdoComercialLocalPuerto.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialLocalPuerto.CodigoPuerto = item.CodigoPuerto;
                    acuerdoComercialLocalPuerto.CodigoTipoPuerto = item.CodigoTipoPuerto;
                    acuerdoComercialLocalPuerto.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalPuerto.Add(acuerdoComercialLocalPuerto);
                }
            }
            foreach (var item in request.ListaAcuerdoComercialLocalClienteBLMaster)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalClienteBLMasterRequestDTO acuerdoComercialClienteBLMaster = new AcuerdoComercialLocalClienteBLMasterRequestDTO();
                    acuerdoComercialClienteBLMaster.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialClienteBLMaster.CodigoDocumentoCliente = item.CodigoDocumentoCliente;
                    acuerdoComercialClienteBLMaster.CodigoCliente = item.CodigoCliente;

                    acuerdoComercialClienteBLMaster.NombreInterlocutor = item.NombreInterlocutor; //JM
                    acuerdoComercialClienteBLMaster.Rol = item.Rol; //JM

                    acuerdoComercialClienteBLMaster.CodigoRol = item.CodigoRol;
                    //acuerdoComercialClienteBLMaster.CodigoTipoCondicion = item.CodigoTipoCondicion;
                    acuerdoComercialClienteBLMaster.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalClienteBLMaster.Add(acuerdoComercialClienteBLMaster);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalAgenteBLMaster)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalAgenteBLMasterRequestDTO acuerdoComercialAgenteBLMaster = new AcuerdoComercialLocalAgenteBLMasterRequestDTO();
                    acuerdoComercialAgenteBLMaster.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialAgenteBLMaster.CodigoDocumentoAgente = item.CodigoDocumentoAgente;
                    acuerdoComercialAgenteBLMaster.CodigoRol = item.CodigoRol;
                    acuerdoComercialAgenteBLMaster.CodigoAgente = item.CodigoAgente;
                    acuerdoComercialAgenteBLMaster.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalAgenteBLMaster.Add(acuerdoComercialAgenteBLMaster);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalClienteBLHouse)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalClienteBLHouseRequestDTO acuerdoComercialClienteBLHouse = new AcuerdoComercialLocalClienteBLHouseRequestDTO();
                    acuerdoComercialClienteBLHouse.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialClienteBLHouse.CodigoDocumentoCliente = item.CodigoDocumentoCliente;
                    acuerdoComercialClienteBLHouse.CodigoRol = item.CodigoRol;

                    acuerdoComercialClienteBLHouse.Rol = item.Rol;
                    acuerdoComercialClienteBLHouse.NombreInterlocutor = item.NombreInterlocutor;

                    acuerdoComercialClienteBLHouse.CodigoCliente = item.CodigoCliente;
                    acuerdoComercialClienteBLHouse.CodigoCondicion = item.CodigoCondicion;
                    acuerdoComercialClienteBLHouse.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalClienteBLHouse.Add(acuerdoComercialClienteBLHouse);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalAgenteBLHouse)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalAgenteBLHouseRequestDTO acuerdoComercialAgenteBLHouse = new AcuerdoComercialLocalAgenteBLHouseRequestDTO();
                    acuerdoComercialAgenteBLHouse.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialAgenteBLHouse.CodigoDocumentoAgente = item.CodigoDocumentoAgente;
                    acuerdoComercialAgenteBLHouse.CodigoRol = item.CodigoRol;
                    acuerdoComercialAgenteBLHouse.CodigoAgente = item.CodigoAgente;
                    acuerdoComercialAgenteBLHouse.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalAgenteBLHouse.Add(acuerdoComercialAgenteBLHouse);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalServicioNave)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalServicioNaveRequestDTO acuerdoComercialServicioNave = new AcuerdoComercialLocalServicioNaveRequestDTO();
                    acuerdoComercialServicioNave.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialServicioNave.CodigoServicio = item.CodigoServicio;
                    acuerdoComercialServicioNave.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalServicioNave.Add(acuerdoComercialServicioNave);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalServicioBL)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalServicioBLRequestDTO acuerdoComercialServicioBL = new AcuerdoComercialLocalServicioBLRequestDTO();
                    acuerdoComercialServicioBL.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialServicioBL.CodigoServicio = item.CodigoServicio;
                    acuerdoComercialServicioBL.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalServicioBL.Add(acuerdoComercialServicioBL);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalTipoContenedor)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalTipoContenedorRequestDTO acuerdoComercialTipoContenedor = new AcuerdoComercialLocalTipoContenedorRequestDTO();
                    acuerdoComercialTipoContenedor.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialTipoContenedor.CodigoClaseContenedor = item.CodigoClaseContenedor;
                    acuerdoComercialTipoContenedor.CodigoTipoContenedor = item.CodigoTipoContenedor;
                    acuerdoComercialTipoContenedor.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalTipoContenedor.Add(acuerdoComercialTipoContenedor);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalCarga)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalCargaRequestDTO acuerdoComercialCarga = new AcuerdoComercialLocalCargaRequestDTO();
                    acuerdoComercialCarga.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialCarga.CodigoNave = item.CodigoNave;
                    acuerdoComercialCarga.NumeroViaje = item.NumeroViaje;
                    acuerdoComercialCarga.PuertoOrigen = item.PuertoOrigen;
                    acuerdoComercialCarga.PuertoEmbarque = item.PuertoEmbarque;
                    acuerdoComercialCarga.PuertoDestino = item.PuertoDestino;
                    acuerdoComercialCarga.DestinoFinal = item.DestinoFinal;
                    acuerdoComercialCarga.CodigoLinea = item.CodigoLinea;
                    acuerdoComercialCarga.NumeroBL = item.NumeroBL;
                    acuerdoComercialCarga.CodigoContenedor = item.CodigoContenedor;
                    acuerdoComercialCarga.TipoBL = item.TipoBL;
                    acuerdoComercialCarga.TipoDocumento = item.TipoDocumento;
                    acuerdoComercialCarga.NroBkn = item.NroBkn;
                    acuerdoComercialCarga.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalCarga.Add(acuerdoComercialCarga);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalTarifa)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalTarifaRequestDTO acuerdoComercialTarifa =
                        new AcuerdoComercialLocalTarifaRequestDTO();
                    acuerdoComercialTarifa.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialTarifa.CodigoMonedaAcuerdo = item.CodigoMonedaAcuerdo;
                    acuerdoComercialTarifa.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    acuerdoComercialTarifa.MontoAcuerdo = item.MontoAcuerdo;
                    acuerdoComercialTarifa.CodigoTipoDescuento = item.CodigoTipoDescuento;
                    acuerdoComercialTarifa.ValorDescuento = item.ValorDescuento;
                    acuerdoComercialTarifa.Accion = item.Accion;
                    acuerdoComercialTarifa.DescripcionTarifa = item.DescripcionTarifa;
                    acuerdoComercialTarifa.Moneda = item.Moneda;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalTarifa.Add(acuerdoComercialTarifa);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialLocalTarifaLigada)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalTarifaLigadaRequestDTO acuerdoComercialTarifaLigada = new AcuerdoComercialLocalTarifaLigadaRequestDTO();
                    acuerdoComercialTarifaLigada.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialTarifaLigada.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    acuerdoComercialTarifaLigada.CodigoTarifaLigadaLocal = item.CodigoTarifaLigadaLocal;
                    acuerdoComercialTarifaLigada.CodigoConfiguracionTarifaLigada = item.CodigoConfiguracionTarifaLigada;
                    acuerdoComercialTarifaLigada.Porcentaje = item.Porcentaje;
                    acuerdoComercialTarifaLigada.CodigoMoneda = item.CodigoMoneda;
                    acuerdoComercialTarifaLigada.Monto = item.Monto ?? 0;
                    acuerdoComercialTarifaLigada.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalTarifaLigada.Add(acuerdoComercialTarifaLigada);
                }
            }
            foreach (var item in request.ListaAcuerdoComercialLocalTipoCarga)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalTipoCargaRequestDTO acuerdoComercialTipoCarga = new AcuerdoComercialLocalTipoCargaRequestDTO();
                    acuerdoComercialTipoCarga.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialTipoCarga.TipoBL = item.TipoBL;
                    acuerdoComercialTipoCarga.Accion = item.Accion;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalTipoCarga.Add(acuerdoComercialTipoCarga);
                }
            }



            foreach (var item in request.ListaAcuerdoComercialLocalMatchCode)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalMatchCodeDTO acuerdoComercialMatchCode = new AcuerdoComercialLocalMatchCodeDTO();
                    acuerdoComercialMatchCode.Accion = item.Accion;
                    acuerdoComercialMatchCode.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialMatchCode.CodigoAcuerdoComercialLocalMatchCode = item.CodigoAcuerdoComercialLocalMatchCode;
                    acuerdoComercialMatchCode.MatchCode = item.CodigoMatchCode;
                    acuerdoComercialMatchCode.TipoCliente = item.Rol;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalMatchCode.Add(acuerdoComercialMatchCode);
                }

            }

            foreach (var item in request.ListaAcuerdoComercialLocalPartidaArancelaria)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialLocalPartidaArancelariaDTO acuerdoComercialPartidaArancelaria = new AcuerdoComercialLocalPartidaArancelariaDTO();
                    acuerdoComercialPartidaArancelaria.Accion = item.Accion;
                    acuerdoComercialPartidaArancelaria.CodigoAcuerdoComercialLocalPartidaArancelaria = item.CodigoAcuerdoComercialLocalPartidaArancelaria;
                    acuerdoComercialPartidaArancelaria.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    acuerdoComercialPartidaArancelaria.CodigoPartidaArancelaria = item.CodigoPartidaArancelaria;
                    requestAcuerdoComercial.ListaAcuerdoComercialLocalPartidaArancelaria.Add(acuerdoComercialPartidaArancelaria);
                }
            }
            return requestAcuerdoComercial;
        }

        /// <summary>
        /// ConsultarDetalleAcuerdoComercial
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseConsultarDetalleAcuerdoComercialLocalViewModel ConsultarDetalleAcuerdoComercial(RequestConsultaDetalleAcuerdoComercialViewModel request)
        {
            var resp = new ResponseConsultarDetalleAcuerdoComercialLocalViewModel();
            try
            {
                var requestAgente = new RequestConsultaDetalleAcuerdoComercialLocal
                {
                    CodigoAcuerdoComercialLocal = request.filtro.CodigoAcuerdoComercialLocal
                };
                var response = new TransmisionesProxyrest().ConsultarDetalleAcuerdoComercial(requestAgente);
                resp.Result = response.Result;
                if (response.DetalleAcuerdoComercialLocalList.Count > 0)
                {
                    var datos = new DetalleAcuerdoComercialLocalViewModel();
                    datos.Estado = response.DetalleAcuerdoComercialLocalList[0].Estado;
                    datos.CodigoLinea = response.DetalleAcuerdoComercialLocalList[0].CodigoLinea;
                    datos.CodigoUsuarioAutorizador = response.DetalleAcuerdoComercialLocalList[0].CodigoUsuarioAutorizador;
                    datos.Autorizado = response.DetalleAcuerdoComercialLocalList[0].Autorizado;
                    datos.FechaAutorizacion = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialLocalList[0].FechaAutorizacion);
                    datos.CodigoTipoCriterio = response.DetalleAcuerdoComercialLocalList[0].CodigoTipoCriterio;
                    datos.InicioVigencia = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialLocalList[0].InicioVigencia);
                    datos.FinVigencia = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialLocalList[0].FinVigencia);
                    datos.UsuarioCreacion = response.DetalleAcuerdoComercialLocalList[0].UsuarioCreacion;
                    datos.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialLocalList[0].FechaHoraCreacion);
                    datos.UsuarioActualizacion = response.DetalleAcuerdoComercialLocalList[0].UsuarioActualizacion;
                    datos.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialLocalList[0].FechaHoraActualizacion);
                    datos.DescripcionEstadoRegistro = response.DetalleAcuerdoComercialLocalList[0].DescripcionEstadoRegistro;
                    datos.EstadoRegistro = response.DetalleAcuerdoComercialLocalList[0].EstadoRegistro;
                    datos.CodigoAcuerdoComercialLocal = response.DetalleAcuerdoComercialLocalList[0].CodigoAcuerdoComercialLocal;
                    datos.Accion = "U";
                    datos.CodigoTipoCondicion = response.DetalleAcuerdoComercialLocalList[0].CodigoCondicion;


                    #region Sucursal

                    //datos.ListaAcuerdoComercialLocalSucursal = response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursal;
                    List<string> LstMatchCodigoSucursales = new List<string>();
                    var LstConfLineaSucursal = new MaestrosAgente().ListarSucursalByLinea(datos.CodigoLinea).SucursalesList;
                    var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                    var UnvSucursales = (from item in responseListarSucursal.SucursalesList
                                         select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();

                    foreach (var x in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursal)
                    {
                        var sucursal = new AcuerdoComercialLocalSucursalDTO
                        {
                            CodigoAcuerdoComercialLocal = x.CodigoAcuerdoComercialLocal,
                            CodigoSucursal = x.CodigoSucursal,
                            Nombre = x.Nombre
                        };
                        datos.ListaAcuerdoComercialLocalSucursal.Add(sucursal);

                        LstMatchCodigoSucursales.Add(x.CodigoSucursal);
                    }
                    LstConfLineaSucursal.ForEach(s =>
                    {
                        LstMatchCodigoSucursales.Add(s.Codigo);
                    });

                    var ListaSucursal = LstMatchCodigoSucursales.Distinct().ToList();
                    foreach (var item in ListaSucursal)
                    {
                        var obj = UnvSucursales.Where(x => x.Codigo == item).ToList();
                        if (obj.Count > 0)
                        {
                            datos.ListMatchSucursal.Add(obj[0]);
                        }
                    }

                    #endregion

                    #region Terminal Portuario

                    //datos.ListaAcuerdoComercialLocalSucursalTerminal = response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursalTerminal;

                    List<ListaTerminalPortuarioDTO> LstTerminalPortuario = new List<ListaTerminalPortuarioDTO>();
                    List<string> LstMatchCodigoTerminalPortuario = new List<string>();

                    var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();
                    var UnvTerminalPorturario = (from item in responseListarTerminalPortuario.TerminalPortuarioList
                                                 select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item))
                        .ToList();


                    datos.ListaAcuerdoComercialLocalSucursalTerminal.ForEach(x =>
                    {
                        var LstConfTerminalPortuario = new MaestrosAgente().ListarTerminalPortuarioByLineaSucursal(datos.CodigoLinea, x.CodigoSucursal).TerminalPortuarioList;
                        if (LstConfTerminalPortuario.Count > 0)
                        {
                            LstTerminalPortuario.AddRange(LstConfTerminalPortuario);
                        }
                    });

                    LstTerminalPortuario.ForEach(x =>
                    {
                        LstMatchCodigoTerminalPortuario.Add(x.CodigoAlmacen);
                    });

                    foreach (var x in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalSucursalTerminal)
                    {
                        var terminal = new AcuerdoComercialLocalSucursalTerminalDTO
                        {
                            CodigoAcuerdoComercialLocal = x.CodigoAcuerdoComercialLocal,
                            CodigoSucursal = x.CodigoSucursal,
                            CodigoTerminalPortuario = x.CodigoTerminalPortuario,
                            NombreAlmacen = x.NombreAlmacen,
                            NombreSucursal = x.NombreSucursal
                        };
                        datos.ListaAcuerdoComercialLocalSucursalTerminal.Add(terminal);

                        LstMatchCodigoTerminalPortuario.Add(x.CodigoTerminalPortuario);
                    }

                    var ListaTerminalPortuario = LstMatchCodigoTerminalPortuario.Distinct().ToList();
                    foreach (var item in ListaTerminalPortuario)
                    {
                        var obj = UnvTerminalPorturario.Where(x => x.CodigoAlmacen == item).ToList();
                        if (obj.Count > 0)
                        {
                            datos.ListMatchTerminalPorturario.Add(obj[0]);
                        }
                    }
                    #endregion

                    var count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalRA)
                    {
                        item.IdRate = count;
                        datos.ListaAcuerdoComercialLocalRA.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalPuerto)
                    {
                        item.IdAcuerdoPuerto = count;
                        datos.ListaAcuerdoComercialLocalPuerto.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalClienteBLMaster)
                    {
                        item.IdClienteBLMaster = count;
                        datos.ListaAcuerdoComercialLocalClienteBLMaster.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalAgenteBLMaster)
                    {
                        item.IdAgenteBLMaster = count;
                        datos.ListaAcuerdoComercialLocalAgenteBLMaster.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalClienteBLHouse)
                    {
                        item.IdClienteBLHome = count;
                        datos.ListaAcuerdoComercialLocalClienteBLHouse.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalAgenteBLHouse)
                    {
                        item.IdAgenteBLHome = count;
                        datos.ListaAcuerdoComercialLocalAgenteBLHouse.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalServicioNave)
                    {
                        item.IdServicioNave = count;
                        datos.ListaAcuerdoComercialLocalServicioNave.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalServicioBL)
                    {
                        item.IdServicioBL = count;
                        datos.ListaAcuerdoComercialLocalServicioBL.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTipoContenedor)
                    {
                        item.IdTipoContenedor = count;
                        datos.ListaAcuerdoComercialLocalTipoContenedor.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalCarga)
                    {
                        item.IdCarga = count;
                        datos.ListaAcuerdoComercialLocalCarga.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTarifa)
                    {
                        item.IdConfiguracionTarifa = count;
                        if (item.CodigoTipoDescuento == "D")
                        {
                            item.MontoAcuerdo = item.MontoBase - (item.MontoBase * (item.ValorDescuento / 100));
                        }

                        if (item.CodigoTipoDescuento == "P")
                        {
                            item.MontoAcuerdo = item.ValorDescuento;
                        }
                        if (item.CodigoTipoDescuento == "E")
                        {
                            item.MontoAcuerdo = 0;
                        }
                        datos.ListaAcuerdoComercialLocalTarifa.Add(item);
                        count++;
                    }
                    count = 1;
                    foreach (var item in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTarifaLigada)
                    {
                        item.IdConfiguracionTarifaLigada = count;
                        foreach (var tarifa in datos.ListaAcuerdoComercialLocalTarifa)
                        {
                            if (tarifa.CodigoTarifaLocal == item.CodigoTarifaLocal)
                            {
                                item.IdConfiguracionTarifa = tarifa.IdConfiguracionTarifa;
                                break;
                            }
                        }
                        datos.ListaAcuerdoComercialLocalTarifaLigada.Add(item);
                        count++;
                    }

                    count = 1;
                    foreach (var x in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalMatchCode)
                    {
                        var MatchCode = new AcuerdoComercialLocalConsultaMatchCodeViewModel()
                        {
                            IdMatchCode = count,
                            CodigoAcuerdoComercialLocal = x.CodigoAcuerdoComercialLocal,
                            CodigoAcuerdoComercialLocalMatchCode = x.CodigoAcuerdoComercialLocalMatchCode,
                            CodigoMatchCode = x.MatchCode,
                            Rol = x.TipoCliente,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialLocalMatchCode.Add(MatchCode);
                        count++;
                    }

                    count = 1;
                    foreach (var x in response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalPartidaArancelaria)
                    {
                        var PartidaArancelaria = new AcuerdoComercialLocalConsultaPartidaArancelariaViewModel
                        {
                            IdPA = count,
                            CodigoAcuerdoComercialLocalPartidaArancelaria = x.CodigoAcuerdoComercialLocalPartidaArancelaria,
                            CodigoAcuerdoComercialLocal = x.CodigoAcuerdoComercialLocal,
                            CodigoPartidaArancelaria = x.CodigoPartidaArancelaria,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialLocalPartidaArancelaria.Add(PartidaArancelaria);
                        count++;
                    }

                    datos.ListaAcuerdoComercialLocalTipoCarga = response.DetalleAcuerdoComercialLocalList[0].ListaAcuerdoComercialLocalTipoCarga;

                    resp.DetalleAcuerdoComercialLocalList.Add(datos);
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return resp;
        }

        /// <summary>
        /// Registro de Tarifas Escalonado
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseRegistrarAcuerdoComercialEscalonado RegistroAcuerdoComercialEscolonado(RequestRegistrarAcuerdoComercialEscalonadoViewModel request)
        {
            var responseRegistroTarifa = new ResponseRegistrarAcuerdoComercialEscalonado();
            try
            {
                var requestAgente = SetRequestGuardarAcuerdoComercialEscalonado(request);
                responseRegistroTarifa = new TransmisionesProxyrest().RegistroAcuerdoComercialEscalonado(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroTarifa;
        }

        /// <summary>
        /// Formateo de datos
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private ActualizarAcuerdoComercialEscalonadoDTO SetRequestGuardarAcuerdoComercialEscalonado(RequestRegistrarAcuerdoComercialEscalonadoViewModel request)
        {
            ActualizarAcuerdoComercialEscalonadoDTO requestAcuerdoComercialEscalonado = new ActualizarAcuerdoComercialEscalonadoDTO();
            requestAcuerdoComercialEscalonado.CodigoAcuerdoComercialEscalonado = request.CodigoAcuerdoComercialEscalonado;
            requestAcuerdoComercialEscalonado.Estado = request.Estado;
            requestAcuerdoComercialEscalonado.CodigoLinea = request.CodigoLinea;
            requestAcuerdoComercialEscalonado.CodigoUsuarioAutorizador = request.CodigoUsuarioAutorizador;
            requestAcuerdoComercialEscalonado.FechaAutorizacion = request.FechaAutorizacion;
            requestAcuerdoComercialEscalonado.CodigoTipoCriterio = request.CodigoTipoCriterio;
            requestAcuerdoComercialEscalonado.InicioVigencia = request.InicioVigencia;
            requestAcuerdoComercialEscalonado.FinVigencia = request.FinVigencia;
            requestAcuerdoComercialEscalonado.UsuarioCreacion = request.UsuarioCreacion;
            requestAcuerdoComercialEscalonado.FechaHoraCreacion = request.FechaHoraCreacion;
            requestAcuerdoComercialEscalonado.UsuarioActualizacion = request.UsuarioActualizacion;
            requestAcuerdoComercialEscalonado.FechaHoraActualizacion = request.FechaHoraActualizacion;
            requestAcuerdoComercialEscalonado.EstadoRegistro = request.EstadoRegistro;
            requestAcuerdoComercialEscalonado.Accion = request.Accion;
            requestAcuerdoComercialEscalonado.CodigoCondicion = request.CodigoTipoCondicion;
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoSucursal = new List<AcuerdoComercialEscalonadoSucursalRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoSucursalTerminal = new List<AcuerdoComercialEscalonadoSucursalTerminalRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoRA = new List<AcuerdoComercialEscalonadoRARequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoPuerto = new List<AcuerdoComercialEscalonadoPuertoRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoClienteBLMaster = new List<AcuerdoComercialEscalonadoClienteBLMasterRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoAgenteBLMaster = new List<AcuerdoComercialEscalonadoAgenteBLMasterRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoClienteBLHouse = new List<AcuerdoComercialEscalonadoClienteBLHouseRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoAgenteBLHouse = new List<AcuerdoComercialEscalonadoAgenteBLHouseRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoServicioNave = new List<AcuerdoComercialEscalonadoServicioNaveRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoServicioBL = new List<AcuerdoComercialEscalonadoServicioBLRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoCarga = new List<AcuerdoComercialEscalonadoCargaRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoTarifa = new List<AcuerdoComercialEscalonadoTarifaRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoTarifaPeriodo = new List<AcuerdoComercialEscalonadoTarifaPeriodoRequestDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoTarifaLigada = new List<AcuerdoComercialEscalonadoTarifaLigadaRequestDTO>();

            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoMatchCode = new List<AcuerdoComercialEscalonadoMatchCodeDTO>();
            requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoPartidaArancelaria = new List<AcuerdoComercialEscalonadoPartidaArancelariaDTO>();

            foreach (var item in request.ListaAcuerdoComercialEscalonadoSucursal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoSucursalRequestDTO acuerdoComercialSucursal = new AcuerdoComercialEscalonadoSucursalRequestDTO();
                    acuerdoComercialSucursal.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialSucursal.CodigoSucursal = item.CodigoSucursal;
                    acuerdoComercialSucursal.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoSucursal.Add(acuerdoComercialSucursal);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoSucursalTerminal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoSucursalTerminalRequestDTO acuerdoComercialTerminal = new AcuerdoComercialEscalonadoSucursalTerminalRequestDTO();
                    acuerdoComercialTerminal.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialTerminal.CodigoSucursal = item.CodigoSucursal;
                    acuerdoComercialTerminal.CodigoTerminalPortuario = item.CodigoTerminalPortuario;
                    acuerdoComercialTerminal.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoSucursalTerminal.Add(acuerdoComercialTerminal);
                }
            }
            foreach (var item in request.ListaAcuerdoComercialEscalonadoRA)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoRARequestDTO acuerdoComercialEscalonadoRA = new AcuerdoComercialEscalonadoRARequestDTO();
                    acuerdoComercialEscalonadoRA.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialEscalonadoRA.CodigoRA = item.CodigoRA;
                    acuerdoComercialEscalonadoRA.Accion = item.Accion;
                    acuerdoComercialEscalonadoRA.LocString = string.IsNullOrWhiteSpace(item.LocString) ? "" : item.LocString;
                    acuerdoComercialEscalonadoRA.ServiceID = string.IsNullOrWhiteSpace(item.ServiceID) ? "" : item.ServiceID;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoRA.Add(acuerdoComercialEscalonadoRA);
                }
            }
            foreach (var item in request.ListaAcuerdoComercialEscalonadoPuerto)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoPuertoRequestDTO acuerdoComercialEscalonadoPuerto = new AcuerdoComercialEscalonadoPuertoRequestDTO();
                    acuerdoComercialEscalonadoPuerto.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialEscalonadoPuerto.CodigoPuerto = item.CodigoPuerto;
                    acuerdoComercialEscalonadoPuerto.CodigoTipoPuerto = item.CodigoTipoPuerto;
                    acuerdoComercialEscalonadoPuerto.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoPuerto.Add(acuerdoComercialEscalonadoPuerto);
                }
            }
            foreach (var item in request.ListaAcuerdoComercialEscalonadoClienteBLMaster)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoClienteBLMasterRequestDTO acuerdoComercialClienteBLMaster = new AcuerdoComercialEscalonadoClienteBLMasterRequestDTO();
                    acuerdoComercialClienteBLMaster.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialClienteBLMaster.CodigoDocumentoCliente = item.CodigoDocumentoCliente;
                    acuerdoComercialClienteBLMaster.CodigoCliente = item.CodigoCliente;
                    acuerdoComercialClienteBLMaster.CodigoRol = item.CodigoRol;
                    acuerdoComercialClienteBLMaster.Accion = item.Accion;
                    acuerdoComercialClienteBLMaster.NombreInterlocutor = item.NombreInterlocutor;
                    acuerdoComercialClienteBLMaster.Rol = item.Rol;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoClienteBLMaster.Add(acuerdoComercialClienteBLMaster);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoAgenteBLMaster)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoAgenteBLMasterRequestDTO acuerdoComercialAgenteBLMaster = new AcuerdoComercialEscalonadoAgenteBLMasterRequestDTO();
                    acuerdoComercialAgenteBLMaster.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialAgenteBLMaster.CodigoDocumentoAgente = item.CodigoDocumentoAgente;
                    acuerdoComercialAgenteBLMaster.CodigoRol = item.CodigoRol;
                    acuerdoComercialAgenteBLMaster.CodigoAgente = item.CodigoAgente;
                    acuerdoComercialAgenteBLMaster.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoAgenteBLMaster.Add(acuerdoComercialAgenteBLMaster);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoClienteBLHouse)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoClienteBLHouseRequestDTO acuerdoComercialClienteBLHouse = new AcuerdoComercialEscalonadoClienteBLHouseRequestDTO();
                    acuerdoComercialClienteBLHouse.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialClienteBLHouse.CodigoDocumentoCliente = item.CodigoDocumentoCliente;
                    acuerdoComercialClienteBLHouse.CodigoRol = item.CodigoRol;
                    acuerdoComercialClienteBLHouse.CodigoCliente = item.CodigoCliente;
                    acuerdoComercialClienteBLHouse.Accion = item.Accion;
                    acuerdoComercialClienteBLHouse.NombreInterlocutor = item.NombreInterlocutor;
                    acuerdoComercialClienteBLHouse.Rol = item.Rol;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoClienteBLHouse.Add(acuerdoComercialClienteBLHouse);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoAgenteBLHouse)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoAgenteBLHouseRequestDTO acuerdoComercialAgenteBLHouse = new AcuerdoComercialEscalonadoAgenteBLHouseRequestDTO();
                    acuerdoComercialAgenteBLHouse.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialAgenteBLHouse.CodigoDocumentoAgente = item.CodigoDocumentoAgente;
                    acuerdoComercialAgenteBLHouse.CodigoRol = item.CodigoRol;
                    acuerdoComercialAgenteBLHouse.CodigoAgente = item.CodigoAgente;
                    acuerdoComercialAgenteBLHouse.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoAgenteBLHouse.Add(acuerdoComercialAgenteBLHouse);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoServicioNave)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoServicioNaveRequestDTO acuerdoComercialServicioNave = new AcuerdoComercialEscalonadoServicioNaveRequestDTO();
                    acuerdoComercialServicioNave.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialServicioNave.CodigoServicio = item.CodigoServicio;
                    acuerdoComercialServicioNave.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoServicioNave.Add(acuerdoComercialServicioNave);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoServicioBL)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoServicioBLRequestDTO acuerdoComercialServicioBL = new AcuerdoComercialEscalonadoServicioBLRequestDTO();
                    acuerdoComercialServicioBL.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialServicioBL.CodigoServicio = item.CodigoServicio;
                    acuerdoComercialServicioBL.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoServicioBL.Add(acuerdoComercialServicioBL);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoCarga)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoCargaRequestDTO acuerdoComercialCarga = new AcuerdoComercialEscalonadoCargaRequestDTO();
                    acuerdoComercialCarga.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialCarga.CodigoNave = item.CodigoNave;
                    acuerdoComercialCarga.NumeroViaje = item.NumeroViaje;
                    acuerdoComercialCarga.PuertoOrigen = item.PuertoOrigen;
                    acuerdoComercialCarga.PuertoEmbarque = item.PuertoEmbarque;
                    acuerdoComercialCarga.PuertoDestino = item.PuertoDestino;
                    acuerdoComercialCarga.DestinoFinal = item.DestinoFinal;
                    acuerdoComercialCarga.CodigoLinea = item.CodigoLinea;
                    acuerdoComercialCarga.NumeroBL = item.NumeroBL;
                    acuerdoComercialCarga.CodigoContenedor = item.CodigoContenedor;
                    acuerdoComercialCarga.TipoBL = item.TipoBL;
                    acuerdoComercialCarga.TipoDocumento = item.TipoDocumento;
                    acuerdoComercialCarga.NroBkn = item.NroBkn;
                    acuerdoComercialCarga.Accion = item.Accion;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoCarga.Add(acuerdoComercialCarga);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoTarifa)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoTarifaRequestDTO acuerdoComercialTarifa = new AcuerdoComercialEscalonadoTarifaRequestDTO();
                    acuerdoComercialTarifa.Accion = item.Accion;
                    acuerdoComercialTarifa.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialTarifa.CodigoMonedaAcuerdo = item.CodigoMonedaAcuerdo;
                    acuerdoComercialTarifa.CodigoTarifaEscalonado = item.CodigoTarifaEscalonado;
                    acuerdoComercialTarifa.CodigoTipoDescuento = item.CodigoTipoDescuento;
                    acuerdoComercialTarifa.CodigoTipoDiaCalculo = item.CodigoTipoDiaCalculo;
                    acuerdoComercialTarifa.CodigoTipoFechaCalculo = item.CodigoTipoFechaCalculo;
                    acuerdoComercialTarifa.DiasDelayCalculo = item.DiasDelayCalculo;
                    acuerdoComercialTarifa.MontoAcuerdo = item.MontoAcuerdo;
                    acuerdoComercialTarifa.CodigoTipoCobro = item.CodigoTipoCobro;
                    acuerdoComercialTarifa.FlagNuevoCalculo = item.FlagNuevoCalculo;

                    acuerdoComercialTarifa.DescripcionTarifa = item.DescripcionTarifa;
                    acuerdoComercialTarifa.UnidadCalculo = item.UnidadCalculo;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoTarifa.Add(acuerdoComercialTarifa);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoTarifaPeriodo)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoTarifaPeriodoRequestDTO acuerdoComercialPeriodo = new AcuerdoComercialEscalonadoTarifaPeriodoRequestDTO();
                    acuerdoComercialPeriodo.Accion = item.Accion;
                    acuerdoComercialPeriodo.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialPeriodo.CodigoMoneda = item.CodigoMoneda;
                    acuerdoComercialPeriodo.CodigoPeriodo = item.CodigoPeriodo;
                    acuerdoComercialPeriodo.CodigoTarifaEscalonada = item.CodigoTarifaEscalonado;
                    acuerdoComercialPeriodo.CodigoTipoContenedor = item.CodigoTipoContenedor;
                    acuerdoComercialPeriodo.NumeroDias = item.NumeroDias;
                    acuerdoComercialPeriodo.Precio = item.Precio;
                    //acuerdoComercialPeriodo.Moneda = item.Moneda;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoTarifaPeriodo.Add(acuerdoComercialPeriodo);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoTarifaLigada)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoTarifaLigadaRequestDTO acuerdoComercialLigada = new AcuerdoComercialEscalonadoTarifaLigadaRequestDTO();
                    acuerdoComercialLigada.Accion = item.Accion;
                    acuerdoComercialLigada.CodigoAcuerdoComercialEscalonada = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialLigada.CodigoConfiguracionTarifaLigada = item.CodigoConfiguracionTarifaLigada;
                    acuerdoComercialLigada.CodigoMoneda = item.CodigoMoneda;
                    acuerdoComercialLigada.CodigoTarifaEscalonada = item.CodigoTarifaEscalonado;
                    acuerdoComercialLigada.CodigoTarifaLigadaLocal = item.CodigoTarifaLigadaEscalonado;
                    acuerdoComercialLigada.Monto = item.Monto ?? 0;
                    acuerdoComercialLigada.Porcentaje = item.Porcentaje;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoTarifaLigada.Add(acuerdoComercialLigada);
                }
            }

            //new MaestrosAgente().ObtenerParametroNegocio(codigoConcepto).Valor;


            foreach (var item in request.ListaAcuerdoComercialEscalonadoMatchCode)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoMatchCodeDTO acuerdoComercialMatchCode = new AcuerdoComercialEscalonadoMatchCodeDTO();
                    acuerdoComercialMatchCode.Accion = item.Accion;
                    acuerdoComercialMatchCode.CodigoAcuerdoComercialEscalonadoMatchCode = item.CodigoAcuerdoComercialEscalonadoMatchCode;
                    acuerdoComercialMatchCode.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialMatchCode.MatchCode = item.CodigoMatchCode;
                    acuerdoComercialMatchCode.TipoCliente = item.Rol;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoMatchCode.Add(acuerdoComercialMatchCode);
                }
            }

            foreach (var item in request.ListaAcuerdoComercialEscalonadoPartidaArancelaria)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    AcuerdoComercialEscalonadoPartidaArancelariaDTO acuerdoComercialPartidaArancelaria = new AcuerdoComercialEscalonadoPartidaArancelariaDTO();
                    acuerdoComercialPartidaArancelaria.Accion = item.Accion;
                    acuerdoComercialPartidaArancelaria.CodigoAcuerdoComercialEscalonadoPartidaArancelaria = item.CodigoAcuerdoComercialEscalonadoPartidaArancelaria;
                    acuerdoComercialPartidaArancelaria.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    acuerdoComercialPartidaArancelaria.CodigoPartidaArancelaria = item.CodigoPartidaArancelaria;
                    requestAcuerdoComercialEscalonado.ListaAcuerdoComercialEscalonadoPartidaArancelaria.Add(acuerdoComercialPartidaArancelaria);
                }
            }

            return requestAcuerdoComercialEscalonado;
        }

        /// <summary>
        /// Consultar detalle de AC Escalonado
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseConsultarDetalleAcuerdoComercialEscalonadoViewModel ConsultarDetalleAcuerdoComercialEscalonado(RequestConsultaDetalleAcuerdoComercialEscalonadoViewModel request)
        {
            var resp = new ResponseConsultarDetalleAcuerdoComercialEscalonadoViewModel();
            try
            {
                var requestConsulta = new RequestConsultaDetalleAcuerdoComercialEscalonado
                {
                    CodigoAcuerdoComercialEscalonado = request.filtro.CodigoAcuerdoComercialEscalonado
                };
                var response = new TransmisionesProxyrest().ConsultarDetalleAcuerdoComercialEscalonado(requestConsulta);
                resp.Result = response.Result;
                if (response.DetalleAcuerdoComercialEscalonadoList.Count > 0)
                {
                    var datos = new DetalleAcuerdoComercialEscalonadoViewModel();
                    datos.Estado = response.DetalleAcuerdoComercialEscalonadoList[0].Estado;
                    datos.CodigoLinea = response.DetalleAcuerdoComercialEscalonadoList[0].CodigoLinea;
                    datos.CodigoUsuarioAutorizador = response.DetalleAcuerdoComercialEscalonadoList[0].CodigoUsuarioAutorizador;
                    datos.Autorizado = response.DetalleAcuerdoComercialEscalonadoList[0].Autorizado;
                    datos.FechaAutorizacion = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialEscalonadoList[0].FechaAutorizacion);
                    datos.CodigoTipoCriterio = response.DetalleAcuerdoComercialEscalonadoList[0].CodigoTipoCriterio;
                    datos.InicioVigencia = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialEscalonadoList[0].InicioVigencia);
                    datos.FinVigencia = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialEscalonadoList[0].FinVigencia);
                    datos.UsuarioCreacion = response.DetalleAcuerdoComercialEscalonadoList[0].UsuarioCreacion;
                    datos.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialEscalonadoList[0].FechaHoraCreacion);
                    datos.UsuarioActualizacion = response.DetalleAcuerdoComercialEscalonadoList[0].UsuarioActualizacion;
                    datos.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy}", response.DetalleAcuerdoComercialEscalonadoList[0].FechaHoraActualizacion);
                    datos.DescripcionEstadoRegistro = response.DetalleAcuerdoComercialEscalonadoList[0].DescripcionEstadoRegistro;
                    datos.EstadoRegistro = response.DetalleAcuerdoComercialEscalonadoList[0].EstadoRegistro;
                    datos.Accion = "U";
                    datos.CodigoTipoCondicion = response.DetalleAcuerdoComercialEscalonadoList[0].CodigoCondicion;
                    datos.CodigoAcuerdoComercialEscalonado = response.DetalleAcuerdoComercialEscalonadoList[0].CodigoAcuerdoComercialEscalonado;

                    #region Sucursales

                    List<string> LstMatchCodigoSucursales = new List<string>();
                    var LstConfLineaSucursal = new MaestrosAgente().ListarSucursalByLinea(datos.CodigoLinea).SucursalesList;
                    var responseListarSucursal = new MaestrosAgente().ListarSucursal();
                    var UnvSucursales = (from item in responseListarSucursal.SucursalesList
                                         select HelperCtrl.MiMapper<ListaSucursalDTO, ListaSucursalViewModel>(item)).ToList();


                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursal)
                    {
                        var sucursal = new AcuerdoComercialEscalonadoSucursalViewModel
                        {
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoSucursal = x.CodigoSucursal,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoSucursal.Add(sucursal);

                        LstMatchCodigoSucursales.Add(x.CodigoSucursal);
                    }
                    LstConfLineaSucursal.ForEach(s =>
                    {
                        LstMatchCodigoSucursales.Add(s.Codigo);
                    });

                    var ListaSucursal = LstMatchCodigoSucursales.Distinct().ToList();
                    foreach (var item in ListaSucursal)
                    {
                        var obj = UnvSucursales.Where(x => x.Codigo == item).ToList();
                        if (obj.Count > 0)
                        {
                            datos.ListMatchSucursal.Add(obj[0]);
                        }
                    }

                    #endregion

                    #region Terminal Portuario

                    List<ListaTerminalPortuarioDTO> LstTerminalPortuario = new List<ListaTerminalPortuarioDTO>();
                    List<string> LstMatchCodigoTerminalPortuario = new List<string>();

                    var responseListarTerminalPortuario = new MaestrosAgente().ListarTerminalPortuario();
                    var UnvTerminalPorturario = (from item in responseListarTerminalPortuario.TerminalPortuarioList
                                                 select HelperCtrl.MiMapper<ListaTerminalPortuarioDTO, ListaTerminalPortuarioViewModel>(item))
                        .ToList();


                    datos.ListaAcuerdoComercialEscalonadoSucursal.ForEach(x =>
                    {
                        var LstConfTerminalPortuario = new MaestrosAgente().ListarTerminalPortuarioByLineaSucursal(datos.CodigoLinea, x.CodigoSucursal).TerminalPortuarioList;
                        if (LstConfTerminalPortuario.Count > 0)
                        {
                            LstTerminalPortuario.AddRange(LstConfTerminalPortuario);
                        }
                    });

                    LstTerminalPortuario.ForEach(x =>
                    {
                        LstMatchCodigoTerminalPortuario.Add(x.CodigoAlmacen);
                    });

                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoSucursalTerminal)
                    {
                        var terminal = new AcuerdoComercialEscalonadoSucursalTerminalViewModel
                        {
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoSucursal = x.CodigoSucursal,
                            CodigoTerminalPortuario = x.CodigoTerminalPortuario,
                            NombreAlmacen = x.NombreAlmacen,
                            NombreSucursal = x.NombreSucursal,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoSucursalTerminal.Add(terminal);

                        LstMatchCodigoTerminalPortuario.Add(x.CodigoTerminalPortuario);
                    }

                    var ListaTerminalPortuario = LstMatchCodigoTerminalPortuario.Distinct().ToList();
                    foreach (var item in ListaTerminalPortuario)
                    {
                        var obj = UnvTerminalPorturario.Where(x => x.CodigoAlmacen == item).ToList();
                        if (obj.Count > 0)
                        {
                            datos.ListMatchTerminalPorturario.Add(obj[0]);
                        }
                    }
                    #endregion

                    var c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoRA)
                    {

                        var rate = new AcuerdoComercialEscalonadoRAViewModel
                        {
                            IdRate = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoRA = x.CodigoRA,
                            Accion = x.Accion,
                            LocString = x.LocString,
                            ServiceID = x.ServiceID
                        };
                        datos.ListaAcuerdoComercialEscalonadoRA.Add(rate);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPuerto)
                    {
                        var puerto = new AcuerdoComercialEscalonadoPuertoViewModel()
                        {
                            IdAcuerdoPuerto = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoPuerto = x.CodigoPuerto,
                            CodigoTipoPuerto = x.CodigoTipoPuerto,
                            NombrePuerto = x.NombrePuerto,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoPuerto.Add(puerto);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoClienteBLMaster)
                    {
                        var cliente = new AcuerdoComercialEscalonadolClienteBLMasterViewModel()
                        {
                            IdClienteBLMaster = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoCliente = x.CodigoCliente,
                            CodigoDocumentoCliente = x.CodigoDocumentoCliente,
                            CodigoRol = x.CodigoRol,
                            NombreInterlocutor = x.NombreInterlocutor,
                            Rol = x.Rol,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoClienteBLMaster.Add(cliente);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoAgenteBLMaster)
                    {
                        var cliente = new AcuerdoComercialEscalonadoAgenteBLMasterViewModel()
                        {
                            IdAgenteBLMaster = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoAgente = x.CodigoAgente,
                            CodigoDocumentoAgente = x.CodigoDocumentoAgente,
                            CodigoRol = x.CodigoRol,
                            NombreInterlocutor = x.NombreInterlocutor,
                            Rol = x.Rol,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoAgenteBLMaster.Add(cliente);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoClienteBLHouse)
                    {
                        var cliente = new AcuerdoComercialEscalonadoClienteBLHouseViewModel()
                        {
                            IdClienteBLHome = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoCliente = x.CodigoCliente,
                            CodigoDocumentoCliente = x.CodigoDocumentoCliente,
                            CodigoRol = x.CodigoRol,
                            NombreInterlocutor = x.NombreInterlocutor,
                            Rol = x.Rol,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoClienteBLHouse.Add(cliente);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoAgenteBLHouse)
                    {
                        var cliente = new AcuerdoComercialEscalonadoAgenteBLHouseRequestViewModel()
                        {
                            IdAgenteBLHome = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoAgente = x.CodigoAgente,
                            CodigoDocumentoAgente = x.CodigoDocumentoAgente,
                            CodigoRol = x.CodigoRol,
                            NombreInterlocutor = x.NombreInterlocutor,
                            Rol = x.Rol,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoAgenteBLHouse.Add(cliente);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoServicioNave)
                    {
                        var cliente = new AcuerdoComercialEscalonadoServicioNaveViewMode()
                        {
                            IdServicioNave = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoServicio = x.CodigoServicio,
                            NombreServicio = x.NombreServicio,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoServicioNave.Add(cliente);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoServicioBL)
                    {
                        var cliente = new AcuerdoComercialEscalonadoServicioBLViewModel()
                        {
                            IdServicioBL = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoServicio = x.CodigoServicio,
                            NombreServicio = x.NombreServicio,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoServicioBL.Add(cliente);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoCarga)
                    {
                        var carga = new AcuerdoComercialEscalonadoCargaViewModel()
                        {
                            IdCarga = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoNave = x.CodigoNave,
                            NumeroViaje = x.NumeroViaje,
                            PuertoOrigen = x.PuertoOrigen,
                            PuertoEmbarque = x.PuertoEmbarque,
                            PuertoDestino = x.PuertoDestino,
                            DestinoFinal = x.DestinoFinal,
                            CodigoLinea = x.CodigoLinea,
                            NumeroBL = x.NumeroBL,
                            CodigoContenedor = x.CodigoContenedor,
                            TipoBL = x.TipoBL,
                            TipoDocumento = x.TipoDocumento,
                            NroBkn = x.NroBkn,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoCarga.Add(carga);
                        c++;
                    }

                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifa)
                    {
                        var tarifa = new AcuerdoComercialEscalonadoTarifaViewModel()
                        {
                            IdTarifa = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoTarifaEscalonado = x.CodigoTarifaEscalonado,
                            DescripcionTarifa = x.DescripcionTarifa,
                            CodigoTipoDescuento = x.CodigoTipoDescuento,
                            CodigoMonedaAcuerdo = x.CodigoMonedaAcuerdo,
                            MontoAcuerdo = x.MontoAcuerdo,
                            CodigoTipoFechaCalculo = x.CodigoTipoFechaCalculo,
                            DiasDelayCalculo = x.DiasDelayCalculo,
                            CodigoTipoDiaCalculo = x.CodigoTipoDiaCalculo,
                            CodigoUnidadCalculo = x.CodigoUnidadCalculo,
                            UnidadCalculo = x.UnidadCalculo,
                            CodigoTipoCobro = x.CodigoTipoCobro,
                            FlagNuevoCalculo = x.FlagNuevoCalculo,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoTarifa.Add(tarifa);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifaPeriodo)
                    {
                        var tarifa = new AcuerdoComercialEscalonadoTarifaPeriodoViewModel()
                        {
                            IdPeriodo = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoMoneda = x.Moneda,
                            CodigoPeriodo = x.CodigoPeriodo,
                            CodigoTarifaEscalonado = x.CodigoTarifaEscalonado,
                            CodigoTipoContenedor = x.CodigoTipoContenedor,
                            NumeroDias = x.NumeroDias,
                            Precio = x.Precio,
                            Moneda = x.DescripcionMoneda,
                            CodigoClaseContenedor = x.CodigoClaseContenedor,
                            ClaseContenedor = x.ClaseContenedor,
                            Accion = "U"
                        };
                        datos.ListaAcuerdoComercialEscalonadoTarifaPeriodo.Add(tarifa);
                        c++;
                    }
                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoTarifaLigada)
                    {
                        var tarifa = new AcuerdoComercialEscalonadoTarifaLigadaViewModel()
                        {
                            IdConfiguracionTarifaLigada = c,
                            CodigoTarifa = x.CodigoTarifa,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonada,
                            CodigoTarifaLigadaEscalonado = x.CodigoTarifaLigadaLocal,
                            CodigoTarifaEscalonado = x.CodigoTarifaEscalonada,
                            DescripcionTarifaEscalonada = x.DescripcionTarifaEscalonado,
                            DescripcionConfiguracionTarifaLigada = x.DescripcionConfiguracionTarifaLigada,
                            Porcentaje = x.Porcentaje,
                            Moneda = x.Moneda,
                            Monto = x.Monto == 0 ? null : x.Monto,
                            CodigoMoneda = x.CodigoMoneda,
                            CodigoConfiguracionTarifaLigada = x.CodigoConfiguracionTarifaLigada,
                            MonedaTarifaEscalonada = x.MonedaTarifaEscalonada,
                            MontoTarifaEscalonada = x.MontoTarifaEscalonada,
                            CodigoMonedaTarifaLigada = x.CodigoMonedaTarifaLigada,
                            DescripcionMonedaBase = x.MonedaTarifaEscalonada,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoTarifaLigada.Add(tarifa);
                        c++;
                    }

                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoMatchCode)
                    {
                        var MatchCode = new AcuerdoComercialEscalonadoConsultaMatchCodeViewModel()
                        {
                            IdMatchCode = c,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoAcuerdoComercialEscalonadoMatchCode = x.CodigoAcuerdoComercialEscalonadoMatchCode,
                            CodigoMatchCode = x.MatchCode,
                            Rol = x.TipoCliente,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoMatchCode.Add(MatchCode);
                        c++;
                    }

                    c = 1;
                    foreach (var x in response.DetalleAcuerdoComercialEscalonadoList[0].ListaAcuerdoComercialEscalonadoPartidaArancelaria)
                    {
                        var PartidaArancelaria = new AcuerdoComercialEscalonadoConsultaPartidaArancelariaViewModel
                        {
                            IdPA = c,
                            CodigoAcuerdoComercialEscalonadoPartidaArancelaria = x.CodigoAcuerdoComercialEscalonadoPartidaArancelaria,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoPartidaArancelaria = x.CodigoPartidaArancelaria,
                            Accion = x.Accion
                        };
                        datos.ListaAcuerdoComercialEscalonadoPartidaArancelaria.Add(PartidaArancelaria);
                        c++;
                    }
                    resp.DetalleAcuerdoComercialEscalonadoList.Add(datos);
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return resp;
        }

        /// <summary>
        /// Consultar historial AC Escalonado
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseConsultarAcuerdoComercialEscalonadoHistorialViewModel ConsultarHistorialACEscalonado(RequestHistorialACEscalonadoViewModel request)
        {
            var responseHistorial = new ResponseConsultarAcuerdoComercialEscalonadoHistorialViewModel();
            try
            {
                var requestAgente = new RequestConsultaHistorialACEscalonado
                {
                    CodigoAcuerdoComercialEscalonado = request.filtro.CodigoAcuerdoComercialEscalonado,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var responseEscalonado = new TransmisionesProxyrest().ConsultarHistorialACEscalonado(requestAgente);
                responseHistorial.CantidadPaginas = responseEscalonado.CantidadPaginas;
                responseHistorial.NroPagina = responseEscalonado.NroPagina;
                responseHistorial.Result = responseEscalonado.Result;
                responseHistorial.TotalRegistros = responseEscalonado.TotalRegistros;

                foreach (var item in responseEscalonado.AcuerdoComercialEscalonadoHistorialList)
                {
                    var objResponse = new AcuerdoComercialEscalonadoHistorialViewModel();
                    objResponse.CodigoAcuerdoComercialEscalonadoHistorial = item.CodigoAcuerdoComercialEscalonadoHistorial;
                    objResponse.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                    objResponse.Usuario = item.Usuario;
                    objResponse.FechaHora = String.Format("{0:MM/dd/yyyy hh:mm}", item.FechaHora);
                    objResponse.Accion = item.Accion;
                    objResponse.Descripcion = item.Descripcion;
                    responseHistorial.AcuerdoComercialEscalonadoHistorialList.Add(objResponse);
                }
            }
            catch (Exception ex)
            {
                responseHistorial.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseHistorial;
        }

        /// <summary>
        /// Carga masiva de  ACE
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseCargaMasiva CargaMasiva(RequestCargaMasivaViewModel request)
        {
            var response = new ResponseCargaMasiva();
            try
            {
                var requestAgente = SetRequestCargaMasiva(request);
                response = new TransmisionesProxyrest().CargaMasiva(requestAgente);
            }
            catch (Exception ex)
            {
                response.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return response;
        }

        /// <summary>
        /// Dar formato al request del servicio
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private IngresoMasivoRAPTDTO SetRequestCargaMasiva(RequestCargaMasivaViewModel request)
        {
            IngresoMasivoRAPTDTO requestCargaMasiva = new IngresoMasivoRAPTDTO();
            //requestCargaMasiva.ObjetoTrazabilidad = new ObjetoTrazabilidad();
            requestCargaMasiva.UsuarioSeguridadDTO = new UsuarioSeguridadDTO();
            requestCargaMasiva.UsuarioSeguridadDTO.codigoUsuario = request.Usuario.CodigoUsuario;
            requestCargaMasiva.UsuarioSeguridadDTO.aliasUsuario = request.Usuario.AliasUsuario;
            requestCargaMasiva.UsuarioSeguridadDTO.CuentaUsuarioRed = request.Usuario.CuentaUsuarioRed;
            requestCargaMasiva.UsuarioSeguridadDTO.nombreUsuario = request.Usuario.NombreUsuario;
            requestCargaMasiva.CodigoLinea = request.CodigoLinea;
            requestCargaMasiva.RAPTDTOList = new List<RAPTItemDTO>();
            foreach (var item in request.ListaAcuerdoComercial)
            {
                RAPTItemDTO oCargaMasiva = new RAPTItemDTO();
                oCargaMasiva.CuName = item.CuName + item.CuSupp;
                oCargaMasiva.ContractNo = item.ContractNo;
                oCargaMasiva.ServiceID = item.ServiceID;
                oCargaMasiva.LocString = item.LocString;
                oCargaMasiva.RateGroupName = item.RateGroupName;
                oCargaMasiva.ChargeType = item.ChargeType;
                oCargaMasiva.TpR = item.TpR;
                oCargaMasiva.TpD = item.TpD;
                oCargaMasiva.TpB = item.TpB;
                oCargaMasiva.TpL = item.TpL;
                oCargaMasiva.TpT = Convert.ToInt32(item.TpT);
                oCargaMasiva.TariffTpR = Convert.ToDecimal(item.TariffTpR);
                oCargaMasiva.TariffTpD = Convert.ToDecimal(item.TariffTpD);
                oCargaMasiva.TariffTpB = Convert.ToDecimal(item.TariffTpB);
                oCargaMasiva.TariffTpL = item.TariffTpL;
                oCargaMasiva.TariffTpT = Convert.ToDecimal(item.TariffTpT);
                oCargaMasiva.RateAmount = Convert.ToDecimal(item.RateAmount);
                oCargaMasiva.Curr = item.Curr;
                oCargaMasiva.RateValidTO = item.RateValidTO;
                oCargaMasiva.UpdUserID = item.UpdUserID;
                oCargaMasiva.SrValid = item.SrValid;
                oCargaMasiva.DateOfIssue = item.DateOfIssue;
                oCargaMasiva.RateChanged = item.RateChanged;
                //oCargaMasiva.CuSupp = item.CuSupp;

                //Nuevos Campos -----------
                oCargaMasiva.RateValidFROM = item.RateValidFROM;
                oCargaMasiva.Account = item.Account;
                oCargaMasiva.Type = item.Type;
                oCargaMasiva.CommodityGrpCode = item.CommodityGrpCode;
                oCargaMasiva.CommodityGrpNo = item.CommodityGrpNo;
                oCargaMasiva.HSChapter = item.HSChapter;
                oCargaMasiva.HSPosition = item.HSPosition;
                oCargaMasiva.HSSubPosition = item.HSSubPosition;
                oCargaMasiva.DG = item.DG;
                oCargaMasiva.ShippersOwn = item.ShippersOwn;
                oCargaMasiva.OperReefer = item.OperReefer;
                oCargaMasiva.CG1HSCode = item.CG1HSCode;
                oCargaMasiva.CG1HSDesc = item.CG1HSDesc;
                oCargaMasiva.CG2HSCode = item.CG2HSCode;
                oCargaMasiva.CG2HSDesc = item.CG2HSDesc;
                oCargaMasiva.CG3HSCode = item.CG3HSCode;
                oCargaMasiva.CG3HSDesc = item.CG3HSDesc;
                oCargaMasiva.CG4HSCode = item.CG4HSCode;
                oCargaMasiva.CG4HSDesc = item.CG4HSDesc;
                oCargaMasiva.CG5HSCode = item.CG5HSCode;
                oCargaMasiva.CG5HSDesc = item.CG5HSDesc;
                oCargaMasiva.HS1HSCode = item.HS1HSCode;
                oCargaMasiva.HS1HSDesc = item.HS1HSDesc;
                oCargaMasiva.HS2HSCode = item.HS2HSCode;
                oCargaMasiva.HS2HSDesc = item.HS2HSDesc;
                oCargaMasiva.HS3HSCode = item.HS3HSCode;
                oCargaMasiva.HS3HSDesc = item.HS3HSDesc;
                oCargaMasiva.HS4HSCode = item.HS4HSCode;
                oCargaMasiva.HS4HSDesc = item.HS4HSDesc;
                oCargaMasiva.HS5HSCode = item.HS5HSCode;
                oCargaMasiva.HS5HSDesc = item.HS5HSDesc;
                oCargaMasiva.RateID = item.RateID;
                oCargaMasiva.Remake = item.Remake;
                oCargaMasiva.Row = item.Row;
                //--------------------------------------------
                requestCargaMasiva.RAPTDTOList.Add(oCargaMasiva);
            }
            return requestCargaMasiva;
        }

        /// <summary>
        /// Reporte de AC Local
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseReporteACLocalViewModel ReporteACLocal(RequestReporteACLocalViewModel request)
        {
            var responseBusquedaACLocalViewModel = new ResponseReporteACLocalViewModel();
            try
            {
                var requestAgente = new RequestReporteACLocal
                {
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoMoneda = request.filtro.CodigoMoneda,
                    CodigoLinea = request.filtro.CodigoLinea,
                    FlagVigente = request.filtro.FlagVigente,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaACLocal = new TransmisionesProxyrest().ReporteACLocal(requestAgente);
                if (listaACLocal.ListaReporteAcuerdoComercialLocal.Count > 0)
                {
                    responseBusquedaACLocalViewModel.CantidadPaginas = listaACLocal.CantidadPaginas;
                    responseBusquedaACLocalViewModel.TotalRegistros = listaACLocal.TotalRegistros;
                    responseBusquedaACLocalViewModel.NroPagina = listaACLocal.NroPagina;
                    responseBusquedaACLocalViewModel.Result = listaACLocal.Result;
                    foreach (var item in listaACLocal.ListaReporteAcuerdoComercialLocal)
                    {
                        var objet = new ReporteAcuerdoComercialLocalViewModel();
                        objet.CodigoAgente = item.CodigoAgente;
                        objet.CodigoCliente = item.CodigoCliente;
                        objet.CodigoClienteHijo = item.CodigoClienteHijo;
                        objet.CodigoContenedor = item.CodigoContenedor;
                        objet.CodigoLinea = item.CodigoLinea;
                        objet.CodigoPuertoDestino = item.CodigoPuertoDestino;
                        objet.CodigoPuertoEmbarque = item.CodigoPuertoEmbarque;
                        objet.CodigoPuertoFinal = item.CodigoPuertoFinal;
                        objet.CodigoPuertoOrigen = item.CodigoPuertoOrigen;
                        objet.CodigoRA = item.CodigoRA;
                        objet.CodigoServicioBL = item.CodigoServicioBL;
                        objet.CodigoServicioNave = item.CodigoServicioNave;
                        objet.CodigoSucursal = item.CodigoSucursal;
                        objet.CodigoTipoContenedor = item.CodigoTipoContenedor;
                        objet.CodigoUsuarioAutorizador = item.CodigoUsuarioAutorizador;
                        objet.FechaAutorizacion = string.Format("{0:dd/MM/yyyy}", item.FechaAutorizacion);
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraCreacion);
                        objet.FinVigencia = string.Format("{0:dd/MM/yyyy}", item.FinVigencia);
                        objet.InicioVigencia = string.Format("{0:dd/MM/yyyy}", item.InicioVigencia);
                        objet.Mercancia = item.Mercancia;
                        objet.NroBkn = item.NroBkn;
                        objet.NumeroBLHijo = item.NumeroBLHijo;
                        objet.NumeroBLMaster = item.NumeroBLMaster;
                        objet.TipoAgente = item.TipoAgente;
                        objet.TipoCliente = item.TipoCliente;
                        objet.TipoClienteHijo = item.TipoClienteHijo;
                        objet.Agente = item.Agente;
                        objet.Cliente = item.Cliente;
                        objet.ClienteHijo = item.ClienteHijo;
                        objet.Linea = item.Linea;
                        objet.PuertoDestino = item.PuertoDestino;
                        objet.PuertoEmbarque = item.PuertoEmbarque;
                        objet.PuertoFinal = item.PuertoFinal;
                        objet.PuertoOrigen = item.PuertoOrigen;
                        objet.ServicioBL = item.ServicioBL;
                        objet.ServicioNave = item.ServicioNave;
                        objet.Sucursal = item.Sucursal;
                        objet.PaisPuertoDestino = item.PaisPuertoDestino;
                        objet.PaisPuertoEmbarque = item.PaisPuertoEmbarque;
                        objet.PaisPuertoFinal = item.PaisPuertoFinal;
                        objet.PaisPuertoOrigen = item.PaisPuertoOrigen;
                        objet.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;

                        objet.CodigoConcepto = item.CodigoConcepto;
                        objet.CodigoTarifa = item.CodigoTarifa;
                        objet.DescripcionTarifa = item.DescripcionTarifa;//Tarifa
                        objet.CodigoTipoDescuento = item.CodigoTipoDescuento;
                        objet.DescripcionTipoDescuento = item.DescripcionTipoDescuento; //Tipo Concesión
                        objet.ValorDescuento = item.ValorDescuento;//Monto
                        responseBusquedaACLocalViewModel.ListaReporteAcuerdoComercialLocal.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseBusquedaACLocalViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaACLocalViewModel;
        }

        /// <summary>
        /// Reporte de Contenedor No Devuelto
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseReporteContenedorNoDevueltoViewModel ConsultarReporteContenedorNoDevuelto(RequestReporteContenedorNoDevueltoViewModel request)
        {
            var responseBusquedaContenedorNoDevueltoViewModel = new ResponseReporteContenedorNoDevueltoViewModel();
            try
            {
                var requestAgente = new RequestReporteContenedorNoDevuelto
                {
                    CodigoCliente = !string.IsNullOrWhiteSpace(request.filtro.CodigoCliente) ? request.filtro.CodigoCliente : null,
                    NroBl = !string.IsNullOrWhiteSpace(request.filtro.Nro_Bl) ? request.filtro.Nro_Bl : null,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoContenedor = !string.IsNullOrWhiteSpace(request.filtro.CodigoCotenedor) ? request.filtro.CodigoCotenedor : null,
                    Desde = request.filtro.Desde,
                    Hasta = request.filtro.Hasta
                };

                var responseContenedorNoDevuelto = new TransmisionesProxyrest().ConsultarReporteContenedorNoDevuelto(requestAgente);
                if (responseContenedorNoDevuelto.LiquidacionesNoDevueltas.Count > 0)
                {
                    responseBusquedaContenedorNoDevueltoViewModel.Result = responseContenedorNoDevuelto.Result;
                    foreach (var item in responseContenedorNoDevuelto.LiquidacionesNoDevueltas)
                    {
                        var objet = new ReporteContenedorNoDevueltoViewModel();
                        objet.CodigoAgente = item.CodigoAgente;
                        objet.CodigoContenedor = item.CodigoContenedor;
                        objet.CodigoLinea = item.CodigoLinea;
                        objet.CodigoNave = item.CodigoNave;
                        objet.Consignatario = item.Consignatario;
                        objet.DiasSob = item.DiasSobrantes;
                        objet.FechaArribo = string.Format("{0:dd/MM/yyyy}", item.FechaArribo);
                        objet.FechaIDP = string.Format("{0:dd/MM/yyyy}", item.FechaIDP);
                        objet.FechaTransaccion = string.Format("{0:dd/MM/yyyy}", item.FechaTransaccion);
                        objet.NombreNave = item.NombreNave;
                        objet.NombreSucursal = item.NombreSucursal;
                        objet.Notificante = item.Notificante;
                        objet.NumeroBL = item.NumeroBL;
                        objet.NumeroTransaccion = item.NumeroTransaccion;
                        objet.NumeroViaje = item.NumeroViaje;
                        objet.PuertoDescarga = item.PuertoDescarga;
                        objet.PuertoEmbarque = item.PuertoEmbarque;
                        objet.PuertoFinal = item.PuertoFinal;
                        objet.PuertoOrigen = item.PuertoOrigen;
                        objet.ServicioBL = item.SerivicioBL;
                        objet.TipoContenedor = item.TipoContenedor;
                        objet.UDL = string.Format("{0:dd/MM/yyyy}", item.UDL);
                        responseBusquedaContenedorNoDevueltoViewModel.LiquidacionesNoDevueltas.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseBusquedaContenedorNoDevueltoViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaContenedorNoDevueltoViewModel;
        }

        /// <summary>
        /// Tarifa  x default - solo Escalonado
        /// </summary>
        /// <param name="codigoConcepto"></param>
        /// <param name="codigoTarifa"></param>
        /// <returns></returns>
        public AcuerdoComercialEscalonadoBaseViewModel ConsultarAcuerdoComercialEscalonadoTarifaBase(string codigoConcepto, string codigoTarifa)
        {
            var responseTarifaPlana = new AcuerdoComercialEscalonadoBaseViewModel();
            try
            {
                var requestAgente = new RequestAcuerdoComercialEscalonadoTarifa
                {
                    CodigoConceptoMaestroDefault = codigoConcepto,
                    CodigoTarifaMaestraDefault = codigoTarifa
                };
                var listaTarifa = new TransmisionesProxyrest().ConsultarAcuerdoComercialEscalonadoTarifaBase(requestAgente);
                responseTarifaPlana.ListaAcuerdoComercialEscalonadoTarifa = new List<AcuerdoComercialEscalonadoTarifaViewModel>();
                responseTarifaPlana.TarifaEscalonadaLigadaList = new List<ConsultaDetalleTarifaEscalonadaLigadaViewModel>();
                if (listaTarifa.ListaAcuerdoComercialEscalonadoTarifa.Count > 0)
                {
                    foreach (var x in listaTarifa.ListaAcuerdoComercialEscalonadoTarifa)
                    {
                        var tarifa = new AcuerdoComercialEscalonadoTarifaViewModel()
                        {
                            IdTarifa = 0,
                            CodigoAcuerdoComercialEscalonado = x.CodigoAcuerdoComercialEscalonado,
                            CodigoTarifaEscalonado = x.CodigoTarifaEscalonado,
                            DescripcionTarifa = x.DescripcionTarifa,
                            CodigoTipoDescuento = x.CodigoTipoDescuento,
                            CodigoMonedaAcuerdo = x.CodigoMonedaAcuerdo,
                            MontoAcuerdo = x.MontoAcuerdo,
                            CodigoTipoFechaCalculo = x.CodigoTipoFechaCalculo,
                            DiasDelayCalculo = x.DiasDelayCalculo,
                            CodigoTipoDiaCalculo = x.CodigoTipoDiaCalculo,
                            CodigoUnidadCalculo = x.CodigoUnidadCalculo,
                            UnidadCalculo = x.UnidadCalculo,
                            CodigoTipoCobro = x.CodigoTipoCobro,
                            Accion = x.Accion
                        };
                        responseTarifaPlana.ListaAcuerdoComercialEscalonadoTarifa.Add(tarifa);
                    }
                }
                var count = 1;
                if (listaTarifa.TarifaEscalonadaLigadaList.Count > 0)
                {
                    foreach (var item in listaTarifa.TarifaEscalonadaLigadaList)
                    {
                        var ligada = new ConsultaDetalleTarifaEscalonadaLigadaViewModel();
                        ligada.IdConfiguracionTarifaLigada = (count) * (-1);
                        ligada.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                        ligada.CodigoTarifaLigadaEscalonada = item.CodigoTarifaLigadaLocal;
                        ligada.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                        ligada.CodigoConfiguracionTarifaLigada = item.CodigoConfiguracionTarifaLigada;
                        ligada.Porcentaje = item.Porcentaje;
                        ligada.CodigoMoneda = item.CodigoMoneda;
                        ligada.Moneda = item.Moneda;
                        ligada.Monto = item.Monto;
                        ligada.Accion = item.Accion;
                        ligada.CodigoTarifa = item.CodigoTarifa;
                        ligada.DescripcionTarifaEscalonada = item.DescripcionTarifaEscalonada;
                        ligada.DescripcionConfiguracionTarifaLigada = item.DescripcionConfiguracionTarifaLigada;
                        ligada.MonedaTarifaEscalonada = item.MonedaTarifaEscalonada;
                        ligada.MontoTarifaEscalonada = item.MontoTarifaEscalonada;
                        ligada.CodigoMonedaTarifaLigada = item.CodigoMonedaTarifaLigada;
                        ligada.DescripcionMonedaBase = item.DescripcionMonedaBase;
                        ligada.Accion = item.Accion;
                        responseTarifaPlana.TarifaEscalonadaLigadaList.Add(ligada);
                        count++;
                    }
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaPlana;
        }

        public ResponseReporteACEscalonadoViewModel ReporteACEscalonado(RequestReporteACEscalonadoViewModel request)
        {
            var responseBusquedaACEscalonadoViewModel = new ResponseReporteACEscalonadoViewModel();
            try
            {

                List<ClienteMatchCode> LstclienteMatchCode = new List<ClienteMatchCode>();
                if (!string.IsNullOrEmpty(request.filtro.CodigoCliente))
                {
                    var requestCliente = new RequestConsultaClienteMatchCode();
                    requestCliente.CodigoCliente = request.filtro.CodigoCliente.Trim();
                    var responseListarCliente = new TransmisionesProxyrest().ListarClienteMatchCode(requestCliente);
                    var LstTempclienteMatchCode = responseListarCliente.ClienteMatchCodeList;
                    foreach (var item in LstTempclienteMatchCode)
                    {
                        LstclienteMatchCode.Add(new ClienteMatchCode
                        {
                            CodigoMatchCode = item.CodigoClienteMatchCode
                        });
                    }
                }

                var requestAgente = new RequestReporteACEscalonado
                {
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoMoneda = request.filtro.CodigoMoneda,
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoRA = request.filtro.CodigoRA,
                    CodigoAcuerdoComercialEscalonado = request.filtro.CodigoAcuerdoComercialEscalonado,
                    ListaClienteMatchCode = LstclienteMatchCode,
                    FinVigencia = request.filtro.FinVigencia,
                    FlgVigente = request.filtro.FlagVigente,
                    NumeroBL = request.filtro.NumeroBL,
                    CodigoContenedor = request.filtro.CodigoContenedor,
                    TipoBL = request.filtro.TipoBL,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaACEscalonado = new TransmisionesProxyrest().ReporteACEscalonado(requestAgente);

                if (listaACEscalonado.ListaReporteAcuerdoComercialEscalonado.Count > 0)
                {
                    responseBusquedaACEscalonadoViewModel.CantidadPaginas = listaACEscalonado.CantidadPaginas;
                    responseBusquedaACEscalonadoViewModel.TotalRegistros = listaACEscalonado.TotalRegistros;
                    responseBusquedaACEscalonadoViewModel.NroPagina = listaACEscalonado.NroPagina;
                    responseBusquedaACEscalonadoViewModel.Result = listaACEscalonado.Result;
                    foreach (var item in listaACEscalonado.ListaReporteAcuerdoComercialEscalonado)
                    {
                        var objet = new ReporteAcuerdoComercialEscalonadoViewModel();
                        objet.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                        objet.CodigoConcepto = item.CodigoConcepto;
                        objet.CodigoMoneda = item.CodigoMoneda;
                        objet.CodigoMonedaAcuerdo = item.CodigoMonedaAcuerdo;
                        objet.CodigoNave = item.CodigoNave;
                        objet.CodigoPartidaArancelaria = item.CodigoPartidaArancelaria;
                        objet.CodigoPeriodo = item.CodigoPeriodo;
                        objet.CodigoRA = item.CodigoRA;
                        objet.CodigoSucursal = item.CodigoSucursal;
                        objet.CodigoTarifa = item.CodigoTarifa;
                        objet.CodigoTipoCliente = item.CodigoTipoCliente;
                        objet.CodigoTipoCobro = item.CodigoTipoCobro;
                        objet.CodigoTipoContenedor = item.CodigoTipoContenedor;
                        objet.CodigoTipoDescuento = item.CodigoTipoDescuento;
                        objet.CodigoTipoDiaCalculo = item.CodigoTipoDiaCalculo;
                        objet.CodigoTipoFechaCalculo = item.CodigoTipoFechaCalculo;
                        objet.DescripcionTarifa = item.DescripcionTarifa;
                        objet.DescripcionTipoDescuento = item.DescripcionTipoDescuento;
                        objet.DiasDelayCalculo = item.DiasDelayCalculo;
                        objet.FlagNuevoCalculo = item.FlagNuevoCalculo;
                        objet.MatchCode = item.MatchCode;
                        objet.MontoAcuerdo = item.MontoAcuerdo;
                        objet.NumeroBL = item.NumeroBL;
                        objet.NumeroDias = item.NumeroDias;
                        objet.NumeroViaje = item.NumeroViaje;
                        objet.Precio = item.Precio;
                        objet.ServiceID = item.ServiceID;
                        objet.Sucursal = item.Sucursal;
                        objet.TipoBL = item.TipoBL;
                        objet.TipoCliente = item.TipoCliente;
                        objet.TipoPuerto = item.TipoPuerto;
                        objet.ValorDescuento = item.ValorDescuento;
                        objet.DescripcionTipoFechaCalculo = item.DescripcionTipoFechaCalculo;
                        objet.DescripcionTipoBL = item.DescripcionTipoBL;
                        objet.DescripcionMonedaAcuerdo = item.DescripcionMonedaAcuerdo;
                        //objet.FinVigencia = string.Format("{0:dd/MM/yyyy}", item.FinVigencia);
                        responseBusquedaACEscalonadoViewModel.ListaReporteAcuerdoComercialEscalonado.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseBusquedaACEscalonadoViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaACEscalonadoViewModel;
        }


        public ResponseConsultaDetalleNotificacionViewModel ConsultarDetalleNotificacion(RequestConsultaDetalleNotificacionViewModel request)
        {
            var resp = new ResponseConsultaDetalleNotificacionViewModel();
            try
            {
                var requestAg = new RequestConsultaDetalleNotificacion
                {
                    CodigoNotificacion = request.CodigoNotificacion,
                    CodigoLinea = request.CodigoLinea
                };
                var response = new TransmisionesProxyrest().ConsultarDetalleNotificacion(requestAg);
                resp.Result = response.Result;
                if (response.DetalleBlNotificacionList.Count > 0)
                {

                    foreach (var item in response.DetalleBlNotificacionList)
                    {
                        var objet = new ConsultaDetalleNotificacionViewModel();
                        objet.Asunto = item.Asunto;
                        objet.CodigoNotificacion = item.CodigoNotificacion;
                        objet.Frecuencia = item.Frecuencia;
                        objet.CodigoLinea = item.CodigoLinea;
                        objet.DetalleCorreo = item.DetalleCorreo;
                        objet.CodigoTipoFrecuencia = item.CodigoTipoFrecuencia;
                        objet.EstadoRegistro = item.EstadoRegistro;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.FechaHoraEjecucion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraEjecucion);
                        objet.HoraEjecucion = item.FechaHoraEjecucion == null ? "" : item.FechaHoraEjecucion.Value.TimeOfDay.Hours.ToString().PadLeft(2, '0') + ":" + item.FechaHoraEjecucion.Value.TimeOfDay.Minutes.ToString().PadLeft(2, '0');
                        objet.Nombre = item.Nombre;
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        resp.DetalleBlNotificacionList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return resp;
        }

        public ResponseActualizarNotificacion ActualizarNotificacion(RequestRegistroNotificacionViewModel request)
        {
            var responseData = new ResponseActualizarNotificacion();
            try
            {
                RequestActualizarNotificacion requestAgente = new RequestActualizarNotificacion();
                TimeSpan time = TimeSpan.Parse(request.HoraEjecucion);
                requestAgente.CodigoLinea = request.CodigoLinea;
                requestAgente.CodigoNotificacion = request.CodigoNotificacion;
                requestAgente.Frecuencia = request.Frecuencia;
                requestAgente.CodigoTipoFrecuencia = request.CodigoTipoFrecuencia;
                requestAgente.Asunto = request.Asunto;
                requestAgente.Nombre = request.Nombre;
                requestAgente.FechaHoraEjecucion = Convert.ToDateTime(request.FechaHoraEjecucion).Add(time);
                requestAgente.DetalleCorreo = HttpUtility.UrlDecode(request.DetalleCorreo);
                requestAgente.EstadoRegistro = request.EstadoRegistro;
                requestAgente.UsuarioActualizacion = request.UsuarioActualizacion;
                requestAgente.FechaHoraActualizacion = request.FechaHoraActualizacion;
                responseData = new TransmisionesProxyrest().ActualizarNotificacion(requestAgente);
            }
            catch (Exception ex)
            {
                responseData.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseData;
        }


        public ResponseObtenerConfiguracionLineaViewModel ObtenerConfiguracionLineaxCodigo(RequestObtenerConfiguracionLineaViewModel request)
        {
            var resp = new ResponseObtenerConfiguracionLineaViewModel();

            string Accion = "U";
            if (request.isNuevo)
            {
                Accion = "I";
            }

            try
            {
                var requestConsulta = new RequestObtenerConfiguracionLineaDTO
                {
                    CodigoConfiguracion = request.CodigoConfiguracion
                };
                var response = new TransmisionesProxyrest().ObtenerConfiguracionLineaxCodigo(requestConsulta);

                resp.CodigoConfiguracion = response.CodigoConfiguracion;
                resp.CodigoLinea = response.CodigoLinea;

                var c = 1;
                foreach (var x in response.ListaConfiguracionSucursal)
                {
                    var sucursal = new ConfiguracionLineaSucursalViewModel
                    {
                        CodigoConfiguracion = x.CodigoConfiguracion,
                        CodigoConfiguracionLineaSucursal = x.CodigoConfiguracionLineaSucursal,
                        CodigoSucursal = x.CodigoSucursal,
                        Accion = Accion
                    };
                    resp.ListaConfiguracionSucursal.Add(sucursal);
                }
                foreach (var x in response.ListaConfiguracionSucursalTerminal)
                {
                    var terminal = new ConfiguracionLineaSucursalTerminalViewModel
                    {
                        CodigoConfiguracion = x.CodigoConfiguracion,
                        CodigoConfiguracionLineaSucursalTerminal = x.CodigoConfiguracionLineaSucursalTerminal,
                        CodigoSucursal = x.CodigoSucursal,
                        CodigoTerminalPortuario = x.CodigoTerminalPortuario,
                        Accion = Accion
                    };
                    resp.ListaConfiguracionSucursalTerminal.Add(terminal);
                }
                c = 1;
                foreach (var x in response.ListaConfiguracionSeccionConcesionLocal)
                {
                    var ConcesionLocal = new ConfiguracionLineaPantallaSeccionViewModel
                    {
                        //IdPA = c,
                        CodigoConfiguracion = x.CodigoConfiguracion,
                        CodigoConfiguracionLineaPantallaSeccion = x.CodigoConfiguracionLineaPantallaSeccion,
                        CodigoPantalla = x.CodigoPantalla,
                        CodigoSeccion = x.CodigoSeccion,
                        SeccionTitulo = x.SeccionTitulo,
                        SeccionVisible = x.SeccionVisible,
                        TipoControl = x.TipoControl,
                        Accion = Accion
                    };
                    resp.ListaConfiguracionSeccionConcesionLocal.Add(ConcesionLocal);
                    c++;
                }
                c = 1;
                foreach (var x in response.ListaConfiguracionSeccionAdmConcesionLocal)
                {
                    var AdmConcesionLocal = new ConfiguracionLineaPantallaSeccionViewModel
                    {
                        CodigoConfiguracion = x.CodigoConfiguracion,
                        CodigoConfiguracionLineaPantallaSeccion = x.CodigoConfiguracionLineaPantallaSeccion,
                        CodigoPantalla = x.CodigoPantalla,
                        CodigoSeccion = x.CodigoSeccion,
                        SeccionTitulo = x.SeccionTitulo,
                        SeccionVisible = x.SeccionVisible,
                        TipoControl = x.TipoControl,
                        Accion = Accion
                    };
                    resp.ListaConfiguracionSeccionAdmConcesionLocal.Add(AdmConcesionLocal);
                    c++;
                }
                c = 1;
                foreach (var x in response.ListaConfiguracionSeccionConcesionEscalonada)
                {
                    var ConcesionEscalonada = new ConfiguracionLineaPantallaSeccionViewModel
                    {
                        CodigoConfiguracion = x.CodigoConfiguracion,
                        CodigoConfiguracionLineaPantallaSeccion = x.CodigoConfiguracionLineaPantallaSeccion,
                        CodigoPantalla = x.CodigoPantalla,
                        CodigoSeccion = x.CodigoSeccion,
                        SeccionTitulo = x.SeccionTitulo,
                        SeccionVisible = x.SeccionVisible,
                        TipoControl = x.TipoControl,
                        Accion = Accion
                    };
                    resp.ListaConfiguracionSeccionConcesionEscalonada.Add(ConcesionEscalonada);
                    c++;
                }
                c = 1;
                foreach (var x in response.ListaConfiguracionSeccionAdmConcesionEscalonada)
                {
                    var AdmConcesionEscalonada = new ConfiguracionLineaPantallaSeccionViewModel
                    {
                        CodigoConfiguracion = x.CodigoConfiguracion,
                        CodigoConfiguracionLineaPantallaSeccion = x.CodigoConfiguracionLineaPantallaSeccion,
                        CodigoPantalla = x.CodigoPantalla,
                        CodigoSeccion = x.CodigoSeccion,
                        SeccionTitulo = x.SeccionTitulo,
                        SeccionVisible = x.SeccionVisible,
                        TipoControl = x.TipoControl,
                        Accion = Accion
                    };
                    resp.ListaConfiguracionSeccionAdmConcesionEscalonada.Add(AdmConcesionEscalonada);
                    c++;
                }
                resp.Result = response.Result;
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return resp;
        }


        public ResponseActualizarConfiguracionLineaViewModel ModificarConfiguracionLinea(RequestActualizarConfiguracionLineaViewModel request)
        {
            var response = new ResponseActualizarConfiguracionLineaViewModel();
            try
            {
                var requestAgente = SetRequestGuardarConfiguracionLinea(request);
                var resp = new TransmisionesProxyrest().ModificarConfiguracionLinea(requestAgente);
                response.Result = resp.Result;
            }
            catch (Exception ex)
            {
                response.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return response;
        }


        private RequestActualizarConfiguracionLineaDTO SetRequestGuardarConfiguracionLinea(RequestActualizarConfiguracionLineaViewModel request)
        {
            var requestDTO = new RequestActualizarConfiguracionLineaDTO();
            requestDTO.Accion = request.Accion;
            requestDTO.CodigoConfiguracion = request.CodigoConfiguracion;
            requestDTO.CodigoLinea = request.CodigoLinea;
            requestDTO.FechaHoraRegistro = DateTime.Now;
            requestDTO.UsuarioRegistro = request.UsuarioRegistro;
            requestDTO.ListaConfiguracionSeccion = new List<ConfiguracionLineaPantallaSeccionDTO>();
            requestDTO.ListaConfiguracionSucursal = new List<ConfiguracionLineaSucursalDTO>();
            requestDTO.ListaConfiguracionSucursalTerminal = new List<ConfiguracionLineaSucursalTerminalDTO>();
            foreach (var item in request.ListaConfiguracionSucursal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    ConfiguracionLineaSucursalDTO obj = new ConfiguracionLineaSucursalDTO();
                    obj.Accion = item.Accion;
                    obj.CodigoConfiguracion = item.CodigoConfiguracion;
                    obj.CodigoConfiguracionLineaSucursal = item.CodigoConfiguracionLineaSucursal;
                    obj.CodigoSucursal = item.CodigoSucursal;
                    requestDTO.ListaConfiguracionSucursal.Add(obj);
                }
            }
            foreach (var item in request.ListaConfiguracionSucursalTerminal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    ConfiguracionLineaSucursalTerminalDTO obj = new ConfiguracionLineaSucursalTerminalDTO();
                    obj.Accion = item.Accion;
                    obj.CodigoConfiguracion = item.CodigoConfiguracion;
                    obj.CodigoConfiguracionLineaSucursalTerminal = item.CodigoConfiguracionLineaSucursalTerminal;
                    obj.CodigoSucursal = item.CodigoSucursal;
                    obj.CodigoTerminalPortuario = item.CodigoTerminalPortuario;
                    requestDTO.ListaConfiguracionSucursalTerminal.Add(obj);
                }
            }
            foreach (var item in request.ListaConfiguracionSeccionConcesionLocal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    ConfiguracionLineaPantallaSeccionDTO obj = new ConfiguracionLineaPantallaSeccionDTO();
                    obj.Accion = item.Accion;
                    obj.CodigoConfiguracion = item.CodigoConfiguracion;
                    obj.CodigoConfiguracionLineaPantallaSeccion = item.CodigoConfiguracionLineaPantallaSeccion;
                    obj.CodigoPantalla = item.CodigoPantalla;
                    obj.CodigoSeccion = item.CodigoSeccion;
                    obj.SeccionTitulo = item.SeccionTitulo;
                    obj.SeccionVisible = item.SeccionVisible;
                    obj.TipoControl = item.TipoControl;
                    requestDTO.ListaConfiguracionSeccion.Add(obj);
                }
            }
            foreach (var item in request.ListaConfiguracionSeccionConcesionEscalonada)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    ConfiguracionLineaPantallaSeccionDTO obj = new ConfiguracionLineaPantallaSeccionDTO();
                    obj.Accion = item.Accion;
                    obj.CodigoConfiguracion = item.CodigoConfiguracion;
                    obj.CodigoConfiguracionLineaPantallaSeccion = item.CodigoConfiguracionLineaPantallaSeccion;
                    obj.CodigoPantalla = item.CodigoPantalla;
                    obj.CodigoSeccion = item.CodigoSeccion;
                    obj.SeccionTitulo = item.SeccionTitulo;
                    obj.SeccionVisible = item.SeccionVisible;
                    obj.TipoControl = item.TipoControl;
                    requestDTO.ListaConfiguracionSeccion.Add(obj);
                }
            }
            foreach (var item in request.ListaConfiguracionSeccionAdmConcesionLocal)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    ConfiguracionLineaPantallaSeccionDTO obj = new ConfiguracionLineaPantallaSeccionDTO();
                    obj.Accion = item.Accion;
                    obj.CodigoConfiguracion = item.CodigoConfiguracion;
                    obj.CodigoConfiguracionLineaPantallaSeccion = item.CodigoConfiguracionLineaPantallaSeccion;
                    obj.CodigoPantalla = item.CodigoPantalla;
                    obj.CodigoSeccion = item.CodigoSeccion;
                    obj.SeccionTitulo = item.SeccionTitulo;
                    obj.SeccionVisible = item.SeccionVisible;
                    obj.TipoControl = item.TipoControl;
                    requestDTO.ListaConfiguracionSeccion.Add(obj);
                }
            }
            foreach (var item in request.ListaConfiguracionSeccionAdmConcesionEscalonada)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    ConfiguracionLineaPantallaSeccionDTO obj = new ConfiguracionLineaPantallaSeccionDTO();
                    obj.Accion = item.Accion;
                    obj.CodigoConfiguracion = item.CodigoConfiguracion;
                    obj.CodigoConfiguracionLineaPantallaSeccion = item.CodigoConfiguracionLineaPantallaSeccion;
                    obj.CodigoPantalla = item.CodigoPantalla;
                    obj.CodigoSeccion = item.CodigoSeccion;
                    obj.SeccionTitulo = item.SeccionTitulo;
                    obj.SeccionVisible = item.SeccionVisible;
                    obj.TipoControl = item.TipoControl;
                    requestDTO.ListaConfiguracionSeccion.Add(obj);
                }
            }
            return requestDTO;
        }

    }
}


