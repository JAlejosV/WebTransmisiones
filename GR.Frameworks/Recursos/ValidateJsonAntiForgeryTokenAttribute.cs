using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace GR.Frameworks
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class ValidateJsonAntiForgeryTokenAttribute : FilterAttribute, IAuthorizationFilter
    {
        private const string key = "__RequestVerificationToken";
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext == null)
                throw new ArgumentNullException("filterContext");

            var request = filterContext.HttpContext.Request;

            if (request.HttpMethod == "GET")
                return;

            HttpCookie cookie = request.Cookies[key];
            var cookieToken = cookie == null || String.IsNullOrEmpty(cookie.Value) ? string.Empty : cookie.Value;
            var formToken = request.Headers[key] ?? string.Empty;

            AntiForgery.Validate(cookieToken, formToken);
        }
    }

}
