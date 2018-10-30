using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Response
{
    public class ResponseConsultaMonitorCoparnViewModel
    {
        public List<ListaMonitorCoparnViewModel> MonitorCoparnList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseConsultaMonitorCoparnViewModel()
        {
            MonitorCoparnList = new List<ListaMonitorCoparnViewModel>();
            this.Result = new Result();
        }

    }
}