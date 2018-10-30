using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.EntidadPrecinto
{
    public class RequestRegistrarEntidadPrecinto
    {
        public Int64? CodigoEntidadPrecinto { get; set; }
        public string CodigoEntidadPrecintoSunat { get; set; }
        public string NombreEntidadPrecinto { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}