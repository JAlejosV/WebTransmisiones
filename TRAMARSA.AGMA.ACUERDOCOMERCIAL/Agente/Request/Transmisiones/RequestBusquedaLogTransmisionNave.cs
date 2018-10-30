using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Transmisiones
{
    public class RequestBusquedaLogTransmisionNave : BaseRequest
    {
        public Int64? CodigoItinerario { get; set; }
    }
}