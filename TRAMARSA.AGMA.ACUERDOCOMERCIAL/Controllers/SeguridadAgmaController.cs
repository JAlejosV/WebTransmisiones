using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GR.Msc.Memberships.Models;
using GR.Msc.Memberships.Controllers;
using GR.Frameworks;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Seguridad;
using Newtonsoft.Json;
using System.Reflection;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using GR.Msc.Memberships.Agente.BL;
using GR.Msc.Memberships.Agente.Request;
using GR.Msc.Memberships;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using GR.Comun.DTO;
using System.Resources;


namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class SeguridadAgmaController : ModuloSeguridadGRController
    {
        public ActionResult BuscarUsuario()
        {
            return View("../Usuario/BuscarUsuario");
        }

        public ActionResult CambiarContrasena()
        {
            return View("../Usuario/CambiarContrasena");
        }

        //
        // GET: /SeguridadCalculadorWeb/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Seguridad()
        {
            return View("Seguridad");
        }
        public ActionResult RecuperarClave()
        {
            return View("RecuperarClave");
        }

        public override ActionResult Login(string usuario, string password)
        {
            var actionresult = base.Login(usuario, password);
            ResponseUsuarioMscDTO objUsuarioDto = (ResponseUsuarioMscDTO)GR.Frameworks.Helper.GetSession("usuario");
            if (objUsuarioDto != null)
            {
                ResponseUsuarioAgmaDTO objUsarioAgmaDto = new ResponseUsuarioAgmaDTO();
                objUsarioAgmaDto.Usuario =
                    GR.Frameworks.Helper.MiMapper<UsuarioDTO, UsuarioAgmaDTO>(objUsuarioDto.Usuario);
                objUsarioAgmaDto.Usuario.ListaCodigosLineas =
                    objUsuarioDto.Usuario.Recursos.FindAll(x => x.Descripcion.Contains("Lineas Tramarsa"))
                        .Select(x => x.Codigo)
                        .ToList();
                objUsarioAgmaDto.Usuario.ListaCodigosPuertos =
                   objUsuarioDto.Usuario.Recursos.FindAll(x => x.Descripcion.Contains("Puertos Internacionales"))
                       .Select(x => x.Codigo)
                       .ToList();

                objUsarioAgmaDto.Usuario.ListaCodigosSucursales =
                 objUsuarioDto.Usuario.Recursos.FindAll(x => x.Descripcion.Contains("Sucursales Tramarsa"))
                     .Select(x => x.Codigo)
                     .ToList();

                objUsarioAgmaDto.Usuario.CodigoUsuario = objUsuarioDto.Usuario.CodigoUsuario;
                objUsarioAgmaDto.Usuario.Menu = objUsuarioDto.Usuario.Menu;
                objUsarioAgmaDto.Usuario.Email = objUsuarioDto.Usuario.Email;
                objUsarioAgmaDto.Usuario.NombrePersona = objUsuarioDto.Usuario.NombrePersona;
                objUsarioAgmaDto.Usuario.RolDescripcion = objUsuarioDto.Usuario.RolDescripcion;
                GR.Frameworks.Helper.SetSession("usuarioCliente", objUsarioAgmaDto);
            }
            return actionresult;
        }

        public ActionResult BusquedaUsuarioIndex()
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            var busquedaUsuarioIndex = new ResponseBusquedaUsuarioIndexlViewModel();
            try
            {

                var responseListarLinea = new MaestrosAgente().ListarLinea();
                var responseListarRoles = new Agente.BL.SeguridadAgente().ObtenerRoles();

                busquedaUsuarioIndex.Linea = (from item in responseListarLinea.LineasList
                                              select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                busquedaUsuarioIndex.RolesUsuarioList = responseListarRoles.RolesUsuarioList;

                actionResult = Content(JsonConvert.SerializeObject(busquedaUsuarioIndex));
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("",
                    HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                        MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
            // var actionresult = base.GetRolesUsuario();
            //return actionresult;
        }
        public ActionResult BusquedaUsuario(RequestBusquedaUsuarioViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {


                if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                {
                    var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                    var idGrilla = rm.GetString("IdGrilla_BusquedaUsuarios");
                    filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestBusquedaUsuarioViewModel>(requestExportar);
                    if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                    filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                    filtros.paginacionDTO.rows = 9999;
                    filtros.paginacionDTO.page = 1;

                    var listUsuarios = new SeguridadBL().BusquedaUsuario(new RequestBusquedaUsuario
                    {
                        Usuario = filtros.filtro.NombreUsuario,
                        IdRol = filtros.filtro.IdRol,
                        Acronimo = WebConfigReader.AcronimoAplicacion,
                        ValorRecurso = filtros.filtro.CodigoLinea,
                        CodigoRecursoDetalle = "Lineas Tramarsa"
                    });

                    var responseUser = new ResponseBusquedaUsuarioViewModel
                    {
                        Result =
                        {
                            CodigoError = listUsuarios.Result.ErrCode,
                            IdError = listUsuarios.Result.IdError,
                            Mensaje = listUsuarios.Result.Message,
                            Satisfactorio = listUsuarios.Result.Success,
                            Mensajes = new List<Result>()
                        }
                    };
                    foreach (var user in listUsuarios.UsuarioXRecursoValorList)
                    {
                        var usuario = new ListaUsuarioViewModel
                        {
                            Acronimo = user.Acronimo,
                            CodigoRecurso = user.CodigoRecurso,
                            Conceder = user.Conceder,
                            CorreoUsuario = user.CorreoUsuario,
                            Descripcion = user.Descripcion,
                            Dominio = user.Dominio,
                            IdPerfilUsuario = user.IdPerfilUsuario,
                            IdRecursoDetalle = user.IdRecursoDetalle,
                            IdRecursoPerfil = user.IdRecursoPerfil,
                            IdUsuario = user.IdUsuario,
                            Nivel = user.Nivel,
                            NombreUsuario = user.NombreUsuario,
                            NombresCompletos = user.NombresCompletos,
                            RecursoPadre = user.RecursoPadre,
                            Tipo = user.Tipo
                        };
                        responseUser.UsuarioXRecursoValorList.Add(usuario);
                    }
                    responseUser.NroPagina = 1;
                    actionResult = HelperCtrl.ExportarExcel(responseUser, responseUser.UsuarioXRecursoValorList, filtros.paginacionDTO.IdGrilla, "NombresCompletos", Request.QueryString["export"], Response, "Lista_de_usuarios_");
                }
                else
                {
                    if (ModelState.IsValid)
                    {
                        var listUsuarios = new SeguridadBL().BusquedaUsuario(new RequestBusquedaUsuario
                        {
                            Usuario = filtros.filtro.NombreUsuario,
                            IdRol = filtros.filtro.IdRol,
                            Acronimo = WebConfigReader.AcronimoAplicacion,
                            ValorRecurso = filtros.filtro.CodigoLinea,
                            CodigoRecursoDetalle = "Lineas Tramarsa"
                        });

                        var responseUser = new ResponseBusquedaUsuarioViewModel
                        {
                            Result =
                            {
                                CodigoError = listUsuarios.Result.ErrCode,
                                IdError = listUsuarios.Result.IdError,
                                Mensaje = listUsuarios.Result.Message,
                                Satisfactorio = listUsuarios.Result.Success,
                                Mensajes = new List<Result>()
                            }
                        };
                        foreach (var user in listUsuarios.UsuarioXRecursoValorList)
                        {
                            var usuario = new ListaUsuarioViewModel
                            {
                                Acronimo = user.Acronimo,
                                CodigoRecurso = user.CodigoRecurso,
                                Conceder = user.Conceder,
                                CorreoUsuario = user.CorreoUsuario,
                                Descripcion = user.Descripcion,
                                Dominio = user.Dominio,
                                IdPerfilUsuario = user.IdPerfilUsuario,
                                IdRecursoDetalle = user.IdRecursoDetalle,
                                IdRecursoPerfil = user.IdRecursoPerfil,
                                IdUsuario = user.IdUsuario,
                                Nivel = user.Nivel,
                                NombreUsuario = user.NombreUsuario,
                                NombresCompletos = user.NombresCompletos,
                                RecursoPadre = user.RecursoPadre,
                                Tipo = user.Tipo
                            };
                            responseUser.UsuarioXRecursoValorList.Add(usuario);
                        }
                        int nroRegistros;

                        responseUser.TotalRegistros = responseUser.UsuarioXRecursoValorList.Count;
                        var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(responseUser.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                        responseUser.CantidadPaginas = totalPages;
                        var columnaOrden = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        if (string.IsNullOrWhiteSpace(columnaOrden))
                        {
                            columnaOrden = string.IsNullOrWhiteSpace(filtros.paginacionDTO.sidx) ? "NombresCompletos" : filtros.paginacionDTO.sidx;
                        }
                        filtros.paginacionDTO.HabilitarPaginacion = true;
                        responseUser.UsuarioXRecursoValorList = PaginacionBL.PaginarLista(responseUser.UsuarioXRecursoValorList, filtros.paginacionDTO, out nroRegistros, columnaOrden);
                        var res = Grid.toJSONFormat2(responseUser.UsuarioXRecursoValorList,
                                                     filtros.paginacionDTO.GetNroPagina(),
                                                      responseUser.TotalRegistros,
                                                      responseUser.CantidadPaginas, columnaOrden);
                        return Content(res);
                    }
                    else
                    {
                        var cadena = string.Empty;
                        var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
                        actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
                    }
                }


            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                                                            MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }
        /// <summary>
        /// Cambiar Contraseña
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ActionResult CambiarClaveUsuario(RequestCambiarClaveUsuarioViewModel request)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var response = new ResponseCambiarClaveUsuario();
                var usuario = Helpers.Helper.GetUsuarioCliente();
                if (usuario != null)
                {
                    request.Usuario = usuario.Usuario.CodigoUsuario.Split('\\')[1];
                }
                else
                {
                    request.Usuario = request.Usuario.Split('\\')[1];
                }
                if (!string.IsNullOrWhiteSpace(request.Usuario))
                {
                    response = new Agente.BL.SeguridadAgente().CambiarClaveUsuario(request);
                }
                else
                {
                    response.Result.Satisfactorio = false;
                    response.Result.Mensaje = "El nombre de usuario no es válido.";
                }
                actionResult = Content(JsonConvert.SerializeObject(response));
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("",
                    HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                        MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }
        /// <summary>
        /// Generar Contraseña
        /// </summary>
        /// <param name="Email"></param>
        /// <returns></returns>
        public ActionResult GenerarClaveUsuario(string Email)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                var response = new ResponseGenerarClaveUsuario();
                if (!string.IsNullOrWhiteSpace(Email))
                {
                    RequestGenerarClaveUsuarioViewModel request = new RequestGenerarClaveUsuarioViewModel();
                    request.Usuario = Email;
                    response = new Agente.BL.SeguridadAgente().GenerarClaveUsuario(request);
                }
                else
                {
                    response.Result.Satisfactorio = false;
                    response.Result.Mensaje = "El email no  es válido.";
                }
                actionResult = Content(JsonConvert.SerializeObject(response));
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("",
                    HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                        MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }


    }
}