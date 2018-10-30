using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.ViaTransporte
{
    public class RequestRegistrarViaTransporte
    {
        public Int64? CodigoViaTransporte { get; set; }
        public Byte? CodigoViaTransporteSunat { get; set; }
        public string NombreViaTransporte { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}