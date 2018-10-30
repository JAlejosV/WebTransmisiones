namespace GR.Msc.Memberships.Agente.Request
{
    public class RequestBusquedaUsuario
    {
        public string Usuario { get; set; }
        //public string Dominio { get; set; }
        public string IdRol { get; set; }
        public string Acronimo { get; set; }
        public string ValorRecurso { get; set; }
        public string CodigoRecursoDetalle { get; set; }
    }
}