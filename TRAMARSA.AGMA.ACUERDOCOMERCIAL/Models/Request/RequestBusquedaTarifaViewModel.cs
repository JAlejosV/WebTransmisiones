using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaTarifaViewModel : RequestBaseDTO
    {
        public BusquedaTarifaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaTarifaViewModel()
        {
            filtro = new BusquedaTarifaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}