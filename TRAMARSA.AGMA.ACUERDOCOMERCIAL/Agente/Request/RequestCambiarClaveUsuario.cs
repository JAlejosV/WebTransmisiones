namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestCambiarClaveUsuario
    {
        public string Usuario { get; set; }
        public string ClaveAnterior { get; set; }
        public string ClaveNueva { get; set; }
        public string AcronimoAplicacion { get; set; }
        public string DominioAplicacion { get; set; }
    }
}