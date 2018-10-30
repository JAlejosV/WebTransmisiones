using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.CondicionContrato
{
    public class RequestRegistrarCondicionContrato
    {
        public Int64? CodigoCondicionContrato { get; set; }
        public string CodigoCondicionContratoSunat { get; set; }
        public string NombreCondicionContrato { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}