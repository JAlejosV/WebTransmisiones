using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaTipoMovimientoViewModel
    {
        public Int64? CodigoTipoMovimiento { get; set; }
        public string CodigoTipoMovimientoSunat { get; set; }
        public string NombreTipoMovimiento { get; set; }
    }
}