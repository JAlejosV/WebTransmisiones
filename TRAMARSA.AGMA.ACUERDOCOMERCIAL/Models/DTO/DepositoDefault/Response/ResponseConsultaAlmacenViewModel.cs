using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Response
{
    public class ResponseConsultaAlmacenViewModel
    {
        public Result Result { get; set; }
        public List<ListaDepositoViewModel> DepositosList { get; set; }


        public ResponseConsultaAlmacenViewModel()
        {
            this.DepositosList = new List<ListaDepositoViewModel>();
            this.Result = new Result();
        }

    }
}