using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoEnvio
{
    public class RequestRegistrarTipoEnvioViewModel
    {
        public Int64? CodigoTipoEnvio { get; set; }
        public Int16? CodigoTipoEnvioSunat { get; set; }
        public string NombreTipoEnvio { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}