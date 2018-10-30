using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using GR.Frameworks;
using GR.Msc.Memberships.Models;
using System.Web.Mvc;
using GR.Msc.Memberships;
using GR.Frameworks.Comun;
using GR.Msc.Memberships.Controllers;


namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper
{
    public class HelperCtrl
    {
        public static void GrabarLog(Exception ex, string titulo, PoliticaExcepcion politica)
        {
            ManejadorExcepciones.PublicarExcepcion(ex, politica);
        }
        public static RequestLogEvento ObtenerAtributosManejadorEventos(string Formulario, string NombreEvento, string nombreUsuario)
        {
            return new RequestLogEvento
            {
                NombreMaquina = GR.Frameworks.Helper.GetNombreMaquina(),
                DireccionIP = GR.Frameworks.Helper.LocalIPAddress(),
                NombreUsuario = nombreUsuario,
                Formulario = Formulario,
                NombreEvento = NombreEvento
            };
        }

        //public static ContentResult ExportarExcel(dynamic listaRespuesta, dynamic listaResultadosGrilla, Guid idGrilla, string idColumna, string requestExportarexcel, HttpResponseBase Response)
        //{
        //    if (listaRespuesta.Result.Satisfactorio == true)
        //    {
        //        List<ScriptorContent> columnasScriptor = ObtenerGrillaScriptor(idGrilla);
        //        if (columnasScriptor.Count > 0)
        //        {
        //            string nombreReport = string.Format("Resumen_{0}", DateTime.Now.ToString("yyyy-MM-dd"));
        //            List<ReportColumnHeader> columnas = new List<ReportColumnHeader>();
        //            ScriptorContentInsert columnasResulta = (ScriptorContentInsert)columnasScriptor[0].Parts.columnas;
        //            if (columnasResulta.Count > 0)
        //            {
        //                foreach (ScriptorContentInsertContent contenido in columnasResulta)
        //                {
        //                    string columnaId = contenido.Parts.IdColumna;
        //                    string nombre = contenido.Parts.Nombre;
        //                    string flgOculto = contenido.Parts.oculto;
        //                    if(string.Compare(flgOculto,"1",StringComparison.OrdinalIgnoreCase) != 0)
        //                    {
        //                        columnas.Add(new ReportColumnHeader() { BindField = columnaId, HeaderName = nombre, FlgOculto = flgOculto });
        //                    }
        //                }
        //                ExportExcel.List2Excel(Response, listaResultadosGrilla, "Resumen", nombreReport, columnas);
        //            }
        //        }
        //        return null;
        //    }

        //    return null;
        //}

        public static string ObtenerUsuario()
        {
            //return ((ResponseUsuarioMscDTO)GR.Frameworks.Helper.GetSession("usuario")).Usuario.CodigoUsuario;
            return "jalejosv";
        }
        public static ResponseUsuarioAgmaDTO GetUsuarioCliente()
        {
            if (System.Web.HttpContext.Current.Session["usuarioCliente"] != null)
            {
                return (ResponseUsuarioAgmaDTO)System.Web.HttpContext.Current.Session["usuarioCliente"];
            }
            else
            {
                //throw new Exception("No hay un usuario Loggeado");
                return null;
            }
        }
        public static D MiMapper<O, D>(O registro)
        {
            Mapper.CreateMap<O, D>();
            return Mapper.Map<O, D>(registro);
        }

        public static ContentResult ExportarExcel(dynamic listaRespuesta, dynamic listaResultadosGrilla, Guid idGrilla, string idColumna, string requestExportarexcel, HttpResponseBase Response, string tituloReporte)
        {
            //dynamic filtros = obj;

            //filtros.ColumnaOrden = columnaOrden;

            //filtros.TamanoPagina = 9999;
            //filtros.PaginaActual = 1;

            //ResponseConsultaPedidoDTO listaRespuesta = new Proxy.ProxyRest().ListarConsultaPedido(filtros);

            //if (listaRespuesta.Result.Success == true)
            //if (listaRespuesta.Resultado.Estado == true)
            //{
            if (string.IsNullOrEmpty(requestExportarexcel))
            {
                int totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaRespuesta.NroPagina) / 9999).ToString());
                var res = Grid.toJSONFormat2(listaResultadosGrilla, 1, listaRespuesta.NroPagina, totalPages, idColumna);
                ContentResult cr = new ContentResult();
                cr.Content = res;
                return cr;
            }
            else
            {
                //List<ScriptorContent> columnasScriptor = ObtenerGrillaScriptor(idGrilla);
                //if (columnasScriptor.Count > 0)
                //{
                //    String nombreReport = string.Format("Resumen_{0}", DateTime.Now.ToString("yyyy-MM-dd"));
                //    List<ReportColumnHeader> columnas = new List<ReportColumnHeader>();
                //    ScriptorContentInsert columnasResulta = (ScriptorContentInsert)columnasScriptor[0].Parts.columnas;
                //    if (columnasResulta.Count > 0)
                //    {
                //        foreach (ScriptorContent contenido in columnasResulta)
                //        {
                //            string columnaId = contenido.Parts.IdColumna;
                //            string nombre = contenido.Parts.Nombre;
                //            string flgOculto = contenido.Parts.oculto;
                //            columnas.Add(new ReportColumnHeader()
                //                {
                //                    BindField = columnaId,
                //                    HeaderName = nombre,
                //                    FlgOculto = flgOculto
                //                });
                //        }
                //        ExportExcel.List2Excel(Response, listaResultadosGrilla, "Resumen", nombreReport, columnas);
                //    }
                //}
                return null;
            }
            //}

            return null;
        }
        //private static List<ScriptorContent> ObtenerGrillaScriptor(Guid idGrilla)
        //{
        //    List<ScriptorContent> ListaEstadosScriptor = new List<ScriptorContent>();
        //    Guid? idCanalGrilla = new Guid("69A1584C-D5EF-454F-8476-9F31A959B90A");
        //    ScriptorClient scriptorClient = Common.ScriptorClient;// new ScriptorClient(); //nuevo cliente para evitar uso de cache
        //    ScriptorChannel canalEstados = scriptorClient.GetChannel(idCanalGrilla.Value); //usar el nuevo cliente
        //    ListaEstadosScriptor = canalEstados.QueryContents("#Id", idGrilla, "=").ToList();
        //    return ListaEstadosScriptor;
        //}
    }
}