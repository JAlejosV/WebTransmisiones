﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Contenedor
{
    public class RequestConsultaContenedor : BaseRequest
    {
        public Int64? CodigoContenedor { get; set; }
        public Int64? CodigoTipoContenedor { get; set; }
        public string NumeroContenedor { get; set; }
        public string CodTipoContenedor { get; set; }
        public string TamanioTipoContenedor { get; set; }
        public Decimal? TaraContenedor { get; set; }
    }
}