namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.DTO.AcuerdosComerciales
{
    public class AcuerdoComercialLocalTarifaDTO
    {
        public int? IdConfiguracionTarifa { get; set; }
        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoMonedaAcuerdo { get; set; }
        public int? CodigoTarifaLocal { get; set; }
        public string CodigoTipoDescuento { get; set; }
        public decimal? MontoAcuerdo { get; set; }
        public decimal? ValorDescuento { get; set; }
        public string Accion { get; set; }
        public string DescripcionTarifa { get; set; }
        public string Moneda { get; set; }
        public decimal? MontoBase { get; set; }
    }
}
