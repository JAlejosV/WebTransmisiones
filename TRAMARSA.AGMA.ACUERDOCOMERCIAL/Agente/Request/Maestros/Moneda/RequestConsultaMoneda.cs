using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Moneda
{
    public class RequestConsultaMoneda : BaseRequest
    {
        public Int64? CodigoMoneda { get; set; }
        public string CodigoMonedaSunat { get; set; }
        public string NombreMoneda { get; set; }
    }
}