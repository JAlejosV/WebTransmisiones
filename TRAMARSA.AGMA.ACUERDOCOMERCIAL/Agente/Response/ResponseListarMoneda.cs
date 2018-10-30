using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarMoneda
    {
        public List<ListaMonedaDTO> MonedaList { get; set; }
        public Result Result { get; set; }
        public ResponseListarMoneda()
        {
            MonedaList = new List<ListaMonedaDTO>();
            this.Result = new Result();
        }
    }
}