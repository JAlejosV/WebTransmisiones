using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Transmisiones
{
    public class ResponseRegistrarTransmisionNave
    {
        public Result Result { get; set; }
        public ResponseRegistrarTransmisionNave()
        {
            this.Result = new Result();
        }
    }
}