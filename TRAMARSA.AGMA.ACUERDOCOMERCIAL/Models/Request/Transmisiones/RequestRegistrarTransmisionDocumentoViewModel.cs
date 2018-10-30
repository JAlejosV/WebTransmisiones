using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Transmisiones
{
    public class RequestRegistrarTransmisionDocumentoViewModel
    {
        public string TipoTransmision { get; set; }

        public List<DetalleTransmisionDocumento> ListaDocumento { get; set; }

        public RequestRegistrarTransmisionDocumentoViewModel()
        {
            ListaDocumento = new List<DetalleTransmisionDocumento>();
        }
    }
}