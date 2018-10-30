using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Security;
using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships.Agente.BL;
using GR.Msc.Memberships.Agente.Request;
using GR.Msc.Memberships.Agente.Response;
using GR.Msc.Memberships.Models;
using Newtonsoft.Json;

namespace GR.Msc.Memberships.Controllers
{
    public class ModuloSeguridadGRController : Controller
    {
        //public ActionResult Index()
        //{
        //    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        //}
        public ActionResult CerrarSesion()
        {

            Session["CodigoUsuario"] = null;
            Session["NombreUsuario"] = null;
            Session["NombreRol"] = null;
            Session["usuario"] = null;

            Session.Abandon();
            Session.Clear();
            FormsAuthentication.SignOut();

            Response.Redirect("/");
            Response.End();

            return Json(new { success = true });
        }
       

        public virtual ActionResult Login(string usuario, string password)
        {

            SeguridadBL seguridadBL = new SeguridadBL();
            var hashPermisosBotones = new List<string>();
            try
            {
                //ContentResult loginResponse = (ContentResult)(new SeguridadController()).Login(usuario, password);
                //GR.Scriptor.Membership.Entidades.ResponseLoginUsuario responseLoginUsuario = Newtonsoft.Json.JsonConvert.DeserializeObject<GR.Scriptor.Membership.Entidades.ResponseLoginUsuario>(loginResponse.Content);
                //OBTENEMOS EL LOGIN
                ResponseLoginUsuario objLogin = seguridadBL.Login(new RequestLogin
                {
                    Clave = password,
                    CodigoUsuario = usuario
                });

                if (objLogin == null)
                    throw new Exception("Servicio Login no disponible.");

                if (objLogin.ResultadoLogin == false)
                    throw new Exception(objLogin.MensajeError);

                (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, Newtonsoft.Json.JsonConvert.SerializeObject(objLogin));

                //OBTENEMOS LOS DATOS DE SEGURIDAD DEL USUARIO
                ResponseInfoUsuarioDTO objInfo = seguridadBL.GetInformacionUsuario(objLogin.IdPerfilUsuario);

                (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, Newtonsoft.Json.JsonConvert.SerializeObject(objInfo));

                objInfo.IdPerfilUsuario = objLogin.IdPerfilUsuario;

                var tablaHash = new List<string>();

                List<ResponseOpcionUI> menuOrdenado = new List<ResponseOpcionUI>();
                seguridadBL.HacerTablaHash(objInfo.OpcionesUI, ref tablaHash, ref menuOrdenado, ref hashPermisosBotones);


                Session["usuario"] = new ResponseUsuarioMscDTO()
                {
                    Usuario = new UsuarioDTO()
                    {
                        IdUsuario = objInfo.IdUsuario,
                        IdPerfilUsuario = objLogin.IdPerfilUsuario,
                        CodigoCargo = objInfo.CodigoCargo,
                        CodigoUsuario = objInfo.CodigoUsuario,
                        Email = objInfo.Correo,
                        NombrePersona = objInfo.NombresCompletos.Split('(')[0],
                        NombreUsuario = objInfo.CodigoUsuario.Split('\\')[1],
                        Menu = menuOrdenado,
                        Recursos = objInfo.RecursosAdicionales,
                        Sedes = objInfo.Sedes,
                        //TipoReclamo = objInfo.TipoReclamo,
                        //Permisos = permisos,
                        Permisos = tablaHash,
                        RolDescripcion = objInfo.Roles[0].Descripcion,
                        esExterno = objInfo.TipoUsuario == "E" ? true : false,
                        TipoUsuario = objInfo.TipoUsuario,
                        Alias = objInfo.Alias,
                        PermisosBotones = hashPermisosBotones,
                        Roles = objInfo.Roles
                    },
                };
                FormsAuthentication.SetAuthCookie(objInfo.CodigoUsuario, false);
                return Json(new Result { Satisfactorio = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, ex.Message, ex.StackTrace);
                return Json(new Result { Satisfactorio = false, Mensaje = ex.Message, Data = hashPermisosBotones }, JsonRequestBehavior.AllowGet);
            }
        }

        public virtual ActionResult ObtenerMenus()
        {
            bool success = false;
            List<ResponseOpcionUI> menu = new List<ResponseOpcionUI>();
            string nombreUsuario = "";
            string rolUsuario = "";
            string email = "";
            string codigoUsuario = "";
            if (Session["usuario"] != null)
            {
                ResponseUsuarioMscDTO data = (ResponseUsuarioMscDTO)Session["usuario"];
                menu = data.Usuario.Menu;
                nombreUsuario = data.Usuario.NombrePersona;
                rolUsuario = data.Usuario.RolDescripcion;
                email = data.Usuario.Email;
                codigoUsuario = data.Usuario.CodigoUsuario;
                success = true;
            }
            return Json(new MenuDTO
            {
                Satisfactorio = success,
                MenuIzquierdo = menu,
                NombreUsuario = nombreUsuario,
                RolUsuario = rolUsuario,
                Email = email,
                CodigoUsuario = codigoUsuario
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SesionUsuario()
        {
            List<string> datos = new List<string>();
            string loginame = "";
            string datoserror = "";
            try
            {
                loginame = User.Identity.Name.Split('\\')[1];

                using (var pctx = new PrincipalContext(ContextType.Domain, "GRUPOCOGESA"))
                {
                    using (UserPrincipal up = UserPrincipal.FindByIdentity(pctx, loginame))
                    {
                        if (up != null)
                        {
                            //oUsuario.Email = up.EmailAddress.TryToString(); 
                            datos.Add(up.DisplayName);
                            datos.Add(up.EmailAddress.ToString());
                        }
                        else
                        {
                            datoserror = "NO LOGIN IDENTITY: " + loginame;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                datoserror = "NO LOGIN IDENTITY ERROR: " + loginame + " - " + e.Message;
                //HelperEnviarCorreo.CrearLog("NO LOGIN IDENTITY ERROR: " + loginame + " - " + e.Mensaje);
                datoserror += " - " + e.InnerException.ToString();
                //HelperEnviarCorreo.CrearLog(e.InnerException.ToString());
                datoserror += "  -" + e.Message;
                //HelperEnviarCorreo.CrearLog(e.Mensaje);
                datoserror += " - " + e.StackTrace;
                //HelperEnviarCorreo.CrearLog(e.StackTrace);

            }

            return Json(new { success = datos, error = datoserror }, JsonRequestBehavior.AllowGet);
        }

        public virtual ActionResult GetRolesUsuario()
        {
            try
            {
                var obRoles = new SeguridadBL().GetRolesUsuario(new RequestRol
                {
                    Acronimo = WebConfigReader.AcronimoAplicacion
                });
                return Json(new { Rol = obRoles.RolesUsuarioList, error = obRoles.Result }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, ex.Message, ex.StackTrace);

                return Json(new Result { Satisfactorio = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
