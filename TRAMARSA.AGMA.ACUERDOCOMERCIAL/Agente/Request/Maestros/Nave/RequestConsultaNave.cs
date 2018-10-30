using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Nave
{
    public class RequestConsultaNave : BaseRequest
    {
        public Int64? CodigoNave { get; set; }
        public Int64? CodigoPais { get; set; }
        public Int64? CodigoTipoNave { get; set; }
        public Int64? CodigoLineaNaviera { get; set; }
        public string NombreNave { get; set; }
    }
}