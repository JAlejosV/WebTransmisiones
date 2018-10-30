using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaServicioBLViewModel : RequestBaseDTO
    {
        public BusquedaServicioBlViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaServicioBLViewModel()
        {
            filtro = new BusquedaServicioBlViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}