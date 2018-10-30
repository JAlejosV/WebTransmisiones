using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Request
{
    public class RequestConsultaMonitorCoparnViewModel:RequestBaseDTO
    {
           public PaginacionDTO paginacionDTO { get; set; }
           public ConsultaMonitorCoparnViewModel filtro { get; set; }

          public RequestConsultaMonitorCoparnViewModel()
        {
            paginacionDTO = new PaginacionDTO();
            filtro = new ConsultaMonitorCoparnViewModel();
        }
    }
}