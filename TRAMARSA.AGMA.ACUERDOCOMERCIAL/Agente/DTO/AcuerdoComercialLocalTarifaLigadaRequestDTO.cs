namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalTarifaLigadaRequestDTO
    {
        public int CodigoAcuerdoComercialLocal { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public int CodigoTarifaLigadaLocal { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public decimal? Porcentaje { get; set; }
        //public decimal? MontoAcuerdo { get; set; }
        public string CodigoMoneda { get; set; }
        public decimal? Monto { get; set; }
        public string Accion { get; set; }
    }
}