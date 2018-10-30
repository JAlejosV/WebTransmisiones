using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Nave
{
    public class RequestRegistrarNaveViewModel
    {
        public Int64 CodigoNave { get; set; }
        public Int64 CodigoPais { get; set; }
        public Int64 CodigoTipoNave { get; set; }
        public Int64 CodigoLineaNaviera { get; set; }
        public string NombreNave { get; set; }
        public string MatriculaNave { get; set; }
        public Decimal? TrbNave { get; set; }
        public Decimal? TrnNave { get; set; }
        public Decimal? EsloraNave { get; set; }
        public Decimal? MangaNave { get; set; }
        public Decimal? CaladoNave { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}