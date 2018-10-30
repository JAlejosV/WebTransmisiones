using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaPartidaArancelariaViewModel : RequestBaseDTO
    {
        public BusquedaPartidaArancelariaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaPartidaArancelariaViewModel()
        {
            filtro = new BusquedaPartidaArancelariaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}