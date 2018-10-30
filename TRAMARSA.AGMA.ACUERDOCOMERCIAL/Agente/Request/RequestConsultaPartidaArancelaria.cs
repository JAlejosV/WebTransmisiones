namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestConsultaPartidaArancelaria : BaseRequest
    {
        public string CodigoPartidaArancelaria { get; set; }
        public string DescripcionPartidaArancelaria { get; set; }
        public int? IdPartidaArancelaria { get; set; }

    }
}