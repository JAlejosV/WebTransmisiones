using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestReporteTarifaLocalViewModel
    {
        public ReporteTarifaLocalRequestViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestReporteTarifaLocalViewModel()
        {
            filtro = new ReporteTarifaLocalRequestViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}