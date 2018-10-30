namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaTarifaPlanaViewModel
    {
        public int CodigoTarifaLocal { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
        public decimal Monto { get; set; }
        public string CodigoMoneda { get; set; }
        public string DescripcionMoneda { get; set; }
        public string CodigoSucursal { get; set; }
        public string DescripcionSucursal { get; set; }
        public string CodigoTerminalPortuario { get; set; }
        public string DescripcionTerminalPortuario { get; set; }
        public string EstadoRegistro { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
        public string UsuarioActualizacion { get; set; }
    }
}