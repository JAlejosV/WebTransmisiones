using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Documento
{
    public class ResponseRegistrarDocumento
    {
        public Result Result { get; set; }
        public int CodigoDocumento { get; set; }
        public ResponseRegistrarDocumento()
        {
            this.Result = new Result();
        }
    }
}