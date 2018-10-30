using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseBusquedaDistribucionTarifa
    {
        public List<DistribucionTarifaDTO> DistribucionTarifasList { get; set; }
        //public int TotalRegistros { get; set; }
        //public int CantidadPaginas { get; set; }
        //public Result Result { get; set; }
        //public ResponseBusquedaDistribucionTarifa()
        //{
        //    DistribucionTarifasList = new List<DistribucionTarifaDTO>();
        //    //this.Result = new Result();
        //}
    }
}