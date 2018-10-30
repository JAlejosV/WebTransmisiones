using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Response
{
    public class ConsultaDepositoDefaultResponseDTO
    {
          public Result Result { get; set; }
          public List<ConsultaDepositoDefaultDTO> DepositoDefaultList { get; set; }
          public int TotalRegistros { get; set; }
          public int CantidadPaginas { get; set; }
          public int NroPagina { get; set; }
          

          public ConsultaDepositoDefaultResponseDTO()
        {
            this.Result = new Result();
            this.DepositoDefaultList = new List<ConsultaDepositoDefaultDTO>();
        }
    }
}