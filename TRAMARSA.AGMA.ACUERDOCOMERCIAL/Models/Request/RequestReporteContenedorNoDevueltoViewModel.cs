using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestReporteContenedorNoDevueltoViewModel : RequestBaseDTO
    {
        public ReporteContenedorNoDevueltoRequestViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestReporteContenedorNoDevueltoViewModel()
        {
            filtro = new ReporteContenedorNoDevueltoRequestViewModel();
        }
    }
}