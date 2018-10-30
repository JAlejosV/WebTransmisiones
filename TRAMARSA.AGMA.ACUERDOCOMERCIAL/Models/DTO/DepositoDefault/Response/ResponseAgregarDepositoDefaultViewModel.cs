using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Response
{
    public class ResponseAgregarDepositoDefaultViewModel
    {
        public Result Result { get; set; }
        public ResponseAgregarDepositoDefaultViewModel()
        {
            Result = new Result();
       }
    }
}