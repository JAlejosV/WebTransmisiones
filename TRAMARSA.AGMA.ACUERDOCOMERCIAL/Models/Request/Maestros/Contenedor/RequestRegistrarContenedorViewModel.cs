using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Contenedor
{
    public class RequestRegistrarContenedorViewModel
    {
        public Int64? CodigoContenedor { get; set; }
        public Int64? CodigoTipoContenedor { get; set; }
        public string NumeroContenedor { get; set; }
        public Decimal? TaraContenedor { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}