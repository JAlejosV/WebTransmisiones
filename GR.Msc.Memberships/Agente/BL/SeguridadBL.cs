using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships.Agente.Request;
using GR.Msc.Memberships.Agente.Response;
using GR.Msc.Memberships.Models;
using GR.Msc.Memberships.Proxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace GR.Msc.Memberships.Agente.BL
{
    public class SeguridadBL
    {
        #region Solicitar o cambiar contraseña

        private Result ValidacionCambiarConstraseniaMSC(RequestCambioClave request)
        {
            try
            {
                switch (request.TipoCambioClave)
                {
                    case TipoCambioClave.Sys:
                        break;

                    case TipoCambioClave.Ui:

                        if (string.IsNullOrEmpty(request.ClaveAntigua) || string.IsNullOrEmpty(request.ClaveNueva) || string.IsNullOrEmpty(request.ClaveNuevaConfirmada))
                            throw new Exception("La contraseña no puede estar vacia.");

                        if (request.ClaveNueva != request.ClaveNuevaConfirmada)
                            throw new Exception("Contraseña nueva no coincide.");

                        break;
                }

                return new Result { Satisfactorio = true };
            }
            catch (Exception ex)
            {
                return new Result { Satisfactorio = false, Mensaje = ex.Message };
            }
        }

        public bool CambiarConstraseniaMSC(RequestCambioClave request)
        {
            bool done = false;

            Result result = this.ValidacionCambiarConstraseniaMSC(request);
            if (result.Satisfactorio == false)
                throw new Exception(result.Mensaje);

            SimpleInteroperableEncryption crypter = new SimpleInteroperableEncryption(WebConfigReader.SemillaEncriptacionPublica);

            string contraseniaGenerada = string.Empty;
            if (request.TipoCambioClave == TipoCambioClave.Sys)
            {
                contraseniaGenerada = Helper.GenerarContrasenia();
                request.ClaveAntigua = request.ClaveNuevaConfirmada = request.ClaveNueva = crypter.Encrypt(contraseniaGenerada);
            }
            else
            {
                //ENCRIPTAMOS LAS CONTRASEÑAS
                request.ClaveAntigua = crypter.Encrypt(request.ClaveAntigua);
                request.ClaveNueva = crypter.Encrypt(request.ClaveNueva);
                request.ClaveNuevaConfirmada = crypter.Encrypt(request.ClaveNuevaConfirmada);

            }
            request.Dominio = WebConfigReader.DominioAplicacion;
            request.Acronimo = WebConfigReader.AcronimoAplicacion;


            ResponseCambioClave response = (new SeguridadProxyRest()).CambiarClaveWeb(request);
            if (response.Result.Satisfactorio == false)
                throw new Exception(response.Result.Mensaje);

            //ENVIAMOS EL CORREO
            if (request.TipoCambioClave == TipoCambioClave.Sys)
                this.NotificarCambioConstraseniaMSC(response.CodigoUsuario, response.Correo, response.Nombres, contraseniaGenerada);

            done = true;

            return done;
        }

        private bool NotificarCambioConstraseniaMSC(string codigoUsuario, string correoPara, string razonSocial, string contrasenia)
        {
            HelperEnviarCorreo mailer = new HelperEnviarCorreo();
            bool sent = false;

            (new ManejadorLog()).RegistrarEvento("dentro de NotificarCambioConstraseniaMSC");

            (new ManejadorLog()).RegistrarEvento("antes de diccionario");

            Dictionary<string, string> valoresDictionary = new Dictionary<string, string> 
                { 
                    { "rsocial"       ,razonSocial    } ,
                    { "codigoUsuario" ,codigoUsuario      } ,
                    { "contrasenia"   ,contrasenia    } ,
                    { "_para_"        ,correoPara      } ,
                };

            (new ManejadorLog()).RegistrarEvento("despues de diccionario");

            (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, Newtonsoft.Json.JsonConvert.SerializeObject(valoresDictionary));

            //sent = mailer.EnviarCorreo("", "", valoresDictionary, "6EA5ABE3-9979-41FD-B9C8-D26F4233B9C0", "CDA200AD-EEF7-456F-B7A4-6E29E5B7D57E", "");

            (new ManejadorLog()).RegistrarEvento(string.Format("antes de diccionario: {0}", sent));

            //mailer.EnviarCorreo(contenidoNotificaciones.Parts.Asunto
            //                    , new List<string> { idUsuario }
            //                    , new List<string>()
            //                    , new List<string>()
            //                    , valoresDictionary
            //                    , contenidoNotificaciones.Parts.CorreoBody
            //                    , mailer.GetArchivosAdjuntos((ScriptorContentInsert)contenidoNotificaciones.Parts.ArchivosAdjuntos, WebConfigReader.PathFrontEnd)
            //                    , false);

            sent = true;

            return sent;
        }

        #endregion

        #region Registrar Usuario

        public bool RegistrarUsuario(string idContenido)
        {
            string idCanalContenido = "BB0AB61B-A166-4864-87F6-34E362E34736";
            string idCanalNotificaciones = "6EA5ABE3-9979-41FD-B9C8-D26F4233B9C0";
            string idContenidoNotificaciones = "82408486-0840-413B-A1EC-D2FC491A1A9D";
            string rutaFrontEnd = "";

            //return (new HelperEnviarCorreo()).EnviarCorreo(idCanalContenido, idContenido, null, idCanalNotificaciones, idContenidoNotificaciones, rutaFrontEnd);
            return false;
        }

        //public bool NotificarRegistrarUsuario(string idCanalContenido, string idContenido, string idCanalNotificaciones, string idContenidoNotificaciones, string rutaFrontEnd)
        //{
        //    HelperEnviarCorreo mailer = new HelperEnviarCorreo();

        //    ScriptorChannel canalNotificaciones = Common.ScriptorClient.GetChannel(new Guid(idCanalNotificaciones));
        //    ScriptorContent contenidoNotificaciones = canalNotificaciones.GetContent(new Guid(idContenidoNotificaciones));

        //    ScriptorChannel canalContenido = Common.ScriptorClient.GetChannel(new Guid(idCanalContenido));
        //    ScriptorContent contenido = canalContenido.GetContent(new Guid(idContenido));

        //    Dictionary<string, string> valoresDictionary = new Dictionary<string, string>();

        //    for (int x = 0; x < contenido.Parts.Keys.Count(); x++)
        //        valoresDictionary.Add(string.Format("{0}", contenido.Parts.Keys[x]), contenido.Parts.Keys[x]);

        //    mailer.From = contenidoNotificaciones.Parts.CorreoDe;
        //    mailer.EnviarCorreo("", "", valoresDictionary, "", "", "");
        //    //mailer.EnviarCorreo(contenidoNotificaciones.Parts.Asunto
        //    //                    , new List<string> { contenidoNotificaciones.Parts.CorreoPara }
        //    //                    , new List<string>()
        //    //                    , new List<string>()
        //    //                    , valoresDictionary
        //    //                    , contenidoNotificaciones.Parts.CorreoBody
        //    //                    , mailer.GetArchivosAdjuntos((ScriptorContentInsert)contenidoNotificaciones.Parts.ArchivosAdjuntos, WebConfigReader.PathFrontEnd)
        //    //                    , false);

        //    return true;

        //}

        #endregion

        #region Enviar Comentario

        //private Result ValidacionEnviarComentario(RequestEnviarComentario request)
        //{
        //    try
        //    {

        //        return new Result { Satisfactorio = true };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Result { Satisfactorio = false, Mensaje = ex.Mensaje };
        //    }
        //}

        //public bool EnviarComentario(RequestEnviarComentario request)
        //{
        //    bool done = false;

        //    Result result = this.ValidacionEnviarComentario(request);
        //    if (result.Satisfactorio == false)
        //        throw new Exception(result.Mensaje);

        //    //ENVIAMOS EL CORREO
        //    done = this.NotificarComentario(request);

        //    return done;
        //}

        //private bool NotificarComentario(RequestEnviarComentario request)
        //{
        //    HelperEnviarCorreo mailer = new HelperEnviarCorreo();
        //    bool sent = false;

        //    Dictionary<string, string> valoresDictionary = new Dictionary<string, string> 
        //        { 
        //            { "fechaRecepcion"    ,DateTime.Now.ToLongDateString() } ,
        //            { "nombreEmpresa"     ,request.RazonSocial } ,
        //            { "rucEmpresa"        ,request.RUC } ,
        //            { "nombreContacto"    ,request.NombreContacto } ,
        //            { "telefonoContacto"  ,request.Telefono } ,
        //            { "comentario"        ,request.Comentario } ,
        //        };

        //    sent = mailer.EnviarCorreo("", "", valoresDictionary, "6EA5ABE3-9979-41FD-B9C8-D26F4233B9C0", "267660E9-CCB3-4219-B419-001FEC4D6B3E", "");

        //    return sent;
        //}



        #endregion

        public ResponseInfoUsuarioDTO GetInformacionUsuario(string idPerfilUsuario)
        {
            return (new SeguridadProxyRest()).TraerInformacionUsuario(new RequestInfoUsuario { IdPerfilUsuario = idPerfilUsuario });
        }

        public ResponseLoginUsuario Login(RequestLogin request)
        {
            var crypt = new SimpleInteroperableEncryption(WebConfigReader.SemillaEncriptacionPublica);
            var dominio = WebConfigReader.DominioAplicacion;
            request.AcronimoAplicacion = WebConfigReader.AcronimoAplicacion;
            request.Clave = crypt.Encrypt(request.Clave);
            //request.Dominio = dominio.ToUpper();

            if (request.CodigoUsuario.IndexOf("\\") > -1)
            {
                request.Dominio = request.CodigoUsuario.Split('\\')[0].ToUpper();
                request.CodigoUsuario = request.CodigoUsuario.Split('\\')[1];
            }
            else
            {
                request.Dominio = dominio.ToUpper();
            }

            return (new SeguridadProxyRest()).Login(request);
        }

        //public ResponseMenuPrincipalDTO MenuPrincipal(String GUIDChannel)
        //{
        //    try
        //    {
        //        var objResponse = new ResponseMenuPrincipalDTO();
        //        //obtengo los datos necesarios
        //        ResponseUsuarioMscDTO resp = (ResponseUsuarioMscDTO)System.Web.HttpContext.Current.Session["usuario"];
        //        if (resp == null)
        //            throw new Exception("La sesión a expirado");

        //        ResponseInfoUsuarioDTO resp2 = (new SeguridadProxyRest()).TraerInformacionUsuario(new RequestInfoUsuario()
        //        {
        //            IdPerfilUsuario = resp.Usuario.IdPerfilUsuario
        //        });

        //        //hago la tabla hash
        //        var tablaHash = new List<string>();
        //        HacerTablaHash(resp2.OpcionesUI, ref tablaHash);
        //        resp2.TablaHash = tablaHash;

        //        //cargo el view
        //        ScriptorChannel channel = Common.ScriptorClient.GetChannel(new Guid(GUIDChannel));
        //        ResponseUsuarioMscDTO usuario = (ResponseUsuarioMscDTO)Helper.GetSession("usuario");
        //        if (usuario == null)
        //            throw new Exception("La sesión a expirado");

        //        var sc = channel.Properties.Content;
        //        //sc.Parts.algo = resp2.OpcionesUI;
        //        //List<ScriptorContent> ListaBeneficiosTotal = new List<ScriptorContent>();
        //        //sc.Parts.algo = ListaBeneficiosTotal;
        //        //cargo el view

        //        objResponse.MenuPrincipal = Newtonsoft.Json.JsonConvert.SerializeObject(resp2.OpcionesUI);

        //        //hago el menu derechco
        //        var menuder = new List<string>();
        //        var linkder = new List<string>();

        //        ScriptorContent mimodel1 = Common.ScriptorClient.GetChannel(new Guid("68A9CCA7-C327-41D2-8828-9FD8FECF12EA")).Properties.Content;

        //        foreach (ScriptorContent content in mimodel1.Parts.MenuOpcionesSeguridad)
        //        {
        //            if ((content.Parts.Enlace.ToString().IndexOf("cambiar-contrasena") > 0 && usuario.Usuario.esExterno) || content.Parts.Enlace.ToString().IndexOf("cambiar-contrasena") < 0)
        //            {
        //                menuder.Add(content.Parts.Titulo);
        //                linkder.Add(content.Parts.Enlace);
        //            }
        //        }



        //        //el nombre del usuario
        //        //objResponse.NombreUsuario = usuario.Usuario.NombrePersona.Substring(0, usuario.Usuario.NombrePersona.IndexOf("(")).Trim() + " (" + usuario.Usuario.RolDescripcion + ")";
        //        objResponse.NombreUsuario = usuario.Usuario.NombrePersona + " (" + usuario.Usuario.RolDescripcion + ")";
        //        objResponse.EsExterno = usuario.Usuario.esExterno;


        //        return objResponse;

        //    }
        //    catch (Exception ex)
        //    {
        //        (new ManejadorLog()).RegistrarEvento(string.Format("{0}{1}{2}", ex.Message, Environment.NewLine, ex.StackTrace));
        //        return null;
        //    }

        //}

        public void HacerTablaHash(List<ResponseOpcionUI> menu, ref List<string> tablaHash)
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

        public void HacerTablaHash(List<ResponseOpcionUI> menu, ref List<string> tablaHash, ref List<ResponseOpcionUI> MenuOrdenado, ref List<string> hashPermisosBotones)
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
                            List<ResponseOpcionUI> MenuOrdenadoHijo = new List<ResponseOpcionUI>();
                            HacerTablaHash(item.Opciones, ref tablaHash, ref MenuOrdenadoHijo, ref hashPermisosBotones);
                            item.Opciones = MenuOrdenadoHijo;
                        }
                        if (item.Clase.ToUpper() == "BOTON")
                        {
                            tablaHash.Add(item.Codigo);
                            hashPermisosBotones.Add(item.Codigo);
                        }
                        else
                        {
                            tablaHash.Add(item.Url);
                            MenuOrdenado.Add(item);
                        }
                    }
                    else
                    {
                        if (item.Clase.ToUpper() == "BOTON")
                        {
                            tablaHash.Add(item.Codigo);
                            hashPermisosBotones.Add(item.Codigo);
                        }
                        else
                        {
                            tablaHash.Add(item.Url);
                            MenuOrdenado.Add(item);
                        }

                    }
                }
            }
        }

        private bool tieneHijos(ResponseOpcionUI menu)
        {
            //var menus = menu.Opciones.Where(x => x.Clase == "Menu").ToList();
            var menus = menu.Opciones;
            if (menus.Count > 0)
            {
                Boolean encontrado = true;
                /*
                Boolean encontrado = false;
                foreach (var item in menu.Opciones)
                {
                    if (tieneHijos(item))
                    {
                        encontrado = true;
                        break;
                    }
                }
                 */
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

        public ResponseInfoBasicaUsuarioDTO GetInfoBasicaUsuariosByCodigo(List<string> request)
        {
            RequestInfoBasicaUsuarioDTO requestSeguridad = new RequestInfoBasicaUsuarioDTO
                {
                    CodigosUsuario = request
                };


            return (new SeguridadProxyRest()).GetInfoBasicaUsuariosByCodigo(requestSeguridad);
        }

        public bool ResetarContrasenia(RequestCambioClave request)
        {
            bool done = false;

            SimpleInteroperableEncryption crypter = new SimpleInteroperableEncryption(WebConfigReader.SemillaEncriptacionPublica);

            string contraseniaGenerada = Helper.GenerarContrasenia();
            request.ClaveAntigua = request.ClaveNuevaConfirmada = request.ClaveNueva = crypter.Encrypt(contraseniaGenerada);

            request.Dominio = WebConfigReader.DominioAplicacion;
            request.Acronimo = WebConfigReader.AcronimoAplicacion;
            request.TipoCambioClave = TipoCambioClave.Sys;

            ResponseCambioClave response = (new SeguridadProxyRest()).CambiarClaveWeb(request);
            if (response.Result.Satisfactorio == false)
                throw new Exception(response.Result.Mensaje);

            this.NotificarCambioConstraseniaMSC(response.CodigoUsuario, response.Correo, response.Nombres, contraseniaGenerada);

            done = true;

            return done;
        }

        public bool CambiarContrasenia(RequestCambioClave request)
        {
            bool done = false;

            SimpleInteroperableEncryption crypter = new SimpleInteroperableEncryption(WebConfigReader.SemillaEncriptacionPublica);

            //ENCRIPTAMOS LAS CONTRASEÑAS
            request.ClaveAntigua = crypter.Encrypt(request.ClaveAntigua);
            request.ClaveNueva = crypter.Encrypt(request.ClaveNueva);
            request.ClaveNuevaConfirmada = crypter.Encrypt(request.ClaveNuevaConfirmada);

            request.Dominio = WebConfigReader.DominioAplicacion;
            request.Acronimo = WebConfigReader.AcronimoAplicacion;
            request.TipoCambioClave = TipoCambioClave.Ui;

            ResponseCambioClave response = (new SeguridadProxyRest()).CambiarClaveWeb(request);
            if (response.Result.Satisfactorio == false)
                throw new Exception(response.Result.Mensaje);

            done = true;

            return done;
        }

        /// <summary>
        /// Recupera la lista de roles
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseRol GetRolesUsuario(RequestRol request)
        {
            return (new SeguridadProxyRest()).GetRolesUsuario(request);
        }

        /// <summary>
        /// Busqueda de usuarios
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public ResponseBusquedaUsuario BusquedaUsuario(RequestBusquedaUsuario request)
        {
            return (new SeguridadProxyRest()).BusquedaUsuario(request);
        }

        
    }
}
