using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ListaDocumentoOrigenDTO
    {
        public string CodLinea { get; set; }
        public string CodNave { get; set; }
        public string CodigoContenedor { get; set; }
        public string CodigoEmbarque { get; set; }
        public string CodigoServicio { get; set; }
        public string Consignatario { get; set; }
        public string DestinoFinal { get; set; }
        public string DireccionConsignatario { get; set; }
        public DateTime? Fec_BL { get; set; }
        public string DescripcionNave { get; set; }
        public string NroBL { get; set; }
        public string NroBkn { get; set; }
        public string NumViaje { get; set; }
        public string PuertoDesembarque { get; set; }
        public string PuertoEmbarque { get; set; }
        public string PuertoOrigen { get; set; }
        public string TipoBL { get; set; }
        public string TipoDocumento { get; set; }
        public bool idCheck { get; set; }
    }
}