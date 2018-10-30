using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Transmisiones
{
    public class RequestRegistrarTransmisionNaveViewModel
    {
        public string TipoTransmision { get; set; }

        public List<DetalleTransmisionNave> ListaItinerario { get; set; }

        public RequestRegistrarTransmisionNaveViewModel()
        {
            ListaItinerario = new List<DetalleTransmisionNave>();
        }
    }
}