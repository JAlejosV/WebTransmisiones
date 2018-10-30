namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class TarifaLocalLigadaDTO
    {
        public int IdConfiguracionTarifaLigada { get; set; }
        public int CodigoTarifaLigadaLocal { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public int CodigoTarifaLocalVigencia { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public string DescripcionConfiguracionTarifaLigada { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifaLocal { get; set; }
        public decimal? Porcentaje { get; set; }
        public string CodigoMoneda { get; set; }
        public string Moneda { get; set; }
        public decimal? Monto { get; set; }
        public string CodigoMonedaTarifaLigada { get; set; }
        public string DescripcionMonedaBase { get; set; } //falta:DescripcionMonedaBase
        public decimal? MontoTarifaLocal { get; set; }
        public string Accion { get; set; }
    }
}