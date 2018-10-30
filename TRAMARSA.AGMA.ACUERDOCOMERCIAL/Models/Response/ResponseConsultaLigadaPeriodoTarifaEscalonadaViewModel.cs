using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultaLigadaPeriodoTarifaEscalonadaViewModel
    {
        public List<ConsultaDetalleTarifaEscalonadaLigadaViewModel> TarifaEscalonadaLigadaList { get; set; }
        public List<ConsultaDetalleTarifaEscalonadaPeriodoViewModel> TarifaEscalonadaPeriodoList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaLigadaPeriodoTarifaEscalonadaViewModel()
        {
            TarifaEscalonadaLigadaList = new List<ConsultaDetalleTarifaEscalonadaLigadaViewModel>();
            TarifaEscalonadaPeriodoList = new List<ConsultaDetalleTarifaEscalonadaPeriodoViewModel>();
            Result = new Result();
        }
    }
}