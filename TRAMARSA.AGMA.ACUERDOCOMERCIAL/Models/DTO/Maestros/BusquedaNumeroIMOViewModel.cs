using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaNumeroIMOViewModel
    {
        public Int64? CodigoNumeroIMO { get; set; }
        public Int64? CodigoClaseIMO { get; set; }
        public string NumberIMO { get; set; }
        public string NombreNumeroIMO { get; set; }
        public Int32? PaginaNumeroIMO { get; set; }
        public string NombreClaseIMO { get; set; }
    }
}