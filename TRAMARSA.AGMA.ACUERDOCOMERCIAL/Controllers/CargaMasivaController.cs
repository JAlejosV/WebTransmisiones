using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Text;
using System.Web;
using System.Web.Mvc;
using GR.Comun.DTO;
using GR.Frameworks;
using GR.Msc.Memberships.Models;
using Newtonsoft.Json;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.BL;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy;
using GR.Frameworks.Comun;
using GR.Scriptor.Frameworks.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class CargaMasivaController : Controller
    {

        public ActionResult CargaMasivaSobreestadia()
        {
            return View("../Acuerdos/CargaMasivaSobreestadia");
        }


        public ActionResult CargaMasivaIndex()
        {
            var responseConfig = new ResponseCargaMasivaIndexViewModel();
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                GR.Frameworks.Helper.SetSession("ListaNoIngresado", null);
                var responseListarLinea = new MaestrosAgente().ListarLinea();
                responseConfig.Linea = (from item in responseListarLinea.LineasList
                                        select HelperCtrl.MiMapper<ListaLineaDTO, ListaLineaViewModel>(item)).ToList();
                actionResult = Content(JsonConvert.SerializeObject(responseConfig));
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(), MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }

        /// <summary>
        /// Carga masiva de acuerdos comerciales
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CargaMasivaAc(ICollection<HttpPostedFileBase> files, string codigoLinea)
        {
            var manejadorLogEventos = new ManejadorLogEventos();
            var responseData = new ResponseCargaMasivaViewModel();
            try
            {
                if (files != null || files.Count > 0)
                {
                    var mensaje = new StringBuilder();
                    if (!string.IsNullOrWhiteSpace(codigoLinea))
                    {
                        var listaNoEnviadoServicio = new List<RAPTResultDTO>();
                        var flagOk = true;
                        var comentario = new StringBuilder();
                        var listComentarios = new List<String>();
                        var tipodato = "error de tipo de dato";
                        var vacio = "campo vacío";
                        var listaProcesarServicio = new List<CargaMasivaAcuerdoComercialViewModel>();
                        foreach (HttpPostedFileBase file in files)
                        {
                            if (file.ContentLength != 0)
                            {
                                //var dtCsv = ConvertCsVtoDataTable(file);
                                var dtCsv = ConvertXlstoDataTable(file);
                                if (dtCsv.Rows.Count > 0)
                                {
                                    #region Leer tabla
                                    foreach (DataRow row in dtCsv.Rows)
                                    {
                                        #region Lectura
                                        var oCargaMasiva = new CargaMasivaAcuerdoComercialViewModel();
                                        var oValidacion = new RAPTResultDTO();
                                        listComentarios = new List<string>();
                                        comentario = new StringBuilder();
                                        flagOk = true;
                                        #region ROW
                                        oCargaMasiva.Row = row["ROW"].ToString();
                                        #endregion
                                        #region CONTRACT NO
                                        if (row["CONTRACT NO"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["CONTRACT NO"].ToString()))
                                            {
                                                oCargaMasiva.ContractNo = row["CONTRACT NO"].ToString();
                                                oValidacion.ContractNo = oCargaMasiva.ContractNo;
                                            }
                                            else
                                            {
                                                listComentarios.Add("[CONTRACT NO: " + vacio + ", para ROW =" + oCargaMasiva.Row + "]");
                                                oValidacion.ContractNo = "ROW=" + oCargaMasiva.Row;
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[CONTRACT NO: " + vacio + ", ROW =" + oCargaMasiva.Row + "]");
                                            oValidacion.ContractNo = "ROW=" + oCargaMasiva.Row;
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region CU NAME
                                        if (row["CU NAME"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["CU NAME"].ToString()))
                                            {
                                                oCargaMasiva.CuName = row["CU NAME"].ToString();

                                            }
                                            else
                                            {
                                                listComentarios.Add("[CU NAME: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[CU NAME: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region SERVICE ID
                                        if (row["SERVICE ID"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["SERVICE ID"].ToString()))
                                            {
                                                oCargaMasiva.ServiceID = row["SERVICE ID"].ToString();
                                                oValidacion.SeriviceID = oCargaMasiva.ServiceID +
                                                    (!string.IsNullOrWhiteSpace(oCargaMasiva.CuName) ? "/" + oCargaMasiva.CuName : "");
                                            }
                                            else
                                            {
                                                listComentarios.Add("[SERVICE ID: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[SERVICE ID: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region LOC STRING
                                        if (row["LOC STRING"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["LOC STRING"].ToString()))
                                            {
                                                oCargaMasiva.LocString = row["LOC STRING"].ToString().Remove(0, 1);
                                            }
                                            else
                                            {
                                                listComentarios.Add("[LOC STRING: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[LOC STRING: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region RATE GROUP NAME
                                        if (row["RATE GROUP NAME"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["RATE GROUP NAME"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.RateGroupName = row["RATE GROUP NAME"].ToString();
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[RATE GROUP NAME: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[RATE GROUP NAME: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[RATE GROUP NAME: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region CHARGE TYPE
                                        if (row["CHARGE TYPE"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["CHARGE TYPE"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.ChargeType = row["CHARGE TYPE"].ToString();
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[CHARGE TYPE: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[CHARGE TYPE: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[CHARGE TYPE: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region TP R
                                        if (row["TP R"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TP R"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TpR = Convert.ToDecimal(row["TP R"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TP R: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[TP R: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[TP R: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region TP D
                                        if (row["TP D"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TP D"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TpD = Convert.ToDecimal(row["TP D"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TP D: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[TP D: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[TP D: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region TP B
                                        if (row["TP B"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TP B"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TpB = Convert.ToDecimal(row["TP B"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TP B: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[TP B: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[TP B: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region TP L
                                        if (row["TP L"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TP L"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TpL = row["TP L"].ToString();
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TP L: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[TP L: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[TP L: " + vacio + "]");
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region TP T
                                        if (row["TP T"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TP T"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TpT = Convert.ToInt32(row["TP T"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TP T: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[TP T: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[TP T: " + vacio + "]");
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region TARIFF TP R
                                        if (row["TARIFF TP R"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TARIFF TP R"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TariffTpR = Convert.ToDecimal(row["TARIFF TP R"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TARIFF TP R: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                oCargaMasiva.TariffTpR = 0;
                                            }
                                        }
                                        else
                                        {
                                            oCargaMasiva.TariffTpR = 0;
                                        }
                                        #endregion
                                        #region TARIFF TP D
                                        if (row["TARIFF TP D"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TARIFF TP D"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TariffTpD = Convert.ToDecimal(row["TARIFF TP D"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TARIFF TP D: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                oCargaMasiva.TariffTpD = 0;
                                            }
                                        }
                                        else
                                        {
                                            oCargaMasiva.TariffTpD = 0;
                                        }
                                        #endregion
                                        #region TARIFF TP B
                                        if (row["TARIFF TP B"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TARIFF TP B"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TariffTpB = Convert.ToDecimal(row["TARIFF TP B"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TARIFF TP B: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                oCargaMasiva.TariffTpB = 0;
                                            }
                                        }
                                        else
                                        {
                                            oCargaMasiva.TariffTpB = 0;
                                        }
                                        #endregion
                                        #region TARIFF TP L
                                        if (row["TARIFF TP L"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TARIFF TP L"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TariffTpL = row["TARIFF TP L"].ToString();
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TARIFF TP L: " + tipodato + "]");
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                oCargaMasiva.TariffTpL = string.Empty;
                                            }
                                        }
                                        else
                                        {
                                            oCargaMasiva.TariffTpL = string.Empty;
                                        }
                                        #endregion
                                        #region TARIFF TP T
                                        if (row["TARIFF TP T"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["TARIFF TP T"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.TariffTpT = Convert.ToDecimal(row["TARIFF TP T"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[TARIFF TP T: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                oCargaMasiva.TariffTpT = 0;
                                            }
                                        }
                                        else
                                        {
                                            oCargaMasiva.TariffTpT = 0;
                                        }
                                        #endregion
                                        #region RATE AMOUNT
                                        if (row["RATE AMOUNT"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["RATE AMOUNT"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.RateAmount = Convert.ToDecimal(row["RATE AMOUNT"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[RATE AMOUNT: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[RATE AMOUNT: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[RATE AMOUNT: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region CURR
                                        if (oCargaMasiva.RateAmount > 0)
                                        {
                                            if (row["CURR"] != DBNull.Value)
                                            {
                                                if (!string.IsNullOrWhiteSpace(row["CURR"].ToString()))
                                                {
                                                    oCargaMasiva.Curr = row["CURR"].ToString();
                                                }
                                                else
                                                {
                                                    listComentarios.Add("[CURR: " + vacio + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[CURR: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            if (row["CURR"] != DBNull.Value)
                                            {
                                                if (!string.IsNullOrWhiteSpace(row["CURR"].ToString()))
                                                {
                                                    oCargaMasiva.Curr = row["CURR"].ToString();
                                                }
                                            }
                                        }
                                        #endregion
                                        #region RATE VALID TO
                                        if (row["RATE VALID TO"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["RATE VALID TO"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.RateValidTO = Convert.ToDateTime(row["RATE VALID TO"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[RATE VALID TO: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[RATE VALID TO: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[RATE VALID TO: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region UPD USERID
                                        if (row["UPD USERID"] != DBNull.Value)
                                        {
                                            oCargaMasiva.UpdUserID = !string.IsNullOrWhiteSpace(row["UPD USERID"].ToString()) ? row["UPD USERID"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.UpdUserID = string.Empty;
                                        }
                                        #endregion
                                        #region SR VALID
                                        if (row["SR VALID"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["SR VALID"].ToString()))
                                            {
                                                oCargaMasiva.SrValid = row["SR VALID"].ToString();
                                            }
                                            else
                                            {
                                                listComentarios.Add("[SR VALID: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[SR VALID: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region RATE CHANGED
                                        if (row["RATE CHANGED"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["RATE CHANGED"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.RateChanged = Convert.ToDateTime(row["RATE CHANGED"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[RATE CHANGED: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[RATE CHANGED: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[RATE CHANGED: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region DATE OF ISSUE
                                        if (row["DATE OF ISSUE"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["DATE OF ISSUE"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.DateOfIssue = Convert.ToDateTime(row["DATE OF ISSUE"].ToString());
                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[DATE OF ISSUE: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[DATE OF ISSUE: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[DATE OF ISSUE: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion
                                        #region CU SUPP
                                        if (row["CU SUPP"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["CU SUPP"].ToString()))
                                            {
                                                oCargaMasiva.CuSupp = row["CU SUPP"].ToString();
                                            }
                                            else
                                            {
                                                listComentarios.Add("[CU SUPP: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[CU SUPP: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;
                                        }
                                        #endregion

                                        //NUEVO -
                                        #region RATE VALID FROM

                                        if (row["RATE VALID FROM"] != DBNull.Value)
                                        {
                                            if (!string.IsNullOrWhiteSpace(row["RATE VALID FROM"].ToString()))
                                            {
                                                try
                                                {
                                                    oCargaMasiva.RateValidFROM = Convert.ToDateTime(row["RATE VALID FROM"].ToString());

                                                }
                                                catch (Exception ex)
                                                {
                                                    listComentarios.Add("[RATE VALID FROM: " + tipodato + "]");
                                                    oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                    flagOk = false;
                                                }
                                            }
                                            else
                                            {
                                                listComentarios.Add("[RATE VALID FROM: " + vacio + "]");
                                                oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                                flagOk = false;
                                            }
                                        }
                                        else
                                        {
                                            listComentarios.Add("[RATE VALID FROM: " + vacio + "]");
                                            oValidacion.Row = Convert.ToInt32(oCargaMasiva.Row);
                                            flagOk = false;

                                        }
                                        #endregion
                                        #region ACCOUNT
                                        if (row["ACCOUNT"] != DBNull.Value)
                                        {
                                            oCargaMasiva.Account = !string.IsNullOrWhiteSpace(row["ACCOUNT"].ToString()) ? row["ACCOUNT"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.Account = string.Empty;
                                        }
                                        #endregion
                                        #region TYPE
                                        if (row["TYPE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.Type = !string.IsNullOrWhiteSpace(row["TYPE"].ToString()) ? row["TYPE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.Type = string.Empty;
                                        }
                                        #endregion
                                        #region HS CHAPTER
                                        if (row["HS CHAPTER"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HSChapter = !string.IsNullOrWhiteSpace(row["HS CHAPTER"].ToString()) ? row["HS CHAPTER"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HSChapter = string.Empty;
                                        }
                                        #endregion
                                        #region HS POSITION
                                        if (row["HS POSITION"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HSPosition = !string.IsNullOrWhiteSpace(row["HS POSITION"].ToString()) ? row["HS POSITION"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HSPosition = string.Empty;
                                        }
                                        #endregion
                                        #region HS SUBPOSITION
                                        if (row["HS SUBPOSITION"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HSSubPosition = !string.IsNullOrWhiteSpace(row["HS SUBPOSITION"].ToString()) ? row["HS SUBPOSITION"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HSSubPosition = string.Empty;
                                        }
                                        #endregion
                                        #region DG
                                        if (row["DG"] != DBNull.Value)
                                        {
                                            oCargaMasiva.DG = !string.IsNullOrWhiteSpace(row["DG"].ToString()) ? row["DG"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.DG = string.Empty;
                                        }
                                        #endregion
                                        #region SHIPPERS OWN
                                        if (row["SHIPPERS OWN"] != DBNull.Value)
                                        {
                                            oCargaMasiva.ShippersOwn = !string.IsNullOrWhiteSpace(row["SHIPPERS OWN"].ToString()) ? row["SHIPPERS OWN"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.ShippersOwn = string.Empty;
                                        }
                                        #endregion
                                        #region OPER REEFER
                                        if (row["OPER REEFER"] != DBNull.Value)
                                        {
                                            oCargaMasiva.OperReefer = !string.IsNullOrWhiteSpace(row["OPER REEFER"].ToString()) ? row["OPER REEFER"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.OperReefer = string.Empty;
                                        }
                                        #endregion
                                        #region CG 1 HS CODE
                                        if (row["CG 1 HS CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG1HSCode = !string.IsNullOrWhiteSpace(row["CG 1 HS CODE"].ToString()) ? row["CG 1 HS CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG1HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region CG 1 HS DESC
                                        if (row["CG 1 HS DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG1HSDesc = !string.IsNullOrWhiteSpace(row["CG 1 HS DESC"].ToString()) ? row["CG 1 HS DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG1HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region CG 2 HS CODE
                                        if (row["CG 2 HS CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG2HSCode = !string.IsNullOrWhiteSpace(row["CG 2 HS CODE"].ToString()) ? row["CG 2 HS CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG2HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region CG 2 HS DESC
                                        if (row["CG 2 HS DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG2HSDesc = !string.IsNullOrWhiteSpace(row["CG 2 HS DESC"].ToString()) ? row["CG 2 HS DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG2HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region CG 3 HS CODE
                                        if (row["CG 3 HS CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG3HSCode = !string.IsNullOrWhiteSpace(row["CG 3 HS CODE"].ToString()) ? row["CG 3 HS CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG3HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region CG 3 HS DESC
                                        if (row["CG 3 HS DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG3HSDesc = !string.IsNullOrWhiteSpace(row["CG 3 HS DESC"].ToString()) ? row["CG 3 HS DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG3HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region CG 4 HS CODE
                                        if (row["CG 4 HS CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG4HSCode = !string.IsNullOrWhiteSpace(row["CG 4 HS CODE"].ToString()) ? row["CG 4 HS CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG4HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region CG 4 HS DESC
                                        if (row["CG 4 HS DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG4HSDesc = !string.IsNullOrWhiteSpace(row["CG 4 HS DESC"].ToString()) ? row["CG 4 HS DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG4HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region CG 5 HS CODE
                                        if (row["CG 5 HS CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG5HSCode = !string.IsNullOrWhiteSpace(row["CG 5 HS CODE"].ToString()) ? row["CG 5 HS CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG5HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region CG 5 HS DESC
                                        if (row["CG 5 HS DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.CG5HSDesc = !string.IsNullOrWhiteSpace(row["CG 5 HS DESC"].ToString()) ? row["CG 5 HS DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.CG5HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region HS 1 CODE
                                        if (row["HS 1 CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS1HSCode = !string.IsNullOrWhiteSpace(row["HS 1 CODE"].ToString()) ? row["HS 1 CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS1HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region HS 1 DESC
                                        if (row["HS 1 DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS1HSDesc = !string.IsNullOrWhiteSpace(row["HS 1 DESC"].ToString()) ? row["HS 1 DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS1HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region HS 2 CODE
                                        if (row["HS 2 CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS2HSCode = !string.IsNullOrWhiteSpace(row["HS 2 CODE"].ToString()) ? row["HS 2 CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS2HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region HS 2 DESC
                                        if (row["HS 2 DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS2HSDesc = !string.IsNullOrWhiteSpace(row["HS 2 DESC"].ToString()) ? row["HS 2 DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS2HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region HS 3 CODE
                                        if (row["HS 3 CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS3HSCode = !string.IsNullOrWhiteSpace(row["HS 3 CODE"].ToString()) ? row["HS 3 CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS3HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region HS 3 DESC
                                        if (row["HS 3 DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS3HSDesc = !string.IsNullOrWhiteSpace(row["HS 3 DESC"].ToString()) ? row["HS 3 DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS3HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region HS 4 CODE
                                        if (row["HS 4 CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS4HSCode = !string.IsNullOrWhiteSpace(row["HS 4 CODE"].ToString()) ? row["HS 4 CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS4HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region HS 4 DESC
                                        if (row["HS 4 DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS4HSDesc = !string.IsNullOrWhiteSpace(row["HS 4 DESC"].ToString()) ? row["HS 4 DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS4HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region HS 5 CODE
                                        if (row["HS 5 CODE"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS5HSCode = !string.IsNullOrWhiteSpace(row["HS 5 CODE"].ToString()) ? row["HS 5 CODE"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS5HSCode = string.Empty;
                                        }
                                        #endregion
                                        #region HS 5 DESC
                                        if (row["HS 5 DESC"] != DBNull.Value)
                                        {
                                            oCargaMasiva.HS5HSDesc = !string.IsNullOrWhiteSpace(row["HS 5 DESC"].ToString()) ? row["HS 5 DESC"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.HS5HSDesc = string.Empty;
                                        }
                                        #endregion
                                        #region RATE ID
                                        if (row["RATE ID"] != DBNull.Value)
                                        {
                                            oCargaMasiva.RateID = !string.IsNullOrWhiteSpace(row["RATE ID"].ToString()) ? row["RATE ID"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.RateID = string.Empty;
                                        }
                                        #endregion
                                        #region REMARK
                                        if (row["REMARK"] != DBNull.Value)
                                        {
                                            oCargaMasiva.Remake = !string.IsNullOrWhiteSpace(row["REMARK"].ToString()) ? row["REMARK"].ToString() : string.Empty;
                                        }
                                        else
                                        {
                                            oCargaMasiva.Remake = string.Empty;
                                        }
                                        #endregion
                                        //------------------

                                        if (flagOk)
                                        {
                                            listaProcesarServicio.Add(oCargaMasiva);
                                        }
                                        else
                                        {
                                            foreach (var com in listComentarios)
                                            {
                                                //if (comentario.Length <= 0)
                                                //{
                                                //    comentario.Append(com);
                                                //}
                                                //else
                                                //{
                                                //    comentario.Append(". " + com);
                                                //}
                                                listaNoEnviadoServicio.Add(new RAPTResultDTO
                                                {
                                                    SeriviceID = oValidacion.SeriviceID,
                                                    ContractNo = oValidacion.ContractNo,
                                                    Row = oValidacion.Row,
                                                    Comentario = com
                                                });

                                            }
                                            //oValidacion.Comentario = comentario.ToString();
                                            //listaNoEnviadoServicio.Add(oValidacion);
                                        }
                                        #endregion
                                    }
                                    #endregion
                                }
                            }
                        }
                        if (listaProcesarServicio.Count > 0)
                        {
                            var request = new RequestCargaMasivaViewModel();
                            var totalNoProcesado = 0;
                            request.ListaAcuerdoComercial = listaProcesarServicio;
                            request.Usuario = new UsuarioSeguridadViewModel();
                            request.CodigoLinea = codigoLinea;
                            var usuario = Helpers.Helper.GetUsuarioCliente();
                            if (usuario != null)
                            {
                                request.Usuario.CodigoUsuario = usuario.Usuario.CodigoUsuario;
                                request.Usuario.AliasUsuario = usuario.Usuario.Alias;
                                request.Usuario.CuentaUsuarioRed = usuario.Usuario.CuentaRed;
                                request.Usuario.NombreUsuario = usuario.Usuario.NombreUsuario;
                            }
                            var response = new AcuerdoComercialAgente().CargaMasiva(request);
                            responseData.Result = response.Result;
                            responseData.TotalProcesados = response.RAPTIngresadosList != null ? response.RAPTIngresadosList.Count : 0;
                            totalNoProcesado = response.RAPTNOIngresadosList != null ? response.RAPTNOIngresadosList.Count : 0;
                            responseData.ListaNoIngresado = response.RAPTNOIngresadosList;
                            if (listaNoEnviadoServicio.Count > 0)
                            {
                                totalNoProcesado = totalNoProcesado + listaNoEnviadoServicio.Count;
                                if (responseData.ListaNoIngresado != null)
                                {
                                    if (responseData.ListaNoIngresado.Count > 0)
                                    {
                                        foreach (var item in listaNoEnviadoServicio)
                                        {
                                            responseData.ListaNoIngresado.Add(item);
                                        }
                                    }
                                    else
                                    {
                                        responseData.ListaNoIngresado = listaNoEnviadoServicio;
                                    }
                                }
                                else
                                {
                                    responseData.ListaNoIngresado = listaNoEnviadoServicio;
                                }
                            }


                            GR.Frameworks.Helper.SetSession("ListaNoIngresado", responseData.ListaNoIngresado.OrderBy(x => Convert.ToInt32(x.Row)).ToList());
                            mensaje.Append("Se procesaron " + responseData.TotalProcesados + " acuerdos de manera satisfactoria.");
                            mensaje.Append("\nNo se procesaron " + totalNoProcesado + " acuerdos con error.");
                        }
                        else
                        {

                            responseData.ListaNoIngresado = listaNoEnviadoServicio.OrderBy(x => Convert.ToInt32(x.Row)).ToList();
                            responseData.Result.Satisfactorio = false;
                            mensaje.Append("No se procesó ningún registro, revise la lista de errores.");
                            mensaje.Append("\nTotal de registros con errores " + listaNoEnviadoServicio.Count + ".");
                        }
                        responseData.Result.Mensaje = mensaje.ToString();
                        return new JsonResult()
                        {
                            Data = responseData
                        };
                    }
                    else
                    {
                        responseData.Result.Satisfactorio = false;
                        mensaje.Append("Código Linea es Obligatorio.");
                    }
                }
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
                responseData.Result.Satisfactorio = false;
                responseData.Result.Mensaje = "Ocurrión un error interno del programa.";
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("", HelperCtrl.ObtenerAtributosManejadorEventos(this.ControllerContext.ToString(),
                                                             MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return new JsonResult()
            {
                Data = responseData
            };
        }

        /// <summary>
        /// Convertir un CSV a datatble
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static DataTable ConvertCsVtoDataTable(HttpPostedFileBase file)
        {
            DataTable dt = new DataTable();
            using (StreamReader sr = new StreamReader(file.InputStream))
            {
                var readLine = sr.ReadLine();
                if (readLine != null)
                {
                    string[] headers = readLine.Split(';');
                    foreach (string header in headers)
                    {
                        dt.Columns.Add(header);
                    }
                    while (!sr.EndOfStream)
                    {
                        var linea = sr.ReadLine();
                        if (linea != null)
                        {
                            string[] rows = linea.Split(';');
                            DataRow dr = dt.NewRow();
                            for (int i = 0; i < headers.Length; i++)
                            {
                                dr[i] = rows[i];
                            }
                            dt.Rows.Add(dr);
                        }
                    }
                }
            }
            return dt;
        }

        /// <summary>
        /// Convertir un Xls a datatble
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static DataTable ConvertXlstoDataTable(HttpPostedFileBase file)
        {
            DataTable data = new DataTable();
            ExcelPackageExtensions excelPackageExtensions = new ExcelPackageExtensions();
            data = excelPackageExtensions.ToDataTable(file.InputStream);
            return data;
        }

        /// <summary>
        /// Consultar y exportar  no  procesados
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="requestExportar"></param>
        /// <returns></returns>
        public ActionResult RecuperarNoProcesados(RequestConsultaNoProcesadosViewModel filtros, string requestExportar)
        {
            ActionResult actionResult = null;
            var manejadorLogEventos = new ManejadorLogEventos();
            try
            {
                if (ModelState.IsValid)
                {
                    var rm = new ResourceManager("TRAMARSA.AGMA.ACUERDOCOMERCIAL.Resource.ResourceGrillas", Assembly.GetExecutingAssembly());
                    var idGrilla = rm.GetString("IdGrilla_ConsultaNoProcesados");
                    if (!string.IsNullOrEmpty(Request.QueryString["export"]))
                    {
                        filtros = GR.Frameworks.Helper.ConvertirJsonAObjeto<RequestConsultaNoProcesadosViewModel>(requestExportar);
                        if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                        filtros.paginacionDTO.sord = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                        filtros.paginacionDTO.rows = 9999;
                        filtros.paginacionDTO.page = 1;
                        var listaRespuesta = RecuperarDatos();
                        listaRespuesta.NroPagina = 1;
                        actionResult = HelperCtrl.ExportarExcel(listaRespuesta, listaRespuesta.ListaNoIngresado, filtros.paginacionDTO.IdGrilla, "ContractNo", Request.QueryString["export"], Response, "Detalle_Error_");
                    }
                    else
                    {

                        var listarTipoContenedor = RecuperarDatos();
                        if (listarTipoContenedor.Result.Satisfactorio && listarTipoContenedor.ListaNoIngresado.Count > 0)
                        {
                            int nroRegistros;
                            if (idGrilla != null) filtros.paginacionDTO.IdGrilla = new Guid(idGrilla);
                            filtros.paginacionDTO.HabilitarPaginacion = true;
                            string columnaOrden = new HelperDataScriptor().ObtenerCampoOrdenDefault(filtros.paginacionDTO.IdGrilla);
                            listarTipoContenedor.ListaNoIngresado = PaginacionBL.PaginarLista(listarTipoContenedor.ListaNoIngresado,
                                                                                                    filtros.paginacionDTO,
                                                                                                    out nroRegistros,
                                                                                                    columnaOrden);
                            listarTipoContenedor.TotalRegistros = nroRegistros;
                            var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listarTipoContenedor.TotalRegistros) / filtros.paginacionDTO.GetNroFilas()));
                            var res = Grid.toJSONFormat2(listarTipoContenedor.ListaNoIngresado, filtros.paginacionDTO.GetNroPagina(), listarTipoContenedor.TotalRegistros, totalPages, "ContractNo");
                            actionResult = Content(res);
                        }
                        else
                        {
                            actionResult = Content(Grid.toJSONFormat2(listarTipoContenedor.ListaNoIngresado, 0, 0, 0, ""));
                        }
                    }
                }
                else
                {
                    var cadena = string.Empty;
                    var objetos = GR.Frameworks.Helper.GetErrorsFromModelState(ref cadena, ModelState);
                    actionResult = Content(Grid.emptyStrJSON(cadena, objetos));
                }
            }
            catch (Exception ex)
            {
                HelperCtrl.GrabarLog(ex, "", PoliticaExcepcion.Win);
            }
            finally
            {
                manejadorLogEventos.RegistrarTiempoEjecucion("",
                    HelperCtrl.ObtenerAtributosManejadorEventos(ControllerContext.ToString(),
                        MethodBase.GetCurrentMethod().Name, HelperCtrl.ObtenerUsuario()));
            }
            return actionResult;
        }
        /// <summary>
        /// Recuperar datos session
        /// </summary>
        /// <returns></returns>
        public ResponseConsultaNoProcesadosViewModel RecuperarDatos()
        {
            var response = new ResponseConsultaNoProcesadosViewModel();
            try
            {
                var listaNoIngresados = (List<RAPTResultDTO>)GR.Frameworks.Helper.GetSession("ListaNoIngresado");
                if (listaNoIngresados != null)
                {
                    response.ListaNoIngresado = listaNoIngresados;
                    if (response.ListaNoIngresado.Count > 0)
                    {
                        response.TotalRegistros = response.ListaNoIngresado.Count;
                        response.Result = new Result() { Satisfactorio = true };
                    }
                }
                else
                {
                    response.Result = new Result { Satisfactorio = false };
                }

            }
            catch (Exception ex)
            {
                response.Result = new Result { Satisfactorio = false };
                ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.AgenteServicios);
            }
            return response;
        }
    }
}