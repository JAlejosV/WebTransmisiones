using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestObtenerConfiguracionLineaViewModel : RequestBaseDTO
    {
        public int CodigoConfiguracion { get; set; }
        public bool isNuevo { get; set; }
    }
}