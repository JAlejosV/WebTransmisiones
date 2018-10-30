namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestReporteTarifaEscalonada : BaseRequest
    {
        public string CodigoLinea { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoSucursal { get; set; }
        public bool FlagVigente { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
    }
}