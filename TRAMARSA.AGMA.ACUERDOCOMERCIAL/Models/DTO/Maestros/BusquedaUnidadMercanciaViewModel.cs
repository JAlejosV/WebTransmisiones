using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaUnidadMercanciaViewModel
    {
        public Int64? CodigoUnidadMercancia { get; set; }
        public string CodigoUnidadMercanciaSunat { get; set; }
        public string NombreUnidadMercancia { get; set; }
        public string CodigoAduanaUnidadMercancia { get; set; }
    }
}