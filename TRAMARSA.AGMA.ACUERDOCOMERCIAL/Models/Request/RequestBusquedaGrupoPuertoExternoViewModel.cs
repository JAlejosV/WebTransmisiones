using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaGrupoPuertoExternoViewModel: RequestBaseDTO
    {
        public BusquedaGrupoPuertoExternoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaGrupoPuertoExternoViewModel()
        {
            filtro = new BusquedaGrupoPuertoExternoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}