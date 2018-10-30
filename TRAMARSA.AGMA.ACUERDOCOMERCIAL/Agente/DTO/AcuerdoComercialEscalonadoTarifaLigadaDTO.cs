namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialEscalonadoTarifaLigadaDTO
    {
        public int CodigoAcuerdoComercialEscalonada { get; set; }
        public string CodigoConfiguracionTarifaLigada { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoTarifa { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public int CodigoTarifaLigadaLocal { get; set; }
        public string DescripcionConfiguracionTarifaLigada { get; set; }
        public string DescripcionTarifaEscalonado { get; set; }
        public string Moneda { get; set; }
        public decimal? Monto { get; set; }
        public decimal? Porcentaje { get; set; }
        public string Accion { get; set; }
        //Falta estos campos
        public string MonedaTarifaEscalonada { get; set; }
        public decimal? MontoTarifaEscalonada { get; set; }
        public string CodigoMonedaTarifaLigada { get; set; }


    }
}