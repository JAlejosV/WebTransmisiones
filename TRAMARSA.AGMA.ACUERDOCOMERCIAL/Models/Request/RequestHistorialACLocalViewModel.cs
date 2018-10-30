using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestHistorialACLocalViewModel
    {
        public HistorialACLocalViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestHistorialACLocalViewModel()
        {
            filtro = new HistorialACLocalViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}