namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestActualizarGrupoPuertoExternoViewModel
    {
        public int CodigoGrupoPuerto { get; set; }
        public string NombreGrupoPuerto { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string CodigoLinea { get; set; }
        //public List<ActualizarDetalleGrupoPuertoExternoViewModel> ListaDetalleGrupoPuerto { get; set; }
    }
}