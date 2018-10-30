using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestRegistrarPaisViewModel
    {
        public Int64? CodigoPais { get; set; }
        public string CodigoPaisSunat { get; set; }
        public string NombrePais { get; set; }
        public string CodigoAlfaPais { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}