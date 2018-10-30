using System;
using System.Collections.Generic;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestReporteACEscalonado : BaseRequest
    {
        public string CodigoLinea { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoRA { get; set; }
        public int? CodigoAcuerdoComercialEscalonado { get; set; }
        public List<ClienteMatchCode> ListaClienteMatchCode { get; set; }
        public DateTime? FinVigencia { get; set; }
        public bool FlgVigente { get; set; }
        public string NumeroBL { get; set; }
        public string CodigoContenedor { get; set; }
        public string TipoBL { get; set; }
    }
}