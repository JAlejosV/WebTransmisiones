using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultarTipoContenedorExternoViewModel : RequestBaseDTO
    {
        public ConsultarTipoContenedorExternoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultarTipoContenedorExternoViewModel()
        {
            filtro = new ConsultarTipoContenedorExternoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}