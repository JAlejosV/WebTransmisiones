using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento
{
    public class ListaDocumentoViewModel
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
        public string FechaEmisionDocumento { get; set; }
        public string FechaEmbarqueDocumento { get; set; }
        public string UsuarioCreacion { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
    }
}