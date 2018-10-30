using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestReporteContenedorNoDevuelto
    {
        public string CodigoCliente { get; set; }
        public string CodigoLinea { get; set; }
        public string NroBl { get; set; }
        public string CodigoContenedor { get; set; }
        public DateTime? Desde { get; set; }
        public DateTime? Hasta { get; set; }
    }
}