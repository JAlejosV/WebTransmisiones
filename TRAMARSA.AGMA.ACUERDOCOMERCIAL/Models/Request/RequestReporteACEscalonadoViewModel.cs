using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestReporteACEscalonadoViewModel
    {
        public ReporteACEscalonadoRequestViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }


        public RequestReporteACEscalonadoViewModel()
        {
            filtro = new ReporteACEscalonadoRequestViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}