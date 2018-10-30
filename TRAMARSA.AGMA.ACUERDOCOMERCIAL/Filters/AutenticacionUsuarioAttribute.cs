using GR.Frameworks;
using GR.Msc.Memberships.Models;

using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Memberships;



namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Filters
{
    public sealed class AutenticacionUsuarioAttribute : AuthorizeAttribute
    {
        public bool ValidarAutorizacion
        {
            get;
            set;
        }

        public string Opcion
        {
            get;
            set;
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.User != null)
            {
                base.OnAuthorization(filterContext);
            }
           

            //try
            //{
            //    var section = (Hashtable)ConfigurationManager.GetSection("PaginasAnonimas");
            //    ResponseUsuarioMscDTO usuario = (ResponseUsuarioMscDTO)(filterContext.RequestContext.HttpContext.Session["usuario"]);



            //    var routeDataTemp = filterContext.RequestContext.RouteData;
            //    String UrlAcceso = "";

            //    if (routeDataTemp.Values.Values.ToArray()[1] == "ModuloSeguridadGR" || HelperSeguridad.PerteneceAsembliesScriptor(routeDataTemp.Values.Values.ToArray()[1]) || HelperSeguridad.PerteneceCadena(routeDataTemp.Values.Values.ToArray()[1], GR.Msc.Memberships.WebConfigReader.ModulosRegistrar))
            //        UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[1] + "/" + routeDataTemp.Values.Values.ToArray()[0];
            //    else
            //        UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[0] + "/" + routeDataTemp.Values.Values.ToArray()[1];

            //    // log.RegistrarEvento(string.Format("Urlacceso = {0}", UrlAcceso));

            //    Dictionary<string, string> dicSection = section.Cast<DictionaryEntry>().ToDictionary(d => (string)d.Key, d => (string)d.Value);

            //    var encuentra = (from xx in dicSection where xx.Value.ToUpper() == UrlAcceso.ToUpper() || xx.Value.ToUpper() + "/" == UrlAcceso.ToUpper() select xx).Count();


            //    if (encuentra == 0)
            //    {
            //        //if (filterContext.HttpContext.User != null)
            //        if (usuario != null)
            //        {
            //            base.OnAuthorization(filterContext);
            //        }
            //        else
            //        {
            //            filterContext.RequestContext.HttpContext.Response.StatusCode = 440;
            //            base.OnAuthorization(filterContext);
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, ex.Message, ex.StackTrace);
            //}
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool autenticado = false;

            var routeDataTemp = httpContext.Request.RequestContext.RouteData;
            string controllerTemp = Convert.ToString(routeDataTemp.Values["controller"]);
            string actionTemp = Convert.ToString(routeDataTemp.Values["action"]);

            //string UsuarioPorDefecto = System.Configuration.ConfigurationManager.AppSettings["UsuarioPorDefecto"].ToString();
            if (httpContext.Response.StatusCode == 440)
                return false;

            ManejadorLog manejadorLog = new ManejadorLog();
            if (ValidarAutorizacion)
            {

                if (httpContext.User.Identity.IsAuthenticated) //|| UsuarioPorDefecto.Length > 0)
                {

                    //COMENTADO POR AHORA
                    //CuentaController cuentaController = new CuentaController();

                    string usuarioLogueado = httpContext.User.Identity.Name;

                    manejadorLog.GrabarLog("Usuario Autenticado:" + usuarioLogueado);

                    ResponseUsuarioMscDTO usuario = HelperSeguridad.GetUsuario();



                    //Primera vez que se logea el usuario o session expiró
                    if (usuario == null)
                    {
                        manejadorLog.GrabarLog("Usuario es null");
                        
                        //COMENTADO POR AHORA
                        //autenticado = cuentaController.ValidarAutenticacion(usuarioLogueado, httpContext);
                        //autenticado = true;

                        //if (autenticado)
                        //{
                        //    manejadorLog.GrabarLog("Usuario es Autenticado");

                        //    if (ValidarAutorizacion)
                        //    {
                        //        string opcionValidar = Opcion;

                        //        if (String.IsNullOrEmpty(opcionValidar))
                        //        {
                        //            var routeData = httpContext.Request.RequestContext.RouteData;
                        //            string controller = Convert.ToString(routeData.Values["controller"]);
                        //            string action = Convert.ToString(routeData.Values["action"]);

                        //            opcionValidar = action;
                        //        }
                        //        //COMENTADO POR AHORA
                        //        autenticado = HelperSeguridad.GetUsuario().Usuario.Permisos.Contains(opcionValidar);//cuentaController.ValidarAutorizacion(opcionValidar);
                        //    }
                        //}
                    }
                    else
                    {
                        manejadorLog.GrabarLog("Usuario no es null");

                        manejadorLog.GrabarLog("Usuario Sesion: " + usuario.Usuario.CodigoUsuario);

                        if (usuario.Usuario.CodigoUsuario.ToUpper() != usuarioLogueado.ToUpper())
                        {
                            manejadorLog.GrabarLog("Usuario Sesion: " + usuario.Usuario.CodigoUsuario);

                            manejadorLog.GrabarLog("Usuario Logueado: " + usuarioLogueado.ToUpper());
                            //COMENTADO POR AHORA
                            //autenticado = cuentaController.ValidarAutenticacion(usuarioLogueado, httpContext);
                        }
                        else
                        {
                            if (ValidarAutorizacion)
                            {
                                string opcionValidar = Opcion;

                                if (String.IsNullOrEmpty(opcionValidar))
                                {
                                    var routeData = httpContext.Request.RequestContext.RouteData;
                                    string controller = Convert.ToString(routeData.Values["controller"]);
                                    string action = Convert.ToString(routeData.Values["action"]);

                                    opcionValidar = action;
                                }
                                //COMENTADO POR AHORA
                                autenticado = HelperSeguridad.GetUsuario().Usuario.Permisos.Contains(opcionValidar);//autenticado = cuentaController.ValidarAutorizacion(opcionValidar);
                            }
                            else
                            {
                                autenticado = true;
                            }
                        }
                    }
                }
            }
            else
            {
                autenticado = true;
            }

            return autenticado;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Error", action = "AccesoDenegado" }));
        }
        //protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        //{

        //    try
        //    {
        //        if (!filterContext.HttpContext.Request.IsAjaxRequest())
        //        {
        //            filterContext.HttpContext.Response.StatusCode = filterContext.RequestContext.HttpContext.Response.StatusCode;
        //            if (filterContext.RequestContext.HttpContext.Response.StatusCode == 440)
        //            {
        //                filterContext.Result = new RedirectResult("/");
        //                la session ha expirado
        //                filterContext.RequestContext.HttpContext.Response.Redirect("/");
        //                filterContext.RequestContext.HttpContext.Response.End();
        //            }
        //            else
        //            {
        //                filterContext.Result = new RedirectResult("/es-PE/pagina-de-error");
        //                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Error", action = "AccesoDenegado" }));
        //            }
        //        }
        //        else
        //        {
        //            filterContext.HttpContext.Response.StatusCode = filterContext.RequestContext.HttpContext.Response.StatusCode;
        //            if (filterContext.RequestContext.HttpContext.Response.StatusCode == 440)
        //            {
        //                la session ha expirado
        //                filterContext.HttpContext.Response.StatusCode = 440;
        //                filterContext.HttpContext.Response.Write("la session ha expirado");
        //                filterContext.HttpContext.Response.End();
        //            }
        //            else
        //            {
        //                filterContext.HttpContext.Response.StatusCode = 500;
        //                filterContext.HttpContext.Response.Write("ocurrió un error interno");
        //                filterContext.HttpContext.Response.End();
        //            }
        //        }
        //        filterContext.HttpContext.Response.SuppressFormsAuthenticationRedirect = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        ManejadorLog log = new ManejadorLog();
        //        log.RegistrarEvento(ex.Mensaje);
        //        log.RegistrarEvento(ex.StackTrace);
        //        throw;
        //    }

        //}
    }
}