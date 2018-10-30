namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.DTO.AcuerdosComerciales
{
    public class AcuerdoComercialLocalTarifaLigadaDTO
    {
        public int? IdConfiguracionTarifaLigada { get; set; }
        public int? IdConfiguracionTarifa { get; set; }
        public int CodigoAcuerdoComercialLocal { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public int CodigoTarifaLigadaLocal { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public string DescripcionConfiguracionTarifaLigada { get; set; }
        public decimal? Porcentaje { get; set; }
        public string CodigoMoneda { get; set; }
        public decimal? Monto { get; set; }
        public string Accion { get; set; }
        public int? CodigoMonedaTarifaLigada { get; set; }
        public int? CodigoTarifa { get; set; }
        public string DescripcionTarifaLocal { get; set; }
        public string Moneda { get; set; }
        public string DescripcionMonedaBase { get; set; }
        public string MontoTarifaLocal { get; set; }
    }
}
