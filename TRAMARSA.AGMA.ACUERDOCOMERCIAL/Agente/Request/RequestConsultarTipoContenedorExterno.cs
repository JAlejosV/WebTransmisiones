namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultarTipoContenedorExterno : BaseRequest
    {
        public int CodigoTipoContenedorExterno { get; set; }
        public string CodigoEquivalencia { get; set; }
        public string CodigoLinea { get; set; }
    }
}