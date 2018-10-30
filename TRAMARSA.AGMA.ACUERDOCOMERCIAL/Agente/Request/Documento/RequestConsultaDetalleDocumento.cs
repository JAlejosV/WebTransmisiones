using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Documento
{
    public class RequestConsultaDetalleDocumento : BaseRequest
    {
        public Int64? CodigoDocumento { get; set; }
    }
}