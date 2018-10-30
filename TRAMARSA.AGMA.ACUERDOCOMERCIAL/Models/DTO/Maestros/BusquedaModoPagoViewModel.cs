using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaModoPagoViewModel
    {
        public Int64? CodigoModoPago { get; set; }
        public string CodigoModoPagoSunat { get; set; }
        public string NombreModoPago { get; set; }
    }
}