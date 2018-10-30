using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionTransporte
{
    public class RequestRegistrarCondicionTransporte
    {
        public Int64? CodigoCondicionTransporte { get; set; }
        public string CodigoCondicionTransporteSunat { get; set; }
        public string NombreCondicionTransporte { get; set; }
        public string CodigoAduanaCondicionTransporte { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}