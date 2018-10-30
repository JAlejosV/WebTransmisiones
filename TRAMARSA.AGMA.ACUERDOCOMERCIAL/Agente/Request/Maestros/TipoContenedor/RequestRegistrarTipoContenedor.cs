using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoContenedor
{
    public class RequestRegistrarTipoContenedor
    {
        public Int64? CodigoTipoContenedor { get; set; }
        public string CodigoIsoTipoContenedor { get; set; }
        public string CodigoIsoGrupoTipoContenedor { get; set; }
        public string NombreTipoContenedor { get; set; }
        public string CodigoAduanaTipoContenedor { get; set; }
        public string CodTipoContenedor { get; set; }
        public string TamanioTipoContenedor { get; set; }
        public string IsoTipoContenedor { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}