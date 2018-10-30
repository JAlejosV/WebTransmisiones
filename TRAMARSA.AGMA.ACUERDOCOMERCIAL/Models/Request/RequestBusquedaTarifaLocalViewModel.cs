using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaTarifaLocalViewModel : RequestBaseDTO
    {

        public BusquedaTarifaLocalViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaTarifaLocalViewModel()
        {
            filtro = new BusquedaTarifaLocalViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}