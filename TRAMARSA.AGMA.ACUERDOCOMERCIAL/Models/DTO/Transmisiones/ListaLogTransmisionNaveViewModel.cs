using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones
{
    public class ListaLogTransmisionNaveViewModel
    {
        public Int64? CodigoItinerario { get; set; }
        public string CampoLogTransmisionItinerario { get; set; }
        public string ValorLogTransmisionItinerario { get; set; }
        public string TextoLogTransmisionItinerario { get; set; }
        //public DateTime? FechaLogTransmisionItinerario { get; set; }
        public string FechaLogTransmisionItinerario { get; set; }
    }
}