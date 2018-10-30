using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Persona
{
    public class ResponseRegistrarPersona
    {
        public Result Result { get; set; }
        public int CodigoPersona { get; set; }
        public ResponseRegistrarPersona()
        {
            this.Result = new Result();
        }
    }
}