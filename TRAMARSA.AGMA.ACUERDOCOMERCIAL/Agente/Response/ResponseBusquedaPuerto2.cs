using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseBusquedaPuerto2
    {
        public List<ListaNaveDTO> NavesList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaPuerto2()
        {
            NavesList = new List<ListaNaveDTO>();
            this.Result = new Result();
        }
    }
}