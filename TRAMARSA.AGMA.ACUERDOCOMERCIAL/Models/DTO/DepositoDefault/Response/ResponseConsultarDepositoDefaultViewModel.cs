using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultarDepositoDefaultViewModel
    {
        public List<ListaDepositoDefaultViewModel> DepositoDefaultList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseConsultarDepositoDefaultViewModel() {
            DepositoDefaultList = new List<ListaDepositoDefaultViewModel>();
            this.Result = new Result();
        }


    }
}