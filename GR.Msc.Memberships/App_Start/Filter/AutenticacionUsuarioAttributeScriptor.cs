/*
using GR.Scriptor.Framework;
using GR.Scriptor.Msc.Memberships.Models;
using ModuloAPIRansa.Helper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Xml;


namespace GR.Scriptor.Msc.Memberships.Filters
{
    public sealed class AutenticacionUsuarioAttributeScriptor : System.Web.Mvc.AuthorizeAttribute
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
            ManejadorLog log = new ManejadorLog();

            ResponseUsuarioDTO usuario = HelperSeguridad.ObtenerSessionUsuario();
            try
            {

                var section = (Hashtable)ConfigurationManager.GetSection("PaginasAnonimas");

                var routeDataTemp = filterContext.RequestContext.RouteData;
                String UrlAcceso = "";

                if (routeDataTemp.Values.Values.ToArray()[1] == "ModuloAPIRansa" || routeDataTemp.Values.Values.ToArray()[1] == "SeguridadGR")
                    UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[1] + "/" + routeDataTemp.Values.Values.ToArray()[0];
                else
                    UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[0] + "/" + routeDataTemp.Values.Values.ToArray()[1];
                log.RegistrarEvento("Acceso:" + HelperSeguridad.GetUsuarioRed());
                if (UrlAcceso.ToLower().Contains("preview"))
                {
                    return;
                }
                //log.RegistrarEvento(UrlAcceso + ":dicSection");

                Dictionary<string, string> dicSection = section.Cast<DictionaryEntry>().ToDictionary(d => (string)d.Key, d => (string)d.Value);

                var encuentra = (from xx in dicSection where xx.Value.ToUpper() == UrlAcceso.ToUpper() || xx.Value.ToUpper() + "/" == UrlAcceso.ToUpper() select xx).Count();
                if (encuentra == 0)
                {
                    if (!UrlAcceso.Contains("es-PE"))
                        UrlAcceso = ("/es-PE" + UrlAcceso);
                    else
                        UrlAcceso = UrlAcceso;
                    encuentra = (from xx in dicSection where xx.Value.ToUpper() + "/HOME" == UrlAcceso.ToUpper() || xx.Value.ToUpper() + "//HOME" == UrlAcceso.ToUpper() || xx.Value.ToUpper() + "HOME" == UrlAcceso.ToUpper() select xx).Count();
                }
                //log.RegistrarEvento(UrlAcceso + ":encuentra:" + encuentra + " WS:" + Viatecla.Factory.Scriptor.ModularSite.Models.Common.WebSiteChannel.Name);
                if (Viatecla.Factory.Scriptor.ModularSite.Models.Common.WebSiteChannel.Name.ToLower() != System.Configuration.ConfigurationManager.AppSettings["CanalPrincipalPortal"].ToLower())
                    return;

                //no permitida
                if (encuentra == 0)//==
                {
                    if (usuario != null)
                    {
                        base.OnAuthorization(filterContext);
                    }
                    else
                    {
                        filterContext.RequestContext.HttpContext.Response.StatusCode = 440;
                        base.OnAuthorization(filterContext);
                    }
                }
                //log.RegistrarEvento(UrlAcceso + "Ok");

            }
            catch (Exception ex)
            {
                //log.RegistrarEvento(ex.Message);
                //log.RegistrarEvento(ex.StackTrace);
            }
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {


            ManejadorLog log = new ManejadorLog();
            log.RegistrarEvento(string.Format("metodo = {0}", MethodBase.GetCurrentMethod().Name));
            try
            {
                if (httpContext.Response.StatusCode == 440)
                    return false;
                bool autenticado = false;

                var routeDataTemp = httpContext.Request.RequestContext.RouteData;
                string controllerTemp = Convert.ToString(routeDataTemp.Values["controller"]);
                string actionTemp = Convert.ToString(routeDataTemp.Values["action"]);

                //log.RegistrarEvento(httpContext.User.Identity.IsAuthenticated.ToString());
                ResponseUsuarioDTO usuario = HelperSeguridad.ObtenerSessionUsuario();
                if (usuario != null)
                //if (httpContext.User.Identity.IsAuthenticated)
                {
                    //log.RegistrarEvento("entro if session");
                    String UrlAcceso = "";

                    if (routeDataTemp.Values.Values.ToArray()[1] == "Seguridad" || routeDataTemp.Values.Values.ToArray()[1] == "SeguimientoPedidosWeb")
                        UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[1] + "/" + routeDataTemp.Values.Values.ToArray()[0];
                    else
                        UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[0] + "/" + routeDataTemp.Values.Values.ToArray()[1];

                    log.RegistrarEvento("UrlAcceso=" + UrlAcceso);


                    //log.RegistrarEvento("salio por revisado " + UrlAcceso);
                    var encontrar = (from xx in usuario.NoPermisos where xx.ToUpper() == UrlAcceso.ToUpper() || xx.ToUpper() + "/" == UrlAcceso.ToUpper() || xx.ToUpper() + "//Home" == UrlAcceso.ToUpper() || xx.ToUpper() + "/Home" == UrlAcceso.ToUpper() select xx).Count();
                    //no permitida
                    if (encontrar == 0)//==
                    {
                        if (!UrlAcceso.Contains("es-PE"))
                            UrlAcceso = ("/es-PE" + UrlAcceso);
                        else
                            UrlAcceso = UrlAcceso;



                        encontrar = (from xx in usuario.NoPermisos where xx.ToUpper() + "/HOME" == UrlAcceso.ToUpper() || xx.ToUpper() + "HOME" == UrlAcceso.ToUpper() select xx).Count();
                    }
                    log.RegistrarEvento("permitido=" + (encontrar == 0));


                    return (encontrar == 0);//>
                }
                else
                {
                    log.RegistrarEvento("salio sin autorizar");
                    return false;
                }
            }
            catch (Exception ex)
            {
                log.RegistrarEvento(ex.Message);
                log.RegistrarEvento(ex.StackTrace);
                return false;
            }
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            try
            {
                if (!filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.StatusCode = filterContext.RequestContext.HttpContext.Response.StatusCode;
                    if (filterContext.RequestContext.HttpContext.Response.StatusCode == 440)
                    {
                        filterContext.Result = new RedirectResult("/");
                        //la session ha expirado
                        //filterContext.RequestContext.HttpContext.Response.Redirect("/");
                        //filterContext.RequestContext.HttpContext.Response.End();
                    }
                    else
                    {
                        //filterContext.Result = new RedirectResult("/es-PE/pagina-de-error");
                        filterContext.Result = new RedirectResult("/es-PE/pagina-de-acceso-no-autorizado");
                    }
                }
                else
                {
                    filterContext.HttpContext.Response.StatusCode = filterContext.RequestContext.HttpContext.Response.StatusCode;
                    if (filterContext.RequestContext.HttpContext.Response.StatusCode == 440)
                    {
                        //la session ha expirado
                        filterContext.HttpContext.Response.StatusCode = 440;
                        filterContext.HttpContext.Response.Write("la session ha expirado");
                        filterContext.HttpContext.Response.End();
                    }
                    else
                    {
                        filterContext.HttpContext.Response.StatusCode = 500;
                        filterContext.HttpContext.Response.Write("ocurrió un error interno");
                        filterContext.HttpContext.Response.End();
                    }
                }
                filterContext.HttpContext.Response.SuppressFormsAuthenticationRedirect = true;

                //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "es-PE", action = "pagina-de-error" }));
            }
            catch (Exception ex)
            {
                ManejadorLog log = new ManejadorLog();
                //log.RegistrarEvento(ex.Message);
                //log.RegistrarEvento(ex.StackTrace);
                throw;
            }
            //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Error", action = "AccesoDenegado" }));

        }
    }
}

*/