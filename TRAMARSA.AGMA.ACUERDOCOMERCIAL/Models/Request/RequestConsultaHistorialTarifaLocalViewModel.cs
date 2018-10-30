using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaHistorialTarifaLocalViewModel : RequestBaseDTO
    {
        public ConsultaHistorialTarifaLocalViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaHistorialTarifaLocalViewModel()
        {
            filtro = new ConsultaHistorialTarifaLocalViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}