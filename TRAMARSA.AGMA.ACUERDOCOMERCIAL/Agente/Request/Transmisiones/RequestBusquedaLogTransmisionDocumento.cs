using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Transmisiones
{
    public class RequestBusquedaLogTransmisionDocumento : BaseRequest
    {
        public Int64? CodigoDocumento { get; set; }
    }
}