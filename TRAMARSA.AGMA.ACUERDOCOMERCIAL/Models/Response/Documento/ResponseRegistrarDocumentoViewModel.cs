using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento
{
    public class ResponseRegistrarDocumentoViewModel
    {
        public List<ListaTiposBLViewModel> TiposBL { get; set; }
        public List<ListaTiposEnvioViewModel> TiposEnvio { get; set; }
        public List<ListaCondicionesContratoViewModel> CondicionesContrato { get; set; }
        public string FechaEmisionDocumento { get; set; }
        public string FechaEmbarqueDocumento { get; set; }
    }
}