using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaEntidadPrecintoViewModel
    {
        public Int64? CodigoEntidadPrecinto { get; set; }
        public string CodigoEntidadPrecintoSunat { get; set; }
        public string NombreEntidadPrecinto { get; set; }
    }
}