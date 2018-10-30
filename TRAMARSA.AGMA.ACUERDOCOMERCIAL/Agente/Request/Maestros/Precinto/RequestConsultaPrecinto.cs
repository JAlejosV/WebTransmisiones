using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Precinto
{
    public class RequestConsultaPrecinto : BaseRequest
    {
        public Int64? CodigoPrecinto { get; set; }
        public Int64? CodigoCondicionPrecinto { get; set; }
        public Int64? CodigoEntidadPrecinto { get; set; }
        public string NumeroPrecinto { get; set; }
    }
}