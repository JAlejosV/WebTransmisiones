using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaMedioTransporteViewModel
    {
        public Int64? CodigoMedioTransporte { get; set; }
        public Byte? CodigoMedioTransporteSunat { get; set; }
        public string NombreMedioTransporte { get; set; }
    }
}