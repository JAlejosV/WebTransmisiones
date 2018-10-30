using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Temperatura
{
    public class RequestConsultaTemperatura : BaseRequest
    {
        public Int64? CodigoTemperatura { get; set; }
        public string CodigoTemperaturaSunat { get; set; }
        public string NombreTemperatura { get; set; }
    }
}