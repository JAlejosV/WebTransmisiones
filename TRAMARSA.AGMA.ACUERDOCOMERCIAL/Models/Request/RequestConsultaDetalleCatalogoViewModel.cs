using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestConsultaDetalleCatalogoViewModel : RequestBaseDTO
    {
        public BusquedaDetalleCatalogoViewModel filtro { get; set; }
        public RequestConsultaDetalleCatalogoViewModel()
        {
            filtro = new BusquedaDetalleCatalogoViewModel();
        }
    }
}