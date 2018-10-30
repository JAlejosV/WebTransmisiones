using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultarPesoVariableViewModel : RequestBaseDTO
    {
        public ConsultarPesoVariableViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultarPesoVariableViewModel()
        {
            filtro = new ConsultarPesoVariableViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}