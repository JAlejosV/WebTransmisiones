using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaACEscalonadoViewModel: RequestBaseDTO
    {
        public BusquedaACEscalonadoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaACEscalonadoViewModel()
        {
            filtro = new BusquedaACEscalonadoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}