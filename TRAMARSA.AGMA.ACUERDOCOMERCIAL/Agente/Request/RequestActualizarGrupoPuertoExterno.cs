namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestActualizarGrupoPuertoExterno
    {
        public int CodigoGrupoPuerto { get; set; }
        public string NombreGrupoPuerto { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string CodigoLinea { get; set; }
    }
}