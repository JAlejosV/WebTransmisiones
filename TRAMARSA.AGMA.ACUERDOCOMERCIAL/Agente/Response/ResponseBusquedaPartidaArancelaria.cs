using GR.Comun.DTO;
using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseBusquedaPartidaArancelaria
    {
        public List<PartidaArancelariaDTO> PartidaArancelariaList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaPartidaArancelaria()
        {
            PartidaArancelariaList = new List<PartidaArancelariaDTO>();
            Result = new Result();
        }
    }
}