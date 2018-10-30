namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultaCliente : BaseRequest
    {
        public string CodigoCliente { get; set; }
        public string Nombre { get; set; }
        public string Ruc { get; set; }
        public string Dni { get; set; }
        public bool RequerirRol { get; set; }
        public bool OmitirRol { get; set; }
        public string CodigoRol { get; set; }

    }
}