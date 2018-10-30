using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaTerminalPortuarioViewModel : RequestBaseDTO
    {
    
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaTerminalPortuarioViewModel()
        {
            paginacionDTO = new PaginacionDTO();
        }
    }
}