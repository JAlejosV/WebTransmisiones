namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultaClienteMatchCode : BaseRequest
    {
        public string CodigoCliente { get; set; }
        public string Nombre { get; set; }
        public string Ruc { get; set; }
        public string Dni { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoClienteMatchCode { get; set; }
    }
}