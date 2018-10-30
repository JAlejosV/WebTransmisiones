using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ListaNaveDTO
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public List<DetalleArriboNaveDTO> DetalleArriboNaveList { get; set; }
        public string NumeroViaje { get; set; }
    }
}