using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultaDetalleTarifaEscalonada
    {
        public List<DetalleTarifaEscalonadaDTO> DetalleTarifaEscalonadaList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaDetalleTarifaEscalonada()
        {
            DetalleTarifaEscalonadaList = new List<DetalleTarifaEscalonadaDTO>();
            this.Result = new Result();
        }
    }
}