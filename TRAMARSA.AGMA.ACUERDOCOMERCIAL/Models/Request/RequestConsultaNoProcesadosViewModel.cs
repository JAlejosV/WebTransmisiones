using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaNoProcesadosViewModel
    {
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaNoProcesadosViewModel()
        {
            paginacionDTO = new PaginacionDTO();
        }
    }
}