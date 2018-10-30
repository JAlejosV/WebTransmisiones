using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoMovimiento
{
    public class RequestRegistrarTipoMovimiento
    {
        public Int64? CodigoTipoMovimiento { get; set; }
        public string CodigoTipoMovimientoSunat { get; set; }
        public string NombreTipoMovimiento { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}