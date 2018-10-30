using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaClienteMatchCodeViewModel : RequestBaseDTO
    {
        public BusquedaClienteMatchCodeViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaClienteMatchCodeViewModel()
        {
            filtro = new BusquedaClienteMatchCodeViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}