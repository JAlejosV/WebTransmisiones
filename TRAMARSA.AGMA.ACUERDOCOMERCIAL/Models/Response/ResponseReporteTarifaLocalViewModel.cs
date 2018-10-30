using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseReporteTarifaLocalViewModel
    {
        public List<ReporteTarifaLocalViewModel> ReporteTarifaLocalList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseReporteTarifaLocalViewModel()
        {
            ReporteTarifaLocalList = new List<ReporteTarifaLocalViewModel>();
            this.Result = new Result();
        }
    }
}