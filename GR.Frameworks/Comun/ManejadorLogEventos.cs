using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;


namespace GR.Frameworks
{
    public class RequestLogEvento
    {
        public string NombreMaquina { get; set; }
        public string DireccionIP { get; set; }
        public string NombreUsuario { get; set; }
        public string Formulario { get; set; }
        public string NombreEvento { get; set; }
    }
    [Serializable]
    public class ManejadorLogEventos
    {
        //public Stopwatch Stop { get; set; }
        public DateTime fin { get; set; }
        public DateTime inicio { get; set; }
        public bool isStopped { get; set; }
        public ManejadorLogEventos()
        {
            isStopped = false;
            this.inicio = DateTime.Now;
            //Cursor.Current = Cursors.WaitCursor;
        }

        public void Reset()
        {
            this.inicio = DateTime.Now;
        }
        public void Break()
        {
            fin = DateTime.Now;
            //inicio = new DateTime(fin.Ticks - Stop.ElapsedTicks);
            isStopped = true;
        }
        public double GetDuracion()
        {
            TimeSpan ts = fin - inicio;
            return Math.Round(ts.TotalMilliseconds,2);
        }
        public void RegistrarTiempoEjecucion(Object requestTrama, RequestLogEvento request)
        {
            try
            {
                if (!isStopped)
                    Break();

                if (System.Configuration.ConfigurationManager.AppSettings["TipoError"] != "INFO")
                {
                    requestTrama = "";
                }
                string mensaje = string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8}",
                                              request.NombreMaquina
                                              , request.DireccionIP
                                              , request.NombreUsuario
                                              , request.Formulario
                                              , request.NombreEvento
                                              , inicio
                                              , fin
                                              , GetDuracion(), requestTrama);

                
                (new ManejadorLog()).RegistrarTiempoEjecucion(mensaje);
            }
            catch (Exception ex)
            {
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.Framework);
            }

            //Cursor.Current = Cursors.Default;
        }
        public void GuardarTrama2(DateTime fecha, string Tipo, string Url, string Ip, string Usuario, string Trama)
        {
            return;

            double DuracionMilisegundos = double.Parse(GetDuracion().ToString());
            double DuracionSegundos = double.Parse((GetDuracion() / 1000).ToString());

            string cadena = "";
            bool grabaArchivos = false;
            if (ConfigurationManager.ConnectionStrings["ContextoParaBaseDatosLocal"] != null)
            {
                cadena = ConfigurationManager.ConnectionStrings["ContextoParaBaseDatosLocal"].ConnectionString;
                try
                {
                    using (System.Data.SqlClient.SqlConnection cn = new System.Data.SqlClient.SqlConnection(cadena))
                    {
                        System.Data.SqlClient.SqlCommand cm = new System.Data.SqlClient.SqlCommand("usp_InsertLogLLamadas", cn);
                        cm.CommandType = System.Data.CommandType.StoredProcedure;
                        cm.Parameters.Add("@Fecha", System.Data.SqlDbType.DateTime).Value = fecha;
                        cm.Parameters.Add("@Tipo", System.Data.SqlDbType.VarChar).Value = Tipo;

                        if (!string.IsNullOrEmpty(Url))
                            cm.Parameters.Add("@Url", System.Data.SqlDbType.VarChar).Value = Url;
                        else
                            cm.Parameters.Add("@Url", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                        if (DuracionMilisegundos > 0)
                            cm.Parameters.Add("@DuracionMilisegundos", System.Data.SqlDbType.Decimal).Value = DuracionMilisegundos;
                        else
                            cm.Parameters.Add("@DuracionMilisegundos", System.Data.SqlDbType.Decimal).Value = DBNull.Value;
                        if (DuracionSegundos > 0)
                            cm.Parameters.Add("@DuracionSegundos", System.Data.SqlDbType.Decimal).Value = DuracionSegundos;
                        else
                            cm.Parameters.Add("@DuracionSegundos", System.Data.SqlDbType.Decimal).Value = DBNull.Value;

                        if (!string.IsNullOrEmpty(Ip))
                            cm.Parameters.Add("@Ip", System.Data.SqlDbType.VarChar).Value = Ip;
                        else
                            cm.Parameters.Add("@Ip", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                        if (!string.IsNullOrEmpty(Usuario))
                            cm.Parameters.Add("@Usuario", System.Data.SqlDbType.VarChar).Value = Usuario;
                        else
                            cm.Parameters.Add("@Usuario", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                        if (!string.IsNullOrEmpty(Trama))
                            cm.Parameters.Add("@Trama", System.Data.SqlDbType.Text).Value = Trama;
                        else
                            cm.Parameters.Add("@Trama", System.Data.SqlDbType.Text).Value = DBNull.Value;


                        cn.Open();
                        cm.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                    grabaArchivos = true;
                }
            }
            else
            {
                grabaArchivos = true;
            }

            if (grabaArchivos == true)
            {
                ManejadorLogEventos manejadorLogEventosLOGERRORES = new ManejadorLogEventos();
                if (!string.IsNullOrEmpty(Trama))
                {
                    manejadorLogEventosLOGERRORES.GuardarTrama("Inicio: " + fecha + " - Duracion: " + DuracionMilisegundos + "ms. IP: " + Ip + "- Usuario: " + Usuario + " - Url: " + Url + " - Trama Recepcion:\n" + Trama);
                }
                else
                {
                    manejadorLogEventosLOGERRORES.GuardarTrama("Fin: " + fecha + " - Duracion: " + DuracionMilisegundos + "ms. IP: " + Ip + "- Usuario: " + Usuario + " - Url: " + Url + " - Trama Recepcion:\n" + Trama);
                }
            }
        }
        public void GuardarTrama(string p)
        {
            ManejadorLog manejadorLog = new ManejadorLog();
            manejadorLog.GrabarLogOperaciones(p);
        }

        public void GrabarLogMapa(params string[] datos)
        {
            ManejadorLog manejadorLog = new ManejadorLog();
            manejadorLog.GrabarLogMapa(datos);
        }

        public void GrabarLogMapaBD(DateTime fechaInicio, DateTime FechaFin, double Duracion, Double DuracionSeg, string ip, string nombreUsuario, String TipoLlamada, string url, string tramaInput, string tramaOutput, string TipoEntrada, System.Data.SqlClient.SqlConnection conn = null, string idTrazabilidad = null, string valor1 = null, string IdEvento = null)
        {
            string cadena = "";
            if (ConfigurationManager.ConnectionStrings["ContextoParaBaseDatosLocal"] != null)
            {
                cadena = ConfigurationManager.ConnectionStrings["ContextoParaBaseDatosLocal"].ConnectionString;

                try
                {

                    using (TransactionScope transactionScope1 = new TransactionScope(TransactionScopeOption.RequiresNew))//(TransactionScopeOption.RequiresNew, option1))
                    {
                        using (SqlConnection conn1 = new SqlConnection(cadena))
                        {
                            try { conn1.Open(); }
                            catch { }

                            System.Data.SqlClient.SqlCommand cm = new System.Data.SqlClient.SqlCommand("usp_InsertLogMapa", conn1);
                            cm.CommandType = System.Data.CommandType.StoredProcedure;
                            cm.Parameters.Add("@FechaInicio", System.Data.SqlDbType.DateTime).Value = fechaInicio;
                            cm.Parameters.Add("@FechaFin", System.Data.SqlDbType.DateTime).Value = FechaFin;
                            cm.Parameters.Add("@DuracionMS", System.Data.SqlDbType.Decimal).Value = Duracion;
                            cm.Parameters.Add("@DuracionSeg", System.Data.SqlDbType.Decimal).Value = DuracionSeg;


                            if (!string.IsNullOrEmpty(IdEvento))
                                cm.Parameters.Add("@IdEvento", System.Data.SqlDbType.Char).Value = IdEvento;
                            else
                                cm.Parameters.Add("@IdEvento", System.Data.SqlDbType.Char).Value = DBNull.Value;


                            // INI vj 01/09/2014 - Modificación
                            if (!string.IsNullOrEmpty(idTrazabilidad))
                                cm.Parameters.Add("@IdTrazabilidad", System.Data.SqlDbType.Char).Value = idTrazabilidad;
                            else
                                cm.Parameters.Add("@IdTrazabilidad", System.Data.SqlDbType.Char).Value = DBNull.Value;
                            if (!string.IsNullOrEmpty(valor1))
                                cm.Parameters.Add("@Valor1", System.Data.SqlDbType.VarChar).Value = valor1;
                            else
                                cm.Parameters.Add("@Valor1", System.Data.SqlDbType.VarChar).Value = DBNull.Value;
                            // FIN vj 01/09/2014 - Modificación

                            if (!string.IsNullOrEmpty(ip))
                                cm.Parameters.Add("@IPLocal", System.Data.SqlDbType.VarChar).Value = ip;
                            else
                                cm.Parameters.Add("@IPLocal", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                            if (!string.IsNullOrEmpty(nombreUsuario))
                                cm.Parameters.Add("@Usuario", System.Data.SqlDbType.VarChar).Value = nombreUsuario;
                            else
                                cm.Parameters.Add("@Usuario", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                            if (!string.IsNullOrEmpty(TipoLlamada))
                                cm.Parameters.Add("@TipoLlamada", System.Data.SqlDbType.VarChar).Value = TipoLlamada;
                            else
                                cm.Parameters.Add("@TipoLlamada", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                            if (!string.IsNullOrEmpty(url))
                                cm.Parameters.Add("@URL", System.Data.SqlDbType.VarChar).Value = url;
                            else
                                cm.Parameters.Add("@URL", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                            if (!string.IsNullOrEmpty(tramaInput))
                                cm.Parameters.Add("@JsonRequest", System.Data.SqlDbType.Text).Value = tramaInput;
                            else
                                cm.Parameters.Add("@JsonRequest", System.Data.SqlDbType.Text).Value = tramaInput;

                            if (!string.IsNullOrEmpty(tramaOutput))
                                cm.Parameters.Add("@JsonResponse", System.Data.SqlDbType.Text).Value = tramaOutput;
                            else
                                cm.Parameters.Add("@JsonResponse", System.Data.SqlDbType.Text).Value = DBNull.Value;

                            if (!string.IsNullOrEmpty(TipoEntrada))
                                cm.Parameters.Add("@TipoEntrada", System.Data.SqlDbType.VarChar).Value = TipoEntrada;
                            else
                                cm.Parameters.Add("@TipoEntrada", System.Data.SqlDbType.VarChar).Value = DBNull.Value;

                            cm.ExecuteNonQuery();

                            try { conn1.Close(); }
                            catch { }
                        }

                        transactionScope1.Complete();
                    }

                }
                catch (Exception ex)
                {
                    var manejadorLogEventos = new ManejadorLogEventos();
                    manejadorLogEventos.GrabarLogMapa(
                        fechaInicio.ToString(),
                        FechaFin.ToString(),
                        Duracion.ToString(),
                        DuracionSeg.ToString(),
                        ip,
                        nombreUsuario,
                        TipoLlamada,
                        url,
                        ex.Message,
                        ex.ToString(),
                        "Error en GrabarLogMapaBD");
                }
            }
            else
            {
                var manejadorLogEventos = new ManejadorLogEventos();
                manejadorLogEventos.GrabarLogMapa(fechaInicio.ToString(), FechaFin.ToString(), Math.Round(Duracion, 2).ToString(), Math.Round(DuracionSeg, 2).ToString(), ip, nombreUsuario, TipoLlamada, url, tramaInput, tramaOutput, IdEvento != null ? IdEvento : "");
            }
        }
    }
}
