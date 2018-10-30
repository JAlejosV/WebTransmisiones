namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestEliminarTipoContenedorExternoViewModel
    {
        public string CodigoLinea { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public int CodigoTipoContenedorExterno { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string UsuarioActualizacion { get; set; }
    }
}