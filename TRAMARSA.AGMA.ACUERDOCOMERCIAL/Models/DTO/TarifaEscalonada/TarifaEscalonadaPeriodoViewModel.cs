namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class TarifaEscalonadaPeriodoViewModel
    {
        public int CodigoTarifaEscalonada { get; set; }
        public int CodigoTarifaEscalonadaVigencia { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public int CodigoPeriodo { get; set; }
        public int NumeroDias { get; set; }
        public string CodigoMoneda { get; set; }
        public string DescripcionMoneda { get; set; }
        public decimal Precio { get; set; }
        public string Accion { get; set; }
    }
}