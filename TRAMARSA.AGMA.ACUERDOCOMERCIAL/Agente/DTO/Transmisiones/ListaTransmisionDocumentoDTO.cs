using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones
{
    public class ListaTransmisionDocumentoDTO
    {
        public Int64? CodigoDocumento { get; set; }
        public string NumeroDocumento { get; set; }
        public string NombreNave { get; set; }
        public string NumeroViajeItinerario { get; set; }
        public Int32? AnioManifiestoItinerario { get; set; }
        public string NumeroManifiestoItinerario { get; set; }
        public string NombreAduana { get; set; }
        public string NombreTipoEnvio { get; set; }
        public Decimal? TotalPesoBrutoTransmision { get; set; }
        public Int64? TotalBultosTransmision { get; set; }
        public Int64? TotalContenedoresTransmision { get; set; }
        public string Consignatario { get; set; }
        public string Embarcador { get; set; }
        public string PuertoEmbarque { get; set; }
        public string PuertoFinal { get; set; }
        public bool? EstadoEnvioAduanas { get; set; }
        public bool? EstadoTransmision { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
    }
}