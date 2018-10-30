using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Rol
{
    public class RequestRegistrarRolViewModel : RequestBaseDTO
    {
        public Int64? CodigoRol { get; set; }
        public string CodigoRolSunat { get; set; }
        public string NombreRol { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}