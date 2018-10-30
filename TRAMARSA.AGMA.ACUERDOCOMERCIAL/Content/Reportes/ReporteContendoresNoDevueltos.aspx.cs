using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Reportes.ContenedoresNoDevueltos1;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.PaginasReportes
{
    public partial class ReporteContendoresNoDevueltos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                try
                {
                    /*
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reportes/Contenedores.rdlc");
                    ReportViewer1.LocalReport.DataSources.Clear();

                    List<ContenedoresNoDevueltos1> lstContenedore = new List<ContenedoresNoDevueltos1>();

                    // ReportDataSource rdc = new ReportDataSource("ContenedoresNoDevueltos", lstContenedore);
                    ReportDataSource reportDataSource = new ReportDataSource();
                    reportDataSource.Name = "ContenedoresDataSet";
                    ReportViewer1.LocalReport.DataSources.Add(reportDataSource);

                    reportDataSource = new ReportDataSource();
                    reportDataSource.Name = "CabeceraDataSet";
                    ReportViewer1.LocalReport.DataSources.Add(reportDataSource);


                    ReportViewer1.LocalReport.Refresh();
                    */
                   

                    /*
                    LocalReport localReport = new LocalReport();

                    localReport.ReportPath = string.Format(@"{0}\Reportes/Contenedores.rdlc", AppDomain.CurrentDomain.BaseDirectory);
                    
                    ContenedoresNoDevueltos1.ContenedoresDataTable contenedoresDataTable = new ContenedoresNoDevueltos1.ContenedoresDataTable();


                    ContenedoresNoDevueltos1.CabeceraDataTable cabeceraDataTable = new ContenedoresNoDevueltos1.CabeceraDataTable();
                    
                    cabeceraDataTable.AddCabeceraRow("Ransa", "TipoCliente", "linea", "bl", "contenedor", "rangoFecha", "titulo", "nave");

                    ReportDataSource reportDataSource = new ReportDataSource();
                    reportDataSource.Name = "ContenedoresDataSet";
                    reportDataSource.Value = contenedoresDataTable;
                    localReport.DataSources.Add(reportDataSource);

                    reportDataSource = new ReportDataSource();
                    reportDataSource.Name = "CabeceraDataSet";
                    reportDataSource.Value = cabeceraDataTable;
                    localReport.DataSources.Add(reportDataSource);

                    ReportViewer1.LocalReport.Refresh();
                    */


                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reportes/Contenedores.rdlc");
                    ReportViewer1.LocalReport.DataSources.Clear();

                    ContenedoresNoDevueltos1.ContenedoresDataTable contenedoresDataTable = new ContenedoresNoDevueltos1.ContenedoresDataTable();


                    ContenedoresNoDevueltos1.CabeceraDataTable cabeceraDataTable = new ContenedoresNoDevueltos1.CabeceraDataTable();

                    cabeceraDataTable.AddCabeceraRow("Ransa", "TipoCliente", "linea", "bl", "contenedor", "rangoFecha", "titulo", "nave");

                    // ReportDataSource rdc = new ReportDataSource("ContenedoresNoDevueltos", lstContenedore);
                    ReportDataSource reportDataSource = new ReportDataSource();
                    reportDataSource.Name = "ContenedoresDataSet";
                    reportDataSource.Value = contenedoresDataTable;
                    ReportViewer1.LocalReport.DataSources.Add(reportDataSource);

                    reportDataSource = new ReportDataSource();
                    reportDataSource.Name = "CabeceraDataSet";
                    reportDataSource.Value = cabeceraDataTable;
                    ReportViewer1.LocalReport.DataSources.Add(reportDataSource);


                    ReportViewer1.LocalReport.Refresh();

                }
                catch (Exception ex)
                {

                }
            }
        
        }
    }
}