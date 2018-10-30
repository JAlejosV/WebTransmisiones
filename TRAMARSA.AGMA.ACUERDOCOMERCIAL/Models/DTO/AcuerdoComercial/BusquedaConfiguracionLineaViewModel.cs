using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial
{
    public class BusquedaConfiguracionLineaViewModel
    {
        public int? CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public int? Estado { get; set; }
        public bool? EstadoRegistro { get; set; }
    }
}