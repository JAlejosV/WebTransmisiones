using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.UnidadMercancia
{
    public class RequestConsultaUnidadMercancia : BaseRequest
    {
        public Int64? CodigoUnidadMercancia { get; set; }
        public string CodigoUnidadMercanciaSunat { get; set; }
        public string NombreUnidadMercancia { get; set; }
        public string CodigoAduanaUnidadMercancia { get; set; }
    }
}