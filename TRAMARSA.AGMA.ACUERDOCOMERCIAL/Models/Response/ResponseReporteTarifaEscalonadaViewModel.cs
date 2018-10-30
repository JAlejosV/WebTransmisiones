using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseReporteTarifaEscalonadaViewModel
    {
        public List<ReporteTarifaEscalonadaViewModel> ReporteTarifaEscalonadaList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseReporteTarifaEscalonadaViewModel()
        {
            ReporteTarifaEscalonadaList = new List<ReporteTarifaEscalonadaViewModel>();
            this.Result = new Result();
        }
    }
}