using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.NaturalezaCarga
{
    public class RequestConsultaNaturalezaCarga : BaseRequest
    {
        public Int64? CodigoNaturalezaCarga { get; set; }
        public string CodigoNaturalezaCargaSunat { get; set; }
        public string NombreNaturalezaCarga { get; set; }
    }
}