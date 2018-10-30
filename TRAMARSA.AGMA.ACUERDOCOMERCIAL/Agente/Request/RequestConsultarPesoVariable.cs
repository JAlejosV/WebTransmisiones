namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultarPesoVariable : BaseRequest
    {
        public int CodigoVariable { get; set; }
        public string Descripcion { get; set; }
        public string CodigoLinea { get; set; }
    }
}