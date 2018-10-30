
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using GR.Msc.Memberships;
using GR.Frameworks;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL
{

    public class MvcApplication :
    System.Web.HttpApplication
    //  GR.Msc.Memberships.MvcApplication
    {
        //public MvcApplication()
        //{
        //}

        //protected override void Application_Start()
        //{
        //    base.Application_Start();
        //}

        //protected void Session_Start(object sender, EventArgs e)
        //{

        //}


        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        public override string GetVaryByCustomString(HttpContext context, string arg)
        {
            if (arg == "userName")
            {
                return context.User.Identity.Name;
            }
            return string.Empty;
        }

    }
}