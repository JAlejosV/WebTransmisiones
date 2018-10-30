namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestListarGrupoPuertoExterno : BaseRequest
    {
        public int CodigoGrupoPuerto { get; set; }
        public string NombreGrupoPuerto { get; set; }
        public string CodigoLinea { get; set; }
    }
}