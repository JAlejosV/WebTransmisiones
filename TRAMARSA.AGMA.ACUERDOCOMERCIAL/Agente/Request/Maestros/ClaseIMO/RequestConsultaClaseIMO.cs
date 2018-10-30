using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ClaseIMO
{
    public class RequestConsultaClaseIMO : BaseRequest
    {
        public Int64? CodigoClaseIMO { get; set; }
        public string CodigoClaseIMOSunat { get; set; }
        public string NombreClaseIMO { get; set; }
    }
}