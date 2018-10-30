using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaViaTransporteViewModel
    {
        public Int64? CodigoViaTransporte { get; set; }
        public Byte? CodigoViaTransporteSunat { get; set; }
        public string NombreViaTransporte { get; set; }
    }
}