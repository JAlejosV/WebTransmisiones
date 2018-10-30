using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaTarifaEscalonadaViewModel : RequestBaseDTO
    {
        public BusquedaTarifaEscalonadaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaTarifaEscalonadaViewModel()
        {
            filtro = new BusquedaTarifaEscalonadaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}