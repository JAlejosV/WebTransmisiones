using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaACLocallViewModel : RequestBaseDTO
    {
        public BusquedaACLocalViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaACLocallViewModel()
        {
            filtro = new BusquedaACLocalViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}