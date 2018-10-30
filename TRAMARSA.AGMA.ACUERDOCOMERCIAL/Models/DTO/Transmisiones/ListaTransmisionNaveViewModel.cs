using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones
{
    public class ListaTransmisionNaveViewModel
    {
        public Int64? CodigoItinerario { get; set; }
        public Int32? AnioManifiestoItinerario { get; set; }
        public string NumeroManifiestoItinerario { get; set; }
        public string NombreNave { get; set; }
        public string NumeroViajeItinerario { get; set; }
        public string NombreAduana { get; set; }
        public string NombreTipoOperacion { get; set; }
        public string NombreOperadorDescargaItinerario { get; set; }
        public string FechaArriboItinerario { get; set; }
        public Decimal? TotalPesoBrutoTransmision { get; set; }
        public Int64? TotalBultosTransmision { get; set; }
        public Int64? TotalContenedoresTransmision { get; set; }
        public string FechaHoraCreacion { get; set; }
        public bool EstadoEnvioAduanas { get; set; }
        public bool EstadoTransmision { get; set; }
        public bool idCheck { get; set; }
    }
}