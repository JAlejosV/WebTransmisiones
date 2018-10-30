namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class BaseRequest
    {
        public int? NroRegistrosPorPagina { get; set; }
        public string OrdenCampo { get; set; }
        public string OrdenOrientacion { get; set; }
        public int? PaginaActual { get; set; }
    }
}