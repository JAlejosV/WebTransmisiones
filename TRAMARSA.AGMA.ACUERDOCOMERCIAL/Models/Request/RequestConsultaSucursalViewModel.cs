using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaSucursalViewModel : RequestBaseDTO
    {
    
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaSucursalViewModel()
        {
            paginacionDTO = new PaginacionDTO();
        }
    }
}