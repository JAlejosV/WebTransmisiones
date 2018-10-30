using GR.Msc.Memberships.Filters;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GR.Msc.Memberships
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new AutenticacionUsuarioAttributeMsc());

        }
    }
}