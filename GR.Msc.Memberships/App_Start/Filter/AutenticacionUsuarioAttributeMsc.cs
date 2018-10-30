
using GR.Comun.DTO;
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

namespace GR.Msc.Memberships.Filters
{
    public sealed class AutenticacionUsuarioAttributeMsc : AuthorizeAttribute
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
  
            //ManejadorLog log = new ManejadorLog();
            try
            {
                //log.RegistrarEvento("OnAuthorization");
                //log.RegistrarEvento(string.Format("parametro = {0}", Newtonsoft.Json.JsonConvert.SerializeObject(filterContext)));

                var section = (Hashtable)ConfigurationManager.GetSection("PaginasAnonimas");
                ResponseUsuarioMscDTO usuario = (ResponseUsuarioMscDTO)(filterContext.RequestContext.HttpContext.Session["usuario"]);



                var routeDataTemp = filterContext.RequestContext.RouteData;
                String UrlAcceso = "";

                if (routeDataTemp.Values.Values.ToArray()[1] == "ModuloSeguridadGR" || HelperSeguridad.PerteneceAsembliesScriptor(routeDataTemp.Values.Values.ToArray()[1]) || HelperSeguridad.PerteneceCadena(routeDataTemp.Values.Values.ToArray()[1], WebConfigReader.ModulosRegistrar))
                    UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[1] + "/" + routeDataTemp.Values.Values.ToArray()[0];
                else
                    UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[0] + "/" + routeDataTemp.Values.Values.ToArray()[1];

               // log.RegistrarEvento(string.Format("Urlacceso = {0}", UrlAcceso));

                Dictionary<string, string> dicSection = section.Cast<DictionaryEntry>().ToDictionary(d => (string)d.Key, d => (string)d.Value);

                var encuentra = (from xx in dicSection where xx.Value.ToUpper() == UrlAcceso.ToUpper() || xx.Value.ToUpper() + "/" == UrlAcceso.ToUpper() select xx).Count();

                ////log.RegistrarEvento(string.Format("dicSection = {0}", Newtonsoft.Json.JsonConvert.SerializeObject(dicSection)));
                //log.RegistrarEvento(string.Format("encuentra = {0}", encuentra));

                ////log.RegistrarEvento("paths 1=" + routeDataTemp.Values.Values.ToArray()[0] + "\n" +
                //                    "paths 2=" + routeDataTemp.Values.Values.ToArray()[1] + "\n" +
                //                    //"paths 3=" + routeDataTemp.Values.Values.ToArray()[2] + "\n" + 
                //                    "encuentra" + encuentra.ToString());

                ////log.RegistrarEvento("WebSiteChannel=" + Viatecla.Factory.Scriptor.ModularSite.Models.Common.WebSiteChannel.Name);

                //if (Viatecla.Factory.Scriptor.ModularSite.Models.Common.WebSiteChannel.Name != WebConfigReader.WebSiteChannelName)
                //    return;




                //Prueba
                //encuentra = 1;
               // Prueba

                if (encuentra == 0)
                {
                    //if (filterContext.HttpContext.User != null)
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

            }
            catch (Exception ex)
            {
                (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, ex.Message, ex.StackTrace);
               // log.RegistrarEvento(ex.StackTrace);
            }
       
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            //Prueba
           // return true;
            //Pruena

         //   ManejadorLog log = new ManejadorLog();
           // log.RegistrarEvento(string.Format("metodo = {0}", MethodBase.GetCurrentMethod().Name));
            try
            {
                if (httpContext.Response.StatusCode == 440)
                    return false;
                bool autenticado = false;
                ResponseUsuarioMscDTO usuario = HelperSeguridad.ObtenerSessionUsuarioMsc();

                var routeDataTemp = httpContext.Request.RequestContext.RouteData;
                string controllerTemp = Convert.ToString(routeDataTemp.Values["controller"]);
                string actionTemp = Convert.ToString(routeDataTemp.Values["action"]);

//                log.RegistrarEvento(httpContext.User.Identity.IsAuthenticated.ToString());


                if (usuario != null)
                //if (httpContext.User.Identity.IsAuthenticated)
                {
                   // log.RegistrarEvento("entro if session");
                    String UrlAcceso = "";

                    if (routeDataTemp.Values.Values.ToArray()[1] == "ModuloSeguridad" || HelperSeguridad.PerteneceAsembliesScriptor(routeDataTemp.Values.Values.ToArray()[1]) || HelperSeguridad.PerteneceCadena(routeDataTemp.Values.Values.ToArray()[1], WebConfigReader.ModulosRegistrar))
                        UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[1] + "/" + routeDataTemp.Values.Values.ToArray()[0];
                    else
                        UrlAcceso = "/" + routeDataTemp.Values.Values.ToArray()[0] + "/" + routeDataTemp.Values.Values.ToArray()[1];

                    
                    //log.RegistrarEvento("UrlAcceso=" + UrlAcceso);
                    var encontrar = (from xx in usuario.Usuario.Permisos where xx.ToUpper() == UrlAcceso.ToUpper() || xx.ToUpper() + "/" == UrlAcceso.ToUpper() || "/ES-PE" + xx.ToUpper() == UrlAcceso.ToUpper() || "ES-PE" + xx.ToUpper() == UrlAcceso.ToUpper() || "ES-PE/" + xx.ToUpper() + "/" == UrlAcceso.ToUpper() || "/ES-PE/" + xx.ToUpper() + "/" == UrlAcceso.ToUpper() || "/ES-PE" + xx.ToUpper() == UrlAcceso.ToUpper() + "/" || "ES-PE" + xx.ToUpper() == UrlAcceso.ToUpper() + "/" || "/" + xx.ToUpper() == UrlAcceso.ToUpper() + "/" || xx.ToUpper() == UrlAcceso.ToUpper() + "/" select xx).Count();
                    //var encontrar = (from xx in usuario.Usuario.Permisos where xx.ToUpper() == UrlAcceso.ToUpper() || xx.ToUpper() + "/" == UrlAcceso.ToUpper() select xx).Count();

                   // log.RegistrarEvento("encontrar="+encontrar.ToString());
                    //log.RegistrarEvento("salio autorizar");
                    //Prueba
                    encontrar = 1;
                    //Prueba
                    return (encontrar > 0);
                }
                else
                {
                    //log.RegistrarEvento("salio autorizar");
                    return false;
                }
            }
            catch (Exception ex)
            {
                (new ManejadorLog()).RegistrarEvento(MethodBase.GetCurrentMethod().Name, ex.Message, ex.StackTrace);
                //log.RegistrarEvento(ex.Message);
                //log.RegistrarEvento(ex.StackTrace);
                return false;
            }
       
            return true;
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
                //log.RegistrarEvento(ex.Mensaje);
                //log.RegistrarEvento(ex.StackTrace);
                throw;
            }
            //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Error", action = "AccesoDenegado" }));
         
        }
    }
}