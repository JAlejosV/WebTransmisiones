using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento
{
    public class BusquedaDocumentoViewModel
    {
        public Int64? CodigoDocumento { get; set; }
        public Int64? CodigoItinerario { get; set; }
        public Int64? CodigoPuertoOrigenDocumento { get; set; }
        public Int64? CodigoPuertoEmbarqueDocumento { get; set; }
        public Int64? CodigoPuertoDescargaDocumento { get; set; }
        public Int64? CodigoPuertoFinalDocumento { get; set; }
        public Int64? CodigoLineaNaviera { get; set; }
        public Int64? CodigoAduana { get; set; }
        public Int64? CodigoTipoBL { get; set; }
        public Int64? CodigoTipoEnvio { get; set; }
        public string NumeroDocumento { get; set; }
        public DateTime? FechaEmisionDocumentoInicio { get; set; }
        public DateTime? FechaEmisionDocumentoFin { get; set; }
    }
}