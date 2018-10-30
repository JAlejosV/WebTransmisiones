using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn.Request
{
    public class ConsultaMonitorCoparnRequestDTO : BaseRequest
    {
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Contenedor { get; set; }
        public string Deposito { get; set; }
        public string CodigoEstado { get; set; }
    }
}