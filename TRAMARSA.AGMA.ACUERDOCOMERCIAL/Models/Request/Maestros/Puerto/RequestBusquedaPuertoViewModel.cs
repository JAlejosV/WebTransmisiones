using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaPuertoViewModel : RequestBaseDTO
    {
        public BusquedaPuertoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaPuertoViewModel()
        {
            filtro = new BusquedaPuertoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}