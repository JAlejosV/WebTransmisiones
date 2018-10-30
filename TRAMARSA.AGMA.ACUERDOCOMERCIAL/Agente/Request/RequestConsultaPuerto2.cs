namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultaPuerto2 : BaseRequest
    {
        public string CodigoPuerto { get; set; }
        public string CodigoLineaNaviera { get; set; }
        public string NombrePuerto { get; set; }
    }
}