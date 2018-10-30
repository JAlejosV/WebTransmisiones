using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.LineaNaviera
{
    public class RequestConsultaLineaNaviera : BaseRequest
    {
        public Int64? CodigoLineaNaviera { get; set; }
        public string NombreLineaNaviera { get; set; }
        public string RucLineaNaviera { get; set; }
    }
}