using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultaLigadaPeriodoTarifaEscalonada
    {
        public List<TarifaEscalonadaLigadaDTO> TarifaEscalonadaLigadaList { get; set; }
        public List<TarifaEscalonadaPeriodoDTO> TarifaEscalonadaPeriodoList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaLigadaPeriodoTarifaEscalonada()
        {
            TarifaEscalonadaLigadaList = new List<TarifaEscalonadaLigadaDTO>();
            TarifaEscalonadaPeriodoList = new List<TarifaEscalonadaPeriodoDTO>();
            Result = new Result();
        }
    }
}