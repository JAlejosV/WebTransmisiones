using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaDetalleAcuerdoComercialEscalonadoViewModel : RequestBaseDTO
    {
        public ConsultarDetalleAcuerdoComercialEscalonadoViewModel filtro { get; set; }
        public RequestConsultaDetalleAcuerdoComercialEscalonadoViewModel()
        {
            filtro = new ConsultarDetalleAcuerdoComercialEscalonadoViewModel();
        }
    }
}