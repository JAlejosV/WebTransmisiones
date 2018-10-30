using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoBL
{
    public class RequestRegistrarTipoBLViewModel : RequestBaseDTO
    {
        public Int64? CodigoTipoBL { get; set; }
        public string CodigoTipoBLSunat { get; set; }
        public string NombreTipoBL { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}