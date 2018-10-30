namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConsultaDetalleTarifaEscalonadaLigadaViewModel
    {
        public int? IdConfiguracionTarifaLigada { get; set; }
        public int CodigoTarifaEscalonadaVigencia { get; set; }
        public int CodigoTarifaLigadaEscalonada { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public decimal Porcentaje { get; set; }
        public string CodigoMoneda { get; set; }
        public string Moneda { get; set; }
        public decimal Monto { get; set; }
        public string Accion { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifaEscalonada { get; set; }
        public string DescripcionConfiguracionTarifaLigada { get; set; }
        public string MonedaTarifaEscalonada { get; set; }
        public decimal? MontoTarifaEscalonada { get; set; }
        public string CodigoMonedaTarifaLigada { get; set; }
        public string DescripcionMonedaBase { get; set; }
    }
}