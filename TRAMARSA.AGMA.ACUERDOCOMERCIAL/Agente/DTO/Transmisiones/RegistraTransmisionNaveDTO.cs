using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones
{
    public class RegistraTransmisionNaveDTO
    {
        public RegistraTransmisionNaveDTO()
        {
            this.ListaItinerarios = new List<DetalleTransmisionNaveDTO>();
        }

        public string TipoTransmision { get; set; }
        public List<DetalleTransmisionNaveDTO> ListaItinerarios { get; set; }
    }
}