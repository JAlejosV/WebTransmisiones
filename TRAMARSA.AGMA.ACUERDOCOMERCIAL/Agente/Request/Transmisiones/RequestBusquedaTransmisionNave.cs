using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Transmisiones
{
    public class RequestBusquedaTransmisionNave : BaseRequest
    {
        public Int64? CodigoItinerario { get; set; }
        public Int64? CodigoNave { get; set; }
        public Int64? CodigoAduana { get; set; }
        public Int64? CodigoTipoOperacion { get; set; }
        public string NumeroViajeItinerario { get; set; }
        public string NumeroManifiestoItinerario { get; set; }
        public Int32? AnioManifiestoItinerario { get; set; }
        public bool? EstadoEnvioAduanas { get; set; }
        public bool? EstadoTransmision { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
    }
}