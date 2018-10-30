using System.Web;
using System.Web.Mvc;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Filters;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new AutenticacionUsuarioAttribute());
            filters.Add(new HandleErrorAttribute());
        }
    }
}