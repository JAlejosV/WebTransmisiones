using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.EntidadPrecinto
{
    public class RequestRegistrarEntidadPrecintoViewModel : RequestBaseDTO
    {
        public Int64? CodigoEntidadPrecinto { get; set; }
        public string CodigoEntidadPrecintoSunat { get; set; }
        public string NombreEntidadPrecinto { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}