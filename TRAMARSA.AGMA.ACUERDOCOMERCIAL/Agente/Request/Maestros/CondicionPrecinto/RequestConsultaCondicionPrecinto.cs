using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionPrecinto
{
    public class RequestConsultaCondicionPrecinto : BaseRequest
    {
        public Int64? CodigoCondicionPrecinto { get; set; }
        public string CodigoCondicionPrecintoSunat { get; set; }
        public string NombreCondicionPrecinto { get; set; }
    }
}