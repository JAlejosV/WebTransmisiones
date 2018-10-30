using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaPuertoViewModel : RequestBaseDTO
    {
    
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaPuertoViewModel()
        {
            paginacionDTO = new PaginacionDTO();
        }
    }
}