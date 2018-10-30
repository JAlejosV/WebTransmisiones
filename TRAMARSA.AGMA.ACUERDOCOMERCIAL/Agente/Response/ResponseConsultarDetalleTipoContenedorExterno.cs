using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultarDetalleTipoContenedorExterno
    {
        public List<DetalleTipoContenedorExternoDTO> DetalleTipoContenedorExternoList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleTipoContenedorExterno()
        {
            DetalleTipoContenedorExternoList = new List<DetalleTipoContenedorExternoDTO>();
            this.Result = new Result();
        }
    }
}