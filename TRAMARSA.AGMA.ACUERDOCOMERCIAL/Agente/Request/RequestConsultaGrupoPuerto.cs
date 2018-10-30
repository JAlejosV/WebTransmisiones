namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultaGrupoPuerto : BaseRequest
    {
        public int CodigoGrupoPuerto { get; set; }
        //public string NombrePuerto { get; set; }
        public string CodigoLinea { get; set; }
        public string NombreGrupoPuerto { get; set; }
    }
}