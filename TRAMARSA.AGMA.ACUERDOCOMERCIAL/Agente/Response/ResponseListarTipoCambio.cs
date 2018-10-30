using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseListarTipoCambio
    {
        public List<ListaTipoCambio> ListaTipoCambio { get; set; }

        public ResponseListarTipoCambio()
        {
            ListaTipoCambio = new List<ListaTipoCambio>();
        }
    }
}