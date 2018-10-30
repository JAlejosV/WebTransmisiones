namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultaNave : BaseRequest
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string NumeroViaje { get; set; }
    }
}