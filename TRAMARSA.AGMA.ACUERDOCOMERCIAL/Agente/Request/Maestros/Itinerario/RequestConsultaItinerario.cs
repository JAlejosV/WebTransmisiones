using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Itinerario
{
    public class RequestConsultaItinerario : BaseRequest
    {
        public Int64? CodigoItinerario { get; set; }
        public Int64? CodigoNave { get; set; }
        public Int64? CodigoAduana { get; set; }
        public Int64? CodigoTipoOperacion { get; set; }
        public string NumeroViajeItinerario { get; set; }
        public string NumeroManifiestoItinerario { get; set; }
        public Int32? AnioManifiestoItinerario { get; set; }
        public DateTime? FechaArriboItinerarioInicio { get; set; }
        public DateTime? FechaArriboItinerarioFin { get; set; }
    }
}