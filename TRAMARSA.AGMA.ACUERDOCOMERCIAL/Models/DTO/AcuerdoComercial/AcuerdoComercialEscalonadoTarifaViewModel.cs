namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial
{
    public class AcuerdoComercialEscalonadoTarifaViewModel
    {
        public int? IdTarifa { get; set; }
        public int? CodigoAcuerdoComercialEscalonado { get; set; }
        public int? CodigoTarifaEscalonado { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoTipoDescuento { get; set; }
        public string CodigoMonedaAcuerdo { get; set; }
        public decimal MontoAcuerdo { get; set; }
        public string CodigoTipoFechaCalculo { get; set; }
        public int? DiasDelayCalculo { get; set; }
        public string CodigoTipoDiaCalculo { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string UnidadCalculo { get; set; }
        public string CodigoTipoCobro { get; set; }
        public bool FlagNuevoCalculo { get; set; }
        public string Accion { get; set; }
    }
}