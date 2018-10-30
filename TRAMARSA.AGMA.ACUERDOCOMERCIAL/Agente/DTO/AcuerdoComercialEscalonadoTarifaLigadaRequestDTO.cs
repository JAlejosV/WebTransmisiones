namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialEscalonadoTarifaLigadaRequestDTO
    {
        public string Accion { get; set; }
        public int CodigoAcuerdoComercialEscalonada { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public string CodigoMoneda { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public int CodigoTarifaLigadaLocal { get; set; }
        public decimal? Monto { get; set; }
        public decimal? Porcentaje { get; set; }
    }
}