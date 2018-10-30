using System;
using System.Collections.Generic;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestBusquedaConfiguracionLinea : BaseRequest
    {
        public int? CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public bool? EstadoRegistro { get; set; }
    }
}