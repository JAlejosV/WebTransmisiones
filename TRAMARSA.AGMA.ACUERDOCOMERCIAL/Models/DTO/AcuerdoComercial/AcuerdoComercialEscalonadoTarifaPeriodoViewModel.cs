namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial
{
    public class AcuerdoComercialEscalonadoTarifaPeriodoViewModel
    {
        public int? IdPeriodo { get; set; }
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoMoneda { get; set; }
        public int CodigoPeriodo { get; set; }
        public int CodigoTarifaEscalonado { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public decimal NumeroDias { get; set; }
        public string Precio { get; set; }
        public string Moneda { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string ClaseContenedor { get; set; }
        public string Accion { get; set; }
    }
}