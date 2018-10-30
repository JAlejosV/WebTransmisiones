using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaCondicionContratoViewModel
    {
        public Int64? CodigoCondicionContrato { get; set; }
        public string CodigoCondicionContratoSunat { get; set; }
        public string NombreCondicionContrato { get; set; }
    }
}