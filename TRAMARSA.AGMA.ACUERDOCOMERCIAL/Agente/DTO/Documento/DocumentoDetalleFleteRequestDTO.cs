using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento
{
    public class DocumentoDetalleFleteRequestDTO
    {
        public Int64? CodigoDocumentoDetalleFlete { get; set; }
        public Int64? CodigoDocumento { get; set; }
        public Int64? CodigoTipoFlete { get; set; }
        public string NombreTipoFlete { get; set; }
        public Int64? CodigoMoneda { get; set; }
        public string NombreMoneda { get; set; }
        public Int64? CodigoModoPago { get; set; }
        public string NombreModoPago { get; set; }
        public Decimal? MontoDocumentoDetalleFlete { get; set; }
        public string Accion { get; set; }
    }
}