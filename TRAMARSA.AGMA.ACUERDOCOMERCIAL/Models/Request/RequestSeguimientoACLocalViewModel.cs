using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestSeguimientoACLocalViewModel: RequestBaseDTO
    {
        public SeguimientoACLocalViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestSeguimientoACLocalViewModel()
        {
            filtro = new SeguimientoACLocalViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}