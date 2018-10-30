namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestEliminarTipoContenedorExterno
    {
        public string CodigoLinea { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public int CodigoTipoContenedorExterno { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string UsuarioActualizacion { get; set; }
    }
}