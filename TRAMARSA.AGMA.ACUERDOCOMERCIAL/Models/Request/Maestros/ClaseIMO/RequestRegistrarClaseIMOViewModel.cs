using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.ClaseIMO
{
    public class RequestRegistrarClaseIMOViewModel : RequestBaseDTO
    {
        public Int64? CodigoClaseIMO { get; set; }
        public string CodigoClaseIMOSunat { get; set; }
        public string NombreClaseIMO { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}