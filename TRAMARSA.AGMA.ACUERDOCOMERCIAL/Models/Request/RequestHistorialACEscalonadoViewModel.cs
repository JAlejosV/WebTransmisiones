using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestHistorialACEscalonadoViewModel
    {
        public HistorialACEscalonadoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestHistorialACEscalonadoViewModel()
        {
            filtro = new HistorialACEscalonadoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}