using GR.Frameworks;
using GR.Frameworks.DTO;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Xml;


namespace GR.Frameworks
{
    public class HelperEnviarCorreo
    {
        public String From { get; set; }

        public static List<string> LeerXML(string xmltexto, string xpath, List<String> nodosLeer, bool incluirRaiz = false, bool esLista = false)
        {
            string pathLeerLista = xpath;
            List<String> salidaNodosLeer = new List<string>();
            XmlDocument xmlDoc = new XmlDocument();
            string myXML = "<?xml version=\"1.0\" encoding=\"utf-16\"?>";
            if (incluirRaiz)
            {
                xpath = "raiz" + (String.IsNullOrEmpty(xpath) ? "" : "/" + xpath);

                myXML = myXML + "<raiz>";
            }
            myXML = myXML + xmltexto;
            if (incluirRaiz)
                myXML = myXML + "</raiz>";
            xmlDoc.LoadXml(myXML);


            //string xpath = ;
            XmlNodeList parentNode = null;
            if (esLista == false)
            {
                parentNode = xmlDoc.SelectNodes(xpath);
                foreach (XmlNode childrenNode in parentNode)
                {
                    foreach (String item in nodosLeer)
                    {
                        if (childrenNode.SelectSingleNode("//" + item).InnerXml != null)
                            salidaNodosLeer.Add(childrenNode.SelectSingleNode("//" + item).InnerXml);
                        else
                            salidaNodosLeer.Add("");
                    }
                }
            }
            else
            {
                parentNode = xmlDoc.GetElementsByTagName(pathLeerLista);
                foreach (XmlNode childrenNode in parentNode)
                {
                    if (childrenNode.InnerXml != null)
                        salidaNodosLeer.Add(childrenNode.InnerXml);
                    else
                        salidaNodosLeer.Add("");
                }
            }
            return salidaNodosLeer;
        }
        public bool EnviarCorreoInBackground(CorreoBE correo)
        {
            try
            {
                Thread tareas = new Thread(() => { this.EnviarCorreoLocal(correo); });
                tareas.Start();
                return true;
            }
            catch (Exception ex)
            {
                HelperEnviarCorreo.CrearLog(string.Format("{0}{1}{2}", DateTime.Now, Environment.NewLine, ex.Message));
                return false;
            }
        }
        public HelperEnviarCorreo()
        {
            From = "";
        }

        public HelperEnviarCorreo(String from)
        {
            From = from;
        }
        public void EnviarCorreoLocal(CorreoBE correo)
        {

            EnviarCorreo_Aux(correo,
                                true,
                                System.Net.Mail.MailPriority.Normal);

        }

        //public bool EnviarCorreo(string idCanalContenido, string idContenido, Dictionary<string, string> comodinesNotificacion, string idCanalNotificaciones, string idContenidoNotificaciones, string rutaFrondEnd = "")
        //{
        //    bool result = false;
        //    string destino = "";
        //    try
        //    {
        //        HelperEnviarCorreo.CrearLog("EnviarCorreoComodin - Inicio :");
        //        //List<string> comodines = new List<string>();
        //        List<string> valores = new List<string>();

        //        List<string> comodines = new List<string>();

        //        (new ManejadorLog()).RegistrarEvento("dentro de mailerEnviarCorreo");

        //        //Obtener la plantilla para el envio de correo
        //        ScriptorChannel canalNotificaciones = Common.ScriptorClient.GetChannel(new Guid(idCanalNotificaciones));
        //        ScriptorContent contenidoNotificaciones = canalNotificaciones.GetContent(new Guid(idContenidoNotificaciones));
        //        //ScriptorContent contenidoNotificaciones = canalNotificaciones.Contents.Find(x => x.Id.ToString().ToUpper() == idContenidoNotificaciones.ToUpper());

        //        (new ManejadorLog()).RegistrarEvento("despues de canalNotificaciones");


        //        HelperEnviarCorreo.CrearLog("Bien 1");
        //        //var d = contenidoNotificaciones.Parts.A[0].Parts.A;
        //        var archivos = (ScriptorContentInsert)contenidoNotificaciones.Parts.ArchivosAdjuntos;

        //        HelperEnviarCorreo.CrearLog("Bien 2");
        //        CorreoBE correo = new CorreoBE();

        //        if (contenidoNotificaciones.Parts.CorreoPara != "" && contenidoNotificaciones.Parts.CorreoPara != null)
        //        {
        //            correo.Para.Add(contenidoNotificaciones.Parts.CorreoPara);
        //        }

