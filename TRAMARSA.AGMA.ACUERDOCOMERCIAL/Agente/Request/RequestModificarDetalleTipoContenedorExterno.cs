using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestModificarDetalleTipoContenedorExterno
    {
        public List<DetalleTipoContenedorExternoDTO> DetalleTipoContenedorExternoList { get; set; }
        public RequestModificarDetalleTipoContenedorExterno()
        {
            this.DetalleTipoContenedorExternoList = new List<DetalleTipoContenedorExternoDTO>();
        }
    }
}