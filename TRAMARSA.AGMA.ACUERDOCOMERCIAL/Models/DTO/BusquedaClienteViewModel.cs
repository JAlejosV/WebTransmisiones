namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaClienteViewModel
    {
        public string CodigoRol { get; set; }
        public string CodigoCliente { get; set; }
        public string Nombre { get; set; }
        public string Ruc { get; set; }
        public string Dni { get; set; }
        public bool RequerirRol { get; set; }
        public string TipoCliente { get; set; }
        public bool OmitirRol { get; set; } //JM
    }
}