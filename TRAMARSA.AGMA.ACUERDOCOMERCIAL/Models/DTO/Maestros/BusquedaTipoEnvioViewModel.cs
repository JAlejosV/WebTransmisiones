using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaTipoEnvioViewModel
    {
        public Int64? CodigoTipoEnvio { get; set; }
        public Int16? CodigoTipoEnvioSunat { get; set; }
        public string NombreTipoEnvio { get; set; }
    }
}