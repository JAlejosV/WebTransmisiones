using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaNaveViewModel : RequestBaseDTO
    {
        public BusquedaNaveViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaNaveViewModel()
        {
            filtro = new BusquedaNaveViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}