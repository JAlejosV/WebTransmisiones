using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestSeguimientoACEscalonado : BaseRequest
    {
        public string CodigoLinea { get; set; }
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoRA { get; set; }
        public string NumeroBL { get; set; }
        //public string CodigoRol { get; set; }
        public List<string> ListaRolSAP { get; set; }
        public string Estado { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoContenedor { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioAprobacion { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public List<ClienteMatchCode> ListaClienteMatchCode { get; set; }
    }
}