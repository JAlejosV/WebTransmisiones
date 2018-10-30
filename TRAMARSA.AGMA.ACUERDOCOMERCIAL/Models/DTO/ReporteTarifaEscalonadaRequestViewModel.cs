namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ReporteTarifaEscalonadaRequestViewModel
    {
        public string CodigoLinea { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoSucursal { get; set; }
        public bool FlagVigente { get; set; }
        public int? CodigoTarifaEscalonada { get; set; }
    }
}