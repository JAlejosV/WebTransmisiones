using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoOperacion
{
    public class RequestConsultaTipoOperacion : BaseRequest
    {
        public Int64? CodigoTipoOperacion { get; set; }
        public Byte? CodigoTipoOperacionSunat { get; set; }
        public string NombreTipoOperacion { get; set; }
    }
}