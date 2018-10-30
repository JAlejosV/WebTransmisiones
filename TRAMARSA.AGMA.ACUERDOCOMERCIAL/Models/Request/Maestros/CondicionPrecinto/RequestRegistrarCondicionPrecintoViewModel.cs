using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionPrecinto
{
    public class RequestRegistrarCondicionPrecintoViewModel : RequestBaseDTO
    {
        public Int64? CodigoCondicionPrecinto { get; set; }
        public string CodigoCondicionPrecintoSunat { get; set; }
        public string NombreCondicionPrecinto { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}