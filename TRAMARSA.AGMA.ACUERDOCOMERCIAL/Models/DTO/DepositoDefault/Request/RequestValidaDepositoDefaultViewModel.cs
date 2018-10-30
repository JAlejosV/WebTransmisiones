using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestValidaDepositoDefaultViewModel 
    {
          public PaginacionDTO paginacionDTO { get; set; }
          public ConsultaDepositoDefaultViewModel filtro { get; set; }

          public RequestValidaDepositoDefaultViewModel()
        {
            paginacionDTO = new PaginacionDTO();
            filtro = new ConsultaDepositoDefaultViewModel();
        }
    }
}