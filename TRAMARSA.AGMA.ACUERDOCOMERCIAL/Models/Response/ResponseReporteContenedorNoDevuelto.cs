using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseReporteContenedorNoDevuelto
    {
        public List<LiquidacionesNoDevueltasDTO> LiquidacionesNoDevueltas { get; set; }
        public Result Result { get; set; }
        public ResponseReporteContenedorNoDevuelto()
        {
            LiquidacionesNoDevueltas = new List<LiquidacionesNoDevueltasDTO>();
            this.Result = new Result();
        }
    }
}