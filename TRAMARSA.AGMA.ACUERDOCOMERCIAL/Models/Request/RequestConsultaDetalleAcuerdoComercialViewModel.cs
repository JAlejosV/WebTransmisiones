using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaDetalleAcuerdoComercialViewModel : RequestBaseDTO
    {
        public DetalleAcuerdoComercialViewModel filtro { get; set; }
        public RequestConsultaDetalleAcuerdoComercialViewModel()
        {
            filtro = new DetalleAcuerdoComercialViewModel();
        }
    }
}