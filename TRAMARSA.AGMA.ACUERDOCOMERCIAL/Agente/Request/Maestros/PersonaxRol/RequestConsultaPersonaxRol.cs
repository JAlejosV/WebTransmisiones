using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.PersonaxRol
{
    public class RequestConsultaPersonaxRol : BaseRequest
    {
        public Int64? CodigoPersona { get; set; }
        public Int64? CodigoRol { get; set; }
        public string RazonSocialPersona { get; set; }
        public string NumeroDocumentoPersona { get; set; }
    }
}