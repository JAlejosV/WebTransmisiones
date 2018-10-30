using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Web;
using System.Globalization;
using System.Web.Mvc;
using System.Xml;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Web.UI.WebControls;
using System.Net;

using GR.Frameworks;
using System.Web.Script.Serialization;
using GR.Msc.Memberships.Models;
using GR.Msc.Memberships.Agente.Response;
using GR.Msc.Memberships.Proxy;
using GR.Msc.Memberships.Agente.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
using GR.Msc.Memberships;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Memberships
{
    public static class HelperSeguridad
    {
        /// <summary>
        /// obtiene las páginas que no tiene acceso, el menu y los que si tiene acceso.
        /// </summary>
        /// <returns></returns>
        public static ResponseUsuarioMscDTO ObtenerSessionUsuarioMsc()
        {
            return (ResponseUsuarioMscDTO)HttpContext.Current.Session["usuario"];
        }
        
        public static bool VerificarPrivilegio(string codigo)
        {
            ResponseUsuarioMscDTO usuario = HelperSeguridad.ObtenerSessionUsuarioMsc();
            return usuario.Usuario.Permisos.Contains(codigo);
        }
        public static ResponseUsuarioMscDTO GetUsuario()
        {
            if (System.Web.HttpContext.Current.Session["Usuario"] != null)
            {
                return (ResponseUsuarioMscDTO)System.Web.HttpContext.Current.Session["usuario"];
            }
            else
            {
                //throw new Exception("No hay un usuario Loggeado");
                return null;
            }
        }
        public static string ObtenerJsonMenu()
        {
            try
            {
                var objResponse = new ResponseMenuPrincipalDTO();
                //obtengo los datos necesarios
                ResponseUsuarioMscDTO resp = (ResponseUsuarioMscDTO)System.Web.HttpContext.Current.Session["usuario"];
                if (resp == null)
                    throw new Exception("La sesión a expirado");

                ResponseInfoUsuarioDTO resp2 = (new SeguridadProxyRest()).TraerInformacionUsuario(new RequestInfoUsuario()
                {
                    IdPerfilUsuario = resp.Usuario.IdPerfilUsuario
                });
                //hago la tabla hash
                var tablaHash = new List<string>();
                HacerTablaHash(resp2.OpcionesUI, ref tablaHash);
                resp2.TablaHash = tablaHash;
                objResponse.MenuPrincipal = Newtonsoft.Json.JsonConvert.SerializeObject(resp2.OpcionesUI);
                objResponse.NombreUsuario = resp.Usuario.NombrePersona + " (" + resp.Usuario.RolDescripcion + ")";
                objResponse.EsExterno = resp.Usuario.esExterno;


                return Newtonsoft.Json.JsonConvert.SerializeObject(objResponse);

            }
            catch (Exception ex)
            {
                (new ManejadorLog()).RegistrarEvento(string.Format("{0}{1}{2}", ex.Message, Environment.NewLine, ex.StackTrace));
                return null;
            }

        }

        public static void HacerTablaHash(List<ResponseOpcionUI> menu, ref List<string> tablaHash)
        {
            if (menu != null && menu.Count > 0)
            {
                foreach (var item in menu)
                {
                    if (tieneHijos(item))
                    {
                        if (item.Url == "")
                            item.Url = "#";
                        //if (item.Opciones != null && item.Opciones.Where(x => x.Clase == "Menu").ToList().Count > 0)
                        if (item.Opciones != null && item.Opciones.Count > 0)
                        {
                            HacerTablaHash(item.Opciones, ref tablaHash);
                        }
                        //if (item.Clase != "Menu")
                        //{
                        //tablaHash.Add(item.Codigo);
                        tablaHash.Add(item.Url);
                        //}
                    }
                    else
                    {
                        tablaHash.Add(item.Url);
                    }
                }
            }
        }

        private static bool tieneHijos(ResponseOpcionUI menu)
        {
            //var menus = menu.Opciones.Where(x => x.Clase == "Menu").ToList();
            var menus = menu.Opciones;
            if (menus.Count > 0)
            {
                Boolean encontrado = false;
                foreach (var item in menu.Opciones)
                {
                    if (tieneHijos(item))
                    {
                        encontrado = true;
                        break;
                    }
                }
                return encontrado;
            }
            else
            {
                if (string.IsNullOrEmpty(menu.ControlPadre))
                {
                    return false;
                }
                else
                {
                    return (menu.Clase == "Menu" && !string.IsNullOrEmpty(menu.Url));
                }
            }
        }


        /*
        /// <summary>
        /// obtiene las páginas que no tiene acceso, el menu y los que si tiene acceso.
        /// </summary>
        /// <returns></returns>
        public static ResponseUsuarioDTO ObtenerSessionUsuarioScriptor()
        {
            ResponseUsuarioDTO usuarioDTO = new ResponseUsuarioDTO();
            if (HttpContext.Current.Session["usuario"] == null)
            {
                ScriptorClient scriptorClient = Common.ScriptorClient;

                string idCanalSeguridad = "8F1A74B3-D7DE-4143-AADA-8C1C55AFBC97";
                string idCanalUsuarios = "3D1EDDAC-516C-4729-B46D-79AECB6A5BAD";
                string idCanalMenu = "F82150B4-E905-4013-89EA-9A4383E98276";

                List<string> lstRoles = new List<string>();
                string nombrecampoCuentaRed = "CuentaRed";
                string rutaRelativaScriptor = "/ransa/portal/apiransa/";
                string idanonimo = "";
                string nombreusuarioRed = HelperSeguridad.GetUsuarioRed();
                string nombreusuario = "";
                string nombrerol = "";
                ScriptorChannel canalUsuarios = scriptorClient.GetChannel(new Guid(idCanalUsuarios));
                List<string> lstEstadoPublicado = new List<string>();
                lstEstadoPublicado.Add("Publicado");
                lstEstadoPublicado.Add("Publicado-OK");

                //scriptorClient.ScriptorObject.getXMLChannelContentFilteredListForExport(canalUsuarios.Id.ToString(), "0", "", "Publicado", "0", "1", "", "pt", "", "", "$$." + nombrecampoCuentaRed + "= '" + nombreusuarioRed + "'", "", "IdTipo,OtroMas:)", null, out n_total);
                List<ScriptorContent> lstCanalUsuarios = canalUsuarios.QueryContents("#Id", Guid.NewGuid(), "<>").QueryContents("#fk_workflowstate", lstEstadoPublicado, "IN").QueryContents(nombrecampoCuentaRed, nombreusuarioRed, "=").ToList();

                ScriptorContent _usuario = lstCanalUsuarios.FirstOrDefault();
                if (_usuario != null)
                {
                    nombreusuario = _usuario.Parts.Nombre;
                    ScriptorContentInsert lstRolesScriptor = ((ScriptorContentInsert)_usuario.Parts.Idtipo);
                    lstRoles = (from lst in lstRolesScriptor
                                select lst.Id.ToString() as String).ToList();
                    if (lstRoles.Count > 0)
                    {
                        lstRolesScriptor.ToList().ForEach(x =>
                        {
                            if (nombrerol == "")
                            {
                                nombrerol = x.Parts.descripcion.ToString();
                            }
                            else
                            {
                                nombrerol = nombrerol + ", " + x.Parts.descripcion.ToString();
                            }
                        });
                        //HtmlHelper html;

                        //html.ScriptorForm(
                    }
                }
                //anonimo
                idanonimo = "1AB83564-1204-4E3F-B514-902751ABB3E8";
                lstRoles.Add(idanonimo);


                ScriptorChannel canalSeguridad = scriptorClient.GetChannel(new Guid(idCanalSeguridad));


                List<ScriptorContent> lstCanalSeguridad = canalSeguridad.QueryContents("#Id", Guid.Empty, "<>").QueryContents("#fk_workflowstate", lstEstadoPublicado, "IN").QueryContents("Rol", lstRoles, "IN").ToList();
                List<ScriptorContent> lstCanalSeguridadNoPerm = canalSeguridad.QueryContents("#Id", Guid.Empty, "<>").QueryContents("#fk_workflowstate", lstEstadoPublicado, "IN").QueryContents("Rol", lstRoles, "NOT IN").ToList();

                List<string> urlsExistentes = new List<string>();
                List<string> urlsNoPermitidas = new List<string>();
                foreach (var reg in lstCanalSeguridad)
                {
                    foreach (ScriptorContent acceso in reg.Parts.Accesos)
                    {
                        string url = acceso.Channel.FriendlyPath.Replace("/" + acceso.Channel.Name.ToLower().Replace(" ", "_"), "");
                        url = url.Replace(rutaRelativaScriptor, "");
                        url = url.Replace("_", "-");
                        urlsExistentes.Add(url);
                        foreach (ScriptorContent content in acceso.Channel.Contents)
                        {
                            url = acceso.Channel.FriendlyPath + "/" + content.FriendlyTitle;
                            url = url.Replace(rutaRelativaScriptor, "");
                            url = url.Replace("_", "-");
                            urlsExistentes.Add(url);
                        }
                    }
                }
                foreach (var reg in lstCanalSeguridadNoPerm)
                {
                    foreach (ScriptorContent acceso in reg.Parts.Accesos)
                    {
                        string url = acceso.Channel.FriendlyPath.Replace("/" + acceso.Channel.Name.ToLower().Replace(" ", "_"), "");
                        url = url.Replace(rutaRelativaScriptor, "");
                        url = url.Replace("_", "-");
                        urlsNoPermitidas.Add(url);
                        foreach (ScriptorContent content in acceso.Channel.Contents)
                        {
                            url = acceso.Channel.FriendlyPath + "/" + content.FriendlyTitle;
                            url = url.Replace(rutaRelativaScriptor, "");
                            url = url.Replace("_", "-");
                            urlsNoPermitidas.Add(url);
                        }
                    }
                }

                urlsNoPermitidas.RemoveAll(x => urlsExistentes.Contains(x));

                ScriptorChannel canalMenu = scriptorClient.GetChannel(new Guid(idCanalMenu));
                ScriptorContentInsert menuHeader = canalMenu.Properties.Content.Parts.Menu;
                ScriptorContentInsert menuCentro = canalMenu.Properties.Content.Parts.MenuCentro;
                ScriptorContentInsert menuPie = canalMenu.Properties.Content.Parts.MenuPie;


                canalMenu.QueryContents("#Id", Guid.Empty, "<>").QueryContents("#fk_workflowstate", urlsExistentes, "IN").ToList();
                List<string> lstUrlMenu = new List<string>();
                string urlmenu = "";
                foreach (ScriptorContent reg in menuHeader)
                {
                    if (reg.Parts.EnlaceCanal.Count > 0)
                    {
                        ScriptorContentInsert sc0 = reg.Parts.EnlaceCanal;
                        urlmenu = sc0.ContentChannel.FriendlyPath.ToString();
                        urlmenu = urlmenu.Replace(rutaRelativaScriptor, "");
                        urlmenu = urlmenu.Replace("_", "-");
                        if (urlsExistentes.Contains(urlmenu))
                        {
                            lstUrlMenu.Add(urlmenu);
                        }
                    }
                    foreach (ScriptorContent subreg1 in reg.Parts.SubMenu)
                    {
                        if (subreg1.Parts.EnlaceCanal.Count > 0)
                        {
                            ScriptorChannel sc1 = ((ScriptorChannel)subreg1.Parts.EnlaceCanal[0]);
                            urlmenu = sc1.FriendlyPath.ToString();
                            urlmenu = urlmenu.Replace(rutaRelativaScriptor, "");
                            urlmenu = urlmenu.Replace("_", "-");
                            if (urlsExistentes.Contains(urlmenu))
                            {
                                lstUrlMenu.Add(urlmenu);
                            }
                        }
                        foreach (ScriptorContent subreg2 in subreg1.Parts.SubMenu)
                        {
                            if (subreg2.Parts.EnlaceCanal.Count > 0)
                            {
                                ScriptorChannel sc2 = ((ScriptorChannel)subreg2.Parts.EnlaceCanal[0]);
                                urlmenu = sc2.FriendlyPath.ToString();
                                urlmenu = urlmenu.Replace(rutaRelativaScriptor, "");
                                urlmenu = urlmenu.Replace("_", "-");
                                if (urlsExistentes.Contains(urlmenu))
                                {
                                    lstUrlMenu.Add(urlmenu);
                                }
                            }
                        }

                    }

                }
                usuarioDTO.Usuario = new UsuarioDTO()
                {
                    CuentaRed = nombreusuarioRed,
                    Nombre = nombreusuario
                };

                List<string> lst2 = urlsNoPermitidas;
                int max = lst2.Count;
                for (int i = 0; i < max; i++)
                {
                    urlsNoPermitidas.Add("/es-PE/" + lst2[i] + "/");
                }


                usuarioDTO.Permisos = urlsExistentes;
                usuarioDTO.NoPermisos = urlsNoPermitidas;
                usuarioDTO.Menu = lstUrlMenu;

                ManejadorLog log = new ManejadorLog();
                log.RegistrarEvento(Newtonsoft.Json.JsonConvert.SerializeObject(usuarioDTO));
                log.RegistrarEvento("Nombre Rol:" + nombrerol);

                if (String.IsNullOrEmpty(nombreusuario))
                {
                    try
                    {
                        using (var pctx = new PrincipalContext(ContextType.Domain, System.Configuration.ConfigurationManager.AppSettings["Dominio"].ToString()))
                        {
                            using (UserPrincipal up = UserPrincipal.FindByIdentity(pctx, Helper.HelperSeguridad.GetUsuarioRed()))
                            {
                                if (up != null)
                                {
                                    //oUsuario.Email = up.EmailAddress.TryToString(); 
                                    //datos.Add(up.DisplayName);
                                    //datos.Add(up.EmailAddress.ToString());
                                    nombreusuario = up.DisplayName;
                                }
                                else
                                {
                                    HelperEnviarCorreo.CrearLog("NO LOGIN IDENTITY: " + Helper.HelperSeguridad.GetUsuarioRed());
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        HelperEnviarCorreo.CrearLog("Error: " + Helper.HelperSeguridad.GetUsuarioRed() + " - " + ex.Message + "" + ex.StackTrace);
                        throw;
                    }
                }


                HttpContext.Current.Session["NombreUsuario"] = nombreusuario;
                HttpContext.Current.Session["NombreRol"] = nombrerol;
                HttpContext.Current.Session["usuario"] = usuarioDTO;
            }
            else
                usuarioDTO = (ResponseUsuarioDTO)HttpContext.Current.Session["usuario"];

            return usuarioDTO;
        }
        *  */
        public static string GetUsuarioRed()
        {
            return Convert.ToString(HttpContext.Current.Session["CodigoUsuario"]);
        }

        public static void SetUsuarioRed(string usuario)
        {
            HttpContext.Current.Session["CodigoUsuario"] = usuario;
        }
        internal static bool PerteneceCadena(object strcadenabuscar, string cadena)
        {
            if (cadena.Split(new Char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).ToList().Find(x => x.ToLower() == strcadenabuscar.ToString().ToLower()) != null)
                return true;
            else
                return false;
        }
        internal static bool PerteneceAsembliesScriptor(object ModuloControladora)
        {
            if (WebConfigReader.RegisteredModules.Split(new Char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).ToList().Find(x => x.ToLower() == ModuloControladora.ToString().ToLower()) != null)
                return true;
            else
                return false;
        }
    }
}
