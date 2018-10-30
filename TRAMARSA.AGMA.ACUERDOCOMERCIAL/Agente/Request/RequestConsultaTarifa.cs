namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultaTarifa : BaseRequest
    {
        public string CodigoRegimen { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoLinea { get; set; }

    }
}