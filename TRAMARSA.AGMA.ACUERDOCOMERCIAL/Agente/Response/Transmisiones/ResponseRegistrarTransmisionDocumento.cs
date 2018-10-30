using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Transmisiones
{
    public class ResponseRegistrarTransmisionDocumento
    {
        public Result Result { get; set; }
        public ResponseRegistrarTransmisionDocumento()
        {
            this.Result = new Result();
        }
    }
}