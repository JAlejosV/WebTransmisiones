using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Persona
{
    public class RequestConsultaDetallePersona : BaseRequest
    {
        public Int64? CodigoPersona { get; set; }
    }
}