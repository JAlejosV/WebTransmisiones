using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultarDetalleTipoContenedorExternoViewModel: RequestBaseDTO
    {
        public ConsultarDetalleTipoContenedorExternoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultarDetalleTipoContenedorExternoViewModel()
        {
            filtro = new ConsultarDetalleTipoContenedorExternoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}