using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class ResquestConsultaHistorialTarifaEscalonadaViewModel : RequestBaseDTO
    {
        public ConsultaHistorialTarifaEscalonadaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public ResquestConsultaHistorialTarifaEscalonadaViewModel()
        {
            filtro = new ConsultaHistorialTarifaEscalonadaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}