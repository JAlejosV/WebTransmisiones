using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultarDetalleGrupoPuertoExternoViewModel : RequestBaseDTO
    {
        public ConsultarDetalleGrupoPuertoExternoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultarDetalleGrupoPuertoExternoViewModel()
        {
            filtro = new ConsultarDetalleGrupoPuertoExternoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}