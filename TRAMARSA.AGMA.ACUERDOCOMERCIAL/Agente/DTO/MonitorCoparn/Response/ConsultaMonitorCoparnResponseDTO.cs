using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn.Response
{
    public class ConsultaMonitorCoparnResponseDTO
    {
        public Result Result { get; set; }
        public List<ConsultaMonitorCoparnDTO> MonitorCoparnList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }


        public ConsultaMonitorCoparnResponseDTO()
        {
            this.Result = new Result();
            this.MonitorCoparnList = new List<ConsultaMonitorCoparnDTO>();
        }
    }
}