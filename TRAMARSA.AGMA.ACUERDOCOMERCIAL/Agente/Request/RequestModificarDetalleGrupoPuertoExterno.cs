using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestModificarDetalleGrupoPuertoExterno
    {
        public List<DetalleGrupoPuertoExternoDTO> ListaDetalleGrupoPuerto { get; set; }
        public RequestModificarDetalleGrupoPuertoExterno()
        {
            this.ListaDetalleGrupoPuerto = new List<DetalleGrupoPuertoExternoDTO>();
        }
    }
}