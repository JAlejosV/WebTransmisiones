using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.ViaTransporte
{
    public class RequestRegistrarViaTransporteViewModel
    {
        public Int64? CodigoViaTransporte { get; set; }
        public Byte? CodigoViaTransporteSunat { get; set; }
        public string NombreViaTransporte { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}