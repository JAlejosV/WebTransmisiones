using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarLinea
    {
        public List<ListaLineaDTO> LineasList { get; set; }
        public Result Result { get; set; }
        public ResponseListarLinea()
        {
            LineasList = new List<ListaLineaDTO>();
            this.Result = new Result();
        }
    }
}