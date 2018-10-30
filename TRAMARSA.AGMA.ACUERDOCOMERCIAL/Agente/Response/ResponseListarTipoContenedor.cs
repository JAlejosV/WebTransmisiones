using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseListarTipoContenedor
    {
        public List<ListaTipoContenedorDTO> TipoContenedorList { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int NroPagina { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTipoContenedor()
        {
            TipoContenedorList = new List<ListaTipoContenedorDTO>();
            this.Result = new Result();
        }
    }
}