using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaAduanaViewModel
    {
        public Int64? CodigoAduana { get; set; }
        public Int64? CodigoPuerto { get; set; }
        public Int64? CodigoViaTransporte { get; set; }
        public Int32? CodigoAduanaSunat { get; set; }
        public string NombreAduana { get; set; }
    }
}