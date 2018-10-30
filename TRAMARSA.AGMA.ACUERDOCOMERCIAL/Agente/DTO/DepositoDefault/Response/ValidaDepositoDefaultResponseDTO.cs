using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Response
{
    public class ValidaDepositoDefaultResponseDTO
    {
          public Result Result { get; set; }
          public List<ConsultaDepositoDefaultDTO> DepositoDefaultList { get; set; }

          public ValidaDepositoDefaultResponseDTO()
        {
            this.Result = new Result();
            this.DepositoDefaultList = new List<ConsultaDepositoDefaultDTO>();
        }
    }
}