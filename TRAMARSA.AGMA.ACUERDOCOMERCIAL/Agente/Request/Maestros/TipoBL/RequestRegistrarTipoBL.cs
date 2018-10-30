using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoBL
{
    public class RequestRegistrarTipoBL
    {
        public Int64? CodigoTipoBL { get; set; }
        public string CodigoTipoBLSunat { get; set; }
        public string NombreTipoBL { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}