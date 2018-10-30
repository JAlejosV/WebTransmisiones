namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConsultaDetalleTarifaEscalonadaPeriodoViewModel
    {
        public int IdPeriodo { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public int CodigoTarifaEscalonadaVigencia { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public int CodigoPeriodo { get; set; }
        public int NumeroDias { get; set; }
        public string CodigoMoneda { get; set; }
        public string Moneda { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string ClaseContenedor { get; set; }
        public decimal Precio { get; set; }
        public string Accion { get; set; }
    }
}