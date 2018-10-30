using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones
{
    public class RegistraTransmisionDocumentoDTO
    {
        public RegistraTransmisionDocumentoDTO()
        {
            this.ListaDocumentos = new List<DetalleTransmisionDocumentoDTO>();
        }

        public string TipoTransmision { get; set; }
        public List<DetalleTransmisionDocumentoDTO> ListaDocumentos { get; set; }
    }
}