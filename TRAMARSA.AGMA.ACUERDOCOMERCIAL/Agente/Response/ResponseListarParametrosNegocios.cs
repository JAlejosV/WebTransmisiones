using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarParametrosNegocios
    {
        public List<ListaParametroNegocioDTO> ParametrosNegocioList { get; set; }
        public Result Result { get; set; }
        public ResponseListarParametrosNegocios()
        {
            ParametrosNegocioList = new List<ListaParametroNegocioDTO>();
            this.Result = new Result();
        }
    }
}