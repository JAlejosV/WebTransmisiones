using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaDetalleTarifaEscalonadaViewModel : RequestBaseDTO
    {
        public ConsultaDetalleTarifaEscalonadaViewModel filtro { get; set; }
        public RequestConsultaDetalleTarifaEscalonadaViewModel()
        {
            filtro = new ConsultaDetalleTarifaEscalonadaViewModel();
        }
    }
}