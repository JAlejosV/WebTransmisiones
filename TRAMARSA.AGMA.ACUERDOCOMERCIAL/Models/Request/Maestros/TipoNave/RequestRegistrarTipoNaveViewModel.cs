using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoNave
{
    public class RequestRegistrarTipoNaveViewModel : RequestBaseDTO
    {
        public Int64? CodigoTipoNave { get; set; }
        public string CodigoTipoNaveSunat { get; set; }
        public string NombreTipoNave { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}