        //        if (comodinesNotificacion != null && comodinesNotificacion.ContainsKey("_para_"))
        //        {
        //            correo.Para.Clear();
        //            destino = comodinesNotificacion["_para_"];
        //            correo.Para.Add(destino);
        //            comodinesNotificacion.Remove("_para_");
        //        }
        //        HelperEnviarCorreo.CrearLog("Bien 3");


        //        if (idCanalContenido != string.Empty && idContenido != string.Empty)
        //        {
        //            //Obtener el contenido para reemplazar los valores en el cuerpo del correo
        //            ScriptorChannel canalContenido = Common.ScriptorClient.GetChannel(new Guid(idCanalContenido));
        //            ScriptorContent contenido = canalContenido.GetContent(new Guid(idContenido));

        //            //ScriptorContent contenido = canalContenido.Contents.Find(x => x.Id.ToString().ToUpper() == idContenido.ToUpper());
        //            HelperEnviarCorreo.CrearLog(idContenido.ToUpper());

        //            if (correo.Para.Count == 0)
        //            {
        //                HelperEnviarCorreo.CrearLog("correo1");

        //                if (contenido.Parts.NombreCompleto != "" && contenido.Parts.NombreCompleto != null)
        //                {
        //                    HelperEnviarCorreo.CrearLog("correo2");
        //                    correo.Para.Add(contenido.Parts.NombreCompleto);
        //                    HelperEnviarCorreo.CrearLog("correo3");
        //                }
        //            }

        //            foreach (var llave in contenido.Parts.Values)
        //            {
        //                string valor = "";

        //                if (llave.GetType().ToString() == "Viatecla.Factory.Scriptor.ScriptorDropdownListValue")
        //                {
        //                    valor = llave.Title;
        //                }
        //                else if (llave.GetType().ToString() == "Viatecla.Factory.Scriptor.ScriptorContentInsert")
        //                {

        //                }
        //                else
        //                {
        //                    valor = llave;
        //                }

        //                valores.Add(valor);
        //            }

        //            comodines = new List<string>(contenido.Parts.Keys);
        //        }
        //        else
        //        {
        //            comodines = comodinesNotificacion.Keys.ToList<string>();
        //            valores = comodinesNotificacion.Values.ToList<string>();
        //        }

        //        HelperEnviarCorreo.CrearLog("Bien 4");
        //        if (contenidoNotificaciones.Parts.CorreoCCO != "" && contenidoNotificaciones.Parts.CorreoCCO != null)
        //        {
        //            correo.ConCopiaOculta.Add(contenidoNotificaciones.Parts.CorreoCCO);
        //        }

        //        HelperEnviarCorreo.CrearLog("Bien 5");
        //        String from = contenidoNotificaciones.Parts.CorreoDe;

        //        correo.Asunto = contenidoNotificaciones.Parts.Asunto;
        //        correo.CuerpoMensaje = contenidoNotificaciones.Parts.CorreoBody.ToString();

        //        HelperEnviarCorreo.CrearLog("Bien 6");
        //        //correo.CuerpoMensaje = ReemplazarComodines(correo.CuerpoMensaje, this.GetComodines(comodines), valores, rutaFrondEnd);

        //        correo.ArchivosAdjuntos = this.GetArchivosAdjuntos(archivos, rutaFrondEnd);

        //        HelperEnviarCorreo helperEnviarCorreo = new HelperEnviarCorreo(from);
        //        helperEnviarCorreo.EnviarCorreoLocal(correo);

        //        HelperEnviarCorreo.CrearLog("EnviarCorreoComodin - Fin:");

        //        result = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        HelperEnviarCorreo.CrearLog("EnviarCorreoComodin - Error:" + ex.Message);
        //        HelperEnviarCorreo.CrearLog("EnviarCorreoComodin - Error:" + ex.InnerException);
        //        HelperEnviarCorreo.CrearLog("EnviarCorreoComodin - Error:" + ex.StackTrace);
        //        result = false;
        //    }

        //    return result;
        //}

        //public List<ArchivoAdjunto> GetArchivosAdjuntos(ScriptorContentInsert contentInsert, string pathFrontEnd)
        //{
        //    List<ArchivoAdjunto> archivoAdjuntoList = new List<ArchivoAdjunto>();

