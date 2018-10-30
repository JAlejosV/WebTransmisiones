using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseBusquedaNave
    {
        public List<ListaNaveDTO> NavesList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaNave()
        {
            NavesList = new List<ListaNaveDTO>();
            this.Result = new Result();
        }
    }
}