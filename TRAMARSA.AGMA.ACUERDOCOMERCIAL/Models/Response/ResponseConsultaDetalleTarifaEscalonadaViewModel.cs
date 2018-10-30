using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultaDetalleTarifaEscalonadaViewModel
    {
        public List<DetalleTarifaEscalonadaViewModel> DetalleTarifaEscalonadaList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaDetalleTarifaEscalonadaViewModel()
        {
            DetalleTarifaEscalonadaList = new List<DetalleTarifaEscalonadaViewModel>();
            this.Result = new Result();
        }
    }
}