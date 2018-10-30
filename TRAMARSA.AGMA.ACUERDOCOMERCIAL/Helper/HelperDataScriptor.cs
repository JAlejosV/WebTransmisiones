using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Web.Script.Serialization;
using Newtonsoft.Json;


namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper
{
    public class HelperDataScriptor : Controller
    {
        public ActionResult Content(Controller controller, string path, Guid? templateId = new Guid?())
        {
            //if (string.IsNullOrWhiteSpace(path))
            //{
            //    Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult result = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //    {
            //        Error = true,
            //        Message = "Missing mandatory parameter: 'path'",
            //        Data = null
            //    };
            //    return base.Json(result, 0);
            //}
            //ScriptorChannel channel = Common.WebSiteChannel.Descendants.FirstOrDefault<ScriptorChannel>(ch => ch.FriendlyPath.EndsWith(path.Substring(0, path.LastIndexOf('/'))));
            //if (channel == null)
            //{
            //    Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult result2 = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //    {
            //        Error = true,
            //        Message = "Channel not found",
            //        Data = null
            //    };
            //    return base.Json(result2, 0);
            //}
            //ScriptorContent contentByFriendlyTitle = channel.GetContentByFriendlyTitle(path.Split(new char[] { '/' }).LastOrDefault<string>());
            //if (contentByFriendlyTitle == null)
            //{
            //    Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult result3 = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //    {
            //        Error = true,
            //        Message = "Content not found",
            //        Data = null
            //    };
            //    return base.Json(result3, 0);
            //}
            //if (templateId.HasValue)
            //{
            //    Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult result4 = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //    {
            //        Error = false,
            //        Message = "OK",
            //        Data = contentByFriendlyTitle.GetTemplateView(controller.ControllerContext, Common.LayoutContent, new Guid?(templateId.Value)).RenderToString<ScriptorContent>(contentByFriendlyTitle, null, null)
            //    };
            //    return this.LargeJson(result4, 0, null);
            //}
            //Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult data = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //{
            //    Error = false,
            //    Message = "OK",
            //    Data = this.SafeContent(contentByFriendlyTitle)
            //};
            //return this.LargeJson(data, 0, null);
            return null;
        }



        public ActionResult ChannelProperties(string path, Guid? id, bool? children = false, string authToken = null)
        {
            return null;
            //Func<ScriptorChannel, bool> predicate = null;
            //Func<ScriptorChannel, bool> func2 = null;
            //Func<ScriptorContent, object> selector = null;
            //Func<ScriptorContent, object> func4 = null;
            //if (string.IsNullOrWhiteSpace(path) && !id.HasValue)
            //{
            //    Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult result = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //    {
            //        Error = true,
            //        Message = "Missing mandatory parameter: 'path' or 'id'",
            //        Data = null
            //    };
            //    return base.Json(result, 0);
            //}
            //ScriptorChannel channel = null;
            //if (authToken == null)
            //{
            //    if (!id.HasValue)
            //    {
            //    }
            //    if (predicate == null)
            //    {
            //        predicate = ch => ch.Id == id.Value;
            //    }
            //    channel = (func2 != null) ? Common.WebSiteChannel.DescendantsAndSelf.FirstOrDefault<ScriptorChannel>(predicate) : Common.WebSiteChannel.DescendantsAndSelf.FirstOrDefault<ScriptorChannel>((func2 = ch => ch.FriendlyPath.EndsWith(path)));
            //    Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult result2 = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //    {
            //        Error = false,
            //        Message = "OK"
            //    };
            //    if (selector == null)
            //    {
            //        selector = c => this.SafeContent(c);
            //    }
            //    result2.Data = channel.Properties.Contents.Select<ScriptorContent, object>(selector);
            //    return this.LargeJson(result2, 0, null);
            //}
            //ScriptorClient client = new ScriptorClient(null, null, null, null);
            //client.ChangeUserWithToken(authToken);
            //channel = id.HasValue ? client.GetChannel(id.Value, null) : client.GetChannel(path, null);
            //Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult data = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //{
            //    Error = false,
            //    Message = "OK"
            //};
            //if (func4 == null)
            //{
            //    func4 = c => this.SafeContent(c);
            //}
            //data.Data = channel.Properties.Contents.Select<ScriptorContent, object>(func4);
            //LargeJsonResult result3 = this.LargeJson(data, 0, null);
            //client.DisposeScriptorObject();
            //return result3;
        }




        public ActionResult QueryContents(string path, Guid? id, string[] query, int? skip = new int?(), int? take = new int?(), string orderBy = null, string authToken = null)
        {
            return null;
            //Func<ScriptorChannel, bool> predicate = null;
            //Func<ScriptorChannel, bool> func2 = null;
            //if (string.IsNullOrWhiteSpace(path) && !id.HasValue)
            //{
            //    Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult result = new Viatecla.Factory.Scriptor.ModularSite.Controllers.DataController.DataResult
            //    {
            //        Error = true,
            //        Message = "Missing mandatory parameter: 'path' or 'id'",
            //        Data = null
            //    };
            //    return this.Json(result, 0);
            //}
            //ScriptorChannel channel = null;
            //if (authToken == null)
            //{
            //    if (!id.HasValue)
            //    {
            //    }
            //    if (predicate == null)
            //    {
            //        predicate = ch => ch.Id == id.Value;
            //    }
            //    channel = (func2 != null) ? Common.WebSiteChannel.DescendantsAndSelf.FirstOrDefault<ScriptorChannel>(predicate) : Common.WebSiteChannel.DescendantsAndSelf.FirstOrDefault<ScriptorChannel>((func2 = ch => ch.FriendlyPath.EndsWith(path)));
            //    return this.QueryContentsResult(channel, query, skip, take, orderBy);
            //}
            //ScriptorClient client = new ScriptorClient(null, null, null, null);
            //client.ChangeUserWithToken(authToken);
            //channel = id.HasValue ? client.GetChannel(id.Value, null) : client.GetChannel(path, null);
            //ActionResult result2 = this.QueryContentsResult(channel, query, skip, take, orderBy);
            //client.DisposeScriptorObject();
            //return result2;
        }
  

        public string ObtenerCampoOrdenDefault(Guid idGrilla)
        {
            return "";
            //string obtenerColumnaOrden = "";
            //List<ScriptorContent> ListaEstadosScriptor = new List<ScriptorContent>();
            //Guid? idCanalGrilla = new Guid("69A1584C-D5EF-454F-8476-9F31A959B90A");
            //ScriptorClient scriptorClient = Common.ScriptorClient;// new ScriptorClient(); //nuevo cliente para evitar uso de cache
            //ScriptorChannel canalEstados = scriptorClient.GetChannel(idCanalGrilla.Value); //usar el nuevo cliente
            //ListaEstadosScriptor = canalEstados.QueryContents("#Id", idGrilla, "=").ToList();
            //if (ListaEstadosScriptor.Count > 0)
            //{
            //    ScriptorContentInsert columnasResulta = (ScriptorContentInsert)ListaEstadosScriptor[0].Parts.columnas;
            //    if (columnasResulta.Count > 0)
            //    {
            //        foreach (ScriptorContent contenido in columnasResulta)
            //        {

            //            string ordenDefecto = contenido.Parts.OrdenDefecto;
            //            if (ordenDefecto == "1")
            //            {
            //                obtenerColumnaOrden = contenido.Parts.IdColumna;
            //                break;
            //            }
            //        }
            //    }
            //}
            //return obtenerColumnaOrden;
        }

        public string ObtenerNombreUrlUtilizarPorTipo(Guid idTipoUtilizar)
        {
            return "";
            //string nombreUrlUtilizar = "";
            //List<ScriptorContent> ListaTipoUrlScriptor = new List<ScriptorContent>();

            //JavaScriptSerializer js = new JavaScriptSerializer();
            //Guid? idCanalTipoUrl = new Guid("43372FD4-C3DF-40E0-BD16-258F775EE00D");
            //ScriptorClient scriptorClient = Common.ScriptorClient;// new ScriptorClient(); //nuevo cliente para evitar uso de cache
            //ScriptorChannel canalTipoUrl = scriptorClient.GetChannel(idCanalTipoUrl.Value); //usar el nuevo cliente
            //ListaTipoUrlScriptor = canalTipoUrl.QueryContents("#Id", idTipoUtilizar, "=").ToList();
            //if (ListaTipoUrlScriptor.Count > 0)
            //{
            //    ScriptorContent contenido = ListaTipoUrlScriptor[0];
            //    nombreUrlUtilizar = contenido.Parts.Descripcion;
            //}
            //return nombreUrlUtilizar;
        }


    }
}