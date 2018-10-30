namespace GR.Alicorp.Comun.Helpers
{
    using System;
    using System.Configuration;
    using System.IO;
    using System.Text;

    public class LogHelper
    {
        public void Grabar(string mensaje)
        {
            StreamWriter writer;
            string path = Convert.ToString(ConfigurationManager.AppSettings["rutaLog"]);
            if (!File.Exists(path))
            {
                writer = new StreamWriter(path);
            }
            else
            {
                writer = File.AppendText(path);
            }
            writer.WriteLine(DateTime.Now);
            writer.WriteLine(mensaje);
            writer.WriteLine();
            writer.Close();
        }

        public void GrabarResumen(string mensaje)
        {
            StreamWriter writer = new StreamWriter(Convert.ToString(ConfigurationManager.AppSettings["rutaLogResumen"]), true, Encoding.GetEncoding(0x4e4));
            writer.WriteLine(mensaje);
            writer.Close();
        }

        public static string GetVarConfig(string Variable)
        {

            var specificValue = ConfigurationManager.AppSettings[Variable];
            if (!string.IsNullOrEmpty(specificValue))
            {
                return ConfigurationManager.AppSettings[Variable].ToString();
            }
            else
            {
                return "";
            }
        }
    }
}

