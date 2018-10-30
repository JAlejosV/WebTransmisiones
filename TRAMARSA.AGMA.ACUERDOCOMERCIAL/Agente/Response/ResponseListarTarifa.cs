using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarTarifa
    {
        public List<ListaTarifaDTO> TarifasList { get; set; }
        public Result Result { get; set; }
        public ResponseListarTarifa()
        {
            TarifasList = new List<ListaTarifaDTO>();
            this.Result = new Result();
        }
    }
}