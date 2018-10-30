using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class ItinerarioDTO
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
        public string NombreNave { get; set; }
        public string NombreAduana { get; set; }
        public string NombreTipoOperacion { get; set; }
        public string NombreTipoLugarCarga { get; set; }
        public string NombreOperadorEmbarqueItinerario { get; set; }
        public string NombreOperadorDescargaItinerario { get; set; }
        public string NombreAgenteMaritimoItinerario { get; set; }
        public string NombreTipoLugarCargaPuertoIntermedio { get; set; }
        public string NombrePuertoIntermedio { get; set; }
        public string Voyage { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}