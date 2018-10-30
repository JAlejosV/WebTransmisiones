using System.Collections.Generic;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestBusquedaACEscalonado : BaseRequest
    {
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoContenedor { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoRA { get; set; }
        public string NumeroBL { get; set; }
        //public string CodigoRolSAP { get; set; }
        public List<string> ListaRolSAP { get; set; }
        public string Estado { get; set; }
        public List<ClienteMatchCode> ListaClienteMatchCode { get; set; }
    }


    public class ClienteMatchCode
    {
        public string CodigoMatchCode { get; set; }
        public ClienteMatchCode()
        {
            CodigoMatchCode = "";
        }
    }
}