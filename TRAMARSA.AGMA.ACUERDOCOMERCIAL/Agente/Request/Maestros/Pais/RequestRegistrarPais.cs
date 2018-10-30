using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestRegistrarPais
    {
        public Int64? CodigoPais { get; set; }
        public string CodigoPaisSunat { get; set; }
        public string NombrePais { get; set; }
        public string CodigoAlfaPais { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}