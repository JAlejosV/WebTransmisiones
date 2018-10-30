using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseValidaDepositoDefaultViewModel
    {
        public List<ListaDepositoDefaultViewModel> DepositoDefaultList { get; set; }

        public Result Result { get; set; }

        public ResponseValidaDepositoDefaultViewModel()
        {
            DepositoDefaultList = new List<ListaDepositoDefaultViewModel>();
            this.Result = new Result();
        }


    }
}