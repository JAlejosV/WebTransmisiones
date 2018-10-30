using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoOperacion
{
    public class ResponseRegistrarTipoOperacion
    {
        public Result Result { get; set; }
        public string CodigoMensaje { get; set; }
        public string Mensaje { get; set; }
        public ResponseRegistrarTipoOperacion()
        {
            this.Result = new Result();
        }
    }
}