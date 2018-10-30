namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestBusquedaDocumentoOrigen : BaseRequest
    {
        public string CodNave { get; set; }
        public string NumViaje { get; set; }
        public string PuertoOrigen { get; set; }
        public string PuertoEmbarque { get; set; }
        public string PuertoDesembarque { get; set; }
        public string DestinoFinal { get; set; }
        public string CodLinea { get; set; }
        public string NroBL { get; set; }
        public string TipoBL { get; set; }
        public string CodContenedor { get; set; }
        public string TipoDocumento { get; set; }
        public string NroBkn { get; set; }
    }
}