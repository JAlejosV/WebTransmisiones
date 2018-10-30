using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn.Response
{
    public class ResponseConsultaMonitorCoparnIndexViewModel
    {
        public List<ListaDepositoViewModel> Deposito { get; set; }
        public List<ListaDetalleCatalagoViewModel> Estados { get; set; }
        public string Contenedor { get; set; }
        public string FechaDefault { get; set; }
        public string FechaFinDefault { get; set; }
    }
}