using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaMonedaViewModel
    {
        public Int64? CodigoMoneda { get; set; }
        public string CodigoMonedaSunat { get; set; }
        public string NombreMoneda { get; set; }
    }
}