using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Moneda
{
    public class RequestRegistrarMoneda
    {
        public Int64? CodigoMoneda { get; set; }
        public string CodigoMonedaSunat { get; set; }
        public string NombreMoneda { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}