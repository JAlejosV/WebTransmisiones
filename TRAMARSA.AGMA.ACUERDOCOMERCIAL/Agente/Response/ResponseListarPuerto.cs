using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarPuerto
    {
        public List<ListaPuertoDTO> PuertosList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseListarPuerto()
        {
            PuertosList = new List<ListaPuertoDTO>();
            this.Result = new Result();
        }
    }
}