using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Rol
{
    public class RequestRegistrarRol
    {
        public Int64? CodigoRol { get; set; }
        public string CodigoRolSunat { get; set; }
        public string NombreRol { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}