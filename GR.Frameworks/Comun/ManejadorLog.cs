using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;

namespace GR.Frameworks
{
    public class ManejadorLog
    {
        static readonly object _locker = new object();
        static readonly object _locker2 = new object();
        ReaderWriterLock _readerWriterLock = new ReaderWriterLock();
        public string _ruta = "";

        public ManejadorLog()
        {
            string rutaOriginal = ServicesConfigReader.RutaLogMain;
            if (!Directory.Exists(rutaOriginal))
                Directory.CreateDirectory(rutaOriginal);

            _ruta = rutaOriginal;
        }

        public void GrabarLog(string mensaje)
        {
            string ruta = string.Format("{0}{1}", _ruta, string.Format("{0:yyMMdd}{1}", DateTime.Now, ServicesConfigReader.NameLog));

            mensaje = string.Format("{0}{1}{2}{3}"
                                    , DateTime.Now
                                    , Environment.NewLine
                                    , mensaje
                                    , Environment.NewLine);

            this.RegistrarEvento(ruta, string.Format("{0}{1}", mensaje, Environment.NewLine));

        }

        public void GrabarLogMapa(params string[] datos)
        {
            for (int i = 0; i < datos.Length; i++)
            {
                if (string.IsNullOrEmpty(datos[i]))
                    datos[i] = "";
                datos[i] = string.Format("\"{0}\"", datos[i].Replace("\"", "\"\""));
            }

            string rutaOriginal = string.Format("{0}{1}{2}", _ruta, DateTime.Now.ToString("yyyyMMdd"), ServicesConfigReader.NameLogMapa);

            string ruta = rutaOriginal;
            string sepcol = @",";

            string mensaje = "";
            if (!File.Exists(ruta))
            {
                var lista = new List<string>();
                lista.Add("Fecha de Inicio");
                lista.Add("Fecha de Fin");
                lista.Add("Duración (ms)");
                lista.Add("Duración (seg)");
                lista.Add("IP Local");
                lista.Add("Usuario");
                lista.Add("Tipo de Llamada");
                lista.Add("URL");
                lista.Add("JSON Request");
                lista.Add("JSON Response");
                lista.Add("Confirmación de Proceso");
                lista.Add("");

                mensaje = string.Join(sepcol, lista);
            }
            else
                mensaje = string.Join(sepcol, datos);

            this.RegistrarEvento(ruta, mensaje);
        }

        public void GrabarLogOperaciones(string mensaje)
        {
            string ruta = string.Format("{0}{1}", _ruta, string.Format("{0:yyMMdd}{1}", DateTime.Now, ServicesConfigReader.NameLogOperaciones));

            this.RegistrarEvento(ruta, string.Format("{0}{1}", mensaje, Environment.NewLine));
        }

        public void RegistrarTiempoEjecucion(string mensaje)
        {
            string ruta = string.Format("{0}{1}", _ruta, string.Format("{0:yyMMdd}{1}", DateTime.Now, ServicesConfigReader.NameLogTiempoEjecucion));

            this.RegistrarEvento(ruta, mensaje);
        }

        public void RegistrarEvento(string mensaje)
        {
            string ruta = string.Format("{0}{1}", _ruta, string.Format("{0:yyMMdd}{1}", DateTime.Now, ServicesConfigReader.NameLogEventos));
            ruta = System.Web.HttpContext.Current.Server.MapPath(ruta);
            RegistrarEvento(ruta, string.Format("{0}{1}{2}{3}", DateTime.Now, Environment.NewLine, mensaje, Environment.NewLine));
        }

        public void RegistrarEvento(params string[] parametros)
        {
            if (System.Configuration.ConfigurationManager.AppSettings["TipoLog"] != "DEBUG")
                return;
            string mensaje = "";
            parametros.ToList().ForEach(x =>
                {
                    mensaje += string.Format("{0}{1}", x, Environment.NewLine);
                });

            string ruta = string.Format("{0}{1}", _ruta, string.Format("{0:yyMMdd}{1}", DateTime.Now, ServicesConfigReader.NameLog));
           // ruta = System.Web.HttpContext.Current.Server.MapPath(ruta);
            RegistrarEvento(ruta, string.Format("{0}{1}{2}{3}", DateTime.Now, Environment.NewLine, mensaje, Environment.NewLine));

        }

        private void RegistrarEvento(string ruta, string mensaje)
        {
            try
            {
                lock (_locker)
                {
                    StreamWriter log;

                    if (!File.Exists(ruta))
                        log = new StreamWriter(ruta, true, Encoding.Default);
                    else
                        log = File.AppendText(ruta);

                    using (log)
                    {
                        log.WriteLine(mensaje);
                        log.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                //string source;
                //string log;
                //string evento;

                //source = "ComexSource";
                //log = "COMEX";
                //evento = string.Format("{0}{1}{2}",ex.Mensaje, Environment.NewLine, mensaje);

                //if (!EventLog.SourceExists(source))
                //    EventLog.CreateEventSource(source, evento);

                //EventLog.WriteEntry(source, evento, EventLogEntryType.Warning, 111);

            }
        }
    }
}
