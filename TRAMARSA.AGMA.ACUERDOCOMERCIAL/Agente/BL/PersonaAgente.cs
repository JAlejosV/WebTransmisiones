using GR.Frameworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL
{
    public class PersonaAgente
    {
        public ResponseRegistrarPersona RegistroPersona(RequestRegistrarPersonaViewModel request)
        {
            var responseRegistroPersona = new ResponseRegistrarPersona();
            try
            {
                var requestAgente = SetRequestGuardarPersona(request);
                responseRegistroPersona = new TransmisionesProxyrest().RegistrarPersona(requestAgente);
            }
            catch (Exception ex)
            {
                responseRegistroPersona.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return responseRegistroPersona;
        }

        private RegistrarPersonaDTO SetRequestGuardarPersona(RequestRegistrarPersonaViewModel request)
        {
            RegistrarPersonaDTO requestPersona = new RegistrarPersonaDTO();
            requestPersona.CodigoPersona = request.CodigoPersona;
            requestPersona.CodigoTipoDocumento = request.CodigoTipoDocumento;
            requestPersona.CodigoPais = request.CodigoPais;
            requestPersona.RazonSocialPersona = request.RazonSocialPersona;
            requestPersona.NumeroDocumentoPersona = request.NumeroDocumentoPersona;
            requestPersona.DireccionPersona = request.DireccionPersona;
            requestPersona.TelefonoPersona = request.TelefonoPersona;
            requestPersona.EmailPersona = request.EmailPersona;
            requestPersona.WebPersona = request.WebPersona;
            requestPersona.UsuarioCreacion = request.UsuarioCreacion;
            requestPersona.FechaHoraCreacion = request.FechaHoraCreacion;
            requestPersona.UsuarioActualizacion = request.UsuarioActualizacion;
            requestPersona.FechaHoraActualizacion = request.FechaHoraActualizacion;
            requestPersona.EstadoRegistro = request.EstadoRegistro;
            requestPersona.Accion = request.Accion;
            requestPersona.ListaPersonaRol = new List<PersonaRolRequestDTO>();

            foreach (var item in request.ListaPersonaRol)
            {
                if (!string.IsNullOrWhiteSpace(item.Accion))
                {
                    PersonaRolRequestDTO PersonaRol = new PersonaRolRequestDTO();
                    PersonaRol.CodigoPersona = item.CodigoPersona;
                    PersonaRol.CodigoRol = item.CodigoRol;
                    PersonaRol.NombreRol = item.NombreRol;
                    PersonaRol.CodigoAduanaPersonaRol = item.CodigoAduanaPersonaRol;
                    PersonaRol.Accion = item.Accion;
                    requestPersona.ListaPersonaRol.Add(PersonaRol);
                }
            }

            return requestPersona;
        }

        public ResponseBusquedaPersonaViewModel BusquedaPersona(RequestBusquedaPersonaViewModel request)
        {
            var responseViewModel = new ResponseBusquedaPersonaViewModel();
            try
            {
                var requestAgente = new RequestBusquedaPersona
                {
                    //CodigoPersona = request.filtro.CodigoPersona != null ? Convert.ToInt64(request.filtro.CodigoPersona) : 0,
                    CodigoPersona = request.filtro.CodigoPersona,
                    RazonSocialPersona = request.filtro.RazonSocialPersona,
                    NumeroDocumentoPersona = request.filtro.NumeroDocumentoPersona,
                    NroRegistrosPorPagina = request.paginacionDTO.rows,
                    OrdenCampo = request.paginacionDTO.sidx,
                    OrdenOrientacion = request.paginacionDTO.sord,
                    PaginaActual = request.paginacionDTO.page
                };

                var listaPersona = new TransmisionesProxyrest().BusquedaPersona(requestAgente);
                if (listaPersona.ListaPersona.Count > 0)
                {
                    responseViewModel.CantidadPaginas = listaPersona.CantidadPaginas;
                    responseViewModel.TotalRegistros = listaPersona.TotalRegistros;
                    responseViewModel.NroPagina = listaPersona.NroPagina;
                    responseViewModel.Result = listaPersona.Result;
                    foreach (var item in listaPersona.ListaPersona)
                    {
                        var objet = new ListaPersonaViewModel();
                        objet.CodigoPersona = item.CodigoPersona;
                        objet.RazonSocialPersona = item.RazonSocialPersona;
                        objet.NumeroDocumentoPersona = item.NumeroDocumentoPersona;
                        objet.NombreTipoDocumento = item.NombreTipoDocumento;
                        objet.NombrePais = item.NombrePais;
                        objet.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraCreacion);
                        objet.UsuarioCreacion = item.UsuarioCreacion;
                        objet.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy hh:mm tt}", item.FechaHoraActualizacion);
                        objet.UsuarioActualizacion = item.UsuarioActualizacion;
                        responseViewModel.ListaPersona.Add(objet);
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

        public ResponseConsultarDetallePersonaViewModel ConsultarDetallePersona(RequestConsultaDetallePersonaViewModel request)
        {
            var resp = new ResponseConsultarDetallePersonaViewModel();
            try
            {
                var requestConsulta = new RequestConsultaDetallePersona
                {
                    CodigoPersona = request.filtro.CodigoPersona
                };
                var response = new TransmisionesProxyrest().ConsultarDetallePersona(requestConsulta);
                resp.Result = response.Result;
                if (response.ListaDetallePersona.Count > 0)
                {
                    var datos = new DetallePersonaViewModel();
                    datos.CodigoPersona = response.ListaDetallePersona[0].CodigoPersona;
                    datos.CodigoTipoDocumento = response.ListaDetallePersona[0].CodigoTipoDocumento;
                    datos.CodigoPais = response.ListaDetallePersona[0].CodigoPais;
                    datos.NombrePais = response.ListaDetallePersona[0].NombrePais;
                    datos.RazonSocialPersona = response.ListaDetallePersona[0].RazonSocialPersona;
                    datos.NumeroDocumentoPersona = response.ListaDetallePersona[0].NumeroDocumentoPersona;
                    datos.DireccionPersona = response.ListaDetallePersona[0].DireccionPersona;
                    datos.TelefonoPersona = response.ListaDetallePersona[0].TelefonoPersona;
                    datos.NombreTipoDocumento = response.ListaDetallePersona[0].NombreTipoDocumento;
                    datos.EmailPersona = response.ListaDetallePersona[0].EmailPersona;
                    datos.ContactoPersona = response.ListaDetallePersona[0].ContactoPersona;
                    datos.WebPersona = response.ListaDetallePersona[0].WebPersona;
                    datos.UsuarioCreacion = response.ListaDetallePersona[0].UsuarioCreacion;
                    datos.FechaHoraCreacion = string.Format("{0:dd/MM/yyyy}", response.ListaDetallePersona[0].FechaHoraCreacion);
                    datos.UsuarioActualizacion = response.ListaDetallePersona[0].UsuarioActualizacion;
                    datos.FechaHoraActualizacion = string.Format("{0:dd/MM/yyyy}", response.ListaDetallePersona[0].FechaHoraActualizacion);
                    datos.EstadoRegistro = response.ListaDetallePersona[0].EstadoRegistro;
                    datos.Accion = "U";

                    #region Sucursales
                    List<long> LstMatchCodigoRoles = new List<long>();
                    var LstRoles = new MaestrosAgente().ListarRol().ListaRoles;
                    var responseListarRol = new MaestrosAgente().ListarRol();
                    var UnvRoles = (from item in responseListarRol.ListaRoles
                                    select HelperCtrl.MiMapper<ListaRolDTO, ListaRolViewModel>(item)).ToList();


                    foreach (var x in response.ListaDetallePersona[0].ListaPersonaRol)
                    {
                        var rol = new PersonaRolViewModel
                        {
                            CodigoPersona = x.CodigoPersona,
                            CodigoRol = x.CodigoRol,
                            NombreRol = x.NombreRol,
                            CodigoAduanaPersonaRol = x.CodigoAduanaPersonaRol,
                            Accion = x.Accion
                        };
                        datos.ListaPersonaRol.Add(rol);

                        LstMatchCodigoRoles.Add(x.CodigoRol);
                    }

                    LstRoles.ForEach(s =>
                    {
                        LstMatchCodigoRoles.Add(s.CodigoRol);
                    });

                    var ListaRol1 = LstMatchCodigoRoles.Distinct().ToList();
                    foreach (var item in ListaRol1)
                    {
                        var obj = UnvRoles.Where(x => x.CodigoRol == item).ToList();
                        if (obj.Count > 0)
                        {
                            datos.ListaRol.Add(obj[0]);
                        }
                    }
                    #endregion

                    resp.ListaDetallePersona.Add(datos);
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