using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn
{
    public class ConsultaMonitorCoparnViewModel
    {
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Contenedor { get; set; }
        public string CodigoDeposito { get; set; }
        public string CodigoEstado { get; set; }
    }
}