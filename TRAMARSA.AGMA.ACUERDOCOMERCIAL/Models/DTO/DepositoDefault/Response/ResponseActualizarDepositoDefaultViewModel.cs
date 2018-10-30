using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Response
{
    public class ResponseActualizarDepositoDefaultViewModel
    {
        public Result Result { get; set; }
        public ResponseActualizarDepositoDefaultViewModel()
        {
            Result = new Result();
       }
    }
}