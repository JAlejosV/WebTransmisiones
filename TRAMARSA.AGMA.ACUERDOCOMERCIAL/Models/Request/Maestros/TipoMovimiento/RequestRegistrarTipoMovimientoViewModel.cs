using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoMovimiento
{
    public class RequestRegistrarTipoMovimientoViewModel : RequestBaseDTO
    {
        public Int64? CodigoTipoMovimiento { get; set; }
        public string CodigoTipoMovimientoSunat { get; set; }
        public string NombreTipoMovimiento { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}