namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class TarifaEscalonadaLigadaViewModel
    {
        public int CodigoTarifaEscalonadaVigencia { get; set; }
        public int CodigoTarifaLigadaEscalonada { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public decimal Porcentaje { get; set; }
        public string CodigoMoneda { get; set; }
        public string Moneda { get; set; }
        public decimal Monto { get; set; }
        public string Accion { get; set; }
    }
}