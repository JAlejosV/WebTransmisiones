using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GR.Frameworks
{
    public sealed class ServicesConfigReader
    {
        public static string RutaLogMain
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["RutaLogMain"]); }
        }

        public static string NameLogEventos
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["NameLogEventos"]); }
        }
        public static string NameLog
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["NameLog"]); }
        }

        public static string NameLogMapa
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["NameLogMapa"]); }
        }

        public static string NameLogOperaciones
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["NameLogOperaciones"]); }
        }

        public static string NameLogTiempoEjecucion
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["NameLogTiempoEjecucion"]); }
        }

        public static bool FlagSodimacHabilitado
        {
            get { return Convert.ToBoolean(ConfigurationManager.AppSettings["FlagSodimacHabilitado"].ToString()); }
        }

        public static string NameLogIntegracionSodimacException
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["NameLogIntegracionSodimacException"]); }
        }

        public static int TimeOutSqlCommand
        {
            //get { return Convert.ToInt32(ConfigurationManager.AppSettings["timeOutSqlCommand"].ToString()); }
            get { return 1800; }
        }

        public static string ConnectionStringANTP
        {
            get { return (ConfigurationManager.ConnectionStrings["ANTP"].ToString()); }
        }

        public static string ConnectionStringCOMEX
        {
            get { return (ConfigurationManager.ConnectionStrings["ContextoParaBaseDatosLocal"].ToString()); }
        }

        public static string NameLogGeneracionMasiva
        {
            //get { return (ConfigurationManager.ConnectionStrings["NameLogGeneracionMasiva"].ToString()); }
            get { return "GeneracionMasiva.txt"; }
        }

        public static string MailerHost
        {
            get { return (ConfigurationManager.AppSettings["Host"].ToString()); }
        }

        public static string MailerPort
        {
            get { return (ConfigurationManager.AppSettings["Port"].ToString()); }
        }

        public static string MailerFrom
        {
            get { return (ConfigurationManager.AppSettings["From"].ToString()); }
        }

        public static string MailerSSL
        {
            get { return (ConfigurationManager.AppSettings["EnableSsl"].ToString()); }
        }

        public static string MailerUseDefaultCredentials
        {
            get { return (ConfigurationManager.AppSettings["UseDefaultCredentials"].ToString()); }
        }

        public static string MailerCredentialUser
        {
            get { return (ConfigurationManager.AppSettings["CredentialsUser"].ToString()); }
        }

        public static string MailerCredentialsClave
        {
            get { return (ConfigurationManager.AppSettings["CredentialsClave"].ToString()); }
        }

        public static string MailerToSoporte
        {
            get { return (ConfigurationManager.AppSettings["mailSoporteComex"].ToString()); }
        }
    }
}
