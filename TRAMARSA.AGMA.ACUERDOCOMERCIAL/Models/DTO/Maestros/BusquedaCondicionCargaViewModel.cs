using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaCondicionCargaViewModel
    {
        public Int64? CodigoCondicionCarga { get; set; }
        public string CodigoCondicionCargaSunat { get; set; }
        public string NombreCondicionCarga { get; set; }
    }
}