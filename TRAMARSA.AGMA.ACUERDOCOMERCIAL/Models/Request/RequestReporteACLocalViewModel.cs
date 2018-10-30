using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestReporteACLocalViewModel
    {
        public ReporteACLocalRequestViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestReporteACLocalViewModel()
        {
            filtro = new ReporteACLocalRequestViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}