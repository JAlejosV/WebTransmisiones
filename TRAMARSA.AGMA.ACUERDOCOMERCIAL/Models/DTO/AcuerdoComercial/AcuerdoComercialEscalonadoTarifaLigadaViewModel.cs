namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial
{
    public class AcuerdoComercialEscalonadoTarifaLigadaViewModel
    {
        public int? IdConfiguracionTarifaLigada { get; set; }
        public string CodigoTarifa { get; set; }
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public int CodigoTarifaLigadaEscalonado { get; set; }
        public int CodigoTarifaEscalonado { get; set; }
        public string DescripcionTarifaEscalonada { get; set; }
        public string DescripcionConfiguracionTarifaLigada { get; set; }
        public decimal? Porcentaje { get; set; }
        public string Moneda { get; set; }
        public decimal? Monto { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public string MonedaTarifaEscalonada { get; set; }
        public decimal? MontoTarifaEscalonada { get; set; }
        public string CodigoMonedaTarifaLigada { get; set; }
        public string DescripcionMonedaBase { get; set; }
        public string Accion { get; set; }
    }
}