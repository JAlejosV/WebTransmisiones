namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialEscalonadoTarifaPeriodoRequestDTO
    {
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoMoneda { get; set; }
        public int CodigoPeriodo { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public decimal NumeroDias { get; set; }
        public string Precio { get; set; }
        public string Accion { get; set; }

        public string Moneda { get; set; }
    }
}