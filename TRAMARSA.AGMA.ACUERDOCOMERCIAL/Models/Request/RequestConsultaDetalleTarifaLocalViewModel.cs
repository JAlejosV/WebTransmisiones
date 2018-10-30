using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaDetalleTarifaLocalViewModel : RequestBaseDTO
    {
        public DetalleTarifaLocalViewModel filtro { get; set; }
        public RequestConsultaDetalleTarifaLocalViewModel()
        {
            filtro = new DetalleTarifaLocalViewModel();
        }
    }
}