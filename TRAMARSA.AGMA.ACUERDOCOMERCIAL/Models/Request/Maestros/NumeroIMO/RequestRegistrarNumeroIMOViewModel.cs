using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.NumeroIMO
{
    public class RequestRegistrarNumeroIMOViewModel : RequestBaseDTO
    {
        public Int64? CodigoNumeroIMO { get; set; }
        public Int64? CodigoClaseIMO { get; set; }
        public string NumberIMO { get; set; }
        public string NombreNumeroIMO { get; set; }
        public Int32? PaginaNumeroIMO { get; set; }
        public string NombreClaseIMO { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}