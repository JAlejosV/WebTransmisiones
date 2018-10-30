using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestSeguimientoACEscalonadoViewModel : RequestBaseDTO
    {
        public SeguimientoACEscalonadoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestSeguimientoACEscalonadoViewModel()
        {
            filtro = new SeguimientoACEscalonadoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}