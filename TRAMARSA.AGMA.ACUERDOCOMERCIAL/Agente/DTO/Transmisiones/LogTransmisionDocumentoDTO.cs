using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones
{
    public class LogTransmisionDocumentoDTO
    {
        public Int64? CodigoDocumento { get; set; }
        public string CampoLogTransmisionDocumento { get; set; }
        public string ValorLogTransmisionDocumento { get; set; }
        public string TextoLogTransmisionDocumento { get; set; }
        public DateTime? FechaLogTransmisionDocumento { get; set; }
    }
}