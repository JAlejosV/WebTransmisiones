using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GR.Msc.Memberships
{
    public class WebConfigReader
    {
        public static string SemillaEncriptacionPublica { get { return Convert.ToString(ConfigurationManager.AppSettings["semillaEncriptacionPublica"]); } }

        //public static string PathFrontEnd { get { return Convert.ToString(ConfigurationManager.AppSettings["pathFrontEnd"]); } }

        public static string AcronimoAplicacion { get { return Convert.ToString(ConfigurationManager.AppSettings["AcronimoAplicacion"]); } }

        public static string DominioAplicacion { get { return Convert.ToString(ConfigurationManager.AppSettings["DominioAplicacion"]); } }

        //public static string UsuarioPorDefecto { get { return Convert.ToString(ConfigurationManager.AppSettings["usuarioPorDefecto"]); } }


        #region Proxies
        public static string UrlSeguridadTraerInfoUsuario { get { return Convert.ToString(ConfigurationManager.AppSettings["UrlServicioSeguridad"]); } }
        public static string UrlGetInfoBasicaUsuariosByCodigo { get { return Convert.ToString(ConfigurationManager.AppSettings["UrlSeguridadTraerInfoUsuarioByCodigo"]); } }

        #endregion

        //public static string WebSiteChannelName { get { return Convert.ToString(ConfigurationManager.AppSettings["webSiteChannelName"]); } }
        public static string RegisteredModules { get { return Convert.ToString(ConfigurationManager.AppSettings["Viatecla.Factory.Scriptor.ModularSite.RegisteredModules"]); } }
        public static string ModulosRegistrar { get { return Convert.ToString(ConfigurationManager.AppSettings["ModulosRegistrar"]); } }
        

    }
}
