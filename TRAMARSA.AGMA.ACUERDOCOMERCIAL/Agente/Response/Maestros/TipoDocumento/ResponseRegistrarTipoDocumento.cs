﻿using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoDocumento
{
    public class ResponseRegistrarTipoDocumento
    {
        public Result Result { get; set; }
        public string CodigoMensaje { get; set; }
        public string Mensaje { get; set; }
        public ResponseRegistrarTipoDocumento()
        {
            this.Result = new Result();
        }
    }
}