using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseCargaInicial
    {
        public ResponseListarTipoCambio TipoCambio { get; set; }
        public List<string> PermisosBotones { get; set; }
        public Result Resultado { get; set; }
        public ResponseCargaInicial()
        {
            this.Resultado = new Result();
        }
    }
}