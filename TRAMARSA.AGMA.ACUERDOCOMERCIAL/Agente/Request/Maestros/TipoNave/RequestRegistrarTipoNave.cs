using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoNave
{
    public class RequestRegistrarTipoNave
    {
        public Int64? CodigoTipoNave { get; set; }
        public string CodigoTipoNaveSunat { get; set; }
        public string NombreTipoNave { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}