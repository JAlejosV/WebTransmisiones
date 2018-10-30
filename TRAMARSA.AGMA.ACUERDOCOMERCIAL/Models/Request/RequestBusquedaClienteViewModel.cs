using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaClienteViewModel : RequestBaseDTO
    {
        public BusquedaClienteViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaClienteViewModel()
        {
            filtro = new BusquedaClienteViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}