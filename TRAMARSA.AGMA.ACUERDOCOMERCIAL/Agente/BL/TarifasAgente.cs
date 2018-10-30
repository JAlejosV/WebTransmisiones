using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using GR.Comun.DTO;
using GR.Frameworks;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.TarifaEscalonada;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;


namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class TarifasAgente
    {
        /// <summary>
        /// Lista distribucion tarifa prueba 3
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
                    CodigoConcepto = request.filtro.CodigoConcepto,
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
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
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
        /// Busqueda de naves4
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseListaNaveViewModel ListarNave(RequestBusquedaNaveViewModel request)
        {
            var responseBusquedaNaves = new ResponseListaNaveViewModel();
            try
            {
                var requestAgente = new RequestConsultaNave
                {
                    Codigo = request.filtro.Codigo,
                    Nombre = request.filtro.Nombre,
                    NumeroViaje = request.filtro.NumeroViaje,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var listaNaves = new TransmisionesProxyrest().ListarNave(requestAgente);
                responseBusquedaNaves = new ResponseListaNaveViewModel
                                        {
                                            Result = listaNaves.Result,
                                            TotalRegistros = listaNaves.TotalRegistros,
                                            CantidadPaginas = listaNaves.CantidadPaginas
                                        };

                if (listaNaves.NavesList.Count > 0)
                {
                    var listaSucursal = new MaestrosAgente().ListarSucursal();
                    var navesList = new List<ListaNaveViewModel>();
                    foreach (var naves in listaNaves.NavesList)
                    {
                        var obj = new ListaNaveViewModel
                        {
                            Codigo = naves.Codigo,
                            Nombre = naves.Nombre,
                            NumeroViaje = naves.NumeroViaje
                        };
                        var detalleArriboNaveList = new List<DetalleArriboNaveViewModel>();
                        foreach (var arribos in naves.DetalleArriboNaveList)
                        {
                            var oDetalleArriboNaveViewModel = new DetalleArriboNaveViewModel
                            {
                                CodigoSucursal = arribos.CodigoSucursal,
                                CodigoNave = arribos.CodigoNave,
                                FechaArribo = arribos.FechaArribo.ToString("dd/MM/yyyy"),
                                NumeroViaje = arribos.NumeroViaje
                            };
                            var oList = (from x in listaSucursal.SucursalesList
                                         where x.Codigo == arribos.CodigoSucursal
                                         select x).ToList();
                            if (oList.Count > 0)
                            {
                                oDetalleArriboNaveViewModel.NombreSucursal = oList[0].Nombre;
                            }
                            detalleArriboNaveList.Add(oDetalleArriboNaveViewModel);
                        }
                        obj.DetalleArribo = Grid.ToJsonFormat(detalleArriboNaveList);
                        navesList.Add(obj);
                    }
                    responseBusquedaNaves.NavesList = navesList;
                }
            }
            catch (Exception ex)
            {
                responseBusquedaNaves.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaNaves;
        }


        /// <summary>
        /// Busqueda de Tarifas Locales
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaTarifaLocalViewModel BusquedaTarifaLocal(RequestBusquedaTarifaLocalViewModel request)
        {
            var responseTarifaPlana = new ResponseBusquedaTarifaLocalViewModel();
            try
            {
                var requestAgente = new RequestBusquedaTarifaLocal
                {
                    CodigoLinea = request.filtro.CodigoLinea,
                    DescripcionTarifa = request.filtro.DescripcionTarifa,
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoTerminalPortuario = request.filtro.CodigoTerminalPortuario,
                    FlagTarifaLigada = request.filtro.FlagTarifaLigada,
                    FlagVigente = request.filtro.FlagVigente,
                    FechaVigencia = request.filtro.FlagVigente ? request.filtro.FechaVigencia : null,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var listaTarifa = new TransmisionesProxyrest().BusquedaTarifaLocal(requestAgente);
                if (listaTarifa.TarifaLocalList.Count > 0)
                {
                    responseTarifaPlana.CantidadPaginas = listaTarifa.CantidadPaginas;
                    responseTarifaPlana.TotalRegistros = listaTarifa.TotalRegistros;
                    responseTarifaPlana.NroPagina = listaTarifa.NroPagina;
                    responseTarifaPlana.Result = listaTarifa.Result;
                    foreach (var item in listaTarifa.TarifaLocalList)
                    {
                        var objet = new ListaTarifaPlanaViewModel();
                        objet.CodigoTarifaLocal = item.CodigoTarifaLocal;
                        objet.CodigoRegimen = item.CodigoRegimen;
                        objet.CodigoConcepto = item.CodigoConcepto;
                        objet.CodigoTarifa = item.CodigoTarifa;
                        objet.DescripcionTarifa = item.DescripcionTarifa;
                        objet.Monto = item.Monto;
                        objet.CodigoMoneda = item.CodigoMoneda;
                        objet.CodigoSucursal = item.CodigoSucursal;
                        objet.CodigoTerminalPortuario = item.CodigoTerminalPortuario;
                        objet.EstadoRegistro = item.EstadoRegistro;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        objet.DescripcionSucursal = item.DescripcionSucursal;
                        objet.DescripcionMoneda = item.DescripcionMoneda;
                        objet.DescripcionTerminalPortuario = item.DescripcionTerminalPortuario;
                        responseTarifaPlana.TarifaLocalList.Add(objet);
                    }
                }
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
        public ResponseRegistrarTarifaLocal RegistroTarifaLocal(RequestRegistrarTarifaLocaViewModell request)
        {
            var responseRegistroTarifa = new ResponseRegistrarTarifaLocal();
            try
            {
                var requestAgente = SetRequestGuardarTarifaLocal(request);
                responseRegistroTarifa = new TransmisionesProxyrest().RegistroTarifaLocal(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroTarifa;
        }

        /// <summary>
        /// Registro de Tarifa Escalonada
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseRegistrarTarifaEscalonada RegistroTarifaEscalonada(RequestRegistrarTarifaEscalonadaViewModel request)
        {
            var responseRegistroTarifa = new ResponseRegistrarTarifaEscalonada();
            try
            {
                var requestAgente = SetRequestGuardarTarifaEscalonada(request);
                responseRegistroTarifa = new TransmisionesProxyrest().RegistroTarifaEscalonada(requestAgente);
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
        public ResponseConsultarDetalleTarifaLocal ConsultarDetalleTarifaLocal(RequestConsultaDetalleTarifaLocalViewModel request)
        {
            var responseTarifaPlana = new ResponseConsultarDetalleTarifaLocal();
            try
            {
                var requestAgente = new RequestConsultaDetalleTarifaLocal
                {
                    CodigoTarifaLocal = request.filtro.CodigoTarifaLocal
                };
                responseTarifaPlana = new TransmisionesProxyrest().ConsultarDetalleTarifaLocal(requestAgente);
                if (responseTarifaPlana.DetalleTarifaLocalList.Count > 0)
                {
                    var listaVigencia = new List<TarifaLocalVigenciaDTO>();
                    foreach (var item in responseTarifaPlana.DetalleTarifaLocalList[0].TarifaLocalVigenciaList)
                    {
                        item.InicioVigenciaValor = item.InicioVigencia != null ? string.Format("{0:dd/MM/yyyy}", item.InicioVigencia) : null;
                        listaVigencia.Add(item);
                    }
                    responseTarifaPlana.DetalleTarifaLocalList[0].TarifaLocalVigenciaList = listaVigencia;
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaPlana;
        }

        /// <summary>
        /// Busqueda de Tarifas escalonadas
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaTarifaEscalonadaViewModel BusquedaTarifaEscalonada(RequestBusquedaTarifaEscalonadaViewModel request)
        {
            var responseTarifaPlana = new ResponseBusquedaTarifaEscalonadaViewModel();
            try
            {
                var requestAgente = new RequestBusquedaTarifaEscalonada
                {
                    CodigoLinea = request.filtro.CodigoLinea,
                    DescripcionTarifa = request.filtro.DescripcionTarifa,
                    CodigoTipoContenedor = request.filtro.CodigoTipoContenedor,
                    FlagTarifaLigada = request.filtro.FlagTarifaLigada,
                    FlagVigente = request.filtro.FlagVigente,
                    FechaVigencia = request.filtro.FlagVigente == false ? null : request.filtro.FechaVigencia,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var listaTarifa = new TransmisionesProxyrest().BusquedaTarifaEscalonada(requestAgente);
                if (listaTarifa.TarifaEscalonadaList.Count > 0)
                {
                    responseTarifaPlana.CantidadPaginas = listaTarifa.CantidadPaginas;
                    responseTarifaPlana.TotalRegistros = listaTarifa.TotalRegistros;
                    responseTarifaPlana.NroPagina = listaTarifa.NroPagina;
                    responseTarifaPlana.Result = listaTarifa.Result;
                    foreach (var item in listaTarifa.TarifaEscalonadaList)
                    {
                        var objet = new ListaTarifaEscalonadaViewModel();
                        objet.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                        objet.CodigoRegimen = item.CodigoRegimen;
                        objet.CodigoConcepto = item.CodigoConcepto;
                        objet.CodigoTarifa = item.CodigoTarifa;
                        objet.DescripcionTarifa = item.DescripcionTarifa;
                        objet.Precio = item.Precio;
                        objet.CodigoMoneda = item.CodigoMoneda;
                        objet.DescripcionMoneda = item.DescripcionMoneda;
                        objet.CodigoTipoContenedor = item.CodigoTipoContenedor;
                        //objet.TipoContenedor = item.TipoContenedor;
                        objet.EstadoRegistro = item.EstadoRegistro;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        objet.CodigoUnidadCalculo = item.CodigoUnidadCalculo;
                        objet.UnidadCalculo = item.UnidadCalculo;
                        responseTarifaPlana.TarifaEscalonadaList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseTarifaPlana.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaPlana;
        }

        /// <summary>
        /// Consultar detalle tarifa escalonada
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseConsultaDetalleTarifaEscalonadaViewModel ConsultarDetalleTarifaEscalonada(RequestConsultaDetalleTarifaEscalonadaViewModel request)
        {
            var responseTarifaEscalonada = new ResponseConsultaDetalleTarifaEscalonadaViewModel();
            try
            {
                var requestAgente = new RequestConsultaDetalleTarifaEscalonada
                {
                    CodigoTarifaEscalonada = request.filtro.CodigoTarifaEscalonada
                };
                var response = new TransmisionesProxyrest().ConsultarDetalleTarifaEscalonada(requestAgente);
                responseTarifaEscalonada.Result = response.Result;
                if (response.DetalleTarifaEscalonadaList.Count > 0)
                {
                    var datos = new DetalleTarifaEscalonadaViewModel();
                    datos.Autorizado = response.DetalleTarifaEscalonadaList[0].Autorizado;
                    datos.CodigoConcepto = response.DetalleTarifaEscalonadaList[0].CodigoConcepto;
                    datos.CodigoLinea = response.DetalleTarifaEscalonadaList[0].CodigoLinea;
                    datos.CodigoRegimen = response.DetalleTarifaEscalonadaList[0].CodigoRegimen;
                    datos.CodigoTarifa = response.DetalleTarifaEscalonadaList[0].CodigoTarifa;
                    datos.CodigoTarifaEscalonada = response.DetalleTarifaEscalonadaList[0].CodigoTarifaEscalonada;
                    datos.CodigoUnidadCalculo = response.DetalleTarifaEscalonadaList[0].CodigoUnidadCalculo;
                    datos.CodigoUsuarioAutorizador = response.DetalleTarifaEscalonadaList[0].CodigoUsuarioAutorizador;
                    datos.DescripcionLinea = response.DetalleTarifaEscalonadaList[0].DescripcionLinea;
                    datos.DescripcionTarifa = response.DetalleTarifaEscalonadaList[0].DescripcionTarifa;
                    datos.EstadoRegistro = response.DetalleTarifaEscalonadaList[0].EstadoRegistro ? "Activo" : "Inactivo";
                    datos.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy}", response.DetalleTarifaEscalonadaList[0].FechaHoraActualizacion);
                    datos.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", response.DetalleTarifaEscalonadaList[0].FechaHoraCreacion);
                    datos.Regimen = response.DetalleTarifaEscalonadaList[0].Regimen;
                    datos.UnidadCalculo = response.DetalleTarifaEscalonadaList[0].UnidadCalculo;
                    datos.UsuarioActualizacion = response.DetalleTarifaEscalonadaList[0].UsuarioActualizacion;
                    datos.UsuarioCreacion = response.DetalleTarifaEscalonadaList[0].UsuarioCreacion;
                    var count = 1;
                    #region Ligada
                    foreach (var item in response.DetalleTarifaEscalonadaList[0].TarifaEscalonadaLigadaList)
                    {
                        var ligada = new ConsultaDetalleTarifaEscalonadaLigadaViewModel();
                        ligada.IdConfiguracionTarifaLigada = count;
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
                        datos.TarifaEscalonadaLigadaList.Add(ligada);
                        count++;
                    }
                    #endregion
                    count = 1;
                    #region Periodo
                    foreach (var item in response.DetalleTarifaEscalonadaList[0].TarifaEscalonadaPeriodoList)
                    {
                        var periodo = new ConsultaDetalleTarifaEscalonadaPeriodoViewModel();
                        periodo.IdPeriodo = count;
                        periodo.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                        periodo.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                        periodo.CodigoTipoContenedor = item.CodigoTipoContenedor;
                        periodo.CodigoPeriodo = item.CodigoPeriodo;
                        periodo.NumeroDias = item.NumeroDias;
                        periodo.CodigoMoneda = item.CodigoMoneda;
                        periodo.Moneda = item.DescripcionMoneda;
                        periodo.Precio = item.Precio;
                        periodo.CodigoClaseContenedor = item.CodigoClaseContenedor;
                        periodo.ClaseContenedor = item.ClaseContenedor;
                        periodo.Accion = item.Accion;
                        datos.TarifaEscalonadaPeriodoList.Add(periodo);
                        count++;
                    }
                    #endregion
                    #region Sucursal
                    foreach (var item in response.DetalleTarifaEscalonadaList[0].TarifaEscalonadaSucursalList)
                    {
                        var sucursal = new ConsultaDetalleTarifaEscalonadaSucursalViewModel();
                        sucursal.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                        sucursal.CodigoSucursal = item.CodigoSucursal;
                        sucursal.Nombre = item.Nombre;
                        sucursal.Accion = item.Accion;
                        datos.TarifaEscalonadaSucursalList.Add(sucursal);
                    }
                    #endregion
                    #region Distribucion
                    foreach (var item in response.DetalleTarifaEscalonadaList[0].DistribucionTarifaList)
                    {
                        var distribucion = new DistribucionTarifaViewModel();
                        distribucion.Concepto = item.Concepto;
                        distribucion.CodigoDistribucionTarifa = item.CodigoDistribucionTarifa;
                        distribucion.CodTarifa = item.CodTarifa;
                        distribucion.NumeroDetalle = item.NumeroDetalle;
                        distribucion.TipoTarifa = item.TipoTarifa;
                        distribucion.MontoBase = item.MontoBase;
                        distribucion.Cuenta = item.Cuenta;
                        distribucion.Porcentaje = item.Porcentaje;
                        distribucion.MontoBruto = item.MontoBruto;
                        distribucion.MontoIGV = item.MontoIGV;
                        distribucion.MontoNeto = item.MontoNeto;
                        distribucion.TipoCta = item.TipoCta;
                        distribucion.DescripcionTipoCta = item.DescripcionTipoCta;
                        distribucion.Configuracion = item.Configuracion;
                        datos.DistribucionTarifaList.Add(distribucion);
                    }
                    #endregion
                    #region Vigencia
                    foreach (var item in response.DetalleTarifaEscalonadaList[0].TarifaEscalonadaVigenciaList)
                    {
                        var oVigencia = new ConsultaDetalleTarifaEscalonadaVigenciaViewModel();
                        oVigencia.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                        oVigencia.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                        oVigencia.InicioVigencia = string.Format("{0:dd/MM/yyyy}", item.InicioVigencia);
                        oVigencia.CodigoTipoFechaCalculo = item.CodigoTipoFechaCalculo;
                        oVigencia.DiasDelayCalculo = item.DiasDelayCalculo;
                        oVigencia.CodigoTipoDiaCalculo = item.CodigoTipoDiaCalculo;
                        oVigencia.CodigoTipoCobro = item.CodigoTipoCobro;
                        oVigencia.UsuarioCreacion = item.UsuarioCreacion;
                        oVigencia.UsuarioActualizacion = item.UsuarioActualizacion;
                        oVigencia.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraCreacion);
                        oVigencia.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraActualizacion);
                        oVigencia.EstadoRegistro = item.EstadoRegistro;
                        oVigencia.Accion = item.Accion;
                        datos.TarifaEscalonadaVigenciaList.Add(oVigencia);
                    }
                    #endregion
                    responseTarifaEscalonada.DetalleTarifaEscalonadaList.Add(datos);
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaEscalonada;
        }

        /// <summary>
        /// Consultar historial tarifa local
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseConsultaHistorialTarifaLocalViewModel ConsultarHistorialTarifaLocal(RequestConsultaHistorialTarifaLocalViewModel request)
        {
            var responseHistorial = new ResponseConsultaHistorialTarifaLocalViewModel();
            try
            {
                var requestAgente = new RequestConsultaHistorialTarifaLocal
                {
                    CodigoTarifaLocal = request.filtro.CodigoTarifaLocal,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var responseTarifaPlana = new TransmisionesProxyrest().ConsultarHistorialTarifaLocal(requestAgente);
                responseHistorial.CantidadPaginas = responseTarifaPlana.CantidadPaginas;
                responseHistorial.NroPagina = responseTarifaPlana.NroPagina;
                responseHistorial.Result = responseTarifaPlana.Result;
                responseHistorial.TotalRegistros = responseTarifaPlana.TotalRegistros;

                foreach (var item in responseTarifaPlana.TarifaLocalHistorialList)
                {
                    var objResponse = new TarifaLocalHistorialViewModel();
                    objResponse.CodigoTarifaLocalHistorial = item.CodigoTarifaLocalHistorial;
                    objResponse.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    objResponse.Usuario = item.Usuario;
                    objResponse.FechaHora = String.Format("{0:MM/dd/yyyy hh:mm}", item.FechaHora);
                    objResponse.Accion = item.Accion;
                    objResponse.Descripcion = item.Descripcion;
                    responseHistorial.TarifaLocalHistorialList.Add(objResponse);
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
        /// Consultar historial tarifa escalonada
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseConsultaHistorialTarifaEscalonadaViewModel ConsultarHistorialTarifaEscalonada(ResquestConsultaHistorialTarifaEscalonadaViewModel request)
        {
            var responseHistorial = new ResponseConsultaHistorialTarifaEscalonadaViewModel();
            try
            {
                var requestHistorial = new RequestConsultaHistorialTarifaEscalonada()
                {
                    CodigoTarifaEscalonada = request.filtro.CodigoTarifaEscalonada,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var responseTarifaPlana = new TransmisionesProxyrest().ConsultarHistorialTarifaEscalonada(requestHistorial);
                responseHistorial.CantidadPaginas = responseTarifaPlana.CantidadPaginas;
                responseHistorial.NroPagina = responseTarifaPlana.NroPagina;
                responseHistorial.Result = responseTarifaPlana.Result;
                responseHistorial.TotalRegistros = responseTarifaPlana.TotalRegistros;
                foreach (var item in responseTarifaPlana.TarifaEscalonadaHistorialList)
                {
                    var objResponse = new TarifaEscalonadaHistorialViewModel();
                    objResponse.CodigoTarifaEscalonadaHistorial = item.CodigoTarifaEscalonadaHistorial;
                    objResponse.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                    objResponse.Usuario = item.Usuario;
                    objResponse.FechaHora = String.Format("{0:MM/dd/yyyy hh:mm}", item.FechaHora);
                    objResponse.Accion = item.Accion;
                    objResponse.Descripcion = item.Descripcion;
                    responseHistorial.TarifaEscalonadaHistorialList.Add(objResponse);
                }
            }
            catch (Exception ex)
            {
                responseHistorial.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseHistorial;
        }

        private RequestRegistrarTarifaLocal SetRequestGuardarTarifaLocal(RequestRegistrarTarifaLocaViewModell request)
        {
            RequestRegistrarTarifaLocal requestRegistrarTarifa = new RequestRegistrarTarifaLocal();
            requestRegistrarTarifa.CodigoRegimen = request.CodigoRegimen;
            requestRegistrarTarifa.CodigoTarifa = request.CodigoTarifa;
            //requestRegistrarTarifa.CodigoMoneda = request.CodigoMoneda;
            requestRegistrarTarifa.CodigoConcepto = request.CodigoConcepto;
            requestRegistrarTarifa.CodigoLinea = request.CodigoLinea;
            //requestRegistrarTarifa.Monto = request.Monto;
            requestRegistrarTarifa.EstadoRegistro = request.EstadoRegistro == "Activo";
            requestRegistrarTarifa.CodigoUsuarioAutorizador = request.CodigoUsuarioAutorizador;
            requestRegistrarTarifa.UsuarioCreacion = request.UsuarioCreacion;

            requestRegistrarTarifa.ListaTarifaLocalVigencia = new List<TarifaLocalVigenciaDTO>();
            requestRegistrarTarifa.ListaTarifaLocalSucursal = new List<TarifaLocalSucursalDTO>();
            requestRegistrarTarifa.ListaTarifaLocalSucursalTerminal = new List<TarifaLocalTerminalDTO>();
            //requestRegistrarTarifa.ListaTarifaLocalVigencia.ListaTarifaLocalLigada = new List<TarifaLocalLigadaDTO>();

            foreach (var item in request.ListaTarifaLocalVigencia)
            {
                TarifaLocalVigenciaDTO tarifaLocalVigencia = new TarifaLocalVigenciaDTO();
                tarifaLocalVigencia.CodigoTarifaLocalVigencia = item.CodigoTarifaLocalVigencia;
                tarifaLocalVigencia.CodigoTarifaLocal = item.CodigoTarifaLocal;
                tarifaLocalVigencia.InicioVigencia = item.InicioVigencia;
                tarifaLocalVigencia.CodigoMoneda = item.CodigoMoneda;
                tarifaLocalVigencia.Monto = item.Monto;
                tarifaLocalVigencia.Accion = item.Accion;
                tarifaLocalVigencia.EstadoRegistro = item.EstadoRegistro;


                tarifaLocalVigencia.ListaTarifaLocalLigada = new List<TarifaLocalLigadaDTO>();
                if (item.ListaTarifaLocalLigada != null)
                {
                    foreach (var itemLigado in item.ListaTarifaLocalLigada)
                    {
                        TarifaLocalLigadaDTO tarifaLocalLigada = new TarifaLocalLigadaDTO();

                        tarifaLocalLigada.CodigoTarifaLigadaLocal = itemLigado.CodigoTarifaLigadaLocal;
                        tarifaLocalLigada.CodigoTarifaLocal = itemLigado.CodigoTarifaLocal;
                        tarifaLocalLigada.CodigoConfiguracionTarifaLigada = itemLigado.CodigoConfiguracionTarifaLigada;
                        tarifaLocalLigada.Porcentaje = Convert.ToDecimal(itemLigado.Porcentaje);
                        tarifaLocalLigada.CodigoMoneda = itemLigado.CodigoMoneda;
                        tarifaLocalLigada.Monto = Convert.ToDecimal(itemLigado.Monto);
                        tarifaLocalLigada.Accion = itemLigado.Accion;

                        tarifaLocalVigencia.ListaTarifaLocalLigada.Add(tarifaLocalLigada);
                    }
                }
                requestRegistrarTarifa.ListaTarifaLocalVigencia.Add(tarifaLocalVigencia);
            }
            foreach (var item in request.ListaTarifaLocalSucursal)
            {
                TarifaLocalSucursalDTO tarifaLocalSucursal = new TarifaLocalSucursalDTO();

                tarifaLocalSucursal.CodigoTarifaLocal = item.CodigoTarifaLocal;
                tarifaLocalSucursal.Codigo = item.Codigo;
                tarifaLocalSucursal.Accion = item.Accion;
                requestRegistrarTarifa.ListaTarifaLocalSucursal.Add(tarifaLocalSucursal);
            }


            if (request.ListaTarifaLocalSucursalTerminal != null)
            {
                foreach (var item in request.ListaTarifaLocalSucursalTerminal)
                {
                    TarifaLocalTerminalDTO tarifaLocalTerminal = new TarifaLocalTerminalDTO();

                    tarifaLocalTerminal.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    tarifaLocalTerminal.CodigoSucursal = item.CodigoSucursal;
                    tarifaLocalTerminal.CodigoAlmacen = item.CodigoAlmacen;
                    tarifaLocalTerminal.Accion = item.Accion;
                    requestRegistrarTarifa.ListaTarifaLocalSucursalTerminal.Add(tarifaLocalTerminal);
                }
            }
            /*
            if (request.ListaTarifaLocalLigada != null)
            {
                foreach (var item in request.ListaTarifaLocalLigada)
                {
                    TarifaLocalLigadaDTO tarifaLocalLigada = new TarifaLocalLigadaDTO();

                    tarifaLocalLigada.CodigoTarifaLigadaLocal = item.CodigoTarifaLigadaLocal;
                    tarifaLocalLigada.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    tarifaLocalLigada.CodigoConfiguracionTarifaLigada = item.CodigoConfiguracionTarifaLigada;
                    tarifaLocalLigada.Porcentaje = Convert.ToDecimal(item.Porcentaje);
                    tarifaLocalLigada.CodigoMoneda = item.CodigoMoneda;
                    tarifaLocalLigada.Monto = Convert.ToDecimal(item.Monto);
                    tarifaLocalLigada.Accion = item.Accion;

                    requestRegistrarTarifa.ListaTarifaLocalLigada.Add(tarifaLocalLigada);
                }
            }
             */
            return requestRegistrarTarifa;
        }

        private RequestRegistrarTarifaEscalonada SetRequestGuardarTarifaEscalonada(
            RequestRegistrarTarifaEscalonadaViewModel request)
        {
            RequestRegistrarTarifaEscalonada requestRegistrarTarifa = new RequestRegistrarTarifaEscalonada();
            requestRegistrarTarifa.CodigoRegimen = request.CodigoRegimen;
            requestRegistrarTarifa.CodigoTarifa = request.CodigoTarifa;
            requestRegistrarTarifa.CodigoConcepto = request.CodigoConcepto;
            requestRegistrarTarifa.CodigoLinea = request.CodigoLinea;
            requestRegistrarTarifa.CodigoUnidadCalculo = request.CodigoUnidadCalculo;
            requestRegistrarTarifa.CodigoUsuarioAutorizador = request.CodigoUsuarioAutorizador;
            requestRegistrarTarifa.Usuario = request.Usuario;
            requestRegistrarTarifa.ListaTarifaEscalonadaPeriodo = new List<TarifaEscalonadaPeriodoDTO>();
            requestRegistrarTarifa.ListaTarifaEscalonadaSucursal = new List<TarifaEscalonadaSucursalDTO>();
            requestRegistrarTarifa.ListaTarifaEscalonadaVigencia = new List<TarifaEscalonadaVigenciaDTO>();

            #region Periodo

            foreach (var item in request.ListaTarifaEscalonadaPeriodo)
            {
                TarifaEscalonadaPeriodoDTO tarifaLocalVigencia = new TarifaEscalonadaPeriodoDTO();

                tarifaLocalVigencia.CodigoMoneda = item.CodigoMoneda;
                tarifaLocalVigencia.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                tarifaLocalVigencia.CodigoPeriodo = item.CodigoPeriodo;
                tarifaLocalVigencia.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                tarifaLocalVigencia.CodigoTipoContenedor = item.CodigoTipoContenedor;
                tarifaLocalVigencia.DescripcionMoneda = item.DescripcionMoneda;
                tarifaLocalVigencia.NumeroDias = item.NumeroDias;
                tarifaLocalVigencia.Precio = item.Precio;
                tarifaLocalVigencia.Accion = item.Accion;

                requestRegistrarTarifa.ListaTarifaEscalonadaPeriodo.Add(tarifaLocalVigencia);
            }

            #endregion

            #region Sucursal

            foreach (var item in request.ListaTarifaEscalonadaSucursal)
            {
                TarifaEscalonadaSucursalDTO tarifaLocalSucursal = new TarifaEscalonadaSucursalDTO();

                tarifaLocalSucursal.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                tarifaLocalSucursal.CodigoSucursal = item.CodigoSucursal;
                tarifaLocalSucursal.Nombre = item.Nombre;
                tarifaLocalSucursal.Accion = item.Accion;
                requestRegistrarTarifa.ListaTarifaEscalonadaSucursal.Add(tarifaLocalSucursal);
            }

            #endregion

            #region Vigencia

            foreach (var item in request.ListaTarifaEscalonadaVigencia)
            {
                TarifaEscalonadaVigenciaDTO oVigencia = new TarifaEscalonadaVigenciaDTO();
                oVigencia.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                oVigencia.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                oVigencia.InicioVigencia = item.InicioVigencia;
                oVigencia.CodigoTipoFechaCalculo = item.CodigoTipoFechaCalculo;
                oVigencia.DiasDelayCalculo = item.DiasDelayCalculo;
                oVigencia.CodigoTipoDiaCalculo = item.CodigoTipoDiaCalculo;
                oVigencia.CodigoTipoCobro = item.CodigoTipoCobro;
                oVigencia.UsuarioCreacion = request.Usuario;
                oVigencia.FechaHoraCreacion = DateTime.Now;
                oVigencia.EstadoRegistro = true;
                oVigencia.Accion = item.Accion;
                requestRegistrarTarifa.ListaTarifaEscalonadaVigencia.Add(oVigencia);
            }

            #endregion

            #region TarifaLigada

            foreach (var itemLigada in request.ListaTarifaEscalonadaLigada)
            {
                TarifaEscalonadaLigadaDTO tarifaLocalLigada = new TarifaEscalonadaLigadaDTO();
                tarifaLocalLigada.CodigoTarifaLigadaLocal = itemLigada.CodigoTarifaLigadaEscalonada;
                tarifaLocalLigada.CodigoTarifaEscalonadaVigencia = itemLigada.CodigoTarifaEscalonadaVigencia;
                tarifaLocalLigada.CodigoTarifaEscalonada = itemLigada.CodigoTarifaEscalonada;
                tarifaLocalLigada.CodigoConfiguracionTarifaLigada = itemLigada.CodigoConfiguracionTarifaLigada;
                tarifaLocalLigada.Porcentaje = Convert.ToDecimal(itemLigada.Porcentaje);
                tarifaLocalLigada.CodigoMoneda = itemLigada.CodigoMoneda;
                tarifaLocalLigada.Moneda = itemLigada.Moneda;
                tarifaLocalLigada.Monto = Convert.ToDecimal(itemLigada.Monto);
                tarifaLocalLigada.Accion = itemLigada.Accion;
                requestRegistrarTarifa.ListaTarifaEscalonadaLigada.Add(tarifaLocalLigada);
            }

            #endregion

            return requestRegistrarTarifa;
        }


        /// <summary>
        /// Actualizar Tarifa Local
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseActualizarTarifaLocal ActualizarTarifaLocal(RequestActualizarTarifaLocaViewModel request)
        {
            var responseRegistroTarifa = new ResponseActualizarTarifaLocal();
            try
            {
                var requestAgente = SetRequesActualizarTarifaLocal(request);
                responseRegistroTarifa = new TransmisionesProxyrest().ActualizarTarifaLocal(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroTarifa;
        }

        private RequestActualizarTarifaLocal SetRequesActualizarTarifaLocal(RequestActualizarTarifaLocaViewModel request)
        {
            RequestActualizarTarifaLocal requestRegistrarTarifa = new RequestActualizarTarifaLocal();
            requestRegistrarTarifa.CodigoTarifaLocal = request.CodigoTarifaLocal;
            requestRegistrarTarifa.CodigoRegimen = request.CodigoRegimen;
            requestRegistrarTarifa.CodigoTarifa = request.CodigoTarifa;
            requestRegistrarTarifa.Accion = request.Accion;
            //requestRegistrarTarifa.CodigoMoneda = request.CodigoMoneda;
            requestRegistrarTarifa.CodigoConcepto = request.CodigoConcepto;
            requestRegistrarTarifa.CodigoLinea = request.CodigoLinea;
            // requestRegistrarTarifa.Monto = request.Monto;
            requestRegistrarTarifa.ValidarTarifaEnAC = request.ValidarTarifaEnAC;
            requestRegistrarTarifa.CodigoUsuarioAutorizador = request.CodigoUsuarioAutorizador;
            requestRegistrarTarifa.UsuarioActualizacion = request.UsuarioActualizacion;
            requestRegistrarTarifa.EstadoRegistro = request.EstadoRegistro == "Activo";
            requestRegistrarTarifa.ListaTarifaLocalVigencia = new List<TarifaLocalVigenciaDTO>();
            requestRegistrarTarifa.ListaTarifaLocalSucursal = new List<TarifaLocalSucursalDTO>();
            requestRegistrarTarifa.ListaTarifaLocalSucursalTerminal = new List<TarifaLocalTerminalDTO>();
            //requestRegistrarTarifa.ListaTarifaLocalLigada = new List<TarifaLocalLigadaDTO>();

            if (request.ListaTarifaLocalVigencia != null)
            {


                foreach (var item in request.ListaTarifaLocalVigencia)
                {
                    TarifaLocalVigenciaDTO tarifaLocalVigencia = new TarifaLocalVigenciaDTO();
                    tarifaLocalVigencia.CodigoTarifaLocalVigencia = item.CodigoTarifaLocalVigencia;
                    tarifaLocalVigencia.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    tarifaLocalVigencia.InicioVigencia = item.InicioVigencia;
                    tarifaLocalVigencia.CodigoMoneda = item.CodigoMoneda;
                    tarifaLocalVigencia.Monto = item.Monto;
                    tarifaLocalVigencia.Accion = item.Accion;
                    tarifaLocalVigencia.EstadoRegistro = item.EstadoRegistro;


                    tarifaLocalVigencia.ListaTarifaLocalLigada = new List<TarifaLocalLigadaDTO>();
                    if (item.ListaTarifaLocalLigada != null)
                    {
                        foreach (var itemLigado in item.ListaTarifaLocalLigada)
                        {
                            TarifaLocalLigadaDTO tarifaLocalLigada = new TarifaLocalLigadaDTO();

                            tarifaLocalLigada.CodigoTarifaLigadaLocal = itemLigado.CodigoTarifaLigadaLocal;
                            tarifaLocalLigada.CodigoTarifaLocal = itemLigado.CodigoTarifaLocal;
                            tarifaLocalLigada.CodigoConfiguracionTarifaLigada =
                                itemLigado.CodigoConfiguracionTarifaLigada;
                            tarifaLocalLigada.CodigoTarifaLocalVigencia = itemLigado.CodigoTarifaLocalVigencia;
                            tarifaLocalLigada.Porcentaje = Convert.ToDecimal(itemLigado.Porcentaje);
                            tarifaLocalLigada.CodigoMoneda = itemLigado.CodigoMoneda;
                            tarifaLocalLigada.Monto = Convert.ToDecimal(itemLigado.Monto);
                            tarifaLocalLigada.Accion = itemLigado.Accion;

                            tarifaLocalVigencia.ListaTarifaLocalLigada.Add(tarifaLocalLigada);
                        }
                    }
                    requestRegistrarTarifa.ListaTarifaLocalVigencia.Add(tarifaLocalVigencia);
                }
            }

            if (request.ListaTarifaLocalSucursal != null)
            {
                foreach (var item in request.ListaTarifaLocalSucursal)
                {
                    TarifaLocalSucursalDTO tarifaLocalSucursal = new TarifaLocalSucursalDTO();
                    tarifaLocalSucursal.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    tarifaLocalSucursal.Codigo = item.Codigo;
                    tarifaLocalSucursal.Accion = item.Accion;
                    requestRegistrarTarifa.ListaTarifaLocalSucursal.Add(tarifaLocalSucursal);
                }
            }

            if (request.ListaTarifaLocalSucursalTerminal != null)
            {
                foreach (var item in request.ListaTarifaLocalSucursalTerminal)
                {
                    TarifaLocalTerminalDTO tarifaLocalTerminal = new TarifaLocalTerminalDTO();
                    tarifaLocalTerminal.CodigoTarifaLocal = item.CodigoTarifaLocal;
                    tarifaLocalTerminal.CodigoSucursal = item.CodigoSucursal;
                    tarifaLocalTerminal.CodigoAlmacen = item.CodigoAlmacen;
                    tarifaLocalTerminal.Accion = item.Accion;
                    requestRegistrarTarifa.ListaTarifaLocalSucursalTerminal.Add(tarifaLocalTerminal);
                }
            }
            return requestRegistrarTarifa;
        }

        /// <summary>
        /// Busqueda de acuerdo comercial local
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaACLocalViewModel BusquedaACLocal(RequestBusquedaACLocallViewModel request)
        {
            var responseBusquedaACLocalViewModel = new ResponseBusquedaACLocalViewModel();
            try
            {
                var requestAgente = new RequestBusquedaACLocal
                {
                    CodigoAcuerdoComercialLocal = request.filtro.CodigoAcuerdoComercialLocal != null ? Convert.ToInt32(request.filtro.CodigoAcuerdoComercialLocal) : 0,
                    CodigoCliente = request.filtro.CodigoCliente,
                    CodigoContenedor = request.filtro.CodigoContenedor,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoRA = request.filtro.CodigoRA,
                    NumeroBL = request.filtro.NumeroBL,
                    ListaRolSAP = request.filtro.ListaRolSAP,
                    //CodigoRolSAP = request.filtro.CodigoRolSAP,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaACLocal = new TransmisionesProxyrest().BusquedaACLocal(requestAgente);
                if (listaACLocal.AcuerdoComercialLocalList.Count > 0)
                {
                    responseBusquedaACLocalViewModel.CantidadPaginas = listaACLocal.CantidadPaginas;
                    responseBusquedaACLocalViewModel.TotalRegistros = listaACLocal.TotalRegistros;
                    responseBusquedaACLocalViewModel.NroPagina = listaACLocal.NroPagina;
                    responseBusquedaACLocalViewModel.Result = listaACLocal.Result;
                    foreach (var item in listaACLocal.AcuerdoComercialLocalList)
                    {
                        var objet = new ListaAcuerdoComercialLocalViewModel();
                        objet.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                        objet.NroRA = item.NroRA;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        responseBusquedaACLocalViewModel.AcuerdoComercialLocalList.Add(objet);
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
        /// Busqueda de documento origen
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaDocumentoOrigen BusquedaDocumentoOrigen(RequestBusquedaDocumentoOrigenViewModel request)
        {
            var responseBusquedaACLocalViewModel = new ResponseBusquedaDocumentoOrigen();
            try
            {
                var requestAgente = new RequestBusquedaDocumentoOrigen
                {
                    CodNave = request.filtro.CodNave,
                    NumViaje = request.filtro.NumViaje,
                    PuertoOrigen = request.filtro.PuertoOrigen,
                    PuertoEmbarque = request.filtro.PuertoEmbarque,
                    PuertoDesembarque = request.filtro.PuertoDesembarque,
                    DestinoFinal = request.filtro.DestinoFinal,
                    CodLinea = request.filtro.CodLinea,
                    NroBL = request.filtro.NroBL,
                    TipoBL = null,//request.filtro.TipoBL,
                    CodContenedor = request.filtro.CodContenedor,
                    TipoDocumento = request.filtro.TipoDocumento,
                    NroBkn = request.filtro.NroBkn,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                responseBusquedaACLocalViewModel = new TransmisionesProxyrest().BusquedaDocumentoOrigen(requestAgente);
            }
            catch (Exception ex)
            {
                responseBusquedaACLocalViewModel.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaACLocalViewModel;
        }

        public ResponseBusquedaServicioBl BusquedaServiciosBl(RequestBusquedaServicioBLViewModel request)
        {
            var responseBusquedaNaves = new ResponseBusquedaServicioBl();
            try
            {
                var requestAgente = new RequestConsultaServicioBL
                {
                    CodigoServicio = request.filtro.CodigoServicio,
                    NombreServicio = request.filtro.NombreServicio,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                responseBusquedaNaves = new TransmisionesProxyrest().BusquedaServiciosBl(requestAgente);

            }
            catch (Exception ex)
            {
                responseBusquedaNaves.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseBusquedaNaves;
        }

        /// <summary>
        /// Consultar historial AC Local
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseConsultaHistorialACLocalViewModel ConsultarHistorialACLocal(RequestHistorialACLocalViewModel request)
        {
            var responseHistorial = new ResponseConsultaHistorialACLocalViewModel();
            try
            {
                var requestAgente = new RequestConsultaHistorialACLocal
                {
                    CodigoAcuerdoComercialLocal = request.filtro.CodigoAcuerdoComercialLocal,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var responseTarifaPlana = new TransmisionesProxyrest().ConsultarHistorialACLocal(requestAgente);
                responseHistorial.CantidadPaginas = responseTarifaPlana.CantidadPaginas;
                responseHistorial.NroPagina = responseTarifaPlana.NroPagina;
                responseHistorial.Result = responseTarifaPlana.Result;
                responseHistorial.TotalRegistros = responseTarifaPlana.TotalRegistros;

                foreach (var item in responseTarifaPlana.AcuerdoComercialLocalHistorialList)
                {
                    var objResponse = new AcuerdoComercialHistorialViewModel();
                    objResponse.CodigoAcuerdoComercialLocalHistorial = item.CodigoAcuerdoComercialLocalHistorial;
                    objResponse.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                    objResponse.Usuario = item.Usuario;
                    objResponse.FechaHora = String.Format("{0:MM/dd/yyyy hh:mm}", item.FechaHora);
                    objResponse.Accion = item.Accion;
                    objResponse.Descripcion = item.Descripcion;
                    responseHistorial.AcuerdoComercialLocalHistorialList.Add(objResponse);
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
        /// Seguimiento de acuerdo comercial local
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseSeguimientoACLocalViewModel SeguimientoAcLocal(RequestSeguimientoACLocalViewModel request)
        {
            var responseSeguimiento = new ResponseSeguimientoACLocalViewModel();
            try
            {
                var requestSeguimiento = new RequestSeguimientoACLocal
                {
                    CodigoAcuerdoComercialLocal = request.filtro.CodigoAcuerdoComercialLocal != null ? Convert.ToInt32(request.filtro.CodigoAcuerdoComercialLocal) : 0,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoRA = request.filtro.CodigoRA,
                    NumeroBL = request.filtro.NumeroBL,
                    //CodigoRol = request.filtro.CodigoRol,
                    ListaRolSAP = request.filtro.ListaRolSAP,
                    Estado = request.filtro.Estado,
                    CodigoCliente = request.filtro.CodigoCliente,
                    CodigoContenedor = request.filtro.CodigoContenedor,
                    UsuarioCreacion = request.filtro.UsuarioCreacion,
                    UsuarioAprobacion = request.filtro.UsuarioAprobacion,
                    FechaInicio = request.filtro.FechaInicio,
                    FechaFin = request.filtro.FechaFin,

                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var listaResult = new TransmisionesProxyrest().SeguimientoAcLocal(requestSeguimiento);
                if (listaResult.SeguimientoAcuerdoComercialLocalList.Count > 0)
                {
                    responseSeguimiento.CantidadPaginas = listaResult.CantidadPaginas;
                    responseSeguimiento.TotalRegistros = listaResult.TotalRegistros;
                    responseSeguimiento.NroPagina = listaResult.NroPagina;
                    responseSeguimiento.Result = listaResult.Result;
                    foreach (var item in listaResult.SeguimientoAcuerdoComercialLocalList)
                    {
                        var objet = new SeguimientoAcuerdoComercialLocalViewModel();
                        objet.CodigoAcuerdoComercialLocal = item.CodigoAcuerdoComercialLocal;
                        objet.NroRA = item.NroRA;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        objet.Estado = item.DescripcionEstado;
                        responseSeguimiento.SeguimientoAcuerdoComercialLocalList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseSeguimiento.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseSeguimiento;
        }

        /// <summary>
        /// Seguimiento de acuerdo comercial Escalonado
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseSeguimientoACEscalonadoViewModel SeguimientoAcEscalonado(RequestSeguimientoACEscalonadoViewModel request)
        {
            var responseSeguimientp = new ResponseSeguimientoACEscalonadoViewModel();
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


                var requestSeguimiento = new RequestSeguimientoACEscalonado
                {
                    CodigoAcuerdoComercialEscalonado = request.filtro.CodigoAcuerdoComercialEscalonado != null ? Convert.ToInt32(request.filtro.CodigoAcuerdoComercialEscalonado) : 0,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoRA = request.filtro.CodigoRA,
                    NumeroBL = request.filtro.NumeroBL,
                    //CodigoRol = request.filtro.CodigoRol,
                    ListaClienteMatchCode = LstclienteMatchCode,
                    ListaRolSAP = request.filtro.ListaRolSAP,
                    Estado = request.filtro.Estado,
                    CodigoCliente = request.filtro.CodigoCliente,
                    CodigoContenedor = request.filtro.CodigoContenedor,
                    UsuarioCreacion = request.filtro.UsuarioCreacion,
                    UsuarioAprobacion = request.filtro.UsuarioAprobacion,
                    FechaInicio = request.filtro.FechaInicio,
                    FechaFin = request.filtro.FechaFin,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var listaACLocal = new TransmisionesProxyrest().SeguimientoAcEscalonado(requestSeguimiento);
                if (listaACLocal.SeguimientoAcuerdoComercialEscalonadoList.Count > 0)
                {
                    responseSeguimientp.CantidadPaginas = listaACLocal.CantidadPaginas;
                    responseSeguimientp.TotalRegistros = listaACLocal.TotalRegistros;
                    responseSeguimientp.NroPagina = listaACLocal.NroPagina;
                    responseSeguimientp.Result = listaACLocal.Result;
                    foreach (var item in listaACLocal.SeguimientoAcuerdoComercialEscalonadoList)
                    {
                        var objet = new SeguimientoAcuerdoComercialEscalonadoViewModel();
                        objet.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                        objet.NroRA = item.NroRA;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        objet.Estado = item.DescripcionEstado;
                        responseSeguimientp.SeguimientoAcuerdoComercialEscalonadoList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseSeguimientp.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseSeguimientp;
        }

        /// <summary>
        /// Busqueda de acuerdo comercial escalonado
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaACEscalonadoViewModel BusquedaAcEscalonado(RequestBusquedaACEscalonadoViewModel request)
        {
            var responseViewModel = new ResponseBusquedaACEscalonadoViewModel();
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

                var requestAgente = new RequestBusquedaACEscalonado
                {
                    CodigoAcuerdoComercialEscalonado = request.filtro.CodigoAcuerdoComercialEscalonado != null ? Convert.ToInt32(request.filtro.CodigoAcuerdoComercialEscalonado) : 0,
                    CodigoCliente = request.filtro.CodigoCliente,
                    ListaClienteMatchCode = LstclienteMatchCode,
                    CodigoContenedor = request.filtro.CodigoContenedor,
                    CodigoLinea = request.filtro.CodigoLinea,
                    CodigoRA = request.filtro.CodigoRA,
                    NumeroBL = request.filtro.NumeroBL,
                    ListaRolSAP = request.filtro.ListaRolSAP,
                    Estado = "E",
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaACLocal = new TransmisionesProxyrest().BusquedaAcEscalonado(requestAgente);
                if (listaACLocal.AcuerdoComercialEscalonadoList.Count > 0)
                {
                    responseViewModel.CantidadPaginas = listaACLocal.CantidadPaginas;
                    responseViewModel.TotalRegistros = listaACLocal.TotalRegistros;
                    responseViewModel.NroPagina = listaACLocal.NroPagina;
                    responseViewModel.Result = listaACLocal.Result;
                    foreach (var item in listaACLocal.AcuerdoComercialEscalonadoList)
                    {
                        var objet = new ListaAcuerdoComercialEscalonadoViewModel();
                        objet.CodigoAcuerdoComercialEscalonado = item.CodigoAcuerdoComercialEscalonado;
                        objet.NroRA = item.NroRA;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        responseViewModel.AcuerdoComercialEscalonadoList.Add(objet);
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

        /// <summary>
        /// Actualizar Tarifa Escalonada
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseRegistrarTarifaEscalonada ActualizarTarifaEscalonada(RequestActualizarTarifaEscalonadaViewModel request)
        {
            var responseRegistroTarifa = new ResponseRegistrarTarifaEscalonada();
            try
            {
                var requestAgente = SetRequestActualizarTarifaEscalonada(request);
                responseRegistroTarifa = new TransmisionesProxyrest().ActualizarTarifaEscalonada(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroTarifa.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroTarifa;
        }

        private RequestActualizarTarifaEscalonada SetRequestActualizarTarifaEscalonada(RequestActualizarTarifaEscalonadaViewModel request)
        {
            RequestActualizarTarifaEscalonada requestRegistrarTarifa = new RequestActualizarTarifaEscalonada();
            requestRegistrarTarifa.CodigoTarifaEscalonada = request.CodigoTarifaEscalonada;
            requestRegistrarTarifa.CodigoRegimen = request.CodigoRegimen;
            requestRegistrarTarifa.CodigoTarifa = request.CodigoTarifa;
            requestRegistrarTarifa.CodigoConcepto = request.CodigoConcepto;
            requestRegistrarTarifa.CodigoLinea = request.CodigoLinea;
            requestRegistrarTarifa.CodigoUnidadCalculo = request.CodigoUnidadCalculo;
            requestRegistrarTarifa.CodigoUsuarioAutorizador = request.CodigoUsuarioAutorizador;
            requestRegistrarTarifa.Usuario = request.UsuarioActualizacion;
            requestRegistrarTarifa.Accion = request.Accion;
            requestRegistrarTarifa.EstadoRegistro = request.EstadoRegistro == "Activo";
            requestRegistrarTarifa.ValidarTarifaEnAC = request.ValidarTarifaEnAC;
            requestRegistrarTarifa.ListaTarifaEscalonadaPeriodo = new List<TarifaEscalonadaPeriodoDTO>();
            requestRegistrarTarifa.ListaTarifaEscalonadaSucursal = new List<TarifaEscalonadaSucursalDTO>();
            requestRegistrarTarifa.ListaTarifaEscalonadaVigencia = new List<TarifaEscalonadaVigenciaDTO>();

            #region Periodo
            foreach (var item in request.ListaTarifaEscalonadaPeriodo)
            {
                TarifaEscalonadaPeriodoDTO tarifaLocalVigencia = new TarifaEscalonadaPeriodoDTO();

                tarifaLocalVigencia.CodigoMoneda = item.CodigoMoneda;
                tarifaLocalVigencia.CodigoPeriodo = item.CodigoPeriodo;
                tarifaLocalVigencia.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                tarifaLocalVigencia.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                tarifaLocalVigencia.CodigoTipoContenedor = item.CodigoTipoContenedor;
                tarifaLocalVigencia.DescripcionMoneda = item.DescripcionMoneda;
                tarifaLocalVigencia.NumeroDias = item.NumeroDias;
                tarifaLocalVigencia.Precio = item.Precio;
                tarifaLocalVigencia.Accion = item.Accion;
                requestRegistrarTarifa.ListaTarifaEscalonadaPeriodo.Add(tarifaLocalVigencia);
            }
            #endregion
            #region Sucursal
            foreach (var item in request.ListaTarifaEscalonadaSucursal)
            {
                TarifaEscalonadaSucursalDTO tarifaLocalSucursal = new TarifaEscalonadaSucursalDTO();
                tarifaLocalSucursal.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                tarifaLocalSucursal.CodigoSucursal = item.CodigoSucursal;
                tarifaLocalSucursal.Nombre = item.Nombre;
                tarifaLocalSucursal.Accion = item.Accion;
                requestRegistrarTarifa.ListaTarifaEscalonadaSucursal.Add(tarifaLocalSucursal);
            }
            #endregion
            #region Vigencia
            foreach (var item in request.ListaTarifaEscalonadaVigencia)
            {
                TarifaEscalonadaVigenciaDTO oVigencia = new TarifaEscalonadaVigenciaDTO();
                oVigencia.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                oVigencia.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                oVigencia.InicioVigencia = item.InicioVigencia;
                oVigencia.CodigoTipoFechaCalculo = item.CodigoTipoFechaCalculo;
                oVigencia.DiasDelayCalculo = item.DiasDelayCalculo;
                oVigencia.CodigoTipoDiaCalculo = item.CodigoTipoDiaCalculo;
                oVigencia.CodigoTipoCobro = item.CodigoTipoCobro;
                oVigencia.UsuarioActualizacion = request.UsuarioActualizacion;
                oVigencia.FechaHoraActualizacion = DateTime.Now;
                oVigencia.EstadoRegistro = item.EstadoRegistro;
                oVigencia.Accion = item.Accion;

                requestRegistrarTarifa.ListaTarifaEscalonadaVigencia.Add(oVigencia);
            }
            #endregion
            #region Ligada
            foreach (var itemLigada in request.ListaTarifaEscalonadaLigada)
            {
                TarifaEscalonadaLigadaDTO tarifaLocalLigada = new TarifaEscalonadaLigadaDTO();
                tarifaLocalLigada.CodigoTarifaLigadaLocal = itemLigada.CodigoTarifaLigadaEscalonada;
                tarifaLocalLigada.CodigoTarifaEscalonadaVigencia = itemLigada.CodigoTarifaEscalonadaVigencia;
                tarifaLocalLigada.CodigoTarifaEscalonada = itemLigada.CodigoTarifaEscalonada;
                tarifaLocalLigada.CodigoConfiguracionTarifaLigada = itemLigada.CodigoConfiguracionTarifaLigada;
                tarifaLocalLigada.Porcentaje = Convert.ToDecimal(itemLigada.Porcentaje);
                tarifaLocalLigada.CodigoMoneda = itemLigada.CodigoMoneda;
                tarifaLocalLigada.Moneda = itemLigada.Moneda;
                tarifaLocalLigada.Monto = Convert.ToDecimal(itemLigada.Monto);
                tarifaLocalLigada.Accion = itemLigada.Accion;
                requestRegistrarTarifa.ListaTarifaEscalonadaLigada.Add(tarifaLocalLigada);
            }
            #endregion
            return requestRegistrarTarifa;
        }

        /// <summary>
        /// Reporte de Tarifas escalonadas
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseReporteTarifaEscalonadaViewModel ReporteTarifaEscalonada(RequestReporteTarifaEscalonadaViewModel request)
        {
            var responseTarifaPlana = new ResponseReporteTarifaEscalonadaViewModel();
            try
            {
                var requestAgente = new RequestReporteTarifaEscalonada
                {
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoMoneda = request.filtro.CodigoMoneda,
                    CodigoLinea = request.filtro.CodigoLinea,
                    FlagVigente = request.filtro.FlagVigente,
                    CodigoTarifaEscalonada = request.filtro.CodigoTarifaEscalonada ?? 0,

                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var listaTarifa = new TransmisionesProxyrest().ReporteTarifaEscalonada(requestAgente);
                if (listaTarifa.ReporteTarifaEscalonadaList.Count > 0)
                {
                    responseTarifaPlana.CantidadPaginas = listaTarifa.CantidadPaginas;
                    responseTarifaPlana.TotalRegistros = listaTarifa.TotalRegistros;
                    responseTarifaPlana.NroPagina = listaTarifa.NroPagina;
                    responseTarifaPlana.Result = listaTarifa.Result;
                    foreach (var item in listaTarifa.ReporteTarifaEscalonadaList)
                    {
                        var objet = new ReporteTarifaEscalonadaViewModel();
                        objet.CodigoLinea = item.CodigoLinea;
                        objet.DescripcionLinea = item.DescripcionLinea;
                        objet.CodigoConcepto = item.CodigoConcepto;
                        objet.CodigoTarifa = item.CodigoTarifa;
                        objet.DescripcionTarifa = item.DescripcionTarifa;
                        objet.CodigoMoneda = item.CodigoMoneda;
                        objet.DescripcionMoneda = item.DescripcionMoneda;
                        objet.CodigoSucursal = item.CodigoSucursal;
                        objet.Sucursal = item.Sucursal;
                        //objet.VigenciaDesde = string.Format("{0:dd/MM/yyyy}", item.VigenciaDesde);
                        //objet.VigenciaHasta = string.Format("{0:dd/MM/yyyy}", item.VigenciaHasta);
                        objet.CodigoPeriodo = item.CodigoPeriodo;
                        objet.CodigoTipoContenedor = item.CodigoTipoContenedor;
                        objet.NumeroDias = item.NumeroDias;
                        objet.Monto = item.Monto;
                        if (item.CodigoTarifaLigadaLocal != null)
                        {
                            objet.CodigoTarifaLigadaLocal = item.CodigoTarifaLigadaLocal.Value;
                        }
                        objet.CodigoConceptoTarifaLigadaLocal = item.CodigoConceptoTarifaLigadaLocal;
                        objet.CodigoTarifaTarifaLigadaLocal = item.CodigoTarifaTarifaLigadaLocal;
                        objet.DescripcionTarifaTarifaLigadaLocal = item.DescripcionTarifaTarifaLigadaLocal;
                        objet.MontoLigado = item.MontoLigado;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraCreacion);
                        responseTarifaPlana.ReporteTarifaEscalonadaList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseTarifaPlana.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaPlana;
        }

        /// <summary>
        /// Busqueda de Tarifas Locales
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseReporteTarifaLocalViewModel ReporteTarifaLocal(RequestReporteTarifaLocalViewModel request)
        {
            var responseTarifaPlana = new ResponseReporteTarifaLocalViewModel();
            try
            {
                var requestAgente = new RequestReporteTarifaLocal
                {
                    CodigoSucursal = request.filtro.CodigoSucursal,
                    CodigoMoneda = request.filtro.CodigoMoneda,
                    CodigoLinea = request.filtro.CodigoLinea,
                    FlagVigente = request.filtro.FlagVigente,
                    CodigoTarifaLocal = request.filtro.CodigoTarifaLocal ?? 0,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };
                var listaTarifa = new TransmisionesProxyrest().ReporteTarifaLocal(requestAgente);
                if (listaTarifa.ReporteTarifaLocalList.Count > 0)
                {
                    responseTarifaPlana.CantidadPaginas = listaTarifa.CantidadPaginas;
                    responseTarifaPlana.TotalRegistros = listaTarifa.TotalRegistros;
                    responseTarifaPlana.NroPagina = listaTarifa.NroPagina;
                    responseTarifaPlana.Result = listaTarifa.Result;
                    foreach (var item in listaTarifa.ReporteTarifaLocalList)
                    {
                        var objet = new ReporteTarifaLocalViewModel();
                        objet.CodigoLinea = item.CodigoLinea;
                        objet.DescripcionLinea = item.DescripcionLinea;
                        objet.CodigoTarifaLocal = item.CodigoTarifaLocal;
                        objet.CodigoConcepto = item.CodigoConcepto;
                        objet.CodigoTarifa = item.CodigoTarifa;
                        objet.DescripcionTarifa = item.DescripcionTarifa;
                        objet.CodigoMoneda = item.CodigoMoneda;
                        objet.DescripcionMoneda = item.DescripcionMoneda;
                        objet.Monto = item.Monto;
                        objet.CodigoSucursal = item.CodigoSucursal;
                        objet.Sucursal = item.Sucursal;
                        objet.VigenciaDesde = string.Format("{0:dd/MM/yyyy}", item.VigenciaDesde);
                        objet.VigenciaHasta = string.Format("{0:dd/MM/yyyy}", item.VigenciaHasta);
                        objet.CodigoTerminalPortuario = item.CodigoTerminalPortuario;
                        objet.TerminalPortuario = item.TerminalPortuario;
                        objet.CodigoTarifaLigadaLocal = item.CodigoTarifaLigadaLocal;
                        objet.CodigoConceptoTarifaLigada = item.CodigoConceptoTarifaLigada;
                        objet.CodigoTarifaTarifaLigada = item.CodigoTarifaTarifaLigada;
                        objet.DescripcionTarifaTarifaLigada = item.DescripcionTarifaTarifaLigada;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", item.FechaHoraCreacion);
                        responseTarifaPlana.ReporteTarifaLocalList.Add(objet);
                    }
                }
            }
            catch (Exception ex)
            {
                responseTarifaPlana.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaPlana;
        }

        public ResponseConsultaLigadaPeriodoTarifaEscalonadaViewModel ConsultarLigadasPeriodosTarifaEscalonada(int codigoTarifaEscalonadaVigencia, string codigoLinea)
        {
            var responseTarifaEscalonada = new ResponseConsultaLigadaPeriodoTarifaEscalonadaViewModel();
            try
            {
                var requestAgente = new RequestConsultaTarifaEscalonadaLigadaXVigenciaLigada();
                requestAgente.CodigoTarifaEscalonadaVigencia = codigoTarifaEscalonadaVigencia;
                requestAgente.CodigoLinea = codigoLinea;
                var response = new TransmisionesProxyrest().ConsultarLigadasPeriodosTarifaEscalonada(requestAgente);
                responseTarifaEscalonada.Result = response.Result;
                if (response.Result.Satisfactorio)
                {
                    var count = 1;
                    #region Ligada
                    foreach (var item in response.TarifaEscalonadaLigadaList)
                    {
                        var ligada = new ConsultaDetalleTarifaEscalonadaLigadaViewModel();
                        ligada.IdConfiguracionTarifaLigada = count;
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
                        responseTarifaEscalonada.TarifaEscalonadaLigadaList.Add(ligada);
                        count++;
                    }
                    #endregion
                    count = 1;
                    #region Periodo
                    foreach (var item in response.TarifaEscalonadaPeriodoList)
                    {
                        var periodo = new ConsultaDetalleTarifaEscalonadaPeriodoViewModel();
                        periodo.IdPeriodo = count;
                        periodo.CodigoTarifaEscalonadaVigencia = item.CodigoTarifaEscalonadaVigencia;
                        periodo.CodigoTarifaEscalonada = item.CodigoTarifaEscalonada;
                        periodo.CodigoTipoContenedor = item.CodigoTipoContenedor;
                        periodo.CodigoPeriodo = item.CodigoPeriodo;
                        periodo.NumeroDias = item.NumeroDias;
                        periodo.CodigoMoneda = item.CodigoMoneda;
                        periodo.Moneda = item.DescripcionMoneda;
                        periodo.Precio = item.Precio;
                        periodo.CodigoClaseContenedor = item.CodigoClaseContenedor;
                        periodo.ClaseContenedor = item.ClaseContenedor;
                        periodo.Accion = "U";
                        responseTarifaEscalonada.TarifaEscalonadaPeriodoList.Add(periodo);
                        count++;
                    }
                    #endregion
                }
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaEscalonada;
        }

        public ResponseConsultaLigadasTarifaLocal ConsultaTarifaLigadaXVigencia(Int32 codigoTarifaLocalVigencia, string codigoLinea)
        {
            var responseTarifaPlana = new ResponseConsultaLigadasTarifaLocal();
            try
            {
                var requestAgente = new RequestConsultaTarifaLocalLigadaXVigencia();
                requestAgente.CodigoTarifaLocalVigencia = codigoTarifaLocalVigencia;
                requestAgente.CodigoLinea = codigoLinea;
                responseTarifaPlana = new TransmisionesProxyrest().ConsultaTarifaLigadaXVigencia(requestAgente);
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseTarifaPlana;
        }








    }
}