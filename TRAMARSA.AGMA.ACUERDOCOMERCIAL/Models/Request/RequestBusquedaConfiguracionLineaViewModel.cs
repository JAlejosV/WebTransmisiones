using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaConfiguracionLineaViewModel : RequestBaseDTO
    {
        public BusquedaConfiguracionLineaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaConfiguracionLineaViewModel()
        {
            filtro = new BusquedaConfiguracionLineaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}