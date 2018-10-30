using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Itinerario
{
    public class RequestRegistrarItinerario
    {
        public Int64? CodigoItinerario { get; set; }
        public Int64? CodigoNave { get; set; }
        public Int64? CodigoAduana { get; set; }
        public Int64? CodigoTipoOperacion { get; set; }
        public Int64? CodigoTipoLugarCarga { get; set; }
        public Int64? CodigoOperadorEmbarqueItinerario { get; set; }
        public Int64? CodigoOperadorDescargaItinerario { get; set; }
        public Int64? CodigoAgenteMaritimoItinerario { get; set; }
        public Int64? CodigoTipoLugarCargaPuertoIntermedio { get; set; }
        public Int64? CodigoPuertoIntermedio { get; set; }
        public string NumeroViajeItinerario { get; set; }
        public string NumeroManifiestoItinerario { get; set; }
        public Int32? AnioManifiestoItinerario { get; set; }
        public DateTime? FechaArriboItinerario { get; set; }
        public DateTime? FechaZarpeItinerario { get; set; }
        public DateTime? FechaAtraqueItinerario { get; set; }
        public DateTime? FechaTerminoDescargaItinerario { get; set; }
        public string DUEItinerario { get; set; }
        public string CapitanNaveItinerario { get; set; }
        public DateTime? FechaZarpePuertoIntermedio { get; set; }
        public string Voyage { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}