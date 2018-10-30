using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Response
{
    public class AgregarDepositoDefaultResponseDTO
    {
        public Result Result { get; set; }
        public AgregarDepositoDefaultResponseDTO()
        {
            this.Result = new Result();
        }
    }
}