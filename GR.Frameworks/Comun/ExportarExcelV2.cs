using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Web;
using GR.Frameworks;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace GR.Frameworks.Comun
{
    public class ExportarExcelV2
    {
        public static void List2Excel<T>(HttpResponseBase responsePage, IList<T> lista, String Titulo, String nombre, List<ReportColumnHeader> columnsNames, DataTable dt = null)
        {
            var filename = nombre;

            DataTable DataTablelista;
            if (dt != null)
            {
                DataTablelista = dt;
            }
            else
            {
                DataTablelista = CollectionHelper.ConvertTo(lista);
            }
            //ordena columnas dearcuerdo el backoffice
            int contadorOrden = 0;
            for (int i = 0; i < columnsNames.Count; i++)
            {
                string nombrecolumna = columnsNames[i].BindField;
                DataColumn col = DataTablelista.Columns[nombrecolumna];
                if (col != null)
                {
                    DataTablelista.Columns[nombrecolumna].SetOrdinal(contadorOrden);
                    contadorOrden++;
                }
            }
            //pone nombres a las columnas
            List<DataColumn> lstIndexremoves = new List<DataColumn>();
            for (int i = 0; i < DataTablelista.Columns.Count; i++)
            {
                DataColumn col = DataTablelista.Columns[i];
                ReportColumnHeader mcolumn = columnsNames.Find(x => x.BindField == col.ColumnName);

                if (mcolumn == null)
                {
                    lstIndexremoves.Add(col);
                }
                else
                {
                    if (mcolumn.FlgOculto == "1")
                        lstIndexremoves.Add(col);
                    else
                        DataTablelista.Columns[i].ColumnName = mcolumn.HeaderName;
                }
            }

            //elimina columnas innecesarias.
            for (int i = 0; i < lstIndexremoves.Count; i++)
            {
                DataTablelista.Columns.Remove(lstIndexremoves[i]);
            }

            ExcelPackage excel = new ExcelPackage();
            var workSheet = excel.Workbook.Worksheets.Add("Hoja 1");
            workSheet.Cells[1, 1].Value = "" + Titulo.Replace("_", " ").ToUpper().Trim() + "";
            workSheet.Cells[1, 1].Style.Font.Bold = true;
            workSheet.Cells[1, 1].Style.Font.Size = 24;
            workSheet.Cells[1, 1].Style.Font.Name = "Calibri";
            workSheet.Cells[1, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            workSheet.Cells[1, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            workSheet.Cells["A1:J2"].Merge = true;

            workSheet.Cells[3, 1].Value = "Fecha de generación:";
            workSheet.Cells[3, 1].Style.Font.Bold = true;
            workSheet.Cells[3, 1].Style.Font.Size = 11;
            workSheet.Cells[3, 1].Style.Font.Name = "Calibri";
            workSheet.Cells[3, 1].Style.WrapText = true;
            workSheet.Cells[3, 2].Value = DateTime.Now.ToLongDateString();
            workSheet.Cells[3, 2].Style.Font.Size = 11;
            workSheet.Cells[3, 2].Style.Font.Name = "Calibri";
            workSheet.Cells[3, 2].Style.WrapText = true;

            workSheet.Cells[5, 1].LoadFromDataTable(DataTablelista, true);
            workSheet.Cells.AutoFitColumns();
            for (int i = 1; i <= DataTablelista.Columns.Count; i++)
            {
                workSheet.Column(i).AutoFit();
                workSheet.Column(i).BestFit = true;
                //workSheet.Cells[5, i].Style.Font.Bold = true;
                workSheet.Cells[5, i].Style.Font.Color.SetColor(Color.White);
                workSheet.Cells[5, i].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells[5, i].Style.Fill.BackgroundColor.SetColor(Color.Black);
                //workSheet.Cells[5, i].Style.Border.BorderAround(ExcelBorderStyle.Thin, System.Drawing.Color.Black);
                workSheet.Cells[5, i].Style.Font.Size = 11;
                workSheet.Cells[5, i].Style.Font.Name = "Calibri";
                //workSheet.Cells[5, i].Style.WrapText = true;
            }
            workSheet.Column(1).Width = 20;
            int maxpos = 6;

            ExcelRange rangoTabla = workSheet.Cells[maxpos, 1, maxpos + DataTablelista.Rows.Count - 1, DataTablelista.Columns.Count];

            //rangoTabla.Style.Font.Bold = true;

            //rangoTabla.Style.Fill.BackgroundColor = colorNegro;
            rangoTabla.Style.Fill.PatternType = ExcelFillStyle.Solid;
            rangoTabla.Style.Font.Color.SetColor(Color.Black);
            rangoTabla.Style.Fill.BackgroundColor.SetColor(Color.White);
            rangoTabla.Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Black);

            rangoTabla.Style.Font.Size = 11;
            rangoTabla.Style.Font.Name = "Calibri";
            rangoTabla.Style.WrapText = true;

            responsePage.Clear();

            using (MemoryStream memoryStream = new MemoryStream())
            {
                responsePage.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                responsePage.AddHeader("content-disposition", String.Format(@"attachment;filename={0}.xlsx", filename.Replace(" ", "_")));
                excel.SaveAs(memoryStream);
                memoryStream.WriteTo(responsePage.OutputStream);
                responsePage.Flush();
                responsePage.End();
            }
        }
    }
}
