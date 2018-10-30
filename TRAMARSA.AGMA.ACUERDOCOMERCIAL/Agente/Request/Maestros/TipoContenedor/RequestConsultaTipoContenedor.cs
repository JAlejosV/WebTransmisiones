using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoContenedor
{
    public class RequestConsultaTipoContenedor : BaseRequest
    {
        public Int64? CodigoTipoContenedor { get; set; }
        public string CodigoIsoTipoContenedor { get; set; }
        public string CodigoIsoGrupoTipoContenedor { get; set; }
        public string NombreTipoContenedor { get; set; }
        public string CodTipoContenedor { get; set; }
        public string TamanioTipoContenedor { get; set; }
    }
}