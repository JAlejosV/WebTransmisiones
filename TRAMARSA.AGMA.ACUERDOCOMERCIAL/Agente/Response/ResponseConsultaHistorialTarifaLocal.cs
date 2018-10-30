using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultaHistorialTarifaLocal
    {
        public List<TarifaLocalHistorialDTO> TarifaLocalHistorialList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaHistorialTarifaLocal()
        {
            TarifaLocalHistorialList = new List<TarifaLocalHistorialDTO>();
            this.Result = new Result();
        }
    }
}