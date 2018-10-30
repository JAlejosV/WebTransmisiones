namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ReporteTarifaLocalViewModel
    {
        public string CodigoLinea { get; set; }
        public string DescripcionLinea { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoMoneda { get; set; }
        public string DescripcionMoneda { get; set; }
        public decimal Monto { get; set; }
        public string CodigoSucursal { get; set; }
        public string Sucursal { get; set; }
        public string VigenciaDesde { get; set; }
        public string VigenciaHasta { get; set; }
        public string CodigoTerminalPortuario { get; set; }
        public string TerminalPortuario { get; set; }
        public string CodigoTarifaLigadaLocal { get; set; }
        public string CodigoConceptoTarifaLigada { get; set; }
        public string CodigoTarifaTarifaLigada { get; set; }
        public string DescripcionTarifaTarifaLigada { get; set; }
        public string FechaHoraCreacion { get; set; }
    }
}