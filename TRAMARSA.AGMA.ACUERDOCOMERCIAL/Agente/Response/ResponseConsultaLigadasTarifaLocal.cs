using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultaLigadasTarifaLocal
    {
        public List<TarifaLocalLigadaDTO> ListaTarifaLocalLigada { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaLigadasTarifaLocal()
        {
            ListaTarifaLocalLigada = new List<TarifaLocalLigadaDTO>();
            this.Result = new Result();
        }
    }
}