using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion.Request
{
    public class ConsultaBandejaNotificacionIntegracionRequestDTO : BaseRequest
    {
        public string CodigoLinea { get; set; }
        public string Nombre { get; set; }
        public string CodigoEstado { get; set; }
    }
}