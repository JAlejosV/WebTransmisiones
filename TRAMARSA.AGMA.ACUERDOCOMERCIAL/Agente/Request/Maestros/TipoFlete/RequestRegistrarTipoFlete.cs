﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoFlete
{
    public class RequestRegistrarTipoFlete
    {
        public Int64? CodigoTipoFlete { get; set; }
        public string NombreTipoFlete { get; set; }
        public string CodigoAduanaTipoFlete { get; set; }
        public string CodigoEquivalencia { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}