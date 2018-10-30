using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento
{
    public class ListaDocumentoDTO
    {
        public Int64? CodigoDocumento { get; set; }
        public string NombreNave { get; set; }
        public string NumeroViajeItinerario { get; set; }
        public string NombrePuertoOrigenDocumento { get; set; }
        public string NombrePuertoEmbarqueDocumento { get; set; }
        public string NombrePuertoDescargaDocumento { get; set; }
        public string NombrePuertoFinalDocumento { get; set; }
        public string NombreLineaNaviera { get; set; }
        public string NumeroDocumento { get; set; }
        public string NombreAduana { get; set; }
        public string NombreTipoBL { get; set; }
        public string NombreTipoEnvio { get; set; }
        public DateTime? FechaEmisionDocumento { get; set; }
        public DateTime? FechaEmbarqueDocumento { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}