        //    foreach (ScriptorContent content in contentInsert)
        //    {
        //        ArchivoAdjunto archivoAdjunto = new ArchivoAdjunto();
        //        archivoAdjunto.NombreArchivo = content.Parts.Titulo;
        //        archivoAdjunto.RutaArchivoWeb = string.Format("{0}{1}", pathFrontEnd, content.Parts.ArchivoAdjunto);
        //        archivoAdjunto.RutaArchivoWeb = archivoAdjunto.GetRutaArchivoWebFront();
        //        archivoAdjuntoList.Add(archivoAdjunto);
        //    }

        //    return archivoAdjuntoList;
        //}

        private void EnviarCorreo_Aux(CorreoBE correo,
                                Boolean isbodyHtml,
                                System.Net.Mail.MailPriority prioridad)
        {
            System.Net.Mail.MailMessage Mail = new System.Net.Mail.MailMessage();

            isbodyHtml = true;
            prioridad = System.Net.Mail.MailPriority.High;

            List<LinkedResource> lstLinked = new List<LinkedResource>();
            //'----------------------------------------------------------------------------------
            if (correo.Para != null)
                foreach (String reg in correo.Para)
                    Mail.To.Add(reg);
            if (correo.ConCopia != null)
                foreach (String reg in correo.ConCopia)
                    Mail.CC.Add(reg);
            if (correo.ConCopiaOculta != null)
                foreach (String reg in correo.ConCopiaOculta)
                    Mail.Bcc.Add(reg);
            if (correo.ArchivosAdjuntos != null)
                foreach (ArchivoAdjunto reg in correo.ArchivosAdjuntos)
                {
                    if (String.IsNullOrEmpty(reg.RutaArchivoDisco))
                    {
                        if (!String.IsNullOrEmpty(reg.RutaArchivoWeb))
                        {
                            System.Net.Mail.Attachment archivo = null;
                            switch (System.Configuration.ConfigurationManager.AppSettings["TipoCorreoAdjunto"])
                            {
                                case "1"://adjunto
                                    reg.RutaArchivoDisco = HelperEnviarCorreo.GuardarImagenDeUrl(reg.RutaArchivoWeb, reg.NombreArchivo);
                                    //adjunto
                                    archivo = new System.Net.Mail.Attachment(reg.RutaArchivoDisco);
                                    Mail.Attachments.Add(archivo);
                                    break;
                                case "2"://base64

                                    if (reg.NombreArchivo.ToUpper().Contains(".PNG") ||
                                           reg.NombreArchivo.ToUpper().Contains(".JPEG") ||
                                           reg.NombreArchivo.ToUpper().Contains(".GIF") ||
                                           reg.NombreArchivo.ToUpper().Contains(".JPG"))
                                    {
                                        /*
                                        string imagen64bits = "";
                                        reg.RutaArchivoDisco = HelperEnviarCorreo.GuardarImagenDeUrl(reg.RutaArchivoWeb, reg.NombreArchivo, out imagen64bits);
                                        reg.Imagen64bits = imagen64bits;

                                        correo.CuerpoMensaje = correo.CuerpoMensaje.Replace("cid:" + reg.NombreArchivo, "data:image/jpeg;base64," + reg.Imagen64bits);
                                         */
                                        reg.RutaArchivoDisco = HelperEnviarCorreo.GuardarImagenDeUrl(reg.RutaArchivoWeb, reg.NombreArchivo);
                                        LinkedResource sampleImage = new LinkedResource(reg.RutaArchivoDisco,
                                                    MediaTypeNames.Image.Jpeg);
                                        sampleImage.ContentId = reg.NombreArchivo;
                                        lstLinked.Add(sampleImage);
                                    }
                                    else
                                    {
                                        reg.RutaArchivoDisco = HelperEnviarCorreo.GuardarImagenDeUrl(reg.RutaArchivoWeb, reg.NombreArchivo);
                                        //adjunto
                                        archivo = new System.Net.Mail.Attachment(reg.RutaArchivoDisco);
                                        Mail.Attachments.Add(archivo);
                                    }
                                    break;
                                case "3"://url
                                    string urlDominioWebFrontEnd = System.Configuration.ConfigurationManager.AppSettings["UrlDominioWebFrontEnd"];
                                    string urlTmp = reg.GetRutaArchivoWebFront();
                                    string urlTmpSufijo = "";
                                    string[] listatmp = urlTmp.Split('/');
                                    for (int i = 0; i < listatmp.Length; i++)
                                    {
                                        if (i >= 3)
                                        {
                                            urlTmpSufijo = urlTmpSufijo + '/' + listatmp[i];
                                        }
                                    }
                                    urlTmp = urlDominioWebFrontEnd + urlTmpSufijo;
                                    correo.CuerpoMensaje = correo.CuerpoMensaje.Replace("cid:" + reg.NombreArchivo, urlTmp);
                                    break;
                            }

                        }
                    }
                }



            Mail.From = new System.Net.Mail.MailAddress(this.From);

            Mail.Subject = correo.Asunto;
            Mail.IsBodyHtml = isbodyHtml;
            Mail.Body = correo.CuerpoMensaje;
            switch (System.Configuration.ConfigurationManager.AppSettings["TipoCorreoAdjunto"])
            {
                case "2"://adjunto
                    {
                        /*ContentType mimeType = new System.Net.Mime.ContentType("text/html");
                        AlternateView alternate = AlternateView.CreateAlternateViewFromString(correo.CuerpoMensaje, mimeType);
                        Mail.AlternateViews.Add(alternate);*/
                        AlternateView htmlView = AlternateView.CreateAlternateViewFromString(correo.CuerpoMensaje, null, MediaTypeNames.Text.Html);
                        foreach (var item in lstLinked)
                        {
                            htmlView.LinkedResources.Add(item);
                        }
                        Mail.AlternateViews.Add(htmlView);
                    }
                    break;
            }

            //'----------------------------------------------------------------------------------
            SmtpClient cliente = new SmtpClient();
            cliente.Host = "" + System.Configuration.ConfigurationManager.AppSettings["Host"];
            if (Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["Port"]) != "")
            {
                cliente.Port = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["Port"]);
            }
            cliente.EnableSsl = Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["EnableSsl"]);
            cliente.UseDefaultCredentials = Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["UseDefaultCredentials"]);
            if (cliente.UseDefaultCredentials == false)
            {
                cliente.Credentials = new NetworkCredential(System.Configuration.ConfigurationManager.AppSettings["CredentialsUser"], "" + System.Configuration.ConfigurationManager.AppSettings["CredentialsClave"]);
            }

            //'----------------------------------------------------------------------------------
            try
            {
                cliente.Send(Mail);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);


            }
        }
        private static string GuardarImagenDeUrl_Aux(string imageUrl, string nombreArchivo)
        {
            if (!Directory.Exists(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\MAILTMP\\"))
            {
                Directory.CreateDirectory(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\MAILTMP\\");
            }
            string path = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\MAILTMP\\" + nombreArchivo;
            return path;
        }
        private static string GuardarImagenDeUrl(string imageUrl, string nombreArchivo, out string imagen64bits)
        {
            string path = GuardarImagenDeUrl_Aux(imageUrl, nombreArchivo);
            return UtilitarioRest.DownloadRemoteImageFile(imageUrl, path, out imagen64bits);
        }
        private static string GuardarImagenDeUrl(string imageUrl, string nombreArchivo)
        {
            string path = GuardarImagenDeUrl_Aux(imageUrl, nombreArchivo);
            return UtilitarioRest.DownloadRemoteImageFile(imageUrl, path);
        }
        private static string GuardarArchivoDisco(byte[] buffer, string nombreArchivo)
        {
            string path = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "" + nombreArchivo;
            System.IO.MemoryStream ms = new System.IO.MemoryStream(buffer);
            System.Drawing.Bitmap b = (System.Drawing.Bitmap)System.Drawing.Image.FromStream(ms);
            b.Save(path);//System.Drawing.Imaging.ImageFormat.Png

            return path;
        }

        public static void CrearLog(string texto)
        {
            try
            {
                if (Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["HabilitarLog"]) == "1")
                {
                    string rutaCarpeta = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\MAILTMP\\";
                    if (!Directory.Exists(rutaCarpeta))
                    {
                        Directory.Exists(rutaCarpeta);
                    }


                    string ruta = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\MAILTMP\\log.txt";

                    string lines = String.Format("{0} - {1} ", DateTime.Now.ToString(), texto);

                    // Write the string to a file.
                    using (System.IO.StreamWriter file = new System.IO.StreamWriter(ruta, true))
                    {
                        file.WriteLine(lines);
                        file.Close();
                    }
                }
            }
            catch (Exception)
            {

            }

        }
        public string ReplaceKeyValues(string body, Dictionary<string, string> keyValues)
        {
            foreach (var item in keyValues)
                body = body.Replace(item.Key, item.Value);

            return body;
        }
    }
}
